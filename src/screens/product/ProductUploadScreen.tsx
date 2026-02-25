import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { CATEGORY_DATA, CATEGORY_LIST, YEARS, MONTHS } from '../../constants/categoryData';
import { REGION_DATA, CITIES } from '../../constants/regionData';

import { colors } from '../../styles/colors';

// 재사용 가능한 Checkbox 컴포넌트
const CustomCheckbox = ({ label, isChecked, onPress, isRadioStyle = false }: any) => {
  return (
    <TouchableOpacity style={styles.checkboxWrap} onPress={onPress} activeOpacity={0.8}>
      <View style={[isRadioStyle ? styles.radioBox : styles.checkBox, isChecked && styles.checkBoxActive]}>
        {isChecked && !isRadioStyle && <Text style={styles.checkIcon}>✓</Text>}
        {isChecked && isRadioStyle && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function ProductUploadScreen() {
  const navigation = useNavigation();

  // 이미지 상태
  const [images, setImages] = useState<Asset[]>([]);
  const MAX_IMAGES = 10;

  // 입력 폼 상태
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState<'중고' | '신품' | null>(null);
  const [manufacturer, setManufacturer] = useState('');
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
  // 드롭다운(모달) 선택 상태
  const [machineCategory, setMachineCategory] = useState('선택');
  const [machineSubCategory, setMachineSubCategory] = useState('설비 구분을 먼저 선택해 주세요.');
  const [produceYear, setProduceYear] = useState('연');
  const [produceMonth, setProduceMonth] = useState('월');
  const [warrantyYear, setWarrantyYear] = useState('연');
  const [warrantyMonth, setWarrantyMonth] = useState('월');
  
  // ⭐️ 제품 위치 연동 상태
  const [city, setCity] = useState('시');
  const [county, setCounty] = useState('구/군');

  // 체크박스 상태
  const [isUnknownDate, setIsUnknownDate] = useState(false);
  const [isExpiredWarranty, setIsExpiredWarranty] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  // 모달 제어 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ title: string; options: string[]; selectedValue: string; onSelect: (val: string) => void }>({
    title: '', options: [], selectedValue: '', onSelect: () => {},
  });

  // 토글 함수들
  const toggleKeyword = (word: string) => setKeywords(p => p.includes(word) ? p.filter(w => w !== word) : [...p, word]);
  const toggleService = (word: string) => setServices(p => p.includes(word) ? p.filter(w => w !== word) : [...p, word]);
  
  const handleAgreeAll = () => {
    const nextState = !agreeAll;
    setAgreeAll(nextState); setAgree1(nextState); setAgree2(nextState);
  };

  const handlePickImage = () => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return Alert.alert('알림', '최대 10장까지 등록할 수 있습니다.');
    launchImageLibrary({ mediaType: 'photo', selectionLimit: remaining }, (res) => {
      if (res.didCancel || res.errorCode) return;
      if (res.assets) setImages(prev => [...prev, ...res.assets!].slice(0, MAX_IMAGES));
    });
  };

  const handleRemoveImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));

  // ==========================================
  // 모달 오픈 헬퍼 함수
  // ==========================================
  const openSelectModal = (title: string, options: string[], selectedValue: string, onSelect: (val: string) => void) => {
    setModalConfig({ title, options, selectedValue, onSelect });
    setModalVisible(true);
  };

  // ⭐️ 설비 구분 선택 시 세부기종 초기화
  const handleCategorySelect = (val: string) => {
    setMachineCategory(val);
    setMachineSubCategory('선택');
  };

  // ⭐️ 시/도 선택 시 구/군 초기화
  const handleCitySelect = (val: string) => {
    setCity(val);
    setCounty('구/군 선택');
  };

  // ⭐️ 세부 기종 모달 띄우기
  const handleSubCategoryPress = () => {
    if (machineCategory === '선택') {
      Alert.alert('알림', '설비 구분을 먼저 선택해 주세요.');
      return;
    }
    const targetObj = Object.values(CATEGORY_DATA).find(v => v.title === machineCategory);
    if (targetObj) {
      openSelectModal('세부 기종 선택', targetObj.sub, machineSubCategory, setMachineSubCategory);
    }
  };

  // ⭐️ 구/군 모달 띄우기
  const handleCountyPress = () => {
    if (city === '시') {
      Alert.alert('알림', '시/도를 먼저 선택해 주세요.');
      return;
    }
    const countyList = REGION_DATA[city] || [];
    openSelectModal('구/군 선택', countyList, county, setCounty);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
          <Text style={{ fontSize: 20 }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>상품등록</Text>
        <TouchableOpacity style={styles.headerIconBtn}>
          <Text style={{ fontSize: 14, color: colors.black }}>임시저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* 이미지 업로드 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>상품 이미지 등록 <Text style={styles.fileCount}>({images.length}/{MAX_IMAGES})</Text> <Text style={styles.req}>*</Text></Text>
          <View style={styles.blueBox}>
            <Text style={styles.blueBoxText}>• 첫 번째로 등록한 이미지가 대표 이미지로 설정되며,{'\n'}  <Text style={{ color: colors.system100 }}>이미지를 클릭하면 대표 이미지를 변경</Text>할 수 있습니다.</Text>
          </View>
          {images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageListWrap} contentContainerStyle={{ gap: 10 }}>
              {images.map((img, idx) => (
                <View key={idx} style={styles.imageThumb}>
                  <Image source={{ uri: img.uri }} style={styles.imageThumbImg} resizeMode="cover" />
                  {idx === 0 && <View style={styles.representBadge}><Text style={styles.representBadgeText}>대표</Text></View>}
                  <TouchableOpacity style={styles.imageRemoveBtn} onPress={() => handleRemoveImage(idx)}><Text style={styles.imageRemoveBtnText}>✕</Text></TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage}>
            <Text style={styles.uploadBtnText}>+  이미지 등록하기</Text>
          </TouchableOpacity>
        </View>

        {/* 상품명 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>상품명 <Text style={styles.req}>*</Text></Text>
          <View style={styles.inpSet}>
            <TextInput style={styles.input} placeholder="최대 50자 이내로 입력해 주세요." maxLength={50} value={productName} onChangeText={setProductName} placeholderTextColor={colors.G400} />
            <Text style={styles.textCount}>({productName.length}/50글자)</Text>
          </View>
        </View>

        {/* 제품 유형 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>제품 유형 <Text style={styles.req}>*</Text></Text>
          <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.radioBtn, productType === '중고' && styles.radioBtnActive]} onPress={() => setProductType('중고')}>
              <Text style={[styles.radioBtnText, productType === '중고' && styles.radioBtnTextActive]}>중고</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.radioBtn, productType === '신품' && styles.radioBtnActive]} onPress={() => setProductType('신품')}>
              <Text style={[styles.radioBtnText, productType === '신품' && styles.radioBtnTextActive]}>신품</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 설비 구분 & 세부 기종 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>설비 구분 <Text style={styles.req}>*</Text></Text>
          <TouchableOpacity style={styles.selectBtn} onPress={() => openSelectModal('설비 구분 선택', CATEGORY_LIST, machineCategory, handleCategorySelect)}>
            <Text style={[styles.selectBtnText, machineCategory === '선택' && { color: colors.G400 }]}>{machineCategory}</Text>
            <Text style={styles.selectCaret}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formLi}>
          <Text style={styles.formLabel}>세부 기종 <Text style={styles.req}>*</Text></Text>
          <TouchableOpacity style={styles.selectBtn} onPress={handleSubCategoryPress}>
            <Text style={[styles.selectBtnText, machineSubCategory.includes('먼저') && { color: colors.G400 }]}>{machineSubCategory}</Text>
            <Text style={styles.selectCaret}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* 제조사 & 모델명 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>제조사 <Text style={styles.req}>*</Text></Text>
          <TextInput style={styles.input} placeholder="제조사 입력" placeholderTextColor={colors.G400} value={manufacturer} onChangeText={setManufacturer} />
        </View>

        <View style={styles.formLi}>
          <Text style={styles.formLabel}>모델명 <Text style={styles.req}>*</Text></Text>
          <TextInput style={styles.input} placeholder="모델명 입력" placeholderTextColor={colors.G400} value={modelName} onChangeText={setModelName} />
        </View>

        {/* 제조 연월 */}
        <View style={styles.formLi}>
          <View style={styles.formHead}>
            <Text style={styles.formLabelMargin0}>제조 연월 <Text style={styles.req}>*</Text></Text>
            <CustomCheckbox label="미상" isChecked={isUnknownDate} onPress={() => setIsUnknownDate(!isUnknownDate)} />
          </View>
          <View style={[styles.flexRow, { gap: 10 }]}>
            <TouchableOpacity disabled={isUnknownDate} style={[styles.selectBtn, { flex: 1, marginBottom: 0, backgroundColor: isUnknownDate ? colors.G100 : '#fff' }]} onPress={() => openSelectModal('제조 연 선택', YEARS, produceYear, setProduceYear)}>
              <Text style={[styles.selectBtnText, (produceYear === '연' || isUnknownDate) && { color: colors.G400 }]}>{isUnknownDate ? '연' : produceYear}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={isUnknownDate} style={[styles.selectBtn, { flex: 1, marginBottom: 0, backgroundColor: isUnknownDate ? colors.G100 : '#fff' }]} onPress={() => openSelectModal('제조 월 선택', MONTHS, produceMonth, setProduceMonth)}>
              <Text style={[styles.selectBtnText, (produceMonth === '월' || isUnknownDate) && { color: colors.G400 }]}>{isUnknownDate ? '월' : produceMonth}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 보증 기간 */}
        <View style={styles.formLi}>
          <View style={styles.formHead}>
            <Text style={styles.formLabelMargin0}>보증 기간 <Text style={styles.req}>*</Text></Text>
            <CustomCheckbox label="만료" isChecked={isExpiredWarranty} onPress={() => setIsExpiredWarranty(!isExpiredWarranty)} />
          </View>
          <View style={[styles.flexRow, { gap: 10 }]}>
            <TouchableOpacity disabled={isExpiredWarranty} style={[styles.selectBtn, { flex: 1, marginBottom: 0, backgroundColor: isExpiredWarranty ? colors.G100 : '#fff' }]} onPress={() => openSelectModal('보증 연 선택', YEARS, warrantyYear, setWarrantyYear)}>
              <Text style={[styles.selectBtnText, (warrantyYear === '연' || isExpiredWarranty) && { color: colors.G400 }]}>{isExpiredWarranty ? '연' : warrantyYear}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={isExpiredWarranty} style={[styles.selectBtn, { flex: 1, marginBottom: 0, backgroundColor: isExpiredWarranty ? colors.G100 : '#fff' }]} onPress={() => openSelectModal('보증 월 선택', MONTHS, warrantyMonth, setWarrantyMonth)}>
              <Text style={[styles.selectBtnText, (warrantyMonth === '월' || isExpiredWarranty) && { color: colors.G400 }]}>{isExpiredWarranty ? '월' : warrantyMonth}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ⭐️ 제품 위치 (시/구 연동 완벽 반영) ⭐️ */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>제품 위치 <Text style={styles.req}>*</Text></Text>
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={[styles.selectBtn, { marginBottom: 0 }]} onPress={() => openSelectModal('시/도 선택', CITIES, city, handleCitySelect)}>
              <Text style={[styles.selectBtnText, city === '시' && { color: colors.G400 }]}>{city}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.selectBtn, { marginBottom: 0 }]} onPress={handleCountyPress}>
              <Text style={[styles.selectBtnText, county === '구/군' || county === '구/군 선택' ? { color: colors.G400 } : {}]}>{county}</Text>
              <Text style={styles.selectCaret}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 상품 소개 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>상품 소개 <Text style={styles.req}>*</Text></Text>
          <TextInput style={styles.textArea} placeholder="상품 소개" placeholderTextColor={colors.G400} multiline textAlignVertical="top" value={description} onChangeText={setDescription} />
        </View>

        {/* 소개 키워드 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>소개 키워드 <Text style={styles.req}>*</Text></Text>
          <View style={[styles.blueBox, { marginBottom: 10 }]}><Text style={[styles.blueBoxText, { color: colors.G700 }]}>선택된 키워드가 메인 페이지에 노출됩니다.</Text></View>
          <View style={styles.checkboxSet}>
            {['신품급', '즉시설치', '짧은연식', '전시품', '네고가능', '점검완료', '마지막매물', '초급매', '장기A/S', '빠른대응'].map((word) => {
              const isChecked = keywords.includes(word);
              return (
                <TouchableOpacity key={word} style={[styles.tagCheckbox, isChecked && styles.tagCheckboxActive]} onPress={() => toggleKeyword(word)}>
                  <Text style={[styles.tagCheckboxText, isChecked && styles.tagCheckboxTextActive]}>{word}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 제공 서비스 선택 */}
        <View style={styles.formLi}>
          <Text style={styles.formLabel}>제공 서비스 선택 <Text style={styles.req}>*</Text></Text>
          <View style={[styles.blueBox, { marginBottom: 10 }]}><Text style={[styles.blueBoxText, { color: colors.G700 }]}>선택된 서비스가 상품 상세 화면에 노출됩니다.</Text></View>
          <View style={styles.checkboxSet}>
            {['상차도', '도착도', '설치', '시운전 /교육', '점검완료', '할부 가능', '네고 가능', '세금계산서'].map((srv) => {
              const isChecked = services.includes(srv);
              return (
                <TouchableOpacity key={srv} style={[styles.tagCheckbox, isChecked && styles.tagCheckboxActive]} onPress={() => toggleService(srv)}>
                  <Text style={[styles.tagCheckboxText, isChecked && styles.tagCheckboxTextActive]}>{srv}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 상품 금액 */}
        <View style={styles.formLi}>
          <View style={styles.formHead}>
            <Text style={styles.formLabelMargin0}>상품 금액 <Text style={styles.req}>*</Text></Text>
            <CustomCheckbox label="가격 협의 가능" isChecked={isNegotiable} onPress={() => setIsNegotiable(!isNegotiable)} />
          </View>
          <View style={[styles.priceInputWrap, isNegotiable && { backgroundColor: colors.G100 }]}>
            <TextInput style={styles.priceInput} placeholder="상품 금액 입력" keyboardType="numeric" placeholderTextColor={colors.G400} value={price} onChangeText={setPrice} editable={!isNegotiable} />
            <Text style={styles.priceUnit}>원</Text>
          </View>
        </View>

        {/* 약관 동의 */}
        <View style={[styles.formLi, styles.mt40]}>
          <CustomCheckbox label="전체 약관 동의" isChecked={agreeAll} onPress={handleAgreeAll} />
          <View style={styles.hr} />
          <View style={styles.agreeRow}>
            <CustomCheckbox label="개인정보 수집 및 이용 동의" isChecked={agree1} onPress={() => setAgree1(!agree1)} />
            <Text style={styles.reqText}>(필수)</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}><Text style={styles.viewLink}>보기</Text></TouchableOpacity>
          </View>
          <View style={styles.agreeRow}>
            <CustomCheckbox label="개인정보 제 3자 제공 동의" isChecked={agree2} onPress={() => setAgree2(!agree2)} />
            <Text style={styles.reqText}>(필수)</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}><Text style={styles.viewLink}>보기</Text></TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* 하단 등록하기 버튼 */}
      <View style={styles.bottomFloating}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>등록하기</Text>
        </TouchableOpacity>
      </View>

      {/* ==========================================
          항목 선택 공통 바텀시트 모달
      ========================================== */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalConfig.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {modalConfig.options.map((opt) => (
                <TouchableOpacity 
                  key={opt} 
                  style={[styles.modalOption, modalConfig.selectedValue === opt && styles.modalOptionActive]}
                  onPress={() => {
                    modalConfig.onSelect(opt);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, modalConfig.selectedValue === opt && styles.modalOptionTextActive]}>{opt}</Text>
                  {modalConfig.selectedValue === opt && <Text style={styles.modalOptionCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, paddingHorizontal: 20 },
  contentContainer: { paddingTop: 25, paddingBottom: 100 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 56, borderBottomWidth: 1, borderBottomColor: colors.G200, backgroundColor: colors.white },
  headerIconBtn: { padding: 8, minWidth: 40, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black },

  formLi: { marginBottom: 20 },
  formHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  formLabel: { fontSize: 14, fontWeight: 'bold', color: colors.black, marginBottom: 10 },
  formLabelMargin0: { fontSize: 14, fontWeight: 'bold', color: colors.black },
  req: { color: colors.redDark },
  mt40: { marginTop: 40 },

  input: { height: 48, borderWidth: 1, borderColor: colors.G200, borderRadius: 6, paddingHorizontal: 12, fontSize: 14, color: colors.black },
  inpSet: { position: 'relative' },
  textCount: { position: 'absolute', right: 12, top: 15, fontSize: 12, color: colors.G400 },
  textArea: { height: 150, borderWidth: 1, borderColor: colors.G200, borderRadius: 6, padding: 12, fontSize: 14, color: colors.black },

  priceInputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.G200, borderRadius: 6, paddingRight: 12 },
  priceInput: { flex: 1, height: 48, paddingHorizontal: 12, fontSize: 14, color: colors.black },
  priceUnit: { fontSize: 14, color: colors.black },

  /* --- Picker(드롭다운) 대체용 버튼 UI --- */
  selectBtn: { height: 48, borderWidth: 1, borderColor: colors.G200, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, marginBottom: 10 },
  selectBtnText: { fontSize: 14, color: colors.black },
  selectCaret: { fontSize: 10, color: colors.G400 },

  fileCount: { fontWeight: 'normal', color: colors.G400, fontSize: 13 },
  blueBox: { backgroundColor: '#F0F6FF', padding: 12, borderRadius: 6, marginBottom: 6 },
  blueBoxText: { fontSize: 13, color: colors.black, lineHeight: 20 },
  imageListWrap: { marginTop: 10, marginBottom: 10 },
  imageThumb: { width: 100, height: 100, borderRadius: 6, overflow: 'hidden', position: 'relative' },
  imageThumbImg: { width: '100%', height: '100%' },
  representBadge: { position: 'absolute', top: 0, left: 0, backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderBottomRightRadius: 6 },
  representBadgeText: { fontSize: 11, fontWeight: 'bold', color: colors.white },
  imageRemoveBtn: { position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  imageRemoveBtnText: { fontSize: 12, color: colors.white, fontWeight: 'bold' },
  uploadBtn: { height: 48, backgroundColor: colors.white, borderRadius: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.G200, flexDirection: 'row' },
  uploadBtnText: { fontSize: 14, color: colors.black, fontWeight: '500' },

  flexRow: { flexDirection: 'row', gap: 10 },
  radioBtn: { flex: 1, height: 48, borderWidth: 1, borderColor: colors.G200, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  radioBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  radioBtnText: { fontSize: 14, color: colors.G600 },
  radioBtnTextActive: { color: colors.white, fontWeight: 'bold' },

  checkboxSet: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagCheckbox: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.G200, backgroundColor: colors.white },
  tagCheckboxActive: { borderColor: colors.primary, backgroundColor: '#FFEBEB' },
  tagCheckboxText: { fontSize: 13, color: colors.G600 },
  tagCheckboxTextActive: { color: colors.primary, fontWeight: 'bold' },

  checkboxWrap: { flexDirection: 'row', alignItems: 'center' },
  checkBox: { width: 20, height: 20, borderWidth: 1, borderColor: colors.G200, borderRadius: 4, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  checkBoxActive: { backgroundColor: colors.black, borderColor: colors.black },
  checkIcon: { color: colors.white, fontSize: 12, fontWeight: 'bold' },
  radioBox: { width: 20, height: 20, borderWidth: 1, borderColor: colors.G200, borderRadius: 10, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.black },
  checkboxLabel: { fontSize: 14, color: colors.black },

  hr: { height: 1, backgroundColor: colors.G200, marginVertical: 15 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  reqText: { fontSize: 12, color: colors.redDark, marginLeft: 4 },
  viewLink: { fontSize: 13, color: colors.G600, textDecorationLine: 'underline' },

  bottomFloating: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: Platform.OS === 'ios' ? 34 : 16, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.G200 },
  submitBtn: { height: 52, backgroundColor: colors.primary, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { fontSize: 16, fontWeight: 'bold', color: colors.white },

  /* --- 모달(Picker) 스타일 --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: colors.G200 },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  modalCloseBtn: { padding: 4 },
  modalCloseText: { fontSize: 20, color: colors.G600 },
  modalScroll: { paddingHorizontal: 20 },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.G100 },
  modalOptionActive: { backgroundColor: '#F9F9F9' },
  modalOptionText: { fontSize: 15, color: colors.black },
  modalOptionTextActive: { color: colors.primary, fontWeight: 'bold' },
  modalOptionCheck: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
});