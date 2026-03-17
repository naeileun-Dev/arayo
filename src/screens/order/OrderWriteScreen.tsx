import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { BottomButtonBar } from '../../components/common';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { OrderConfirmModal } from './components/OrderConfirmModal';
import {
  SectionLabel,
  FormLabel,
  ValidationMsg,
  Checkbox,
  formatPhone,
  formatPrice,
} from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

type OrderWriteRouteProp = RouteProp<RootStackParamList, 'OrderWrite'>;

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export const OrderWriteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OrderWriteRouteProp>();

  // 모달 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 상품 정보 (ProductViewScreen에서 전달받음)
  const productInfo: ProductInfo = route.params?.product || {
    id: '1',
    name: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: 2400000,
    imageUrl: undefined,
  };

  // 주문자 정보
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  // 배송지 정보
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [deliveryRequest, setDeliveryRequest] = useState('');

  // 약관 동의
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeRefund, setAgreeRefund] = useState(false);

  const [showValidation, setShowValidation] = useState(false);

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeRefund(next);
  };

  const handleToggleTerms = () => {
    const next = !agreeTerms;
    setAgreeTerms(next);
    setAgreeAll(next && agreePrivacy && agreeRefund);
  };

  const handleTogglePrivacy = () => {
    const next = !agreePrivacy;
    setAgreePrivacy(next);
    setAgreeAll(next && agreeTerms && agreeRefund);
  };

  const handleToggleRefund = () => {
    const next = !agreeRefund;
    setAgreeRefund(next);
    setAgreeAll(next && agreeTerms && agreePrivacy);
  };

  const handleZipCodeSearch = () => {
    // TODO: 우편번호 검색 모달 연동
    // 임시로 테스트 데이터 설정
    setZipCode('1234');
    setAddress('서울시 마포구');
  };

  const isFormValid = () => {
    return (
      buyerName.trim() &&
      buyerPhone.trim() &&
      zipCode.trim() &&
      address.trim() &&
      deliveryRequest.trim() &&
      agreeTerms &&
      agreePrivacy &&
      agreeRefund
    );
  };

  const handleSubmit = () => {
    setShowValidation(true);
    if (isFormValid()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmOrder = () => {
    setShowConfirmModal(false);
    // 주문 완료 화면으로 이동
    navigation.replace('OrderComplete', {
      orderInfo: {
        accountHolder: '주식회사 수성코리아',
        bankName: '국민은행',
        accountNumber: '123456789',
        totalAmount: productInfo.price,
        sellerPhone: '0501-2345-6789',
        sellerId: '1',
      },
    });
  };

  const priceFormatted = formatPrice(productInfo.price.toString());

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>주문하기</Text>
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
          {/* 주문자 정보 */}
          <SectionLabel label="주문자 정보" />

          <View style={styles.formItem}>
            <FormLabel text="이름" required />
            <TextInput
              style={styles.textInput}
              value={buyerName}
              onChangeText={setBuyerName}
              placeholder="이름을 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg
              message="* 이름을 입력해 주세요."
              visible={showValidation && !buyerName.trim()}
            />
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
            <ValidationMsg
              message="* 휴대폰 번호를 입력해 주세요."
              visible={showValidation && !buyerPhone.trim()}
            />
          </View>

          <View style={styles.sectionGap} />

          {/* 배송지 정보 */}
          <SectionLabel label="배송지 정보" />

          <View style={styles.formItem}>
            <FormLabel text="사업장 주소지" required />
            <View style={styles.addressRow}>
              <TextInput
                style={[styles.textInput, styles.zipCodeInput]}
                value={zipCode}
                editable={false}
                placeholder="우편번호"
                placeholderTextColor={colors.G400}
              />
              <TouchableOpacity
                style={styles.zipCodeBtn}
                activeOpacity={0.7}
                onPress={handleZipCodeSearch}
              >
                <Text style={styles.zipCodeBtnText}>우편번호 검색</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.textInput, styles.mt10]}
              value={address}
              editable={false}
              placeholder="기본주소"
              placeholderTextColor={colors.G400}
            />
            <TextInput
              style={[styles.textInput, styles.mt10]}
              value={addressDetail}
              onChangeText={setAddressDetail}
              placeholder="상세주소를 입력해 주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg
              message="* 주소를 입력해 주세요."
              visible={showValidation && (!zipCode.trim() || !address.trim())}
            />
          </View>

          <View style={styles.formItem}>
            <FormLabel text="요청사항" required />
            <TextInput
              style={styles.textArea}
              value={deliveryRequest}
              onChangeText={setDeliveryRequest}
              placeholder="요청사항을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
            />
            <ValidationMsg
              message="* 요청사항을 입력해 주세요."
              visible={showValidation && !deliveryRequest.trim()}
            />
          </View>

          <View style={styles.sectionGap} />

          {/* 주문상품 정보 */}
          <SectionLabel label="주문상품 정보" />

          <View style={styles.productCard}>
            <View style={styles.productCardHeader}>
              <Text style={styles.productCardLabel}>상품명</Text>
            </View>
            <View style={styles.productCardContent}>
              <View style={styles.productImageWrap}>
                {productInfo.imageUrl ? (
                  <Image
                    source={{ uri: productInfo.imageUrl }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.productImagePlaceholder} />
                )}
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {productInfo.name}
              </Text>
            </View>
            <View style={styles.productCardDivider} />
            <View style={styles.productCardHeader}>
              <Text style={styles.productCardLabel}>상품금액</Text>
            </View>
            <View style={styles.productPriceRow}>
              <Text style={styles.productPrice}>{priceFormatted} 원</Text>
            </View>
          </View>

          <View style={styles.sectionGap} />

          {/* 예상 결제 내역 */}
          <SectionLabel label="예상 결제 내역" />

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>상품금액</Text>
              <Text style={styles.summaryValue}>{priceFormatted} 원</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>결제 예상금액</Text>
              <Text style={styles.summaryValueRed}>{priceFormatted} 원</Text>
            </View>
          </View>

          <View style={styles.sectionGap} />

          {/* 약관 동의 */}
          <SectionLabel label="약관 동의" />

          <View style={styles.agreementSection}>
            <Checkbox
              checked={agreeAll}
              onPress={handleAgreeAll}
              label="주문 정보를 확인하였으며, 아래 각 항목에 동의 합니다."
            />
            <View style={styles.agreeDivider} />

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreeTerms}
                onPress={handleToggleTerms}
                label="이용약관"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreePrivacy}
                onPress={handleTogglePrivacy}
                label="개인정보 수집 및 이용 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreeRefund}
                onPress={handleToggleRefund}
                label="취소 / 환불규정 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            {showValidation && (!agreeTerms || !agreePrivacy || !agreeRefund) && (
              <ValidationMsg message="* 필수 항목에 모두 동의해 주세요." visible />
            )}
          </View>

          <View style={styles.sectionGap} />

          {/* 결제 명세 */}
          <SectionLabel label="결제 명세" />

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>상품금액</Text>
              <Text style={styles.summaryValue}>{priceFormatted} 원</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>결제 예상금액</Text>
              <Text style={styles.summaryValueRed}>{priceFormatted} 원</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>
            <Text style={styles.infoText}>
              안전 결제를 통해 결제금은 거래 완료 시까지 안전하게 보관됩니다.
            </Text>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          {
            label: '안전결제',
            onPress: handleSubmit,
          },
        ]}
      />

      {/* 주문 확인 모달 */}
      <OrderConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmOrder}
      />
    </SafeAreaView>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  formItem: {
    marginBottom: 25,
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
    height: 100,
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
  sectionGap: {
    height: 30,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 10,
  },
  zipCodeInput: {
    flex: 1,
  },
  zipCodeBtn: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  zipCodeBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  mt10: {
    marginTop: 10,
  },
  productCard: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  productCardHeader: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.G100,
  },
  productCardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G700,
  },
  productCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12,
  },
  productImageWrap: {
    width: 50,
    height: 50,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.G100,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.G200,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    lineHeight: 20,
  },
  productCardDivider: {
    height: 1,
    backgroundColor: colors.G200,
  },
  productPriceRow: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  summaryBox: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G600,
  },
  summaryLabelBold: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  summaryValueRed: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  agreementSection: {
    marginBottom: 10,
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
    marginTop: 12,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 15,
  },
  infoIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.G400,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoIconText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.G400,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.G500,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 20,
  },
});

