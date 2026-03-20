import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import CameraPlusIcon from '../../assets/icon/camera-plus.svg';
import { ReportModal } from '../product/ReportModal';

const userAvatar = require('../../assets/images/user01.png');
const productImage = require('../../assets/images/img01.png');
const gearIcon = require('../../assets/images/Gear_Icons.png');

type ChatContext = 'normal' | 'payment_before' | 'payment_after';

interface ChatPopupModalProps {
  visible: boolean;
  onClose: () => void;
  sellerName?: string;
  chatContext?: ChatContext;
}

export const ChatPopupModal: React.FC<ChatPopupModalProps> = ({
  visible,
  onClose,
  sellerName = '판매자 이름',
  chatContext = 'normal',
}) => {
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);

  return (
    <>
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{sellerName}</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Action bar */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <Text style={styles.actionBtnText}>거래 완료하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moreBtn}
              activeOpacity={0.7}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <Text style={styles.moreBtnText}>···</Text>
            </TouchableOpacity>
          </View>

          {/* More dropdown */}
          {menuVisible && (
            <>
              <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)} />
              <View style={styles.menuDropdown}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.6} onPress={() => setMenuVisible(false)}>
                  <Text style={styles.menuItemText}>채팅 종료하기</Text>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.6} onPress={() => { setMenuVisible(false); setReportVisible(true); }}>
                  <Text style={styles.menuItemText}>신고하기</Text>
                </TouchableOpacity>
                {chatContext === 'payment_before' && (
                  <>
                    <View style={styles.menuDivider} />
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.6} onPress={() => setMenuVisible(false)}>
                      <Text style={[styles.menuItemText, { color: colors.primary }]}>주문 취소</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </>
          )}

          {/* Product card */}
          <View style={styles.productCard}>
            <Image source={productImage} style={styles.productImg} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H</Text>
              <View style={styles.productPriceRow}>
                <Text style={styles.productPrice}>10,000,000원</Text>
                <Text style={styles.productTag}>가격협의 가능</Text>
              </View>
            </View>
          </View>

          {/* Chat area */}
          <ScrollView style={styles.chatArea} showsVerticalScrollIndicator={false}>
            {/* Date */}
            <View style={styles.dateDivider}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>2025년 11월 11일 목요일</Text>
            </View>

            {/* Received message */}
            <View style={styles.receivedRow}>
              <Image source={userAvatar} style={styles.avatar} />
              <View style={styles.receivedBody}>
                <Text style={styles.chatName}>{sellerName}</Text>
                <View style={styles.bubbleWrap}>
                  <View style={styles.bubbleReceived}>
                    <Text style={styles.bubbleText}>안녕하세요, 구매자입니다. 접촉+비접촉 겸용 래쇼날 CNC 비디오 메타 CS-3020H에 대한 거래 진행 중입니다.</Text>
                  </View>
                  <Text style={styles.chatTime}>오후 8:01</Text>
                </View>
              </View>
            </View>

            {/* Sent message */}
            <View style={styles.sentRow}>
              <View style={styles.sentTimeCol}>
                <Text style={styles.unreadText}>안읽음</Text>
                <Text style={styles.chatTime}>오후 7:23</Text>
              </View>
              <View style={styles.bubbleSent}>
                <Text style={styles.bubbleText}>네</Text>
              </View>
            </View>

            {/* More received messages */}
            <View style={styles.receivedRow}>
              <Image source={userAvatar} style={styles.avatar} />
              <View style={styles.receivedBody}>
                <Text style={styles.chatName}>{sellerName}</Text>
                <View style={styles.bubbleWrap}>
                  <View style={styles.bubbleReceived}>
                    <Text style={styles.bubbleText}>현재 재고 확인 완료했습니다. 상태 양호하고 바로 출고 가능합니다.</Text>
                  </View>
                  <Text style={styles.chatTime}>오후 8:05</Text>
                </View>
              </View>
            </View>

            <View style={styles.sentRow}>
              <View style={styles.sentTimeCol}>
                <Text style={styles.chatTime}>오후 8:10</Text>
              </View>
              <View style={styles.bubbleSent}>
                <Text style={styles.bubbleText}>설치 일정은 어떻게 되나요?</Text>
              </View>
            </View>

            <View style={styles.receivedRow}>
              <Image source={userAvatar} style={styles.avatar} />
              <View style={styles.receivedBody}>
                <Text style={styles.chatName}>{sellerName}</Text>
                <View style={styles.bubbleWrap}>
                  <View style={styles.bubbleReceived}>
                    <Text style={styles.bubbleText}>결제 확인 후 3일 이내 설치 가능합니다. 설치 장소 주소 알려주시면 일정 잡아드리겠습니다.</Text>
                  </View>
                  <Text style={styles.chatTime}>오후 8:12</Text>
                </View>
              </View>
            </View>

            <View style={styles.sentRow}>
              <View style={styles.sentTimeCol}>
                <Text style={styles.chatTime}>오후 8:15</Text>
              </View>
              <View style={styles.bubbleSent}>
                <Text style={styles.bubbleText}>경기도 안산시 단원구입니다. 가격 네고 가능한가요?</Text>
              </View>
            </View>

            <View style={styles.receivedRow}>
              <Image source={userAvatar} style={styles.avatar} />
              <View style={styles.receivedBody}>
                <Text style={styles.chatName}>{sellerName}</Text>
                <View style={styles.bubbleWrap}>
                  <View style={styles.bubbleReceived}>
                    <Text style={styles.bubbleText}>네, 안산 지역이시면 운송비 포함해서 950만원에 가능합니다. 안전결제로 진행하시겠어요?</Text>
                  </View>
                  <Text style={styles.chatTime}>오후 8:18</Text>
                </View>
              </View>
            </View>

            <View style={styles.sentRow}>
              <View style={styles.sentTimeCol}>
                <Text style={styles.unreadText}>안읽음</Text>
                <Text style={styles.chatTime}>오후 8:20</Text>
              </View>
              <View style={styles.bubbleSent}>
                <Text style={styles.bubbleText}>좋습니다. 안전결제로 진행하겠습니다.</Text>
              </View>
            </View>

            {/* Alarm notification */}
            <View style={styles.alarmCard}>
              <View style={styles.alarmHeader}>
                <Text style={styles.alarmBell}>🔔</Text>
                <Text style={styles.alarmTitle}>알림이 도착했어요</Text>
                <Text style={styles.alarmTime}>오후 8:01</Text>
              </View>
              <Text style={styles.alarmBody}>
                안녕하세요, 아라요 기계장터입니다.{'\n'}거래는 만족스럽게 진행되셨나요?{'\n'}간단하게 눌러서 상품 상태를 업데이트해 주세요!
              </Text>
              <TouchableOpacity style={styles.alarmBtn} activeOpacity={0.7}>
                <Text style={styles.alarmBtnText}>거래 완료하기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Input bar */}
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <CameraPlusIcon width={22} height={22} color={colors.G500} />
            </TouchableOpacity>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="메세지를 입력해 주세요..."
                placeholderTextColor={colors.G400}
              />
            </View>
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.7}>
              <Text style={styles.sendIcon}>▷</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    <ReportModal
      visible={reportVisible}
      onClose={() => setReportVisible(false)}
      onSubmit={() => setReportVisible(false)}
    />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    height: '90%',
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeIcon: { fontSize: 20, color: colors.textPrimary, fontWeight: '300' },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.primary,
  },
  moreBtn: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnText: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  menuOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99 },
  menuDropdown: {
    position: 'absolute', top: 100, right: spacing.lg,
    backgroundColor: colors.white, borderRadius: 8, minWidth: 140, zIndex: 100, overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  menuItem: { paddingHorizontal: spacing.lg, paddingVertical: 14 },
  menuItemText: { fontSize: 15, fontFamily: fontFamily.medium, fontWeight: '500', color: colors.textPrimary },
  menuDivider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.G200 },
  productCard: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  productImg: { width: 56, height: 56, borderRadius: borderRadius.sm, marginRight: spacing.md },
  productInfo: { flex: 1, justifyContent: 'center' },
  productTitle: { fontSize: 13, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  productPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  productPrice: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary },
  productTag: { fontSize: 11, fontFamily: fontFamily.medium, fontWeight: '500', color: '#3B82F6' },
  chatArea: { flex: 1, paddingHorizontal: spacing.lg, backgroundColor: colors.G100 },
  dateDivider: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.base, gap: 4 },
  dateIcon: { fontSize: 14 },
  dateText: { fontSize: 12, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G500 },
  receivedRow: { flexDirection: 'row', marginBottom: spacing.md },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: spacing.sm },
  receivedBody: { flex: 1 },
  chatName: { fontSize: 13, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  bubbleWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  bubbleReceived: { backgroundColor: colors.white, borderRadius: 12, borderTopLeftRadius: 2, padding: spacing.md, maxWidth: '80%' },
  bubbleText: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary, lineHeight: 20 },
  chatTime: { fontSize: 11, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G500 },
  sentRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 6, marginBottom: spacing.md },
  sentTimeCol: { alignItems: 'flex-end' },
  unreadText: { fontSize: 11, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G500 },
  bubbleSent: { backgroundColor: '#FFF3CD', borderRadius: 12, borderTopRightRadius: 2, padding: spacing.md },
  alarmCard: { backgroundColor: '#1B1B1B', borderRadius: 12, padding: spacing.base, marginBottom: spacing.md },
  alarmHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  alarmBell: { fontSize: 14, marginRight: 4 },
  alarmTitle: { flex: 1, fontSize: 13, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.white },
  alarmTime: { fontSize: 11, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G400 },
  alarmBody: { fontSize: 12, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.G300, lineHeight: 18, marginBottom: spacing.md },
  alarmBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.md, height: 40, alignItems: 'center', justifyContent: 'center' },
  alarmBtnText: { fontSize: 14, fontFamily: fontFamily.semiBold, fontWeight: '600', color: colors.white },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.G200,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  attachBtn: { padding: 4 },
  inputWrap: {
    flex: 1,
    height: 40,
    backgroundColor: colors.G100,
    borderRadius: 20,
    paddingHorizontal: spacing.base,
    justifyContent: 'center',
  },
  input: { fontSize: 13, fontFamily: fontFamily.regular, fontWeight: '400', color: colors.textPrimary, padding: 0 },
  sendBtn: { padding: 4 },
  sendIcon: { fontSize: 20, color: colors.G400 },
});
