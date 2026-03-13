import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../styles/colors';

const PADDING_LR = 20;

const BrandHomeWriteScreen: React.FC = () => {
  const [introText, setIntroText] = useState('');
  const [detailText, setDetailText] = useState('');
  const [showValidation, setShowValidation] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeftBtn} activeOpacity={0.6}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>스마트기계</Text>
        <TouchableOpacity style={styles.headerRightBtn} activeOpacity={0.6}>
          <View style={styles.searchIconPlaceholder} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.bannerUploader} activeOpacity={0.7}>
          <View style={styles.bannerPlusCircle}>
            <Text style={styles.bannerPlusText}>+</Text>
          </View>
          <Text style={styles.bannerLabel}>배너 이미지 추가</Text>
          <Text style={styles.bannerSub}>권장 사이즈: 3840 x 600px</Text>
        </TouchableOpacity>

        <View style={styles.bodyContent}>
          <View style={styles.pageTitleWrap}>
            <Text style={styles.pageTitle}>회사소개 등록</Text>
            <Text style={styles.pageTitleSub}>Company Introduction</Text>
          </View>

          <Text style={styles.companyName}>(주) 스마트기계</Text>

          <View style={styles.gBox}>
            <Text style={styles.boxTitle}>기본 정보</Text>
            <View style={styles.infoList}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>주소</Text>
                <View style={styles.infoValueWrap}>
                  <Text style={styles.infoValue}>경기도 화성시 팔탄면 푸{'\n'}른들판로 725</Text>
                  <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.6}>
                    <Text style={styles.modifyBtnText}>수정하기</Text>
                    <View style={styles.modifyIconPlaceholder} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>이메일</Text>
                <View style={styles.infoValueWrap}>
                  <Text style={styles.infoValue}>kyun321@daum.net</Text>
                  <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.6}>
                    <Text style={styles.modifyBtnText}>수정하기</Text>
                    <View style={styles.modifyIconPlaceholder} />
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

          <View style={[styles.gBox, { marginTop: 15 }]}>
            <Text style={styles.boxTitle}>상세 정보</Text>
            <View style={styles.formGroup}>
              <View style={styles.formItem}>
                <View style={styles.labelRow}>
                  <Text style={styles.labelText}>카테고리</Text>
                  <Text style={styles.requiredMark}> *</Text>
                </View>
                <TouchableOpacity style={styles.selectBox} activeOpacity={0.7}>
                  <Text style={styles.selectPlaceholder}>카테고리를 선택해 주세요.</Text>
                  <View style={styles.selectChevron} />
                </TouchableOpacity>
                {showValidation && (
                  <Text style={styles.validationText}>*카테고리를 선택해 주세요.</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <View style={styles.labelRow}>
                  <Text style={styles.labelText}>취급 브랜드</Text>
                  <Text style={styles.requiredMark}> *</Text>
                </View>
                <TouchableOpacity style={styles.selectBox} activeOpacity={0.7}>
                  <Text style={styles.selectPlaceholder}>취급 브랜드를 선택해 주세요.</Text>
                  <View style={styles.selectChevron} />
                </TouchableOpacity>
                {showValidation && (
                  <Text style={styles.validationText}>*취급 브랜드를 선택해 주세요.</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <View style={styles.labelRow}>
                  <Text style={styles.labelText}>한줄소개</Text>
                  <Text style={styles.requiredMark}> *</Text>
                  <Text style={styles.charCount}>({introText.length}/50자)</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="한줄소개를 입력해 주세요."
                  placeholderTextColor={colors.textPlaceholder}
                  value={introText}
                  onChangeText={(t) => { if (t.length <= 50) setIntroText(t); }}
                  maxLength={50}
                />
                {showValidation && (
                  <Text style={styles.validationText}>*한줄소개를 정확하게 입력해 주세요.</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <View style={styles.labelRow}>
                  <Text style={styles.labelText}>상세소개</Text>
                  <Text style={styles.requiredMark}> *</Text>
                </View>
                <TextInput
                  style={styles.textArea}
                  placeholder="상세소개를 입력해 주세요."
                  placeholderTextColor={colors.textPlaceholder}
                  value={detailText}
                  onChangeText={setDetailText}
                  multiline
                  textAlignVertical="top"
                />
                {showValidation && (
                  <Text style={styles.validationText}>*상세소개를 정확하게 입력해 주세요.</Text>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.gBox, { marginTop: 15 }]}>
            <Text style={styles.boxTitle}>이미지 등록</Text>
            <View style={styles.formGroup}>
              <View style={styles.formItem}>
                <Text style={styles.labelText}>브랜드 로고 이미지</Text>
                <View style={styles.blueInfoBox}>
                  <Text style={styles.blueInfoText}>• 권장 사이즈: 680 × 148px</Text>
                  <Text style={styles.blueInfoText}>• 지원 형식: PNG, JPG</Text>
                </View>
                <View style={styles.imageUploadWrap}>
                  <TouchableOpacity style={styles.imageUploadBox} activeOpacity={0.7}>
                    <View style={styles.imageUploadIconPlaceholder} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imageDeleteBtn} activeOpacity={0.6}>
                    <View style={styles.imageDeleteIconPlaceholder} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formItem}>
                <Text style={styles.labelText}>회사 소개 이미지</Text>
                <View style={styles.blueInfoBox}>
                  <Text style={styles.blueInfoText}>• 권장 사이즈: 400 × 400px</Text>
                  <Text style={styles.blueInfoText}>• 지원 형식: PNG, JPG</Text>
                </View>
                <View style={styles.imageUploadWrap}>
                  <TouchableOpacity style={styles.imageUploadBox} activeOpacity={0.7}>
                    <View style={styles.imageUploadIconPlaceholder} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imageDeleteBtn} activeOpacity={0.6}>
                    <View style={styles.imageDeleteIconPlaceholder} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={() => setShowValidation(true)}
        >
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PADDING_LR,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  headerLeftBtn: {
    position: 'absolute',
    left: PADDING_LR,
    height: '100%',
    justifyContent: 'center',
  },
  moreIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  headerRightBtn: {
    position: 'absolute',
    right: PADDING_LR,
    height: '100%',
    justifyContent: 'center',
  },
  searchIconPlaceholder: {
    width: 22,
    height: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bannerUploader: {
    width: '100%',
    aspectRatio: 1.95,
    backgroundColor: colors.G200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPlusCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerPlusText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '300',
    marginTop: Platform.OS === 'ios' ? -1 : -3,
  },
  bannerLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.G400,
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
    fontWeight: '500',
    color: colors.black,
  },
  pageTitleSub: {
    fontSize: 14,
    color: colors.G400,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 12,
  },
  gBox: {
    backgroundColor: colors.G100,
    padding: 20,
    borderRadius: 4,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 15,
  },
  infoList: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G600,
    width: 56,
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
    gap: 3,
    backgroundColor: colors.G200,
    borderRadius: 30,
    paddingHorizontal: 8,
    height: 22,
  },
  modifyBtnText: {
    fontSize: 12,
    color: colors.G600,
  },
  modifyIconPlaceholder: {
    width: 12,
    height: 12,
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
    color: colors.G600,
    marginLeft: 'auto',
  },
  selectBox: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  selectPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPlaceholder,
  },
  selectChevron: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.G400,
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
    textDecorationLine: 'underline',
  },
  blueInfoBox: {
    backgroundColor: colors.infoBoxBg,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  blueInfoText: {
    fontSize: 14,
    color: colors.G700,
    lineHeight: 22,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploadIconPlaceholder: {
    width: 36,
    height: 36,
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
  imageDeleteIconPlaceholder: {
    width: 20,
    height: 20,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 20 : 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 8 },
    }),
  },
  submitButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
});

export default BrandHomeWriteScreen;
