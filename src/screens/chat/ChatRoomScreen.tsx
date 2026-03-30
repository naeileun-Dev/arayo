import React, { useRef, useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';
import ChevronRightIcon from '../../assets/icon/chevron-right.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';
import XIcon from '../../assets/icon/X.svg';
import type { RootStackParamList } from '../../types';
import { CompareToast } from '../../components/common';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const userAvatar = require('../../assets/images/user01.png');
const gearIcon = require('../../assets/images/Gear_Icons.png');
const productImage = require('../../assets/images/img01.png');
const chatImage = require('../../assets/images/img02.png');

const PADDING_LR = 20;

// Fixed image sizes for chat — 통일된 너비
const IMAGE_CONTAINER_WIDTH = 200;
const IMAGE_GAP = 4;
const IMAGE_SIZE_SINGLE = IMAGE_CONTAINER_WIDTH;
const IMAGE_SIZE_DOUBLE = (IMAGE_CONTAINER_WIDTH - IMAGE_GAP) / 2;
const IMAGE_SIZE_TRIPLE = (IMAGE_CONTAINER_WIDTH - IMAGE_GAP * 2) / 3;
const IMAGE_SIZE_GRID = (IMAGE_CONTAINER_WIDTH - IMAGE_GAP) / 2;

// Chat context types
type ChatContextType = 'product' | 'reservation' | 'payment_before' | 'payment_after';
type UserType = 'personal' | 'business';

interface ChatRoomParams {
  chatId: string;
  chatContext?: ChatContextType;
  userType?: UserType;
}

type ChatItem =
  | { type: 'date'; text: string }
  | { type: 'received'; id: string; name: string; text: string; time: string; userType?: UserType }
  | { type: 'sent'; id: string; text: string; time: string; unread?: boolean }
  | { type: 'alarm'; id: string; title: string; time: string; body: string; btnText: string }
  | { type: 'image'; id: string; name: string; images: any[]; time: string; userType?: UserType };

const CHAT_DATA: ChatItem[] = [
  { type: 'date', text: '2025년 11월 11일 목요일' },
  {
    type: 'received',
    id: 'msg1',
    name: '판매자 이름',
    text: '안녕하세요, 구매자입니다. 접촉+비접촉 겸용 래쇼날 CNC 비디오 메타 CS-3020H에 대한 거래 진행 중입니다.',
    time: '오후 8:01',
    userType: 'personal',
  },
  {
    type: 'sent',
    id: 'msg2',
    text: '네',
    time: '오후 7:23',
    unread: true,
  },
  {
    type: 'alarm',
    id: 'alarm1',
    title: '알림이 도착했어요',
    time: '오후 8:01',
    body: '안녕하세요, 아라요 기계장터입니다.\n거래는 만족스럽게 진행되셨나요?\n간단하게 눌러서 상품 상태를 업데이트해 주세요!',
    btnText: '거래 완료하기',
  },
];

// Additional data for image messages demo
const IMAGE_CHAT_DATA: ChatItem[] = [
  { type: 'date', text: '2025년 11월 11일 목요일' },
  {
    type: 'received',
    id: 'msg1',
    name: '아라요 기계장터',
    text: '안녕하세요, 구매자입니다. 접촉+비접촉 겸용 래쇼날 CNC 비디오 메타 CS-3020H에 대한 거래 진행 중입니다.',
    time: '오후 8:01',
    userType: 'business',
  },
  {
    type: 'sent',
    id: 'msg2',
    text: '네',
    time: '오후 7:23',
    unread: true,
  },
  {
    type: 'image',
    id: 'img1',
    name: '아라요 기계장터',
    images: [chatImage],
    time: '오후 8:01',
    userType: 'business',
  },
  {
    type: 'image',
    id: 'img2',
    name: '아라요 기계장터',
    images: [chatImage, chatImage],
    time: '오후 8:01',
    userType: 'business',
  },
  {
    type: 'image',
    id: 'img3',
    name: '아라요 기계장터',
    images: [chatImage, chatImage, chatImage],
    time: '오후 8:01',
    userType: 'business',
  },
  {
    type: 'image',
    id: 'img4',
    name: '아라요 기계장터',
    images: [chatImage, chatImage, chatImage, chatImage],
    time: '오후 8:01',
    userType: 'business',
  },
  {
    type: 'image',
    id: 'img5',
    name: '아라요 기계장터',
    images: [chatImage, chatImage, chatImage, chatImage, chatImage, chatImage],
    time: '오후 8:01',
    userType: 'business',
  },
];

// Report reasons
const REPORT_REASONS = [
  '스팸/광고',
  '욕설/비하',
  '사기 의심',
  '부적절한 콘텐츠',
  '기타',
];

// Date Divider Component
const DateDivider: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.dateDivider}>
    <Text style={styles.dateDividerIcon}>📅</Text>
    <Text style={styles.dateDividerText}>{text}</Text>
  </View>
);

// Received Message Component
interface ReceivedProps {
  name: string;
  text: string;
  time: string;
  userType?: UserType;
}
const ReceivedMessage: React.FC<ReceivedProps> = ({ name, text, time, userType = 'personal' }) => (
  <View style={styles.chatListRow}>
    {userType === 'business' ? (
      <View style={styles.businessAvatar}>
        <Image source={gearIcon} style={styles.gearIcon} resizeMode="contain" />
      </View>
    ) : (
      <Image source={userAvatar} style={styles.chatAvatar} />
    )}
    <View style={styles.receivedBody}>
      <Text style={styles.chatName}>{name}</Text>
      <View style={styles.bubWrap}>
        <View style={[styles.chatBubble, styles.chatBubbleReceived]}>
          <Text style={styles.chatBubbleText}>{text}</Text>
        </View>
        <Text style={styles.chatTime}>{time}</Text>
      </View>
    </View>
  </View>
);

// Sent Message Component
interface SentProps {
  text: string;
  time: string;
  unread?: boolean;
}
const SentMessage: React.FC<SentProps> = ({ text, time, unread }) => (
  <View style={styles.chatListMy}>
    <View style={styles.sentBody}>
      <View style={styles.bubWrapMy}>
        <View style={styles.sentTimeCol}>
          {unread && <Text style={styles.chatUnread}>안읽음</Text>}
          <Text style={styles.chatTime}>{time}</Text>
        </View>
        <View style={[styles.chatBubble, styles.chatBubbleMy]}>
          <Text style={styles.chatBubbleText}>{text}</Text>
        </View>
      </View>
    </View>
  </View>
);

// Image Message Component
interface ImageMessageProps {
  name: string;
  images: any[];
  time: string;
  userType?: UserType;
  onImagePress: (images: any[], index: number) => void;
}
const ImageMessage: React.FC<ImageMessageProps> = ({ name, images, time, userType = 'personal', onImagePress }) => {
  const imageCount = images.length;
  const displayImages = imageCount > 4 ? images.slice(0, 4) : images;
  const extraCount = imageCount > 4 ? imageCount - 4 : 0;

  const getImageSize = () => {
    if (imageCount === 1) return IMAGE_SIZE_SINGLE;
    if (imageCount === 2) return IMAGE_SIZE_DOUBLE;
    if (imageCount === 3) return IMAGE_SIZE_TRIPLE;
    return IMAGE_SIZE_GRID;
  };

  const imageSize = getImageSize();
  const isGridLayout = imageCount >= 4;

  return (
    <View style={styles.chatListRow}>
      {userType === 'business' ? (
        <View style={styles.businessAvatar}>
          <Image source={gearIcon} style={styles.gearIcon} resizeMode="contain" />
        </View>
      ) : (
        <Image source={userAvatar} style={styles.chatAvatar} />
      )}
      <View style={styles.receivedBody}>
        <Text style={styles.chatName}>{name}</Text>
        <View style={styles.imageGridWrap}>
          <View style={[
            styles.imageGrid,
            imageCount === 1 && styles.imageGridSingle,
            isGridLayout && { width: IMAGE_CONTAINER_WIDTH, flexWrap: 'wrap' },
          ]}>
            {displayImages.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onImagePress(images, idx)}
                activeOpacity={0.8}
              >
                <View style={[styles.imageThumb, { width: imageSize, height: imageSize }]}>
                  <Image source={img} style={styles.imageThumbImg} resizeMode="cover" />
                  {idx === 3 && extraCount > 0 && (
                    <View style={styles.imageOverlay}>
                      <Text style={styles.imageOverlayText}>{extraCount}+</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.chatTime}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

// Alarm Box Component
interface AlarmProps {
  title: string;
  time: string;
  body: string;
  btnText: string;
  onPress?: () => void;
}
const AlarmBox: React.FC<AlarmProps> = ({ title, time, body, btnText, onPress }) => (
  <View style={styles.alarmBox}>
    <View style={styles.alarmHead}>
      <View style={styles.alarmTitleWrap}>
        <Text style={styles.alarmBell}>🔔</Text>
        <Text style={styles.alarmTitle}>{title}</Text>
      </View>
      <Text style={styles.alarmTime}>{time}</Text>
    </View>
    <View style={styles.alarmCon}>
      <Text style={styles.alarmBody}>{body}</Text>
      <TouchableOpacity style={styles.alarmBtn} onPress={onPress} activeOpacity={0.85}>
        <Text style={styles.alarmBtnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Menu Modal Component
interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  chatContext: ChatContextType;
  onChatEnd: () => void;
  onReport: () => void;
  onCancelOrder?: () => void;
}
const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  onClose,
  chatContext,
  onChatEnd,
  onReport,
  onCancelOrder,
}) => {
  const getMenuItems = () => {
    switch (chatContext) {
      case 'payment_before':
        return [
          { label: '주문 취소', onPress: onCancelOrder },
          { label: '채팅 종료하기', onPress: onChatEnd },
          { label: '신고하기', onPress: onReport },
        ];
      case 'payment_after':
        return [
          { label: '채팅 종료하기', onPress: onChatEnd },
          { label: '신고하기', onPress: onReport },
        ];
      case 'reservation':
      case 'product':
      default:
        return [
          { label: '채팅 종료하기', onPress: onChatEnd },
          { label: '신고하기', onPress: onReport },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, index < menuItems.length - 1 && styles.menuItemBorder]}
              onPress={() => {
                onClose();
                item.onPress?.();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.menuItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Report Modal Component
interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const ReportModal: React.FC<ReportModalProps> = ({ visible, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [reasonText, setReasonText] = useState('');
  const [showReasonPicker, setShowReasonPicker] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>신고하기</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <XIcon width={24} height={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalLabel}>신고 사유 선택</Text>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowReasonPicker(!showReasonPicker)}
              activeOpacity={0.7}
            >
              <Text style={[styles.selectBoxText, !selectedReason && styles.selectBoxPlaceholder]}>
                {selectedReason || '신고 사유를 선택해주세요.'}
              </Text>
              <ChevronDownIcon width={20} height={20} color={colors.G500} />
            </TouchableOpacity>

            {showReasonPicker && (
              <View style={styles.reasonPicker}>
                {REPORT_REASONS.map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    style={styles.reasonItem}
                    onPress={() => {
                      setSelectedReason(reason);
                      setShowReasonPicker(false);
                    }}
                  >
                    <Text style={styles.reasonItemText}>{reason}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={[styles.modalLabel, { marginTop: 24 }]}>신고 사유 입력</Text>
            <TextInput
              style={styles.reportTextArea}
              placeholder={'신고내용을 직접 작성해주세요.\n자세하게 적어주시면 신고처리에 큰 도움이 됩니다.'}
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              value={reasonText}
              onChangeText={setReasonText}
            />
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.modalBtnCancel} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.modalBtnCancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnPrimary} onPress={onSubmit} activeOpacity={0.8}>
              <Text style={styles.modalBtnPrimaryText}>신고하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Chat Exit Modal Component
interface ChatExitModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const ChatExitModal: React.FC<ChatExitModalProps> = ({ visible, onClose, onConfirm }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={styles.confirmModalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>채팅방 나가기</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <XIcon width={24} height={24} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.confirmModalBody}>
          <Text style={styles.confirmModalText}>채팅방을 나가시겠습니까?</Text>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalBtnCancel} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.modalBtnCancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBtnPrimary} onPress={onConfirm} activeOpacity={0.8}>
            <Text style={styles.modalBtnPrimaryText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// Calendar Picker Component
const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}
const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onSelect }) => {
  const [viewYear, setViewYear] = useState(() => {
    const d = selectedDate || new Date();
    return d.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const d = selectedDate || new Date();
    return d.getMonth();
  });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isSelected = (day: number) =>
    selectedDate &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  return (
    <View style={calSt.wrap}>
      <View style={calSt.header}>
        <Text style={calSt.monthTitle}>{viewYear}년 {viewMonth + 1}월</Text>
        <View style={calSt.navBtns}>
          <TouchableOpacity onPress={prevMonth} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ChevronLeftIcon width={20} height={20} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMonth} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ marginLeft: 16 }}>
            <ChevronRightIcon width={20} height={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={calSt.weekRow}>
        {WEEK_DAYS.map(d => (
          <Text key={d} style={calSt.weekLabel}>{d}</Text>
        ))}
      </View>

      <View style={calSt.grid}>
        {cells.map((day, idx) => (
          <TouchableOpacity
            key={idx}
            style={calSt.dayCell}
            disabled={!day}
            onPress={() => day && onSelect(new Date(viewYear, viewMonth, day))}
            activeOpacity={0.7}
          >
            {day ? (
              <View style={[calSt.dayInner, isSelected(day) && calSt.daySelected]}>
                <Text style={[calSt.dayText, isSelected(day) && calSt.daySelectedText]}>{day}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const calSt = StyleSheet.create({
  wrap: { paddingHorizontal: 4, paddingTop: 8 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  monthTitle: { fontSize: 20, fontWeight: '700', color: colors.black },
  navBtns: { flexDirection: 'row', alignItems: 'center' },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekLabel: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '500', color: colors.G500 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 },
  dayInner: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: colors.primary },
  dayText: { fontSize: 16, fontWeight: '500', color: colors.black },
  daySelectedText: { color: colors.white, fontWeight: '700' },
});

// Reservation Modal Component
interface ReservationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}
const ReservationModal: React.FC<ReservationModalProps> = ({ visible, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

  const handleConfirm = () => {
    if (!selectedDate) return;
    onConfirm(selectedDate);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={rsvSt.overlay}>
        <View style={rsvSt.container}>
          <View style={rsvSt.header}>
            <Text style={rsvSt.title}>예약하기</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <XIcon width={24} height={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={rsvSt.body}>
            <View style={rsvSt.labelRow}>
              <Text style={rsvSt.label}>배송 날짜</Text>
              <Text style={rsvSt.required}> *</Text>
            </View>

            <TouchableOpacity
              style={rsvSt.dateInput}
              onPress={() => setShowCalendar(v => !v)}
              activeOpacity={0.7}
            >
              <Text style={[rsvSt.dateText, !selectedDate && rsvSt.datePlaceholder]}>
                {selectedDate ? formatDate(selectedDate) : '날짜를 선택해 주세요.'}
              </Text>
              <CalendarIcon width={24} height={24} color={colors.G500} />
            </TouchableOpacity>

            {showCalendar && (
              <CalendarPicker
                selectedDate={selectedDate}
                onSelect={(d) => {
                  setSelectedDate(d);
                  setShowCalendar(false);
                }}
              />
            )}
          </View>

          {!showCalendar && (
            <View style={rsvSt.footer}>
              <TouchableOpacity style={rsvSt.btnCancel} onPress={onClose} activeOpacity={0.7}>
                <Text style={rsvSt.btnCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[rsvSt.btnConfirm, !selectedDate && rsvSt.btnConfirmDisabled]}
                onPress={handleConfirm}
                activeOpacity={0.8}
              >
                <Text style={rsvSt.btnConfirmText}>확인</Text>
              </TouchableOpacity>
            </View>
          )}

          {showCalendar && (
            <TouchableOpacity style={rsvSt.calendarConfirmBtn} onPress={() => setShowCalendar(false)} activeOpacity={0.8}>
              <Text style={rsvSt.btnConfirmText}>확인</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const rsvSt = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  container: { backgroundColor: colors.white, borderRadius: 16, paddingBottom: 24, width: '100%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 20 },
  title: { fontSize: 22, fontWeight: '700', color: colors.black },
  body: { paddingHorizontal: 24, paddingBottom: 24 },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600', color: colors.black },
  required: { fontSize: 16, fontWeight: '600', color: colors.primary },
  dateInput: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 56, borderWidth: 1, borderColor: colors.G200, borderRadius: 8,
    paddingHorizontal: 16,
  },
  dateText: { fontSize: 15, fontWeight: '500', color: colors.black },
  datePlaceholder: { color: colors.G400 },
  footer: { flexDirection: 'row', gap: 12, paddingHorizontal: 24 },
  btnCancel: {
    flex: 1, height: 56, borderRadius: 8, borderWidth: 1, borderColor: colors.G200,
    alignItems: 'center', justifyContent: 'center',
  },
  btnCancelText: { fontSize: 16, fontWeight: '600', color: colors.black },
  btnConfirm: { flex: 1, height: 56, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  btnConfirmDisabled: { backgroundColor: colors.G300 },
  btnConfirmText: { fontSize: 16, fontWeight: '700', color: colors.white },
  calendarConfirmBtn: { marginHorizontal: 24, height: 56, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});

// Image Viewer Modal Component
interface ImageViewerModalProps {
  visible: boolean;
  images: any[];
  initialIndex: number;
  onClose: () => void;
}
const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ visible, images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  if (!visible || images.length === 0) return null;

  const safeIndex = Math.min(currentIndex, images.length - 1);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.imageViewerContainer}>
        <View style={styles.imageViewerHeader}>
          <Text style={styles.imageViewerTitle}>이미지 보기</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <XIcon width={24} height={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageViewerMain}>
          <Image source={images[safeIndex]} style={styles.imageViewerImage} resizeMode="contain" />
        </View>

        <View style={styles.imageViewerThumbs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbsContent}>
            {images.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => setCurrentIndex(index)} activeOpacity={0.8}>
                <View style={[styles.viewerThumb, safeIndex === index && styles.viewerThumbActive]}>
                  <Image source={img} style={styles.viewerThumbImg} resizeMode="cover" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Image Send Modal Component
interface ImageSendModalProps {
  visible: boolean;
  images: { uri: string; name: string; size: string }[];
  onClose: () => void;
  onSend: () => void;
}
const ImageSendModal: React.FC<ImageSendModalProps> = ({ visible, images, onClose, onSend }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={styles.imageSendModalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>이미지 전송</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <XIcon width={24} height={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.imageSendList}>
          {images.map((img, idx) => (
            <View key={idx} style={styles.imageSendItem}>
              <Image source={{ uri: img.uri }} style={styles.imageSendThumb} />
              <View style={styles.imageSendInfo}>
                <Text style={styles.imageSendName}>{img.name}</Text>
                <Text style={styles.imageSendSize}>{img.size}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalBtnCancel} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.modalBtnCancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalBtnPrimary} onPress={onSend} activeOpacity={0.8}>
            <Text style={styles.modalBtnPrimaryText}>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// Main Component
export const ChatRoomScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();

  const chatContext: ChatContextType = (route.params as ChatRoomParams)?.chatContext || 'product';
  const userType: UserType = (route.params as ChatRoomParams)?.userType || 'personal';

  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [exitVisible, setExitVisible] = useState(false);
  const [reservationVisible, setReservationVisible] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState<any[]>([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);
  const [imageSendVisible, setImageSendVisible] = useState(false);

  // Use different data based on userType
  const chatData = userType === 'business' ? IMAGE_CHAT_DATA : CHAT_DATA;

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleImagePress = (images: any[], index: number) => {
    setViewerImages(images);
    setViewerInitialIndex(index);
    setImageViewerVisible(true);
  };

  const handleChatEnd = () => {
    setExitVisible(true);
  };

  const handleReport = () => {
    setReportVisible(true);
  };

  const handleCancelOrder = () => {
    // TODO: Implement order cancellation
  };

  const handleExitConfirm = () => {
    setExitVisible(false);
    navigation.goBack();
  };

  const handleReportSubmit = () => {
    setReportVisible(false);
    setToastVisible(true);
  };

  const handleImagePicker = () => {
    // Demo: show image send modal with mock data
    setImageSendVisible(true);
  };

  const mockImages = Array(10).fill(null).map((_, i) => ({
    uri: Image.resolveAssetSource(chatImage).uri,
    name: '사진.jpg',
    size: '1.9mb',
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon width={24} height={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>판매자 이름</Text>
          <TouchableOpacity style={styles.headerBtn} onPress={() => setMenuVisible(true)}>
            <Text style={styles.headerMoreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Action Button Bar */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Text style={styles.actionBtnText}>안전결제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => setReservationVisible(true)}>
            <Text style={styles.actionBtnText}>예약하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnMore]} activeOpacity={0.7} onPress={() => setMenuVisible(true)}>
            <Text style={styles.headerMoreIcon}>⋯</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Summary */}
          <View style={styles.sumItem}>
            <Image source={productImage} style={styles.sumItemImg} />
            <View style={styles.sumItemCon}>
              <Text style={styles.sumItemSubject} numberOfLines={2}>
                접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H
              </Text>
              <View style={styles.sumItemPriceRow}>
                <Text style={styles.sumItemPrice}>10,000,000원</Text>
                <View style={styles.blueTag}>
                  <Text style={styles.blueTagText}>가격협의 가능</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Chat Messages */}
          <View style={styles.chatRoomContainer}>
            {chatData.map((item, index) => {
              const isLast = index === chatData.length - 1;
              const gapStyle = isLast ? undefined : styles.chatItemGap;

              if (item.type === 'date') {
                return (
                  <View key={`date-${index}`} style={gapStyle}>
                    <DateDivider text={item.text} />
                  </View>
                );
              }
              if (item.type === 'received') {
                return (
                  <View key={item.id} style={gapStyle}>
                    <ReceivedMessage
                      name={item.name}
                      text={item.text}
                      time={item.time}
                      userType={item.userType}
                    />
                  </View>
                );
              }
              if (item.type === 'sent') {
                return (
                  <View key={item.id} style={gapStyle}>
                    <SentMessage text={item.text} time={item.time} unread={item.unread} />
                  </View>
                );
              }
              if (item.type === 'alarm') {
                return (
                  <View key={item.id} style={gapStyle}>
                    <AlarmBox
                      title={item.title}
                      time={item.time}
                      body={item.body}
                      btnText={item.btnText}
                    />
                  </View>
                );
              }
              if (item.type === 'image') {
                return (
                  <View key={item.id} style={gapStyle}>
                    <ImageMessage
                      name={item.name}
                      images={item.images}
                      time={item.time}
                      userType={item.userType}
                      onImagePress={handleImagePress}
                    />
                  </View>
                );
              }
              return null;
            })}
          </View>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.chatInputBar}>
          <TouchableOpacity
            style={styles.fileBtn}
            activeOpacity={0.7}
            onPress={handleImagePicker}
          >
            <View style={styles.fileBtnInner}>
              <View style={styles.fileBtnIconImg} />
              <View style={styles.fileBtnIconPlus}>
                <Text style={styles.fileBtnIconPlusText}>+</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.chatInput}
            placeholder="메세지를 입력해 주세요..."
            placeholderTextColor={colors.G400}
            value={message}
            onChangeText={setMessage}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.7}
            onPress={handleSend}
          >
            <View style={[styles.sendIcon, message.trim().length > 0 && styles.sendIconActive]}>
              <View style={styles.sendTriangle} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomFloating}>
          <TouchableOpacity style={styles.bottomFloatingBtn} activeOpacity={0.8}>
            <Text style={styles.bottomFloatingBtnText}>거래 완료하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modals */}
      <MenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        chatContext={chatContext}
        onChatEnd={handleChatEnd}
        onReport={handleReport}
        onCancelOrder={handleCancelOrder}
      />

      <ReportModal
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        onSubmit={handleReportSubmit}
      />

      <ChatExitModal
        visible={exitVisible}
        onClose={() => setExitVisible(false)}
        onConfirm={handleExitConfirm}
      />

      <ReservationModal
        visible={reservationVisible}
        onClose={() => setReservationVisible(false)}
        onConfirm={() => {
          setReservationVisible(false);
        }}
      />

      <ImageViewerModal
        visible={imageViewerVisible}
        images={viewerImages}
        initialIndex={viewerInitialIndex}
        onClose={() => setImageViewerVisible(false)}
      />

      <ImageSendModal
        visible={imageSendVisible}
        images={mockImages}
        onClose={() => setImageSendVisible(false)}
        onSend={() => {
          setImageSendVisible(false);
          // TODO: Send images
        }}
      />

      <CompareToast
        visible={toastVisible}
        message="신고 접수되었습니다."
        onClose={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  actionBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 2,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 6,
  },
  actionBtnMore: {
    flex: 0,
    width: 44,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.system100,
  },
  actionBarDivider: {
    width: 1,
    backgroundColor: colors.G200,
    marginVertical: 10,
  },
  headerBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  headerMoreIcon: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '700',
  },
  scrollArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sumItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 15,
    marginHorizontal: PADDING_LR,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.03,
    shadowRadius: 7,
    elevation: 2,
  },
  sumItemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.G200,
    marginRight: 15,
  },
  sumItemCon: {
    flex: 1,
    justifyContent: 'center',
  },
  sumItemSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 20,
    marginBottom: 8,
  },
  sumItemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  sumItemPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    marginRight: 8,
  },
  blueTag: {
    borderRadius: 4,
    paddingHorizontal: 5,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueTagText: {
    fontSize: 12,
    color: colors.system100,
    fontWeight: '400',
    lineHeight: 14,
  },
  chatRoomContainer: {
    backgroundColor: colors.G100,
    marginHorizontal: 0,
    marginBottom: 10,
    borderRadius: 0,
    paddingTop: 5,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  chatItemGap: {
    marginBottom: 20,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dateDividerIcon: {
    fontSize: 11,
    marginRight: 5,
  },
  dateDividerText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.G600,
  },
  chatListRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.G300,
    flexShrink: 0,
    marginRight: 12,
  },
  businessAvatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.primary,
    flexShrink: 0,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  receivedBody: {
    flex: 1,
    flexDirection: 'column',
  },
  chatName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 7,
  },
  bubWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  chatListMy: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  sentBody: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  bubWrapMy: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 20,
  },
  sentTimeCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  chatUnread: {
    fontSize: 12,
    color: colors.G600,
    textAlign: 'right',
    marginBottom: 4,
  },
  chatBubble: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minWidth: 46,
    maxWidth: '75%',
  },
  chatBubbleReceived: {
    backgroundColor: colors.white,
    marginRight: 5,
  },
  chatBubbleMy: {
    backgroundColor: colors.white,
  },
  chatBubbleText: {
    fontSize: 14,
    lineHeight: 19.6,
    fontWeight: '400',
    color: colors.black,
  },
  chatTime: {
    fontSize: 12,
    color: colors.G600,
    flexShrink: 0,
  },
  // Image Grid
  imageGridWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  imageGrid: {
    flexDirection: 'row',
    gap: IMAGE_GAP,
    marginRight: 8,
  },
  imageGridSingle: {},
  imageThumb: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.G200,
  },
  imageThumbImg: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlayText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  // Alarm Box
  alarmBox: {
    backgroundColor: colors.black,
    borderRadius: 8,
    overflow: 'hidden',
  },
  alarmHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
  },
  alarmTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmBell: {
    fontSize: 15,
    marginRight: 8,
  },
  alarmTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  alarmTime: {
    fontSize: 13,
    color: colors.G300,
  },
  alarmCon: {
    padding: 15,
    paddingTop: 0,
  },
  alarmBody: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
    marginBottom: 15,
  },
  alarmBtn: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  // Input Bar
  chatInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING_LR,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
  },
  fileBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  fileBtnInner: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.G400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  fileBtnIconImg: {
    width: 18,
    height: 14,
    backgroundColor: colors.G300,
    borderRadius: 2,
  },
  fileBtnIconPlus: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.G500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileBtnIconPlusText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '700',
    lineHeight: 12,
  },
  chatInput: {
    flex: 1,
    height: 40,
    backgroundColor: colors.G100,
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize: 14,
    color: colors.black,
    marginRight: 8,
  },
  sendBtn: {
    width: 36,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIconActive: {},
  sendTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.G400,
    marginLeft: 4,
  },
  // Bottom Button
  bottomFloating: {
    backgroundColor: colors.white,
    paddingHorizontal: PADDING_LR,
    paddingVertical: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  bottomFloatingBtn: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomFloatingBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.system100,
  },
  // Menu Modal
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 100 : 60,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  // Modal Common
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  confirmModalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  selectBoxText: {
    fontSize: 14,
    color: colors.black,
  },
  selectBoxPlaceholder: {
    color: colors.G400,
  },
  reasonPicker: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    marginTop: 4,
    backgroundColor: colors.white,
  },
  reasonItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  reasonItemText: {
    fontSize: 14,
    color: colors.black,
  },
  reportTextArea: {
    height: 150,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.black,
    backgroundColor: colors.white,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 10,
  },
  modalBtnCancel: {
    flex: 1,
    height: 56,
    backgroundColor: colors.G100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  modalBtnCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.G600,
  },
  modalBtnPrimary: {
    flex: 1,
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnPrimaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  confirmModalBody: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  confirmModalText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
  },
  // Image Viewer
  imageViewerContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageViewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
  },
  imageViewerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  imageViewerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  imageViewerThumbs: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  thumbsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  viewerThumb: {
    width: 60,
    height: 60,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  viewerThumbActive: {
    borderColor: colors.primary,
  },
  viewerThumbImg: {
    width: '100%',
    height: '100%',
  },
  // Image Send Modal
  imageSendModalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  imageSendList: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  imageSendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  imageSendThumb: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: colors.G200,
    marginRight: 12,
  },
  imageSendInfo: {
    flex: 1,
  },
  imageSendName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  imageSendSize: {
    fontSize: 12,
    color: colors.G500,
  },
});

