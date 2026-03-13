import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchIcon from '../../assets/icon/Search.svg';

const USER_IMG = require('../../assets/images/user01.png');
import { colors } from '../../styles/colors';
import { Header, TabBar } from '../../components/common';
import type { Tab } from '../../types';

type TabKey = '전체' | '판매' | '구매' | '기타';

interface ChatItem {
  id: string;
  /** 상대방 이름 */
  name: string;
  /** 최근 메시지 미리보기 */
  message: string;
  /** 날짜·시간 문자열 (예: '11월 27일', '오전 11:53') */
  date: string;
  /** 읽지 않은 메시지 수 (0이면 배지 미노출) */
  unreadCount: number;
  /** 탈퇴회원 여부 */
  isWithdrawn?: boolean;
  /** 종료된 채팅방 여부 */
  isEnded?: boolean;
  /**
   * 썸네일 이미지 소스
   * - require('./assets/images/chat01.png')
   * - { uri: 'https://...' }
   * - undefined → 회색 빈 박스 표시
   */
  thumbnail?: ReturnType<typeof require> | { uri: string };
}

const TABS: Tab[] = [
  { key: '전체', label: '전체' },
  { key: '판매', label: '판매' },
  { key: '구매', label: '구매' },
  { key: '기타', label: '기타' },
];
const PAGE_SIZE  = 10;
const MAX_ITEMS  = 50;

// 레이아웃 수치 (구분선 offset 계산용)
const H_PADDING   = 16;
const THUMB_SIZE  = 50;
const THUMB_GAP   = 12;
// 구분선 시작점: 좌측 패딩 + 썸네일 + 간격
const SEPARATOR_LEFT = H_PADDING + THUMB_SIZE + THUMB_GAP;

let _idSeq = 1; // 모듈 레벨 시퀀스 (렌더와 무관)

const makeItem = (overrides?: Partial<ChatItem>): ChatItem => ({
  id:           String(_idSeq++),
  name:         '아라요 기계장터',
  message:      '거래 감사합니다. ^_^',
  date:         '11월 27일',
  unreadCount:  5,
  thumbnail:    USER_IMG,
  ...overrides,
});

const SEED_DATA: ChatItem[] = [
  makeItem(),
  makeItem({
    isWithdrawn: true,
    isEnded:     true,
    message:     '종료된 채팅방이에요.',
    date:        '오전 11:53',
  }),
  makeItem(),
  makeItem(),
  makeItem(),
  makeItem(),
  makeItem(),
  makeItem(),
  makeItem(),
];

const generatePage = (): ChatItem[] =>
  Array.from({ length: PAGE_SIZE }, () => makeItem());

interface ChatItemViewProps {
  item:    ChatItem;
  onPress: (item: ChatItem) => void;
}

const ChatItemView = React.memo(({ item, onPress }: ChatItemViewProps) => {
  const handlePress = useCallback(() => onPress(item), [item, onPress]);

  return (
    <TouchableOpacity
      style={s.item}
      onPress={handlePress}
      activeOpacity={0.72}
      accessibilityRole="button"
      accessibilityLabel={
        `${item.isWithdrawn ? '탈퇴회원 ' : ''}${item.name}, ${item.message}`
      }
    >
      <View style={s.thumbWrap}>
        {item.thumbnail != null ? (
          <Image
            source={item.thumbnail as any}
            style={s.thumb}
            resizeMode="cover"
          />
        ) : (
          <View style={[s.thumb, s.thumbEmpty]} />
        )}
      </View>

      <View style={s.content}>
        <View style={s.nameRow}>
          {item.isWithdrawn && (
            <View style={s.redTag}>
              <Text style={s.redTagText}>탈퇴회원</Text>
            </View>
          )}
          <Text style={s.name} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <Text
          style={[s.message, item.isEnded && s.messageEnded]}
          numberOfLines={1}
        >
          {item.message}
        </Text>
      </View>

      <View style={s.tail}>
        <Text style={s.date}>{item.date}</Text>
        {item.unreadCount > 0 && (
          <View style={s.badge}>
            <Text style={s.badgeText}>
              {item.unreadCount > 99 ? '99+' : String(item.unreadCount)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

const ItemSeparator = React.memo(() => <View style={s.separator} />);

const ListLoadingFooter = React.memo(() => (
  <View style={s.footer}>
    <ActivityIndicator size="large" color={colors.G300} />
    <Text style={s.footerText}>채팅을 불러오는 중입니다.</Text>
  </View>
));

const ChatListScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab,  setActiveTab]  = useState<TabKey>('전체');
  const [data,       setData]       = useState<ChatItem[]>(SEED_DATA);
  const [isLoading,  setIsLoading]  = useState(false);
  const [hasMore,    setHasMore]    = useState(true);

  // useRef로 중복 로딩 완벽 차단 (setState 비동기 특성 보완)
  const loadingRef = useRef(false);

  // ── 탭 변경
  const handleTabSelect = useCallback((tab: string) => {
    setActiveTab(tab as TabKey);
    /**
     * TODO: 탭별 API 재요청
     * setData([]);
     * setHasMore(true);
     * fetchChatList({ tab, page: 1 }).then(res => setData(res.items));
     */
  }, []);

  // ── 무한 스크롤
  const handleEndReached = useCallback(() => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoading(true);

    /**
     * TODO: 실제 API 호출로 교체
     * const res = await ChatAPI.list({ tab: activeTab, cursor });
     * setData(prev => [...prev, ...res.items]);
     * if (!res.hasNext) setHasMore(false);
     */
    setTimeout(() => {
      const more = generatePage();
      setData(prev => {
        const next = [...prev, ...more];
        if (next.length >= MAX_ITEMS) setHasMore(false);
        return next;
      });
      setIsLoading(false);
      loadingRef.current = false;
    }, 1200);
  }, [hasMore]);

  // ── 아이템 탭 → 채팅방 진입
  const handleItemPress = useCallback(
    (item: ChatItem) => {
      if (item.isEnded) return; // 종료된 채팅방 진입 차단
      navigation.navigate('ChatRoom', { chatId: item.id });
    },
    [navigation],
  );

  // ── FlatList 렌더 함수
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ChatItem>) => (
      <ChatItemView item={item} onPress={handleItemPress} />
    ),
    [handleItemPress],
  );

  const keyExtractor = useCallback(
    (item: ChatItem) => item.id,
    [],
  );

  const renderFooter = useCallback(
    () => (isLoading ? <ListLoadingFooter /> : null),
    [isLoading],
  );

  // ── 헤더 우측 검색 버튼
  const searchButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Search')}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="button"
      accessibilityLabel="검색"
    >
      <SearchIcon width={22} height={22} color={colors.black} />
    </TouchableOpacity>
  );

  // ── JSX
  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <Header
        title="채팅내역"
        onBack={() => navigation.goBack()}
        rightComponent={searchButton}
      />

      <TabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabSelect}
      />

      <FlatList<ChatItem>
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        /* 성능 최적화 */
        removeClippedSubviews={Platform.OS === 'android'}
        windowSize={10}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        /* 키보드 제어 */
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({

  root: {
    flex:            1,
    backgroundColor: colors.white,
  },

  listContent: {
    paddingBottom: 24,
  },

  item: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingHorizontal: H_PADDING,
    paddingVertical: 14,
    backgroundColor: colors.white,
  },

  thumbWrap: {
    marginRight: THUMB_GAP,
    flexShrink:  0,
  },
  thumb: {
    width:        THUMB_SIZE,
    height:       THUMB_SIZE,
    borderRadius: 10,
  },
  thumbEmpty: {
    backgroundColor: colors.G200,
  },

  content: {
    flex:        1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection:  'row',
    alignItems:     'center',
    marginBottom:   5,
    flexWrap:       'wrap',
  },
  name: {
    fontSize:   14,
    fontWeight: '600',
    color:      colors.black,
    flexShrink: 1,
  },
  message: {
    fontSize:   13,
    color:      colors.G600,
    lineHeight: 18,
  },
  messageEnded: {
    color: colors.G400,
  },

  redTag: {
    backgroundColor:  'rgba(219, 0, 37, 0.05)',
    borderRadius:     3,
    paddingHorizontal: 5,
    paddingVertical:  2,
    marginRight:      5,
    marginBottom:     1,
  },
  redTagText: {
    fontSize:           10,
    fontWeight:         '700',
    color:              colors.primary200,
    lineHeight:         13,
    includeFontPadding: false,
  },

  tail: {
    alignItems:  'flex-end',
    minWidth:    54,
    alignSelf:   'flex-start',
    paddingTop:  2,
  },
  date: {
    fontSize:     12,
    color:        colors.G600,
    marginBottom: 6,
    textAlign:    'right',
  },
  badge: {
    minWidth:        20,
    height:          20,
    borderRadius:    10,
    backgroundColor: colors.primary,
    alignItems:      'center',
    justifyContent:  'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize:           11,
    fontWeight:         '700',
    color:              colors.white,
    lineHeight:         Platform.OS === 'ios' ? 14 : 16,
    includeFontPadding: false,
    textAlignVertical:  'center',
  },

  separator: {
    height:          StyleSheet.hairlineWidth,
    backgroundColor: colors.borderLight,
    marginLeft:      SEPARATOR_LEFT,
  },

  footer: {
    alignItems:     'center',
    justifyContent: 'center',
    paddingTop:     32,
    paddingBottom:  48,
  },
  footerText: {
    marginTop:  10,
    fontSize:   13,
    color:      colors.G400,
  },
});

export default ChatListScreen;
