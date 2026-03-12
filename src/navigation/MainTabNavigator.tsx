import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import { HomeScreen } from '../screens/main';
import { MyPageScreen } from '../screens/mypage';
import { CategoryScreen } from '../screens/category';
import ChatListScreen from '../screens/chat/ChatListScreen';
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
import HeadsetIcon from '../assets/icon/headset.svg';
import BuildingIcon from '../assets/icon/building.svg';
import NewsIcon from '../assets/icon/news.svg';
import GearsIcon from '../assets/icon/gears.svg';
import ProcessIcon from '../assets/icon/process.svg';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import type { MainTabParamList } from '../types';

const QUICK_MENU_ITEMS = [
  { label: '견적문의', Icon: HeadsetIcon },
  { label: '브랜드관', Icon: BuildingIcon },
  { label: '산업소식', Icon: NewsIcon },
  { label: '임가공', Icon: GearsIcon },
  { label: '고철처리', Icon: ProcessIcon },
];

const TAB_ICONS: Record<string, { icon: React.FC<any>; activeIcon: React.FC<any> }> = {
  Home: { icon: HomeIcon, activeIcon: HomeActiveIcon },
  CategoryTab: { icon: CategoryIcon, activeIcon: CategoryActiveIcon },
  Menu: { icon: MenuIcon, activeIcon: MenuActiveIcon },
  Chat: { icon: ChatIcon, activeIcon: ChatActiveIcon },
  MyPage: { icon: MypageIcon, activeIcon: MypageActiveIcon },
};

const TAB_ITEMS: Array<keyof MainTabParamList> = [
  'Home', 'CategoryTab', 'Menu', 'Chat', 'MyPage',
];

const MainTabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState<keyof MainTabParamList>('Home');
  const [quickMenuVisible, setQuickMenuVisible] = React.useState(false);
  const animValue = React.useRef(new Animated.Value(0)).current;

  const handleTabPress = (tab: keyof MainTabParamList) => {
    if (tab === 'Menu') {
      const next = !quickMenuVisible;
      setQuickMenuVisible(next);
      Animated.timing(animValue, {
        toValue: next ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setQuickMenuVisible(false);
      Animated.timing(animValue, { toValue: 0, duration: 150, useNativeDriver: true }).start();
      setActiveTab(tab);
    }
  };

  const closeMenu = () => {
    setQuickMenuVisible(false);
    Animated.timing(animValue, { toValue: 0, duration: 150, useNativeDriver: true }).start();
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen />;
      case 'CategoryTab': return <CategoryScreen />;
      case 'Chat': return <ChatListScreen />;
      case 'MyPage': return <MyPageScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}

      {quickMenuVisible && (
        <Pressable style={styles.overlay} onPress={closeMenu} />
      )}

      {quickMenuVisible && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: animValue,
              transform: [{ translateY: animValue.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            },
          ]}
        >
          {QUICK_MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i === QUICK_MENU_ITEMS.length - 1 && styles.menuItemLast]}
              activeOpacity={0.7}
            >
              <item.Icon width={20} height={20} color={colors.primary200} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      <View style={styles.tabBarWrap}>
        <View style={styles.tabBar}>
          {TAB_ITEMS.map((tabKey) => {
            const icons = TAB_ICONS[tabKey];
            const isActive = tabKey === 'Menu' ? quickMenuVisible : tabKey === activeTab;
            const Icon = isActive ? icons.activeIcon : icons.icon;
            return (
              <TouchableOpacity
                key={tabKey}
                style={styles.tabItem}
                onPress={() => handleTabPress(tabKey)}
                activeOpacity={0.7}
              >
                <Icon width={58} height={46} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarWrap: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    ...Platform.select({
      ios: { paddingBottom: 20 },
      android: { paddingBottom: spacing.xs },
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  menuContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 68 : 48,
    left: 16,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.primary200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 2,
    zIndex: 11,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    borderRightWidth: 1,
    borderRightColor: colors.G200,
    paddingVertical: 2,
  },
  menuItemLast: {
    borderRightWidth: 0,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.black,
  },
});

export default MainTabNavigator;
