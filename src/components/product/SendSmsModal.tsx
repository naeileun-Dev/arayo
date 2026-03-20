import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from '../common';
import PhoneIcon from '../../assets/icon/phone.svg';

interface SendSmsModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: () => void;
  sellerName?: string;
  productName?: string;
  phoneNumber?: string;
}

export const SendSmsModal: React.FC<SendSmsModalProps> = ({
  visible,
  onClose,
  onSend,
  sellerName = '김샘플',
  productName = 'CNC선반',
  phoneNumber,
}) => {
  const isGuest = !phoneNumber;

  const [message, setMessage] = useState(
    `아라요 기계장터에 등록된 '${productName}'을 보고 구매 문의 드립니다. 연락 부탁 드립니다.`,
  );
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

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
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>
                    아라요 기계장터({sellerName})님에게 문자
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.7}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* 문의 내용 */}
                <Text style={styles.sectionLabel}>문의 내용</Text>
                <View style={styles.messageBox}>
                  <TextInput
                    style={styles.messageInput}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    textAlignVertical="top"
                  />
                </View>

                {/* 연락처 */}
                <Text style={styles.sectionLabel}>연락처</Text>

                {isGuest ? (
                  <View style={styles.phoneInputRow}>
                    <View style={styles.phoneField}>
                      <TextInput
                        style={styles.phoneInput}
                        value={phone1}
                        onChangeText={setPhone1}
                        keyboardType="number-pad"
                        maxLength={3}
                        placeholder="010"
                        placeholderTextColor="#B1B1B1"
                        textAlign="center"
                      />
                    </View>
                    <Text style={styles.phoneDash}>-</Text>
                    <View style={styles.phoneField}>
                      <TextInput
                        style={styles.phoneInput}
                        value={phone2}
                        onChangeText={setPhone2}
                        keyboardType="number-pad"
                        maxLength={4}
                        placeholder="1234"
                        placeholderTextColor="#B1B1B1"
                        textAlign="center"
                      />
                    </View>
                    <Text style={styles.phoneDash}>-</Text>
                    <View style={styles.phoneField}>
                      <TextInput
                        style={styles.phoneInput}
                        value={phone3}
                        onChangeText={setPhone3}
                        keyboardType="number-pad"
                        maxLength={4}
                        placeholder="5678"
                        placeholderTextColor="#B1B1B1"
                        textAlign="center"
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.phoneDisplay}>
                    <View style={styles.phoneIconBox}>
                      <PhoneIcon width={40} height={40} color={colors.white} />
                    </View>
                    <Text style={styles.phoneDisplayText}>{phoneNumber}</Text>
                  </View>
                )}

                <View style={styles.buttonArea}>
                  <Button title="문자 발송하기" onPress={onSend} />
                </View>
              </ScrollView>
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
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.md,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.black,
    marginBottom: spacing.sm,
  },
  messageBox: {
    backgroundColor: 'rgba(15, 83, 255, 0.05)',
    borderRadius: borderRadius.md,
    padding: spacing.base,
    minHeight: 120,
    marginBottom: spacing.xl,
  },
  messageInput: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
    padding: 0,
    minHeight: 100,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phoneField: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
  },
  phoneInput: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#B1B1B1',
    padding: 0,
  },
  phoneDash: {
    fontSize: 16,
    color: colors.G400,
    marginHorizontal: spacing.sm,
  },
  phoneDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    height: 52,
    paddingHorizontal: 0,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  phoneIconBox: {
    width: 52,
    height: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneDisplayText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#3B3B3B',
    marginLeft: spacing.base,
  },
  buttonArea: {
    marginTop: spacing.sm,
  },
});
