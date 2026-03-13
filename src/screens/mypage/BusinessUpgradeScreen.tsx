import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import UploadIcon from '../../assets/icon/upload.svg';
import BoxIcon from '../../assets/icon/box.svg';
import HomeIcon from '../../assets/icon/home.svg';
import BuildingIcon from '../../assets/icon/building.svg';
import CrownIcon from '../../assets/icon/crown.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import Header from '../../components/common/Header';

export default function BusinessUpgradeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="기업회원 전환" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.introText}>
          기업회원으로 전환하여{'\n'}
          상품 등록부터 판매 관리까지{'\n'}
          모든 기능을 활용해보세요.
        </Text>

        <View style={styles.planContainer}>
          <View style={styles.box}>
            <Text style={styles.title}>일반기업회원</Text>

            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>상품 등록 가능</Text>
              </View>
              <View style={styles.benefitRow}>
                <BoxIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>판매 상품 수 최대 3개</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.statusBadge}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BusinessUpgradeFormNormal')}
            >
              <Text style={styles.statusBadgeText}>이용중</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.box, styles.boxActive]}>
            <View style={[styles.tag, styles.tagActive]}>
              <CrownIcon width={20} height={20} color="#fff" />
              <Text style={styles.tagText}>6개월 무료체험</Text>
            </View>

            <Text style={styles.title}>골드기업회원</Text>

            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>상품 등록 가능</Text>
              </View>
              <View style={styles.benefitRow}>
                <BoxIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>판매 상품 수 최대 3개</Text>
              </View>
              <View style={styles.benefitRow}>
                <HomeIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>미니 홈페이지 제공</Text>
              </View>
              <View style={styles.benefitRow}>
                <BuildingIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>브랜드관 회사 홍보</Text>
              </View>
            </View>

            <View style={styles.goldPriceRow}>
              <View style={styles.priceRow}>
                <Text style={styles.priceStrikeText}>₩ 990,000</Text>
                <Text style={styles.priceSubText}> /연간</Text>
              </View>
              <Text style={styles.priceArrow}>→</Text>
              <Text style={styles.priceFreeGoldText}>무료</Text>
            </View>

            <TouchableOpacity
              style={styles.goldButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BusinessUpgradeFormGold')}
            >
              <Text style={styles.goldButtonText}>₩ 990,000 /연간 -&gt; 무료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    paddingBottom: 40,
  },
  introText: {
    ...typography.h4,
    color: colors.white,
    textAlign: 'center',
    paddingVertical: 30,
    lineHeight: 26,
  },
  planContainer: {
    paddingHorizontal: 20,
    gap: 25,
  },
  box: {
    position: 'relative',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.G900,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  boxActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  tag: {
    position: 'absolute',
    top: -11,
    left: 15,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.G600,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tagActive: {
    backgroundColor: colors.primary,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 10,
  },
  benefitList: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 14,
    color: colors.white,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceSubText: {
    fontSize: 12,
    color: colors.G600,
  },
  goldPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 10,
  },
  priceStrikeText: {
    ...typography.h3,
    color: colors.G600,
    textDecorationLine: 'line-through',
  },
  priceArrow: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FBBC04',
  },
  priceFreeGoldText: {
    ...typography.h3,
    color: '#FBBC04',
  },
  statusBadge: {
    marginTop: 14,
    width: '100%',
    height: 46,
    borderRadius: 4,
    backgroundColor: colors.G100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.G400,
  },
  goldButton: {
    marginTop: 14,
    width: '100%',
    height: 46,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
});
