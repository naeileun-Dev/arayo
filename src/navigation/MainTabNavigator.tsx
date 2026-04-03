import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main';
import { MyPageScreen } from '../screens/mypage';
import { CategoryScreen } from '../screens/category';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { BrandHomeScreen } from '../screens/brand/BrandHomeScreen';
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
import ProcessIcon from '../assets/icon/process.svg';
import GearsIcon from '../assets/icon/gears.svg';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import type { RootStackParamList, MainTabParamList } from '../types';

type QuickMenuItem = {
  label: string;
  Icon: React.FC<any>;
  route: keyof RootStackParamList | null;
};

const QUICK_MENU_ITEMS: QuickMenuItem[] = [
  { label: '견적문의', Icon: HeadsetIcon, route: 'EstimateList' },
  { label: '브랜드관', Icon: BuildingIcon, route: 'BrandHome' },
  { label: '산업소식', Icon: NewsIcon, route: null },
  { label: '고철처리', Icon: ProcessIcon, route: 'ScrapList' },
  { label: '임가공', Icon: GearsIcon, route: 'ProcessingList' },
];

const TAB_ICONS = {
  Home: { icon: HomeIcon, activeIcon: HomeActiveIcon },
  CategoryTab: { icon: CategoryIcon, activeIcon: CategoryActiveIcon },
  Menu: { icon: MenuIcon, activeIcon: MenuActiveIcon },
  Chat: { icon: ChatIcon, activeIcon: ChatActiveIcon },
  MyPage: { icon: MypageIcon, activeIcon: MypageActiveIcon },
} as const;

const TAB_ITEMS: (keyof MainTabParamList)[] = ['Home', 'CategoryTab', 'Menu', 'Chat', 'MyPage'];

export const MainNavigator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<keyof MainTabParamList>('Home');
  const [quickMenuVisible, setQuickMenuVisible] = useState(false);
  const [unreadCount] = useState(5);
  const [showBrandHome, setShowBrandHome] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  const animateMenu = (toValue: number, duration = 150) => {
    Animated.timing(animValue, { toValue, duration, useNativeDriver: true }).start();
  };

  const closeMenu = () => {
    setQuickMenuVisible(false);
    animateMenu(0);
  };

  const handleTabPress = (tab: keyof MainTabParamList) => {
    if (tab === 'Menu') {
      const next = !quickMenuVisible;
      setQuickMenuVisible(next);
      animateMenu(next ? 1 : 0, 200);
      return;
    }
    closeMenu();
    setShowBrandHome(false);
    setActiveTab(tab);
  };

  const handleQuickMenuPress = (route: keyof RootStackParamList | null) => {
    if (route === 'BrandHome') {
      closeMenu();
      setShowBrandHome(true);
    } else if (route) {
      closeMenu();
      navigation.navigate(route as never);
    }
  };

  const renderScreen = () => {
    if (showBrandHome) {
      return <BrandHomeScreen onBack={() => setShowBrandHome(false)} />;
    }
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onBrandHomePress={() => setShowBrandHome(true)} />;
      case 'CategoryTab':
        return <CategoryScreen />;
      case 'Chat':
        return <ChatListScreen />;
      case 'MyPage':
        return <MyPageScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}

      {quickMenuVisible && <Pressable style={styles.overlay} onPress={closeMenu} />}

      {quickMenuVisible && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: animValue,
              transform: [{
                translateY: animValue.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
              }],
            },
          ]}
        >
          {QUICK_MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, idx === QUICK_MENU_ITEMS.length - 1 && styles.menuItemLast]}
              activeOpacity={0.7}
              onPress={() => handleQuickMenuPress(item.route)}
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
            const { icon, activeIcon } = TAB_ICONS[tabKey];
            const isActive = tabKey === 'Menu' ? quickMenuVisible : tabKey === activeTab;
            const Icon = isActive ? activeIcon : icon;
            return (
              <TouchableOpacity
                key={tabKey}
                style={styles.tabItem}
                onPress={() => handleTabPress(tabKey)}
                activeOpacity={0.7}
              >
                <View>
                  <Icon width={58} height={46} />
                  {tabKey === 'Chat' && unreadCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
                    </View>
                  )}
                </View>
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
    paddingBottom: Platform.OS === 'ios' ? 20 : spacing.xs,
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
    ...StyleSheet.absoluteFillObject,
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
  badge: {
    position: 'absolute',
    top: 2,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
