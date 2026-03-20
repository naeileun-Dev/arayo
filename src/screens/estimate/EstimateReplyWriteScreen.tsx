import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../styles/colors';
import { BottomButtonBar, ConfirmModal, CompareToast } from '../../components/common';
import {
  MACHINE_CATEGORIES,
  MACHINE_SUB_CATEGORIES,
  YEARS,
  MONTHS,
  CITIES,
  SERVICE_OPTIONS,
} from './constants';
import {
  SectionLabel,
  FormLabel,
  ValidationMsg,
  SelectDropdown,
  Checkbox,
  RadioButton,
  ServiceTag,
  ImageUploadGrid,
  AgreementSection,
  formatPrice,
  formatPhone,
  styles,
} from './components/FormComponents';

const EDIT_SAMPLE = {
  productName: '[중고] CNC 선반',
  productType: 'used' as const,
  machineCategory: 'machine_tools',
  machineSubCategory: 'CNC 선반',
  manufacturer: '화천기계',
  modelName: 'CS-3020H',
  mfgYear: '2006',
  mfgMonth: '07',
  warrantyYear: '2006',
  warrantyMonth: '07',
  city: 'gyeonggi',
  description: '문의 주신 스마트기기 부품 임가공 건에 대해 아래와 같이 검토 결과를 안내드립니다.',
  price: '40,500,000',
  contactName: '김샘플',
  companyName: '화천기계',
  phone: '010-1234-5678',
};

export const EstimateReplyWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const isEditMode = route?.params?.mode === 'edit';

  // ── 기본 정보 ──
  const [productName, setProductName] = useState(isEditMode ? EDIT_SAMPLE.productName : '');
  const [productType, setProductType] = useState<'used' | 'new' | ''>(isEditMode ? EDIT_SAMPLE.productType : '');
  const [machineCategory, setMachineCategory] = useState(isEditMode ? EDIT_SAMPLE.machineCategory : '');
  const [machineCategoryOpen, setMachineCategoryOpen] = useState(false);
  const [machineSubCategory, setMachineSubCategory] = useState(isEditMode ? EDIT_SAMPLE.machineSubCategory : '');
  const [machineSubCategoryOpen, setMachineSubCategoryOpen] = useState(false);
  const [manufacturer, setManufacturer] = useState(isEditMode ? EDIT_SAMPLE.manufacturer : '');
  const [modelName, setModelName] = useState(isEditMode ? EDIT_SAMPLE.modelName : '');

  // 제조 연월
  const [mfgUnknown, setMfgUnknown] = useState(false);
  const [mfgYear, setMfgYear] = useState(isEditMode ? EDIT_SAMPLE.mfgYear : '');
  const [mfgYearOpen, setMfgYearOpen] = useState(false);
  const [mfgMonth, setMfgMonth] = useState(isEditMode ? EDIT_SAMPLE.mfgMonth : '');
  const [mfgMonthOpen, setMfgMonthOpen] = useState(false);

  // 보증 기간
  const [warrantyExpired, setWarrantyExpired] = useState(false);
  const [warrantyYear, setWarrantyYear] = useState(isEditMode ? EDIT_SAMPLE.warrantyYear : '');
  const [warrantyYearOpen, setWarrantyYearOpen] = useState(false);
  const [warrantyMonth, setWarrantyMonth] = useState(isEditMode ? EDIT_SAMPLE.warrantyMonth : '');
  const [warrantyMonthOpen, setWarrantyMonthOpen] = useState(false);

  // 제품 위치
  const [city, setCity] = useState(isEditMode ? EDIT_SAMPLE.city : '');
  const [cityOpen, setCityOpen] = useState(false);
  const [county, setCounty] = useState('');
  const [countyOpen, setCountyOpen] = useState(false);

  // ── 상세 소개 ──
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [description, setDescription] = useState(isEditMode ? EDIT_SAMPLE.description : '');
  const [services, setServices] = useState<Record<string, boolean>>(
    isEditMode ? { loading: true, 'drive-training': true } : {},
  );

  // ── 가격 ──
  const [priceNegotiable, setPriceNegotiable] = useState(isEditMode);
  const [price, setPrice] = useState(isEditMode ? EDIT_SAMPLE.price : '');

  // ── 판매자 정보 ──
  const [contactName, setContactName] = useState(isEditMode ? EDIT_SAMPLE.contactName : '');
  const [companyName, setCompanyName] = useState(isEditMode ? EDIT_SAMPLE.companyName : '');
  const [phone, setPhone] = useState(isEditMode ? EDIT_SAMPLE.phone : '');

  // ── 약관 ──
  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);

  const [showValidation, setShowValidation] = useState(false);

  // ── 드롭다운 제어 ──
  const closeAllDropdowns = useCallback(() => {
    setMachineCategoryOpen(false);
    setMachineSubCategoryOpen(false);
    setMfgYearOpen(false);
    setMfgMonthOpen(false);
    setWarrantyYearOpen(false);
    setWarrantyMonthOpen(false);
    setCityOpen(false);
    setCountyOpen(false);
  }, []);

  const toggleDropdown = useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
      closeAllDropdowns();
      setter(!current);
    },
    [closeAllDropdowns],
  );

  // ── 약관 핸들러 ──
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

  const toggleService = (key: string) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 - uploadedImages.length },
      (response) => {
        if (response.assets) {
          const uris = response.assets.map((a) => a.uri).filter((u): u is string => !!u);
          setUploadedImages((prev) => [...prev, ...uris].slice(0, 1));
        }
      },
    );
  };

  const [registerVisible, setRegisterVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = () => setRegisterVisible(true);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerBackBtn}>
          <View style={styles.headerBackIcon} />
        </View>
        <Text style={styles.headerTitle}>{isEditMode ? '견적 답변 수정' : '견적 답변 등록'}</Text>
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
          {/* ═══ 기본 정보 ═══ */}
          <SectionLabel label="기본 정보" />

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="상품명" required />
              <Text style={styles.textCount}>({productName.length}/50글자)</Text>
            </View>
            <View style={styles.inpSet}>
              <TextInput
                style={styles.textInput}
                value={productName}
                onChangeText={(t) => setProductName(t.slice(0, 50))}
                placeholder="최대 50자 이내로 입력해 주세요."
                placeholderTextColor={colors.G400}
                maxLength={50}
              />
            </View>
            <ValidationMsg message="* 상품명을 정확하게 입력해 주세요." visible={showValidation && !productName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="제품 유형" required />
            <View style={styles.productTypeRow}>
              <RadioButton selected={productType === 'used'} onPress={() => setProductType('used')} label="중고" />
              <RadioButton selected={productType === 'new'} onPress={() => setProductType('new')} label="신품" />
            </View>
            <ValidationMsg message="*제품유형을 선택해 주세요." visible={showValidation && !productType} />
          </View>

          <View style={[styles.formItem, { zIndex: 50 }]}>
            <FormLabel text="설비 구분 및 세부 기종" required />
            <View style={{ zIndex: 2 }}>
              <SelectDropdown
                placeholder="선택"
                value={machineCategory}
                isOpen={machineCategoryOpen}
                onToggle={() => toggleDropdown(setMachineCategoryOpen, machineCategoryOpen)}
                options={MACHINE_CATEGORIES}
                onSelect={(v) => { setMachineCategory(v); setMachineSubCategory(''); }}
              />
            </View>
            <View style={{ zIndex: 1, marginTop: 6 }}>
              <SelectDropdown
                placeholder="선택"
                value={machineSubCategory}
                isOpen={machineSubCategoryOpen}
                onToggle={() => toggleDropdown(setMachineSubCategoryOpen, machineSubCategoryOpen)}
                options={
                  machineCategory
                    ? (MACHINE_SUB_CATEGORIES[machineCategory] || []).map((s) => ({ value: s, label: s }))
                    : [{ value: '', label: '설비 구분을 먼저 선택해 주세요.' }]
                }
                onSelect={(v) => setMachineSubCategory(v)}
              />
            </View>
            <ValidationMsg message="* 설비 구분을 먼저 선택해 주세요." visible={showValidation && !machineCategory} />
            <ValidationMsg message="* 세부 기종을 선택해 주세요." visible={showValidation && !!machineCategory && !machineSubCategory} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="제조사" required />
            <TextInput style={styles.textInput} value={manufacturer} onChangeText={setManufacturer} placeholder="제조사 입력" placeholderTextColor={colors.G400} />
            <ValidationMsg message="*제조사를 입력해 주세요." visible={showValidation && !manufacturer} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="모델명" required />
            <TextInput style={styles.textInput} value={modelName} onChangeText={setModelName} placeholder="모델명 입력" placeholderTextColor={colors.G400} />
            <ValidationMsg message="*모델명을 입력해 주세요." visible={showValidation && !modelName} />
          </View>

          <View style={[styles.formItem, { zIndex: 40 }]}>
            <View style={styles.formHead}>
              <FormLabel text="제조 연월" required />
              <Checkbox checked={mfgUnknown} onPress={() => setMfgUnknown(!mfgUnknown)} label="미상" />
            </View>
            {!mfgUnknown && (
              <View style={styles.dateRow}>
                <View style={[styles.flex1, { zIndex: 2 }]}>
                  <SelectDropdown placeholder="연" value={mfgYear} isOpen={mfgYearOpen} onToggle={() => toggleDropdown(setMfgYearOpen, mfgYearOpen)} options={YEARS} onSelect={(v) => setMfgYear(v)} />
                </View>
                <View style={[styles.flex1, { zIndex: 1 }]}>
                  <SelectDropdown placeholder="월" value={mfgMonth} isOpen={mfgMonthOpen} onToggle={() => toggleDropdown(setMfgMonthOpen, mfgMonthOpen)} options={MONTHS} onSelect={(v) => setMfgMonth(v)} />
                </View>
              </View>
            )}
            <ValidationMsg message="*제조연월을 선택해 주세요." visible={showValidation && !mfgUnknown && (!mfgYear || !mfgMonth)} />
          </View>

          <View style={[styles.formItem, { zIndex: 30 }]}>
            <View style={styles.formHead}>
              <FormLabel text="보증 기간" required />
              <Checkbox checked={warrantyExpired} onPress={() => setWarrantyExpired(!warrantyExpired)} label="만료" />
            </View>
            {!warrantyExpired && (
              <View style={styles.dateRow}>
                <View style={[styles.flex1, { zIndex: 2 }]}>
                  <SelectDropdown placeholder="연" value={warrantyYear} isOpen={warrantyYearOpen} onToggle={() => toggleDropdown(setWarrantyYearOpen, warrantyYearOpen)} options={YEARS} onSelect={(v) => setWarrantyYear(v)} />
                </View>
                <View style={[styles.flex1, { zIndex: 1 }]}>
                  <SelectDropdown placeholder="월" value={warrantyMonth} isOpen={warrantyMonthOpen} onToggle={() => toggleDropdown(setWarrantyMonthOpen, warrantyMonthOpen)} options={MONTHS} onSelect={(v) => setWarrantyMonth(v)} />
                </View>
              </View>
            )}
            <ValidationMsg message="*보증기간을 선택해 주세요." visible={showValidation && !warrantyExpired && (!warrantyYear || !warrantyMonth)} />
          </View>

          <View style={[styles.formItem, { zIndex: 20 }]}>
            <FormLabel text="제품 위치" required />
            <View style={styles.locationSelects}>
              <View style={{ zIndex: 2 }}>
                <SelectDropdown placeholder="시/도" value={city} isOpen={cityOpen} onToggle={() => toggleDropdown(setCityOpen, cityOpen)} options={CITIES} onSelect={(v) => { setCity(v); setCounty(''); }} />
              </View>
              <View style={{ zIndex: 1 }}>
                <SelectDropdown placeholder="구/군" value={county} isOpen={countyOpen} onToggle={() => toggleDropdown(setCountyOpen, countyOpen)} options={[{ value: '', label: '구/군 선택' }]} onSelect={(v) => setCounty(v)} />
              </View>
            </View>
            <ValidationMsg message="*제품위치를 선택해 주세요." visible={showValidation && !city} />
          </View>

          {/* ═══ 상세 소개 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="상세 소개" />

          <View style={styles.formItem}>
            <FormLabel text={`상품 이미지 등록 (${uploadedImages.length}/1)`} required />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>등록한 이미지가 대표 이미지로 설정됩니다.</Text>
              <Text style={styles.blueBoxText}>• 권장 사이즈: 1470 × 827px</Text>
              <Text style={styles.blueBoxText}>• 지원 형식: PNG, JPG</Text>
            </View>
            <ImageUploadGrid
              images={uploadedImages}
              maxCount={1}
              onRemove={(idx) => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
              onAdd={handleImagePick}
            />
            <ValidationMsg message="*상품 이미지를 선택해 주세요." visible={showValidation && uploadedImages.length === 0} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="상세 설명" required />
              <Text style={styles.textCount}>({description.length}/60글자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={(t) => setDescription(t.slice(0, 60))}
              placeholder="상품 상세 설명을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={60}
            />
            <ValidationMsg message="* 상품 상세 설명을 입력해 주세요." visible={showValidation && !description} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelRow}>
              <Text style={styles.formLabelText}>제공 서비스 선택</Text>
            </View>
            <View style={styles.serviceGrid}>
              {SERVICE_OPTIONS.map((svc) => (
                <ServiceTag key={svc.key} checked={!!services[svc.key]} onPress={() => toggleService(svc.key)} label={svc.label} />
              ))}
            </View>
          </View>

          {/* ═══ 가격 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="가격" />

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="상품 금액" required />
              <Checkbox checked={priceNegotiable} onPress={() => setPriceNegotiable(!priceNegotiable)} label="가격 협의 가능" />
            </View>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={(t) => setPrice(formatPrice(t))}
              placeholder="상품 금액을 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
            />
            <ValidationMsg message="*상품금액을 입력해 주세요." visible={showValidation && !price && !priceNegotiable} />
          </View>

          {/* ═══ 판매자 정보 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="판매자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="담당자명" required />
            <TextInput style={styles.textInput} value={contactName} onChangeText={setContactName} placeholder="담당자명을 입력해 주세요." placeholderTextColor={colors.G400} />
            <ValidationMsg message="* 담당자명을 입력해 주세요." visible={showValidation && !contactName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="상호명" required />
            <TextInput style={styles.textInput} value={companyName} onChangeText={setCompanyName} placeholder="상호명을 입력해 주세요." placeholderTextColor={colors.G400} />
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

          {/* ═══ 약관 동의 ═══ */}
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
          { label: '취소', variant: 'gray', onPress: () => {} },
          { label: isEditMode ? '수정하기' : '등록하기', onPress: handleSubmit },
        ]}
      />

      <ConfirmModal
        visible={registerVisible}
        title="등록하기"
        message="등록하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="확인"
        onClose={() => setRegisterVisible(false)}
        onConfirm={() => {
          setRegisterVisible(false);
          setToastVisible(true);
        }}
      />

      <CompareToast
        visible={toastVisible}
        message="견적 답변이 등록되었습니다."
        onClose={() => setToastVisible(false)}
      />
    </View>
  );
};

