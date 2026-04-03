import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors } from '../../styles/colors';
import { Header, Input } from '../../components/common';
import SaveIcon from '../../assets/icon/Save.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';

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

const H_PADDING = 20;
const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 30;
const THUMB_SIZE = 22;
const TRACK_PADDING = (TRACK_HEIGHT - THUMB_SIZE) / 2;

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const FormLabel: React.FC<{ label: string; required?: boolean }> = ({ label, required = false }) => (
  <View style={styles.formLabelRow}>
    <Text style={styles.formLabelText}>{label}</Text>
    {required && <Text style={styles.requiredMark}> *</Text>}
  </View>
);


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

interface CorpTypeDropdownProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}
const CorpTypeDropdown: React.FC<CorpTypeDropdownProps> = ({ value, options, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <TouchableOpacity
        style={[styles.dropdownTrigger, open && styles.dropdownTriggerOpen]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownTriggerText}>{value}</Text>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDownIcon width={16} height={16} color={colors.black} />
        </View>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownMenu}>
          {options.map((opt, idx) => {
            const isSelected = opt === value;
            const isLast = idx === options.length - 1;
            return (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.dropdownItem,
                  !isLast && styles.dropdownItemBorder,
                  isSelected && styles.dropdownItemActive,
                ]}
                onPress={() => { onSelect(opt); setOpen(false); }}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.dropdownItemText,
                  isSelected && styles.dropdownItemTextActive,
                ]}>
                  {opt}
                </Text>
                {isSelected && <Text style={styles.dropdownCheck}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export const ProfileEditScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const handleSave = () => {};

  const handleSearchZipcode = () => {};

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

          <SectionTitle title="알림" />

          <View style={styles.rowItem}>
            <Text style={styles.rowItemLabel}>푸시 동의</Text>
            <ToggleSwitch value={form.pushAgree} onValueChange={setField('pushAgree')} />
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowItemLabel}>야간 푸시 알림 (21:00 ~ 08:00)</Text>
            <ToggleSwitch value={form.nightPush} onValueChange={setField('nightPush')} />
          </View>

          <SectionTitle title="회원정보" />

          <View style={styles.fieldItem}>
            <FormLabel label="이름" required />
            <Input
              value={form.name}
              onChangeText={setField('name')}
              placeholder="이름을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="닉네임" required />
            <View style={styles.inputWithButton}>
              <Input
                value={form.nickname}
                onChangeText={setField('nickname')}
                placeholder="닉네임 입력해 주세요.."
                containerStyle={[styles.inputNoMargin, styles.flex1]}
              />
              <TouchableOpacity style={styles.dupCheckBtn} onPress={() => {}}>
                <Text style={styles.dupCheckBtnText}>중복확인</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="이메일" required />
            <View style={styles.inputWithButton}>
              <Input
                value={form.email}
                onChangeText={setField('email')}
                placeholder="이메일을 입력해 주세요.."
                keyboardType="email-address"
                containerStyle={[styles.inputNoMargin, styles.flex1]}
              />
              <TouchableOpacity style={styles.dupCheckBtn} onPress={() => {}}>
                <Text style={styles.dupCheckBtnText}>중복확인</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="전화번호" />
            <Input
              value={form.phone}
              placeholder="전화번호를 입력해 주세요."
              keyboardType="phone-pad"
              disabled
              containerStyle={styles.inputNoMargin}
            />
            <TouchableOpacity style={styles.passBtn} activeOpacity={0.8} onPress={() => {}}>
              <Text style={styles.passBtnText}>PASS 본인 인증</Text>
            </TouchableOpacity>
          </View>

          {/* 사업장 주소지 */}
          <View style={[styles.fieldItem, { gap: 8 }]}>
            <FormLabel label="사업장 주소지" />
            <View style={styles.zipcodeRow}>
              <Input
                value={form.zipcode}
                placeholder="우편번호"
                disabled
                containerStyle={[styles.inputNoMargin, styles.flex1]}
              />
              <TouchableOpacity
                style={styles.zipcodeBtn}
                onPress={handleSearchZipcode}
                activeOpacity={0.7}
              >
                <Text style={styles.zipcodeBtnText}>우편번호 검색</Text>
              </TouchableOpacity>
            </View>
            <Input
              value={form.address}
              placeholder="주소"
              disabled
              containerStyle={styles.inputNoMargin}
            />
            <Input
              value={form.addressDetail}
              onChangeText={setField('addressDetail')}
              placeholder="상세주소"
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
            <Text style={styles.helpText}>
              입력하신 사업장 소재지를 기준으로 가까운 거리부터 순서대로 확인 하실 수 있습니다.
            </Text>
          </View>

          <SectionTitle title="사업자정보" />

          <View style={styles.fieldItem}>
            <FormLabel label="기업회원아이디" />
            <Input value={form.corpId} disabled containerStyle={styles.inputNoMargin} />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="상호명" required />
            <Input
              value={form.companyName}
              onChangeText={setField('companyName')}
              placeholder="상호명을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="사업자등록번호" required />
            <Input
              value={form.bizNumber}
              onChangeText={setField('bizNumber')}
              placeholder="사업자등록번호를 입력해 주세요.."
              keyboardType="numeric"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="050 번호" required />
            <Input
              value={form.tel050}
              onChangeText={setField('tel050')}
              placeholder="050 번호를 입력해 주세요.."
              keyboardType="phone-pad"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="연락처" required />
            <Input
              value={form.contact}
              onChangeText={setField('contact')}
              placeholder="연락처를 입력해 주세요.."
              keyboardType="phone-pad"
              containerStyle={styles.inputNoMargin}
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
            <Input
              value={form.ceoName}
              onChangeText={setField('ceoName')}
              placeholder="대표자명을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="업종" />
            <Input
              value={form.bizType}
              onChangeText={setField('bizType')}
              placeholder="업종명을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="업태" />
            <Input
              value={form.bizCategory}
              onChangeText={setField('bizCategory')}
              placeholder="업태명을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="과세유형" />
            <Input
              value={form.taxType}
              onChangeText={setField('taxType')}
              placeholder="과세유형을 입력해 주세요.."
              autoCapitalize="words"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <View style={styles.fieldItem}>
            <FormLabel label="이메일주소" required />
            <Input
              value={form.bizEmail}
              onChangeText={setField('bizEmail')}
              placeholder="이메일주소를 입력해 주세요.."
              keyboardType="email-address"
              containerStyle={styles.inputNoMargin}
            />
          </View>

          <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.7} onPress={() => {}}>
            <Text style={styles.withdrawBtnText}>회원탈퇴</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  flex1: { flex: 1 },
  mt8: { marginTop: 8 },
  inputNoMargin: { marginBottom: 0 },

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

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginTop: 28,
    marginBottom: 10,
  },

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

  fieldItem: {
    paddingVertical: 12,
  },

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

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    backgroundColor: colors.white,
  },
  inputReadonly: {
    color: colors.G500,
  },

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

  helpText: {
    marginTop: 8,
    fontSize: 11,
    color: colors.G500,
    lineHeight: 16,
  },

  dropdownWrapper: {
    zIndex: 10,
  },
  dropdownTrigger: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  dropdownTriggerOpen: {
    borderColor: colors.black,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownTriggerText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.borderMedium,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  dropdownItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  dropdownItemActive: {
    backgroundColor: colors.G100,
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.black,
  },
  dropdownItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  dropdownCheck: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },

  passBtn: {
    height: 44,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  passBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },

  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dupCheckBtn: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dupCheckBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },

  withdrawBtn: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  withdrawBtnText: {
    fontSize: 13,
    color: colors.G500,
    textDecorationLine: 'underline',
  },
});
