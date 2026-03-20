import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { colors } from '../../styles/colors';

export interface CompanyCardData {
  id: string;
  name: string;
  description: string;
  tags: string;
  image?: ImageSourcePropType;
}

interface CompanyCardProps {
  item: CompanyCardData;
  bgImage?: ImageSourcePropType;
  profileImage?: ImageSourcePropType;
  onPress?: () => void;
  descNumberOfLines?: number;
  badge?: React.ReactNode;
}

const PROFILE_IMG = require('../../assets/images/profileImg.png');

const BG_IMAGE_HEIGHT = 120;
const PROFILE_SIZE = 48;
const PROFILE_OFFSET_BOTTOM = -(PROFILE_SIZE / 2);
const PROFILE_OFFSET_LEFT = 12;

export const CompanyCard: React.FC<CompanyCardProps> = ({
  item,
  bgImage,
  profileImage,
  onPress,
  descNumberOfLines = 2,
  badge,
}) => {
  const thumbSource = bgImage ?? item.image;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.thumbBox}>
        {thumbSource ? (
          <Image source={thumbSource} style={styles.bgImage} resizeMode="cover" />
        ) : (
          <View style={[styles.bgImage, styles.bgImagePlaceholder]} />
        )}
        {badge && <View style={styles.badgeWrap}>{badge}</View>}
        <Image source={profileImage ?? thumbSource ?? PROFILE_IMG} style={styles.profileImg} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={descNumberOfLines}>{item.description}</Text>
        <Text style={styles.tags} numberOfLines={1}>{item.tags}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'visible',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.G200,
    backgroundColor: colors.white,
  },
  thumbBox: {
    position: 'relative',
  },
  bgImage: {
    width: '100%',
    height: BG_IMAGE_HEIGHT,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bgImagePlaceholder: {
    backgroundColor: colors.G200,
  },
  badgeWrap: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 3,
  },
  profileImg: {
    position: 'absolute',
    bottom: PROFILE_OFFSET_BOTTOM,
    left: PROFILE_OFFSET_LEFT,
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    borderWidth: 2,
    borderRadius: PROFILE_SIZE / 2,
    borderColor: colors.white,
    zIndex: 5,
  },
  content: {
    gap: 8,
    padding: 15,
    paddingTop: PROFILE_SIZE / 2 + 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.black,
  },
  tags: {
    fontSize: 12,
    color: colors.G600,
  },
});
