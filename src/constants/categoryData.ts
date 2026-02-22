export const CATEGORY_DATA: Record<string, { title: string; sub: string[] }> = {
  machine_tools: { title: '공작기계', sub: ['CNC 선반', 'CNC복합기', 'MCT(머시닝센터)', '범용 밀링', '범용 선반', '보링기', '기타'] },
  mold_injection: { title: '금형/사출기', sub: ['플라스틱 사출', '성형기', '플라스틱 가공기', '고무 성형기', '고무 가공기', '와이어 커팅기', '방전가공기', '기타'] },
  sheet_metal_welding: { title: '판금/용접', sub: ['프레스', '절곡기', '샤링기', '펀칭기', '레이저 절단기', '플라스마 절단기', '용접기(파이버, Co2, 인버터, 스포트, 토치)', '드릴기', '기타(워터젯/산소 절단기/가스 절단기)'] },
  woodworking_machines: { title: '목공기계', sub: ['보링기', 'CNC러닝쏘(재단기)', '엣지밴딩기', '스키퍼', '루타기', '파쇄기/분쇄기/톱밥제조기', '네스팅머신', '기타'] },
  material_handling_heavy: { title: '운반/중장비', sub: ['지게차(디젤, 전동)', '전동 스태커', '고소 작업대', '컨베이어', '크레인/호이스트', '에어발란스/암 크레인', '건설중장비', '기타'] },
  industrial_robots: { title: '산업용 로봇', sub: ['협동 로봇', '산업용 로봇', '용접 로봇', '서비스용 로봇', '이적재용 로봇', '기타'] },
  food_packaging: { title: '식품/포장 기계', sub: ['랩핑기', '마킹기', '여과기', '포장기', '충진기', '식품성형기', '식품절단기', '혼합기', '세척기', '기타'] },
  cutting_grinding: { title: '절삭/연마/연삭', sub: ['밴드쏘', '원형톱기계', '톱날', '파이프절단기', '연마기/연삭기', '기타'] },
  tools_parts: { title: '공구/부품', sub: ['전동공구', '카타기', '그라인더', '드라이버', '측정기·계측장비', '볼트/너트/베어링/체인', '호스', '기타'] },
  consumables: { title: '소모품', sub: ['절삭유', '용접포', '유압작동유', '기어오일', '가공유', '세척유', '인발유', '기타'] },
  other_equipment: { title: '기타 설비', sub: ['쇼트기', '철근/코일 가공기', '프린트/3D프린트', '집진기', '작업대 · 공구함', '기타'] },
};

export const CATEGORY_LIST = Object.values(CATEGORY_DATA).map(v => v.title);

export const YEARS = Array.from({ length: 27 }, (_, i) => `${2000 + i}년`);
export const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
