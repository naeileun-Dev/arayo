import React from 'react';
import { TradeListScreen } from '../../components/trade/TradeListScreen';
import type { TradeItem } from '../../types';

const SELL_ITEMS: TradeItem[] = [
  {
    id: '0',
    state: 0,
    stateLabel: '판매중',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '끌어올리기', type: 'blue', action: 'bump' },
      { label: '대화중인 채팅창', type: 'light', action: 'chat_list' },
    ],
    moreButtons: [
      { label: '예약중으로 변경', action: 'change_reserved' },
      { label: '거래완료(직거래)로 변경', action: 'complete_direct' },
      { label: '게시글 수정', action: 'edit' },
      { label: '숨기기', action: 'hide' },
      { label: '삭제', action: 'delete' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '1',
    state: 1,
    stateLabel: '예약중(직거래)',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '배송 예약일 : 26.02.25', type: 'schedule', action: 'schedule' },
      { label: '거래완료(직거래)로 변경', type: 'blue', action: 'complete_direct' },
    ],
    moreButtons: [
      { label: '구매자와 채팅하기', action: 'chat' },
      { label: '판매중으로 변경', action: 'change_selling' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '2',
    state: 1,
    stateLabel: '예약중(안전결제)',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '배송 예약일 : 20.02.25', type: 'schedule', action: 'schedule' },
      { label: '거래완료(안전거래)로 변경', type: 'blue', action: 'complete_safe' },
    ],
    moreButtons: [
      { label: '구매자와 채팅하기', action: 'chat' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '3',
    state: 2,
    stateLabel: '입금대기',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '구매자와 채팅하기', type: 'blue', action: 'chat' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [
      { label: '거래 취소', action: 'cancel' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '4',
    state: 3,
    stateLabel: '입금완료',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '배송 예약일 : 26.02.25', type: 'schedule', action: 'schedule' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [
      { label: '구매자와 채팅하기', action: 'chat' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '5',
    state: 4,
    stateLabel: '설치완료',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '구매자와 채팅하기', type: 'blue', action: 'chat' },
      { label: '주문상세', type: 'light', action: 'detail' },
    ],
    moreButtons: [
      { label: '게시글 숨기기', action: 'hide' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '6',
    state: 5,
    stateLabel: '거래완료(안전결제)',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '후기 보내기/보낸 후기 보기/받은 후기 보기', type: 'blue', action: 'review_send' },
    ],
    moreButtons: [
      { label: '숨기기', action: 'hide' },
      { label: '삭제', action: 'delete' },
      { label: '닫기', action: 'close' },
    ],
  },
  {
    id: '7',
    state: 5,
    stateLabel: '거래완료(직거래)',
    timeAgo: '9분전 등록',
    image: 'img03',
    title: '(마니)(사)나노포토닉스 ECOMILL-65V 수직머시닝센터 6.5호 황민석(카기) 황민석(카기)오토파',
    price: '10,000,000원',
    likes: 3,
    comments: 5,
    buttons: [
      { label: '후기 보내기/보낸 후기 보기/받은 후기 보기', type: 'blue', action: 'review_send' },
    ],
    moreButtons: [
      { label: '판매중으로 변경', action: 'change_selling' },
      { label: '게시글 수정', action: 'edit' },
      { label: '숨기기', action: 'hide' },
      { label: '삭제', action: 'delete' },
      { label: '닫기', action: 'close' },
    ],
  },
];

const TOP_TABS = [
  { label: '판매중', count: 5 },
  { label: '거래완료', count: 5 },
  { label: '숨김', count: 5 },
];

const STATE_FILTERS = [
  { label: '전체', count: 15 },
  { label: '입금대기', count: 5 },
  { label: '입금완료', count: 5 },
];

export const SellListScreen: React.FC = () => (
  <TradeListScreen
    title="판매내역"
    items={SELL_ITEMS}
    topTabs={TOP_TABS}
    stateFilterLabel="안전결제"
    stateFilters={STATE_FILTERS}
    periodLabel="기간선택"
    showDateHeader={false}
  />
);
