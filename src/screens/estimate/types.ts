export type EstimateStatus = 'ing' | 'complete' | 'exp';

export interface EstimateSubItem {
  subject: string;
  date: string;
  price?: string;
}

export interface EstimateListItemData {
  id: string;
  status: EstimateStatus;
  statusLabel: string;
  title: string;
  caseCount?: string;
  subItems?: EstimateSubItem[];
}

export type TabType = '전체' | '신품' | '중고';

export type SortType =
  | '최신순'
  | '가격 낮은순'
  | '가격 높은순'
  | '조회수순'
  | '관심 많은순'
  | '거리순';
