import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import RefreshIcon from '../../assets/icon/refresh-cw.svg';
import TrashIcon from '../../assets/icon/trash.svg';
import { colors } from '../../styles/colors';
import { ProductListItem, BADGE_CONFIG, COMPARE_CARD_WIDTH, SCREEN_HEIGHT } from '../../types/product';

interface ComparePanelProps {
  products: ProductListItem[];
  onRemove: (id: string) => void;
  onReset: () => void;
  onViewResult: () => void;
  onClose: () => void;
}

const MAX_SLOTS = 6;
const SLOTS_PER_ROW = 2;

export const ComparePanel = ({
  products,
  onRemove,
  onReset,
  onViewResult,
  onClose,
}: ComparePanelProps) => {
  const slots: (ProductListItem | null)[] = [...products];
  while (slots.length < MAX_SLOTS) {
    slots.push(null);
  }

  const rows: (ProductListItem | null)[][] = [];
  for (let i = 0; i < slots.length; i += SLOTS_PER_ROW) {
    rows.push([slots[i], slots[i + 1]]);
  }

  const renderProductCard = (product: ProductListItem) => (
    <View key={product.id} style={styles.panelCard}>
      <View style={styles.panelCardThumbWrap}>
        {product.image != null ? (
          <Image source={product.image} style={styles.panelCardThumbImage} resizeMode="cover" />
        ) : (
          <View style={[styles.panelCardThumbImage, styles.thumbPlaceholder]} />
        )}
        <TouchableOpacity
          style={styles.panelCardTrashBtn}
          onPress={() => onRemove(product.id)}
          activeOpacity={0.7}
        >
          <TrashIcon width={20} height={20} color={colors.G600} />
        </TouchableOpacity>
        {product.state !== 'normal' && (
          <View
            style={[
              styles.stateBadge,
              { backgroundColor: BADGE_CONFIG[product.state].bg },
              product.state === 'sold' && styles.stateBadgeSold,
            ]}
          >
            <Text style={[styles.stateBadgeText, { color: BADGE_CONFIG[product.state].text }]}>
              {BADGE_CONFIG[product.state].label}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.panelCardCon}>
        <Text style={styles.panelCardTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.panelCardTags} numberOfLines={1}>
          {product.tags}
        </Text>
        <Text style={styles.panelCardPrice}>
          {product.priceLabel ?? `${product.price.toLocaleString()}원`}
        </Text>
        <View style={styles.panelCardMetaRow}>
          <Text style={styles.panelCardMeta}>{product.timeAgo}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.panelCardMeta}>관심 {product.likes}</Text>
          {product.reviews != null && (
            <>
              <View style={styles.metaDot} />
              <Text style={styles.panelCardMeta}>후기 {product.reviews}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );

  const renderEmptySlot = (rowIdx: number, colIdx: number) => (
    <View key={`empty-${rowIdx}-${colIdx}`} style={styles.panelCardEmpty}>
      <Text style={styles.panelSlotEmptyText}>+</Text>
    </View>
  );

  return (
    <View style={styles.comparePanelWrap}>
      <TouchableOpacity style={styles.panelToggleBtn} onPress={onClose} activeOpacity={0.8}>
        <Text style={styles.panelToggleArrow}>▼</Text>
      </TouchableOpacity>
      <View style={styles.comparePanel}>
        <View style={styles.panelHead}>
          <Text style={styles.panelTitle}>
            카테고리별 제품 비교하기 <Text style={{ color: colors.primary }}>{products.length}</Text>
            /{MAX_SLOTS}
          </Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.panelCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.panelSlotsGrid} showsVerticalScrollIndicator={false}>
          {rows.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.panelGridRow}>
              {row.map((product, colIdx) =>
                product ? renderProductCard(product) : renderEmptySlot(rowIdx, colIdx),
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.panelBtns}>
          <TouchableOpacity style={styles.panelBtnReset} onPress={onReset}>
            <RefreshIcon width={16} height={16} color={colors.G600} />
            <Text style={styles.panelBtnResetText}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelBtnResult} onPress={onViewResult}>
            <Text style={styles.panelBtnResultText}>결과보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comparePanelWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' },
  panelToggleBtn: {
    width: 80,
    height: 36,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 6 },
    }),
  },
  panelToggleArrow: { fontSize: 16, color: colors.G600, fontWeight: '700' },
  comparePanel: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 20 },
    }),
  },
  panelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  panelTitle: { fontSize: 15, fontWeight: '700', color: colors.black },
  panelCloseText: { fontSize: 16, color: colors.G500, padding: 4 },
  panelSlotsGrid: { maxHeight: SCREEN_HEIGHT * 0.45, marginBottom: 14 },
  panelGridRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  panelCard: {
    width: COMPARE_CARD_WIDTH,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  panelCardThumbWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.G100,
    position: 'relative',
  },
  panelCardThumbImage: { width: '100%', height: '100%' },
  thumbPlaceholder: { backgroundColor: colors.G200 },
  panelCardTrashBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
      },
      android: { elevation: 3 },
    }),
  },
  stateBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderBottomRightRadius: 6,
  },
  stateBadgeSold: { borderWidth: 1, borderColor: colors.G300 },
  stateBadgeText: { color: colors.white, fontSize: 11, fontWeight: '700', letterSpacing: -0.2 },
  panelCardCon: { padding: 8 },
  panelCardTitle: { fontSize: 12, fontWeight: '500', color: colors.black, lineHeight: 17 },
  panelCardTags: { fontSize: 10, color: colors.system100, marginTop: 2 },
  panelCardPrice: { fontSize: 14, fontWeight: '700', color: colors.black, marginTop: 4 },
  panelCardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  panelCardMeta: { fontSize: 10, color: colors.G500 },
  metaDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: colors.G300 },
  panelCardEmpty: {
    width: COMPARE_CARD_WIDTH,
    aspectRatio: 0.65,
    borderWidth: 1.5,
    borderColor: colors.G300,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelSlotEmptyText: { fontSize: 24, color: colors.G300, fontWeight: '300' },
  panelBtns: { flexDirection: 'row', gap: 8 },
  panelBtnReset: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    backgroundColor: colors.G100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  panelBtnResetText: { fontSize: 15, fontWeight: '600', color: colors.G600 },
  panelBtnResult: {
    flex: 1,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelBtnResultText: { fontSize: 15, fontWeight: '600', color: colors.white },
});
