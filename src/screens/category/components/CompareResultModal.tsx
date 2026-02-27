import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Image,
  Animated,
  SafeAreaView,
  Platform,
} from 'react-native';
import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../../assets/icon/chevron-up.svg';
import { colors as C } from '../../../styles/colors';
import ServiceTag from '../../../components/common/ServiceTag';
import {
  Product,
  BADGE_CONFIG,
  SERVICE_ITEMS,
  MOCK_COMPARE_DETAIL,
  PROFILE_IMG,
  SCREEN_HEIGHT,
} from '../types';

interface CompareResultModalProps {
  visible: boolean;
  products: Product[];
  onClose: () => void;
}

const CompareResultItem = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <View style={styles.resultItem}>
      <View style={styles.itemHead}>
        <View style={styles.storeRow}>
          <Image source={PROFILE_IMG} style={styles.storeProfileImg} />
          <Text style={styles.storeName}>{MOCK_COMPARE_DETAIL.storeName}</Text>
        </View>
        <View style={[styles.stateBadge, { backgroundColor: C.green100 }]}>
          <Text style={[styles.stateBadgeText, { color: C.white }]}>예약중</Text>
        </View>
      </View>

      <View style={styles.thumbWrap}>
        <Image source={product.image} style={styles.thumbImage} resizeMode="cover" />
      </View>

      <View style={styles.infoBlock}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>담당자명</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.manager}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>휴대폰번호</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>판매 금액</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{product.price.toLocaleString()}원</Text>
            {MOCK_COMPARE_DETAIL.negotiable && (
              <View style={styles.negotiableTag}>
                <Text style={styles.negotiableTagText}>협의가능</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoBlock}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>제조사</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.manufacturer}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>모델명</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.model}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>제조연월</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.madeDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>제품위치</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>보증기간</Text>
          <Text style={styles.infoValue}>{MOCK_COMPARE_DETAIL.warranty}</Text>
        </View>
      </View>

      {expanded && (
        <View>
          <View style={styles.divider} />
          <View style={styles.serviceSection}>
            <Text style={styles.serviceTitle}>서비스</Text>
            <View style={styles.srvGrid}>
              {SERVICE_ITEMS.map((col, colIdx) => (
                <View key={colIdx} style={styles.srvCol}>
                  {col.map((srv, idx) => (
                    <ServiceTag key={idx} {...srv} />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.expandBtn}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.expandBtnText}>{expanded ? '접기' : '더보기'}</Text>
        {expanded
          ? <ChevronUpIcon width={14} height={14} color={C.G500} />
          : <ChevronDownIcon width={14} height={14} color={C.G500} />}
      </TouchableOpacity>

      {!contactOpen ? (
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => setContactOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.contactBtnText}>연락하기</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.contactBtns}>
          <TouchableOpacity style={styles.contactSubBtn} activeOpacity={0.8}>
            <Text style={styles.contactSubBtnText}>채팅하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactSubBtn} activeOpacity={0.8}>
            <Text style={styles.contactSubBtnText}>전화하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactSubBtn} activeOpacity={0.8}>
            <Text style={styles.contactSubBtnText}>문자하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const CompareResultModal = ({ visible, products, onClose }: CompareResultModalProps) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(SCREEN_HEIGHT);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.sheetHead}>
              <View style={styles.sheetHandle} />
              <View style={styles.sheetTitleRow}>
                <Text style={styles.sheetTitle}>
                  비교하기 <Text style={{ color: C.primary }}>({products.length})</Text>
                </Text>
                <TouchableOpacity onPress={handleClose} style={styles.sheetCloseBtn} activeOpacity={0.7}>
                  <Text style={styles.sheetCloseBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {products.length === 0 ? (
                <View style={styles.emptyWrap}>
                  <Text style={styles.emptyText}>비교할 상품이 없습니다.</Text>
                </View>
              ) : (
                products.map((product, idx) => (
                  <View key={product.id}>
                    <CompareResultItem product={product} />
                    {idx < products.length - 1 && <View style={styles.itemDivider} />}
                  </View>
                ))
              )}
              <View style={{ height: 40 }} />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    height: SCREEN_HEIGHT * 0.92,
    backgroundColor: C.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.15, shadowRadius: 20 },
      android: { elevation: 24 },
    }),
  },
  sheetHead: { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: C.G200 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: C.G300, alignSelf: 'center', marginBottom: 14 },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: C.black },
  sheetCloseBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  sheetCloseBtnText: { fontSize: 18, color: C.G600 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },
  emptyWrap: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: C.G500 },
  itemDivider: { height: 1, backgroundColor: C.G200, marginVertical: 20 },
  resultItem: { backgroundColor: C.white, borderWidth: 1, borderColor: C.G200, borderRadius: 12, overflow: 'hidden', marginBottom: 4 },
  itemHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, backgroundColor: C.G100 },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  storeProfileImg: { width: 32, height: 32, borderRadius: 8 },
  storeName: { fontSize: 14, fontWeight: '600', color: C.black },
  stateBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  stateBadgeText: { fontSize: 12, fontWeight: '700' },
  thumbWrap: { width: '100%', height: 200, backgroundColor: C.G100 },
  thumbImage: { width: '100%', height: '100%' },
  infoBlock: { paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoLabel: { width: 80, fontSize: 13, color: C.G600, fontWeight: '500', flexShrink: 0 },
  infoValue: { flex: 1, fontSize: 13, color: C.black, fontWeight: '500' },
  priceRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  priceText: { fontSize: 15, fontWeight: '700', color: C.black },
  negotiableTag: { backgroundColor: '#FFF0F2', borderWidth: 1, borderColor: '#FFB3BE', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  negotiableTagText: { fontSize: 11, fontWeight: '600', color: C.primary },
  divider: { height: 1, backgroundColor: C.G100, marginHorizontal: 14 },
  serviceSection: { paddingHorizontal: 14, paddingVertical: 12 },
  serviceTitle: { fontSize: 13, fontWeight: '700', color: C.black, marginBottom: 10 },
  srvGrid: { flexDirection: 'row', gap: 8 },
  srvCol: { flex: 1, gap: 8 },
  expandBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: C.G100, gap: 4 },
  expandBtnText: { fontSize: 13, color: C.G500, fontWeight: '500' },
  contactBtn: { marginHorizontal: 14, marginBottom: 14, height: 48, backgroundColor: C.primary, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  contactBtnText: { fontSize: 15, fontWeight: '700', color: C.white },
  contactBtns: { flexDirection: 'row', marginHorizontal: 14, marginBottom: 14, gap: 8 },
  contactSubBtn: { flex: 1, height: 44, backgroundColor: C.white, borderWidth: 1, borderColor: C.G300, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  contactSubBtnText: { fontSize: 13, fontWeight: '600', color: C.black },
});

export default CompareResultModal;
