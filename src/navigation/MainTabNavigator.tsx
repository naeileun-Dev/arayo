/**
 * 메인 탭 네비게이터
 * 하단 탭: 홈 | 카테고리 | 메뉴 | 찜 | 마이
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
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
import MenuIcon from '../assets/icon/bottom_navigator/menu.svg';
import MenuActiveIcon from '../assets/icon/bottom_navigator/menu_active.svg';
import ChatIcon from '../assets/icon/bottom_navigator/chat.svg';
import ChatActiveIcon from '../assets/icon/bottom_navigator/chat_active.svg';
import MypageIcon from '../assets/icon/bottom_navigator/mypage.svg';
import MypageActiveIcon from '../assets/icon/bottom_navigator/mypage_active.svg';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import type { MainTabParamList } from '../types';

// 탭 아이콘 매핑
const TAB_ICONS: Record<string, { icon: React.FC<any>; activeIcon: React.FC<any> }> = {
  Home: { icon: HomeIcon, activeIcon: HomeActiveIcon },
  CategoryTab: { icon: CategoryIcon, activeIcon: CategoryActiveIcon },
  Menu: { icon: MenuIcon, activeIcon: MenuActiveIcon },
  Wishlist: { icon: ChatIcon, activeIcon: ChatActiveIcon },
  MyPage: { icon: MypageIcon, activeIcon: MypageActiveIcon },
};

// 탭 정보
const TAB_ITEMS: Array<keyof MainTabParamList> = [
  'Home',
  'CategoryTab',
  'Menu',
  'Wishlist',
  'MyPage',
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
        {TAB_ITEMS.map((tabKey) => {
          const isActive = tabKey === activeTab;
          const icons = TAB_ICONS[tabKey];
          const IconComponent = isActive ? icons.activeIcon : icons.icon;

          return (
            <TouchableOpacity
              key={tabKey}
              style={styles.tabItem}
              onPress={() => onTabPress(tabKey)}
              activeOpacity={0.7}
            >
              <IconComponent width={58} height={46} />
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
    height: 58,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainTabNavigator;
