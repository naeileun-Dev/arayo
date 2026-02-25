import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ChevronRightIcon from '../../assets/icon/chevron-right.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../assets/icon/chevron-up.svg';
import RefreshCwIcon from '../../assets/icon/refresh-cw.svg';

import SalesIcon from '../../assets/icon/mypage/sales.svg';
import OrdersIcon from '../../assets/icon/mypage/orders.svg';
import WishlistIcon from '../../assets/icon/mypage/wishlist.svg';
import ChatsIcon from '../../assets/icon/mypage/chats.svg';
import ReviewsIcon from '../../assets/icon/mypage/reviews.svg';
import BrandhomeIcon from '../../assets/icon/mypage/brandhome.svg';
import ManagebrandIcon from '../../assets/icon/mypage/managebrand.svg';
import EstimatesIcon from '../../assets/icon/mypage/estimates.svg';
import OemhomeIcon from '../../assets/icon/mypage/oemhome.svg';
import ManageoemIcon from '../../assets/icon/mypage/manageoem.svg';
import OemrepliesIcon from '../../assets/icon/mypage/oemreplies.svg';
import ScrapmgtIcon from '../../assets/icon/mypage/scrapmgt.svg';
import InquiryIcon from '../../assets/icon/mypage/inquiry.svg';
import NoticeIcon from '../../assets/icon/mypage/notice.svg';
import FaqIcon from '../../assets/icon/mypage/faq.svg';
import MyinfoIcon from '../../assets/icon/mypage/myinfo.svg';

import { colors } from '../../styles/colors';

const userInfo = {
  name: '홍길동',
  email: 'honggildong@gmail.com',
  memberClass: '일반회원',
};

const MENU_ICONS: Record<string, React.FC<any>> = {
  '판매내역': SalesIcon,
  '구매내역': OrdersIcon,
  '관심목록': WishlistIcon,
  '채팅내역': ChatsIcon,
  '거래후기': ReviewsIcon,
  '내 브랜드관 기업 홈': BrandhomeIcon,
  '브랜드관 업체 등록/수정': ManagebrandIcon,
  '견적답변 내역': EstimatesIcon,
  '내 임가공 기업 홈': OemhomeIcon,
  '임가공 업체 등록/수정': ManageoemIcon,
  '임가공 답변 내역': OemrepliesIcon,
  '고철처리 의뢰 내역': ScrapmgtIcon,
  '1:1 문의': InquiryIcon,
  '공지사항': NoticeIcon,
  '자주 묻는 질문': FaqIcon,
  '내 정보 확인/수정': MyinfoIcon,
};

const MENU_SECTIONS = [
  {
    label: 'MY 거래',
    items: ['판매내역', '구매내역', '관심목록', '채팅내역', '거래후기'],
  },
  {
    label: 'MY 견적',
    items: ['내 브랜드관 기업 홈', '브랜드관 업체 등록/수정', '견적답변 내역'],
  },
  {
    label: 'MY 임가공',
    items: ['내 임가공 기업 홈', '임가공 업체 등록/수정', '임가공 답변 내역'],
  },
  {
    label: 'MY 고철처리',
    items: ['고철처리 의뢰 내역'],
  },
  {
    label: 'MY 활동',
    items: ['1:1 문의', '공지사항', '자주 묻는 질문'],
  },
  {
    label: 'MY 정보',
    items: ['내 정보 확인/수정'],
  },
];

export const MyPageScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isBusinessInfoOpen, setIsBusinessInfoOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              source={require('../../assets/images/user01.png')}
              style={styles.profileImg}
            />
            <View style={styles.profileTextWrap}>
              <Text style={styles.profileName}>{userInfo.name}</Text>
              <Text style={styles.profileEmail}>{userInfo.email}</Text>
            </View>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>{userInfo.memberClass}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8} onPress={() => navigation.navigate('BusinessUpgrade')}>
            <RefreshCwIcon width={16} height={16} color={colors.white} />
            <Text style={styles.upgradeBtnText}>기업회원 전환하기</Text>
          </TouchableOpacity>
        </View>

        {MENU_SECTIONS.map((section, sectionIndex) => (
          <View key={section.label} style={styles.menuSection}>
            {sectionIndex > 0 && (
              <View style={styles.dividerWrap}>
                <View style={styles.divider} />
              </View>
            )}
            <View style={styles.menuLabelWrap}>
              <Text style={styles.menuLabel}>{section.label}</Text>
            </View>
            {section.items.map((item) => {
              const IconComponent = MENU_ICONS[item];
              return (
                <TouchableOpacity
                  key={item}
                  style={styles.menuItem}
                  onPress={() => {
                    if (item === '자주 묻는 질문') {
                      navigation.navigate('FAQ');
                    } else if (item === '구매내역') {
                      navigation.navigate('PurchaseList');
                    } else {
                      console.log(item);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    {IconComponent && <IconComponent width={20} height={20} color={colors.G600} />}
                    <Text style={styles.menuItemText}>{item}</Text>
                  </View>
                  <ChevronRightIcon width={16} height={16} color={colors.G300} />
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerToggle}
            onPress={() => setIsBusinessInfoOpen(!isBusinessInfoOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.footerCompany}>
              (주) 수성코리아 (아라요 기계장터) 사업자 정보
            </Text>
            {isBusinessInfoOpen ? (
              <ChevronUpIcon width={14} height={14} color={colors.G500} />
            ) : (
              <ChevronDownIcon width={14} height={14} color={colors.G500} />
            )}
          </TouchableOpacity>
          <View style={styles.footerDivider} />

          {isBusinessInfoOpen && (
            <View style={styles.businessInfo}>
              <View style={styles.linkRow}>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                  <Text style={styles.linkText}>이용약관</Text>
                </TouchableOpacity>
                <Text style={styles.linkDivider}>|</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                  <Text style={styles.linkText}>개인정보처리방침</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.infoText}>대표 : 백승화</Text>
              <Text style={styles.infoText}>회사명 : 주식회사 수성코리아</Text>
              <Text style={styles.infoText}>사업자등록번호 : 386-86-03185</Text>
              <Text style={styles.infoText}>통신판매업신고번호 : 2024-서울강서-2690</Text>
              <Text style={styles.infoText}>
                주소 : 서울특별시 강서구 양천로 532, 더리브아너비즈타워{'\n'}
                {'        '}1105호, 1106호, 1107호
              </Text>
              <Text style={styles.infoText}>전화번호 : 010-9383-3094 / 02-2668-3094</Text>
              <Text style={styles.infoText}>호스팅서비스 제공자 : (주)스마일서브</Text>
            </View>
          )}

          <Text style={styles.footerDesc}>
            아라요 기계장터는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          </Text>
          <Text style={styles.footerDesc}>
            따라서 상품/거래정보/거래에 대한 책임은 각 판매자에게 있습니다.
          </Text>
          <Text style={styles.footerCopyright}>
            Copyright 2026 (주)수성코리아. All Rights Reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileCard: {
    margin: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.G200,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  profileTextWrap: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: colors.G500,
  },
  memberBadge: {
    backgroundColor: colors.G100,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 2,
  },
  memberBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.G600,
  },
  upgradeBtn: {
    height: 54,
    backgroundColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  upgradeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  menuSection: {
    marginTop: 0,
  },
  dividerWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.G200,
  },
  menuLabelWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.black,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  footerCompany: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.G500,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.G200,
    marginBottom: 10,
  },
  businessInfo: {
    marginBottom: 14,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.G600,
    textDecorationLine: 'underline',
  },
  linkDivider: {
    fontSize: 11,
    color: colors.G400,
  },
  infoText: {
    fontSize: 11,
    color: colors.G500,
    lineHeight: 18,
  },
  footerDesc: {
    fontSize: 11,
    color: colors.G500,
    lineHeight: 17,
  },
  footerCopyright: {
    fontSize: 11,
    color: colors.G400,
    marginTop: 10,
  },
});
