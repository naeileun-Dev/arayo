import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../styles/colors';

interface OrderConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>주문확인</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.message}>주문하시겠습니까?</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              activeOpacity={0.8}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  closeBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '300',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.G100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.G600,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
});

