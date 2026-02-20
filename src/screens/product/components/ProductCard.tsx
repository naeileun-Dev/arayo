import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import HeartIcon from '../../../assets/icon/heart.svg';
import HeartActiveIcon from '../../../assets/icon/heart_active.svg';

import { colors, PRODUCT_IMGS } from '../constants';
import { styles } from '../ProductViewScreen.styles';

interface ProductCardProps {
  width: number;
  height: number;
  liked: boolean;
  onLike: () => void;
}

/** 상품 카드 (가로 스크롤용) */
export default function ProductCard({ width: cardWidth, height: cardHeight, liked, onLike }: ProductCardProps) {
  return (
    <View style={{ width: cardWidth, marginRight: 12 }}>
      <View style={{ width: cardWidth, height: cardHeight, borderRadius: 8, marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
        <Image source={PRODUCT_IMGS[1]} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <TouchableOpacity style={styles.heartBtn} onPress={onLike}>
          {liked
            ? <HeartActiveIcon width={20} height={20} />
            : <HeartIcon width={20} height={20} color={colors.black} />
          }
        </TouchableOpacity>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>온도조절 안정적 · 장시간 운전 가능온도조절</Text>
      <Text style={styles.cardTags}>#누유무 #톱날교체용이</Text>
      <View style={styles.cardBot}>
        <Text style={styles.cardPrice}>12,300,000원</Text>
        <Text style={styles.cardTime}>9분전</Text>
      </View>
    </View>
  );
}
