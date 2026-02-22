import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const LEFT_SIDEBAR_WIDTH = Math.round(SCREEN_WIDTH * 0.25);
import { useNavigation } from '@react-navigation/native';

// 프로젝트 아이콘
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import SearchIcon from '../../assets/icon/Search.svg';

// 카테고리 아이콘
import MachiningIcon from '../../assets/icon/category/machining.svg';
import MachiningActiveIcon from '../../assets/icon/category/machining_active.svg';
import InjectionIcon from '../../assets/icon/category/injection.svg';
import InjectionActiveIcon from '../../assets/icon/category/injection_active.svg';
import WeldingIcon from '../../assets/icon/category/welding.svg';
import WeldingActiveIcon from '../../assets/icon/category/welding_active.svg';
import WoodIcon from '../../assets/icon/category/wood.svg';
import WoodActiveIcon from '../../assets/icon/category/wood_active.svg';
import LogisticsIcon from '../../assets/icon/category/logistics.svg';
import LogisticsActiveIcon from '../../assets/icon/category/logistics_active.svg';
import RoboticsIcon from '../../assets/icon/category/robotics.svg';
import RoboticsActiveIcon from '../../assets/icon/category/robotics_active.svg';
import PackingIcon from '../../assets/icon/category/packing.svg';
import PackingActiveIcon from '../../assets/icon/category/packing_active.svg';
import GrindingIcon from '../../assets/icon/category/grinding.svg';
import GrindingActiveIcon from '../../assets/icon/category/grinding_active.svg';
import ToolsIcon from '../../assets/icon/category/tools.svg';
import ToolsActiveIcon from '../../assets/icon/category/tools_active.svg';
import SuppliesIcon from '../../assets/icon/category/supplies.svg';
import SuppliesActiveIcon from '../../assets/icon/category/supplies_active.svg';
import OthersIcon from '../../assets/icon/category/others.svg';
import OthersActiveIcon from '../../assets/icon/category/others_active.svg';

// 스타일 시스템
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

// 아이콘 매핑
const CATEGORY_ICONS: { icon: React.FC<any>; activeIcon: React.FC<any> }[] = [
  { icon: MachiningIcon, activeIcon: MachiningActiveIcon },
  { icon: InjectionIcon, activeIcon: InjectionActiveIcon },
  { icon: WeldingIcon, activeIcon: WeldingActiveIcon },
  { icon: WoodIcon, activeIcon: WoodActiveIcon },
  { icon: LogisticsIcon, activeIcon: LogisticsActiveIcon },
  { icon: RoboticsIcon, activeIcon: RoboticsActiveIcon },
  { icon: PackingIcon, activeIcon: PackingActiveIcon },
  { icon: GrindingIcon, activeIcon: GrindingActiveIcon },
  { icon: ToolsIcon, activeIcon: ToolsActiveIcon },
  { icon: SuppliesIcon, activeIcon: SuppliesActiveIcon },
  { icon: OthersIcon, activeIcon: OthersActiveIcon },
];

// HTML에서 추출한 카테고리 데이터 변환
const CATEGORY_DATA = [
  { id: 'machine_tools', title: '공작기계', data: ['CNC 선반', 'CNC복합기', 'MCT(머시닝센터)', '범용 밀링', '범용 선반', '보링기', '기타'] },
  { id: 'mold_injection', title: '금형/사출기', data: ['플라스틱 사출', '성형기', '플라스틱 가공기', '고무 성형기', '고무 가공기', '와이어 커팅기', '방전가공기', '기타'] },
  { id: 'sheet_metal_welding', title: '판금/용접', data: ['프레스', '절곡기', '샤링기', '펀칭기', '레이저 절단기', '플라스마 절단기', '용접기(파이버, Co2, 인버터, 스포트, 토치)', '드릴기', '기타(워터젯/산소 절단기/가스 절단기)'] },
  { id: 'woodworking_machines', title: '목공기계', data: ['보링기', 'CNC러닝쏘(재단기)', '엣지밴딩기', '스키퍼', '루타기', '파쇄기/분쇄기/톱밥제조기', '네스팅머신', '기타'] },
  { id: 'material_handling_heavy', title: '운반/중장비', data: ['지게차(디젤, 전동)', '전동 스태커', '고소 작업대', '컨베이어', '크레인/호이스트', '에어발란스/암 크레인', '건설중장비', '기타'] },
  { id: 'industrial_robots', title: '산업용 로봇', data: ['협동 로봇', '산업용 로봇', '용접 로봇', '서비스용 로봇', '이적재용 로봇', '기타'] },
  { id: 'food_packaging', title: '식품/포장 기계', data: ['랩핑기', '마킹기', '여과기', '포장기', '충진기', '식품성형기', '식품절단기', '혼합기', '세척기', '기타'] },
  { id: 'cutting_grinding', title: '절삭/연마/연삭', data: ['밴드쏘', '원형톱기계', '톱날', '파이프절단기', '연마기/연삭기', '기타'] },
  { id: 'tools_parts', title: '공구/부품', data: ['전동공구', '카타기', '그라인더', '드라이버', '측정기·계측장비', '볼트/너트/베어링/체인', '호스', '기타'] },
  { id: 'consumables', title: '소모품', data: ['절삭유', '용접포', '유압작동유', '기어오일', '가공유', '세척유', '인발유', '기타'] },
  { id: 'other_equipment', title: '기타 설비', data: ['쇼트기', '철근/코일 가공기', '프린트/3D프린트', '집진기', '작업대 · 공구함', '기타'] },
];

export const CategoryScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // 필요에 따라 타입 구체화 (ex: RootStackNavigationProp)
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 스크롤 동기화를 위한 Ref
  const rightScrollRef = useRef<ScrollView>(null);
  const leftScrollRef = useRef<ScrollView>(null);
  const sectionLayouts = useRef<{ [key: number]: number }>({});
  const leftItemLayouts = useRef<{ [key: number]: number }>({});
  
  // 사용자가 탭을 클릭해서 이동 중인지 여부 (스크롤 이벤트 중복 방지)
  const isProgrammaticScroll = useRef(false);

  // 1. 좌측 1뎁스 메뉴 클릭 핸들러
  const handleLeftMenuPress = (index: number) => {
    setActiveIndex(index);
    isProgrammaticScroll.current = true;
    
    // 우측 콘텐츠 해당 위치로 스크롤
    const yPos = sectionLayouts.current[index] || 0;
    rightScrollRef.current?.scrollTo({ y: yPos, animated: true });

    // 좌측 메뉴도 중앙으로 오도록 포커싱
    const leftYPos = leftItemLayouts.current[index] || 0;
    leftScrollRef.current?.scrollTo({ y: Math.max(0, leftYPos - 150), animated: true });

    // 스크롤 애니메이션이 끝날 즈음 flag 해제
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- 헤더 영역 --- */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>카테고리</Text>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <SearchIcon width={24} height={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* --- 콘텐츠 영역 (좌/우 분할) --- */}
      <View style={styles.contentContainer}>
        
        {/* 좌측 1차 카테고리 메뉴 */}
        <View style={styles.leftSidebarWrapper}>
          <ScrollView
            ref={leftScrollRef}
            showsVerticalScrollIndicator={false}
          >
            {CATEGORY_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              const icons = CATEGORY_ICONS[index];
              const IconComponent = isActive ? icons.activeIcon : icons.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.leftMenuItem, isActive && styles.leftMenuItemActive]}
                  onPress={() => handleLeftMenuPress(index)}
                  onLayout={(e) => {
                    leftItemLayouts.current[index] = e.nativeEvent.layout.y;
                  }}
                  activeOpacity={0.8}
                >
                  <IconComponent width={28} height={28} />
                  <Text style={[styles.leftMenuText, isActive && styles.leftMenuTextActive]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 우측 2차 카테고리 리스트 - 선택된 카테고리만 표시 */}
        <ScrollView
          style={styles.rightContent}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORY_DATA[activeIndex].data.map((subItem, subIndex) => (
            <TouchableOpacity
              key={`${CATEGORY_DATA[activeIndex].id}-${subIndex}`}
              style={styles.subItem}
              onPress={() => {
                (navigation as any).navigate('CategoryList', { category: CATEGORY_DATA[activeIndex].title, subCategory: subItem });
              }}
            >
              <Text style={styles.subItemText}>{subItem}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // 헤더 스타일
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
  headerButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  // 메인 레이아웃
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  // 좌측 사이드바 (1차 카테고리)
  leftSidebarWrapper: {
    width: LEFT_SIDEBAR_WIDTH,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.borderLight,
    overflow: 'hidden',
  },
  leftMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  leftMenuItemActive: {
    backgroundColor: colors.primary,
  },
  leftMenuText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  leftMenuTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  // 우측 콘텐츠 (2차 카테고리)
  rightContent: {
    flex: 1,
    backgroundColor: colors.G100,
  },
  subItem: {
    backgroundColor: colors.G100,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  subItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
});