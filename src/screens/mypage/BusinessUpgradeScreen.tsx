import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import UploadIcon from '../../assets/icon/upload.svg';
import ShieldIcon from '../../assets/icon/shield.svg';
import HomeIcon from '../../assets/icon/home.svg';
import BuildingIcon from '../../assets/icon/building.svg';
import CrownIcon from '../../assets/icon/crown.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

export default function BusinessUpgradeScreen({ navigation }: any) {
  const [selectedPlan, setSelectedPlan] = useState<'biz_normal' | 'biz_gold'>('biz_normal');

  const handleSubmit = () => {
    console.log('선택된 플랜:', selectedPlan);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeftIcon width={24} height={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>판매내역</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.introText}>
          기업회원으로 전환하여{'\n'}
          상품 등록부터 판매 관리까지{'\n'}
          모든 기능을 활용해보세요.
        </Text>

        <View style={styles.planContainer}>
          <TouchableOpacity
            style={[
              styles.box,
              selectedPlan === 'biz_normal' && styles.boxActive,
            ]}
            onPress={() => setSelectedPlan('biz_normal')}
            activeOpacity={0.9}
          >
            <Text style={styles.title}>일반기업회원</Text>

            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>상품 등록 가능 (최대 3개)</Text>
              </View>
              <View style={styles.benefitRow}>
                <ShieldIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>안심번호 제공</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceFreeText}>무료 </Text>
              <Text style={styles.priceSubText}>/연간</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.box,
              selectedPlan === 'biz_gold' && styles.boxActive,
            ]}
            onPress={() => setSelectedPlan('biz_gold')}
            activeOpacity={0.9}
          >
            <View style={[
              styles.tag,
              selectedPlan === 'biz_gold' && styles.tagActive,
            ]}>
              <Text style={styles.tagText}>6개월 무료체험</Text>
            </View>

            <View style={styles.goldTitleRow}>
              <Text style={[styles.title, { marginBottom: 0 }]}>골드기업회원</Text>
              <CrownIcon
                width={40}
                height={40}
                color="#fff"
                style={styles.crownMark}
              />
            </View>

            <View style={styles.benefitList}>
              <View style={styles.benefitRow}>
                <UploadIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>상품 등록 가능 (무제한)</Text>
              </View>
              <View style={styles.benefitRow}>
                <ShieldIcon width={14} height={14} color="#fff" />
                <Text style={styles.benefitText}>안심번호 제공</Text>
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
          </TouchableOpacity>
        </View>

        <View style={styles.formBtnSet}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {selectedPlan === 'biz_normal' ? '전환하기' : '6개월 무료체험 시작하기'}
            </Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 50,
    justifyContent: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerTitle: {
    ...typography.h4,
    fontWeight: '800',
    color: colors.black,
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
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.G600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagActive: {
    backgroundColor: colors.primary,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
  },
  goldTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    position: 'relative',
  },
  crownMark: {
    position: 'absolute',
    right: -8,
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
  priceFreeText: {
    ...typography.h4,
    color: colors.white,
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
  formBtnSet: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  submitButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
