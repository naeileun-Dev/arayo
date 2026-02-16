/**
 * 유효성 검사 유틸리티
 */

import { SignUpFormData } from '../types';

/**
 * 아이디 유효성 검사
 * - 5~20자 영문, 숫자 조합
 */
export const validateUserId = (userId: string): string[] => {
  const errors: string[] = [];

  if (!userId) {
    errors.push('아이디를 입력해 주세요.');
    return errors;
  }

  if (userId.length < 5 || userId.length > 20) {
    errors.push('5자 ~ 20자 이내의 영문,숫자로 아이디를 입력해 주세요.');
  }

  if (!/^[a-zA-Z0-9]+$/.test(userId)) {
    errors.push('5자 ~ 20자 이내의 영문,숫자로 아이디를 입력해 주세요.');
  }

  return errors;
};

/**
 * 비밀번호 유효성 검사
 * - 8~20자 영문 대·소문자, 숫자, 특수문자 조합
 */
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (!password) {
    errors.push('비밀번호를 입력해 주세요.');
    return errors;
  }

  if (password.length < 8 || password.length > 20) {
    errors.push('8~20자내로 구성해주세요.');
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    errors.push('(보안을 위해 영문, 숫자, 특수문자를 사용을 권장드립니다.)');
  }

  return errors;
};

/**
 * 비밀번호 확인 검사
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): string[] => {
  const errors: string[] = [];

  if (!passwordConfirm) {
    errors.push('비밀번호를 다시 입력해 주세요.');
    return errors;
  }

  if (password !== passwordConfirm) {
    errors.push('비밀번호가 일치하지 않습니다.');
  }

  return errors;
};

/**
 * 이름 유효성 검사
 */
export const validateName = (name: string): string[] => {
  const errors: string[] = [];

  if (!name) {
    errors.push('이름을 정확하게 입력해 주세요.');
    return errors;
  }

  if (name.length < 2) {
    errors.push('이름을 정확하게 입력해 주세요.');
  }

  return errors;
};

/**
 * 닉네임 유효성 검사
 * - 5~20자
 */
export const validateNickname = (nickname: string): string[] => {
  const errors: string[] = [];

  if (!nickname) {
    errors.push('닉네임을 정확하게 입력해 주세요.');
    return errors;
  }

  if (nickname.length < 5 || nickname.length > 20) {
    errors.push('5자 ~ 20자 이내로 입력해 주세요.');
  }

  return errors;
};

/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email: string): string[] => {
  const errors: string[] = [];

  if (!email) {
    errors.push('이메일을 올바르게 입력해 주세요.');
    return errors;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('이메일을 올바르게 입력해 주세요.');
  }

  return errors;
};

/**
 * 전화번호 유효성 검사
 */
export const validatePhone = (phone: string): string[] => {
  const errors: string[] = [];

  if (!phone) {
    return errors; // 선택사항
  }

  const phoneRegex = /^01[0-9][0-9]{3,4}[0-9]{4}$/;
  if (!phoneRegex.test(phone.replace(/-/g, ''))) {
    errors.push('올바른 전화번호를 입력해 주세요.');
  }

  return errors;
};

/**
 * 전체 회원가입 폼 유효성 검사
 */
export const validateSignUpForm = (
  formData: SignUpFormData
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  const userIdErrors = validateUserId(formData.userId);
  if (userIdErrors.length > 0) errors.userId = userIdErrors;

  const passwordErrors = validatePassword(formData.password);
  if (passwordErrors.length > 0) errors.password = passwordErrors;

  const passwordConfirmErrors = validatePasswordConfirm(
    formData.password,
    formData.passwordConfirm
  );
  if (passwordConfirmErrors.length > 0)
    errors.passwordConfirm = passwordConfirmErrors;

  const nameErrors = validateName(formData.name);
  if (nameErrors.length > 0) errors.name = nameErrors;

  const nicknameErrors = validateNickname(formData.nickname);
  if (nicknameErrors.length > 0) errors.nickname = nicknameErrors;

  const emailErrors = validateEmail(formData.email);
  if (emailErrors.length > 0) errors.email = emailErrors;

  return errors;
};

export default {
  validateUserId,
  validatePassword,
  validatePasswordConfirm,
  validateName,
  validateNickname,
  validateEmail,
  validatePhone,
  validateSignUpForm,
};
