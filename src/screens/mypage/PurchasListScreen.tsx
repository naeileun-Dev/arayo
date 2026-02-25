import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';

import { colors as C } from '../../styles/colors';
import ReviewModal, { ReviewModalType } from '../../components/common/ReviewModal';

const BORDER_RADIUS = 4;
const HORIZONTAL_PAD = 15;

// ─────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────
type ItemState = 1 | 2 | 3 | 4 | 5;

interface PurchaseItem {
  id: string;
  state: ItemState;
  stateLabel: string;
  helpText?: string;
  image: string;
  title: string;
  price: string;
  buttons: Array<{
    label: string;
    type: 'primary' | 'light' | 'blue';
    action: string;
  }>;
  moreButtons?: Array<{ label: string; action: string }>;
}

interface MoreMenuState {
  itemId: string | null;
  y: number;
  right: number;
}

interface ReviewModalState {
  visible: boolean;
  type: ReviewModalType;
}

// ─────────────────────────────────────────
// 샘플 데이터
// ─────────────────────────────────────────
const PRODUCT_IMG = require('../../assets/images/img03.png');

const PURCHASE_ITEMS: PurchaseItem[] = [
  {
    id: '1',
    state: 1,
    stateLabel: '예약중(직거래)',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '배송 예약일 표시', type: 'blue', action: 'schedule' },
      { label: '판매자와 채팅하기', type: 'blue', action: 'chat' },
    ],
  },
  {
    id: '2',
    state: 1,
    stateLabel: '예약중(안전결제)',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '배송 예약일 표시', type: 'blue', action: 'schedule' },
      { label: '판매자와 채팅하기', type: 'blue', action: 'chat' },
    ],
  },
  {
    id: '3',
    state: 2,
    stateLabel: '입금대기',
    helpText: '입금을 진행해 주세요.',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '판매자와 채팅하기', type: 'blue', action: 'chat' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [{ label: '거래 취소', action: 'cancel' }],
  },
  {
    id: '4',
    state: 3,
    stateLabel: '입금완료',
    helpText: '입금 확인이 완료되었습니다. 판매자가 상품을 출고할 예정입니다.',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '배송 예약일 표시', type: 'blue', action: 'schedule' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [{ label: '판매자와 채팅하기', action: 'chat' }],
  },
  {
    id: '5',
    state: 4,
    stateLabel: '설치완료',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '구매확정', type: 'blue', action: 'confirm' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [{ label: '게시글 숨기기', action: 'hide' }],
  },
  {
    id: '6',
    state: 5,
    stateLabel: '거래완료(안전결제)',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '후기 보내기/받은 후기 보기/보낸 후기 보기', type: 'blue', action: 'review_send' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
  },
  {
    id: '7',
    state: 5,
    stateLabel: '거래완료(직거래)',
    image: 'img03',
    title: '접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H',
    price: '10,000,000원',
    buttons: [
      { label: '후기 보내기/받은 후기 보기/보낸 후기 보기', type: 'blue', action: 'review_send' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
  },
];

const PERIOD_OPTIONS = ['1개월', '3개월', '6개월', '12개월', '직접입력'];

// ─────────────────────────────────────────
// 상태색상 헬퍼
// ─────────────────────────────────────────
function getStateColor(state: ItemState): string {
  const map: Record<ItemState, string> = {
    1: C.state1,
    2: C.state2,
    3: C.state3,
    4: C.state4,
    5: C.state5,
  };
  return map[state];
}

// ─────────────────────────────────────────
// 버튼 컴포넌트
// ─────────────────────────────────────────
interface BtnProps {
  label: string;
  type?: 'primary' | 'light' | 'blue' | 'gray';
  flex?: number;
  onPress?: () => void;
  style?: object;
  small?: boolean;
}

const Btn: React.FC<BtnProps> = ({
  label,
  type = 'primary',
  flex,
  onPress,
  style,
  small,
}) => {
  const btnStyle = [
    styles.btn,
    small && styles.btnSmall,
    type === 'primary' && styles.btnPrimary,
    type === 'light' && styles.btnLight,
    type === 'blue' && styles.btnBlue,
    type === 'gray' && styles.btnGray,
    flex ? { flex } : null,
    style,
  ];
  const textStyle = [
    styles.btnText,
    small && styles.btnTextSmall,
    type === 'light' && styles.btnTextLight,
    type === 'blue' && styles.btnTextBlue,
    type === 'gray' && styles.btnTextGray,
  ];
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress} activeOpacity={0.75}>
      <Text style={textStyle} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────
// 구매 아이템 카드
// ─────────────────────────────────────────
interface ItemCardProps {
  item: PurchaseItem;
  onAction: (action: string, item: PurchaseItem) => void;
  onMorePress: (item: PurchaseItem, y: number, right: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAction, onMorePress }) => {
  const moreBtnRef = useRef<View>(null);
  const stateColor = getStateColor(item.state);

  // 버튼 렌더링
  const renderButtons = () => {
    const hasMore = item.moreButtons && item.moreButtons.length > 0;

    if (item.id === '6' || item.id === '7') {
      // 거래완료 - 후기 버튼 + 주문상세 같은 줄
      return (
        <View style={styles.itemBtnSet}>
          <Btn
            label="후기 보내기/받은 후기 보기/보낸 후기 보기"
            type="blue"
            flex={1}
            onPress={() => onAction('review_send', item)}
          />
          <Btn
            label="주문상세"
            type="light"
            onPress={() => onAction('detail', item)}
            style={{ paddingHorizontal: 10 }}
          />
        </View>
      );
    }

    return (
      <View style={styles.itemBtnSet}>
        {item.buttons.map((btn, idx) => (
          <Btn
            key={idx}
            label={btn.label}
            type={btn.type === 'blue' ? 'blue' : 'light'}
            flex={1}
            onPress={() => onAction(btn.action, item)}
          />
        ))}
        {hasMore && (
          <View ref={moreBtnRef} collapsable={false}>
            <TouchableOpacity
              style={styles.moreToggleBtn}
              onPress={() => {
                moreBtnRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
                  onMorePress(item, pageY + h, pageX + w);
                });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.moreToggleIcon}>···</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.itemCard}>
      {/* 상태 헤더 */}
      <View style={styles.itemHead}>
        <Text style={[styles.itemStateText, { color: stateColor }]}>
          {item.stateLabel}
        </Text>
        {item.helpText && (
          <Text style={styles.itemHelpText}>{item.helpText}</Text>
        )}
      </View>

      {/* 썸네일 + 정보 */}
      <View style={styles.itemBody}>
        <View style={styles.itemThumb}>
          <Image source={PRODUCT_IMG} style={styles.itemThumbImg} resizeMode="cover" />
        </View>
        <View style={styles.itemCon}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.itemInfoSet}>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        </View>
      </View>

      {/* 버튼 세트 */}
      <View style={styles.itemBtnArea}>{renderButtons()}</View>
    </View>
  );
};

// ─────────────────────────────────────────
// 메인 화면
// ─────────────────────────────────────────
const BuyListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedPeriod, setSelectedPeriod] = useState('직접입력');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | null>(null);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth() + 1);
  const [pickerDay, setPickerDay] = useState(new Date().getDate());
  const [moreOpen, setMoreOpen] = useState<MoreMenuState | null>(null);
  const [reviewModal, setReviewModal] = useState<ReviewModalState>({
    visible: false,
    type: null,
  });

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

  const openPicker = (target: 'start' | 'end') => {
    const current = target === 'start' ? startDate : endDate;
    const d = current || new Date();
    setPickerYear(d.getFullYear());
    setPickerMonth(d.getMonth() + 1);
    setPickerDay(d.getDate());
    setPickerTarget(target);
  };

  const confirmPicker = () => {
    const selected = new Date(pickerYear, pickerMonth - 1, pickerDay);
    if (pickerTarget === 'start') setStartDate(selected);
    else if (pickerTarget === 'end') setEndDate(selected);
    setPickerTarget(null);
  };

  const handleAction = (action: string, item: PurchaseItem) => {
    switch (action) {
      case 'review_send':
        setReviewModal({ visible: true, type: 'intro' });
        break;
      case 'review_received':
      case 'review_sent':
        setReviewModal({ visible: true, type: 'view' });
        break;
      case 'detail':
        navigation.navigate('OrderDetail');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={C.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>구매내역</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 기간 필터 ── */}
        <View style={styles.filterContainer}>
          {/* 기간 선택 라디오 버튼 행 */}
          <View style={styles.filterRow}>
            {PERIOD_OPTIONS.map((opt) => {
              const isChecked = selectedPeriod === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.periodBtn, isChecked && styles.periodBtnChecked]}
                  onPress={() => setSelectedPeriod(opt)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.periodBtnText,
                      isChecked && styles.periodBtnTextChecked,
                    ]}
                    numberOfLines={1}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 날짜 입력 행 */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.dateInputWrap}
              activeOpacity={0.75}
              onPress={() => openPicker('start')}
            >
              <Text style={[styles.dateInput, !startDate && { color: C.G400 }]}>
                {startDate ? formatDate(startDate) : 'YYYY-MM-DD'}
              </Text>
              <CalendarIcon width={16} height={16} color={C.G500} />
            </TouchableOpacity>
            <Text style={styles.dateSeparator}>~</Text>
            <TouchableOpacity
              style={styles.dateInputWrap}
              activeOpacity={0.75}
              onPress={() => openPicker('end')}
            >
              <Text style={[styles.dateInput, !endDate && { color: C.G400 }]}>
                {endDate ? formatDate(endDate) : 'YYYY-MM-DD'}
              </Text>
              <CalendarIcon width={16} height={16} color={C.G500} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 날짜 그룹 헤더 ── */}
        <View style={styles.productHead}>
          <Text style={styles.productHeadText}>25. 07. 21</Text>
        </View>

        {/* ── 상품 목록 ── */}
        {PURCHASE_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onAction={handleAction} onMorePress={(it, y, right) => setMoreOpen({ itemId: it.id, y, right })} />
        ))}
      </ScrollView>

      {/* ── 날짜 선택 모달 ── */}
      {pickerTarget && (
        <Modal transparent animationType="slide" onRequestClose={() => setPickerTarget(null)}>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setPickerTarget(null)}>
                  <Text style={styles.pickerCancel}>취소</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>
                  {pickerTarget === 'start' ? '시작일' : '종료일'} 선택
                </Text>
                <TouchableOpacity onPress={confirmPicker}>
                  <Text style={styles.pickerDone}>완료</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerBody}>
                {/* 연도 */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map((y) => (
                    <TouchableOpacity
                      key={y}
                      style={[styles.pickerItem, pickerYear === y && styles.pickerItemActive]}
                      onPress={() => setPickerYear(y)}
                    >
                      <Text style={[styles.pickerItemText, pickerYear === y && styles.pickerItemTextActive]}>
                        {y}년
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* 월 */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.pickerItem, pickerMonth === m && styles.pickerItemActive]}
                      onPress={() => {
                        setPickerMonth(m);
                        const maxDay = getDaysInMonth(pickerYear, m);
                        if (pickerDay > maxDay) setPickerDay(maxDay);
                      }}
                    >
                      <Text style={[styles.pickerItemText, pickerMonth === m && styles.pickerItemTextActive]}>
                        {m}월
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* 일 */}
                <ScrollView style={styles.pickerCol} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: getDaysInMonth(pickerYear, pickerMonth) }, (_, i) => i + 1).map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[styles.pickerItem, pickerDay === d && styles.pickerItemActive]}
                      onPress={() => setPickerDay(d)}
                    >
                      <Text style={[styles.pickerItemText, pickerDay === d && styles.pickerItemTextActive]}>
                        {d}일
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* ── 더보기 드롭다운 모달 ── */}
      {moreOpen && (() => {
        const targetItem = PURCHASE_ITEMS.find((it) => it.id === moreOpen.itemId);
        if (!targetItem || !targetItem.moreButtons) return null;
        return (
          <Modal transparent animationType="none" onRequestClose={() => setMoreOpen(null)}>
            <TouchableOpacity
              style={styles.moreOverlay}
              activeOpacity={1}
              onPress={() => setMoreOpen(null)}
            >
              <View style={[styles.moreMenu, { position: 'absolute', top: moreOpen.y + 4, right: 15 }]}>
                {targetItem.moreButtons.map((btn, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.moreMenuItem}
                    onPress={() => {
                      handleAction(btn.action, targetItem);
                      setMoreOpen(null);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moreMenuText}>{btn.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[styles.moreMenuItem, { borderBottomWidth: 0 }]}
                  onPress={() => setMoreOpen(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moreMenuText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        );
      })()}

      {/* ── 후기 모달 ── */}
      <ReviewModal
        visible={reviewModal.visible}
        type={reviewModal.type}
        onClose={() => setReviewModal({ visible: false, type: null })}
        onChangeType={(type) => setReviewModal({ visible: true, type })}
      />
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // ── 헤더 ──
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PAD,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
    backgroundColor: '#fff',
  },
  headerBack: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackIcon: {
    fontSize: 24,
    color: C.black,
    lineHeight: 28,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: C.black,
  },
  headerRight: {
    width: 36,
  },

  // ── 스크롤 ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PAD,
    paddingBottom: 40,
  },

  // ── 필터 ──
  filterContainer: {
    paddingVertical: 10,
    gap: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  periodBtn: {
    flex: 1,
    height: 40,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: C.G200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  periodBtnChecked: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  periodBtnText: {
    fontSize: 12,
    fontWeight: '500',
    color: C.G600,
  },
  periodBtnTextChecked: {
    color: '#fff',
  },
  dateInputWrap: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: C.G200,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dateInput: {
    flex: 1,
    fontSize: 13,
    color: C.black,
  },
  dateSeparator: {
    fontSize: 14,
    color: C.G600,
    paddingHorizontal: 4,
  },

  // ── 상품 날짜 헤더 ──
  productHead: {
    marginBottom: 10,
  },
  productHeadText: {
    fontSize: 16,
    color: C.black,
  },

  // ── 아이템 카드 (webzine style) ──
  itemCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 18,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
    paddingVertical: 20,
  },
  itemHead: {
    width: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  itemStateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemHelpText: {
    fontSize: 12,
    color: C.G400,
    marginTop: 2,
  },
  itemBody: {
    flexDirection: 'row',
    width: '100%',
    gap: 0,
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    marginRight: 0,
  },
  itemThumbImg: {
    width: 60,
    height: 60,
  },
  itemCon: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 10,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: C.black,
    lineHeight: 20,
  },
  itemInfoSet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: C.black,
  },
  itemBtnArea: {
    width: '100%',
  },
  itemBtnSet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  itemBtnSetCol: {
    flexDirection: 'column',
    gap: 5,
  },

  // ── 더보기 드롭다운 ──
  moreOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  moreToggleBtn: {
    width: 44,
    height: 44,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: C.G200,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#fff',
  },
  moreToggleIcon: {
    fontSize: 16,
    color: C.G600,
    fontWeight: '800' as const,
    letterSpacing: 2,
  },
  moreMenu: {
    backgroundColor: '#fff',
    borderRadius: 6,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  moreMenuItem: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.G100,
  },
  moreMenuText: {
    fontSize: 14,
    color: C.black,
    fontWeight: '600' as const,
  },

  // ── 공통 버튼 ──
  btn: {
    height: 44,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  btnSmall: {
    height: 36,
  },
  btnPrimary: {
    backgroundColor: C.primary,
  },
  btnLight: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.G200,
  },
  btnBlue: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.G200,
  },
  btnGray: {
    backgroundColor: C.G100,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  btnTextSmall: {
    fontSize: 13,
  },
  btnTextLight: {
    color: C.black,
  },
  btnTextBlue: {
    color: C.system100,
  },
  btnTextGray: {
    color: C.G800,
  },

  // ── 달력 피커 (iOS) ──
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  pickerCancel: {
    fontSize: 15,
    color: C.G600,
  },
  pickerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: C.black,
  },
  pickerDone: {
    fontSize: 15,
    fontWeight: '600',
    color: C.primary,
  },
  pickerBody: {
    flexDirection: 'row',
    height: 260,
  },
  pickerCol: {
    flex: 1,
  },
  pickerItem: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemActive: {
    backgroundColor: C.G100,
  },
  pickerItemText: {
    fontSize: 15,
    color: C.G500,
  },
  pickerItemTextActive: {
    color: C.black,
    fontWeight: '600',
  },
});

export default BuyListScreen;