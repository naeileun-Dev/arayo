import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import PhoneIcon from '../../assets/icon/phone.svg';
import { BrandHeader } from './components/BrandHeader';
import type { RootStackParamList } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;

const companyImage = require('../../assets/images/img02.png');
const mapImage = require('../../assets/images/banner01.png');

interface BrandInfo {
  name: string;
  slogan: string;
  address: string;
  email: string;
  phone: string;
  contactPhone: string;
  products: string[];
  description: string;
}

const BRAND_INFO: BrandInfo = {
  name: '(주)스마트기계',
  slogan: '산업 현장에서 필요한 기계를 합리적으로 연결합니다.',
  address: '경기도 화성시 팔탄면 푸른들판로 725',
  email: 'kyun321@daum.net',
  phone: '0504-1383-5656',
  contactPhone: '0505-4894-4981',
  products: ['닐피스코리아', '화천기계', '대성하이텍', 'FFG DMC', '기어테크', '성우산업', '원공사'],
  description: `저희는 산업 현장에서 실제로 사용되는 기계와 설비를 중심으로 중고 기계 유통 및 컨설팅을 진행하는 전문 기업입니다.

다년간의 현장 경험을 바탕으로, 단순한 중고 판매가 아닌 기계 상태·사양 이력·설치 환경까지 고려한 거래를 중요하게 생각하고 있습니다. 모든 기계는 입고 시 기본 점검을 거쳐 주요 사양과 상태를 명확히 안내하며, 구매자가 충분히 검토한 후 선택할 수 있도록 필요한 정보를 투명하게 제공합니다. 또한 CNC, 측정기, 공작기계 등 다양한 산업 설비를 취급하며, 현장 용도에 맞는 장비를 제안하는 데 강점을 가지고 있습니다.`,
};

export const BrandAboutScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandAbout'>>();
  const brandId = route.params?.brandId || '1';

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} currentPage="about" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <View style={styles.sectionTitleWrap}>
          <Text style={styles.sectionTitle}>회사소개</Text>
          <Text style={styles.sectionTitleEn}>About us</Text>
        </View>

        {/* Company Name */}
        <View style={styles.contentSection}>
          <Text style={styles.companyName}>{BRAND_INFO.name}</Text>
          <Text style={styles.companySlogan}>{BRAND_INFO.slogan}</Text>
        </View>

        {/* Company Image */}
        <View style={styles.imageSection}>
          <Image source={companyImage} style={styles.companyImage} resizeMode="cover" />
        </View>

        {/* Contact Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>주소</Text>
            <Text style={styles.infoValue}>{BRAND_INFO.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoValueLink}>{BRAND_INFO.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>문의전화</Text>
            <Text style={styles.infoValue}>{BRAND_INFO.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>주요제품</Text>
            <View style={styles.productTags}>
              {BRAND_INFO.products.map((product, idx) => (
                <View key={idx} style={styles.productTag}>
                  <Text style={styles.productTagText}>{product}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>{BRAND_INFO.description}</Text>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <Text style={styles.mapTitle}>찾아오시는 길</Text>
          <View style={styles.mapImageWrap}>
            <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Contact Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.contactButton} activeOpacity={0.8}>
          <PhoneIcon width={18} height={18} color={colors.white} />
          <Text style={styles.contactButtonText}>문의전화: {BRAND_INFO.contactPhone}</Text>
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
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingHorizontal: PADDING_LR,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  sectionTitleEn: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G400,
  },
  contentSection: {
    paddingHorizontal: PADDING_LR,
    paddingTop: 20,
    paddingBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 6,
  },
  companySlogan: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G600,
    lineHeight: 20,
  },
  imageSection: {
    paddingHorizontal: PADDING_LR,
    marginBottom: 20,
  },
  companyImage: {
    width: SCREEN_WIDTH - PADDING_LR * 2,
    height: (SCREEN_WIDTH - PADDING_LR * 2) * 0.6,
    borderRadius: 8,
    backgroundColor: colors.G100,
  },
  infoSection: {
    paddingHorizontal: PADDING_LR,
    gap: 14,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: 70,
    fontSize: 14,
    fontWeight: '400',
    color: colors.G500,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  infoValueLink: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  productTags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  productTag: {
    backgroundColor: colors.G100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  productTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
  },
  descriptionSection: {
    paddingHorizontal: PADDING_LR,
    paddingVertical: 20,
    backgroundColor: colors.G100,
    marginHorizontal: PADDING_LR,
    borderRadius: 8,
    marginBottom: 30,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G700,
    lineHeight: 22,
  },
  mapSection: {
    paddingHorizontal: PADDING_LR,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 16,
  },
  mapImageWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapImage: {
    width: SCREEN_WIDTH - PADDING_LR * 2,
    height: 200,
    backgroundColor: colors.G100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: PADDING_LR,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: colors.primary,
    height: 40,
    borderRadius: 4,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});

