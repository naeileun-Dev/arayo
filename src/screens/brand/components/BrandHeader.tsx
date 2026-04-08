import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../../styles/colors';
import SearchIcon from '../../../assets/icon/Search.svg';
import ChevronLeftIcon from '../../../assets/icon/chevron-left.svg';
import type { RootStackParamList } from '../../../types';

type MenuType = 'about' | 'notice' | 'products' | 'contact';

interface BrandHeaderProps {
  brandName?: string;
  brandId?: string;
  brandLogoUri?: string;
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

const defaultLogo = require('../../../assets/images/img01.png');

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  brandLogoUri,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <ChevronLeftIcon width={24} height={24} color={colors.black} />
      </TouchableOpacity>

      <Image
        source={brandLogoUri ? { uri: brandLogoUri } : defaultLogo}
        style={styles.headerLogo}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.7}
      >
        <SearchIcon width={22} height={22} color={colors.black} />
      </TouchableOpacity>
    </View>
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
  headerLogo: {
    flex: 1,
    height: 32,
    marginHorizontal: 12,
    aspectRatio: 680 / 148,
  },
});

