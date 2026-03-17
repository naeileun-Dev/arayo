import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from '../common';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: () => void;
  nickname?: string;
  loading?: boolean;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  onClose,
  onVerify,
  nickname = '',
  loading = false,
}) => {
  const preventClose = () => {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={preventClose}>
            <View style={styles.card}>
              <View style={styles.nicknameRow}>
                <Text style={styles.nicknameText}>
                  {nickname || '닉네임'}
                </Text>
                <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                  <View style={styles.editIconPlaceholder} />
                </TouchableOpacity>
              </View>

              <Text style={styles.message}>...님이 본인 맞으시죠?</Text>

              <Button
                title="인증 하기"
                onPress={onVerify}
                loading={loading}
                style={styles.verifyButton}
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
    paddingHorizontal: spacing['2xl'],
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  nicknameText: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  editButton: {
    padding: spacing.xs,
  },
  editIconPlaceholder: {
    width: 20,
    height: 20,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  verifyButton: {
    marginTop: spacing.sm,
  },
});
