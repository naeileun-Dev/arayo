/**
 * PASS 본인인증 모달 컴포넌트
 */

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
import Button from '../common/Button';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: () => void;
  nickname?: string;
  loading?: boolean;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  onClose,
  onVerify,
  nickname = '',
  loading = false,
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
              {/* 닉네임 + 편집 영역 */}
              <View style={styles.nicknameRow}>
                <Text style={styles.nicknameText}>
                  {nickname || '닉네임'}
                </Text>
                <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                  <View style={styles.editIconPlaceholder} />
                </TouchableOpacity>
              </View>

              {/* 본인 확인 메시지 */}
              <Text style={styles.message}>
                ...님이 본인 맞으시죠?
              </Text>

              {/* 인증 하기 버튼 */}
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

export default VerificationModal;
