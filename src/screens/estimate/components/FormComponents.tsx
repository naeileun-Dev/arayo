import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { colors } from '../../../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─────────────────────────────────────────────
// SectionLabel
// ─────────────────────────────────────────────
export const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.sectionLabel}>
    <Text style={styles.sectionLabelText}>{label}</Text>
  </View>
);

// ─────────────────────────────────────────────
// FormLabel
// ─────────────────────────────────────────────
export const FormLabel: React.FC<{ text: string; required?: boolean }> = ({ text, required = false }) => (
  <View style={styles.formLabelRow}>
    <Text style={styles.formLabelText}>{text}</Text>
    {required && <Text style={styles.requiredMark}>{' *'}</Text>}
  </View>
);

// ─────────────────────────────────────────────
// ValidationMsg
// ─────────────────────────────────────────────
export const ValidationMsg: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => {
  if (!visible) return null;
  return <Text style={styles.validationText}>{message}</Text>;
};

// ─────────────────────────────────────────────
// SelectDropdown
// ─────────────────────────────────────────────
export const SelectDropdown: React.FC<{
  placeholder: string;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}> = ({ placeholder, value, isOpen, onToggle, options, onSelect }) => {
  const displayLabel = options.find((o) => o.value === value)?.label || placeholder;
  const isPlaceholderShown = !value;
  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={onToggle} activeOpacity={0.7}>
        <Text style={[styles.selectButtonText, isPlaceholderShown && styles.selectPlaceholder]}>
          {displayLabel}
        </Text>
        <View style={[styles.selectCaretWrap, isOpen && styles.selectCaretOpen]}>
          <Text style={styles.selectCaret}>{'›'}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdownList} nestedScrollEnabled bounces={false}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value || option.label}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(option.value);
                onToggle();
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.dropdownItemText, value === option.value && styles.dropdownItemSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// ─────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────
export const Checkbox: React.FC<{
  checked: boolean;
  onPress: () => void;
  label: string;
  labelStyle?: object;
  subLabel?: string;
  subLabelColor?: string;
}> = ({ checked, onPress, label, labelStyle, subLabel, subLabelColor }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
      {checked && <Text style={styles.checkboxCheck}>{'✓'}</Text>}
    </View>
    <Text style={[styles.checkboxLabel, labelStyle]}>{label}</Text>
    {subLabel && (
      <Text style={[styles.checkboxSub, subLabelColor ? { color: subLabelColor } : {}]}>
        {subLabel}
      </Text>
    )}
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// CheckboxButton (중고/신품 복수선택)
// ─────────────────────────────────────────────
export const CheckboxButton: React.FC<{
  checked: boolean;
  onPress: () => void;
  label: string;
}> = ({ checked, onPress, label }) => (
  <TouchableOpacity
    style={[styles.checkboxBtn, checked && styles.checkboxBtnChecked]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.checkboxBtnLabel, checked && styles.checkboxBtnLabelChecked]}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// RadioButton (중고/신품 단일선택)
// ─────────────────────────────────────────────
export const RadioButton: React.FC<{
  selected: boolean;
  onPress: () => void;
  label: string;
}> = ({ selected, onPress, label }) => (
  <TouchableOpacity
    style={[styles.radioBtn, selected && styles.radioBtnSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.radioBtnLabel, selected && styles.radioBtnLabelSelected]}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// RadioCheck (원형 체크 라디오)
// ─────────────────────────────────────────────
export const RadioCheck: React.FC<{
  selected: boolean;
  onPress: () => void;
  label: string;
}> = ({ selected, onPress, label }) => (
  <TouchableOpacity style={styles.radioCheckRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.radioCheckCircle, selected && styles.radioCheckCircleSelected]}>
      {selected && <Text style={styles.radioCheckMark}>{'✓'}</Text>}
    </View>
    <Text style={styles.radioCheckLabel}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// ServiceTag
// ─────────────────────────────────────────────
export const ServiceTag: React.FC<{
  checked: boolean;
  onPress: () => void;
  label: string;
}> = ({ checked, onPress, label }) => (
  <TouchableOpacity
    style={[styles.serviceTag, checked && styles.serviceTagChecked]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {checked ? (
      <Text style={styles.serviceTagCheckIcon}>{'✓'}</Text>
    ) : (
      <Text style={styles.serviceTagPlusIcon}>{'+'}</Text>
    )}
    <Text style={[styles.serviceTagLabel, checked && styles.serviceTagLabelChecked]}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// ImageUploadGrid (re-export from common)
// ─────────────────────────────────────────────
export { ImageUploadGrid } from '../../../components/common/ImageUploadGrid';

// ─────────────────────────────────────────────
// AgreementSection
// ─────────────────────────────────────────────
export const AgreementSection: React.FC<{
  agreeAll: boolean;
  agreePrivacy: boolean;
  agreeThirdParty: boolean;
  onToggleAll: () => void;
  onTogglePrivacy: () => void;
  onToggleThirdParty: () => void;
  showValidation?: boolean;
}> = ({ agreeAll, agreePrivacy, agreeThirdParty, onToggleAll, onTogglePrivacy, onToggleThirdParty, showValidation }) => (
  <View>
    <Checkbox checked={agreeAll} onPress={onToggleAll} label="전체 약관 동의" />
    <View style={styles.agreeDivider} />

    <View style={styles.agreeRow}>
      <Checkbox
        checked={agreePrivacy}
        onPress={onTogglePrivacy}
        label="개인정보 수집 및 이용 동의"
        labelStyle={styles.agreeLabelGray}
        subLabel="(필수)"
        subLabelColor={colors.error}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.agreeViewBtn}>보기</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles.agreeRow, { marginTop: 12 }]}>
      <Checkbox
        checked={agreeThirdParty}
        onPress={onToggleThirdParty}
        label="개인정보 제 3자 제공 동의"
        labelStyle={styles.agreeLabelGray}
        subLabel="(필수)"
        subLabelColor={colors.error}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.agreeViewBtn}>보기</Text>
      </TouchableOpacity>
    </View>

    {showValidation && (!agreePrivacy || !agreeThirdParty) && (
      <ValidationMsg message="*필수 항목에 모두 동의해 주세요." visible />
    )}
  </View>
);

// ─────────────────────────────────────────────
// UnderlineInput
// ─────────────────────────────────────────────
export const UnderlineInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  rightIcon?: React.ReactNode;
  editable?: boolean;
}> = ({ value, onChangeText, placeholder, keyboardType, rightIcon, editable = true }) => (
  <View style={styles.underlineInputContainer}>
    <TextInput
      style={styles.underlineInput}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.G400}
      keyboardType={keyboardType}
      editable={editable}
    />
    {rightIcon && <View style={styles.underlineInputIcon}>{rightIcon}</View>}
  </View>
);

// ─────────────────────────────────────────────
// DropdownSelector (underline style)
// ─────────────────────────────────────────────
export const DropdownSelector: React.FC<{
  value: string;
  placeholder: string;
  onPress?: () => void;
}> = ({ value, placeholder, onPress }) => (
  <TouchableOpacity style={styles.dropdownSelectorContainer} onPress={onPress} activeOpacity={0.7}>
    <Text style={[styles.dropdownSelectorText, !value && styles.dropdownSelectorPlaceholder]}>
      {value || placeholder}
    </Text>
    <View style={styles.dropdownSelectorCaret} />
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// FileItemRow
// ─────────────────────────────────────────────
export const FileItemRow: React.FC<{
  name: string;
  onDelete: () => void;
}> = ({ name, onDelete }) => (
  <View style={styles.fileItemRow}>
    <Text style={styles.fileItemName}>{name}</Text>
    <TouchableOpacity onPress={onDelete} style={styles.fileDeleteBtn}>
      <Text style={styles.fileDeleteIcon}>✕</Text>
    </TouchableOpacity>
  </View>
);

// ─────────────────────────────────────────────
// FormLabelWithRight (label + 우측 요소)
// ─────────────────────────────────────────────
export const FormLabelWithRight: React.FC<{
  label: string;
  required?: boolean;
  rightElement?: React.ReactNode;
}> = ({ label, required = false, rightElement }) => (
  <View style={styles.formHead}>
    <View style={styles.formLabelRow}>
      <Text style={styles.formLabelText}>{label}</Text>
      {required && <Text style={styles.requiredMark}>{' *'}</Text>}
    </View>
    {rightElement}
  </View>
);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
export const formatPrice = (text: string) => {
  const num = text.replace(/[^0-9]/g, '');
  if (num === '') return '';
  return Number(num).toLocaleString();
};

export const formatPhone = (text: string) => {
  const num = text.replace(/[^0-9]/g, '');
  if (num.length <= 3) return num;
  if (num.length <= 7) return `${num.slice(0, 3)}-${num.slice(3)}`;
  return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
export const styles = StyleSheet.create({
  /* Layout */
  root: { flex: 1, backgroundColor: colors.white },
  flex1: { flex: 1 },

  /* Header */
  header: {
    height: 56, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16, backgroundColor: colors.white,
  },
  headerBackBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerBackIcon: {
    width: 10, height: 10, borderLeftWidth: 2, borderBottomWidth: 2,
    borderColor: colors.black, transform: [{ rotate: '45deg' }],
  },
  headerTitle: { fontSize: 17, fontWeight: '600', color: colors.black },

  /* ScrollView */
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },

  /* Section */
  sectionLabel: { borderBottomWidth: 1, borderBottomColor: colors.G200, paddingBottom: 15, marginBottom: 20 },
  sectionLabelText: { fontSize: 18, fontWeight: '600', color: colors.black },
  sectionGap: { height: 40 },

  /* Form Item */
  formItem: { marginBottom: 25 },
  formLabelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  formLabelText: { fontSize: 16, fontWeight: '500', color: colors.black },
  requiredMark: { fontSize: 16, fontWeight: '500', color: colors.error },
  formLabelWithCount: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6,
  },
  textCount: { fontSize: 12, fontWeight: '400', color: colors.G400 },
  formHead: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6,
  },
  formHeadSub: { fontSize: 12, fontWeight: '500', color: colors.G400 },

  /* TextInput */
  textInput: {
    height: 50, fontSize: 14, fontWeight: '500', color: colors.black,
    borderWidth: 1, borderColor: colors.G300, borderRadius: 4,
    paddingHorizontal: 12, backgroundColor: colors.white,
  },
  textArea: {
    height: 150, fontSize: 14, fontWeight: '500', color: colors.black,
    borderWidth: 1, borderColor: colors.G300, borderRadius: 4,
    paddingHorizontal: 15, paddingTop: 12, paddingBottom: 12,
    backgroundColor: colors.white, textAlignVertical: 'top',
  },
  validationText: { fontSize: 13, color: colors.error, marginTop: 5 },

  /* Product Type Row */
  productTypeRow: { flexDirection: 'row', gap: 5 },

  /* RadioButton (filled button style) */
  radioBtn: {
    flex: 1, height: 50, borderWidth: 1, borderColor: colors.G300,
    borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white,
  },
  radioBtnSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  radioBtnLabel: { fontSize: 14, fontWeight: '500', color: colors.G600 },
  radioBtnLabelSelected: { color: colors.white },

  /* CheckboxButton */
  checkboxBtn: {
    flex: 1, height: 50, borderWidth: 1, borderColor: colors.G300,
    borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white,
  },
  checkboxBtnChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxBtnLabel: { fontSize: 14, fontWeight: '500', color: colors.G600 },
  checkboxBtnLabelChecked: { color: colors.white },

  /* SelectDropdown */
  selectContainer: { position: 'relative', zIndex: 10 },
  selectButton: {
    height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: colors.G300, borderRadius: 4,
    paddingHorizontal: 12, backgroundColor: colors.white,
  },
  selectButtonText: { fontSize: 14, fontWeight: '500', color: colors.black },
  selectPlaceholder: { color: colors.G400 },
  selectCaretWrap: {
    width: 20, height: 20, alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
  selectCaretOpen: { transform: [{ rotate: '-90deg' }] },
  selectCaret: { fontSize: 16, color: colors.G500, fontWeight: '300' },
  dropdownList: {
    borderWidth: 1, borderColor: colors.G200, borderRadius: 4,
    marginTop: 4, backgroundColor: colors.white, maxHeight: 250,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 4 },
    }),
  },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: colors.G100 },
  dropdownItemText: { fontSize: 14, color: colors.black },
  dropdownItemSelected: { color: colors.primary, fontWeight: '600' },

  /* Date Row */
  dateRow: { flexDirection: 'row', gap: 10 },

  /* Location */
  locationSelects: { gap: 10 },

  /* Blue Info Box */
  blueBox: {
    backgroundColor: colors.infoBoxBg, borderRadius: 4,
    paddingHorizontal: 15, paddingVertical: 12, marginBottom: 5,
  },
  blueBoxText: { fontSize: 13, color: colors.G700, lineHeight: 20 },

  /* Image Upload */
  imageUploadRow: { flexDirection: 'row', marginTop: 5, gap: 8 },
  imageUploader: {
    width: (SCREEN_WIDTH - 32 - 16) / 3, aspectRatio: 1,
    backgroundColor: colors.G100, borderRadius: 5, alignItems: 'center', justifyContent: 'center',
  },
  imageUploaderPlus: { fontSize: 28, color: colors.G400, fontWeight: '300' },
  imagePreviewWrap: {
    width: (SCREEN_WIDTH - 32 - 16) / 3, aspectRatio: 1,
    borderRadius: 5, overflow: 'hidden', position: 'relative',
  },
  imagePreview: { width: '100%', height: '100%' },
  imageRemoveBtn: {
    position: 'absolute', top: 4, right: 4, width: 20, height: 20,
    borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  imageRemoveText: { fontSize: 10, color: colors.white, fontWeight: '600' },

  /* Service Tag Grid */
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  serviceTag: {
    width: (SCREEN_WIDTH - 32 - 10) / 3, height: 40,
    borderWidth: 1, borderColor: colors.G200, borderRadius: 4,
    backgroundColor: colors.white, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  serviceTagChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  serviceTagPlusIcon: { fontSize: 16, color: colors.G600, fontWeight: '500' },
  serviceTagCheckIcon: { fontSize: 13, color: colors.white, fontWeight: '700' },
  serviceTagLabel: { fontSize: 14, fontWeight: '500', color: colors.G600 },
  serviceTagLabelChecked: { color: colors.white },

  /* Checkbox */
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  checkboxBox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 1.5,
    borderColor: colors.G400, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white,
  },
  checkboxBoxChecked: { backgroundColor: colors.primary, borderWidth: 0 },
  checkboxCheck: { fontSize: 12, color: colors.white, fontWeight: '600', marginTop: -1 },
  checkboxLabel: { fontSize: 14, color: colors.black },
  checkboxSub: { fontSize: 14, color: colors.error },

  /* RadioCheck (circle) */
  radioGroup: { gap: 10 },
  radioCheckRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  radioCheckCircle: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1.5,
    borderColor: colors.G400, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.white, marginTop: 1,
  },
  radioCheckCircleSelected: { backgroundColor: colors.primary, borderWidth: 0 },
  radioCheckMark: { fontSize: 11, color: colors.white, fontWeight: '600' },
  radioCheckLabel: { fontSize: 14, color: colors.G600, flex: 1, lineHeight: 22 },

  /* Password */
  passwordInputWrap: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: colors.G300, borderRadius: 4, backgroundColor: colors.white, height: 50,
  },
  passwordInput: { flex: 1, height: '100%', fontSize: 14, fontWeight: '500', color: colors.black, paddingHorizontal: 12 },
  passwordToggle: { paddingHorizontal: 12, height: '100%', justifyContent: 'center' },

  /* Agreement */
  agreeDivider: { height: 1, backgroundColor: colors.G200, marginTop: 12, marginBottom: 12 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  agreeLabelGray: { color: colors.G600, fontSize: 14 },
  agreeViewBtn: { fontSize: 14, color: colors.G600, textDecorationLine: 'underline' },

  /* UnderlineInput */
  underlineInputContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: colors.G200, height: 50,
  },
  underlineInput: {
    flex: 1, fontSize: 14, fontWeight: '500', color: colors.black,
    paddingVertical: 0, height: 50,
  },
  underlineInputIcon: { paddingLeft: 10, justifyContent: 'center', alignItems: 'center' },

  /* DropdownSelector */
  dropdownSelectorContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: colors.G200, height: 50,
  },
  dropdownSelectorText: { fontSize: 14, fontWeight: '500', color: colors.black, flex: 1 },
  dropdownSelectorPlaceholder: { color: colors.G400, fontWeight: '400' },
  dropdownSelectorCaret: {
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6,
    borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: colors.black,
  },

  /* FileItemRow */
  fileItemRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 50, borderBottomWidth: 1, borderBottomColor: colors.G200,
  },
  fileItemName: { fontSize: 14, fontWeight: '400', color: colors.black },
  fileDeleteBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  fileDeleteIcon: { fontSize: 12, color: colors.G400, fontWeight: '600' },

  /* Bottom */
  bottomSpacer: { height: 15 },
  inpSet: { position: 'relative' },
});
