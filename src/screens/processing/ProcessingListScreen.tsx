import React from 'react';
import { InquiryListScreen, InquiryListItemData, FabSpeedDialItem } from '../../components/inquiry';
import CompanyIcon from '../../assets/icon/company.svg';
import GearsIcon from '../../assets/icon/gears.svg';

const SAMPLE_DATA: InquiryListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
    subItems: [
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
      { subject: '범용선반/ABC-D1', date: '25.06.15' },
    ],
  },
  {
    id: '2',
    status: 'complete',
    statusLabel: '의뢰완료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '의뢰완료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '4',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '5',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '의뢰중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '7',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '8',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '9',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '10',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '11',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
  {
    id: '12',
    status: 'exp',
    statusLabel: '만료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
  },
];

const SPEED_DIAL_ITEMS: FabSpeedDialItem[] = [
  {
    label: '업체찾기',
    icon: <CompanyIcon width={24} height={24} color="#1B1B1B" />,
    navigateTo: 'ProcessingHome',
  },
  {
    label: '의뢰하기',
    icon: <GearsIcon width={24} height={24} color="#1B1B1B" />,
    navigateTo: 'ProcessingUpload',
  },
];

export const ProcessingListScreen: React.FC = () => (
  <InquiryListScreen
    title="임가공 견적 문의"
    tabs={['전체', '의뢰중', '의뢰완료']}
    fabLabel="견적문의"
    fabNavigateTo="ProcessingUpload"
    detailNavigateTo="ProcessingDetail"
    sampleData={SAMPLE_DATA}
    fabSpeedDial={SPEED_DIAL_ITEMS}
  />
);

