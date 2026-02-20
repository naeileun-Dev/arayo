import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import StarIcon from '../../../assets/icon/star.svg';

import { colors, PRODUCT_IMGS, USER_IMG } from '../constants';
import { styles } from '../ProductViewScreen.styles';

interface ReviewItemProps {
  id: number;
}

/** 리뷰 한 건 */
export default function ReviewItem({ id }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.reviewItem}>
      {/* 프로필 + 별점 */}
      <View style={styles.rowCenter}>
        <Image source={USER_IMG} style={styles.reProfileImg} resizeMode="cover" />
        <View style={styles.flex1}>
          <View style={styles.rowEndGap6}>
            <Text style={styles.reName}>닉네임 {id}</Text>
            <Text style={styles.reDate}>2020.02.02</Text>
          </View>
          <View style={styles.rowCenterGap4mt4}>
            <StarIcon width={18} height={18} />
            <Text style={styles.reStarScore}>4</Text>
          </View>
        </View>
      </View>

      {/* 상품 요약 칩 */}
      <View style={styles.reInfoRow}>
        {[
          { dt: '상품명', dd: '화천기계' },
          { dt: '상품금액', dd: '2,400,000' },
          { dt: '조회수', dd: '1' },
        ].map((info) => (
          <View key={info.dt} style={styles.reInfoChip}>
            <Text style={styles.reInfoDt}>{info.dt}</Text>
            <Text style={styles.reInfoDd}>{info.dd}</Text>
          </View>
        ))}
      </View>

      {/* 첨부 이미지 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reImgScroll}>
        {[1, 2, 3, 4, 5].map((img) => (
          <Image key={img} source={PRODUCT_IMGS[img % 3]} style={styles.reAttachedImg} resizeMode="cover" />
        ))}
      </ScrollView>

      {/* 리뷰 본문 */}
      <Text style={styles.reContentText} numberOfLines={isExpanded ? undefined : 4}>
        작업자가 하루에도 수십 번 치수를 확인해야 하는 편인데, 이 장비로 바꾼 뒤로 작업 효율이 확실히 올라갔습니다.{'\n'}
        UI도 직관적이고, 프로그램 세팅이 간단해서 숙련도가 낮은 작업자도 금방 적응했습니다.{'\n'}
        중고라 내심 걱정했는데 렌즈 상태와 축 움직임 모두 양호했고 새 제품 구매하기엔 부담돼서 중고로 들였는데, 가격 대비 만족도가 정말 높습니다.{'\n'}
        외관 흠집도 거의 없고 테이블 마모도 적어서 관리가 잘 되어 있었던 장비 같아요. 실제 사용해보니 접촉식과 비접촉식 전환이 부드럽고, 반복 측정값 편차도 거의 없습니다.{'\n\n'}
        판매자 응대도 친절해서 거래 과정이 편했습니다.
      </Text>

      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.moreBtn}>
        <Text style={styles.moreBtnText}>{isExpanded ? '접기' : '더보기'}</Text>
        <View style={isExpanded ? styles.chevronUp : undefined}>
          <ChevronDownIcon width={14} height={14} color="#7E7E7E" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
