import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import Header from '../../components/common/Header';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING_LR = 20;
const IMAGE_GAP = 5;
const IMAGE_COUNT = 3;
const IMAGE_SIZE =
  (SCREEN_WIDTH - PADDING_LR * 2 - IMAGE_GAP * (IMAGE_COUNT - 1)) / IMAGE_COUNT;

interface InfoRow {
  label: string;
  value: string;
  tag?: string;
}

const EstimateDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  const inquiryData = {
    state: '견적 요청 중',
    date: '25.06.15',
    subject: '안녕하세요. CNC 선반 견적 문의 드립니다.',
    content: '안녕하세요 견적문의 드립니다. 확인 후 답변 부탁드립니다. ^^',
    images: [1, 2, 3],
  };

  const inquiryInfo: InfoRow[] = [
    { label: '제품명', value: '[신품] CNC 선반' },
    { label: '구매자 위치', value: '서울 강서구' },
    { label: '제품 구분', value: '공작기계 CNC 선반' },
    { label: '희망가격', value: '4,000,000원', tag: '제안가능' },
  ];

  const buyerInfo: InfoRow[] = [
    { label: '이름', value: '김샘플' },
    { label: '휴대폰 번호', value: '010-1234-5678' },
  ];

  const renderInfoRow = (item: InfoRow, index: number, list: InfoRow[]) => (
    <View
      key={index}
      style={[
        styles.infoRow,
        index < list.length - 1 && { marginBottom: 10 },
      ]}
    >
      <Text style={styles.infoLabel}>{item.label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={styles.infoValue}>{item.value}</Text>
        {item.tag && (
          <View style={styles.redTag}>
            <Text style={styles.redTagText}>{item.tag}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderImageGrid = () => (
    <View style={styles.imageGrid}>
      {inquiryData.images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.imagePlaceholder,
            index < inquiryData.images.length - 1 && {
              marginRight: IMAGE_GAP,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="견적 답변 상세" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.inquiryHead}>
            <View style={styles.headTopRow}>
              <Text style={styles.stateText}>{inquiryData.state}</Text>
              <Text style={styles.dateText}>{inquiryData.date}</Text>
            </View>
            <Text style={styles.subjectText}>{inquiryData.subject}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>문의 내용</Text>
            {inquiryInfo.map((item, index) =>
              renderInfoRow(item, index, inquiryInfo),
            )}
          </View>

          <Text style={styles.contentText}>{inquiryData.content}</Text>

          {renderImageGrid()}

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>구매자 정보</Text>
            {buyerInfo.map((item, index) =>
              renderInfoRow(item, index, buyerInfo),
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomFloating}>
        {isMoreVisible && (
          <View style={styles.moreMenu}>
            <TouchableOpacity style={styles.moreMenuItem}>
              <Text style={styles.moreMenuText}>받은 견적 확인하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreMenuItem}>
              <Text style={styles.moreMenuText}>문의글 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreMenuItem}>
              <Text style={styles.moreMenuText}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomInner}>
          <TouchableOpacity
            style={styles.completeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>견적 요청 완료</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setIsMoreVisible((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Text style={styles.moreButtonIcon}>•••</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: PADDING_LR,
  },
  inquiryHead: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  headTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.system100,
  },
  dateText: {
    fontSize: 12,
    color: colors.G400,
    marginLeft: 'auto',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 22,
  },
  infoSection: {},
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: 90,
    fontSize: 14,
    fontWeight: '500',
    color: colors.G400,
    lineHeight: 21,
  },
  infoValueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoValue: {
    fontSize: 14,
    color: colors.G600,
    lineHeight: 21,
  },
  redTag: {
    backgroundColor: '#FDF2F4',
    paddingHorizontal: 5,
    borderRadius: 4,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  redTagText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.primary,
  },
  contentText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  imageGrid: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: IMAGE_SIZE,
    aspectRatio: 1,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.G200,
    marginTop: 20,
    marginBottom: 20,
  },
  bottomFloating: {
    position: 'relative',
  },
  bottomInner: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  completeButton: {
    flex: 1,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  moreButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonIcon: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.black,
    letterSpacing: 2,
  },
  moreMenu: {
    position: 'absolute',
    bottom: 85,
    right: 15,
    left: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  moreMenuItem: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreMenuText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
});

export default EstimateDetailScreen;
