/**
 * 상품 리스트 아이템 컴포넌트
 * 이미지 썸네일 + 상품명 + 가격 + 위치/날짜 정보
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EyeIcon from '../../assets/icon/eye.svg';
import HeartIcon from '../../assets/icon/heart.svg';
import HeartOutlineIcon from '../../assets/icon/heart-1.svg';
import LayoutGridIcon from '../../assets/icon/layout-grid.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import type { ProductListItemProps } from '../../types';

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onPress,
  onLike,
  variant = 'default',
  style,
}) => {
  const formatPrice = (price?: number) => {
    if (!price) return '가격 문의';
    return `${price.toLocaleString()}원`;
  };

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, style]}
        onPress={() => onPress?.(product)}
        activeOpacity={0.7}
      >
        <View style={styles.compactImage}>
          <LayoutGridIcon width={32} height={32} color={colors.textTertiary} />
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={styles.compactPrice}>
            {product.priceLabel || formatPrice(product.price)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress?.(product)}
      activeOpacity={0.7}
    >
      {/* 썸네일 */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <LayoutGridIcon width={32} height={32} color={colors.textTertiary} />
        </View>
        {product.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {product.isHot && (
          <View style={styles.hotBadge}>
            <Text style={styles.hotBadgeText}>HOT</Text>
          </View>
        )}
      </View>

      {/* 상품 정보 */}
      <View style={styles.infoContainer}>
        {/* 태그 */}
        {product.tags && product.tags.length > 0 && (
          <View style={styles.tagRow}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 제목 */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {/* 설명 */}
        {product.description && (
          <Text style={styles.description} numberOfLines={1}>
            {product.description}
          </Text>
        )}

        {/* 가격 */}
        <Text style={styles.price}>
          {product.priceLabel || formatPrice(product.price)}
        </Text>

        {/* 위치 · 날짜 */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {product.location}
            {product.date ? ` · ${product.date}` : ''}
          </Text>
          {(product.viewCount !== undefined || product.likeCount !== undefined) && (
            <View style={styles.statsRow}>
              {product.viewCount !== undefined && (
                <View style={styles.statItem}>
                  <EyeIcon width={12} height={12} color={colors.textTertiary} />
                  <Text style={styles.statText}>{product.viewCount}</Text>
                </View>
              )}
              {product.likeCount !== undefined && (
                <View style={styles.statItem}>
                  <HeartOutlineIcon width={12} height={12} color={colors.textTertiary} />
                  <Text style={styles.statText}>{product.likeCount}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>

      {/* 좋아요 버튼 */}
      {onLike && (
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => onLike(product)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {product.isLiked ? (
            <HeartIcon width={20} height={20} color={colors.primary} />
          ) : (
            <HeartOutlineIcon width={20} height={20} color={colors.textTertiary} />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginRight: spacing.md,
    backgroundColor: colors.backgroundGray,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  newBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
  },
  newBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 9,
  },
  hotBadge: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: '#FF6D00',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
  },
  hotBadgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 9,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  tag: {
    backgroundColor: colors.backgroundGray,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginRight: spacing.xs,
    marginBottom: 2,
  },
  tagText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  description: {
    ...typography.bodySmall,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.label,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  statText: {
    ...typography.caption,
    color: colors.textTertiary,
    marginLeft: 2,
  },
  likeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.lg,
  },

  // Compact variant
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  compactImage: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  compactPrice: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default ProductListItem;
