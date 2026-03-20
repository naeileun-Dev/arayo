import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import CheckIcon from '../../assets/icon/check.svg';

interface ProcessStep {
  number: number;
  label: string;
}

interface ProcessGuideModalProps {
  visible: boolean;
  title: string;
  processTitle: string;
  steps: ProcessStep[];
  completeLabel: string;
  ctaLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ProcessGuideModal: React.FC<ProcessGuideModalProps> = ({
  visible,
  title,
  processTitle,
  steps,
  completeLabel,
  ctaLabel,
  onClose,
  onConfirm,
}) => {
  const [dontShowChecked, setDontShowChecked] = useState(false);

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
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Process Title */}
              <Text style={styles.processTitle}>{processTitle}</Text>

              {/* Steps */}
              <View style={styles.stepsContainer}>
                {steps.map((step, idx) => {
                  const isLast = idx === steps.length - 1;
                  return (
                    <View key={step.number}>
                      <View style={styles.stepRow}>
                        <View style={[styles.stepCircle, isLast && styles.stepCircleLast]}>
                          <Text style={styles.stepNumber}>{step.number}</Text>
                        </View>
                        <Text style={styles.stepLabel}>{step.label}</Text>
                      </View>
                      {!isLast && <View style={styles.stepLine} />}
                    </View>
                  );
                })}

                {/* Dotted line */}
                <View style={styles.dottedLine}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>

                {/* Complete */}
                <View style={styles.stepRow}>
                  <View style={styles.completeCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                  <Text style={styles.completeLabel}>{completeLabel}</Text>
                </View>
              </View>

              {/* Don't show checkbox */}
              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.7}
                onPress={() => setDontShowChecked(!dontShowChecked)}
              >
                <View style={[styles.checkbox, dontShowChecked && styles.checkboxChecked]}>
                  {dontShowChecked && <CheckIcon width={12} height={12} color={colors.white} />}
                </View>
                <Text style={styles.checkboxLabel}>7일간 보지 않기</Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.7}
                  onPress={onClose}
                >
                  <Text style={styles.cancelText}>닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  activeOpacity={0.7}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmText}>{ctaLabel}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const STEP_BG = '#F8CCD3';
const STEP_BG_LAST = '#FA657D';

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
  processTitle: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  stepsContainer: {
    paddingLeft: spacing.sm,
    marginBottom: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: STEP_BG,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepCircleLast: {
    backgroundColor: STEP_BG_LAST,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.white,
  },
  stepLabel: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  stepLine: {
    width: 2,
    height: 28,
    backgroundColor: STEP_BG,
    marginLeft: 17,
  },
  dottedLine: {
    marginLeft: 15,
    gap: 4,
    paddingVertical: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DB0025',
  },
  completeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DB0025',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  checkMark: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '700',
  },
  completeLabel: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: colors.G500,
    borderColor: colors.G500,
  },
  checkboxLabel: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G500,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.G200,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  confirmButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
});
