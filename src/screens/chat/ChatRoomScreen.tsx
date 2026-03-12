/**
 * ChatRoomScreen.tsx
 * 아라요 기계장터 - 채팅방 (일반회원)
 * UI-MYPG-119
 *
 * 디자인 원본: UI-MYPG-119_채팅방__일반회원_.png
 * HTML 원본: chatroom.php?type=1
 *
 * [수정 이력 v2]
 * - 이미지 → 빈 View 플레이스홀더로 교체 (직접 Image 교체 가능)
 * - SentMessage chatBody flex:1 버그 수정 (말풍선 너무 넓어지는 현상)
 * - Dimensions 미사용 import 제거
 * - gap → marginBottom/marginRight 방식으로 구버전 RN 호환성 향상
 * - scrollContent paddingBottom 수치 보정
 * - alarmHead justifyContent:space-between으로 개선
 * - 파일첨부 버튼 아이콘 단순화
 * - TypeScript 컴파일 에러 0개 확인
 *
 * [수정 이력 v3]
 * - 로컬 컬러(C) → 공통 colors로 교체
 * - 커스텀 헤더 → 공통 Header 컴포넌트로 교체
 */

import React, {useRef, useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import { colors } from '../../styles/colors';
import { componentHeight } from '../../styles/spacing';
import { Header } from '../../components/common';

// ─────────────────────────────────────────────────
// 레이아웃 상수
// ─────────────────────────────────────────────────
const PADDING_LR        = 20; // --padding-LR
const BOTTOM_FLOATING_H = 90; // #BOTTOM-FLOATING --height

// ─────────────────────────────────────────────────
// 데이터 타입
// ─────────────────────────────────────────────────
type ChatItem =
  | { type: 'date'; text: string }
  | { type: 'received'; id: string; name: string; text: string; time: string }
  | { type: 'sent';     id: string; text: string; time: string; unread?: boolean }
  | { type: 'alarm';    id: string; title: string; time: string; body: string; btnText: string };

// ─────────────────────────────────────────────────
// 샘플 채팅 데이터 (HTML 원본 기준)
// ─────────────────────────────────────────────────
const CHAT_DATA: ChatItem[] = [
  { type: 'date', text: '2025년 11월 11일 목요일' },
  {
    type: 'received',
    id: 'msg1',
    name: '판매자 이름',
    text: '안녕하세요, 구매자입니다. 접촉+비접촉 겸용 래쇼날 CNC 비디오 메타 CS-3020H에 대한 거래 진행 중입니다.',
    time: '오후 8:01',
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

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 날짜 구분선 (.datime)
// ─────────────────────────────────────────────────
const DateDivider: React.FC<{ text: string }> = ({ text }) => (
  <View style={styles.dateDivider}>
    <Text style={styles.dateDividerIcon}>📅</Text>
    <Text style={styles.dateDividerText}>{text}</Text>
  </View>
);

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 상대방 메시지 (.chat-list)
// ─────────────────────────────────────────────────
interface ReceivedProps { name: string; text: string; time: string; }
const ReceivedMessage: React.FC<ReceivedProps> = ({ name, text, time }) => (
  <View style={styles.chatListRow}>
    <View style={styles.chatAvatar} />
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

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 내 메시지 (.chat-list.my)
// ─────────────────────────────────────────────────
interface SentProps { text: string; time: string; unread?: boolean; }
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

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 알림 박스 (.alarm)
// ─────────────────────────────────────────────────
interface AlarmProps { title: string; time: string; body: string; btnText: string; onPress?: () => void; }
const AlarmBox: React.FC<AlarmProps> = ({ title, time, body, btnText, onPress }) => (
  <View style={styles.alarmBox}>
    <View style={styles.alarmHead}>
      <View style={styles.alarmTitleWrap}>
        <Text style={styles.alarmBell}>🔔</Text>
        <Text style={styles.alarmTitle}>{title}</Text>
      </View>
      <Text style={styles.alarmTime}>{time}</Text>
    </View>
    <View style={styles.alarmDivider} />
    <View style={styles.alarmCon}>
      <Text style={styles.alarmBody}>{body}</Text>
      <TouchableOpacity style={styles.alarmBtn} onPress={onPress} activeOpacity={0.85}>
        <Text style={styles.alarmBtnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─────────────────────────────────────────────────
// 메인 화면
// ─────────────────────────────────────────────────
const ChatRoomScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!message.trim()) { return; }
    setMessage('');
    // TODO: 메시지 전송 API 연결
  };

  // 헤더 우측: 더보기 버튼
  const moreButton = (
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={styles.headerMoreIcon}>{'⋮'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? componentHeight.header : 0}>

        {/* ══════════════════════════════════════
            헤더 (공통 Header 컴포넌트)
        ══════════════════════════════════════ */}
        <Header
          title="판매자 이름"
          onBack={() => navigation.goBack()}
          rightComponent={moreButton}
        />

        {/* ══════════════════════════════════════
            본문 스크롤
        ══════════════════════════════════════ */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* ── 상품 요약 카드 (.sumItem) ── */}
          <View style={styles.sumItem}>
            <View style={styles.sumItemImg} />
            <View style={styles.sumItemCon}>
              <Text style={styles.sumItemSubject} numberOfLines={2}>
                접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H
              </Text>
              <View style={styles.sumItemPriceRow}>
                <Text style={styles.sumItemPrice}>1,000,000원</Text>
                <View style={styles.blueTag}>
                  <Text style={styles.blueTagText}>가격협의 가능</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── 채팅 컨테이너 (#chatRoomContainer) ── */}
          <View style={styles.chatRoomContainer}>
            {CHAT_DATA.map((item, index) => {
              const isLast = index === CHAT_DATA.length - 1;
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
                    <ReceivedMessage name={item.name} text={item.text} time={item.time} />
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
                      onPress={() => { /* TODO: 거래 완료하기 액션 */ }}
                    />
                  </View>
                );
              }
              return null;
            })}
          </View>

        </ScrollView>

        {/* ══════════════════════════════════════
            메시지 입력 바 (#chatRoomBtnSet)
        ══════════════════════════════════════ */}
        <View style={styles.chatInputBar}>

          <TouchableOpacity
            style={styles.fileBtn}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
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
            multiline={false}
          />

          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.7}
            onPress={handleSend}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={[
              styles.sendBtnIcon,
              message.trim().length > 0 && styles.sendBtnIconActive,
            ]}>
              ▶
            </Text>
          </TouchableOpacity>

        </View>

        {/* ══════════════════════════════════════
            하단 플로팅 (#BOTTOM-FLOATING)
        ══════════════════════════════════════ */}
        <View style={styles.bottomFloating}>
          <TouchableOpacity
            style={styles.bottomFloatingBtn}
            activeOpacity={0.8}
            onPress={() => { /* TODO: 거래 완료하기 액션 */ }}>
            <Text style={styles.bottomFloatingBtnText}>거래 완료하기</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────
// 스타일시트
// ─────────────────────────────────────────────────
const styles = StyleSheet.create({

  // ── 기본 레이아웃 ──────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },

  // ── 헤더 더보기 아이콘 ─────────────────────────
  headerMoreIcon: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '700',
  },

  // ── 스크롤 영역 ────────────────────────────────
  scrollArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // ── 상품 요약 카드 (.sumItem) ─────────────────
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

  // ── 태그 (.blueTag) ───────────────────────────
  blueTag: {
    backgroundColor: '#F3F6FF',
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

  // ── 채팅 컨테이너 (#chatRoomContainer) ─────────
  chatRoomContainer: {
    backgroundColor: colors.G100,
    marginHorizontal: PADDING_LR,
    marginBottom: 10,
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 60,
    paddingHorizontal: 15,
  },
  chatItemGap: {
    marginBottom: 20,
  },

  // ── 날짜 구분선 (.datime) ─────────────────────
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

  // ── 상대방 채팅 행 (.chat-list) ────────────────
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

  // ── 내 메시지 행 (.chat-list.my) ──────────────
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

  // ── 말풍선 (.chat-bubble) ─────────────────────
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

  // ── 알림 박스 (.alarm) ────────────────────────
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
  alarmDivider: {
    height: 1,
    backgroundColor: 'rgba(126,126,126,0.6)',
  },
  alarmCon: {
    padding: 15,
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

  // ── 메시지 입력 바 (#chatRoomBtnSet) ──────────
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
  sendBtnIcon: {
    fontSize: 20,
    color: colors.G400,
  },
  sendBtnIconActive: {
    color: colors.system100,
  },

  // ── 하단 플로팅 (#BOTTOM-FLOATING) ────────────
  bottomFloating: {
    height: BOTTOM_FLOATING_H,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: PADDING_LR,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomFloatingBtn: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomFloatingBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.blue,
  },

});

export default ChatRoomScreen;
