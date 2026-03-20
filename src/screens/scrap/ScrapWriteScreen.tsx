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
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../styles/colors';
import EyeIcon from '../../assets/icon/eye.svg';
import EyeClosedIcon from '../../assets/icon/eye-closed.svg';
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
  ImageUploadGrid,
  AgreementSection,
  formatPhone,
  styles,
} from '../estimate/components/FormComponents';

// ── 상수 ──
const PROCESS_TYPES = [
  { value: '고철 수거', label: '고철 수거' },
  { value: '고철 매입', label: '고철 매입' },
  { value: '고철 처리', label: '고철 처리' },
  { value: '기타', label: '기타' },
];

const SCRAP_AMOUNTS = [
  { value: '1톤 미만', label: '1톤 미만' },
  { value: '1톤 ~ 5톤', label: '1톤 ~ 5톤' },
  { value: '5톤 ~ 10톤', label: '5톤 ~ 10톤' },
  { value: '10톤 이상', label: '10톤 이상' },
];

const ELEVATOR_OPTIONS = ['있음', '없음'];
const VEHICLE_OPTIONS = ['1톤 트럭 가능', '5톤 트럭 이상 가능', '진입 불가', '기타'];
const WORKSPACE_OPTIONS = ['실내', '실외', '지하', '옥상', '기타'];

const EDIT_SAMPLE = {
  title: '고철 수거 요청합니다',
  processType: '고철 수거',
  scrapAmount: '1톤 ~ 5톤',
  inquiryContent: '공장 이전으로 고철 수거 요청드립니다.',
  managerName: '김샘플',
  phone: '010-1234-5678',
};

export const ScrapWriteScreen: React.FC<{ route?: { params?: { mode?: 'edit' } } }> = ({ route }) => {
  const navigation = useNavigation();
  const isEditMode = route?.params?.mode === 'edit';
  const [guideVisible, setGuideVisible] = useState(!isEditMode);

  // ── 기본 정보 ──
  const [title, setTitle] = useState(isEditMode ? EDIT_SAMPLE.title : '');
  const [desiredDate, setDesiredDate] = useState('');
  const [dateUnknown, setDateUnknown] = useState(false);
  const [processType, setProcessType] = useState(isEditMode ? EDIT_SAMPLE.processType : '');
  const [processTypeOpen, setProcessTypeOpen] = useState(false);
  const [scrapAmount, setScrapAmount] = useState(isEditMode ? EDIT_SAMPLE.scrapAmount : '');
  const [scrapAmountOpen, setScrapAmountOpen] = useState(false);
  const [zipCode] = useState('');
  const [address] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  // ── 상세 소개 ──
  const [hasElevator, setHasElevator] = useState('');
  const [vehicleAccess, setVehicleAccess] = useState('');
  const [workSpace, setWorkSpace] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [inquiryContent, setInquiryContent] = useState(isEditMode ? EDIT_SAMPLE.inquiryContent : '');

  // ── 작성자 정보 ──
  const [managerName, setManagerName] = useState(isEditMode ? EDIT_SAMPLE.managerName : '');
  const [phone, setPhone] = useState(isEditMode ? EDIT_SAMPLE.phone : '');
  const [contactRange, setContactRange] = useState<number | null>(isEditMode ? 0 : null);
  const [guestPassword, setGuestPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ── 약관 ──
  const [agreeAll, setAgreeAll] = useState(isEditMode);
  const [agreePrivacy, setAgreePrivacy] = useState(isEditMode);
  const [agreeThirdParty, setAgreeThirdParty] = useState(isEditMode);
  const [showValidation, setShowValidation] = useState(false);

  const closeAllDropdowns = () => {
    setProcessTypeOpen(false);
    setScrapAmountOpen(false);
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
      { mediaType: 'photo', selectionLimit: 5 - uploadedImages.length },
      (response) => {
        if (response.assets) {
          const uris = response.assets.map((a) => a.uri).filter((u): u is string => !!u);
          setUploadedImages((prev) => [...prev, ...uris].slice(0, 5));
        }
      },
    );
  };

  return (
    <View style={styles.root}>
      <Header
        title={isEditMode ? '고철처리 수정' : '고철처리 등록'}
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
              <FormLabel text="제목" required />
              <Text style={styles.textCount}>({title.length}/50자)</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={(t) => setTitle(t.slice(0, 50))}
              placeholder="제목을 입력해 주세요."
              placeholderTextColor={colors.G400}
              maxLength={50}
            />
            <ValidationMsg message="* 제목을 정확하게 입력해 주세요." visible={showValidation && !title} />
          </View>

          <View style={styles.formItem}>
            <View style={styles.formHead}>
              <FormLabel text="희망 처리일" required />
              <Checkbox checked={dateUnknown} onPress={() => setDateUnknown(!dateUnknown)} label="미상" />
            </View>
            {!dateUnknown && (
              <TextInput
                style={styles.textInput}
                value={desiredDate}
                onChangeText={setDesiredDate}
                placeholder="희망 처리 날짜를 선택해 주세요."
                placeholderTextColor={colors.G400}
              />
            )}
          </View>

          <View style={[styles.formItem, { zIndex: 40 }]}>
            <FormLabel text="처리 종류 선택" required />
            <SelectDropdown
              placeholder="처리 종류를 선택해 주세요."
              value={processType}
              isOpen={processTypeOpen}
              onToggle={() => { const next = !processTypeOpen; closeAllDropdowns(); setProcessTypeOpen(next); }}
              options={PROCESS_TYPES}
              onSelect={(v) => setProcessType(v)}
            />
            <ValidationMsg message="* 처리 종류를 선택해 주세요." visible={showValidation && !processType} />
          </View>

          <View style={[styles.formItem, { zIndex: 30 }]}>
            <FormLabel text="고철 양 선택" required />
            <SelectDropdown
              placeholder="고철 양을 선택해 주세요."
              value={scrapAmount}
              isOpen={scrapAmountOpen}
              onToggle={() => { const next = !scrapAmountOpen; closeAllDropdowns(); setScrapAmountOpen(next); }}
              options={SCRAP_AMOUNTS}
              onSelect={(v) => setScrapAmount(v)}
            />
            <ValidationMsg message="* 고철 양을 선택해 주세요." visible={showValidation && !scrapAmount} />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="고철 위치" />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="우편번호"
                placeholderTextColor={colors.G400}
                value={zipCode}
                editable={false}
              />
              <TouchableOpacity
                style={{
                  height: 50, paddingHorizontal: 15, borderRadius: 4,
                  borderWidth: 1, borderColor: colors.G300,
                  alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white,
                }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.black }}>우편번호 검색</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.textInput, { marginTop: 8 }]}
              placeholder="주소"
              placeholderTextColor={colors.G400}
              value={address}
              editable={false}
            />
            <TextInput
              style={[styles.textInput, { marginTop: 8 }]}
              placeholder="상세주소"
              placeholderTextColor={colors.G400}
              value={addressDetail}
              onChangeText={setAddressDetail}
            />
          </View>

          {/* ═══ 상세 소개 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="상세 소개" />

          <View style={styles.formItem}>
            <FormLabel text="엘리베이터 유무" />
            <View style={styles.productTypeRow}>
              {ELEVATOR_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    { flex: 1, height: 50, borderWidth: 1, borderColor: colors.G300, borderRadius: 4, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
                    hasElevator === opt && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}
                  onPress={() => setHasElevator(opt)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    { fontSize: 14, fontWeight: '500', color: colors.G600 },
                    hasElevator === opt && { color: colors.white },
                  ]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formItem}>
            <FormLabel text="차량 진입 가능 여부" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 }}>
              {VEHICLE_OPTIONS.map((opt) => (
                <View key={opt} style={{ width: '50%' }}>
                  <RadioCheck label={opt} selected={vehicleAccess === opt} onPress={() => setVehicleAccess(opt)} />
                </View>
              ))}
            </View>
          </View>

          <View style={styles.formItem}>
            <FormLabel text="작업 공간 상황" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 }}>
              {WORKSPACE_OPTIONS.map((opt) => (
                <View key={opt} style={{ width: '50%' }}>
                  <RadioCheck label={opt} selected={workSpace === opt} onPress={() => setWorkSpace(opt)} />
                </View>
              ))}
            </View>
          </View>

          {/* ═══ 내용 작성 및 파일 업로드 ═══ */}
          <View style={styles.sectionGap} />
          <SectionLabel label="내용 작성 및 파일 업로드" />

          <View style={styles.formItem}>
            <FormLabel text={`첨부 이미지 등록 (${uploadedImages.length}/5)`} required />
            <View style={styles.blueBox}>
              <Text style={styles.blueBoxText}>• 문의 내용에 도움이 될 이미지를 첨부해 주세요.</Text>
              <Text style={styles.blueBoxText}>• 지원 형식: PNG, JPG</Text>
            </View>
            <ImageUploadGrid
              images={uploadedImages}
              maxCount={5}
              onRemove={(idx: number) => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
              onAdd={handleImagePick}
            />
            <ValidationMsg message="* 이미지를 선택해 주세요." visible={showValidation && uploadedImages.length === 0} />
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
              value={phone}
              onChangeText={(t) => setPhone(formatPhone(t))}
              placeholder="휴대폰 번호를 입력해 주세요."
              placeholderTextColor={colors.G400}
              keyboardType="phone-pad"
              maxLength={13}
            />
            <ValidationMsg message="* 휴대폰 번호를 입력해 주세요." visible={showValidation && !phone} />
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

      <ProcessGuideModal
        visible={guideVisible}
        title="고철 처리 견적 문의"
        processTitle="고철 처리 프로세스"
        steps={[
          { number: 1, label: '의뢰 등록' },
          { number: 2, label: '검수 후 답변 등록' },
          { number: 3, label: '견적 선택' },
        ]}
        completeLabel="의뢰완료"
        ctaLabel="고철 처리 의뢰 받기"
        onClose={() => setGuideVisible(false)}
        onConfirm={() => setGuideVisible(false)}
      />
    </View>
  );
};

