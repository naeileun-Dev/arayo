/**
 * 플로팅 액션 버튼 (FAB) 컴포넌트
 * 상품 등록 및 빠른 액션
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import XIcon from '../../assets/icon/X.svg';
import TriangleUpIcon from '../../assets/icon/triangle-up.svg';
import TriangleDownIcon from '../../assets/icon/triangle-down.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius, shadows } from '../../styles/spacing';

interface FABProps {
  onPost?: () => void;
  onQuickSell?: () => void;
  onQuickBuy?: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({
  onPost,
  onQuickSell,
  onQuickBuy,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      {/* 확장 메뉴 */}
      {isExpanded && (
        <View style={styles.expandedMenu}>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => {
              setIsExpanded(false);
              onQuickSell?.();
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.subButtonIcon, { backgroundColor: '#FF6D00' }]}>
              <TriangleUpIcon width={18} height={18} color={colors.white} />
            </View>
            <Text style={styles.subButtonLabel}>판매하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subButton}
            onPress={() => {
              setIsExpanded(false);
              onQuickBuy?.();
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.subButtonIcon, { backgroundColor: '#1976D2' }]}>
              <TriangleDownIcon width={18} height={18} color={colors.white} />
            </View>
            <Text style={styles.subButtonLabel}>구매하기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 메인 FAB */}
      <TouchableOpacity
        style={[
          styles.mainButton,
          isExpanded && styles.mainButtonActive,
        ]}
        onPress={onPost || toggleExpand}
        activeOpacity={0.8}
      >
        {isExpanded ? (
          <XIcon width={24} height={24} color={colors.white} />
        ) : (
          <Text style={styles.mainButtonText}>+</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
  },
  expandedMenu: {
    marginBottom: spacing.md,
  },
  subButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  subButtonLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    fontWeight: '600',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    ...shadows.sm,
    overflow: 'hidden',
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  mainButtonActive: {
    backgroundColor: colors.secondary,
  },
  mainButtonText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '300',
    lineHeight: 30,
  },
});

export default FloatingActionButton;
