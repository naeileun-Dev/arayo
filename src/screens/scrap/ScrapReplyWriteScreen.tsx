import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { BottomButtonBar } from '../../components/common';
import {
  SectionLabel,
  FormLabel,
  ValidationMsg,
  Checkbox,
  AgreementSection,
  formatPrice,
  formatPhone,
} from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

const EDIT_SAMPLE = {
  description: '문의 주신 고철 처리 건에 대해\n아래와 같이 검토 결과를 안내드립니다.',
  price: '500,000',
  contactName: '김샘플',
  companyName: '샘플상사',
  phone: '010-1234-5678',
};

export const ScrapReplyWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isEditMode = route?.params?.mode === 'edit';

  const [description, setDescription] = useState(isEditMode ? EDIT_SAMPLE.description : '');
  const [priceNegotiable, setPriceNegotiable] = useState(isEditMode);
  const [price, setPrice] = useState(isEditMode ? EDIT_SAMPLE.price : '');
  const [contactName, setContactName] = useState(isEditMode ? EDIT_SAMPLE.contactName : '');
  const [companyName, setCompanyName] = useState(isEditMode ? EDIT_SAMPLE.companyName : '');
  const [phone, setPhone] = useState(isEditMode ? EDIT_SAMPLE.phone : '');

  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);

  const [showValidation, setShowValidation] = useState(false);

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreePrivacy(next);
    setAgreeThirdParty(next);
  };

  const handleTogglePrivacy = () => {
    const next = !agreePrivacy;
    setAgreePrivacy(next);
    setAgreeAll(next && agreeThirdParty);
  };

  const handleToggleThirdParty = () => {
    const next = !agreeThirdParty;
    setAgreeThirdParty(next);
    setAgreeAll(next && agreePrivacy);
  };

  const handleSubmit = () => {
    setShowValidation(true);
    const isValid =
      description &&
      (price || priceNegotiable) &&
      contactName &&
      companyName &&
      phone &&
      agreePrivacy &&
      agreeThirdParty;

    if (isValid) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title={isEditMode ? '고철처리 답변 수정' : '고철처리 답변 등록'}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SectionLabel label="상세 소개" />

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="기타 안내" required />
              <Text style={styles.textCount}>({description.length}/200글자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={(t) => setDescription(t.slice(0, 200))}
              placeholder="추가 안내 사항을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={200}
            />
            <ValidationMsg message="* 기타 안내를 입력해 주세요." visible={showValidation && !description} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="가격" />

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="매입 금액" required />
              <Checkbox checked={priceNegotiable} onPress={() => setPriceNegotiable(!priceNegotiable)} label="가격 협의 가능" />
            </View>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={(t) => setPrice(formatPrice(t))}
              placeholder="매입 금액을 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
            />
            <ValidationMsg message="* 매입 금액을 입력해 주세요." visible={showValidation && !price && !priceNegotiable} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="판매자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="담당자명" required />
            <TextInput
              style={styles.textInput}
              value={contactName}
              onChangeText={setContactName}
              placeholder="담당자명을 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg message="* 담당자명을 입력해 주세요." visible={showValidation && !contactName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="상호명" required />
            <TextInput
              style={styles.textInput}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="상호명을 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg message="* 상호명을 입력해 주세요." visible={showValidation && !companyName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="휴대폰 번호" required />
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={(t) => setPhone(formatPhone(t))}
              placeholder="휴대폰 번호를 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="phone-pad"
              maxLength={13}
            />
            <ValidationMsg message="* 휴대폰 번호를 입력해 주세요." visible={showValidation && !phone} />
          </View>

          <View style={styles.sectionGap} />
          <View style={styles.formItem}>
            <AgreementSection
              agreeAll={agreeAll}
              agreePrivacy={agreePrivacy}
              agreeThirdParty={agreeThirdParty}
              onToggleAll={handleAgreeAll}
              onTogglePrivacy={handleTogglePrivacy}
              onToggleThirdParty={handleToggleThirdParty}
              showValidation={showValidation}
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '취소', variant: 'gray', onPress: () => navigation.goBack() },
          { label: isEditMode ? '수정하기' : '등록하기', onPress: handleSubmit },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionGap: {
    height: 40,
  },
  formItem: {
    marginBottom: 25,
  },
  formLabelWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textCount: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.G400,
  },
  formHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textInput: {
    height: 50,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 150,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    textAlignVertical: 'top',
  },
  bottomSpacer: {
    height: 15,
  },
});

