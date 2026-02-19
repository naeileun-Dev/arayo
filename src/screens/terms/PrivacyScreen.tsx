import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { DimensionValue } from 'react-native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

type PrivacyItemType = 'h4' | 'p' | 'ul' | 'ol' | 'ol-depth2' | 'table';

interface TableCol {
  width: DimensionValue;
}
interface TableData {
  cols: TableCol[];
  headers: string[];
  rows: string[][];
}

interface PrivacyItem {
  type: PrivacyItemType;
  prefix?: string;
  text?: string;
  tableData?: TableData;
}

// 개인정보처리방침 본문 데이터
const PRIVACY_DATA: PrivacyItem[] = [
  { type: 'p', text: '㈜수성코리아(이하 “아라요 기계장터”)는 정보주체의 자유와 권리 보호를 위해 ｢개인정보 보호법｣ 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 ｢개인정보 보호법｣ 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.' },

  { type: 'h4', text: '개인정보의 처리 목적, 처리 항목, 보유 및 이용 기간' },
  { type: 'p', text: '아라요 기계장터는 「개인정보 보호법」 제15조 제1항 각 호에 따른 다음과 같은 경우에 한하여 정보주체의 동의 없이 개인정보를 처리할 수 있습니다. 이러한 경우에는 적법한 법적 근거 및 명확한 처리 목적이 있음을 안내합니다.' },
  { type: 'ul', prefix: 'ㆍ', text: '계약의 체결 및 이행을 위하여 불가피하게 개인정보를 처리하는 경우' },
  { type: 'ul', prefix: 'ㆍ', text: '법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 개인정보를 처리하는 경우' },
  { type: 'ul', prefix: 'ㆍ', text: '공공기관이 법령에 따른 소관 업무 수행을 위하여 개인정보를 처리하는 경우' },
  { type: 'ul', prefix: 'ㆍ', text: '정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 보호하기 위하여 필요한 경우' },
  { type: 'ul', prefix: 'ㆍ', text: '개인정보처리자의 정당한 이익을 달성하기 위하여 필요한 경우로, 명백하게 정보주체 권리보다 우선하며 합리적 범위 내에서 처리하는 경우' },
  { type: 'p', text: '아라요 기계장터는 위와 같은 경우 처리하는 개인정보 항목과 처리 목적, 법적 근거를 개인정보처리방침에 명확히 고지하며, 개인정보 처리에 따른 정보주체의 권리 보호를 위해 최선을 다합니다. 또한, 동의 없는 개인정보 처리 확대에 따른 향후 분쟁 위험을 줄이기 위해 법률에서 정한 엄격한 기준과 절차를 준수합니다.' },

  { type: 'ol', prefix: '1.', text: '정보주체의 동의를 받지 않는 경우\n㈜수성코리아는 다음의 개인정보 항목을 정보주체의 동의없이 처리하고 있습니다.' },
  {
    type: 'table',
    tableData: {
      cols: [{ width: '20%' }, { width: '20%' }, { width: '25%' }, { width: '20%' }, { width: '15%' }],
      headers: ['법적 근거', '구분', '처리 목적', '처리 항목', '처리 및 보유 기간'],
      rows: [
        ['「개인정보 보호법」 제15조제1항제4호\n(계약 체결·이행)', '회원 서비스 운영', '회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리', '아이디, 이메일, 휴대폰번호, 비밀번호', '회원 탈퇴 후 6개월 까지'],
        ['「개인정보 보호법」 제15조제1항제4호\n(계약 체결·이행)', '서비스 제공', '서비스 제공, 주문 및 상품 배송, 결제 및 반품 처리 등', '성명, 아이디, 전화번호 등', '회원 탈퇴 후 5년'],
        ['「개인정보 보호법」 제15조제1항제4호\n(계약 체결·이행)', '간편 로그인', '간편 로그인 (SNS 로그인 연동)', 'SNS인증정보', '연동 해지 또는 회원 탈퇴 시까지'],
      ]
    }
  },
  { type: 'p', text: '※ 단, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보존 후 지체없이 파기합니다.\n1) 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지\n2) 홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지' },

  { type: 'ol', prefix: '2.', text: '정보주체의 동의를 받아 처리하는 개인정보 항목\n아라요 기계장터는 다음의 개인정보 항목을 정보주체의 동의를 받아 처리하고 있습니다.' },
  {
    type: 'table',
    tableData: {
      cols: [{ width: '20%' }, { width: '15%' }, { width: '25%' }, { width: '25%' }, { width: '15%' }],
      headers: ['법적 근거', '구분', '처리 목적', '처리 항목', '처리 및 보유 기간'],
      rows: [
        ['「개인정보 보호법」 제15조제1항제1호\n(정보주체동의)', '회원 가입', '회원정보 등록', '이름, 아이디, 이메일, 휴대폰번호 등', '회원 탈퇴 후 6개월 까지'],
        ['「개인정보 보호법」 제15조제1항제1호\n(정보주체동의)', '마케팅·홍보', '서비스 홍보 및 판매 권유', '성명, 휴대폰 번호, 이메일주소 등', '수집일로부터 2년'],
      ]
    }
  },

  { type: 'ol', prefix: '3.', text: '명시한 보유기간 외에 관계 법령에 의해 보존할 의무가 있는 경우는 다음과 같습니다.' },
  {
    type: 'table',
    tableData: {
      cols: [{ width: '40%' }, { width: '20%' }, { width: '40%' }],
      headers: ['보존되는 정보', '보존 기간', '보존 근거'],
      rows: [
        ['계약 또는 청약철회 등에 관한 기록', '5년', '「전자상거래 등에서의 소비자보호에 관한 법률」'],
        ['대금결제 및 재화 등의 공급에 관한 기록', '5년', '「전자상거래 등에서의 소비자보호에 관한 법률」'],
        ['소비자의 불만 또는 분쟁처리에 관한 기록', '3년', '「전자상거래 등에서의 소비자보호에 관한 법률」'],
      ]
    }
  },

  { type: 'h4', text: '개인정보의 파기 절차 및 방법' },
  { type: 'p', text: '① 아라요 기계장터는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.' },
  { type: 'p', text: '② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.' },
  { type: 'p', text: '③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.' },
  { type: 'ol', prefix: '1.', text: '파기절차\n아라요 기계장터는 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호 책임자의 승인을 받아 개인정보를 파기합니다.' },
  { type: 'ol', prefix: '2.', text: '파기방법\n아라요 기계장터는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.' },

  { type: 'h4', text: '개인정보의 제3자 제공' },
  { type: 'p', text: '① 아라요 기계장터는 원활한 서비스 제공을 위해 다음의 경우 「개인정보 보호법」 제17조제1항제1호에따라 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.' },
  { type: 'p', text: '② 아라요 기계장터는 다음과 같이 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.' },
  {
    type: 'table',
    tableData: {
      cols: [{ width: '30%' }, { width: '25%' }, { width: '25%' }, { width: '20%' }],
      headers: ['관련 근거', '제공받는 자', '제공목적', '제공 항목'],
      rows: [
        ['「개인정보 보호법」 제17조 등', '국세청', '연말정산 간소화', '이름, 주민번호'],
        ['「개인정보 보호법」 제18조 등', '경찰청, 검찰청', '영장을 통한 요청', '요청범위의 정보'],
      ]
    }
  },

  { type: 'h4', text: '개인정보 처리의 위탁' },
  { type: 'p', text: '① 아라요 기계장터는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.' },
  {
    type: 'table',
    tableData: {
      cols: [{ width: '40%' }, { width: '60%' }],
      headers: ['위탁받는 자(수탁자)', '위탁업무'],
      rows: [
        ['㈜스마일서브', '정보 보관, 인프라 운영'],
        ['네이버 클라우드㈜', '정보 보관'],
        ['인포뱅크㈜', '문자, 알림톡 발송'],
        ['NICE평가정보㈜', '본인확인(휴대전화 인증)'],
      ]
    }
  },
  { type: 'p', text: '② 아라요 기계장터는 위탁계약 체결 시 관련 법령에 따라 수탁자가 개인정보를 안전하게 처리하는지 감독하고 있습니다.' },

  { type: 'h4', text: '개인정보 보호책임자' },
  { type: 'p', text: '① 아라요 기계장터는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 관련 문의를 위해 아래와 같이 보호책임자를 지정하고 있습니다.' },
  { type: 'ul', prefix: 'ㆍ', text: '개인정보 보호책임자\n성명 : 백승화\n직위 : 대표\n연락처 : 02-2668-3094\n이메일: ceo@susungkorea.com' },
  { type: 'ul', prefix: 'ㆍ', text: '개인정보보호 담당부서\n부서명 : 플랫폼 사업부\n연락처: 02-2668-3094\n이메일: hwko@susungkorea.com' },

  { type: 'h4', text: '권익침해 구제방법' },
  { type: 'p', text: '정보주체는 개인정보침해로 인한 구제를 받기 위하여 다음 기관에 문의하실 수 있습니다.' },
  { type: 'ol', prefix: '1.', text: '개인정보 분쟁조정위원회 : 1833-6972 (www.kopico.go.kr)' },
  { type: 'ol', prefix: '2.', text: '개인정보침해 신고센터 : 118 (privacy.kisa.or.kr)' },
  { type: 'ol', prefix: '3.', text: '경찰청 : 182 (ecrm.police.go.kr)' },

  { type: 'h4', text: '개인정보 처리방침의 변경' },
  { type: 'p', text: '이 개인정보 처리방침은 2026년 3월 18일부터 적용됩니다.' },
];

export const PrivacyScreen: React.FC = () => {
  const navigation = useNavigation();

  // 테이블 렌더링
  const renderTable = (tableData: TableData, index: number) => {
    return (
      <View key={`table-${index}`} style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          {tableData.headers.map((header, hIndex) => (
            <View key={`th-${hIndex}`} style={[styles.tableCellHeader, { width: tableData.cols[hIndex]?.width || 'auto' }]}>
              <Text style={styles.tableHeaderText}>{header}</Text>
            </View>
          ))}
        </View>
        {/* Table Body */}
        {tableData.rows.map((row, rIndex) => (
          <View key={`tr-${rIndex}`} style={styles.tableRow}>
            {row.map((cellText, cIndex) => (
              <View key={`td-${rIndex}-${cIndex}`} style={[styles.tableCell, { width: tableData.cols[cIndex]?.width || 'auto' }]}>
                <Text style={styles.tableCellText}>{cellText}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  // 항목 렌더링
  const renderPrivacyItem = (item: PrivacyItem, index: number) => {
    switch (item.type) {
      case 'h4':
        return <Text key={index} style={styles.h4}>{item.text}</Text>;
      case 'p':
        return <Text key={index} style={styles.p}>{item.text}</Text>;
      case 'ul':
      case 'ol':
      case 'ol-depth2':
        const isDepth2 = item.type === 'ol-depth2';
        return (
          <View key={index} style={[styles.listRow, isDepth2 && styles.listIndent]}>
            <Text style={styles.listPrefix}>{item.prefix}</Text>
            <Text style={styles.listText}>{item.text}</Text>
          </View>
        );
      case 'table':
        if (item.tableData) {
          return (
            <ScrollView horizontal key={index} showsHorizontalScrollIndicator={true} style={styles.tableScrollWrapper}>
              {renderTable(item.tableData, index)}
            </ScrollView>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개인정보 처리방침</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 2. 본문 */}
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentBox}>
          {PRIVACY_DATA.map((item, index) => renderPrivacyItem(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
    width: 40,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  contentBox: {
    flexDirection: 'column',
  },

  // 타이포그래피 (개인정보처리방침 특화 폰트 사이즈)
  h4: {
    ...typography.h4,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 32,
    marginBottom: 12,
    lineHeight: 26,
  },
  p: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },

  // 리스트 스타일
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listIndent: {
    paddingLeft: 16,
  },
  listPrefix: {
    ...typography.body,
    color: colors.textSecondary,
    width: 20,
    lineHeight: 22,
  },
  listText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },

  // 커스텀 테이블 스타일 (가로 스크롤 허용)
  tableScrollWrapper: {
    marginBottom: 20,
    marginTop: 10,
  },
  tableContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.borderLight,
    minWidth: 500, // 모바일 화면보다 넓을 경우를 대비한 최소 너비
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundGray,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeaderText: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  tableCell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tableCellText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});