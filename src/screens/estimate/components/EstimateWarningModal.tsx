import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../../styles/colors';
import { fontFamily } from '../../../styles/typography';
import { spacing, borderRadius } from '../../../styles/spacing';
import { Button } from '../../../components/common';

interface EstimateWarningModalProps {
  visible: boolean;
  onClose: () => void;
}

export const EstimateWarningModal: React.FC<EstimateWarningModalProps> = ({
  visible,
  onClose,
}) => {
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
              <View style={styles.header}>
                <Text style={styles.title}>견적 문의 주의사항</Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.boldText}>낯선 번호로 연락이 올 수 있습니다.</Text>
              <Text style={styles.grayText}>
                업체로부터 연락이 오더라도 당황하지 마시고 연락을 받아주세요!
              </Text>

              <Text style={[styles.boldText, { marginTop: spacing.xl }]}>
                견적 문의 과정에서 발생한 어떠한 피해 및 손해에 대해서는 아라요 기계장터는 책임지지 않습니다.
              </Text>
              <Text style={styles.grayText}>
                견적 과정에서 발생한 모든 일은 구매자가 책임져야 합니다. 안전거래를 위해 주의를 기울여 주세요!
              </Text>

              <Button
                title="확인"
                onPress={onClose}
                style={styles.confirmButton}
              />
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
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  boldText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  grayText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G500,
    lineHeight: 20,
  },
  confirmButton: {
    marginTop: spacing['2xl'],
  },
});
