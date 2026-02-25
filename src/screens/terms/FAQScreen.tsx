import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  Linking,
  Clipboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';
import HeadsetIcon from '../../assets/icon/headset.svg';

// 안드로이드에서 LayoutAnimation 활성화
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { colors as COLORS } from '../../styles/colors';

const FAQ_CATEGORIES = ['전체', '계정/인증/로그인', '주문/결제', '판매/거래', '견적/문의'];

const FAQ_DATA = [
  {
    id: 1,
    category: '계정/인증/로그인',
    question: "카카오 계정으로 로그인 하면 '이미 카카오로 가입하신 이메일입니다' 라고 나오는데 어떻게 해야 하나요?",
    answer: "휴대전화 번호를 변경하셨거나 카카오톡 계정을 탈퇴하고 새로 가입하신 경우 이런 문제가 발생할 수 있습니다. 이 경우 새로운 정보가 반영될 수 있도록 번거로우시더라도 고객센터로 문의 부탁드립니다.\n\n아라요 기계장터 고객센터 02-2668-3094\n(운영 시간 : 평일 09:00~18:00)로 문의",
  },
  {
    id: 2,
    category: '계정/인증/로그인',
    question: "비밀번호를 분실했어요. 어떻게 찾을 수 있나요?",
    answer: "로그인 화면 하단의 '비밀번호 찾기'를 통해 등록하신 이메일 또는 휴대폰 번호로 임시 비밀번호를 발급받으실 수 있습니다.",
  },
  {
    id: 3,
    category: '주문/결제',
    question: "제품의 자세한 정보를 알고 싶어요",
    answer: "상품 상세 페이지에서 판매자에게 '채팅하기' 또는 '전화하기'를 통해 직접 문의하실 수 있습니다.",
  },
  {
    id: 4,
    category: '주문/결제',
    question: "제품이 불량일 때는?",
    answer: "수령 후 7일 이내에 고객센터 또는 판매자에게 연락하여 교환/반품 절차를 진행해 주시기 바랍니다.",
  },
  {
    id: 5,
    category: '판매/거래',
    question: "동일한 게시글을 올려서 내 게시글이 미노출 됐어요",
    answer: "중복 게시물 정책에 따라 동일한 상품을 여러 번 등록하는 것은 제한됩니다. 미노출 해제를 원하시면 기존 게시글을 삭제 후 재등록 하시거나, 고객센터로 소명 요청을 접수해 주세요.",
  },
];

export default function FAQScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [activeCategory, setActiveCategory] = useState('전체');
  const [expandedId, setExpandedId] = useState<number | null>(1); // 첫 번째 항목 기본 오픈

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyPhone = () => {
    Clipboard.setString('02-2668-3094');
    Alert.alert('복사 완료', '고객센터 전화번호가 복사되었습니다.');
  };

  const filteredFaq = activeCategory === '전체' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>자주하는 질문</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 상단 타이틀 */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>안녕하세요, 무엇을 도와드릴까요?</Text>
        </View>

        {/* 상단 퀵 링크 영역 (질문 리스트) */}
        <View style={styles.quickLinks}>
          {['제품의 자세한 정보를 알고 싶어요', '제품이 불량일 때는?', '결제 방법은 어떤 것이 있나요?', '주문 후 결제 방법을 변경하고 싶은데 어떻게 해야 하나요?', '동일한 게시글을 올려서 내 게시글이 미노출 됐어요'].map((text, index) => (
            <TouchableOpacity key={index} style={styles.quickLinkItem}>
              <View style={styles.quickLinkIcon}><Text style={styles.quickLinkIconText}>?</Text></View>
              <Text style={styles.quickLinkText}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 고객센터 정보 영역 */}
        <View style={styles.csBox}>
          <View style={styles.csHeader}>
            <Text style={styles.csTitle}>고객센터</Text>
            <Text style={styles.csTime}>09:00 ~ 18:00</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.csPhoneRow} 
            onPress={() => Linking.openURL('tel:02-2668-3094')}
          >
            <HeadsetIcon width={20} height={20} color={COLORS.primary} />
            <Text style={styles.csPhoneNumber}>02-2668-3094</Text>
          </TouchableOpacity>
          
          <View style={styles.csInfoRow}>
            <ChevronDownIcon width={14} height={14} color={COLORS.G500} />
            <Text style={styles.csInfoText}>주말, 공휴일: 휴무</Text>
          </View>
          <View style={styles.csInfoRow}>
            <ChevronDownIcon width={14} height={14} color={COLORS.G500} />
            <Text style={styles.csInfoText}>통화요금이 발생할 수 있습니다.</Text>
          </View>

          <TouchableOpacity style={styles.copyButton} onPress={handleCopyPhone}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.copyButtonText}>전화번호 복사</Text>
          </TouchableOpacity>
        </View>

        {/* 탭 메뉴 */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {FAQ_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.tabItem, activeCategory === cat && styles.activeTabItem]}
                onPress={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
              >
                <Text style={[styles.tabText, activeCategory === cat && styles.activeTabText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQ 아코디언 리스트 */}
        <View style={styles.faqList}>
          {filteredFaq.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqHeader} 
                  activeOpacity={0.7} 
                  onPress={() => toggleExpand(item.id)}
                >
                  <View style={styles.faqQuestionRow}>
                    <Text style={styles.qMark}>Q</Text>
                    <Text style={[styles.faqQuestionText, isExpanded && styles.activeFaqText]}>
                      {item.question}
                    </Text>
                  </View>
                  {isExpanded
                    ? <ChevronUpIcon width={22} height={22} color={COLORS.black} />
                    : <ChevronDownIcon width={22} height={22} color={COLORS.black} />
                  }
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.faqBody}>
                    <View style={styles.answerBox}>
                      <Text style={styles.faqAnswerText}>{item.answer}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    padding: 20,
    paddingTop: 30,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    lineHeight: 30,
  },
  quickLinks: {
    paddingHorizontal: 20,
    gap: 12,
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickLinkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.G600,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  quickLinkIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  quickLinkText: {
    fontSize: 15,
    color: COLORS.black,
  },
  csBox: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    padding: 20,
    backgroundColor: COLORS.G100,
    borderRadius: 12,
  },
  csHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  csTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginRight: 10,
  },
  csTime: {
    fontSize: 14,
    color: COLORS.G600,
  },
  csPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  csPhoneNumber: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 8,
  },
  csInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  checkIcon: {
    fontSize: 12,
    color: COLORS.G600,
    marginRight: 6,
  },
  csInfoText: {
    fontSize: 14,
    color: COLORS.black,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.G300,
    borderRadius: 8,
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  tabScroll: {
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 4,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    color: COLORS.G500,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  faqList: {
    paddingBottom: 40,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.G200,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'flex-start',
  },
  faqQuestionRow: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 16,
  },
  qMark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 8,
    marginTop: 2,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.black,
    fontWeight: '400',
  },
  activeFaqText: {
    fontWeight: '600',
  },
  caret: {
    fontSize: 12,
    color: COLORS.G500,
    marginTop: 4,
  },
  faqBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  answerBox: {
    backgroundColor: COLORS.G100,
    padding: 16,
    borderRadius: 8,
  },
  faqAnswerText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.G600,
  },
});