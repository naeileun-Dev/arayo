export type InquiryStatus = 'ing' | 'complete' | 'exp';

export interface InquirySubItem {
  subject: string;
  date: string;
  price?: string;
}

export interface InquiryListItemData {
  id: string;
  status: InquiryStatus;
  statusLabel: string;
  title: string;
  caseCount?: string;
  subItems?: InquirySubItem[];
}

export type InquiryTabType = '전체' | '신품' | '중고';

export type InquirySortType =
  | '최신순'
  | '가격 낮은순'
  | '가격 높은순'
  | '조회수순'
  | '관심 많은순'
  | '거리순';
