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
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { CATEGORY_DATA, CATEGORY_LIST, YEARS, MONTHS } from '../../constants/categoryData';
import { REGION_DATA, CITIES } from '../../constants/regionData';

import { colors } from '../../styles/colors';
import { BottomButtonBar } from '../../components/common';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { Checkbox } from '../../components/common';
import { SelectModal } from '../../components/common';
import { FormField } from '../../components/common';
import { ConfirmModal } from '../../components/common';
import { CompareToast } from '../../components/common';

const MAX_IMAGES = 10;

const KEYWORD_OPTIONS = [
  '신품급',
  '즉시설치',
  '짧은연식',
  '전시품',
  '네고가능',
  '점검완료',
  '마지막매물',
  '초급매',
  '장기A/S',
  '빠른대응',
];

const SERVICE_OPTIONS = [
  '상차도',
  '도착도',
  '설치',
  '시운전 /교육',
  '점검완료',
  '할부 가능',
  '네고 가능',
  '세금계산서',
];

export const ProductUploadScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<Asset[]>([]);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState<'중고' | '신품' | null>(null);
  const [manufacturer, setManufacturer] = useState('');
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [machineCategory, setMachineCategory] = useState('선택');
  const [machineSubCategory, setMachineSubCategory] = useState('설비 구분을 먼저 선택해 주세요.');
  const [produceYear, setProduceYear] = useState('연');
  const [produceMonth, setProduceMonth] = useState('월');
  const [warrantyYear, setWarrantyYear] = useState('연');
  const [warrantyMonth, setWarrantyMonth] = useState('월');

  const [city, setCity] = useState('시');
  const [county, setCounty] = useState('구/군');

  const [isUnknownDate, setIsUnknownDate] = useState(false);
  const [isExpiredWarranty, setIsExpiredWarranty] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    options: string[];
    selectedValue: string;
    onSelect: (val: string) => void;
  }>({
    title: '',
    options: [],
    selectedValue: '',
    onSelect: () => {},
  });

  const [tempSaveVisible, setTempSaveVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleKeyword = (word: string) => {
    setKeywords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word],
    );
  };

  const toggleService = (word: string) => {
    setServices(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word],
    );
  };

  const handleAgreeAll = () => {
    const nextState = !agreeAll;
    setAgreeAll(nextState);
    setAgree1(nextState);
    setAgree2(nextState);
  };

  const handlePickImage = () => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      Alert.alert('알림', '최대 10장까지 등록할 수 있습니다.');
      return;
    }
    launchImageLibrary({ mediaType: 'photo', selectionLimit: remaining }, res => {
      if (res.didCancel || res.errorCode) return;
      if (res.assets) {
        setImages(prev => [...prev, ...res.assets!].slice(0, MAX_IMAGES));
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const openSelectModal = (
    title: string,
    options: string[],
    selectedValue: string,
    onSelect: (val: string) => void,
  ) => {
    setModalConfig({ title, options, selectedValue, onSelect });
    setModalVisible(true);
  };

  const handleCategorySelect = (val: string) => {
    setMachineCategory(val);
    setMachineSubCategory('선택');
  };

  const handleCitySelect = (val: string) => {
    setCity(val);
    setCounty('구/군 선택');
  };

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

  const handleCountyPress = () => {
    if (city === '시') {
      Alert.alert('알림', '시/도를 먼저 선택해 주세요.');
      return;
    }
    const countyList = REGION_DATA[city] || [];
    openSelectModal('구/군 선택', countyList, county, setCounty);
  };

  const renderImageList = () => {
    if (images.length === 0) return null;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={localStyles.imageListWrap}
        contentContainerStyle={{ gap: 10 }}
      >
        {images.map((img, idx) => (
          <View key={idx} style={localStyles.imageThumb}>
            <Image source={{ uri: img.uri }} style={localStyles.imageThumbImg} resizeMode="cover" />
            {idx === 0 && (
              <View style={localStyles.representBadge}>
                <Text style={localStyles.representBadgeText}>대표</Text>
              </View>
            )}
            <TouchableOpacity
              style={localStyles.imageRemoveBtn}
              onPress={() => handleRemoveImage(idx)}
            >
              <Text style={localStyles.imageRemoveBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderTagGrid = (
    items: string[],
    selectedItems: string[],
    onToggle: (item: string) => void,
  ) => (
    <View style={localStyles.tagGrid}>
      {items.map(word => {
        const isChecked = selectedItems.includes(word);
        return (
          <TouchableOpacity
            key={word}
            style={[localStyles.tagGridItem, isChecked && localStyles.tagGridItemActive]}
            onPress={() => onToggle(word)}
          >
            <Text style={[localStyles.tagGridText, isChecked && localStyles.tagGridTextActive]}>
              + {word}
            </Text>
          </TouchableOpacity>
        );
      })}
      {Array.from({ length: (3 - (items.length % 3)) % 3 }).map((_, i) => (
        <View key={`spacer-${i}`} style={localStyles.tagGridSpacer} />
      ))}
    </View>
  );

  const renderDateSelector = (
    yearValue: string,
    monthValue: string,
    onYearPress: () => void,
    onMonthPress: () => void,
    isDisabled: boolean,
  ) => (
    <View style={[localStyles.flexRow, { gap: 10 }]}>
      <TouchableOpacity
        disabled={isDisabled}
        style={[
          localStyles.selectBtn,
          { flex: 1, marginBottom: 0, backgroundColor: isDisabled ? colors.G100 : '#fff' },
        ]}
        onPress={onYearPress}
      >
        <Text
          style={[
            localStyles.selectBtnText,
            (yearValue === '연' || isDisabled) && { color: colors.G400 },
          ]}
        >
          {isDisabled ? '연' : yearValue}
        </Text>
        <Text style={localStyles.selectCaret}>▼</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isDisabled}
        style={[
          localStyles.selectBtn,
          { flex: 1, marginBottom: 0, backgroundColor: isDisabled ? colors.G100 : '#fff' },
        ]}
        onPress={onMonthPress}
      >
        <Text
          style={[
            localStyles.selectBtnText,
            (monthValue === '월' || isDisabled) && { color: colors.G400 },
          ]}
        >
          {isDisabled ? '월' : monthValue}
        </Text>
        <Text style={localStyles.selectCaret}>▼</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={localStyles.safeArea}>
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.headerIconBtn}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={localStyles.headerTitle}>상품등록</Text>
        <TouchableOpacity style={localStyles.headerIconBtn} onPress={() => setTempSaveVisible(true)}>
          <Text style={localStyles.tempSaveText}>임시저장</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={localStyles.container}
        contentContainerStyle={localStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <FormField label="상품 이미지 등록" required>
          <Text style={localStyles.fileCount}>
            ({images.length}/{MAX_IMAGES})
          </Text>
          <View style={localStyles.blueBox}>
            <Text style={localStyles.blueBoxText}>
              • 첫 번째로 등록한 이미지가 대표 이미지로 설정되며,{'\n'}
              {'  '}
              <Text style={{ color: colors.system100 }}>이미지를 클릭하면 대표 이미지를 변경</Text>
              할 수 있습니다.
            </Text>
          </View>
          {renderImageList()}
          <TouchableOpacity style={localStyles.uploadBtn} onPress={handlePickImage}>
            <Text style={localStyles.uploadBtnText}>+ 이미지 등록하기</Text>
          </TouchableOpacity>
        </FormField>

        <FormField label="상품명" required>
          <View style={localStyles.inpSet}>
            <TextInput
              style={localStyles.input}
              placeholder="최대 50자 이내로 입력해 주세요."
              maxLength={50}
              value={productName}
              onChangeText={setProductName}
              placeholderTextColor={colors.G400}
            />
            <Text style={localStyles.textCount}>({productName.length}/50글자)</Text>
          </View>
        </FormField>

        <FormField label="제품 유형" required>
          <View style={localStyles.flexRow}>
            <TouchableOpacity
              style={[localStyles.radioBtn, productType === '중고' && localStyles.radioBtnActive]}
              onPress={() => setProductType('중고')}
            >
              <Text
                style={[
                  localStyles.radioBtnText,
                  productType === '중고' && localStyles.radioBtnTextActive,
                ]}
              >
                중고
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.radioBtn, productType === '신품' && localStyles.radioBtnActive]}
              onPress={() => setProductType('신품')}
            >
              <Text
                style={[
                  localStyles.radioBtnText,
                  productType === '신품' && localStyles.radioBtnTextActive,
                ]}
              >
                신품
              </Text>
            </TouchableOpacity>
          </View>
        </FormField>

        <FormField label="설비 구분" required>
          <TouchableOpacity
            style={localStyles.selectBtn}
            onPress={() =>
              openSelectModal('설비 구분 선택', CATEGORY_LIST, machineCategory, handleCategorySelect)
            }
          >
            <Text
              style={[
                localStyles.selectBtnText,
                machineCategory === '선택' && { color: colors.G400 },
              ]}
            >
              {machineCategory}
            </Text>
            <Text style={localStyles.selectCaret}>▼</Text>
          </TouchableOpacity>
        </FormField>

        <FormField label="세부 기종" required>
          <TouchableOpacity style={localStyles.selectBtn} onPress={handleSubCategoryPress}>
            <Text
              style={[
                localStyles.selectBtnText,
                machineSubCategory.includes('먼저') && { color: colors.G400 },
              ]}
            >
              {machineSubCategory}
            </Text>
            <Text style={localStyles.selectCaret}>▼</Text>
          </TouchableOpacity>
        </FormField>

        <FormField label="제조사" required>
          <TextInput
            style={localStyles.input}
            placeholder="제조사 입력"
            placeholderTextColor={colors.G400}
            value={manufacturer}
            onChangeText={setManufacturer}
          />
        </FormField>

        <FormField label="모델명" required>
          <TextInput
            style={localStyles.input}
            placeholder="모델명 입력"
            placeholderTextColor={colors.G400}
            value={modelName}
            onChangeText={setModelName}
          />
        </FormField>

        <FormField
          label="제조 연월"
          required
          rightComponent={
            <Checkbox
              label="미상"
              checked={isUnknownDate}
              onToggle={() => setIsUnknownDate(!isUnknownDate)}
            />
          }
        >
          {renderDateSelector(
            produceYear,
            produceMonth,
            () => openSelectModal('제조 연 선택', YEARS, produceYear, setProduceYear),
            () => openSelectModal('제조 월 선택', MONTHS, produceMonth, setProduceMonth),
            isUnknownDate,
          )}
        </FormField>

        <FormField
          label="보증 기간"
          required
          rightComponent={
            <Checkbox
              label="만료"
              checked={isExpiredWarranty}
              onToggle={() => setIsExpiredWarranty(!isExpiredWarranty)}
            />
          }
        >
          {renderDateSelector(
            warrantyYear,
            warrantyMonth,
            () => openSelectModal('보증 연 선택', YEARS, warrantyYear, setWarrantyYear),
            () => openSelectModal('보증 월 선택', MONTHS, warrantyMonth, setWarrantyMonth),
            isExpiredWarranty,
          )}
        </FormField>

        <FormField label="제품 위치" required>
          <View style={{ gap: 10 }}>
            <TouchableOpacity
              style={[localStyles.selectBtn, { marginBottom: 0 }]}
              onPress={() => openSelectModal('시/도 선택', CITIES, city, handleCitySelect)}
            >
              <Text
                style={[localStyles.selectBtnText, city === '시' && { color: colors.G400 }]}
              >
                {city}
              </Text>
              <Text style={localStyles.selectCaret}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[localStyles.selectBtn, { marginBottom: 0 }]}
              onPress={handleCountyPress}
            >
              <Text
                style={[
                  localStyles.selectBtnText,
                  (county === '구/군' || county === '구/군 선택') && { color: colors.G400 },
                ]}
              >
                {county}
              </Text>
              <Text style={localStyles.selectCaret}>▼</Text>
            </TouchableOpacity>
          </View>
        </FormField>

        <FormField label="상품 소개" required>
          <TextInput
            style={localStyles.textArea}
            placeholder="상품 소개"
            placeholderTextColor={colors.G400}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </FormField>

        <FormField label="소개 키워드" required>
          <View style={[localStyles.blueBox, { marginBottom: 10 }]}>
            <Text style={[localStyles.blueBoxText, { color: colors.G700 }]}>
              선택된 키워드가 메인 페이지에 노출됩니다.
            </Text>
          </View>
          {renderTagGrid(KEYWORD_OPTIONS, keywords, toggleKeyword)}
        </FormField>

        <FormField label="제공 서비스 선택" required>
          <View style={[localStyles.blueBox, { marginBottom: 10 }]}>
            <Text style={[localStyles.blueBoxText, { color: colors.G700 }]}>
              선택된 서비스가 상품 상세 화면에 노출됩니다.
            </Text>
          </View>
          {renderTagGrid(SERVICE_OPTIONS, services, toggleService)}
        </FormField>

        <FormField
          label="상품 금액"
          required
          rightComponent={
            <Checkbox
              label="가격 협의 가능"
              checked={isNegotiable}
              onToggle={() => setIsNegotiable(!isNegotiable)}
              activeColor={colors.primary200}
              labelColor={colors.G600}
            />
          }
        >
          <View style={localStyles.priceInputWrap}>
            <TextInput
              style={localStyles.priceInput}
              placeholder="상품 금액 입력"
              keyboardType="numeric"
              placeholderTextColor={colors.G400}
              value={price}
              onChangeText={setPrice}
            />
            <Text style={localStyles.priceUnit}>원</Text>
          </View>
        </FormField>

        <View style={[localStyles.formLi, localStyles.mt40]}>
          <Checkbox
            label="전체 약관 동의"
            checked={agreeAll}
            onToggle={handleAgreeAll}
            activeColor={colors.primary200}
          />
          <View style={localStyles.hr} />
          <View style={localStyles.agreeRow}>
            <Checkbox
              label="개인정보 수집 및 이용 동의"
              checked={agree1}
              onToggle={() => setAgree1(!agree1)}
              activeColor={colors.primary200}
            />
            <Text style={localStyles.reqText}>(필수)</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Text style={localStyles.viewLink}>보기</Text>
            </TouchableOpacity>
          </View>
          <View style={localStyles.agreeRow}>
            <Checkbox
              label="개인정보 제 3자 제공 동의"
              checked={agree2}
              onToggle={() => setAgree2(!agree2)}
              activeColor={colors.primary200}
            />
            <Text style={localStyles.reqText}>(필수)</Text>
            <TouchableOpacity style={{ marginLeft: 'auto' }}>
              <Text style={localStyles.viewLink}>보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomButtonBar buttons={[{ label: '등록하기', onPress: () => setRegisterVisible(true) }]} />

      <SelectModal
        visible={modalVisible}
        title={modalConfig.title}
        options={modalConfig.options}
        selectedValue={modalConfig.selectedValue}
        onSelect={modalConfig.onSelect}
        onClose={() => setModalVisible(false)}
      />

      <ConfirmModal
        visible={tempSaveVisible}
        title="글 임시저장 확인"
        message="작성중인 글을 임시저장 하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="임시저장"
        onClose={() => setTempSaveVisible(false)}
        onConfirm={() => {
          setTempSaveVisible(false);
        }}
      />

      <ConfirmModal
        visible={registerVisible}
        title="상품 등록 확인"
        message="상품을 등록 하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="등록"
        onClose={() => setRegisterVisible(false)}
        onConfirm={() => {
          setRegisterVisible(false);
          setToastMessage('상품이 등록 되었습니다.');
          setToastVisible(true);
        }}
      />

      <CompareToast
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAG_ITEM_WIDTH = (SCREEN_WIDTH - 40) / 3 - 4;

const localStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, paddingHorizontal: 20 },
  contentContainer: { paddingTop: 25, paddingBottom: 100 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
  },
  headerIconBtn: { padding: 8, minWidth: 40, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: colors.black },
  tempSaveText: { fontSize: 14, color: colors.black },

  formLi: { marginBottom: 20 },
  mt40: { marginTop: 40 },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.black,
  },
  inpSet: { position: 'relative' },
  textCount: { position: 'absolute', right: 12, top: 15, fontSize: 12, color: colors.G400 },
  textArea: {
    height: 150,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: colors.black,
  },

  priceInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    paddingRight: 12,
  },
  priceInput: { flex: 1, height: 48, paddingHorizontal: 12, fontSize: 14, color: colors.black },
  priceUnit: { fontSize: 14, color: colors.black },

  selectBtn: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  selectBtnText: { fontSize: 14, color: colors.black },
  selectCaret: { fontSize: 10, color: colors.G400 },

  fileCount: { fontWeight: 'normal', color: colors.G400, fontSize: 13 },
  blueBox: { backgroundColor: '#F0F6FF', padding: 12, borderRadius: 6, marginBottom: 6 },
  blueBoxText: { fontSize: 13, color: colors.black, lineHeight: 20 },
  imageListWrap: { marginTop: 10, marginBottom: 10 },
  imageThumb: {
    width: 100,
    height: 100,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  imageThumbImg: { width: '100%', height: '100%' },
  representBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomRightRadius: 6,
  },
  representBadgeText: { fontSize: 11, fontWeight: 'bold', color: colors.white },
  imageRemoveBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRemoveBtnText: { fontSize: 12, color: colors.white, fontWeight: 'bold' },
  uploadBtn: {
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.G200,
    flexDirection: 'row',
  },
  uploadBtnText: { fontSize: 14, color: colors.black, fontWeight: '500' },

  flexRow: { flexDirection: 'row', gap: 10 },
  radioBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  radioBtnText: { fontSize: 14, color: colors.G600 },
  radioBtnTextActive: { color: colors.white, fontWeight: 'bold' },

  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 6,
  },
  tagGridItem: {
    width: TAG_ITEM_WIDTH,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  tagGridItemActive: { borderColor: colors.primary200, backgroundColor: colors.primary200 },
  tagGridText: { fontSize: 14, color: colors.G600, fontWeight: '900' },
  tagGridTextActive: { color: colors.white, fontWeight: '900' },
  tagGridSpacer: { width: TAG_ITEM_WIDTH, height: 0 },

  hr: { height: 1, backgroundColor: colors.G200, marginVertical: 15 },
  agreeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  reqText: { fontSize: 12, color: colors.red, marginLeft: 4 },
  viewLink: { fontSize: 13, color: colors.G600, textDecorationLine: 'underline' },

  bottomFloating: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  submitBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: { fontSize: 16, fontWeight: 'bold', color: colors.white },
});
