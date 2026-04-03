import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import { formatPrice } from '../estimate/components/FormComponents';
import CheckIcon from '../../assets/icon/check.svg';
import PhoneIcon from '../../assets/icon/phone.svg';
import ChevronRightIcon from '../../assets/icon/chevron-right.svg';
import type { RootStackParamList } from '../../types';

type OrderCompleteRouteProp = RouteProp<RootStackParamList, 'OrderComplete'>;

interface OrderCompleteInfo {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  totalAmount: number;
  sellerPhone: string;
  sellerId?: string;
}

export const OrderCompleteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OrderCompleteRouteProp>();

  // 주문 정보 (OrderWriteScreen에서 전달받음)
  const orderInfo: OrderCompleteInfo = route.params?.orderInfo || {
    accountHolder: '주식회사 수성코리아',
    bankName: '국민은행',
    accountNumber: '123456789',
    totalAmount: 2400000,
    sellerPhone: '0501-2345-6789',
  };

  const handleChatWithSeller = () => {
    // TODO: 채팅 화면으로 이동
    if (orderInfo.sellerId) {
      navigation.navigate('ChatRoom', { chatId: orderInfo.sellerId });
    }
  };

  const handleCallSeller = () => {
    const phoneNumber = orderInfo.sellerPhone.replace(/-/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const priceFormatted = formatPrice(orderInfo.totalAmount.toString());

  return (
    <SafeAreaView style={styles.root}>
      <Header title="주문완료" onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconWrap}>
          <View style={styles.checkCircle}>
            <CheckIcon width={24} height={24} color={colors.green} />
          </View>
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>아래 계좌로 송금 요청 드립니다.</Text>
        <Text style={styles.description}>
          입금 시 입금자명 확인을 위하여 입금자명은 입금자명,{'\n'}
          휴대폰번호 뒤 4자리를 입력해주세요.
        </Text>

        {/* Account Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>입금계좌</Text>
            <Text style={styles.infoValue}>{orderInfo.accountHolder}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>은행명</Text>
            <Text style={styles.infoValue}>{orderInfo.bankName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>계좌번호</Text>
            <Text style={styles.infoValue}>{orderInfo.accountNumber}</Text>
          </View>
          <View style={[styles.infoRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>총 입금 금액</Text>
            <Text style={styles.totalValue}>{priceFormatted} 원</Text>
          </View>
        </View>

        {/* Chat Button */}
        <TouchableOpacity
          style={styles.chatButton}
          activeOpacity={0.8}
          onPress={handleChatWithSeller}
        >
          <Text style={styles.chatButtonText}>판매자와 채팅하기</Text>
          <View style={styles.chatIconWrap}>
            <ChevronRightIcon width={24} height={24} color={colors.white} />
          </View>
        </TouchableOpacity>

        {/* Seller Contact */}
        <TouchableOpacity
          style={styles.contactBox}
          activeOpacity={0.8}
          onPress={handleCallSeller}
        >
          <View style={styles.contactIconWrap}>
            <PhoneIcon width={50} height={50} color={colors.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>판매자 연락처</Text>
            <Text style={styles.contactPhone}>{orderInfo.sellerPhone}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.G200,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.G500,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  totalRow: {
    marginTop: 8,
    marginBottom: 0,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 54,
    marginBottom: 12,
    gap: 4,
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  chatIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary200,
    overflow: 'hidden',
    minHeight: 50,
  },
  contactIconWrap: {
    width: 50,
    backgroundColor: colors.redTagBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 12,
    color: '#7E7E7E',
    fontWeight: '700',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
});

