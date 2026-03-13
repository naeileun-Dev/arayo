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
  Dimensions,
} from 'react-native';
import { colors } from '../../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MACHINE_CATEGORIES = [
  { value: 'machine_tools', label: '공작기계' },
  { value: 'mold_injection', label: '금형/사출기' },
  { value: 'sheet_metal_welding', label: '판금/용접' },
  { value: 'woodworking_machines', label: '목공기계' },
  { value: 'material_handling_heavy', label: '운반/중장비' },
  { value: 'industrial_robots', label: '산업용 로봇' },
  { value: 'food_packaging', label: '식품/포장 기계' },
  { value: 'cutting_grinding', label: '절삭/연마/연삭' },
  { value: 'tools_parts', label: '공구/부품' },
  { value: 'consumables', label: '소모품' },
  { value: 'other_equipment', label: '기타 설비' },
];

const MACHINE_SUB_CATEGORIES: Record<string, string[]> = {
  machine_tools: ['CNC 선반', 'CNC복합기', 'MCT(머시닝센터)', '범용 밀링', '범용 선반', '보링기', '기타'],
  mold_injection: ['플라스틱 사출', '성형기', '플라스틱 가공기', '고무 성형기', '고무 가공기', '와이어 커팅기', '방전가공기', '기타'],
  sheet_metal_welding: ['프레스', '절곡기', '샤링기', '펀칭기', '레이저 절단기', '플라스마 절단기', '용접기(파이버, Co2, 인버터, 스포트, 토치)', '드릴기', '기타(워터젯/산소 절단기/가스 절단기)'],
  woodworking_machines: ['보링기', 'CNC러닝쏘(재단기)', '엣지밴딩기', '스키퍼', '루타기', '파쇄기/분쇄기/톱밥제조기', '네스팅머신', '기타'],
  material_handling_heavy: ['지게차(디젤, 전동)', '전동 스태커', '고소 작업대', '컨베이어', '크레인/호이스트', '에어발란스/암 크레인', '건설중장비', '기타'],
  industrial_robots: ['협동 로봇', '산업용 로봇', '용접 로봇', '서비스용 로봇', '이적재용 로봇', '기타'],
  food_packaging: ['랩핑기', '마킹기', '여과기', '포장기', '충진기', '식품성형기', '식품절단기', '혼합기', '세척기', '기타'],
  cutting_grinding: ['밴드쏘', '원형톱기계', '톱날', '파이프절단기', '연마기/연삭기', '기타'],
  tools_parts: ['전동공구', '카타기', '그라인더', '드라이버', '측정기·계측장비', '볼트/너트/베어링/체인', '호스', '기타'],
  consumables: ['절삭유', '용접포', '유압작동유', '기어오일', '가공유', '세척유', '인발유', '기타'],
  other_equipment: ['쇼트기', '철근/코일 가공기', '프린트/3D프린트', '집진기', '작업대 · 공구함', '기타'],
};

const CITIES = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
  { value: 'gangwon', label: '강원특별자치도' },
  { value: 'chungbuk', label: '충청북도' },
  { value: 'chungnam', label: '충청남도' },
  { value: 'jeonbuk', label: '전라북도' },
  { value: 'jeonnam', label: '전라남도' },
  { value: 'gyeongbuk', label: '경상북도' },
  { value: 'gyeongnam', label: '경상남도' },
  { value: 'jeju', label: '제주특별자치도' },
];

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.sectionLabel}>
    <Text style={styles.sectionLabelText}>{label}</Text>
  </View>
);

const FormLabel: React.FC<{ text: string; required?: boolean }> = ({ text, required = false }) => (
  <View style={styles.formLabelRow}>
    <Text style={styles.formLabelText}>{text}</Text>
    {required && <Text style={styles.requiredMark}>{' *'}</Text>}
  </View>
);

const ValidationMsg: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => {
  if (!visible) return null;
  return <Text style={styles.validationText}>{message}</Text>;
};

const SelectDropdown: React.FC<{
  placeholder: string;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}> = ({ placeholder, value, isOpen, onToggle, options, onSelect }) => {
  const displayLabel = options.find((o) => o.value === value)?.label || placeholder;
  const isPlaceholderShown = !value;
  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={onToggle} activeOpacity={0.7}>
        <Text style={[styles.selectButtonText, isPlaceholderShown && styles.selectPlaceholder]}>
          {displayLabel}
        </Text>
        <View style={[styles.selectCaretWrap, isOpen && styles.selectCaretOpen]}>
          <Text style={styles.selectCaret}>{'›'}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.dropdownList} nestedScrollEnabled bounces={false}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value || option.label}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(option.value);
                onToggle();
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.dropdownItemText, value === option.value && styles.dropdownItemSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const Checkbox: React.FC<{
  checked: boolean;
  onPress: () => void;
  label: string;
  labelStyle?: object;
  subLabel?: string;
  subLabelColor?: string;
}> = ({ checked, onPress, label, labelStyle, subLabel, subLabelColor }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
      {checked && <Text style={styles.checkboxCheck}>{'✓'}</Text>}
    </View>
    <Text style={[styles.checkboxLabel, labelStyle]}>{label}</Text>
    {subLabel && (
      <Text style={[styles.checkboxSub, subLabelColor ? { color: subLabelColor } : {}]}>{subLabel}</Text>
    )}
  </TouchableOpacity>
);

const CheckboxButton: React.FC<{
  checked: boolean;
  onPress: () => void;
  label: string;
}> = ({ checked, onPress, label }) => (
  <TouchableOpacity
    style={[styles.checkboxBtn, checked && styles.checkboxBtnChecked]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.checkboxBtnLabel, checked && styles.checkboxBtnLabelChecked]}>{label}</Text>
  </TouchableOpacity>
);

const RadioCheck: React.FC<{
  selected: boolean;
  onPress: () => void;
  label: string;
}> = ({ selected, onPress, label }) => (
  <TouchableOpacity style={styles.radioCheckRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.radioCheckCircle, selected && styles.radioCheckCircleSelected]}>
      {selected && <Text style={styles.radioCheckMark}>{'✓'}</Text>}
    </View>
    <Text style={styles.radioCheckLabel}>{label}</Text>
  </TouchableOpacity>
);

const EstimateFormScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [productName, setProductName] = useState('');
  const [productTypeUsed, setProductTypeUsed] = useState(true);
  const [productTypeNew, setProductTypeNew] = useState(false);
  const [machineCategory, setMachineCategory] = useState('');
  const [machineCategoryOpen, setMachineCategoryOpen] = useState(false);
  const [machineSubCategory, setMachineSubCategory] = useState('');
  const [machineSubCategoryOpen, setMachineSubCategoryOpen] = useState(false);
  const [city, setCity] = useState('');
  const [cityOpen, setCityOpen] = useState(false);
  const [county, setCounty] = useState('');
  const [countyOpen, setCountyOpen] = useState(false);
  const [suggestPrice, setSuggestPrice] = useState(false);
  const [price, setPrice] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [contactRange, setContactRange] = useState<number | null>(null);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [uploadedImages] = useState<string[]>([]);

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

  const handleIndividualAgree = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    current: boolean,
    other: boolean,
  ) => {
    const next = !current;
    setter(next);
    setAgreeAll(next && other);
  };

  const handleSubmit = () => {
    setShowValidation(true);
  };

  const formatPrice = (text: string) => {
    const num = text.replace(/[^0-9]/g, '');
    if (num === '') return '';
    return Number(num).toLocaleString();
  };

  const formatPhone = (text: string) => {
    const num = text.replace(/[^0-9]/g, '');
    if (num.length <= 3) return num;
    if (num.length <= 7) return `${num.slice(0, 3)}-${num.slice(3)}`;
    return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} activeOpacity={0.7}>
          <View style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>견적 문의 등록</Text>
        <View style={styles.headerBackBtn} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
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
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={(t) => setTitle(t.slice(0, 50))}
              placeholder="견적 문의 제목을 입력해 주세요."
              placeholderTextColor={colors.G400}
              maxLength={50}
            />
            <ValidationMsg message="* 제목을 정확하게 입력해 주세요." visible={showValidation && !title} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="제품명" required />
              <Text style={styles.textCount}>({productName.length}/50자)</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={productName}
              onChangeText={(t) => setProductName(t.slice(0, 50))}
              placeholder="최대 50자 이내로 입력해 주세요."
              placeholderTextColor={colors.G400}
              maxLength={50}
            />
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

          <View style={[styles.formItem,{ zIndex: 40 }]}>
            <FormLabel text="설비 구분" required />
            <SelectDropdown
              placeholder="선택"
              value={machineCategory}
              isOpen={machineCategoryOpen}
              onToggle={() => {
                const next = !machineCategoryOpen;
                closeAllDropdowns();
                setMachineCategoryOpen(next);
              }}
              options={MACHINE_CATEGORIES}
              onSelect={(v) => {
                setMachineCategory(v);
                setMachineSubCategory('');
              }}
            />
            <ValidationMsg message="*설비 구분을 선택해 주세요." visible={showValidation && !machineCategory} />
          </View>

          <View style={[styles.formItem,{ zIndex: 30 }]}>
            <FormLabel text="세부 기종" required />
            <SelectDropdown
              placeholder="선택"
              value={machineSubCategory}
              isOpen={machineSubCategoryOpen}
              onToggle={() => {
                const next = !machineSubCategoryOpen;
                closeAllDropdowns();
                setMachineSubCategoryOpen(next);
              }}
              options={
                machineCategory
                  ? (MACHINE_SUB_CATEGORIES[machineCategory] || []).map((s) => ({ value: s, label: s }))
                  : [{ value: '', label: '설비 구분을 먼저 선택해 주세요.' }]
              }
              onSelect={(v) => setMachineSubCategory(v)}
            />
            <ValidationMsg
              message="*설비 구분을 먼저 선택해 주세요. / 세부 기종을 선택해 주세요."
              visible={showValidation && !machineSubCategory}
            />
          </View>

          <View style={[styles.formItem,{ zIndex: 20 }]}>
            <FormLabel text="제품 위치" required />
            <View style={styles.locationSelects}>
              <View style={{ zIndex: 2 }}>
                <SelectDropdown
                  placeholder="시/도"
                  value={city}
                  isOpen={cityOpen}
                  onToggle={() => {
                    const next = !cityOpen;
                    closeAllDropdowns();
                    setCityOpen(next);
                  }}
                  options={CITIES}
                  onSelect={(v) => {
                    setCity(v);
                    setCounty('');
                  }}
                />
              </View>
              <View style={{ zIndex: 1 }}>
                <SelectDropdown
                  placeholder="구/군"
                  value={county}
                  isOpen={countyOpen}
                  onToggle={() => {
                    const next = !countyOpen;
                    closeAllDropdowns();
                    setCountyOpen(next);
                  }}
                  options={[{ value: '', label: '구/군 선택' }]}
                  onSelect={(v) => setCounty(v)}
                />
              </View>
            </View>
            <ValidationMsg message="*제품위치를 선택해 주세요." visible={showValidation && !city} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="희망 가격" required />
              <Checkbox checked={suggestPrice} onPress={() => setSuggestPrice(!suggestPrice)} label="제안 받기" />
            </View>
            <TextInput
              style={styles.textInput}
              value={price}
              onChangeText={(t) => setPrice(formatPrice(t))}
              placeholder="희망 가격을 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
            />
            <ValidationMsg message="* 희망 가격을 입력해 주세요." visible={showValidation && !price && !suggestPrice} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="내용 작성 및 파일 업로드" />

          <View style={styles.formItem}>
            <FormLabel text={`상품 이미지 등록 (${uploadedImages.length}/10)`} required />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>• 문의 내용에 도움이 될 이미지를 첨부해 주세요.</Text>
              <Text style={styles.blueBoxText}>• 지원 형식: PNG, JPG</Text>
            </View>
            <View style={styles.imageUploadRow}>
              <TouchableOpacity style={styles.imageUploader} activeOpacity={0.7}>
                <View style={styles.imageUploaderPlaceholder} />
              </TouchableOpacity>
            </View>
            <ValidationMsg message="*상품 이미지를 선택해 주세요." visible={showValidation && uploadedImages.length === 0} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="문의 내용" required />
              <Text style={styles.textCount}>({inquiryContent.length}/2,000자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={inquiryContent}
              onChangeText={(t) => setInquiryContent(t.slice(0, 2000))}
              placeholder="문의 내용을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
            <ValidationMsg message="* 문의 내용을 입력해 주세요." visible={showValidation && !inquiryContent} />
          </View>

          <View style={styles.sectionGap} />
          <SectionLabel label="구매자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="이름" required />
            <TextInput
              style={styles.textInput}
              value={buyerName}
              onChangeText={setBuyerName}
              placeholder="이름을 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg message="* 이름을 입력해 주세요." visible={showValidation && !buyerName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="휴대폰 번호" required />
            <TextInput
              style={styles.textInput}
              value={buyerPhone}
              onChangeText={(t) => setBuyerPhone(formatPhone(t))}
              placeholder="휴대폰 번호를 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="phone-pad"
              maxLength={13}
            />
            <ValidationMsg message="* 휴대폰 번호를 입력해 주세요." visible={showValidation && !buyerPhone} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="연락 허용 범위" required />
            <View style={styles.radioGroup}>
              <RadioCheck
                selected={contactRange === 0}
                onPress={() => setContactRange(0)}
                label="견적답변을 등록한 모든 판매자에게 연락 수신"
              />
              <RadioCheck
                selected={contactRange === 1}
                onPress={() => setContactRange(1)}
                label="받은견적에서 내가 선택한 판매자에게만 연락 수신"
              />
            </View>
            <ValidationMsg message="* 연락 허용 범위를 선택해 주세요." visible={showValidation && contactRange === null} />
          </View>

          <View style={styles.sectionGap} />
          <View>
            <Checkbox checked={agreeAll} onPress={handleAgreeAll} label="전체 약관 동의" />
            <View style={styles.agreeDivider} />

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreePrivacy}
                onPress={() => handleIndividualAgree(setAgreePrivacy, agreePrivacy, agreeThirdParty)}
                label="개인정보 수집 및 이용 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.agreeRow, { marginTop: 12 }]}>
              <Checkbox
                checked={agreeThirdParty}
                onPress={() => handleIndividualAgree(setAgreeThirdParty, agreeThirdParty, agreePrivacy)}
                label="개인정보 제 3자 제공 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            <ValidationMsg
              message="*필수 항목에 모두 동의해 주세요."
              visible={showValidation && (!agreePrivacy || !agreeThirdParty)}
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomFixed}>
        <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.7}>
          <Text style={styles.cancelBtnText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.7}>
          <Text style={styles.submitBtnText}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackIcon: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.black,
    transform: [{ rotate: '45deg' }],
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 40,
  },
  sectionLabel: {
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    paddingBottom: 15,
    marginBottom: 20,
  },
  sectionLabelText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
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
  requiredMark: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
  },
  formLabelWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  textCount: {
    fontSize: 13,
    color: colors.G400,
  },
  formHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  formHeadSub: {
    fontSize: 12,
    color: colors.G400,
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
  validationText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 5,
  },
  productTypeRow: {
    flexDirection: 'row',
    gap: 5,
  },
  checkboxBtn: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxBtnChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxBtnLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G600,
  },
  checkboxBtnLabelChecked: {
    color: colors.white,
  },
  selectContainer: {
    position: 'relative',
    zIndex: 10,
  },
  selectButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  selectPlaceholder: {
    color: colors.G400,
  },
  selectCaretWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
  selectCaretOpen: {
    transform: [{ rotate: '-90deg' }],
  },
  selectCaret: {
    fontSize: 16,
    color: colors.G500,
    fontWeight: '300',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: colors.white,
    maxHeight: 250,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.G100,
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.black,
  },
  dropdownItemSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  locationSelects: {
    gap: 10,
  },
  blueBox: {
    backgroundColor: colors.infoBoxBg,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 5,
  },
  blueBoxText: {
    fontSize: 13,
    color: colors.G700,
    lineHeight: 20,
  },
  imageUploadRow: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 8,
  },
  imageUploader: {
    width: (SCREEN_WIDTH - 32 - 16) / 3,
    aspectRatio: 1,
    backgroundColor: colors.G100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploaderPlaceholder: {
    width: 28,
    height: 28,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.G400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  checkboxCheck: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
    marginTop: -1,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.black,
  },
  checkboxSub: {
    fontSize: 14,
    color: colors.error,
  },
  radioGroup: {
    gap: 10,
  },
  radioCheckRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  radioCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.G400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: 1,
  },
  radioCheckCircleSelected: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  radioCheckMark: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '600',
  },
  radioCheckLabel: {
    fontSize: 14,
    color: colors.G600,
    flex: 1,
    lineHeight: 22,
  },
  agreeDivider: {
    height: 1,
    backgroundColor: colors.G200,
    marginTop: 12,
    marginBottom: 12,
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  agreeLabelGray: {
    color: colors.G600,
    fontSize: 14,
  },
  agreeViewBtn: {
    fontSize: 14,
    color: colors.G600,
    textDecorationLine: 'underline',
  },
  bottomSpacer: {
    height: 50,
  },
  bottomFixed: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        paddingBottom: 34,
      },
      android: {
        paddingBottom: 12,
      },
    }),
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    backgroundColor: colors.G100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
  },
  submitBtn: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
  },
});

export default EstimateFormScreen;
