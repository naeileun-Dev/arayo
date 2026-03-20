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
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from '../common';

interface AlreadyRegisteredModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AlreadyRegisteredModal: React.FC<AlreadyRegisteredModalProps> = ({
  visible,
  onClose,
  onLogin,
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
                <Text style={styles.title}>회원가입</Text>
                <TouchableOpacity onPress={onClose} activeOpacity={0.7} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.message}>이미 가입된 계정이 있습니다.</Text>

              <Button
                title="로그인하기"
                onPress={onLogin}
                style={styles.loginButton}
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
    marginBottom: spacing['3xl'],
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
  message: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
  },
  loginButton: {
    marginTop: spacing.sm,
  },
});
