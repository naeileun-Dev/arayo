import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { NewsCard, type NewsItem } from './components/NewsCard';
import type { RootStackParamList } from '../../types';

// Mock Data
const MOCK_NEWS: NewsItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  title: '[현장] 지금 제조 현장에서 중고 기계가 주목받는 이유 - 설비 비용 고민, 중고 기계로 해법 찾는다',
  date: '2025.12.12',
  content: `최근 제조 현장에서 중고 기계에 대한 관심이 빠르게 높아지고 있다. 경기 불확실성과 원자재 가격 상승, 인건비 부담이 겹치면서 신규 설비 투자에 대한 부담이 커진 것이 가장 큰 이유다. 과거에는 신품 설비가 기본 선택지였다면, 이제는 중고 기계를 통한 합리적인 설비 구축이 하나의 전략으로 자리 잡고 있다.

특히 중소·중견 제조사를 중심으로 이러한 흐름은 더욱 뚜렷하다. 대규모 설비 투자가 부담스러운 상황에서, 필요한 성능을 충족하면서도 비용을 절감할 수 있는 중고 기계는 현실적인 대안으로 평가받고 있다. 실제 현장에서는 "신품 대비 절반 이하 비용으로 바로 투입 가능한 설비를 확보할 수 있다"는 점이 중고 기계 선택의 핵심 이유로 꼽힌다.

중고 기계 시장에 대한 인식도 과거와는 크게 달라졌다. 예전에는 중고 설비에 대해 노후화나 성능 저하에 대한 우려가 컸지만, 최근에는 관리 이력이 명확하고 상태가 검증된 매물들이 늘어나면서 신뢰도가 높아지고 있다. 사용 시간이 짧거나 특정 프로젝트에만 사용된 '신품급 중고' 설비도 다수 유통되며, 실질적인 선택 폭이 넓어졌다.

제조 현장의 변화도 중고 기계 수요 확대에 영향을 미치고 있다. 생산 품목의 다변화, 소량 다품종 생산 환경이 일반화되면서 모든 공정을 신품 설비로 구성하기보다는 필요한 공정에 맞춰 유연하게 설비를 구성하려는 움직임이 늘고 있다. 이 과정에서 특정 공정에 최적화된 중고 설비는 효율적인 선택지로 주목받는다.

또 하나 주목할 변화는 중고 기계 거래 방식이다. 과거에는 오프라인 중심의 제한적인 거래가 일반적이었지만, 최근에는 온라인 플랫폼을 통한 거래가 빠르게 확산되고 있다. 플랫폼에서는 기계 사양, 이미지, 가격 정보는 물론 판매자 정보까지 한눈에 비교할 수 있어 정보 탐색에 드는 시간이 크게 줄었다. 여기에 전문 상담과 1:1 채팅 기능이 더해지며, 구매 결정 과정도 한층 간소화되고 있다.

업계 관계자는 "중고 기계 거래에서 가장 중요한 요소는 정보의 신뢰성"이라며 "검증된 판매자와 투명한 정보 제공이 가능한 플랫폼을 중심으로 거래가 재편되고 있다"고 설명했다. 실제로 최근에는 판매자 인증, 매물 검수, 거래 후기 시스템 등을 강화하는 플랫폼들이 늘어나며 시장의 신뢰도를 끌어올리고 있다.

중고 기계의 활용 범위도 점차 확대되는 추세다. 단순 보조 설비를 넘어 CNC, 측정기, 자동화 설비 등 고가 장비까지 중고 시장에서 활발히 거래되고 있다. 이는 기술 발전 속도가 빨라지면서 설비의 물리적 수명보다 교체 주기가 짧아진 점도 한 요인으로 분석된다. 여전히 사용 가능하지만 교체된 설비들이 중고 시장으로 유입되며, 구매자 입장에서는 합리적인 선택지가 늘어난 셈이다.

전문가들은 당분간 중고 기계 시장의 성장세가 이어질 것으로 전망하고 있다. 설비 투자에 대한 부담은 쉽게 줄어들기 어렵고, 생산 환경은 점점 더 유연성을 요구하고 있기 때문이다. 이러한 흐름 속에서 중고 기계는 단순한 '대안'이 아닌, 제조 현장의 전략적 선택지로 자리매김하고 있다.`,
}));

interface IndustryNewsScreenProps {
  news?: NewsItem[];
  isLoading?: boolean;
}

export const IndustryNewsScreen: React.FC<IndustryNewsScreenProps> = ({
  news = MOCK_NEWS,
  isLoading = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNewsPress = (item: NewsItem) => {
    navigation.navigate('IndustryNewsDetail', { news: item });
  };

  // 2열 그리드로 변환
  const rows: NewsItem[][] = [];
  for (let i = 0; i < news.length; i += 2) {
    rows.push(news.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>산업소식</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 섹션 타이틀 */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>산업소식</Text>
          <Text style={styles.sectionDesc}>
            업계 트렌드와 최신 동향을 빠르게 만나보세요.
          </Text>
        </View>

        {/* 뉴스 그리드 */}
        <View style={styles.newsGrid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.newsRow}>
              {row.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                  onPress={() => handleNewsPress(item)}
                />
              ))}
              {row.length === 1 && <View style={styles.emptyCard} />}
            </View>
          ))}
        </View>

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={colors.G400} />
            <Text style={styles.loadingText}>전체 소식을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G600,
    lineHeight: 20,
  },
  newsGrid: {
    paddingHorizontal: 20,
  },
  newsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  emptyCard: {
    flex: 1,
  },
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G500,
  },
  bottomSpacer: {
    height: 20,
  },
});

