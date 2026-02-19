/**
 * 회원가입 화면
 * UI-MMBR-104
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Header, Checkbox } from '../../components/common';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import {
  validateUserId,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateNickname,
  validateEmail,
} from '../../utils/validators';
import type {
  AuthStackParamList,
  SignUpFormData,
  SignUpErrors,
  AgreementsState,
} from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  // 폼 상태
  const [formData, setFormData] = useState<SignUpFormData>({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
    email: '',
    emailDomain: '',
    phone: '',
    zipCode: '',
    address: '',
    addressDetail: '',
  });

  // 에러 상태
  const [errors, setErrors] = useState<SignUpErrors>({});

  // 본인인증 완료 여부
  const [isVerified, setIsVerified] = useState(false);

  // 약관 동의 상태
  const [agreements, setAgreements] = useState<AgreementsState>({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 아이디/닉네임 사용 가능 여부
  const [userIdAvailable, setUserIdAvailable] = useState<boolean | null>(null);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 필드 업데이트
  const updateField = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof SignUpErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 필드 유효성 검사
  const validateField = (field: keyof SignUpFormData) => {
    let fieldErrors: string[] = [];

    switch (field) {
      case 'userId':
        fieldErrors = validateUserId(formData.userId);
        if (fieldErrors.length === 0 && userIdAvailable === false) {
          fieldErrors.push('이미 가입된 아이디 입니다.');
        }
        break;
      case 'password':
        fieldErrors = validatePassword(formData.password);
        break;
      case 'passwordConfirm':
        fieldErrors = validatePasswordConfirm(
          formData.password,
          formData.passwordConfirm
        );
        break;
      case 'name':
        fieldErrors = validateName(formData.name);
        break;
      case 'nickname':
        fieldErrors = validateNickname(formData.nickname);
        if (fieldErrors.length === 0 && nicknameAvailable === false) {
          fieldErrors.push('이미 사용중인 닉네임 입니다.');
        }
        break;
      case 'email':
        const fullEmail = formData.emailDomain
          ? `${formData.email}@${formData.emailDomain}`
          : formData.email;
        fieldErrors = validateEmail(fullEmail);
        break;
    }

    if (fieldErrors.length > 0) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors }));
    }
  };

  // 아이디 중복 체크
  const checkUserIdAvailability = async () => {
    const isAvailable = formData.userId !== 'test123';
    setUserIdAvailable(isAvailable);

    if (isAvailable) {
      setErrors((prev) => ({
        ...prev,
        userId: undefined,
        userIdSuccess: '사용 가능한 아이디 입니다.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        userId: ['이미 가입된 아이디 입니다.'],
        userIdSuccess: undefined,
      }));
    }
  };

  // 닉네임 중복 체크
  const checkNicknameAvailability = async () => {
    const isAvailable = formData.nickname !== 'test';
    setNicknameAvailable(isAvailable);
  };

  // 본인인증 처리
  const handleVerification = () => {
    console.log('PASS 본인인증');
    setIsVerified(true);
  };

  // 우편번호 검색
  const handleSearchZipCode = () => {
    console.log('우편번호 검색');
  };

  // 전체 동의 토글
  const toggleAllAgreements = (checked: boolean) => {
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  // 개별 약관 토글
  const toggleAgreement = (key: keyof Omit<AgreementsState, 'all'>, checked: boolean) => {
    const newAgreements = { ...agreements, [key]: checked };
    newAgreements.all =
      newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
    setAgreements(newAgreements);
  };

  // 약관 상세 보기
  const handleViewAgreement = (type: string) => {
    if (type === 'terms') {
      (navigation as any).navigate('Terms');
    } else if (type === 'privacy') {
      (navigation as any).navigate('Privacy');
    }
  };

  // 회원가입 제출
  const handleSubmit = async () => {
    const allErrors: SignUpErrors = {};

    const userIdErrors = validateUserId(formData.userId);
    if (userIdErrors.length > 0) allErrors.userId = userIdErrors;

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) allErrors.password = passwordErrors;

    const passwordConfirmErrors = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );
    if (passwordConfirmErrors.length > 0)
      allErrors.passwordConfirm = passwordConfirmErrors;

    const nameErrors = validateName(formData.name);
    if (nameErrors.length > 0) allErrors.name = nameErrors;

    const nicknameErrors = validateNickname(formData.nickname);
    if (nicknameErrors.length > 0) allErrors.nickname = nicknameErrors;

    if (!isVerified) {
      allErrors.verification = ['휴대폰 본인인증을 완료해주세요.'];
    }

    if (!agreements.terms || !agreements.privacy) {
      allErrors.agreements = ['필수 약관에 동의해 주세요.'];
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sign up:', formData);
      navigation.navigate('SignUpComplete', { name: formData.name });
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 에러 메시지 렌더링
  const renderErrors = (fieldErrors?: string[]) => {
    if (!fieldErrors || fieldErrors.length === 0) return null;
    return fieldErrors.map((error, index) => (
      <Text key={index} style={styles.errorText}>
        *{error}
      </Text>
    ));
  };

  // 성공 메시지 렌더링
  const renderSuccess = (message?: string) => {
    if (!message) return null;
    return <Text style={styles.successText}>*{message}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="회원가입" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* formContainer - 입력 폼 */}
          <View style={styles.formContainer}>
            {/* 아이디 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                아이디<Text style={styles.req}> *</Text>
              </Text>
              <Input
                placeholder="5자 ~ 20자 이내의 영문으로 아이디를 입력해 주세요."
                value={formData.userId}
                onChangeText={(text) => updateField('userId', text)}
                onBlur={() => validateField('userId')}
                containerStyle={styles.inputNoMargin}
              />
              {renderSuccess(errors.userIdSuccess)}
              {renderErrors(errors.userId)}
            </View>

            {/* 비밀번호 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                비밀번호<Text style={styles.req}> *</Text>
              </Text>
              <Input
                placeholder="8~20자의 영문 대·소문자, 숫자, 특수문자를 사용해 주세요."
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                onBlur={() => validateField('password')}
                secureTextEntry
                inputStyle={styles.inputFs13}
                containerStyle={styles.inputNoMargin}
              />
              <Input
                placeholder="비밀번호를 재입력해 주세요."
                value={formData.passwordConfirm}
                onChangeText={(text) => updateField('passwordConfirm', text)}
                onBlur={() => validateField('passwordConfirm')}
                secureTextEntry
                containerStyle={styles.inputNoMargin}
              />
              {renderSuccess(errors.passwordSuccess)}
              {renderErrors(errors.password)}
              {renderErrors(errors.passwordConfirm)}
            </View>

            {/* 이름 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                이름<Text style={styles.req}> *</Text>
              </Text>
              <Input
                placeholder="이름을 입력해 주세요."
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
                onBlur={() => validateField('name')}
                containerStyle={styles.inputNoMargin}
              />
              {renderErrors(errors.name)}
            </View>

            {/* 닉네임 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                닉네임<Text style={styles.req}> *</Text>
              </Text>
              <Input
                placeholder="닉네임을 입력 해주세요."
                value={formData.nickname}
                onChangeText={(text) => updateField('nickname', text)}
                onBlur={() => {
                  validateField('nickname');
                  checkNicknameAvailability();
                }}
                containerStyle={styles.inputNoMargin}
              />
              {renderErrors(errors.nickname)}
            </View>

            {/* 휴대폰인증 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                휴대폰인증<Text style={styles.req}> *</Text>
              </Text>
              <TouchableOpacity
                style={styles.lightButton}
                onPress={handleVerification}
              >
                <Text style={styles.lightButtonText}>PASS 본인 인증</Text>
              </TouchableOpacity>
              {isVerified && (
                <Text style={styles.verifiedText}>
                  본인 인증이 완료되었습니다
                </Text>
              )}
              {renderErrors(errors.verification)}
            </View>

            {/* 이메일 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>
                이메일<Text style={styles.req}> *</Text>
              </Text>
              <View style={styles.emailRow}>
                <Input
                  placeholder="이메일을 입력 해주세요."
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  containerStyle={[styles.inputNoMargin, styles.flex1]}
                />
                <Text style={styles.atSymbol}>@</Text>
                <Input
                  placeholder="도메인을 입력 해주세요."
                  value={formData.emailDomain}
                  onChangeText={(text) => updateField('emailDomain', text)}
                  onBlur={() => validateField('email')}
                  containerStyle={[styles.inputNoMargin, styles.flex1]}
                />
              </View>
              {renderErrors(errors.email)}
            </View>

            {/* 전화번호 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>전화번호</Text>
              <Input
                placeholder="전화번호를 입력해 주세요."
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                keyboardType="phone-pad"
                containerStyle={styles.inputNoMargin}
              />
            </View>

            {/* 사업장 주소지 */}
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>사업장 주소지</Text>
              <View style={styles.addressRow}>
                <Input
                  placeholder="우편번호"
                  value={formData.zipCode}
                  disabled
                  containerStyle={[styles.inputNoMargin, styles.flex1]}
                />
                <TouchableOpacity
                  style={styles.searchButton}
                  onPress={handleSearchZipCode}
                >
                  <Text style={styles.lightButtonText}>우편번호 검색</Text>
                </TouchableOpacity>
              </View>
              <Input
                placeholder="주소"
                value={formData.address}
                disabled
                containerStyle={styles.inputNoMargin}
              />
              <Input
                placeholder="상세 주소"
                value={formData.addressDetail}
                onChangeText={(text) => updateField('addressDetail', text)}
                containerStyle={styles.inputNoMargin}
              />
              <Text style={styles.addressHint}>
                입력하신 사업장 소재지를 기준으로 가까운 거리부터 순서대로 확인
                하실 수 있습니다.
              </Text>
            </View>
          </View>

          {/* formContainer - 약관 동의 (mt25) */}
          <View style={styles.agreementContainer}>
            <View style={styles.formLi}>
              <Text style={styles.formLabel}>이용 약관</Text>

              {/* 전체 약관 동의 헤더 */}
              <View style={styles.agreementHeaderRow}>
                <Text style={styles.agreementSubtitle}>
                  필수 항목에 모두 동의해 주세요.
                </Text>
                <Checkbox
                  checked={agreements.all}
                  onToggle={toggleAllAgreements}
                  label="전체 약관 동의"
                />
              </View>

              {/* 구분선 <hr> */}
              <View style={styles.agreementDivider} />

              {/* 이용약관 (필수) */}
              <View style={styles.agreementRow}>
                <Checkbox
                  checked={agreements.terms}
                  onToggle={(c) => toggleAgreement('terms', c)}
                />
                <TouchableOpacity
                  style={styles.agreementLabelArea}
                  onPress={() => toggleAgreement('terms', !agreements.terms)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.agreementLabel}>
                    이용약관
                    <Text style={styles.agreementReq}> (필수)</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewAgreement('terms')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.viewLinkText}>보기</Text>
                </TouchableOpacity>
              </View>

              {/* 개인정보 수집 및 이용 동의 (필수) */}
              <View style={[styles.agreementRow, styles.mt5]}>
                <Checkbox
                  checked={agreements.privacy}
                  onToggle={(c) => toggleAgreement('privacy', c)}
                />
                <TouchableOpacity
                  style={styles.agreementLabelArea}
                  onPress={() => toggleAgreement('privacy', !agreements.privacy)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.agreementLabel}>
                    개인정보 수집 및 이용 동의
                    <Text style={styles.agreementReq}> (필수)</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewAgreement('privacy')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.viewLinkText}>보기</Text>
                </TouchableOpacity>
              </View>

              {/* 마케팅 수신 동의 (선택) */}
              <View style={[styles.agreementRow, styles.mt5]}>
                <Checkbox
                  checked={agreements.marketing}
                  onToggle={(c) => toggleAgreement('marketing', c)}
                />
                <TouchableOpacity
                  style={styles.agreementLabelArea}
                  onPress={() => toggleAgreement('marketing', !agreements.marketing)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.agreementLabel}>
                    마케팅 수신 동의
                    <Text style={styles.agreementOpt}> (선택)</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewAgreement('marketing')}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.viewLinkText}>보기</Text>
                </TouchableOpacity>
              </View>

              {renderErrors(errors.agreements)}
            </View>
          </View>

          {/* 회원가입 버튼 */}
          <View style={styles.formBtnSet}>
            <Button
              title="회원가입"
              onPress={handleSubmit}
              loading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  formContainer: {
    gap: 25,
  },

  formLi: {
    gap: 6,
  },

  formLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.G600,
  },

  req: {
    color: colors.error,
  },

  inputNoMargin: {
    marginBottom: 0,
  },

  inputFs13: {
    fontSize: 13,
  },

  flex1: {
    flex: 1,
  },

  errorText: {
    fontSize: 13,
    color: colors.error,
  },
  successText: {
    fontSize: 13,
    color: '#53B460',
  },

  lightButton: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  lightButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.textPrimary,
  },
  verifiedText: {
    fontSize: 13,
    color: colors.textTertiary,
    textAlign: 'center',
  },

  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  atSymbol: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },

  addressRow: {
    flexDirection: 'row',
    gap: 5,
  },
  searchButton: {
    height: 50,
    width: 120,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  addressHint: {
    fontSize: 13,
    color: colors.G600,
  },

  agreementContainer: {
    marginTop: 25,
  },

  agreementHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  agreementSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.textPrimary,
    flex: 1,
  },

  agreementDivider: {
    height: 1,
    backgroundColor: colors.G200,
  },

  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  agreementLabelArea: {
    flex: 1,
  },
  agreementLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  agreementReq: {
    color: colors.error,
  },
  agreementOpt: {
    color: colors.G600,
  },
  viewLinkText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },

  mt5: {
    marginTop: 5,
  },

  formBtnSet: {
    marginTop: 30,
  },
});

export default SignUpScreen;
