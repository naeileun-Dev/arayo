import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from '../common';

const productImage = require('../../assets/images/img01.png');

interface BumpModalProps {
  visible: boolean;
  onClose: () => void;
  onBump: () => void;
  productName?: string;
  currentPrice?: string;
  likeCount?: number;
}

export const BumpModal: React.FC<BumpModalProps> = ({
  visible,
  onClose,
  onBump,
  productName = 'CNC선반 10인치',
  currentPrice = '1,000,000',
  likeCount = 7,
}) => {
  const [newPrice, setNewPrice] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>끌어올리기</Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Product Info */}
              <View style={styles.productRow}>
                <Image source={productImage} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{productName}</Text>
                  <Text style={styles.productPrice}>{currentPrice}원</Text>
                </View>
              </View>

              {/* Hint */}
              <View style={styles.hintBox}>
                <Text style={styles.hintText}>
                  지금 가격을 낮추면,{'\n'}관심을 누른 {likeCount}명의 분들께 알림이 가요
                </Text>
              </View>

              {/* Price Input */}
              <View style={styles.priceRow}>
                <View style={styles.priceInputBox}>
                  <TextInput
                    style={styles.priceInput}
                    value={newPrice}
                    onChangeText={setNewPrice}
                    keyboardType="number-pad"
                    placeholder="가격을 입력해 주세요."
                    placeholderTextColor={colors.G400}
                  />
                  <Text style={styles.priceUnit}>원</Text>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountArrow}>▼</Text>
                  <Text style={styles.discountText}>-5%</Text>
                </View>
              </View>

              {/* Button */}
              <Button title="끌어올리기" onPress={onBump} style={styles.bumpButton} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
    height: 64,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  hintBox: {
    backgroundColor: 'rgba(15, 83, 255, 0.05)',
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  hintText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
    textAlign: 'left',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  priceInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
  },
  priceInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    padding: 0,
  },
  priceUnit: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G500,
    marginLeft: spacing.sm,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: spacing.base,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    gap: 4,
  },
  discountArrow: {
    fontSize: 20,
      fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.primary,
  },
  discountText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.primary,
  },
  bumpButton: {
    marginTop: spacing.sm,
  },
});
