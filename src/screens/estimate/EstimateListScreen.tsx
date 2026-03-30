import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { InquiryListScreen, InquiryListItemData } from '../../components/inquiry';
import { EstimateInquiryModal } from './components/EstimateInquiryModal';

const SAMPLE_DATA: InquiryListItemData[] = [
  {
    id: '1',
    status: 'ing',
    statusLabel: '요청중',
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
    statusLabel: '요청완료',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '3',
    status: 'complete',
    statusLabel: '요청완료',
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
    statusLabel: '요청중',
    title: '[머시닝센터6호 ECOMILL-65V 수직머시닝센타6.5호 평면연삭기,평면연마기,연마기,오까모도,700-1500,연삭기,OKAMOTO] 급하게 처분합니다. 채팅 주세요.',
    caseCount: '1건',
  },
  {
    id: '6',
    status: 'ing',
    statusLabel: '요청중',
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

export const EstimateListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      <InquiryListScreen
        title="견적 문의"
        fabLabel="견적문의"
        fabNavigateTo="EstimateUpload"
        detailNavigateTo="EstimateDetail"
        sampleData={SAMPLE_DATA}
      />

      <EstimateInquiryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          navigation.navigate('EstimateUpload', { mode: undefined });
        }}
      />
    </>
  );
};
