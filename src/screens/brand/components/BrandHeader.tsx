import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../styles/colors';
import SearchIcon from '../../../assets/icon/Search.svg';
import type { RootStackParamList } from '../../../types';

type MenuType = 'about' | 'notice' | 'products' | 'contact';

interface BrandHeaderProps {
  brandName?: string;
  brandId?: string;
  showMenu?: boolean;
  onMenuPress?: () => void;
  currentPage?: MenuType;
}

const MENU_ITEMS: { key: MenuType; label: string }[] = [
  { key: 'about', label: '회사소개' },
  { key: 'notice', label: '공지사항' },
  { key: 'products', label: '제품소개' },
  { key: 'contact', label: '문의하기' },
];

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  brandName = '스마트기계',
  brandId = '1',
  showMenu = true,
  currentPage,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuSelect = (key: MenuType) => {
    setMenuVisible(false);

    switch (key) {
      case 'about':
        navigation.navigate('BrandAbout', { brandId });
        break;
      case 'notice':
        navigation.navigate('BrandNotice', { brandId });
        break;
      case 'products':
        navigation.navigate('BrandProducts', { brandId });
        break;
      case 'contact':
        navigation.navigate('BrandContact', { brandId });
        break;
    }
  };

  return (
    <>
      <View style={styles.header}>
        {showMenu ? (
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerBtn} />
        )}

        <Text style={styles.headerTitle}>{brandName}</Text>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <SearchIcon width={22} height={22} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {menuVisible && (
        <>
          <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
          <View style={styles.menuDropdown}>
            {MENU_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.menuItem,
                  idx < MENU_ITEMS.length - 1 && styles.menuItemBorder,
                  currentPage === item.key && styles.menuItemActive,
                ]}
                onPress={() => handleMenuSelect(item.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    currentPage === item.key && styles.menuItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
    backgroundColor: colors.white,
  },
  headerBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.black,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  menuDropdown: {
    position: 'absolute',
    top: 56,
    left: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 160,
    zIndex: 100,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  menuItemActive: {
    backgroundColor: colors.G100,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  menuItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

