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
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import EyeIcon from '../../assets/icon/eye.svg';
import EyeClosedIcon from '../../assets/icon/eye-closed.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';
import { Header } from '../../components/common';
import { BottomButtonBar } from '../../components/common';
import { ProcessGuideModal } from '../../components/common/ProcessGuideModal';
import {
  SectionLabel,
  FormLabel,
  ValidationMsg,
  SelectDropdown,
  Checkbox,
  RadioCheck,
  FileItemRow,
  AgreementSection,
  formatPrice,
  formatPhone,
  styles,
} from '../estimate/components/FormComponents';

// ── 상수 ──
const MF_CATEGORIES = [
  { value: 'consProd', label: '완제품/위탁생산' },
  { value: 'developProd', label: '제품개발/부품제조' },
];

const MF_SERVICE_OPTIONS: Record<string, { value: string; label: string }[]> = {
  consProd: [
    { value: '기계/ 장비/ 생산설비/ 시스템', label: '기계/ 장비/ 생산설비/ 시스템' },
    { value: '검사/ 시험/ 진단/ 측정장비', label: '검사/ 시험/ 진단/ 측정장비' },
    { value: '전기장비/부품', label: '전기장비/부품' },
    { value: '로봇/드론', label: '로봇/드론' },
    { value: '가전/ 부품', label: '가전/ 부품' },
    { value: '생활소품/ 사무용품', label: '생활소품/ 사무용품' },
    { value: '식료품/ 음료', label: '식료품/ 음료' },
    { value: '패션/ 뷰티', label: '패션/ 뷰티' },
    { value: '의료/ 건강', label: '의료/ 건강' },
    { value: '스포츠/ 아웃도어', label: '스포츠/ 아웃도어' },
    { value: '교육/ 완구', label: '교육/ 완구' },
    { value: '반려동물', label: '반려동물' },
    { value: '개인/ 취미', label: '개인/ 취미' },
    { value: '인테리어/ 건축/ 공사', label: '인테리어/ 건축/ 공사' },
    { value: '리빙/ 주방', label: '리빙/ 주방' },
    { value: '가구/ 목재', label: '가구/ 목재' },
    { value: '인쇄/ 종이', label: '인쇄/ 종이' },
    { value: '예술/ 전시/ 공연', label: '예술/ 전시/ 공연' },
    { value: '방송/ 통신/ 멀티미디어', label: '방송/ 통신/ 멀티미디어' },
    { value: '농업/ 수산업/ 임업/ 광업', label: '농업/ 수산업/ 임업/ 광업' },
    { value: '자동차/ 운송', label: '자동차/ 운송' },
    { value: '해양/ 선박', label: '해양/ 선박' },
    { value: '항공/ 우주', label: '항공/ 우주' },
    { value: '국방/안전', label: '국방/안전' },
    { value: '반도체/ 전자', label: '반도체/ 전자' },
    { value: '에너지/ 베터리', label: '에너지/ 베터리' },
    { value: '광학/ 신소재', label: '광학/ 신소재' },
    { value: '연구개발', label: '연구개발' },
    { value: '화학/ 정유 / 석탄', label: '화학/ 정유 / 석탄' },
    { value: '철강/ 비철금속', label: '철강/ 비철금속' },
    { value: '고무/ 플라스틱', label: '고무/ 플라스틱' },
    { value: '유리/ 세라믹/광물', label: '유리/ 세라믹/광물' },
    { value: '기타 제조', label: '기타 제조' },
  ],
  developProd: [
    { value: '원스톱 제품개발', label: '원스톱 제품개발' },
    { value: '기구설계', label: '기구설계' },
    { value: '제품 디자인', label: '제품 디자인' },
    { value: '전자회로(PCB)', label: '전자회로(PCB)' },
    { value: 'SW 개발 / IT 서비스', label: 'SW 개발 / IT 서비스' },
    { value: '시험분석/ 시뮬레이션', label: '시험분석/ 시뮬레이션' },
    { value: '3D프린팅', label: '3D프린팅' },
    { value: '절삭(CNC)', label: '절삭(CNC)' },
    { value: '판금', label: '판금' },
    { value: '커팅', label: '커팅' },
    { value: '제관', label: '제관' },
    { value: '프레스', label: '프레스' },
    { value: '금형/사출 성형', label: '금형/사출 성형' },
    { value: '플라스틱 성형', label: '플라스틱 성형' },
    { value: '주조', label: '주조' },
    { value: '단조(forging)', label: '단조(forging)' },
    { value: '압출', label: '압출' },
    { value: '인발(drawing)', label: '인발(drawing)' },
    { value: '압연(rolling)', label: '압연(rolling)' },
    { value: '전조(form rolling)', label: '전조(form rolling)' },
    { value: '특수성형', label: '특수성형' },
    { value: '복합소재 가공', label: '복합소재 가공' },
    { value: '용접', label: '용접' },
    { value: '열처리', label: '열처리' },
    { value: '연마/폴리싱', label: '연마/폴리싱' },
    { value: '조립', label: '조립' },
    { value: '기타 제조', label: '기타 제조' },
  ],
};

const PRODUCT_USAGES = [
  { value: '자동차/운송', label: '자동차/운송' },
  { value: '생산설비/장비 및 부속품', label: '생산설비/장비 및 부속품' },
  { value: '로봇/드론/IOT/스마트기기', label: '로봇/드론/IOT/스마트기기' },
  { value: '의료/건강', label: '의료/건강' },
  { value: '반도체/기판', label: '반도체/기판' },
  { value: '광학/신소재', label: '광학/신소재' },
  { value: '가전', label: '가전' },
  { value: '검사/시험/진단/측정장비', label: '검사/시험/진단/측정장비' },
  { value: '방송/통신/멀티미디어', label: '방송/통신/멀티미디어' },
  { value: '연구개발', label: '연구개발' },
  { value: '항공/우주', label: '항공/우주' },
  { value: '국방/안전', label: '국방/안전' },
  { value: '해양/선박', label: '해양/선박' },
  { value: '농업', label: '농업' },
  { value: '주변기기/부속 부품', label: '주변기기/부속 부품' },
  { value: '주방/식품', label: '주방/식품' },
  { value: '교육/완구', label: '교육/완구' },
  { value: '스포츠/아웃도어', label: '스포츠/아웃도어' },
  { value: '패션/뷰티', label: '패션/뷰티' },
  { value: '인테리어/리빙', label: '인테리어/리빙' },
  { value: '가구', label: '가구' },
  { value: '반려동물', label: '반려동물' },
  { value: '생활소품/사무용품', label: '생활소품/사무용품' },
  { value: '예술/전시', label: '예술/전시' },
  { value: '건축/공사', label: '건축/공사' },
  { value: '개인/취미', label: '개인/취미' },
  { value: 'etc', label: '기타' },
];

interface FileItem {
  id: string;
  name: string;
}

const EDIT_SAMPLE = {
  projectName: '스마트기기 부품 임가공 문의',
  mfCategory: 'consProd',
  mfService: '기계/ 장비/ 생산설비/ 시스템',
  productUsage: '로봇/드론/IOT/스마트기기',
  productUsageCustom: '',
  description: '임가공 문의드립니다 ^^',
  budget: '1,000,000',
  managerName: '홍길동',
  phoneNumber: '010-1234-5678',
};

export const ProcessingWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const navigation = useNavigation();
  const isEditMode = route?.params?.mode === 'edit';
  const [guideVisible, setGuideVisible] = useState(!isEditMode);

  // ── 기본 정보 ──
  const [projectName, setProjectName] = useState(isEditMode ? EDIT_SAMPLE.projectName : '');
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(isEditMode ? new Date(2026, 11, 1) : null);
  const [isDeliveryUnknown, setIsDeliveryUnknown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth() + 1);
  const [pickerDay, setPickerDay] = useState(new Date().getDate());
  const [mfCategory, setMfCategory] = useState(isEditMode ? EDIT_SAMPLE.mfCategory : '');
  const [mfCategoryOpen, setMfCategoryOpen] = useState(false);
  const [mfService, setMfService] = useState(isEditMode ? EDIT_SAMPLE.mfService : '');
  const [mfServiceOpen, setMfServiceOpen] = useState(false);
  const [productUsage, setProductUsage] = useState(isEditMode ? EDIT_SAMPLE.productUsage : '');
  const [productUsageOpen, setProductUsageOpen] = useState(false);
  const [productUsageCustom, setProductUsageCustom] = useState(isEditMode ? EDIT_SAMPLE.productUsageCustom : '');

  // ── 상세 소개 ──
  const [files, setFiles] = useState<FileItem[]>(
    isEditMode ? [{ id: '1', name: '도면.pdf' }, { id: '2', name: '도면.pdf' }] : [],
  );
  const [description, setDescription] = useState(isEditMode ? EDIT_SAMPLE.description : '');

  // ── 가격 ──
  const [budget, setBudget] = useState(isEditMode ? EDIT_SAMPLE.budget : '');
  const [isBudgetPrivate, setIsBudgetPrivate] = useState(isEditMode);

  // ── 작성자 정보 ──
  const [managerName, setManagerName] = useState(isEditMode ? EDIT_SAMPLE.managerName : '');
  const [phoneNumber, setPhoneNumber] = useState(isEditMode ? EDIT_SAMPLE.phoneNumber : '');
  const [contactRange, setContactRange] = useState<number | null>(isEditMode ? 0 : null);
  const [guestPassword, setGuestPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ── 약관 ──
  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);
  const [showValidation, setShowValidation] = useState(false);

  const closeAllDropdowns = () => {
    setMfCategoryOpen(false);
    setMfServiceOpen(false);
    setProductUsageOpen(false);
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

  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';
    const y = date.getFullYear().toString().slice(2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };

  let nextFileId = files.length + 1;
  const handleAddFile = () => {
    // TODO: react-native-document-picker 연동
    setFiles((prev) => [...prev, { id: String(nextFileId++), name: `새파일_${prev.length + 1}.pdf` }]);
  };

  return (
    <View style={styles.root}>
      <Header
        title={isEditMode ? '임가공 의뢰 수정' : '임가공 의뢰'}
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
          {/* ═══ 기본 정보 ═══ */}
          <SectionLabel label="기본 정보" />

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="프로젝트 이름" required />
              <Text style={styles.textCount}>({projectName.length}/50자)</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={projectName}
              onChangeText={(t) => setProjectName(t.slice(0, 50))}
              placeholder="프로젝트 이름을 입력해 주세요."
              placeholderTextColor={colors.G400}
              maxLength={50}
            />
            <ValidationMsg message="* 프로젝트 이름을 입력해 주세요." visible={showValidation && !projectName} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="납기 희망일자" required />
              <Checkbox checked={isDeliveryUnknown} onPress={() => setIsDeliveryUnknown(!isDeliveryUnknown)} label="미상" />
            </View>
            {!isDeliveryUnknown && (
              <TouchableOpacity
                style={localStyles.dateInput}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[localStyles.dateInputText, !deliveryDate && { color: colors.G400 }]}>
                  {deliveryDate ? formatDateDisplay(deliveryDate) : '납기 희망일자를 선택해 주세요.'}
                </Text>
                <CalendarIcon width={20} height={20} color={colors.G500} />
              </TouchableOpacity>
            )}
          </View>

          <View style={[styles.formItem, { zIndex: 40 }]}>
            <FormLabel text="제조 분류 및 서비스 선택" required />
            <View style={{ zIndex: 2 }}>
              <SelectDropdown
                placeholder="제조 분류를 선택해 주세요."
                value={mfCategory}
                isOpen={mfCategoryOpen}
                onToggle={() => { const next = !mfCategoryOpen; closeAllDropdowns(); setMfCategoryOpen(next); }}
                options={MF_CATEGORIES}
                onSelect={(v) => { setMfCategory(v); setMfService(''); }}
              />
            </View>
            <View style={{ zIndex: 1, marginTop: 8 }}>
              <SelectDropdown
                placeholder={mfCategory ? '제조 서비스를 선택해 주세요.' : '제조 분류를 먼저 선택해 주세요.'}
                value={mfService}
                isOpen={mfServiceOpen}
                onToggle={() => { const next = !mfServiceOpen; closeAllDropdowns(); setMfServiceOpen(next); }}
                options={
                  mfCategory
                    ? (MF_SERVICE_OPTIONS[mfCategory] || [])
                    : [{ value: '', label: '제조 분류를 먼저 선택해 주세요.' }]
                }
                onSelect={(v) => setMfService(v)}
              />
            </View>
            <ValidationMsg message="* 제조 분류를 선택해 주세요." visible={showValidation && !mfCategory} />
            <ValidationMsg message="* 제조 서비스를 선택해 주세요." visible={showValidation && !!mfCategory && !mfService} />
          </View>

          <View style={[styles.formItem, { zIndex: 20 }]}>
            <FormLabel text="제품 용도 선택" required />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>
                {'정확한 견적 및 상담을 위해 제품 용도를 '}
                <Text style={{ textDecorationLine: 'underline', fontWeight: '600' }}>1개 선택</Text>
                {'해 주세요.'}
              </Text>
            </View>
            <SelectDropdown
              placeholder="제품 용도를 선택해 주세요."
              value={productUsage}
              isOpen={productUsageOpen}
              onToggle={() => { const next = !productUsageOpen; closeAllDropdowns(); setProductUsageOpen(next); }}
              options={PRODUCT_USAGES}
              onSelect={(v) => setProductUsage(v)}
            />
            {productUsage === 'etc' && (
              <TextInput
                style={[styles.textInput, { marginTop: 8 }]}
                value={productUsageCustom}
                onChangeText={setProductUsageCustom}
                placeholder="직접 입력해 주세요."
                placeholderTextColor={colors.G400}
              />
            )}
            <ValidationMsg message="* 제품 용도를 선택해 주세요." visible={showValidation && !productUsage} />
          </View>

          {/* ═══ 상세 소개 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="상세 소개" />

          <View style={styles.formItem}>
            <FormLabel text="도면 파일 업로드" />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>최대 100MB까지 업로드 가능</Text>
            </View>
            {files.map((file) => (
              <FileItemRow
                key={file.id}
                name={file.name}
                onDelete={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
              />
            ))}
            <TouchableOpacity
              style={localStyles.addFileButton}
              onPress={handleAddFile}
              activeOpacity={0.7}
            >
              <Text style={localStyles.addFileButtonPlus}>+</Text>
              <Text style={localStyles.addFileButtonText}>파일추가</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formItem}>
            <View style={styles.formLabelWithCount}>
              <FormLabel text="상세 설명" required />
              <Text style={styles.textCount}>({description.length}/2,000자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={(t) => setDescription(t.slice(0, 2000))}
              placeholder="현재 진행도, 필요한 세부서비스(설계,제작,조립), 소재(재질), 필요한 설비 등을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
            <ValidationMsg message="* 상세 설명을 입력해 주세요." visible={showValidation && !description} />
          </View>

          {/* ═══ 가격 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="가격" />

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="추정 예산" required />
              <Checkbox checked={isBudgetPrivate} onPress={() => setIsBudgetPrivate(!isBudgetPrivate)} label="추정 예산 비공개" />
            </View>
            <TextInput
              style={styles.textInput}
              value={budget}
              onChangeText={(t) => setBudget(formatPrice(t))}
              placeholder="추정 예산을 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="numeric"
            />
            <ValidationMsg message="* 추정 예산을 입력해 주세요." visible={showValidation && !budget && !isBudgetPrivate} />
          </View>

          {/* ═══ 작성자 정보 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="작성자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="담당자명" required />
            <TextInput
              style={styles.textInput}
              value={managerName}
              onChangeText={setManagerName}
              placeholder="담당자명을 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg message="* 담당자명을 입력해 주세요." visible={showValidation && !managerName} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="휴대폰 번호" required />
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={(t) => setPhoneNumber(formatPhone(t))}
              placeholder="휴대폰 번호를 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="phone-pad"
              maxLength={13}
            />
            <ValidationMsg message="* 휴대폰 번호를 입력해 주세요." visible={showValidation && !phoneNumber} />
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
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {isPasswordVisible ? (
                  <EyeIcon width={20} height={20} color={colors.G500} />
                ) : (
                  <EyeClosedIcon width={20} height={20} color={colors.G500} />
                )}
              </TouchableOpacity>
            </View>
            <ValidationMsg message="* 비밀번호를 입력해 주세요." visible={showValidation && !guestPassword} />
          </View>

          {/* ═══ 약관 동의 ═══ */}
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
          { label: '취소', variant: 'gray', onPress: () => navigation.goBack() },
          { label: isEditMode ? '수정하기' : '등록하기', onPress: handleSubmit },
        ]}
      />

      {/* 날짜 선택 바텀시트 */}
      {showDatePicker && (
        <Modal transparent animationType="slide" onRequestClose={() => setShowDatePicker(false)}>
          <View style={localStyles.pickerOverlay}>
            <View style={localStyles.pickerContainer}>
              <View style={localStyles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={localStyles.pickerCancel}>취소</Text>
                </TouchableOpacity>
                <Text style={localStyles.pickerTitle}>납기 희망일자 선택</Text>
                <TouchableOpacity onPress={() => {
                  setDeliveryDate(new Date(pickerYear, pickerMonth - 1, pickerDay));
                  setShowDatePicker(false);
                }}>
                  <Text style={localStyles.pickerDone}>완료</Text>
                </TouchableOpacity>
              </View>
              <View style={localStyles.pickerBody}>
                <ScrollView style={localStyles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                    <TouchableOpacity
                      key={y}
                      style={[localStyles.pickerItem, pickerYear === y && localStyles.pickerItemActive]}
                      onPress={() => setPickerYear(y)}
                    >
                      <Text style={[localStyles.pickerItemText, pickerYear === y && localStyles.pickerItemTextActive]}>
                        {y}년
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <ScrollView style={localStyles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[localStyles.pickerItem, pickerMonth === m && localStyles.pickerItemActive]}
                      onPress={() => {
                        setPickerMonth(m);
                        const maxDay = getDaysInMonth(pickerYear, m);
                        if (pickerDay > maxDay) setPickerDay(maxDay);
                      }}
                    >
                      <Text style={[localStyles.pickerItemText, pickerMonth === m && localStyles.pickerItemTextActive]}>
                        {m}월
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <ScrollView style={localStyles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: getDaysInMonth(pickerYear, pickerMonth) }, (_, i) => i + 1).map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[localStyles.pickerItem, pickerDay === d && localStyles.pickerItemActive]}
                      onPress={() => setPickerDay(d)}
                    >
                      <Text style={[localStyles.pickerItemText, pickerDay === d && localStyles.pickerItemTextActive]}>
                        {d}일
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <ProcessGuideModal
        visible={guideVisible}
        title="임가공 견적 문의"
        processTitle="견적 문의 프로세스"
        steps={[
          { number: 1, label: '견적 등록' },
          { number: 2, label: '검수 후 답변 등록' },
          { number: 3, label: '견적 선택' },
        ]}
        completeLabel="의뢰완료"
        ctaLabel="임가공 견적 받기"
        onClose={() => setGuideVisible(false)}
        onConfirm={() => setGuideVisible(false)}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  dateInput: {
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
  dateInputText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  addFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 4,
    backgroundColor: colors.primary,
    gap: 4,
    marginTop: 8,
  },
  addFileButtonPlus: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  addFileButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  pickerCancel: {
    fontSize: 15,
    color: colors.G600,
  },
  pickerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  pickerDone: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  pickerBody: {
    flexDirection: 'row',
    height: 260,
  },
  pickerCol: {
    flex: 1,
  },
  pickerItem: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemActive: {
    backgroundColor: colors.G100,
  },
  pickerItemText: {
    fontSize: 15,
    color: colors.G500,
  },
  pickerItemTextActive: {
    color: colors.black,
    fontWeight: '600',
  },
});

