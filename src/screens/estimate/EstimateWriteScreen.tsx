import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../styles/colors';
import EyeIcon from '../../assets/icon/eye.svg';
import EyeClosedIcon from '../../assets/icon/eye-closed.svg';
import { BottomButtonBar } from '../../components/common';
import { EstimateWarningModal } from './components/EstimateWarningModal';
import {
  MACHINE_CATEGORIES,
  MACHINE_SUB_CATEGORIES,
  CITIES,
} from './constants';
import {
  SectionLabel,
  FormLabel,
  ValidationMsg,
  SelectDropdown,
  Checkbox,
  CheckboxButton,
  RadioCheck,
  ImageUploadGrid,
  AgreementSection,
  formatPrice,
  formatPhone,
  styles,
} from './components/FormComponents';

const EDIT_SAMPLE = {
  title: '안녕하세요. CNC 선반 견적 문의 드립니다.',
  productName: '[중고] CNC 선반',
  machineCategory: 'machine_tools',
  machineSubCategory: 'CNC 선반',
  city: 'seoul',
  price: '4,000,000',
  inquiryContent: '안녕하세요 견적문의 드립니다. 확인 후 답변 부탁드립니다. ^^',
  buyerName: '김샘플',
  buyerPhone: '010-1234-5678',
};

export const EstimateWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const isEditMode = route?.params?.mode === 'edit';
  const [warningVisible, setWarningVisible] = useState(!isEditMode);
  const [title, setTitle] = useState(isEditMode ? EDIT_SAMPLE.title : '');
  const [productName, setProductName] = useState(isEditMode ? EDIT_SAMPLE.productName : '');
  const [productTypeUsed, setProductTypeUsed] = useState(true);
  const [productTypeNew, setProductTypeNew] = useState(false);
  const [machineCategory, setMachineCategory] = useState(isEditMode ? EDIT_SAMPLE.machineCategory : '');
  const [machineCategoryOpen, setMachineCategoryOpen] = useState(false);
  const [machineSubCategory, setMachineSubCategory] = useState(isEditMode ? EDIT_SAMPLE.machineSubCategory : '');
  const [machineSubCategoryOpen, setMachineSubCategoryOpen] = useState(false);
  const [city, setCity] = useState(isEditMode ? EDIT_SAMPLE.city : '');
  const [cityOpen, setCityOpen] = useState(false);
  const [county, setCounty] = useState('');
  const [countyOpen, setCountyOpen] = useState(false);
  const [suggestPrice, setSuggestPrice] = useState(false);
  const [price, setPrice] = useState(isEditMode ? EDIT_SAMPLE.price : '');
  const [inquiryContent, setInquiryContent] = useState(isEditMode ? EDIT_SAMPLE.inquiryContent : '');
  const [buyerName, setBuyerName] = useState(isEditMode ? EDIT_SAMPLE.buyerName : '');
  const [buyerPhone, setBuyerPhone] = useState(isEditMode ? EDIT_SAMPLE.buyerPhone : '');
  const [contactRange, setContactRange] = useState<number | null>(isEditMode ? 0 : null);
  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);
  const [showValidation, setShowValidation] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [guestPassword, setGuestPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const closeAllDropdowns = () => {
    setMachineCategoryOpen(false);
    setMachineSubCategoryOpen(false);
    setCityOpen(false);
    setCountyOpen(false);
  };

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

  const handleSubmit = () => setShowValidation(true);

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 10 - uploadedImages.length },
      (response) => {
        if (response.assets) {
          const uris = response.assets.map((a) => a.uri).filter((u): u is string => !!u);
          setUploadedImages((prev) => [...prev, ...uris].slice(0, 10));
        }
      },
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} activeOpacity={0.7}>
          <View style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? '견적 문의 수정' : '견적 문의 등록'}</Text>
        <View style={styles.headerBackBtn} />
      </View>

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
          <SectionLabel label="문의 정보" />

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="제목" required />
              <Text style={styles.textCount}>({title.length}/50자)</Text>
            </View>
            <TextInput style={styles.textInput} value={title} onChangeText={(t) => setTitle(t.slice(0, 50))} placeholder="견적 문의 제목을 입력해 주세요." placeholderTextColor={colors.G400} maxLength={50} />
            <ValidationMsg message="* 제목을 정확하게 입력해 주세요." visible={showValidation && !title} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="제품명" required />
              <Text style={styles.textCount}>({productName.length}/50자)</Text>
            </View>
            <TextInput style={styles.textInput} value={productName} onChangeText={(t) => setProductName(t.slice(0, 50))} placeholder="최대 50자 이내로 입력해 주세요." placeholderTextColor={colors.G400} maxLength={50} />
            <ValidationMsg message="* 상품명을 정확하게 입력해 주세요." visible={showValidation && !productName} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="제품 유형" required />
              <Text style={styles.formHeadSub}>복수 선택 가능</Text>
            </View>
            <View style={styles.productTypeRow}>
              <CheckboxButton checked={productTypeUsed} onPress={() => setProductTypeUsed(!productTypeUsed)} label="중고" />
              <CheckboxButton checked={productTypeNew} onPress={() => setProductTypeNew(!productTypeNew)} label="신품" />
            </View>
            <ValidationMsg message="*제품유형을 선택해 주세요." visible={showValidation && !productTypeUsed && !productTypeNew} />
          </View>

          <View style={[styles.formItem, { zIndex: 40 }]}>
            <FormLabel text="설비 구분" required />
            <SelectDropdown
              placeholder="선택"
              value={machineCategory}
              isOpen={machineCategoryOpen}
              onToggle={() => { const next = !machineCategoryOpen; closeAllDropdowns(); setMachineCategoryOpen(next); }}
              options={MACHINE_CATEGORIES}
              onSelect={(v) => { setMachineCategory(v); setMachineSubCategory(''); }}
            />
            <ValidationMsg message="*설비 구분을 선택해 주세요." visible={showValidation && !machineCategory} />
          </View>

          <View style={[styles.formItem, { zIndex: 30 }]}>
            <FormLabel text="세부 기종" required />
            <SelectDropdown
              placeholder="선택"
              value={machineSubCategory}
              isOpen={machineSubCategoryOpen}
              onToggle={() => { const next = !machineSubCategoryOpen; closeAllDropdowns(); setMachineSubCategoryOpen(next); }}
              options={
                machineCategory
                  ? (MACHINE_SUB_CATEGORIES[machineCategory] || []).map((s) => ({ value: s, label: s }))
                  : [{ value: '', label: '설비 구분을 먼저 선택해 주세요.' }]
              }
              onSelect={(v) => setMachineSubCategory(v)}
            />
            <ValidationMsg message="*설비 구분을 먼저 선택해 주세요. / 세부 기종을 선택해 주세요." visible={showValidation && !machineSubCategory} />
          </View>

          <View style={[styles.formItem, { zIndex: 20 }]}>
            <FormLabel text="제품 위치" required />
            <View style={styles.locationSelects}>
              <View style={{ zIndex: 2 }}>
                <SelectDropdown placeholder="시/도" value={city} isOpen={cityOpen} onToggle={() => { const next = !cityOpen; closeAllDropdowns(); setCityOpen(next); }} options={CITIES} onSelect={(v) => { setCity(v); setCounty(''); }} />
              </View>
              <View style={{ zIndex: 1 }}>
                <SelectDropdown placeholder="구/군" value={county} isOpen={countyOpen} onToggle={() => { const next = !countyOpen; closeAllDropdowns(); setCountyOpen(next); }} options={[{ value: '', label: '구/군 선택' }]} onSelect={(v) => setCounty(v)} />
              </View>
            </View>
            <ValidationMsg message="*제품위치를 선택해 주세요." visible={showValidation && !city} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="희망 가격" required />
              <Checkbox checked={suggestPrice} onPress={() => setSuggestPrice(!suggestPrice)} label="제안 받기" />
            </View>
            <TextInput style={styles.textInput} value={price} onChangeText={(t) => setPrice(formatPrice(t))} placeholder="희망 가격을 입력해 주세요." placeholderTextColor={colors.G400} keyboardType="numeric" />
            <ValidationMsg message="* 희망 가격을 입력해 주세요." visible={showValidation && !price && !suggestPrice} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="내용 작성 및 파일 업로드" />

          <View style={styles.formItem}>
            <FormLabel text={`첨부 이미지 등록 (${uploadedImages.length}/10)`} required />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>• 문의 내용에 도움이 될 이미지를 첨부해 주세요.</Text>
              <Text style={styles.blueBoxText}>• 지원 형식: PNG, JPG</Text>
            </View>
            <ImageUploadGrid
              images={uploadedImages}
              maxCount={10}
              onRemove={(idx) => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
              onAdd={handleImagePick}
            />
            <ValidationMsg message="*첨부 이미지를 선택해 주세요." visible={showValidation && uploadedImages.length === 0} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="문의 내용" required />
              <Text style={styles.textCount}>({inquiryContent.length}/2,000자)</Text>
            </View>
            <TextInput style={styles.textArea} value={inquiryContent} onChangeText={(t) => setInquiryContent(t.slice(0, 2000))} placeholder="문의 내용을 입력해 주세요." placeholderTextColor={colors.G400} multiline textAlignVertical="top" maxLength={2000} />
            <ValidationMsg message="* 문의 내용을 입력해 주세요." visible={showValidation && !inquiryContent} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="구매자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="이름" required />
            <TextInput style={styles.textInput} value={buyerName} onChangeText={setBuyerName} placeholder="이름을 입력해 주세요." placeholderTextColor={colors.G400} />
            <ValidationMsg message="* 이름을 입력해 주세요." visible={showValidation && !buyerName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="휴대폰 번호" required />
            <TextInput style={styles.textInput} value={buyerPhone} onChangeText={(t) => setBuyerPhone(formatPhone(t))} placeholder="휴대폰 번호를 입력해 주세요." placeholderTextColor={colors.G400} keyboardType="phone-pad" maxLength={13} />
            <ValidationMsg message="* 휴대폰 번호를 입력해 주세요." visible={showValidation && !buyerPhone} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="연락 허용 범위" required />
            <View style={styles.radioGroup}>
              <RadioCheck selected={contactRange === 0} onPress={() => setContactRange(0)} label="견적답변을 등록한 모든 판매자에게 연락 수신" />
              <RadioCheck selected={contactRange === 1} onPress={() => setContactRange(1)} label="받은견적에서 내가 선택한 판매자에게만 연락 수신" />
            </View>
            <ValidationMsg message="* 연락 허용 범위를 선택해 주세요." visible={showValidation && contactRange === null} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="비회원 비밀번호" required />
            <View style={styles.passwordInputWrap}>
              <TextInput
                style={styles.passwordInput}
                value={guestPassword}
                onChangeText={setGuestPassword}
                placeholder="비밀번호를 입력해 주세요."
                placeholderTextColor={colors.G400}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity style={styles.passwordToggle} onPress={() => setIsPasswordVisible(!isPasswordVisible)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {isPasswordVisible ? (
                  <EyeIcon width={20} height={20} color={colors.G500} />
                ) : (
                  <EyeClosedIcon width={20} height={20} color={colors.G500} />
                )}
              </TouchableOpacity>
            </View>
            <ValidationMsg message="* 비밀번호를 입력해 주세요." visible={showValidation && !guestPassword} />
          </View>

          <View style={styles.sectionGap} />
          <AgreementSection
            agreeAll={agreeAll}
            agreePrivacy={agreePrivacy}
            agreeThirdParty={agreeThirdParty}
            onToggleAll={handleAgreeAll}
            onTogglePrivacy={handleTogglePrivacy}
            onToggleThirdParty={handleToggleThirdParty}
            showValidation={showValidation}
          />

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '취소', variant: 'gray', onPress: () => {} },
          { label: isEditMode ? '수정하기' : '등록하기', onPress: handleSubmit },
        ]}
      />

      <EstimateWarningModal
        visible={warningVisible}
        onClose={() => setWarningVisible(false)}
      />
    </View>
  );
};

