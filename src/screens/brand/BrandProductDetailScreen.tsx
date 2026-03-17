import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { BrandHeader } from './components/BrandHeader';
import PhoneIcon from '../../assets/icon/phone.svg';
import ShareIcon from '../../assets/icon/share.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';
import { ServiceTag } from '../../components/common';
import { SERVICE_ITEMS } from '../product/constants';
import type { RootStackParamList } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;

const productImage = require('../../assets/images/img01.png');
const userAvatar = require('../../assets/images/user01.png');


const SPEC_ROWS = [
  { label: '제조사', value: '아라요 기계장터' },
  { label: '모델명', value: 'kkma-0000' },
];

const SELLER_INFO = [
  { label: '상호', value: '주식회사 아라요 기계장터' },
  { label: '담당자명', value: '김샘플' },
  { label: '이메일 주소', value: 'sample@sample.com' },
  { label: '전화번호', value: '0501-2345-6789' },
  { label: '사업장 소재지', value: '서울시 마포구 123-4' },
];

export const BrandProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandProductDetail'>>();
  const brandId = route.params?.brandId || '1';
  const productId = route.params?.productId || '1';

  const [activeTab, setActiveTab] = useState<'intro' | 'seller'>('intro');
  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const introY = useRef(0);
  const sellerY = useRef(0);
  const tabBarY = useRef(0);

  const images = [productImage, productImage, productImage, productImage, productImage];

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} />

      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={styles.imageSlider}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {images.map((img, idx) => (
              <Image key={idx} source={img} style={styles.productImage} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.paginationBadge}>
            <Text style={styles.paginationText}>
              {String(currentImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </Text>
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>10,000,000원</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>채팅 3</Text>
              <Text style={styles.statDivider}>|</Text>
              <Text style={styles.statText}>관심 45</Text>
              <Text style={styles.statDivider}>|</Text>
              <Text style={styles.statText}>조회 63</Text>
            </View>
          </View>

          {/* Seller Profile */}
          <View style={styles.sellerProfile}>
            <Image source={userAvatar} style={styles.sellerAvatar} />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>주식회사 아라요 기계장터 (대표)</Text>
              <View style={styles.sellerPhoneRow}>
                <PhoneIcon width={30} height={30} color={colors.G600} />
                <Text style={styles.sellerPhone}>0501-2345-6789</Text>
              </View>
            </View>
          </View>

          {/* Spec Table */}
          <View style={styles.specTable}>
            {SPEC_ROWS.map((spec) => (
              <View key={spec.label} style={styles.specRow}>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>

          {/* Service Toggle */}
          <TouchableOpacity
            style={styles.serviceToggle}
            activeOpacity={0.7}
            onPress={() => setIsServiceOpen(!isServiceOpen)}
          >
            <Text style={styles.serviceToggleText}>제공 서비스</Text>
            {isServiceOpen ? (
              <ChevronUpIcon width={16} height={16} color={colors.black} />
            ) : (
              <ChevronDownIcon width={16} height={16} color={colors.black} />
            )}
          </TouchableOpacity>

          {isServiceOpen && (
            <View style={styles.serviceGrid}>
              {SERVICE_ITEMS.map((col, colIdx) => (
                <View key={colIdx} style={styles.serviceCol}>
                  {col.map((srv, idx) => (
                    <ServiceTag key={idx} {...srv} />
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Tabs */}
        <View
          style={styles.tabBar}
          onLayout={(e) => { tabBarY.current = e.nativeEvent.layout.y; }}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'intro' && styles.tabActive]}
            onPress={() => {
              setActiveTab('intro');
              scrollViewRef.current?.scrollTo({ y: introY.current - 56, animated: true });
            }}
          >
            <Text style={[styles.tabText, activeTab === 'intro' && styles.tabTextActive]}>
              상품소개
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'seller' && styles.tabActive]}
            onPress={() => {
              setActiveTab('seller');
              scrollViewRef.current?.scrollTo({ y: sellerY.current - 56, animated: true });
            }}
          >
            <Text style={[styles.tabText, activeTab === 'seller' && styles.tabTextActive]}>
              판매자 정보
            </Text>
          </TouchableOpacity>
        </View>

        {/* 상품소개 */}
        <View
          style={styles.tabContent}
          onLayout={(e) => { introY.current = tabBarY.current + e.nativeEvent.layout.y; }}
        >
          <Text style={styles.sectionTitle}>상품소개</Text>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>#신품급</Text>
            <Text style={styles.tag}>#즉시설치</Text>
            <Text style={styles.tag}>#빠른대응</Text>
          </View>
          <Text style={styles.description}>
            접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H 판매합니다.{'\n\n'}
            [신품급 상태 / 즉시 설치 가능 / 마지막 재고 1대]{'\n\n'}
            정밀 측정 장비 교체로 인해 래쇼날 CS-3020H 비디오메타 한 대를 정리합니다.{'\n\n'}
            접촉식 + 비접촉식 검용 모델이라 다양한 소재·형상의 치수 측정에 활용 가능하며, 실사용 시간이 적어 신품급 상태를 유지하고 있습니다.{'\n\n'}
            *상태 및 특징{'\n'}
            - 신품급 컨디션 (렌즈·XYZ 축·테이블 모두 양호){'\n'}
            - 즉시 설치 가능 — 현장 설치 지원 가능{'\n'}
            - 정확한 반복 측정, 비접촉 측정 속도 우수{'\n'}
            - 접촉식 프로브 포함{'\n\n'}
            현재 보유한 마지막 매물입니다.{'\n\n'}
            장비 테스트 동영상 및 추가 사진 요청하시면 바로 보내드립니다.{'\n'}
            필요하시면 사전 점검 내역도 함께 전달드리겠습니다.{'\n'}
            궁금하신 사항이나 견적 협의는 편하게 문의 주세요.
          </Text>
          <Text style={styles.timeAgo}>53분 전</Text>
        </View>

        {/* 판매자 정보 */}
        <View
          style={styles.tabContent}
          onLayout={(e) => { sellerY.current = tabBarY.current + e.nativeEvent.layout.y; }}
        >
          <Text style={styles.sectionTitle}>판매자 정보</Text>
          <View style={styles.sellerInfoTable}>
            {SELLER_INFO.map((info) => (
              <View key={info.label} style={styles.sellerInfoRow}>
                <Text style={styles.sellerInfoLabel}>{info.label}</Text>
                <Text style={styles.sellerInfoValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareButton}>
          <ShareIcon width={20} height={20} color={colors.G600} />
          <Text style={styles.shareCount}>25</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
          <View style={{ marginTop: 2}}>
          <PhoneIcon width={24} height={24} color="#FFFFFF" />
          </View>
          <Text style={styles.contactButtonText}>문의전화: 0505-4894-4981</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  imageSlider: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
    backgroundColor: colors.G100,
  },
  productImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
  },
  paginationBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  paginationText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.white,
  },
  productInfo: {
    paddingHorizontal: PADDING_LR,
    paddingTop: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    lineHeight: 26,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: colors.G500,
  },
  statDivider: {
    fontSize: 12,
    color: colors.G300,
    marginHorizontal: 6,
  },
  sellerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.G200,
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  sellerPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sellerPhone: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.G600,
  },
  specTable: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    gap: 10,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specLabel: {
    width: 70,
    fontSize: 13,
    color: colors.G500,
  },
  specValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  serviceToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  serviceToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  serviceGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  serviceCol: {
    flex: 1,
    gap: 4,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 6,
    borderTopColor: colors.G100,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.G200,
  },
  tabActive: {
    borderBottomColor: colors.black,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G500,
  },
  tabTextActive: {
    color: colors.black,
    fontWeight: '700',
  },
  tabContent: {
    paddingHorizontal: PADDING_LR,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    fontSize: 14,
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G700,
    lineHeight: 22,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.G500,
    marginTop: 16,
  },
  sellerInfoTable: {
    backgroundColor: colors.G100,
    borderRadius: 8,
    padding: 16,
  },
  sellerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  sellerInfoLabel: {
    width: 90,
    fontSize: 13,
    color: colors.G500,
  },
  sellerInfoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: PADDING_LR,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    gap: 12,
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: 8,
    gap: 2,
  },
  shareCount: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.G600,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 44,
    flex: 1,
    borderRadius: 8,
    gap: 4,
    marginLeft: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});

