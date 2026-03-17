export const MACHINE_CATEGORIES = [
  { value: 'machine_tools', label: '공작기계' },
  { value: 'mold_injection', label: '금형/사출기' },
  { value: 'sheet_metal_welding', label: '판금/용접' },
  { value: 'woodworking_machines', label: '목공기계' },
  { value: 'material_handling_heavy', label: '운반/중장비' },
  { value: 'industrial_robots', label: '산업용 로봇' },
  { value: 'food_packaging', label: '식품/포장 기계' },
  { value: 'cutting_grinding', label: '절삭/연마/연삭' },
  { value: 'tools_parts', label: '공구/부품' },
  { value: 'consumables', label: '소모품' },
  { value: 'other_equipment', label: '기타 설비' },
];

export const MACHINE_SUB_CATEGORIES: Record<string, string[]> = {
  machine_tools: ['CNC 선반', 'CNC복합기', 'MCT(머시닝센터)', '범용 밀링', '범용 선반', '보링기', '기타'],
  mold_injection: ['플라스틱 사출', '성형기', '플라스틱 가공기', '고무 성형기', '고무 가공기', '와이어 커팅기', '방전가공기', '기타'],
  sheet_metal_welding: ['프레스', '절곡기', '샤링기', '펀칭기', '레이저 절단기', '플라스마 절단기', '용접기(파이버, Co2, 인버터, 스포트, 토치)', '드릴기', '기타(워터젯/산소 절단기/가스 절단기)'],
  woodworking_machines: ['보링기', 'CNC러닝쏘(재단기)', '엣지밴딩기', '스키퍼', '루타기', '파쇄기/분쇄기/톱밥제조기', '네스팅머신', '기타'],
  material_handling_heavy: ['지게차(디젤, 전동)', '전동 스태커', '고소 작업대', '컨베이어', '크레인/호이스트', '에어발란스/암 크레인', '건설중장비', '기타'],
  industrial_robots: ['협동 로봇', '산업용 로봇', '용접 로봇', '서비스용 로봇', '이적재용 로봇', '기타'],
  food_packaging: ['랩핑기', '마킹기', '여과기', '포장기', '충진기', '식품성형기', '식품절단기', '혼합기', '세척기', '기타'],
  cutting_grinding: ['밴드쏘', '원형톱기계', '톱날', '파이프절단기', '연마기/연삭기', '기타'],
  tools_parts: ['전동공구', '카타기', '그라인더', '드라이버', '측정기·계측장비', '볼트/너트/베어링/체인', '호스', '기타'],
  consumables: ['절삭유', '용접포', '유압작동유', '기어오일', '가공유', '세척유', '인발유', '기타'],
  other_equipment: ['쇼트기', '철근/코일 가공기', '프린트/3D프린트', '집진기', '작업대 · 공구함', '기타'],
};

export const YEARS = Array.from({ length: 27 }, (_, i) => {
  const y = 2000 + i;
  return { value: `${y}`, label: `${y}년` };
});

export const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const m = i + 1;
  return { value: `${m}`, label: `${m}월` };
});

export const CITIES = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
  { value: 'gangwon', label: '강원특별자치도' },
  { value: 'chungbuk', label: '충청북도' },
  { value: 'chungnam', label: '충청남도' },
  { value: 'jeonbuk', label: '전라북도' },
  { value: 'jeonnam', label: '전라남도' },
  { value: 'gyeongbuk', label: '경상북도' },
  { value: 'gyeongnam', label: '경상남도' },
  { value: 'jeju', label: '제주특별자치도' },
];

export const SERVICE_OPTIONS = [
  { key: 'sangchado', label: '상차도' },
  { key: 'dochakdo', label: '도착도' },
  { key: 'install', label: '설치' },
  { key: 'testdrive', label: '시운전 /교육' },
  { key: 'inspection', label: '점검완료' },
  { key: 'installment', label: '할부 가능' },
  { key: 'nego', label: '네고 가능' },
  { key: 'taxinvoice', label: '세금계산서 발행' },
];
