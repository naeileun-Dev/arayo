import React from 'react';
import { InquiryListScreen, InquiryListItemData } from '../../components/inquiry';

const SAMPLE_DATA: InquiryListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
    caseCount: '1건',
    subItems: [
      { price: '40,500,000원', subject: '범용선반/ABC-D1', date: '25.06.15' },
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '의뢰 완료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'complete',
    statusLabel: '의뢰 완료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
    caseCount: '1건',
  },
  {
    id: '5',
    status: 'exp',
    statusLabel: '만료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '[로봇/드론/IOT/스마트기기] 스마트기기 부품 임가공 문의',
  },
];

export const MyProcessingListScreen: React.FC = () => (
  <InquiryListScreen
    title="임가공 문의 내역"
    tabs={['의뢰중', '의뢰 완료', '만료']}
    fabLabel="임가공의뢰"
    fabNavigateTo="ProcessingUpload"
    detailNavigateTo="MyProcessingDetail"
    sampleData={SAMPLE_DATA}
    hideBanner
    hideSort
    hideSearch
    hideFab
  />
);
