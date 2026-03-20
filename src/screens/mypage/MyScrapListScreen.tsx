import React from 'react';
import { InquiryListScreen, InquiryListItemData } from '../../components/inquiry';

const SAMPLE_DATA: InquiryListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '안녕하세요. 고철처리 문의 드립니다.',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
      { price: '40,500,000원', subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '안녕하세요. 고철처리 문의 드립니다.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '의뢰 완료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'complete',
    statusLabel: '의뢰 완료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
    caseCount: '1건',
  },
  {
    id: '5',
    status: 'exp',
    statusLabel: '만료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '안녕하세요. 고철처리 문의 드립니다.',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '안녕하세요. 고철처리 문의 드립니다.',
  },
];

export const MyScrapListScreen: React.FC = () => (
  <InquiryListScreen
    title="고철처리 의뢰 내역"
    tabs={['의뢰중', '의뢰 완료', '만료']}
    fabLabel="고철처리"
    fabNavigateTo="ScrapUpload"
    detailNavigateTo="MyScrapDetail"
    sampleData={SAMPLE_DATA}
    hideBanner
    hideSort
    hideSearch
    hideFab
  />
);
