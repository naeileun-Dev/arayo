import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeartIcon from '../../assets/icon/heart.svg';
import ComparisonIcon from '../../assets/icon/comparison.svg';
import CommentIcon from '../../assets/icon/comment.svg';
import CheckIcon from '../../assets/icon/check.svg';
import { colors } from '../../styles/colors';
import { ProductListItem, BADGE_CONFIG, GRID_ITEM_WIDTH } from '../../types/product';

export interface ProductItemProps {
  item: ProductListItem;
  isCompared: boolean;
  onCompareToggle: (id: string) => void;
  onLikeToggle: (id: string) => void;
  onPress: (id: string) => void;
  isSoldOpacity: boolean;
  bottomContent?: React.ReactNode;
}

export const ProductItemMagazine = React.memo(
  ({ item, isCompared, onCompareToggle, onLikeToggle, onPress, bottomContent }: ProductItemProps) => {
    const badgeCfg = BADGE_CONFIG[item.state];
    const isHold = item.state === 'hold';

    const handlePress = () => onPress(item.id);
    const handleLikeToggle = () => onLikeToggle(item.id);
    const handleCompareToggle = () => onCompareToggle(item.id);

    return (
      <TouchableOpacity style={styles.productItem} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.mainRow}>
          <View style={styles.thumbWrap}>
            {item.image != null ? (
              <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
            ) : (
              <View style={[styles.thumbImage, styles.thumbPlaceholder]} />
            )}
            {isHold && (
              <View style={styles.holdOverlay}>
                <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
              </View>
            )}
            {item.state !== 'normal' && (
              <View
                style={[
                  styles.stateBadge,
                  { backgroundColor: badgeCfg.bg },
                  item.state === 'sold' && styles.stateBadgeSold,
                ]}
              >
                <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>
                  {badgeCfg.label}
                </Text>
              </View>
            )}
            {item.isAd && (
              <View style={styles.adBadge}>
                <Text style={styles.adBadgeText}>AD</Text>
              </View>
            )}
            <TouchableOpacity style={styles.likeBtn} onPress={handleLikeToggle} activeOpacity={0.7}>
              <HeartIcon width={18} height={18} color={item.isLiked ? colors.primary : colors.G400} />
            </TouchableOpacity>
          </View>
          <View style={styles.conWrap}>
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <TouchableOpacity
                  onPress={handleCompareToggle}
                  style={styles.compareIconBtn}
                  activeOpacity={0.7}
                >
                  <ComparisonIcon
                    width={18}
                    height={18}
                    color={isCompared ? colors.primary : colors.G400}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.productTags} numberOfLines={1}>
                {item.tags}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {item.priceLabel ?? `${item.price.toLocaleString()}원`}
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{item.timeAgo}</Text>
                <HeartIcon width={14} height={14} color={colors.black} />
                <Text style={styles.metaText}>{item.likes}</Text>
                {item.reviews != null && (
                  <>
                    <CommentIcon width={14} height={14} color={colors.black} />
                    <Text style={styles.metaText}>{item.reviews}</Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
        {bottomContent}
      </TouchableOpacity>
    );
  },
);

export const ProductItemGrid = React.memo(
  ({ item, isCompared, onCompareToggle, onLikeToggle, onPress }: ProductItemProps) => {
    const badgeCfg = BADGE_CONFIG[item.state];
    const isHold = item.state === 'hold';

    const handlePress = () => onPress(item.id);
    const handleLikeToggle = () => onLikeToggle(item.id);
    const handleCompareToggle = () => onCompareToggle(item.id);

    return (
      <TouchableOpacity style={styles.gridItem} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.gridThumbWrap}>
          {item.image != null ? (
            <Image source={item.image} style={styles.gridThumbImage} resizeMode="cover" />
          ) : (
            <View style={[styles.gridThumbImage, styles.thumbPlaceholder]} />
          )}
          {isHold && (
            <View style={styles.holdOverlay}>
              <Text style={styles.holdOverlayText}>{'예약중인\n상품입니다.'}</Text>
            </View>
          )}
          {item.state !== 'normal' && (
            <View
              style={[
                styles.stateBadge,
                { backgroundColor: badgeCfg.bg },
                item.state === 'sold' && styles.stateBadgeSold,
              ]}
            >
              <Text style={[styles.stateBadgeText, { color: badgeCfg.text }]}>
                {badgeCfg.label}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.gridLikeBtn} onPress={handleLikeToggle} activeOpacity={0.7}>
            <HeartIcon width={18} height={18} color={item.isLiked ? colors.primary : colors.G400} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridCon}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.gridTags} numberOfLines={1}>
            {item.tags}
          </Text>
          <View style={styles.gridPriceRow}>
            <Text style={styles.gridPrice}>
              {item.priceLabel ?? `${item.price.toLocaleString()}원`}
            </Text>
            <Text style={styles.gridMeta}>{item.timeAgo}</Text>
          </View>
          <TouchableOpacity
            style={[styles.gridCompareBtn, isCompared && styles.gridCompareBtnActive]}
            onPress={handleCompareToggle}
            activeOpacity={0.7}
          >
            <CheckIcon width={14} height={14} color={isCompared ? colors.white : '#3B3B3B'} />
            <Text
              style={[styles.gridCompareBtnText, isCompared && styles.gridCompareBtnTextActive]}
            >
              비교하기
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  productItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
  },
  mainRow: {
    flexDirection: 'row',
  },
  thumbWrap: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.G100,
    position: 'relative',
    flexShrink: 0,
  },
  thumbImage: { width: '100%', height: '100%' },
  thumbPlaceholder: { backgroundColor: colors.G200 },
  holdOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  holdOverlayText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
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
  adBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
  },
  adBadgeText: { color: colors.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  likeBtn: { position: 'absolute', bottom: 8, right: 8 },
  conWrap: { flex: 1, marginLeft: 14, justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  productTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  compareIconBtn: { paddingLeft: 8, paddingTop: 2 },
  productTags: { fontSize: 13, color: colors.G500, marginTop: 2, fontWeight: '500' },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '700', color: colors.black, letterSpacing: -0.3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: colors.G500, fontWeight: '500' },

  gridItem: {
    width: GRID_ITEM_WIDTH,
    backgroundColor: colors.G100,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 12,
  },
  gridThumbWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.G200,
    position: 'relative',
  },
  gridThumbImage: { width: '100%', height: '100%' },
  gridLikeBtn: { position: 'absolute', bottom: 8, right: 8 },
  gridCon: { paddingTop: 10 },
  gridTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  gridTags: { fontSize: 11, color: colors.G500, marginTop: 3 },
  gridPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  gridPrice: { fontSize: 13, fontWeight: '600', color: colors.black },
  gridMeta: { fontSize: 11, color: colors.G600 },
  gridCompareBtn: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    gap: 6,
    marginTop: 10,
  },
  gridCompareBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  gridCompareBtnText: { fontSize: 13, fontWeight: '500', color: '#3B3B3B' },
  gridCompareBtnTextActive: { color: colors.white },
});
