import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import Header from '../../components/common/Header';

interface DisabledField {
  value: string;
}

interface FormSection {
  label: string;
  fields: DisabledField[];
}

const FORM_DATA: FormSection[] = [
  {
    label: '사업자 기본 정보',
    fields: [
      { value: '아라요 기계장터(주)' },
      { value: '38686603185' },
      { value: '홍길동' },
      { value: '2021.03.15' },
    ],
  },
  {
    label: '사업 유형 정보',
    fields: [
      { value: '산업기계 도·소매업' },
      { value: '도매 및 소매업' },
      { value: '법인사업자' },
    ],
  },
  {
    label: '세금·연락 정보',
    fields: [
      { value: '일반과세자' },
      { value: 'hongildong@gmail.com' },
    ],
  },
];

const DisabledInput = ({ value }: { value: string }) => (
  <View style={styles.inpSet}>
    <View style={styles.disabledInput}>
      <Text style={styles.disabledInputText} numberOfLines={1}>{value}</Text>
    </View>
    <View style={styles.checkIconContainer}>
      <View style={styles.checkIconPlaceholder} />
    </View>
  </View>
);

const FormSectionComponent = ({ section }: { section: FormSection }) => (
  <View style={styles.formLi}>
    <Text style={styles.formLabel}>{section.label}</Text>
    {section.fields.map((field, index) => (
      <DisabledInput key={index} value={field.value} />
    ))}
  </View>
);

const BusinessUpgradeFormGoldScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="골드기업회원 전환" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          {FORM_DATA.map((section, index) => (
            <FormSectionComponent key={index} section={section} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomFloating}>
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>전환하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
  },
  formContainer: {
    gap: 25,
  },
  formLi: {
    gap: 6,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  inpSet: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledInput: {
    flex: 1,
    height: 50,
    backgroundColor: colors.G200,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingRight: 50,
    justifyContent: 'center',
  },
  disabledInputText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.G500,
  },
  checkIconContainer: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIconPlaceholder: {
    width: 16,
    height: 16,
  },
  bottomFloating: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
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

export default BusinessUpgradeFormGoldScreen;
