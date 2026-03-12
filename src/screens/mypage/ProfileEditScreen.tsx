/**
 * ProfileEditScreen.tsx
 * 내 정보 수정 화면 (UI-MYPG-111)
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Modal,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import SaveIcon from '../../assets/icon/Save.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';

// ─────────────────────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────────────────────
interface FormState {
  pushAgree: boolean;
  nightPush: boolean;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  corpId: string;
  companyName: string;
  bizNumber: string;
  tel050: string;
  contact: string;
  corpType: string;
  ceoName: string;
  bizType: string;
  bizCategory: string;
  taxType: string;
  bizEmail: string;
}

const CORP_TYPE_OPTIONS = ['개인', '개인사업자', '법인사업자', '기타'];

// ─────────────────────────────────────────────────────────────
// 레이아웃 상수
// ─────────────────────────────────────────────────────────────
const H_PADDING = 20;
const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 22;
const TRACK_PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2;

// ─────────────────────────────────────────────────────────────
// 섹션 타이틀
// ─────────────────────────────────────────────────────────────
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

// ─────────────────────────────────────────────────────────────
// 폼 라벨 (* 필수)
// ─────────────────────────────────────────────────────────────
const FormLabel: React.FC<{ label: string; required?: boolean }> = ({ label, required = false }) => (
  <View style={styles.formLabelRow}>
    <Text style={styles.formLabelText}>{label}</Text>
    {required && <Text style={styles.requiredMark}> *</Text>}
  </View>
);

// ─────────────────────────────────────────────────────────────
// 텍스트 인풋 (언더라인 스타일)
// ─────────────────────────────────────────────────────────────
interface FormInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  editable?: boolean;
  style?: object;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  editable = true,
  style,
  autoCapitalize = 'none',
}) => (
  <TextInput
    style={[styles.input, !editable && styles.inputReadonly, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={colors.G400}
    keyboardType={keyboardType}
    editable={editable}
    autoCapitalize={autoCapitalize}
    autoCorrect={false}
  />
);

// ─────────────────────────────────────────────────────────────
// 커스텀 토글 스위치 (thumb < track)
// ─────────────────────────────────────────────────────────────
interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggle = () => {
    const newVal = !value;
    Animated.timing(animValue, {
      toValue: newVal ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onValueChange(newVal);
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [TRACK_PADDING, TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING],
  });

  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.G300, colors.primary],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggle}>
      <Animated.View style={[styles.toggleTrack, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.toggleThumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────────────────────
// 법인구분 드롭다운 (Modal 바텀시트)
// ─────────────────────────────────────────────────────────────
interface CorpTypeDropdownProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}
const CorpTypeDropdown: React.FC<CorpTypeDropdownProps> = ({ value, options, onSelect }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownTriggerText}>{value}</Text>
        <ChevronDownIcon width={16} height={16} color={colors.G500} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalDim}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity style={styles.bottomSheet} activeOpacity={1} onPress={() => {}}>
            <View style={styles.bottomSheetHandle} />
            {options.map((opt, idx) => {
              const isSelected = opt === value;
              const isLast = idx === options.length - 1;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.bottomSheetItem,
                    !isLast && styles.bottomSheetItemDivider,
                    isSelected && styles.bottomSheetItemSelected,
                  ]}
                  onPress={() => { onSelect(opt); setVisible(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.bottomSheetItemText,
                    isSelected && styles.bottomSheetItemTextSelected,
                  ]}>
                    {opt}
                  </Text>
                  {isSelected && <Text style={styles.checkmark}>{'✓'}</Text>}
                </TouchableOpacity>
              );
            })}
            <View style={{ height: Platform.OS === 'ios' ? 34 : 16 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// 메인 스크린
// ─────────────────────────────────────────────────────────────
const ProfileEditScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState<FormState>({
    pushAgree: true,
    nightPush: false,
    name: '아라요 기계장터',
    nickname: 'Suseong',
    email: 'Suseong@gmail.com',
    phone: '01012345678',
    zipcode: '',
    address: '',
    addressDetail: '서울시 마포구',
    corpId: 'ss_korea',
    companyName: '홍길동',
    bizNumber: '3868603185',
    tel050: '0505-1234-5678',
    contact: '010-1234-5678',
    corpType: '법인사업자',
    ceoName: '홍길동',
    bizType: '산업기계 도·소매업',
    bizCategory: '도매 및 소매업',
    taxType: '일반과세자',
    bizEmail: 'hongildong@gmail.com',
  });

  const setField = <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // TODO: API 저장 로직
  };

  const handleSearchZipcode = () => {
    // TODO: 우편번호 검색 (카카오 주소 API 등)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="내 정보 수정"
        onBack={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity
            onPress={handleSave}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SaveIcon width={20} height={20} color={colors.black} />
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ════ [알림] ════ */}
          <SectionTitle title="알림" />

          <View style={styles.rowItem}>
            <Text style={styles.rowItemLabel}>푸시 동의</Text>
            <ToggleSwitch value={form.pushAgree} onValueChange={setField('pushAgree')} />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowItemLabel}>야간 푸시 알림 (21:00 ~ 08:00)</Text>
            <ToggleSwitch value={form.nightPush} onValueChange={setField('nightPush')} />
          </View>

          {/* ════ [회원정보] ════ */}
          <SectionTitle title="회원정보" />

          <View style={styles.fieldItem}>
            <FormLabel label="이름" required />
            <FormInput
              value={form.name}
              onChangeText={setField('name')}
              placeholder="이름을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="닉네임" required />
            <FormInput
              value={form.nickname}
              onChangeText={setField('nickname')}
              placeholder="닉네임 입력해 주세요.."
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="이메일" required />
            <FormInput
              value={form.email}
              onChangeText={setField('email')}
              placeholder="이메일을 입력해 주세요.."
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="전화번호" />
            <FormInput
              value={form.phone}
              onChangeText={setField('phone')}
              placeholder="전화번호를 입력해 주세요."
              keyboardType="phone-pad"
            />
          </View>

          {/* 사업장 주소지 */}
          <View style={styles.fieldItem}>
            <FormLabel label="사업장 주소지" />
            <View style={styles.zipcodeRow}>
              <TextInput
                style={[styles.input, styles.inputReadonly, styles.zipcodeInput]}
                value={form.zipcode}
                placeholder="우편번호"
                placeholderTextColor={colors.G400}
                editable={false}
              />
              <TouchableOpacity
                style={styles.zipcodeBtn}
                onPress={handleSearchZipcode}
                activeOpacity={0.7}
              >
                <Text style={styles.zipcodeBtnText}>우편번호 검색</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.inputReadonly, styles.mt8]}
              value={form.address}
              placeholder="주소"
              placeholderTextColor={colors.G400}
              editable={false}
            />
            <FormInput
              value={form.addressDetail}
              onChangeText={setField('addressDetail')}
              placeholder="상세주소"
              style={styles.mt8}
              autoCapitalize="words"
            />
            <Text style={styles.helpText}>
              입력하신 사업장 소재지를 기준으로 가까운 거리부터 순서대로 확인 하실 수 있습니다.
            </Text>
          </View>

          {/* ════ [사업자정보] ════ */}
          <SectionTitle title="사업자정보" />

          <View style={styles.fieldItem}>
            <FormLabel label="기업회원아이디" />
            <FormInput value={form.corpId} editable={false} />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="상호명" required />
            <FormInput
              value={form.companyName}
              onChangeText={setField('companyName')}
              placeholder="상호명을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="사업자등록번호" required />
            <FormInput
              value={form.bizNumber}
              onChangeText={setField('bizNumber')}
              placeholder="사업자등록번호를 입력해 주세요.."
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="050 번호" required />
            <FormInput
              value={form.tel050}
              onChangeText={setField('tel050')}
              placeholder="050 번호를 입력해 주세요.."
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="연락처" required />
            <FormInput
              value={form.contact}
              onChangeText={setField('contact')}
              placeholder="연락처를 입력해 주세요.."
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="법인구분" required />
            <CorpTypeDropdown
              value={form.corpType}
              options={CORP_TYPE_OPTIONS}
              onSelect={setField('corpType')}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="대표자명" required />
            <FormInput
              value={form.ceoName}
              onChangeText={setField('ceoName')}
              placeholder="대표자명을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="업종" required />
            <FormInput
              value={form.bizType}
              onChangeText={setField('bizType')}
              placeholder="업종명을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="업태" required />
            <FormInput
              value={form.bizCategory}
              onChangeText={setField('bizCategory')}
              placeholder="업태명을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="과세유형" required />
            <FormInput
              value={form.taxType}
              onChangeText={setField('taxType')}
              placeholder="과세유형을 입력해 주세요.."
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="이메일주소" required />
            <FormInput
              value={form.bizEmail}
              onChangeText={setField('bizEmail')}
              placeholder="이메일주소를 입력해 주세요.."
              keyboardType="email-address"
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

// ─────────────────────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  flex1: { flex: 1 },
  mt8: { marginTop: 8 },

  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 60,
  },
  bottomSpacer: {
    height: 40,
  },

  // ── 섹션 타이틀 ──────────────────────────────────
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginTop: 28,
    marginBottom: 10,
  },

  // ── 행(row) 아이템 - 토글 용 ──────────────────────
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    minHeight: 48,
  },
  rowItemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    paddingRight: 8,
  },

  // ── 커스텀 토글 ───────────────────────────────────
  toggleTrack: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // ── 필드(vertical) 아이템 ────────────────────────
  fieldItem: {
    paddingVertical: 12,
  },

  // ── 폼 라벨 ──────────────────────────────────────
  formLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  formLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.black,
  },
  requiredMark: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },

  // ── 인풋 (언더라인 스타일) ─────────────────────────
  input: {
    height: 44,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    paddingHorizontal: 4,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    backgroundColor: colors.white,
  },
  inputReadonly: {
    color: colors.G500,
  },

  // ── 우편번호 행 ───────────────────────────────────
  zipcodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  zipcodeInput: {
    flex: 1,
  },
  zipcodeBtn: {
    height: 44,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  zipcodeBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },

  // ── 안내 텍스트 ───────────────────────────────────
  helpText: {
    marginTop: 8,
    fontSize: 11,
    color: colors.G500,
    lineHeight: 16,
  },

  // ── 드롭다운 트리거 (언더라인 스타일) ─────────────
  dropdownTrigger: {
    height: 44,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  dropdownTriggerText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },

  // ── 바텀시트 모달 ─────────────────────────────────
  modalDim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.G300,
    alignSelf: 'center',
    marginBottom: 12,
  },
  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  bottomSheetItemDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  bottomSheetItemSelected: {
    backgroundColor: '#FFF5F6',
  },
  bottomSheetItemText: {
    fontSize: 15,
    color: colors.G600,
    fontWeight: '400',
  },
  bottomSheetItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
});
