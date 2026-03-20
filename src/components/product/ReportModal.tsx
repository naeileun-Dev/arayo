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
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';

const REPORT_REASONS = [
  '거래 금지 물품이에요',
  '사기인 것 같아요',
  '광고성 컨텐츠에요',
  '상품 정보가 부정확해요',
  '안전한 거래를 거부해요',
  '아라요 기계장터의 다른 서비스에 등록되어야 하는 게시글이에요',
  '부적절한 행위가 있어요',
  '기타',
];

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);
  const [detail, setDetail] = useState('');

  const handleSubmit = () => {
    setSelectedReason('');
    setDetail('');
    setReasonDropdownOpen(false);
    onSubmit();
  };

  const handleClose = () => {
    setSelectedReason('');
    setDetail('');
    setReasonDropdownOpen(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => setReasonDropdownOpen(false)}>
            <View style={styles.card}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>신고하기</Text>
                  <TouchableOpacity
                    onPress={handleClose}
                    activeOpacity={0.7}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* 신고 사유 선택 */}
                <Text style={styles.sectionLabel}>신고 사유 선택</Text>
                <View style={styles.selectContainer}>
                  <TouchableOpacity
                    style={styles.selectButton}
                    activeOpacity={0.7}
                    onPress={() => setReasonDropdownOpen(!reasonDropdownOpen)}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        !selectedReason && styles.selectPlaceholder,
                      ]}
                      numberOfLines={1}
                    >
                      {selectedReason || '신고 사유를 선택해 주세요.'}
                    </Text>
                    <ChevronDownIcon width={20} height={20} color={colors.G400} />
                  </TouchableOpacity>

                  {reasonDropdownOpen && (
                    <View style={styles.dropdown}>
                      <ScrollView
                        style={styles.dropdownScroll}
                        nestedScrollEnabled
                        showsVerticalScrollIndicator={false}
                      >
                        {REPORT_REASONS.map((reason, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={[
                              styles.dropdownItem,
                              idx < REPORT_REASONS.length - 1 && styles.dropdownItemBorder,
                            ]}
                            activeOpacity={0.6}
                            onPress={() => {
                              setSelectedReason(reason);
                              setReasonDropdownOpen(false);
                            }}
                          >
                            <Text style={styles.dropdownItemText}>{reason}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* 신고 사유 입력 */}
                <Text style={styles.sectionLabel}>신고 사유 입력</Text>
                <View style={styles.textAreaBox}>
                  <TextInput
                    style={styles.textArea}
                    value={detail}
                    onChangeText={setDetail}
                    multiline
                    textAlignVertical="top"
                    placeholder={'신고내용을 직접 작성해주세요.\n자세하게 적어주시면 신고처리에\n큰 도움이 됩니다.'}
                    placeholderTextColor={colors.G400}
                  />
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    activeOpacity={0.7}
                    onPress={handleClose}
                  >
                    <Text style={styles.cancelText}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitText}>신고하기</Text>
                  </TouchableOpacity>
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
    paddingBottom: spacing.lg,
    maxHeight: '80%',
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
  sectionLabel: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: colors.black,
    marginBottom: spacing.sm,
  },
  selectContainer: {
    marginBottom: spacing.xl,
    zIndex: 10,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
  },
  selectText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  selectPlaceholder: {
    color: colors.G400,
  },
  dropdown: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.G200,
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  dropdownScroll: {
    maxHeight: 300,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: spacing.base,
  },
  dropdownItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  dropdownItemText: {
    fontSize: 15,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  textAreaBox: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    minHeight: 140,
    marginBottom: spacing.xl,
  },
  textArea: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
    padding: 0,
    minHeight: 120,
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
  submitButton: {
    flex: 1,
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.white,
  },
});
