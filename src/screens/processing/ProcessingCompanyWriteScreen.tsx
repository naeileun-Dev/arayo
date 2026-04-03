import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ImageUploadIcon from '../../assets/icon/image_upload.svg';
import ImageDeleteIcon from '../../assets/icon/image_delete.svg';
import GearsIcon from '../../assets/icon/gears.svg';
import { BottomButtonBar, Checkbox } from '../../components/common';

const PD = screenPadding.horizontal;

const bannerPlaceholder = require('../../assets/images/banner01.png');
const IMG = require('../../assets/images/img01.png');

const BRAND_OPTIONS = [
  '화천기계', 'DN솔루션즈', '현대위아', 'SMEC', '하스(Haas)', '마작(Mazak)', 'DMG모리',
];

const CITY_OPTIONS = ['서울특별시', '경기도', '인천광역시', '부산광역시', '대구광역시', '대전광역시'];
const DISTRICT_OPTIONS = ['마포구', '강남구', '서초구', '용산구', '영등포구', '성동구'];

interface ImageSlot {
  id: string;
  uri: string | null;
}

interface EquipmentDetail {
  quantity: string;
  productName: string;
  content: string;
}

interface CertDetail {
  name: string;
  issuer: string;
}

const createEmptySlots = (count: number): ImageSlot[] =>
  Array.from({ length: count }, (_, i) => ({ id: String(i + 1), uri: null }));

const createEditEquipmentSlots = (): ImageSlot[] => [
  { id: '1', uri: 'filled' },
  { id: '2', uri: 'filled' },
  { id: '3', uri: null },
  { id: '4', uri: null },
  { id: '5', uri: null },
];

const EDIT_EQUIPMENT_DETAILS: EquipmentDetail[] = [
  { quantity: '1', productName: '머시닝 센터', content: '고정밀 5축 머시닝 센터' },
  { quantity: '2', productName: 'CNC 선반', content: '대형 CNC 선반 장비' },
  { quantity: '', productName: '', content: '' },
  { quantity: '', productName: '', content: '' },
  { quantity: '', productName: '', content: '' },
];

export const ProcessingCompanyWriteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<any>>();
  const mode = route.params?.mode || 'create';
  const isEdit = mode === 'edit';

  // State
  const [bannerImage, setBannerImage] = useState<string | null>(isEdit ? 'existing' : null);
  const [logoImage, setLogoImage] = useState<string | null>(isEdit ? 'existing' : null);
  const [selectedCity, setSelectedCity] = useState(isEdit ? '서울특별시' : '');
  const [selectedDistrict, setSelectedDistrict] = useState(isEdit ? '마포구' : '');
  const [introText, setIntroText] = useState(
    isEdit ? '산업 현장에서 필요한 기계를 합리적으로 연결합니다.' : '',
  );
  const [selectedBrand, setSelectedBrand] = useState(isEdit ? '화천기계' : '');
  const [descriptionText, setDescriptionText] = useState(
    isEdit
      ? '아라요 기계장터는 다양한 산업기계의 임가공 서비스를 제공하는 전문 업체입니다. 정밀 가공부터 대형 구조물 가공까지 폭넓은 경험과 최신 장비를 보유하고 있습니다.\n\n고객의 요구에 맞춤형 솔루션을 제공하며, 품질과 납기를 최우선으로 합니다. ISO 인증을 획득하여 체계적인 품질 관리 시스템을 운영하고 있으며, 지속적인 기술 혁신을 통해 최고의 가공 서비스를 제공합니다.'
      : '',
  );

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const [processingImages, setProcessingImages] = useState<ImageSlot[]>(createEmptySlots(1));
  const [equipmentImages, setEquipmentImages] = useState<ImageSlot[]>(
    isEdit ? createEditEquipmentSlots() : createEmptySlots(1),
  );
  const [certImages, setCertImages] = useState<ImageSlot[]>(createEmptySlots(1));
  const [patentImages, setPatentImages] = useState<ImageSlot[]>(createEmptySlots(1));

  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetail[]>(
    isEdit
      ? EDIT_EQUIPMENT_DETAILS
      : [{ quantity: '', productName: '', content: '' }],
  );
  const [certDetails, setCertDetails] = useState<CertDetail[]>(
    Array(5).fill(null).map(() => ({ name: '', issuer: '' })),
  );
  const [patentDetails, setPatentDetails] = useState<CertDetail[]>(
    Array(5).fill(null).map(() => ({ name: '', issuer: '' })),
  );

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const getFilledCount = (slots: ImageSlot[]) => slots.filter((s) => s.uri !== null).length;

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreePrivacy(checked);
    setAgreeThirdParty(checked);
  };

  const handleSubAgreeChange = (type: 'privacy' | 'thirdParty', checked: boolean) => {
    if (type === 'privacy') {
      setAgreePrivacy(checked);
      setAgreeAll(checked && agreeThirdParty);
    } else {
      setAgreeThirdParty(checked);
      setAgreeAll(agreePrivacy && checked);
    }
  };

  const closeAllDropdowns = () => {
    setShowCityDropdown(false);
    setShowDistrictDropdown(false);
    setShowBrandDropdown(false);
  };

  const handleSubmit = () => {
    setShowValidation(true);
  };

  const renderDropdown = (
    value: string,
    placeholder: string,
    options: string[],
    isOpen: boolean,
    setOpen: (v: boolean) => void,
    onSelect: (v: string) => void,
  ) => (
    <View style={st.dropdownWrap}>
      <TouchableOpacity
        style={st.selectBox}
        activeOpacity={0.7}
        onPress={() => {
          closeAllDropdowns();
          setOpen(!isOpen);
        }}
      >
        <Text style={[st.selectText, !value && st.selectPlaceholder]}>
          {value || placeholder}
        </Text>
        <ChevronDownIcon width={16} height={16} color={colors.G500} />
      </TouchableOpacity>
      {isOpen && (
        <View style={st.dropdownList}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={st.dropdownItem}
                activeOpacity={0.6}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
              >
                <Text style={[st.dropdownItemText, opt === value && st.dropdownItemActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const addSlot = (
    setter: React.Dispatch<React.SetStateAction<ImageSlot[]>>,
    slotId: string,
    max: number,
    detailSetter?: React.Dispatch<React.SetStateAction<EquipmentDetail[]>>,
  ) => {
    setter((prev) => {
      const updated = prev.map((s) => (s.id === slotId ? { ...s, uri: 'filled' } : s));
      if (updated.length < max) {
        updated.push({ id: `slot-${Date.now()}`, uri: null });
      }
      return updated;
    });
    if (detailSetter) {
      detailSetter((prev) => {
        if (prev.length < max) {
          return [...prev, { quantity: '', productName: '', content: '' }];
        }
        return prev;
      });
    }
  };

  const renderImageSlot = (
    slot: ImageSlot,
    onDelete?: () => void,
    fullWidth?: boolean,
    onAdd?: () => void,
  ) => {
    const sizeStyle = fullWidth ? { width: '100%' as const, aspectRatio: 1, height: undefined as any } : {};
    if (slot.uri) {
      return (
        <View style={[st.imageSlotContainer, sizeStyle]}>
          <Image source={IMG} style={[st.imageSlot, sizeStyle]} resizeMode="cover" />
          <TouchableOpacity
            style={st.imageDeleteBtn}
            activeOpacity={0.6}
            onPress={onDelete}
          >
            <ImageDeleteIcon width={18} height={18} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={[st.imageSlotContainer, sizeStyle]}>
        <TouchableOpacity style={[st.imageUploadBox, sizeStyle]} activeOpacity={0.7} onPress={onAdd}>
          <ImageUploadIcon width={28} height={28} />
        </TouchableOpacity>
        <View style={st.imageDeleteBtn}>
          <ImageDeleteIcon width={18} height={18} color="#fff" />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={st.safeArea}>
      <KeyboardAvoidingView
        style={st.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={st.header}>
          <TouchableOpacity
            style={st.headerBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
          >
            <ChevronLeftIcon width={24} height={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={st.headerTitle}>{isEdit ? '업체 수정' : '업체 등록'}</Text>
          <View style={st.headerBtn} />
        </View>

        <ScrollView
          style={st.scrollView}
          contentContainerStyle={st.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner Upload */}
          <TouchableOpacity style={st.bannerUploader} activeOpacity={0.7}>
            {isEdit && bannerImage ? (
              <Image source={bannerPlaceholder} style={st.bannerImage} resizeMode="cover" />
            ) : null}
            <View style={[st.bannerOverlay, isEdit && bannerImage && st.bannerOverlayDark]}>
              <View style={st.bannerPlusCircle}>
                <Text style={st.bannerPlusText}>+</Text>
              </View>
              <Text style={[st.bannerLabel, isEdit && bannerImage && { color: colors.white }]}>
                {isEdit ? '배너 이미지 교체' : '배너 이미지 추가'}
              </Text>
              <Text style={[st.bannerSub, isEdit && bannerImage && { color: 'rgba(255,255,255,0.7)' }]}>
                권장 사이즈: 2400 x 600px
              </Text>
            </View>
          </TouchableOpacity>

          {/* Logo Upload — 배너와 겹치게 배치 */}
          <View style={st.logoFloatWrap}>
            {isEdit && logoImage ? (
              <TouchableOpacity style={st.logoEditWrap} activeOpacity={0.7}>
                <View style={st.logoEditCircle}>
                  <GearsIcon width={36} height={36} color={colors.primary} />
                </View>
                <Text style={st.logoEditText}>로고변경</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={st.logoUploadBox} activeOpacity={0.7}>
                <View style={st.logoPlusCircle}>
                  <Text style={st.logoPlusIcon}>+</Text>
                </View>
                <Text style={st.logoUploadLabel}>로고 추가</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={st.bodyContent}>
            {/* Company Name */}
            <View style={st.formItem}>
              <Text style={st.companyName}>
                {isEdit ? '아라요 기계장터' : '기계모아'}
              </Text>
            </View>

            {/* Location */}
            <View style={[st.formItem, { zIndex: 30 }]}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>기업 위치</Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              <View style={st.locationRow}>
                {renderDropdown(
                  selectedCity,
                  '시',
                  CITY_OPTIONS,
                  showCityDropdown,
                  setShowCityDropdown,
                  setSelectedCity,
                )}
                {renderDropdown(
                  selectedDistrict,
                  '구/군',
                  DISTRICT_OPTIONS,
                  showDistrictDropdown,
                  setShowDistrictDropdown,
                  setSelectedDistrict,
                )}
              </View>
            </View>

            {/* Intro */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>회사 한줄 소개</Text>
              </View>
              <TextInput
                style={st.textInput}
                placeholder="회사 한줄 소개를 입력해 주세요."
                placeholderTextColor={colors.G400}
                value={introText}
                onChangeText={setIntroText}
                maxLength={100}
              />
              <Text style={st.hintText}>
                ex) 산업 현장에서 필요한 기계를 합리적으로 연결합니다.
              </Text>
            </View>

            {/* Brand Dropdown */}
            <View style={[st.formItem, { zIndex: 20 }]}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>취급 브랜드</Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              {renderDropdown(
                selectedBrand,
                '취급 브랜드를 선택해 주세요.',
                BRAND_OPTIONS,
                showBrandDropdown,
                setShowBrandDropdown,
                setSelectedBrand,
              )}
              {showValidation && !selectedBrand && (
                <Text style={st.validationText}>*취급 브랜드를 선택해 주세요.</Text>
              )}
            </View>

            {/* Description */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>기업 소개글</Text>
              </View>
              <TextInput
                style={st.textArea}
                placeholder="기업 소개글을 작성해주세요"
                placeholderTextColor={colors.G400}
                value={descriptionText}
                onChangeText={setDescriptionText}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Company Profile Upload */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>회사소개서</Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              {isEdit ? (
                <TouchableOpacity style={st.filePreviewWrap} activeOpacity={0.7}>
                  <Image source={IMG} style={st.filePreviewImg} resizeMode="cover" />
                  <View style={st.fileOverlay}>
                    <Text style={st.fileOverlayText}>회사 소개서 교체</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={st.fileUploadBox} activeOpacity={0.7}>
                  <View style={st.bannerPlusCircle}>
                    <Text style={st.bannerPlusText}>+</Text>
                  </View>
                  <Text style={st.bannerLabel}>회사 소개서 등록</Text>
                  <Text style={st.bannerSub}>지원 형식: PDF, PPT</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Processing Images */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>
                  임가공 이미지 등록 ({getFilledCount(processingImages)}/5)
                </Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              <View style={st.blueInfoBox}>
                <Text style={st.blueInfoText}>• 권장 사이즈: 340 x 340px</Text>
                <Text style={st.blueInfoText}>• 지원 형식: PNG, JPG</Text>
              </View>
              <View style={st.imageGrid}>
                {processingImages.map((slot) => (
                  <View key={slot.id} style={st.imageSlotWrap}>
                    {renderImageSlot(slot, undefined, false, () => addSlot(setProcessingImages, slot.id, 5))}
                  </View>
                ))}
              </View>
            </View>

            {/* Equipment Images with details */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>
                  보유장비 이미지 등록 ({getFilledCount(equipmentImages)}/5)
                </Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              <View style={st.blueInfoBox}>
                <Text style={st.blueInfoText}>• 권장 사이즈: 454 x 548px</Text>
                <Text style={st.blueInfoText}>• 지원 형식: PNG, JPG</Text>
              </View>
              <View style={st.halfGrid}>
                {equipmentImages.map((slot, idx) => (
                  <View key={slot.id} style={st.halfGridItem}>
                    <View style={st.halfImageWrap}>
                      {renderImageSlot(slot, () => {
                        const updated = [...equipmentImages];
                        updated[idx] = { ...updated[idx], uri: null };
                        setEquipmentImages(updated);
                      }, true, () => addSlot(setEquipmentImages, slot.id, 5, setEquipmentDetails))}
                    </View>
                    <TextInput
                      style={st.halfInput}
                      placeholder="수량을 입력해 주세요."
                      placeholderTextColor={colors.G400}
                      value={equipmentDetails[idx]?.quantity}
                      onChangeText={(t) => {
                        const updated = [...equipmentDetails];
                        updated[idx] = { ...updated[idx], quantity: t };
                        setEquipmentDetails(updated);
                      }}
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={st.halfInput}
                      placeholder="제품명을 입력해 주세요."
                      placeholderTextColor={colors.G400}
                      value={equipmentDetails[idx]?.productName}
                      onChangeText={(t) => {
                        const updated = [...equipmentDetails];
                        updated[idx] = { ...updated[idx], productName: t };
                        setEquipmentDetails(updated);
                      }}
                    />
                    <TextInput
                      style={st.halfInput}
                      placeholder="내용을 입력해 주세요."
                      placeholderTextColor={colors.G400}
                      value={equipmentDetails[idx]?.content}
                      onChangeText={(t) => {
                        const updated = [...equipmentDetails];
                        updated[idx] = { ...updated[idx], content: t };
                        setEquipmentDetails(updated);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Cert Images with detail */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>
                  인증 이미지 등록 ({getFilledCount(certImages)}/5)
                </Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              <View style={st.blueInfoBox}>
                <Text style={st.blueInfoText}>• 권장 사이즈: 290 x 330px</Text>
                <Text style={st.blueInfoText}>• 지원 형식: PNG, JPG</Text>
              </View>
              <View style={st.halfGrid}>
                {certImages.map((slot, idx) => (
                  <View key={slot.id} style={st.halfGridItem}>
                    <View style={st.halfImageWrap}>
                      {renderImageSlot(slot, undefined, true, () => addSlot(setCertImages, slot.id, 5))}
                    </View>
                    <TextInput
                      style={st.halfInput}
                      placeholder="ex) KMVSS"
                      placeholderTextColor={colors.G400}
                      value={certDetails[idx]?.name}
                      onChangeText={(t) => {
                        const updated = [...certDetails];
                        updated[idx] = { ...updated[idx], name: t };
                        setCertDetails(updated);
                      }}
                    />
                    <TextInput
                      style={st.halfInput}
                      placeholder="ex) 국토교통부"
                      placeholderTextColor={colors.G400}
                      value={certDetails[idx]?.issuer}
                      onChangeText={(t) => {
                        const updated = [...certDetails];
                        updated[idx] = { ...updated[idx], issuer: t };
                        setCertDetails(updated);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Patent Images with detail */}
            <View style={st.formItem}>
              <View style={st.labelRow}>
                <Text style={st.labelText}>
                  특허 이미지 등록 ({getFilledCount(patentImages)}/5)
                </Text>
                <Text style={st.requiredMark}> *</Text>
              </View>
              <View style={st.blueInfoBox}>
                <Text style={st.blueInfoText}>• 권장 사이즈: 290 x 330px</Text>
                <Text style={st.blueInfoText}>• 지원 형식: PNG, JPG</Text>
              </View>
              <View style={st.halfGrid}>
                {patentImages.map((slot, idx) => (
                  <View key={slot.id} style={st.halfGridItem}>
                    <View style={st.halfImageWrap}>
                      {renderImageSlot(slot, undefined, true, () => addSlot(setPatentImages, slot.id, 5))}
                    </View>
                    <TextInput
                      style={st.halfInput}
                      placeholder="ex) KMVSS"
                      placeholderTextColor={colors.G400}
                      value={patentDetails[idx]?.name}
                      onChangeText={(t) => {
                        const updated = [...patentDetails];
                        updated[idx] = { ...updated[idx], name: t };
                        setPatentDetails(updated);
                      }}
                    />
                    <TextInput
                      style={st.halfInput}
                      placeholder="ex) 국토교통부"
                      placeholderTextColor={colors.G400}
                      value={patentDetails[idx]?.issuer}
                      onChangeText={(t) => {
                        const updated = [...patentDetails];
                        updated[idx] = { ...updated[idx], issuer: t };
                        setPatentDetails(updated);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Agreements */}
            <View style={st.agreementSection}>
              <View style={st.agreementAllRow}>
                <Checkbox
                  checked={agreeAll}
                  onToggle={handleAgreeAll}
                  label="전체 약관 동의"
                />
              </View>
              <View style={st.agreementDivider} />
              <View style={st.agreementSubRow}>
                <Checkbox
                  checked={agreePrivacy}
                  onToggle={(v) => handleSubAgreeChange('privacy', v)}
                  label="개인정보 수집 및 이용 동의 (필수)"
                  size="small"
                />
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={st.agreementLink}>보기</Text>
                </TouchableOpacity>
              </View>
              <View style={st.agreementSubRow}>
                <Checkbox
                  checked={agreeThirdParty}
                  onToggle={(v) => handleSubAgreeChange('thirdParty', v)}
                  label="개인정보 제 3자 제공 동의 (필수)"
                  size="small"
                />
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={st.agreementLink}>보기</Text>
                </TouchableOpacity>
              </View>
              {showValidation && (!agreePrivacy || !agreeThirdParty) && (
                <Text style={st.validationText}>*필수 항목에 모두 동의해 주세요.</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Bar */}
        <BottomButtonBar
          buttons={[
            {
              label: '취소',
              variant: 'outline',
              onPress: () => navigation.goBack(),
            },
            {
              label: '저장하기',
              variant: 'primary',
              onPress: handleSubmit,
            },
          ]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const st = StyleSheet.create({
  safeArea: {
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
    paddingHorizontal: PD,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  headerBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  /* Banner */
  bannerUploader: {
    width: '100%',
    aspectRatio: 2.2,
    backgroundColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.G300,
    borderStyle: 'dashed',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerOverlayDark: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPlusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerPlusText: {
    color: colors.white,
    fontSize: 24,
    fontFamily: fontFamily.regular,
    marginTop: Platform.OS === 'ios' ? -2 : -4,
  },
  bannerLabel: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.G500,
  },
  bannerSub: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.G400,
    marginTop: 4,
  },

  /* Body */
  bodyContent: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: PD,
    gap: 24,
  },

  /* Logo — 배너와 겹치는 영역 */
  logoFloatWrap: {
    marginTop: -40,
    paddingHorizontal: PD,
    zIndex: 10,
  },
  logoUploadBox: {
    width: 80,
    height: 80,
    backgroundColor: colors.G200,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.G300,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  logoPlusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlusIcon: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontFamily.regular,
    marginTop: Platform.OS === 'ios' ? -2 : -3,
  },
  logoUploadLabel: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.G500,
  },
  logoEditWrap: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  logoEditCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.G100,
    borderWidth: 1,
    borderColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEditText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },

  /* Company Name */
  companyName: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },

  /* Form */
  formItem: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  requiredMark: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.error,
  },
  hintText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.G500,
    marginTop: -2,
  },
  validationText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.error,
    marginTop: 2,
  },

  textInput: {
    height: 50,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.G300,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    color: colors.black,
  },
  textArea: {
    height: 150,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.G300,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    color: colors.black,
  },

  /* Location */
  locationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dropdownWrap: {
    flex: 1,
    zIndex: 10,
  },
  selectBox: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  selectText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  selectPlaceholder: {
    color: colors.G400,
  },
  dropdownList: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    zIndex: 100,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  dropdownItemActive: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
  },

  /* File Upload */
  fileUploadBox: {
    height: 140,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.G200,
  },
  fileUploadPlus: {
    fontSize: 24,
    fontFamily: fontFamily.regular,
    color: colors.G400,
    marginTop: -4,
  },
  fileUploadText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.G500,
  },
  fileUploadSub: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.G400,
  },
  filePreviewWrap: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  filePreviewImg: {
    width: '100%',
    height: '100%',
  },
  fileOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileOverlayText: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },

  /* Blue Info Box */
  blueInfoBox: {
    backgroundColor: '#F3F6FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: borderRadius.sm,
  },
  blueInfoText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: '#626262',
    lineHeight: 20,
  },

  /* Image Grid */
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageSlotWrap: {
    gap: 6,
  },
  imageSlotContainer: {
    position: 'relative',
    width: 98,
    height: 98,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageSlot: {
    width: '100%',
    height: '100%',
  },
  imageUploadBox: {
    width: 98,
    height: 98,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDeleteBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderTopLeftRadius: 2,
    backgroundColor: 'rgba(27,27,27,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Half Grid (2 columns) */
  halfGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  halfGridItem: {
    width: '48%',
    gap: 6,
    marginBottom: 10,
  },
  halfImageWrap: {
    width: '100%',
    aspectRatio: 1,
  },
  halfInput: {
    height: 36,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 10,
    color: colors.black,
    backgroundColor: colors.white,
  },

  /* Cert / Patent slots */
  certSlotWrap: {
    gap: 4,
  },
  slotInput: {
    width: 80,
    height: 28,
    fontSize: 10,
    fontFamily: fontFamily.regular,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 4,
    color: colors.black,
    backgroundColor: colors.white,
  },

  /* Equipment */
  equipmentRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  equipmentInputs: {
    flex: 1,
    gap: 6,
  },
  miniInput: {
    height: 36,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    color: colors.black,
  },

  /* Agreements */
  agreementSection: {
    gap: 12,
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  agreementAllRow: {
    paddingBottom: 4,
  },
  agreementDivider: {
    height: 1,
    backgroundColor: colors.G200,
  },
  agreementSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  agreementLink: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.G500,
    textDecorationLine: 'underline',
  },
});
