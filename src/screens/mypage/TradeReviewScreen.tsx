import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { TabBar } from '../../components/common';

const { width: SW } = Dimensions.get('window');
const PRODUCT_IMG = require('../../assets/images/img03.png');

const MAKE_DATA = () =>
  Array.from({ length: 8 }, (_, i) => ({
    id:           String(i + 1),
    orderDate:    '2025.07.21 주문',
    title:        '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    reviewScore:  4,
    price:        '10,000,000',
  }));

const fmtPrice = (p = '') =>
  p.includes(',') ? p : p.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const MENU_W = 90;

interface AnchorLayout {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

interface DropdownMenuProps {
  visible: boolean;
  anchor: AnchorLayout | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, anchor, onClose, onEdit, onDelete }) => {
  if (!visible || !anchor) return null;

  let left = anchor.pageX + anchor.width - MENU_W;
  if (left + MENU_W > SW - 8) left = SW - MENU_W - 8;
  if (left < 8)               left = 8;
  const top = anchor.pageY + anchor.height + 4;

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={onClose}
      />

      <View style={[s.ddMenu, { position: 'absolute', top, left, width: MENU_W }]}>
        <TouchableOpacity
          style={s.ddItem}
          activeOpacity={0.7}
          onPress={() => { onClose(); onEdit?.(); }}
        >
          <Text style={s.ddText}>수정</Text>
        </TouchableOpacity>

        <View style={s.ddLine} />

        <TouchableOpacity
          style={s.ddItem}
          activeOpacity={0.7}
          onPress={() => { onClose(); onDelete?.(); }}
        >
          <Text style={s.ddText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const TAB_KEYS = { received: 'received', sent: 'sent', writable: 'writable' } as const;

interface ReviewItemProps {
  item: any;
  activeTabKey: string;
  onDelete?: (id: string) => void;
  onEdit?: (item: any) => void;
  onWriteReview?: (item: any) => void;
}

const ReviewItem = React.memo<ReviewItemProps>(
  ({ item, activeTabKey, onDelete, onEdit, onWriteReview }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchor, setAnchor]     = useState<AnchorLayout | null>(null);
    const btnRef                  = useRef<any>(null);

    const isReceived = activeTabKey === TAB_KEYS.received;
    const isSent     = activeTabKey === TAB_KEYS.sent;
    const isWritable = activeTabKey === TAB_KEYS.writable;

    const showMoreBtn  = isSent;
    const showReview   = isReceived || isSent;
    const showWriteBtn = isWritable;

    const handleMorePress = useCallback(() => {
      btnRef.current?.measure((_fx: number, _fy: number, width: number, height: number, pageX: number, pageY: number) => {
        setAnchor({ pageX, pageY, width, height });
        setMenuOpen(true);
      });
    }, []);

    const handleEdit   = useCallback(() => onEdit?.(item),    [item, onEdit]);
    const handleDelete = useCallback(() => onDelete?.(item.id), [item, onDelete]);
    const handleWrite  = useCallback(() => onWriteReview?.(item), [item, onWriteReview]);

    return (
      <View style={s.itemWrap}>
        {showMoreBtn && (
          <DropdownMenu
            visible={menuOpen}
            anchor={anchor}
            onClose={() => setMenuOpen(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <View style={s.itemRow}>
          <TouchableOpacity activeOpacity={0.85} style={s.thumb}>
            <Image source={PRODUCT_IMG} style={s.thumbImg} resizeMode="cover" />
          </TouchableOpacity>

          <View style={s.con}>
            <View style={s.topRow}>
              <Text style={s.orderDate}>{item.orderDate}</Text>
              {showMoreBtn && (
                <TouchableOpacity
                  ref={btnRef}
                  onPress={handleMorePress}
                  hitSlop={{ top: 10, bottom: 10, left: 12, right: 4 }}
                  style={s.moreBtn}
                >
                  <Text style={s.moreDot}>···</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={s.title} numberOfLines={2}>
              {item.title}
            </Text>

            {showReview && (
              <View style={s.reviewRow}>
                <Text style={s.reviewLabel}>받은 리뷰</Text>
                <Text style={s.starIcon}>★</Text>
                <Text style={s.reviewScore}>{item.reviewScore}</Text>
              </View>
            )}

            <Text style={s.price}>{fmtPrice(item.price)}원</Text>
          </View>
        </View>

        {showWriteBtn && (
          <TouchableOpacity
            style={s.writeBtn}
            activeOpacity={0.8}
            onPress={handleWrite}
          >
            <Text style={s.writeBtnText}>후기 보내기</Text>
          </TouchableOpacity>
        )}

        <View style={s.divider} />
      </View>
    );
  },
);

const ListFooter: React.FC<{ loading: boolean }> = ({ loading }) => (
  <View style={s.footer}>
    {loading && (
      <>
        <ActivityIndicator size="large" color={colors.G400} />
        <Text style={s.footerTxt}>목록을 불러오는 중입니다.</Text>
      </>
    )}
  </View>
);

const TABS = [
  { key: 'received', label: '받은 거래 후기' },
  { key: 'sent',     label: '보낸 거래 후기' },
  { key: 'writable', label: '작성 가능한 후기' },
];

export const TradeReviewScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('sent');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData]           = useState(MAKE_DATA);

  const handleDelete = useCallback((id: string) => {
    setData((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleEdit = useCallback((_item: any) => {
    // TODO: implement edit functionality
  }, []);

  const handleWrite = useCallback((_item: any) => {
    // TODO: implement write functionality
  }, []);

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
    setIsLoading(true);
    setData(MAKE_DATA());
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ReviewItem
        item={item}
        activeTabKey={activeTab}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onWriteReview={handleWrite}
      />
    ),
    [activeTab, handleDelete, handleEdit, handleWrite],
  );

  return (
    <SafeAreaView style={s.safe}>
      <Header
        title="거래후기"
        onBack={() => navigation.goBack()}
      />

      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <FlatList
        data={data}
        keyExtractor={(d) => d.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listCon}
        ListFooterComponent={<ListFooter loading={isLoading} />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {}}
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={10}
        windowSize={7}
        initialNumToRender={8}
      />
    </SafeAreaView>
  );
};

const shadow = Platform.select({
  ios: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius:  8,
  },
  android: {
    elevation: 8,
  },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  listCon: { paddingTop: 8 },
  itemWrap: { backgroundColor: colors.white },
  itemRow: {
    flexDirection:    'row',
    paddingHorizontal: 16,
    paddingVertical:  16,
    gap:              14,
    alignItems:       'flex-start',
  },
  divider: {
    height:           1,
    backgroundColor:  colors.G200,
    marginHorizontal: 16,
  },
  thumb: {
    width:           100,
    height:          100,
    borderRadius:    4,
    overflow:        'hidden',
    backgroundColor: colors.G200,
    flexShrink:      0,
  },
  thumbImg: {
    width:  100,
    height: 100,
  },
  con: { flex: 1 },
  topRow: {
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    marginBottom:    5,
  },
  orderDate: {
    fontSize:   12,
    color:      colors.G500,
    fontWeight: '400',
  },
  moreBtn:  { paddingLeft: 10 },
  moreDot: {
    fontSize:      18,
    color:         colors.G600,
    letterSpacing: 1.5,
    lineHeight:    20,
  },
  title: {
    fontSize:     13,
    fontWeight:   '500',
    color:        colors.black,
    lineHeight:   19,
    marginBottom: 6,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           3,
    marginBottom:  5,
  },
  reviewLabel: { fontSize: 12, color: colors.G600 },
  starIcon:    { fontSize: 13, color: colors.star, lineHeight: 16 },
  reviewScore: { fontSize: 12, color: colors.G600, fontWeight: '500' },
  price: {
    fontSize:      14,
    fontWeight:    '700',
    color:         colors.black,
    letterSpacing: -0.3,
  },
  writeBtn: {
    marginHorizontal: 16,
    marginBottom:     12,
    height:           44,
    borderRadius:     4,
    backgroundColor:  colors.primary,
    justifyContent:   'center',
    alignItems:       'center',
  },
  writeBtnText: {
    fontSize:      14,
    fontWeight:    '600',
    color:         colors.white,
    letterSpacing: -0.2,
  },
  ddMenu: {
    backgroundColor: colors.white,
    borderRadius:    6,
    borderWidth:     1,
    borderColor:     colors.G200,
    ...shadow,
  },
  ddItem: {
    height:          44,
    justifyContent:  'center',
    alignItems:      'center',
  },
  ddText: {
    fontSize:   14,
    color:      colors.black,
    fontWeight: '400',
  },
  ddLine: { height: 1, backgroundColor: colors.G200 },
  footer: {
    alignItems:    'center',
    paddingTop:    28,
    paddingBottom: 50,
    gap:           10,
    minHeight:     110,
  },
  footerTxt: {
    fontSize:  13,
    color:     colors.G500,
    marginTop: 8,
  },
});

