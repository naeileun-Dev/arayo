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
import ReviewModal, { ReviewModalType } from '../common/ReviewModal';
import type { TradeItem, TradeState } from '../../types';

const BORDER_RADIUS = 4;
const HORIZONTAL_PAD = 15;
const PRODUCT_IMG = require('../../assets/images/img03.png');
const PERIOD_OPTIONS = ['1개월', '3개월', '6개월', '12개월', '직접입력'];

interface TradeListScreenProps {
  title: string;
  items: TradeItem[];
}

interface MoreMenuState {
  itemId: string;
  y: number;
  right: number;
}

function getStateColor(state: TradeState): string {
  const map: Record<TradeState, string> = {
    1: C.state1,
    2: C.state2,
    3: C.state3,
    4: C.state4,
    5: C.state5,
  };
  return map[state];
}

interface BtnProps {
  label: string;
  type?: 'primary' | 'light' | 'blue' | 'gray';
  flex?: number;
  onPress?: () => void;
  style?: object;
}

const Btn: React.FC<BtnProps> = ({ label, type = 'primary', flex, onPress, style }) => {
  const btnStyle = [
    styles.btn,
    type === 'primary' && styles.btnPrimary,
    type === 'light' && styles.btnLight,
    type === 'blue' && styles.btnBlue,
    type === 'gray' && styles.btnGray,
    flex ? { flex } : null,
    style,
  ];
  const textStyle = [
    styles.btnText,
    type === 'light' && styles.btnTextLight,
    type === 'blue' && styles.btnTextBlue,
    type === 'gray' && styles.btnTextGray,
  ];
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress} activeOpacity={0.75}>
      <Text style={textStyle} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
};

interface ItemCardProps {
  item: TradeItem;
  onAction: (action: string, item: TradeItem) => void;
  onMorePress: (item: TradeItem, y: number, right: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onAction, onMorePress }) => {
  const moreBtnRef = useRef<View>(null);
  const stateColor = getStateColor(item.state);
  const hasMore = item.moreButtons && item.moreButtons.length > 0;
  const hasReviewBtn = item.buttons.some((b) => b.action === 'review_send');

  const renderButtons = () => {
    if (hasReviewBtn) {
      const hasDetail = item.buttons.some((b) => b.action === 'detail');
      return (
        <View style={styles.itemBtnSet}>
          <Btn
            label="후기 보내기/받은 후기 보기/보낸 후기 보기"
            type="blue"
            flex={1}
            onPress={() => onAction('review_send', item)}
          />
          {hasDetail && (
            <Btn
              label="주문상세"
              type="light"
              onPress={() => onAction('detail', item)}
              style={{ paddingHorizontal: 10 }}
            />
          )}
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
      <View style={styles.itemHead}>
        <Text style={[styles.itemStateText, { color: stateColor }]}>{item.stateLabel}</Text>
        {item.helpText && <Text style={styles.itemHelpText}>{item.helpText}</Text>}
      </View>

      <View style={styles.itemBody}>
        <View style={styles.itemThumb}>
          <Image source={PRODUCT_IMG} style={styles.itemThumbImg} resizeMode="cover" />
        </View>
        <View style={styles.itemCon}>
          <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.itemInfoSet}>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        </View>
      </View>

      <View style={styles.itemBtnArea}>{renderButtons()}</View>
    </View>
  );
};

const TradeListScreen: React.FC<TradeListScreenProps> = ({ title, items }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedPeriod, setSelectedPeriod] = useState('직접입력');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickerTarget, setPickerTarget] = useState<'start' | 'end' | null>(null);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth() + 1);
  const [pickerDay, setPickerDay] = useState(new Date().getDate());
  const [moreOpen, setMoreOpen] = useState<MoreMenuState | null>(null);
  const [reviewModal, setReviewModal] = useState<{ visible: boolean; type: ReviewModalType }>({
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

  const handleAction = (action: string, _item: TradeItem) => {
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
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={C.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.filterContainer}>
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
                  <Text style={[styles.periodBtnText, isChecked && styles.periodBtnTextChecked]} numberOfLines={1}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.dateInputWrap} activeOpacity={0.75} onPress={() => openPicker('start')}>
              <Text style={[styles.dateInput, !startDate && { color: C.G400 }]}>
                {startDate ? formatDate(startDate) : 'YYYY-MM-DD'}
              </Text>
              <CalendarIcon width={16} height={16} color={C.G500} />
            </TouchableOpacity>
            <Text style={styles.dateSeparator}>~</Text>
            <TouchableOpacity style={styles.dateInputWrap} activeOpacity={0.75} onPress={() => openPicker('end')}>
              <Text style={[styles.dateInput, !endDate && { color: C.G400 }]}>
                {endDate ? formatDate(endDate) : 'YYYY-MM-DD'}
              </Text>
              <CalendarIcon width={16} height={16} color={C.G500} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productHead}>
          <Text style={styles.productHeadText}>25. 07. 21</Text>
        </View>

        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onAction={handleAction}
            onMorePress={(it, y, right) => setMoreOpen({ itemId: it.id, y, right })}
          />
        ))}
      </ScrollView>

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

      {moreOpen && (() => {
        const targetItem = items.find((it) => it.id === moreOpen.itemId);
        if (!targetItem || !targetItem.moreButtons) return null;
        return (
          <Modal transparent animationType="none" onRequestClose={() => setMoreOpen(null)}>
            <TouchableOpacity style={styles.moreOverlay} activeOpacity={1} onPress={() => setMoreOpen(null)}>
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

      <ReviewModal
        visible={reviewModal.visible}
        type={reviewModal.type}
        onClose={() => setReviewModal({ visible: false, type: null })}
        onChangeType={(type) => setReviewModal({ visible: true, type })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PAD,
    paddingBottom: 40,
  },
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
  productHead: {
    marginBottom: 10,
  },
  productHeadText: {
    fontSize: 16,
    color: C.black,
  },
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
  },
  itemThumb: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
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
  btn: {
    height: 44,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
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
  btnTextLight: {
    color: C.black,
  },
  btnTextBlue: {
    color: C.system100,
  },
  btnTextGray: {
    color: C.G800,
  },
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

export default TradeListScreen;
