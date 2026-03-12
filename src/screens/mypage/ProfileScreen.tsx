import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import PencilIcon from '../../assets/icon/pencil.svg';

const USER_IMG = require('../../assets/images/user01.png');

// ─────────────────────────────────────────────────────────────────────────────
// 레이아웃 상수
// ─────────────────────────────────────────────────────────────────────────────
const PROFILE_IMG_SIZE = 90;
const EDIT_BTN_SIZE    = 28;
const BTN_HEIGHT       = 50;
const BTN_RADIUS       = 4;
const H_PADDING        = 60;

// ─────────────────────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────────────────────
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const email = 'Suseong@gmail.com';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ────── 헤더 (공통 Header) ────── */}
      <Header
        title="내 정보 확인/수정"
        onBack={() => navigation.goBack()}
      />

      {/* ────── 섹션 타이틀 (좌측 상단 고정) ────── */}
      <Text style={styles.sectionTitle}>회원정보</Text>

      {/* ────── 본문 ────── */}
      <View style={styles.body}>

        {/* 프로필 카드 */}
        <View style={styles.profileCard}>

          {/* 프로필 이미지 영역 */}
          <View style={styles.profileImageWrapper}>
            <Image
              source={USER_IMG}
              style={styles.profileImage}
              resizeMode="cover"
            />

            {/* 편집 버튼 (빨간 원형 — 우하단) */}
            <TouchableOpacity
              style={styles.editImageBtn}
              activeOpacity={0.8}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <PencilIcon width={14} height={14} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* 이메일 */}
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* 버튼 세트 */}
        <View style={styles.buttonSet}>

          {/* 비밀번호 변경 */}
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => navigation.navigate('PasswordReset')}
            activeOpacity={0.7}
          >
            <Text style={styles.btnSecondaryText}>비밀번호 변경</Text>
          </TouchableOpacity>

          {/* 내 정보 수정 — 프라이머리 */}
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('ProfileEdit')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>내 정보 수정</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  body: {
    flex              : 1,
    paddingBottom     : 60,
    paddingHorizontal : H_PADDING,
  },

  sectionTitle: {
    fontSize          : 20,
    fontWeight        : '800',
    color             : colors.black,
    paddingHorizontal : 20,
    paddingTop        : 25,
    marginBottom      : 60,
  },

  profileCard: {
    backgroundColor   : colors.G100,
    borderRadius      : 4,
    alignItems        : 'center',
    paddingVertical   : 30,
    paddingHorizontal : 20,
    marginBottom      : 12,
  },

  profileImageWrapper: {
    width        : PROFILE_IMG_SIZE,
    height       : PROFILE_IMG_SIZE,
    marginBottom : 14,
  },

  profileImage: {
    width           : PROFILE_IMG_SIZE,
    height          : PROFILE_IMG_SIZE,
    borderRadius    : 18,
  },

  editImageBtn: {
    position        : 'absolute',
    bottom          : -4,
    right           : -4,
    width           : EDIT_BTN_SIZE,
    height          : EDIT_BTN_SIZE,
    borderRadius    : EDIT_BTN_SIZE / 2,
    backgroundColor : colors.primary,
    alignItems      : 'center',
    justifyContent  : 'center',
    ...Platform.select({
      ios: {
        shadowColor   : '#000',
        shadowOffset  : { width: 0, height: 1 },
        shadowOpacity : 0.2,
        shadowRadius  : 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  emailText: {
    fontSize      : 15,
    fontWeight    : '500',
    color         : colors.black,
    letterSpacing : -0.2,
  },

  buttonSet: {
    gap: 10,
  },

  btnSecondary: {
    height          : BTN_HEIGHT,
    borderRadius    : BTN_RADIUS,
    backgroundColor : colors.G100,
    alignItems      : 'center',
    justifyContent  : 'center',
  },
  btnSecondaryText: {
    fontSize      : 14,
    fontWeight    : '500',
    color         : colors.black,
    letterSpacing : -0.2,
  },

  btnPrimary: {
    height          : BTN_HEIGHT,
    borderRadius    : BTN_RADIUS,
    backgroundColor : colors.primary,
    alignItems      : 'center',
    justifyContent  : 'center',
  },
  btnPrimaryText: {
    fontSize      : 14,
    fontWeight    : '600',
    color         : colors.white,
    letterSpacing : -0.2,
  },
});

export default ProfileScreen;
