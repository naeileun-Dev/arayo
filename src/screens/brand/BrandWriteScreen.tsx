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
import SearchIcon from '../../assets/icon/Search.svg';
import CameraPlusIcon from '../../assets/icon/camera-plus.svg';
import PencilIcon from '../../assets/icon/pencil.svg';
import ModifyIcon from '../../assets/icon/modify.svg';
import { MultiSelectDropdown } from './components/MultiSelectDropdown';
import type { RootStackParamList } from '../../types';

const PADDING_LR = 20;

const bannerPlaceholder = require('../../assets/images/banner01.png');

// Mock data
const CATEGORY_OPTIONS = [
  { id: '1', label: 'CNC 선반' },
  { id: '2', label: 'CNC 복합기' },
  { id: '3', label: 'MCT (머시닝센터)' },
  { id: '4', label: '범용 밀링' },
  { id: '5', label: '범용 선반' },
  { id: '6', label: '보링기' },
  { id: '7', label: '선반' },
];

const BRAND_OPTIONS = [
  { id: '1', label: '화천기계' },
  { id: '2', label: 'DN솔루션즈(구두산공...)' },
  { id: '3', label: '현대위아(HYUNDAI WIA)' },
  { id: '4', label: 'SMEC(스맥)' },
  { id: '5', label: '하스(Haas)' },
  { id: '6', label: '마작(Mazak)' },
  { id: '7', label: 'DMG모리(DMG MORI)' },
];

interface BrandWriteScreenProps {
  mode?: 'create' | 'edit';
}

export const BrandWriteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandWrite'>>();
  const mode = route.params?.mode || 'create';
  const isEdit = mode === 'edit';

  const [introText, setIntroText] = useState('');
  const [detailText, setDetailText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);
  const [bannerImage, setBannerImage] = useState<string | null>(isEdit ? 'existing' : null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [companyImage, setCompanyImage] = useState<string | null>(null);

  const handleSubmit = () => {
    setShowValidation(true);
    // TODO: Validate and submit
  };

  const logoSize = isEdit ? '340 × 74px' : '680 × 148px';
  const companyImageSize = isEdit ? '200 × 200px' : '400 × 400px';
  const bannerSize = isEdit ? '2400 x 600px' : '3840 x 600px';

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.6}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>스마트기계</Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.6}
          >
            <SearchIcon width={22} height={22} color={colors.black} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner Upload */}
          <TouchableOpacity style={styles.bannerUploader} activeOpacity={0.7}>
            {bannerImage ? (
              <Image source={bannerPlaceholder} style={styles.bannerImage} resizeMode="cover" />
            ) : null}
            <View style={styles.bannerOverlay}>
              <View style={[styles.bannerPlusCircle, isEdit && styles.bannerEditCircle]}>
                {isEdit ? (
                  <PencilIcon width={18} height={18} color={colors.white} />
                ) : (
                  <Text style={styles.bannerPlusText}>+</Text>
                )}
              </View>
              <Text style={styles.bannerLabel}>
                {isEdit ? '배너 이미지 교체' : '배너 이미지 추가'}
              </Text>
              <Text style={styles.bannerSub}>권장 사이즈: {bannerSize}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.bodyContent}>
            {/* Page Title */}
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>회사소개 등록</Text>
              <Text style={styles.pageTitleSub}>Company Introduction</Text>
            </View>

            <Text style={styles.companyName}>(주) 스마트기계</Text>

            {/* 기본 정보 */}
            <View style={styles.gBox}>
              <Text style={styles.boxTitle}>기본 정보</Text>
              <View style={styles.infoList}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>주소</Text>
                  <View style={styles.infoValueWrap}>
                    <Text style={styles.infoValue}>경기도 화성시 팔탄면 푸{'\n'}른들판로 725</Text>
                    <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.6}>
                      <Text style={styles.modifyBtnText}>수정하기</Text>
                      <ModifyIcon width={16} height={16} color="#7E7E7E" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>이메일</Text>
                  <View style={styles.infoValueWrap}>
                    <Text style={styles.infoValue}>kyun321@daum.net</Text>
                    <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.6}>
                      <Text style={styles.modifyBtnText}>수정하기</Text>
                      <ModifyIcon width={16} height={16} color="#7E7E7E" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>문의전화</Text>
                  <View style={styles.infoValueWrap}>
                    <Text style={styles.infoValue}>0504-1383-5656</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 상세 정보 */}
            <View style={[styles.gBox, { marginTop: 15 }]}>
              <Text style={styles.boxTitle}>상세 정보</Text>
              <View style={styles.formGroup}>
                {/* 카테고리 */}
                <MultiSelectDropdown
                  label="카테고리"
                  required
                  placeholder="카테고리를 선택해 주세요."
                  options={CATEGORY_OPTIONS}
                  selectedIds={selectedCategories}
                  onChange={setSelectedCategories}
                  isLoading={false}
                  errorMessage={showValidation && selectedCategories.length === 0 ? '*카테고리를 선택해 주세요.' : undefined}
                />

                {/* 취급 브랜드 */}
                <MultiSelectDropdown
                  label="취급 브랜드"
                  required
                  placeholder="취급 브랜드를 선택해 주세요."
                  options={BRAND_OPTIONS}
                  selectedIds={selectedBrands}
                  onChange={setSelectedBrands}
                  isLoading={false}
                  errorMessage={showValidation && selectedBrands.length === 0 ? '*취급 브랜드를 선택해 주세요.' : undefined}
                />

                {/* 한줄소개 */}
                <View style={styles.formItem}>
                  <View style={styles.labelRow}>
                    <Text style={styles.labelText}>한줄소개</Text>
                    <Text style={styles.requiredMark}> *</Text>
                    <Text style={styles.charCount}>({introText.length}/50자)</Text>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="한줄소개를 입력해 주세요."
                    placeholderTextColor={colors.G400}
                    value={introText}
                    onChangeText={(t) => { if (t.length <= 50) setIntroText(t); }}
                    maxLength={50}
                  />
                  {showValidation && !introText.trim() && (
                    <Text style={styles.validationText}>*한줄소개를 정확하게 입력해 주세요.</Text>
                  )}
                </View>

                {/* 상세소개 */}
                <View style={styles.formItem}>
                  <View style={styles.labelRow}>
                    <Text style={styles.labelText}>상세소개</Text>
                    <Text style={styles.requiredMark}> *</Text>
                  </View>
                  <TextInput
                    style={styles.textArea}
                    placeholder="상세소개를 입력해 주세요."
                    placeholderTextColor={colors.G400}
                    value={detailText}
                    onChangeText={setDetailText}
                    multiline
                    textAlignVertical="top"
                  />
                  {showValidation && !detailText.trim() && (
                    <Text style={styles.validationText}>*상세소개를 정확하게 입력해 주세요.</Text>
                  )}
                </View>
              </View>
            </View>

            {/* 이미지 등록 */}
            <View style={[styles.gBox, { marginTop: 15 }]}>
              <Text style={styles.boxTitle}>이미지 등록</Text>
              <View style={styles.formGroup}>
                {/* 브랜드 로고 */}
                <View style={styles.formItem}>
                  <Text style={styles.labelText}>브랜드 로고 이미지</Text>
                  <View style={styles.blueInfoBox}>
                    <Text style={styles.blueInfoText}>• 권장 사이즈: {logoSize}</Text>
                    <Text style={styles.blueInfoText}>• 지원 형식: PNG, JPG</Text>
                  </View>
                  <View style={styles.imageUploadWrap}>
                    <TouchableOpacity style={styles.imageUploadBox} activeOpacity={0.7}>
                      <CameraPlusIcon width={32} height={32} color={colors.G400} />
                    </TouchableOpacity>

                  </View>
                </View>

                {/* 회사 소개 이미지 */}
                <View style={styles.formItem}>
                  <Text style={styles.labelText}>회사 소개 이미지</Text>
                  <View style={styles.blueInfoBox}>
                    <Text style={styles.blueInfoText}>• 권장 사이즈: {companyImageSize}</Text>
                    <Text style={styles.blueInfoText}>• 지원 형식: PNG, JPG</Text>
                  </View>
                  <View style={styles.imageUploadWrap}>
                    <TouchableOpacity style={styles.imageUploadBox} activeOpacity={0.7}>
                      <CameraPlusIcon width={32} height={32} color={colors.G400} />
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {isEdit ? '수정하기' : '등록하기'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: PADDING_LR,
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
  moreIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bannerUploader: {
    width: '100%',
    aspectRatio: 2.2,
    backgroundColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  bannerPlusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerEditCircle: {
    backgroundColor: colors.primary,
  },
  bannerPlusText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '300',
    marginTop: Platform.OS === 'ios' ? -2 : -4,
  },
  bannerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.G500,
  },
  bannerSub: {
    fontSize: 12,
    color: colors.G400,
    marginTop: 4,
  },
  bodyContent: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: PADDING_LR,
  },
  pageTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  pageTitleSub: {
    fontSize: 14,
    color: colors.G400,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  gBox: {
    backgroundColor: colors.G100,
    padding: 20,
    borderRadius: 8,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 15,
  },
  infoList: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G600,
    width: 60,
    flexShrink: 0,
  },
  infoValueWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoValue: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    textAlign: 'right',
    flexShrink: 1,
  },
  modifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 28,
    backgroundColor: colors.G200,
    borderRadius: 14,
    gap: 2,
  },
  modifyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.G600,
  },
  formGroup: {
    gap: 20,
  },
  formItem: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    color: colors.G600,
  },
  requiredMark: {
    fontSize: 15,
    color: colors.error,
  },
  charCount: {
    fontSize: 13,
    color: colors.G500,
    marginLeft: 'auto',
  },
  textInput: {
    height: 50,
    fontSize: 14,
    fontWeight: '500',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    color: colors.black,
  },
  textArea: {
    height: 150,
    fontSize: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    color: colors.black,
  },
  validationText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 2,
  },
  blueInfoBox: {
    backgroundColor: colors.infoBoxBlue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  blueInfoText: {
    fontSize: 13,
    color: colors.G700,
    lineHeight: 20,
  },
  imageUploadWrap: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  imageUploadBox: {
    width: 80,
    height: 80,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDeleteBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    alignSelf: 'flex-start',
    marginLeft: 26,
  },
  bottomBar: {
    paddingHorizontal: PADDING_LR,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  submitButton: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

