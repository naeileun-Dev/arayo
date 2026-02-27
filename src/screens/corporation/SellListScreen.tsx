import React from 'react';
import TradeListScreen from '../../components/trade/TradeListScreen';
import type { TradeItem } from '../../types';

const SELL_ITEMS: TradeItem[] = [
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
    ],
  },
];

const SellListScreen: React.FC = () => {
  return <TradeListScreen title="판매내역" items={SELL_ITEMS} />;
};

export default SellListScreen;
