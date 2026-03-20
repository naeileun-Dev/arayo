import React from 'react';
import { SelectPartnerModal } from '../common';
import type { PartnerOption } from '../common';

const DEFAULT_BUYERS: PartnerOption[] = [
  {
    id: '1',
    name: '김샘플',
    tags: [
      { label: '가격제안가능', color: '#22C55E' },
      { label: '9분전 대화', color: '#3B82F6' },
    ],
  },
  {
    id: '2',
    name: '홍길동',
    tags: [{ label: '9분전 대화', color: '#3B82F6' }],
  },
];

interface SelectBuyerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (buyerId: string) => void;
}

export const SelectBuyerModal: React.FC<SelectBuyerModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => (
  <SelectPartnerModal
    visible={visible}
    onClose={onClose}
    onSelect={onSelect}
    partners={DEFAULT_BUYERS}
  />
);
