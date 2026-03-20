import React from 'react';
import { InquiryListScreen, InquiryListItemData } from '../../components/inquiry';

const SAMPLE_DATA: InquiryListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
    subItems: [
      { price: '40,500,000원', subject: '범용선반/ABC-D1', date: '25.06.15' },
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '요청완료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '5',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '견적 요청 중',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
    caseCount: '1건',
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '11',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
  {
    id: '12',
    status: 'exp',
    statusLabel: '만료',
    title: '[신품/중고] 안녕하세요. HITACHI 잉크젯 견적 문의드립니다.',
  },
];

export const MyEstimateListScreen: React.FC = () => (
  <InquiryListScreen
    title="견적 문의 내역"
    tabs={['견적 요청 중', '요청 완료', '만료']}
    fabLabel="견적문의"
    fabNavigateTo="EstimateUpload"
    detailNavigateTo="MyEstimateDetail"
    sampleData={SAMPLE_DATA}
    hideBanner
    hideSort
    hideSearch
    hideFab
  />
);
