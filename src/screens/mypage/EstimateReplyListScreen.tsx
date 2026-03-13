import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import Header from '../../components/common/Header';
import CurveArrowIcon from '../../assets/icon/curve_arrow.svg';
import { EstimateListItemData } from '../estimate/types';
import EstimateTabBar from '../estimate/components/EstimateTabBar';
import EstimateListItem from '../estimate/components/EstimateListItem';

const REPLY_TABS = ['견적 요청 중', '요청 완료', '만료'];

const ESTIMATE_DATA: EstimateListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
    subItems: [
      { price: '40,500,000원', subject: '범용선반/ABC-D1', date: '25.06.15' },
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '5',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
    subItems: [{ subject: '범용선반/ABC-D1', date: '25.06.15' }],
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '11',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '12',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
];

const curveArrowIcon = <CurveArrowIcon width={16} height={16} color={colors.G600} />;

const EstimateReplyListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="견적 답변 내역" onBack={() => navigation.goBack()} />

      <EstimateTabBar
        tabs={REPLY_TABS}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {ESTIMATE_DATA.map((item, index) => (
            <EstimateListItem
              key={item.id}
              item={item}
              isFirst={index === 0}
              onPress={(id) => navigation.navigate('EstimateDetail', { id })}
              subRowIcon={curveArrowIcon}
            />
          ))}
        </View>
        <View style={styles.footerLoading}>
          <ActivityIndicator size="large" color={colors.G400} />
          <Text style={styles.footerLoadingText}>목록을 불러오는 중입니다.</Text>
        </View>
      </ScrollView>
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
  listContainer: {
    paddingHorizontal: 20,
  },
  footerLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  footerLoadingText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
});

export default EstimateReplyListScreen;
