import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, screenPadding, borderRadius } from '../../styles/spacing';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import GearsIcon from '../../assets/icon/gears.svg';
import PhoneIcon from '../../assets/icon/phone.svg';
import StarIcon from '../../assets/icon/star.svg';
import { RatingBreakdown } from '../../components/common';

const { width: SW } = Dimensions.get('window');
const PD = screenPadding.horizontal;
const GAP = 10;
const GRID_W = (SW - PD * 2 - GAP) / 2;

const IMG = require('../../assets/images/img01.png');
const AVATAR = require('../../assets/images/user01.png');

const mockEquipment = [
  { id: '1', name: '머시닝 센터', count: '보유수 2대', desc: '머시닝 센터 판매합니다.' },
  { id: '2', name: 'CNC 선반', count: '보유수 3대', desc: 'CNC 선반 판매합니다.' },
  { id: '3', name: '밀링기', count: '보유수 1대', desc: '밀링기 판매합니다.' },
  { id: '4', name: '연삭기', count: '보유수 2대', desc: '연삭기 판매합니다.' },
];

const mockCerts = [
  { id: '1', name: 'ISO 9001', desc: '품질경영시스템 인증' },
  { id: '2', name: 'ISO 14001', desc: '환경경영시스템 인증' },
  { id: '3', name: 'KMVSS', desc: '자동차 안전기준 인증' },
  { id: '4', name: '국토교통부', desc: '건설기계 제작 인증' },
];

const mockPatents = [
  { id: '1', name: '특허 제 10-1234567호', desc: '정밀 가공 장치 및 방법' },
  { id: '2', name: '특허 제 10-7654321호', desc: '자동화 절삭 시스템' },
  { id: '3', name: '실용신안 제 20-1234567호', desc: '공구 고정 장치' },
  { id: '4', name: '디자인 제 30-1234567호', desc: '산업용 로봇 외관' },
];

const mockReviews = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  userName: '닉네임',
  rating: 4,
  date: '2020.02.02',
  price: '2,400,000',
  content: '작업자가 하루에도 수십 번 치수를 확인해야 하는 편인데, 이 장비로 바꾼 뒤로 작업 효율이 확실히 올라갔습니다.\nUI도 직관적이고, 프로그램 세팅이 간단해서 숙련도가 낮은 작업자도 금방 적응했습니다.',
  images: Array(4).fill(IMG),
}));

const ReviewCard = ({ item }: { item: typeof mockReviews[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={s.reviewCard}>
      <View style={s.reviewHeader}>
        <Image source={AVATAR} style={s.reviewAvatar} />
        <View style={s.reviewHeaderInfo}>
          <View style={s.row}>
            <Text style={s.reviewUserName}>{item.userName}</Text>
            <Text style={s.reviewDate}>{item.date}</Text>
          </View>
          <View style={s.row}>
            <StarIcon width={14} height={14} color="#FBBC04" />
            <Text style={s.reviewRating}>{item.rating}</Text>
          </View>
        </View>
      </View>

      <View style={s.reviewTags}>
        {[
          ['상품금액', item.price],
        ].map(([label, value]) => (
          <View key={label} style={s.reviewTag}>
            <Text style={s.tagLabel}>{label}</Text>
            <Text style={s.tagValue}>{value}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, marginBottom: 12 }}>
        {item.images.map((img, i) => (
          <Image key={i} source={img} style={s.reviewImg} />
        ))}
      </ScrollView>

      <Text style={s.reviewContent} numberOfLines={expanded ? undefined : 3}>{item.content}</Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ marginTop: 10 }}>
        <Text style={s.moreBtn}>{expanded ? '접기' : '더보기'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProcessingCompanyDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          style={s.headerBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>업체 상세</Text>
        <View style={s.headerBtn} />
      </View>

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Dark Banner with centered logo */}
        <View style={s.darkBanner}>
          <View style={s.bannerLogoRow}>
            <GearsIcon width={36} height={36} color={colors.primary} />
            <View style={s.bannerLogoTextWrap}>
              <Text style={s.bannerLogoTitle}>아라요</Text>
              <Text style={s.bannerLogoSub}>기계장터</Text>
            </View>
          </View>
        </View>

        {/* Square Logo — 배너 하단에 절반 걸침 */}
        <View style={s.profileSection}>
          <View style={s.companyLogoWrap}>
            <GearsIcon width={36} height={36} color={colors.G400} />
          </View>
        </View>

        {/* Company Name & Location */}
        <View style={s.companyInfoSection}>
          <Text style={s.companyName}>아라요 기계장터</Text>
          <View style={s.locationRow}>
            <Text style={s.companyLocation}>서울시 마포구</Text>
          </View>
        </View>

        {/* Description */}
        <View style={s.descSection}>
          <Text style={s.descText}>
            산업 현장에서 필요한 기계를 합리적으로 연결합니다. 다년간의 현장 경험을 바탕으로, 중고 기계의 상태와 정보를 투명하게 제공하며 구매자와 판매자가 안심하고 거래할 수 있는 환경을 만들어 가고 있습니다.
          </Text>
        </View>

        {/* Tags */}
        <View style={s.tagsSection}>
          <Text style={s.tagsText}>
            화천기계, 대성하이텍, FFG DMC, 기어테크, 성우산업, 원공사, 닐피스코리아
          </Text>
        </View>

        {/* Phone CTA */}
        <View style={s.phoneCta}>
          <View style={s.phoneIconWrap}>
            <PhoneIcon width={52} height={52} color={colors.white} />
          </View>
          <View style={s.phoneTextWrap}>
            <Text style={s.phoneCtaLabel}>아라요 기계장터에게 원하는 견적을 받아보세요.</Text>
            <Text style={s.phoneCtaNumber}>0501-2345-6789</Text>
          </View>
        </View>

        {/* 기업 소개글 */}
        <View style={s.section}>
          <Text style={s.secTitle}>기업 소개글</Text>
          <Text style={s.introText}>
            아라요 기계장터는 다양한 산업기계의 임가공 서비스를 제공하는 전문 업체입니다. 정밀 가공부터 대형 구조물 가공까지 폭넓은 경험과 최신 장비를 보유하고 있습니다.{'\n\n'}
            고객의 요구에 맞춤형 솔루션을 제공하며, 품질과 납기를 최우선으로 합니다. ISO 인증을 획득하여 체계적인 품질 관리 시스템을 운영하고 있으며, 지속적인 기술 혁신을 통해 최고의 가공 서비스를 제공합니다.
          </Text>
        </View>

        {/* 회사소개서 */}
        <View style={s.section}>
          <Text style={s.secTitle}>회사소개서</Text>
          <Image source={IMG} style={s.companyIntroImg} resizeMode="cover" />
        </View>

        {/* 임가공 이미지 */}
        <View style={s.section}>
          <Text style={s.secTitle}>임가공 이미지</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {Array(4).fill(null).map((_, i) => (
              <Image key={i} source={IMG} style={s.processingImg} resizeMode="cover" />
            ))}
          </ScrollView>
        </View>

        {/* 보유장비 */}
        <View style={s.section}>
          <Text style={s.secTitle}>보유장비</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {mockEquipment.map((item) => (
              <View key={item.id} style={s.equipmentCard}>
                <View style={s.equipmentImgWrap}>
                  <Image source={IMG} style={s.equipmentImg} resizeMode="cover" />
                </View>
                <View style={s.equipmentInfo}>
                  <View style={s.equipmentTag}>
                    <Text style={s.equipmentTagText}>{item.count}</Text>
                  </View>
                  <Text style={s.equipmentName}>{item.name}</Text>
                  <Text style={s.equipmentDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 인증 */}
        <View style={s.section}>
          <Text style={s.secTitle}>인증</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {mockCerts.map((item) => (
              <View key={item.id} style={s.certCardH}>
                <View style={s.certImgWrap}>
                  <Image source={IMG} style={s.certImgH} resizeMode="cover" />
                </View>
                <View style={s.certInfoH}>
                  <Text style={s.equipmentName}>{item.name}</Text>
                  <Text style={s.equipmentDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 특허 */}
        <View style={s.section}>
          <Text style={s.secTitle}>특허</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {mockPatents.map((item) => (
              <View key={item.id} style={s.certCardH}>
                <View style={s.certImgWrap}>
                  <Image source={IMG} style={s.certImgH} resizeMode="cover" />
                </View>
                <View style={s.certInfoH}>
                  <Text style={s.equipmentName}>{item.name}</Text>
                  <Text style={s.equipmentDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 리뷰 */}
        <View style={s.section}>
          <View style={s.reviewTitleRow}>
            <Text style={s.secTitle}>리뷰</Text>
            <StarIcon width={24} height={24} color="#FBBC04"style={{ marginBottom: 10 }} />
            <Text style={s.secTitle}>4.2 (2)</Text>
          </View>

          <View style={s.blueBox}>
            <Text style={s.blueText}>
              이 업체와 거래한 <Text style={{ color: '#0F53FF' }}>고객들의 후기</Text>를 확인해보세요.
            </Text>
          </View>

          <RatingBreakdown />

          <View style={{ gap: 15 }}>
            {mockReviews.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </View>

          <TouchableOpacity style={s.moreReviewBtn} activeOpacity={0.7}>
            <Text style={s.moreReviewBtnText}>더 많은 리뷰 보기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={s.editBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProcessingCompanyWrite', { mode: 'edit' })}
        >
          <Text style={s.editBtnText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
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
  scroll: { flex: 1 },

  darkBanner: {
    backgroundColor: '#1B1B1B',
    paddingVertical: 40,
    paddingHorizontal: PD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerLogoTextWrap: {
    gap: 0,
  },
  bannerLogoTitle: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.white,
  },
  bannerLogoSub: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.G300,
  },

  profileSection: {
    paddingHorizontal: PD,
    marginTop: -35,
    marginBottom: 10,
    zIndex: 10,
  },
  companyLogoWrap: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  companyInfoSection: {
    paddingHorizontal: PD,
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyLocation: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.G500,
  },

  descSection: {
    paddingHorizontal: PD,
    marginBottom: 16,
  },
  descText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#7E7E7E',
    lineHeight: 22,
  },

  tagsSection: {
    marginHorizontal: PD,
    marginBottom: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: borderRadius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  tagsText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#7E7E7E',
    lineHeight: 20,
  },

  phoneCta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: PD,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    marginBottom: 10,
    height: 52,
    overflow: 'hidden',
  },
  phoneIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 0,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneTextWrap: {
    flex: 1,
    gap: 2,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  phoneCtaLabel: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    color: '#7E7E7E',
  },
  phoneCtaNumber: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.black,
  },

  section: { paddingHorizontal: PD, paddingTop: 25 },
  secTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },

  introText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.G700,
    lineHeight: 22,
  },

  companyIntroImg: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.sm,
  },

  processingImg: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.sm,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  equipmentCard: {
    width: 222,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  equipmentImgWrap: {
    padding: 12,
    paddingBottom: 0,
  },
  equipmentImg: {
    width: 198,
    height: 231,
    borderRadius: borderRadius.sm,
  },
  equipmentInfo: {
    padding: 10,
    gap: 6,
  },
  equipmentTag: {
    backgroundColor: '#FDF2F4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  equipmentTagText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.primary,
  },
  equipmentName: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  equipmentDesc: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#7E7E7E',
  },

  certCard: {
    width: GRID_W,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  certImg: {
    width: GRID_W,
    height: GRID_W * 1.14,
  },
  certName: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.black,
    padding: 10,
  },
  certCardH: {
    width: 222,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  certImgWrap: {
    padding: 12,
    paddingBottom: 0,
  },
  certImgH: {
    width: 198,
    height: 198,
    borderRadius: borderRadius.sm,
  },
  certInfoH: {
    padding: 10,
    gap: 4,
  },

  blueBox: {
    backgroundColor: '#F3F6FF',
    padding: 15,
    borderRadius: borderRadius.sm,
    marginBottom: 15,
  },
  blueText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.G700,
  },

  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    paddingBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.G200,
    marginRight: 12,
  },
  reviewHeaderInfo: { flex: 1, gap: 10 },
  reviewUserName: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.G500,
  },
  reviewRating: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  reviewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  reviewTag: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors.G100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tagLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.G500,
  },
  tagValue: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  reviewImg: {
    width: 122,
    height: 122,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.G100,
  },
  reviewContent: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.G700,
    lineHeight: 20,
  },
  moreBtn: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.G600,
    textDecorationLine: 'underline',
  },

  moreReviewBtn: {
    marginTop: 20,
    height: 46,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreReviewBtnText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.G700,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: PD,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  editBtn: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtnText: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.white,
  },
});
