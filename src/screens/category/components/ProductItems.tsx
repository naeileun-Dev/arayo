import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeartIcon from '../../../assets/icon/heart.svg';
import ComparisonIcon from '../../../assets/icon/comparison.svg';
import CommentIcon from '../../../assets/icon/comment.svg';
import CheckIcon from '../../../assets/icon/check.svg';
import { colors as C } from '../../../styles/colors';
import { Product, BADGE_CONFIG, GRID_ITEM_WIDTH } from '../types';

export interface ProductItemProps {
  item: Product;
  isCompared: boolean;
  onCompareToggle: (id: string) => void;
  onLikeToggle: (id: string) => void;
  onPress: (id: string) => void;
  isSoldOpacity: boolean;
}

export const ProductItemMagazine = React.memo(({
  item, isCompared, onCompareToggle, onLikeToggle, onPress,
}: ProductItemProps) => {
  const badgeCfg = BADGE_CONFIG[item.state];
  const isHold = item.state === 'hold';

  return (
    <TouchableOpacity style={styles.productItem} onPress={() => onPress(item.id)} activeOpacity={0.8}>
      <View style={styles.thumbWrap}>
        <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
        {isHold && (
          <View style={styles.holdOverlay}>
            <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
          </View>
        )}
        {item.state !== 'normal' && (
          <View style={[styles.stateBadge, { backgroundColor: badgeCfg.bg }, item.state === 'sold' && styles.stateBadgeSold]}>
            <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>{badgeCfg.label}</Text>
          </View>
        )}
        {item.isAd && (
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>AD</Text>
          </View>
        )}
        <TouchableOpacity style={styles.likeBtn} onPress={() => onLikeToggle(item.id)} activeOpacity={0.7}>
          <HeartIcon width={18} height={18} color={item.isLiked ? C.primary : C.G400} />
        </TouchableOpacity>
      </View>
      <View style={styles.conWrap}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
            <TouchableOpacity onPress={() => onCompareToggle(item.id)} style={styles.compareIconBtn} activeOpacity={0.7}>
              <ComparisonIcon width={18} height={18} color={isCompared ? C.primary : C.G400} />
            </TouchableOpacity>
          </View>
          <Text style={styles.productTags} numberOfLines={1}>{item.tags}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.timeAgo}</Text>
            <HeartIcon width={14} height={14} color={C.black} />
            <Text style={styles.metaText}>{item.likes}</Text>
            <CommentIcon width={14} height={14} color={C.black} />
            <Text style={styles.metaText}>{item.reviews}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export const ProductItemGrid = React.memo(({
  item, isCompared, onCompareToggle, onLikeToggle, onPress,
}: ProductItemProps) => {
  const badgeCfg = BADGE_CONFIG[item.state];
  const isHold = item.state === 'hold';

  return (
    <TouchableOpacity style={styles.gridItem} onPress={() => onPress(item.id)} activeOpacity={0.8}>
      <View style={styles.gridThumbWrap}>
        <Image source={item.image} style={styles.gridThumbImage} resizeMode="cover" />
        {isHold && (
          <View style={styles.holdOverlay}>
            <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
          </View>
        )}
        {item.state !== 'normal' && (
          <View style={[styles.stateBadge, { backgroundColor: badgeCfg.bg }, item.state === 'sold' && styles.stateBadgeSold]}>
            <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>{badgeCfg.label}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.gridLikeBtn} onPress={() => onLikeToggle(item.id)} activeOpacity={0.7}>
          <HeartIcon width={18} height={18} color={item.isLiked ? C.primary : C.G400} />
        </TouchableOpacity>
      </View>
      <View style={styles.gridCon}>
        <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.gridTags} numberOfLines={1}>{item.tags}</Text>
        <View style={styles.gridPriceRow}>
          <Text style={styles.gridPrice}>{item.price.toLocaleString()}원</Text>
          <Text style={styles.gridMeta}>{item.timeAgo}</Text>
        </View>
        <TouchableOpacity
          style={[styles.gridCompareBtn, isCompared && styles.gridCompareBtnActive]}
          onPress={() => onCompareToggle(item.id)}
          activeOpacity={0.7}
        >
          <CheckIcon width={14} height={14} color={isCompared ? C.white : '#3B3B3B'} />
          <Text style={[styles.gridCompareBtnText, isCompared && styles.gridCompareBtnTextActive]}>비교하기</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  // Magazine item
  productItem: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: C.G200, backgroundColor: C.white,
  },
  thumbWrap: {
    width: 120, height: 120, borderRadius: 6, overflow: 'hidden',
    backgroundColor: C.G100, position: 'relative', flexShrink: 0,
  },
  thumbImage: { width: '100%', height: '100%' },
  holdOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  holdOverlayText: { color: C.white, fontSize: 14, fontWeight: '700', textAlign: 'center', lineHeight: 20 },
  stateBadge: { position: 'absolute', top: 0, left: 0, paddingHorizontal: 7, paddingVertical: 4, borderBottomRightRadius: 6 },
  stateBadgeSold: { borderWidth: 1, borderColor: C.G300 },
  stateBadgeText: { color: C.white, fontSize: 11, fontWeight: '700', letterSpacing: -0.2 },
  adBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.45)', paddingHorizontal: 6, paddingVertical: 3, borderBottomLeftRadius: 6 },
  adBadgeText: { color: C.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  likeBtn: { position: 'absolute', bottom: 8, right: 8 },
  conWrap: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  productTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: C.black, lineHeight: 20, letterSpacing: -0.2 },
  compareIconBtn: { paddingLeft: 8, paddingTop: 2 },
  productTags: { fontSize: 13, color: C.G500, marginTop: 2, fontWeight: '500' },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '700', color: C.black, letterSpacing: -0.3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: C.G500, fontWeight: '500' },

  // Grid item
  gridItem: { width: GRID_ITEM_WIDTH, backgroundColor: C.G100, borderRadius: 5, overflow: 'hidden', padding: 12 },
  gridThumbWrap: { width: '100%', aspectRatio: 1, borderRadius: 6, overflow: 'hidden', backgroundColor: C.G200, position: 'relative' },
  gridThumbImage: { width: '100%', height: '100%' },
  gridLikeBtn: { position: 'absolute', bottom: 8, right: 8 },
  gridCon: { paddingTop: 10 },
  gridTitle: { fontSize: 13, fontWeight: '700', color: C.black, lineHeight: 18, letterSpacing: -0.2 },
  gridTags: { fontSize: 11, color: C.G500, marginTop: 3 },
  gridPriceRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 },
  gridPrice: { fontSize: 13, fontWeight: '600', color: C.black },
  gridMeta: { fontSize: 11, color: C.G600 },
  gridCompareBtn: {
    width: '100%', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white, borderWidth: 1, borderColor: C.G300, borderRadius: 6, gap: 6, marginTop: 10,
  },
  gridCompareBtnActive: { backgroundColor: C.primary, borderColor: C.primary },
  gridCompareBtnText: { fontSize: 13, fontWeight: '500', color: '#3B3B3B' },
  gridCompareBtnTextActive: { color: C.white },
});
