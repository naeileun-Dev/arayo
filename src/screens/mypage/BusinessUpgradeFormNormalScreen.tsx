import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { BottomButtonBar } from '../../components/common';

interface FormField {
  label: string;
  required: boolean;
  disabled: boolean;
  value: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'phone-pad' | 'email-address';
  key: string;
}

const FORM_FIELDS: FormField[] = [
  { label: '상호명', required: true, disabled: false, value: '', placeholder: '', key: 'companyName' },
  { label: '사업자등록번호', required: true, disabled: false, value: '', placeholder: '', keyboardType: 'numeric', key: 'businessNumber' },
  { label: '050 번호', required: false, disabled: true, value: '', placeholder: '최초 상품 시 자동 생성됩니다.', keyboardType: 'phone-pad', key: 'phone050' },
  { label: '연락처', required: true, disabled: false, value: '', placeholder: '', keyboardType: 'phone-pad', key: 'contact' },
  { label: '법인구분', required: true, disabled: false, value: '', placeholder: '', key: 'corporationType' },
  { label: '대표자명', required: true, disabled: false, value: '', placeholder: '', key: 'ceoName' },
  { label: '업종', required: true, disabled: false, value: '', placeholder: '', key: 'industry' },
  { label: '업태', required: true, disabled: false, value: '', placeholder: '', key: 'businessType' },
  { label: '과세유형', required: true, disabled: false, value: '', placeholder: '', key: 'taxType' },
  { label: '이메일주소', required: true, disabled: false, value: '', placeholder: '', keyboardType: 'email-address', key: 'email' },
];

export const BusinessUpgradeFormNormalScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [formData, setFormData] = useState<Record<string, string>>(
    FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {}),
  );

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="일반기업회원 전환" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          style={styles.flex1}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {FORM_FIELDS.map((field, index) => (
            <View
              key={field.key}
              style={[styles.formLi, index < FORM_FIELDS.length - 1 && { marginBottom: 25 }]}
            >
              <View style={styles.labelRow}>
                <Text style={styles.labelText}>{field.label}</Text>
                {field.required && <Text style={styles.requiredMark}> *</Text>}
              </View>
              <TextInput
                style={[styles.input, field.disabled && styles.inputDisabled]}
                value={formData[field.key]}
                onChangeText={(text) => handleChange(field.key, text)}
                placeholder={field.placeholder}
                placeholderTextColor={colors.G500}
                editable={!field.disabled}
                keyboardType={field.keyboardType}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '전환하기', onPress: () => {} },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 110,
    paddingHorizontal: 20,
  },
  formLi: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  requiredMark: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
  },
  input: {
    height: 50,
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  inputDisabled: {
    backgroundColor: colors.G200,
    color: colors.G500,
  },
  bottomFloating: {
    height: 90,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
});

