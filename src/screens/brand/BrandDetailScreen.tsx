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
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import HeartIcon from '../../assets/icon/heart.svg';
import CommentIcon from '../../assets/icon/comment.svg';
import StarIcon from '../../assets/icon/star.svg';
import PhoneIcon from '../../assets/icon/phone.svg';
import { BrandHeader } from './components/BrandHeader';
import { RatingBreakdown } from '../../components/common';
import type { RootStackParamList } from '../../types';

const { width: SW } = Dimensions.get('window');
const PD = 20;
const GAP = 10;
const GRID_W = (SW - PD * 2 - GAP) / 2;
const INTRO_W = (SW - PD) * 0.48;

const banner = require('../../assets/images/banner03.png');
const prodImg = require('../../assets/images/img01.png');
const avatar = require('../../assets/images/user01.png');

const mockProducts = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  title: '로타리테이블 TRB/TRBH140 - JNC 기반 2축 NC',
}));

const mockIntro = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  title: '로타리테이블 TRB/TRBH140 - JNC 기반 2축 NC',
  desc: '경량의 컴팩트한 구조로 소형 머시닝',
  tags: '#누유무 #톱날교체용이',
}));

const mockNews = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 1),
  title: '[현장] 지금 제조 현장에서 중고 기계가 주목받는 이유 - 설비 비용 고민, 중고 기계로 해법 찾는다',
  date: '2024.01.01',
}));

const mockReviews = Array.from({ length: 2 }, (_, i) => ({
  id: String(i + 1),
  userName: '닉네임',
  rating: 4,
  date: '2020.02.02',
  productName: '화천기계',
  price: '2,400,000',
  viewCount: 1,
  content: '작업자가 하루에도 수십 번 치수를 확인해야 하는 편인데, 이 장비로 바꾼 뒤로 작업 효율이 확실히 올라갔습니다.\nUI도 직관적이고, 프로그램 세팅이 간단해서 숙련도가 낮은 작업자도 금방 적응했습니다.',
  images: Array(6).fill(prodImg),
}));

const ReviewCard = ({ item }: { item: typeof mockReviews[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={s.reviewCard}>
      <View style={s.reviewHeader}>
        <Image source={avatar} style={s.reviewAvatar} />
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
          ['상품명', item.productName],
          ['상품금액', item.price],
          ['조회수', item.viewCount],
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

export const BrandDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BrandDetail'>>();
  const brandId = route.params?.brandId || '1';

  return (
    <SafeAreaView style={s.container}>
      <BrandHeader brandId={brandId} />

      <ScrollView style={s.scroll} showsVerticalScrollIndicator={false}>
        <Image source={banner} style={s.banner} resizeMode="cover" />

        <View style={s.section}>
          <Text style={s.secTitle}>신제품</Text>
          <View style={s.grid}>
            {mockProducts.map((item) => (
              <TouchableOpacity key={item.id} style={s.gridItem} activeOpacity={0.7}>
                <View style={s.gridImgWrap}>
                  <Image source={prodImg} style={s.gridImg} resizeMode="cover" />
                </View>
                <Text style={s.gridTitle} numberOfLines={2}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.secTitle}>인기 많은 제품</Text>
          <View style={s.grid}>
            {mockProducts.map((item, i) => (
              <TouchableOpacity key={item.id} style={s.gridItem} activeOpacity={0.7}>
                <View style={s.gridImgWrap}>
                  <Image source={prodImg} style={s.gridImg} resizeMode="cover" />
                </View>
                <View style={s.gridCon}>
                  <Text style={s.best}>BEST</Text>
                  <Text style={s.gridTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={s.meta}>
                    <HeartIcon width={20} height={20} color="#515151" />
                    <Text style={s.metaNum}>21</Text>
                    <CommentIcon width={20} height={20} color="#515151" />
                    <Text style={s.metaNum}>0</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <View style={s.secHeader}>
            <Text style={s.secTitle}>제품 소개</Text>
            <TouchableOpacity><Text style={s.viewAll}>전체보기</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {mockIntro.map((item) => (
              <TouchableOpacity key={item.id} style={s.introItem} activeOpacity={0.7}>
                <View style={s.introImgWrap}>
                  <Image source={prodImg} style={s.introImg} resizeMode="cover" />
                </View>
                <View style={s.introCon}>
                  <Text style={s.introTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={s.introDesc} numberOfLines={1}>{item.desc}</Text>
                  <Text style={s.introTags}>{item.tags}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={s.section}>
          <Text style={s.secTitle}>새로운 산업소식</Text>
          <View style={s.newsList}>
            {mockNews.map((item) => (
              <TouchableOpacity key={item.id} style={s.newsItem} activeOpacity={0.7}>
                <Text style={s.newsTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={s.newsDate}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <View style={[s.row, { gap: 6, marginBottom: 12 }]}>
            <Text style={s.secTitle}>리뷰</Text>
            <StarIcon width={20} height={20} color="#FBBC04" style={{ marginTop: 2 }} />
            <Text style={s.secTitle}>4.2 (2)</Text>
          </View>

          <View style={s.blueBox}>
            <Text style={s.blueText}>
              이 판매자와 거래한 <Text style={{ color: '#0F53FF' }}>고객들의 후기</Text>를 확인해보세요.
            </Text>
          </View>

          <RatingBreakdown />

          <View style={{ gap: 15 }}>
            {mockReviews.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={s.bottomBar}>
        <TouchableOpacity style={s.contactBtn} activeOpacity={0.8}>
          <PhoneIcon width={23} height={23} color={colors.white} />
          <Text style={s.contactText}>문의전화 : 0505-4894-4981</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { flex: 1 },
  banner: { width: SW, height: SW * 0.56 },
  section: { paddingHorizontal: PD, paddingTop: 25 },
  secTitle: { fontSize: 18, fontWeight: '600', color: colors.black },
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  viewAll: { fontSize: 13, color: colors.G600 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginTop: 12 },
  gridItem: { width: GRID_W, borderWidth: 1, borderColor: colors.G200, borderRadius: 4, overflow: 'hidden', paddingBottom: 12 },
  gridImgWrap: { width: GRID_W, height: GRID_W, backgroundColor: colors.G100 },
  gridImg: { width: '100%', height: '100%' },
  gridCon: { paddingTop: 10, paddingHorizontal: 10, gap: 6 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: colors.black, lineHeight: 20, marginTop: 8, paddingHorizontal: 10 },
  best: { fontSize: 10, fontWeight: '500', color: '#E53935' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  metaNum: { fontSize: 12, fontWeight: '500', color: '#515151', marginRight: 8 },

  introItem: { width: INTRO_W, borderWidth: 1, borderColor: colors.G200, borderRadius: 4, overflow: 'hidden', paddingBottom: 10 },
  introImgWrap: { width: '100%', height: INTRO_W, backgroundColor: colors.G100 },
  introImg: { width: '100%', height: '100%' },
  introCon: { paddingTop: 10, paddingHorizontal: 8, gap: 4 },
  introTitle: { fontSize: 14, fontWeight: '700', color: colors.black, lineHeight: 20 },
  introDesc: { fontSize: 14, color: colors.G600, lineHeight: 20 },
  introTags: { fontSize: 14, color: colors.G600 },

  newsList: { borderTopWidth: 1, borderTopColor: colors.G200, marginTop: 12 },
  newsItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.G200 },
  newsTitle: { flex: 1, fontSize: 14, color: colors.black, marginRight: 12 },
  newsDate: { fontSize: 12, color: colors.G500 },

  blueBox: { backgroundColor: '#F3F6FF', padding: 15, borderRadius: 4, marginBottom: 15 },
  blueText: { fontSize: 14, color: colors.G700 },

  reviewCard: { borderBottomWidth: 1, borderBottomColor: colors.G200, paddingBottom: 15 },
  reviewHeader: { flexDirection: 'row', marginBottom: 12 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.G200, marginRight: 12 },
  reviewHeaderInfo: { flex: 1, gap: 10 },
  reviewUserName: { fontSize: 14, fontWeight: '600', color: colors.black },
  reviewDate: { fontSize: 12, color: colors.G500 },
  reviewRating: { fontSize: 13, fontWeight: '500', color: colors.black },
  reviewTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  reviewTag: { flexDirection: 'row', gap: 5, backgroundColor: colors.G100, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  tagLabel: { fontSize: 12, color: colors.G500 },
  tagValue: { fontSize: 12, fontWeight: '500', color: colors.black },
  reviewImg: { width: 122, height: 122, borderRadius: 4, backgroundColor: colors.G100 },
  reviewContent: { fontSize: 14, color: colors.G700, lineHeight: 20 },
  moreBtn: { fontSize: 13, color: colors.G600, textDecorationLine: 'underline' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.white, paddingHorizontal: PD, paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    borderTopWidth: 1, borderTopColor: colors.G200,
  },
  contactBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: colors.primary, height: 40, borderRadius: 4 },
  contactText: { fontSize: 14, fontWeight: '600', color: colors.white },
});

