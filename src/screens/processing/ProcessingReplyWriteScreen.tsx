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
  Dimensions,
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
  ServiceTag,
  AgreementSection,
  formatPrice,
  formatPhone,
} from '../estimate/components/FormComponents';
import { SERVICE_OPTIONS } from '../estimate/constants';
import type { RootStackParamList } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EDIT_SAMPLE = {
  description: '문의 주신 스마트기기 부품 임가공 건에 대해 아래와 같이 검토 결과를 안내드립니다.\n요청하신 제품 용도(로봇·드론·IoT·스마트기기)와 가공 조건을 기준으로 소재 특성, 정밀도 요구 수준, 생산 수량 등을 종합적으로 확인하였으며, 당사 보유 설비 및 가공 공정을 통해 안정적인 제작이 가능하다고 판단됩니다.',
  services: { sangchado: true } as Record<string, boolean>,
  price: '40,500,000',
  contactName: '김샘플',
  companyName: '아라요 기계장터',
  phone: '010-1234-5678',
};

export const ProcessingReplyWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isEditMode = route?.params?.mode === 'edit';

  const [description, setDescription] = useState(isEditMode ? EDIT_SAMPLE.description : '');
  const [services, setServices] = useState<Record<string, boolean>>(
    isEditMode ? EDIT_SAMPLE.services : {}
  );
  const [priceNegotiable, setPriceNegotiable] = useState(isEditMode);
  const [price, setPrice] = useState(isEditMode ? EDIT_SAMPLE.price : '');
  const [contactName, setContactName] = useState(isEditMode ? EDIT_SAMPLE.contactName : '');
  const [companyName, setCompanyName] = useState(isEditMode ? EDIT_SAMPLE.companyName : '');
  const [phone, setPhone] = useState(isEditMode ? EDIT_SAMPLE.phone : '');

  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);

  const [showValidation, setShowValidation] = useState(false);

  const toggleService = (key: string) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasSelectedService = Object.values(services).some((v) => v);

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
      hasSelectedService &&
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
        title={isEditMode ? '견적 답변 수정' : '견적 답변 등록'}
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
              <Text style={styles.textCount}>({description.length}/2,000자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={(t) => setDescription(t.slice(0, 2000))}
              placeholder="최대 2,000자차 이내로 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
            <ValidationMsg message="*기타 안내 설명을 입력해 주세요." visible={showValidation && !description} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelRow}>
              <Text style={styles.formLabelText}>제공 서비스 선택</Text>
            </View>
            <View style={styles.serviceGrid}>
              {SERVICE_OPTIONS.map((svc) => (
                <ServiceTag
                  key={svc.key}
                  checked={!!services[svc.key]}
                  onPress={() => toggleService(svc.key)}
                  label={svc.label}
                />
              ))}
            </View>
            <ValidationMsg message="* 제공 서비스를 선택해 주세요." visible={showValidation && !hasSelectedService} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="가격" />

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="견적 금액" required />
              <Checkbox checked={priceNegotiable} onPress={() => setPriceNegotiable(!priceNegotiable)} label="가격 협의 가능" />
            </View>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={(t) => setPrice(formatPrice(t))}
              placeholder="상품 금액 입력"
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
            />
            <ValidationMsg message="*견적 금액을 입력해 주세요." visible={showValidation && !price && !priceNegotiable} />
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
  formLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  formLabelText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
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
    height: 180,
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
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  bottomSpacer: {
    height: 15,
  },
});

