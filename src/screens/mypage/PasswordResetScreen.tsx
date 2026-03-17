import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import EyeIcon from '../../assets/icon/eye.svg';
import EyeClosedIcon from '../../assets/icon/eye-closed.svg';

const FORM_H  = 50;
const FORM_R  = 4;
const FORM_FS = 14;
const PAD_LR  = 20;

const FormLabel: React.FC<{ label: string; required?: boolean }> = ({ label, required = false }) => (
  <View style={lblSt.row}>
    <Text style={lblSt.text}>{label}</Text>
    {required && <Text style={lblSt.star}> *</Text>}
  </View>
);

const lblSt = StyleSheet.create({
  row:  { flexDirection: 'row', alignItems: 'center' },
  text: { fontSize: 16, fontWeight: '500', color: colors.black },
  star: { fontSize: 16, fontWeight: '500', color: colors.error },
});

interface PFProps {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  showPw: boolean;
  onToggle: () => void;
}

const PasswordField = ({ value, onChangeText, placeholder, showPw, onToggle }: PFProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[pfSt.outer, focused && pfSt.outerFocused]}>
      <View style={pfSt.inner}>
        <TextInput
          style={pfSt.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          secureTextEntry={!showPw}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          textContentType="oneTimeCode"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity
          style={pfSt.eyeBtn}
          onPress={onToggle}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          {showPw
            ? <EyeIcon width={20} height={20} color={colors.G400} />
            : <EyeClosedIcon width={20} height={20} color={colors.G400} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const pfSt = StyleSheet.create({
  outer: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: FORM_R,
    backgroundColor: colors.white,
  },
  outerFocused: {
    borderColor: 'rgba(0,0,0,0.65)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: FORM_H,
    borderRadius: FORM_R,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: FORM_H,
    fontSize: FORM_FS,
    fontWeight: '500',
    color: colors.black,
    paddingLeft: 12,
    paddingRight: FORM_H + 4,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  eyeBtn: {
    position: 'absolute',
    right: 0,
    width: FORM_H,
    height: FORM_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HelpBlock: React.FC<{ msg: string; color?: 'red' | 'green' }> = ({ msg, color = 'red' }) => (
  <Text style={[hbSt.base, color === 'green' ? hbSt.green : hbSt.red]}>
    {msg}
  </Text>
);

const hbSt = StyleSheet.create({
  base:  { fontSize: 13, lineHeight: 19, marginTop: 5 },
  red:   { color: colors.primary },
  green: { color: colors.green },
});

const validateNewPw = (pw: string): string | null => {
  if (!pw) return '*비밀번호를 입력해 주세요.';
  if (pw.length < 8 || pw.length > 20)
    return '*8~20자내로 구성해주세요. (보안을 위해 영문, 숫자, 특수문자를 사용을 권장드립니다.)';
  return null;
};

const validateConfirmPw = (pw: string, confirm: string): string | null => {
  if (!confirm) return '*비밀번호를 다시 입력해 주세요.';
  if (pw !== confirm) return '*비밀번호가 일치하지 않습니다.';
  return null;
};

export const PasswordResetScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw,     setNewPw]     = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [dirtyCurrentPw, setDirtyCurrentPw] = useState(false);
  const [dirtyNewPw,     setDirtyNewPw]     = useState(false);
  const [dirtyConfirmPw, setDirtyConfirmPw] = useState(false);

  const [currentPwServerError, setCurrentPwServerError] = useState<string | null>(null);

  const newPwError     = validateNewPw(newPw);
  const newPwValid     = !newPwError && newPw.length > 0;
  const confirmPwError = validateConfirmPw(newPw, confirmPw);
  const confirmPwMatch = !confirmPwError && confirmPw.length > 0;

  const handleSubmit = () => {
    setDirtyCurrentPw(true);
    setDirtyNewPw(true);
    setDirtyConfirmPw(true);

    const hasError = !currentPw || !!newPwError || !!confirmPwError;
    if (hasError) return;

    // TODO: API 호출 (비밀번호 변경)
  };

  return (
    <SafeAreaView style={st.safe}>
      <Header
        title="비밀번호 변경"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={st.scroll}
        contentContainerStyle={st.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={st.formLi}>
          <FormLabel label="기존비밀번호" required />

          <View style={st.labelToInput}>
            <PasswordField
              value={currentPw}
              onChangeText={(v) => {
                setCurrentPw(v);
                setDirtyCurrentPw(true);
                setCurrentPwServerError(null);
              }}
              placeholder="8~20자의 영문 대·소문자, 숫자, 특수문자를 사용해 주세요."
              showPw={showCurrent}
              onToggle={() => setShowCurrent((v: boolean) => !v)}
            />
          </View>

          {dirtyCurrentPw && !currentPw && (
            <HelpBlock msg="*기존 비밀번호를 입력해 주세요." color="red" />
          )}
          {currentPwServerError && (
            <HelpBlock msg={currentPwServerError} color="red" />
          )}
        </View>

        <View style={st.formGap} />

        <View style={st.formLi}>
          <FormLabel label="새 비밀번호" required />

          <View style={st.labelToInput}>
            <PasswordField
              value={newPw}
              onChangeText={(v) => {
                setNewPw(v);
                setDirtyNewPw(true);
              }}
              placeholder="8~20자의 영문 대·소문자, 숫자, 특수문자를 사용해 주세요."
              showPw={showNew}
              onToggle={() => setShowNew((v: boolean) => !v)}
            />
          </View>

          <View style={st.inpToInp}>
            <PasswordField
              value={confirmPw}
              onChangeText={(v) => {
                setConfirmPw(v);
                setDirtyConfirmPw(true);
              }}
              placeholder="비밀번호를 재입력해 주세요."
              showPw={showConfirm}
              onToggle={() => setShowConfirm((v: boolean) => !v)}
            />
          </View>

          {dirtyNewPw && newPwValid && (
            <HelpBlock msg="*사용 가능한 비밀번호 입니다." color="green" />
          )}
          {dirtyConfirmPw && confirmPwMatch && (
            <HelpBlock msg="*비밀번호가 일치 합니다." color="green" />
          )}
          {dirtyNewPw && newPwError && (
            <HelpBlock msg={newPwError} color="red" />
          )}
          {dirtyConfirmPw && confirmPwError && (
            <HelpBlock msg={confirmPwError} color="red" />
          )}
        </View>

        <View style={st.formBtnSet}>
          <TouchableOpacity
            style={st.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.82}
          >
            <Text style={st.submitText}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


const st = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PAD_LR,
    paddingTop: 20,
    paddingBottom: 60,
  },

  formLi: {},

  labelToInput: {
    marginTop: 6,
  },

  inpToInp: {
    marginTop: 8,
  },

  formGap: {
    height: 25,
  },

  formBtnSet: {
    marginTop: 25,
  },

  submitBtn: {
    height: FORM_H,
    backgroundColor: colors.primary,
    borderRadius: FORM_R,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    letterSpacing: 0.3,
  },
});
