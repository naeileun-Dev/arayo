/**
 * 메인 탭 네비게이터
 * 하단 탭: 홈 | 카테고리 | (+등록) | 찜 | 마이
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  CategoryScreen,
  WishlistScreen,
  MyPageScreen,
} from '../screens/main';
import HomeIcon from '../assets/icon/bottom_navigator/home.svg';
import HomeActiveIcon from '../assets/icon/bottom_navigator/home_active.svg';
import CategoryIcon from '../assets/icon/bottom_navigator/category.svg';
import CategoryActiveIcon from '../assets/icon/bottom_navigator/category_active.svg';
import ChatIcon from '../assets/icon/bottom_navigator/chat.svg';
import ChatActiveIcon from '../assets/icon/bottom_navigator/chat_active.svg';
import MypageIcon from '../assets/icon/bottom_navigator/mypage.svg';
import MypageActiveIcon from '../assets/icon/bottom_navigator/mypage_active.svg';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing, shadows } from '../styles/spacing';
import type { MainTabParamList } from '../types';

// 탭 아이콘 매핑
const TAB_ICONS: Record<string, { icon: React.FC<any>; activeIcon: React.FC<any> }> = {
  Home: { icon: HomeIcon, activeIcon: HomeActiveIcon },
  CategoryTab: { icon: CategoryIcon, activeIcon: CategoryActiveIcon },
  Wishlist: { icon: ChatIcon, activeIcon: ChatActiveIcon },
  MyPage: { icon: MypageIcon, activeIcon: MypageActiveIcon },
};

// 탭 정보
interface TabItem {
  key: keyof MainTabParamList;
  label: string;
}

const TAB_ITEMS: TabItem[] = [
  { key: 'Home', label: '홈' },
  { key: 'CategoryTab', label: '카테고리' },
  { key: 'Post', label: '' },
  { key: 'Wishlist', label: '찜' },
  { key: 'MyPage', label: '마이' },
];

// 커스텀 탭 바 컴포넌트
interface CustomTabBarProps {
  activeTab: keyof MainTabParamList;
  onTabPress: (tab: keyof MainTabParamList) => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {TAB_ITEMS.map((tab) => {
          const isActive = tab.key === activeTab;
          const isCenter = tab.key === 'Post';

          if (isCenter) {
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.centerButton}
                onPress={() => onTabPress(tab.key)}
                activeOpacity={0.8}
              >
                <View style={styles.centerButtonInner}>
                  <Text style={styles.centerButtonText}>+</Text>
                </View>
              </TouchableOpacity>
            );
          }

          const icons = TAB_ICONS[tab.key];
          const IconComponent = isActive ? icons.activeIcon : icons.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.key)}
              activeOpacity={0.7}
            >
              <IconComponent width={24} height={24} />
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// 메인 탭 네비게이터 (커스텀 구현)
const MainTabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<keyof MainTabParamList>('Home');

  const handleTabPress = (tab: keyof MainTabParamList) => {
    if (tab === 'Post') {
      // 등록 화면은 모달로 처리 (TODO)
      console.log('Open post modal');
      return;
    }
    setActiveTab(tab);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'CategoryTab':
        return <CategoryScreen />;
      case 'Wishlist':
        return <WishlistScreen />;
      case 'MyPage':
        return <MyPageScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <CustomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    ...Platform.select({
      ios: {
        paddingBottom: 20, // Safe area bottom
      },
      android: {
        paddingBottom: spacing.xs,
      },
    }),
  },
  tabBar: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    fontSize: 10,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    ...shadows.md,
  },
  centerButtonText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '300',
    lineHeight: 30,
  },
});

export default MainTabNavigator;
