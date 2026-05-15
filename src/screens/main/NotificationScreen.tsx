import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { colors } from '../../styles/colors';
import { NotificationItem, NotificationLoadingFooter } from './components/NotificationItem';

const MoreVerticalIcon = () => (
  <View style={styles.moreIconContainer}>
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
    <View style={styles.moreIconDot} />
  </View>
);

const INITIAL_NOTIFICATIONS = [
  { id: '1', subject: '아라요 기계장터', message: '거래가 정상적으로 완료되었습니다.', date: '11월 27일', isNew: true },
  { id: '2', subject: '아라요 기계장터', message: '거래가 정상적으로 완료되었습니다.', date: '11월 27일', isNew: false },
  { id: '3', subject: '아라요 기계장터', message: '거래가 정상적으로 완료되었습니다.', date: '11월 27일', isNew: false },
  { id: '4', subject: '아라요 기계장터', message: '거래가 정상적으로 완료되었습니다.', date: '11월 27일', isNew: false },
  { id: '5', subject: '아라요 기계장터', message: '거래가 정상적으로 완료되었습니다.', date: '11월 27일', isNew: false },
];

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleDeleteOne = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>알림</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            activeOpacity={0.7}
          >
            <MoreVerticalIcon />
          </TouchableOpacity>

          {isMenuOpen && (
            <Modal visible={isMenuOpen} transparent animationType="slide" onRequestClose={() => setIsMenuOpen(false)}>
              <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
                <View style={styles.menuContainer}>
                  <View style={styles.moreSheetHandle} />
                    <TouchableOpacity
                      style={[styles.menuItem, styles.menuItemBorder]}
                      onPress={handleDeleteAll}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.menuItemText}>전체 삭제</Text>
                    </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.moreSheetCancel}
                    onPress={() => setIsMenuOpen(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moreSheetCancelText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.flex1} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={scrollEnabled}>
          {notifications.length > 0 ? (
            <>
              {notifications.map((noti) => (
                <NotificationItem
                  key={noti.id}
                  id={noti.id}
                  subject={noti.subject}
                  message={noti.message}
                  date={noti.date}
                  isNew={noti.isNew}
                  onDelete={handleDeleteOne}
                  onSwipeStart={() => setScrollEnabled(false)}
                  onSwipeEnd={() => setScrollEnabled(true)}
                />
              ))}
              <NotificationLoadingFooter />
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>알림이 없습니다.</Text>
            </View>
          )}
        </ScrollView>
      </TouchableOpacity>
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
    position: 'relative',
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moreIconContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  moreIconDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.black,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    right: 0,
    minWidth: 110,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.G200,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  emptyContainer: {
    paddingTop: 120,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.G500,
  },
  // Menu Modal
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom:30,
  },
  moreSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.G300,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.G200,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  moreSheetCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  moreSheetCancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G500,
  },
});
