import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../styles/colors';

export interface CompanyCardData {
  id: string;
  name: string;
  description: string;
  tags: string;
  image?: any;
}

interface CompanyCardProps {
  item: CompanyCardData;
  bgImage?: any;
  profileImage?: any;
  onPress?: () => void;
  descNumberOfLines?: number;
  badge?: React.ReactNode;
}

const PROFILE_IMG = require('../../assets/images/profileImg.png');

const CompanyCard: React.FC<CompanyCardProps> = ({
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
          <View style={[styles.bgImage, { backgroundColor: colors.G200 }]} />
        )}
        {badge && <View style={styles.badgeWrap}>{badge}</View>}
        <Image
          source={profileImage ?? PROFILE_IMG}
          style={styles.profileImg}
        />
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
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: 5,
    overflow: 'visible',
    backgroundColor: colors.white,
  },
  thumbBox: {
    position: 'relative',
  },
  bgImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  badgeWrap: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 3,
  },
  profileImg: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    zIndex: 5,
  },
  content: {
    padding: 15,
    paddingTop: 20,
    gap: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  desc: {
    fontSize: 13,
    color: colors.black,
    lineHeight: 18,
  },
  tags: {
    fontSize: 12,
    color: colors.G600,
  },
});

export default CompanyCard;
