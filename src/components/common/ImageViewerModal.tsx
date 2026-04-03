import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import XIcon from '../../assets/icon/X.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ImageViewerModalProps {
  visible: boolean;
  images: any[];
  initialIndex?: number;
  onClose: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  if (!visible || images.length === 0) return null;

  const safeIndex = Math.min(currentIndex, images.length - 1);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onClose}>
        <View style={styles.header}>
          <Text style={styles.title}>이미지 보기</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <XIcon width={24} height={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <Image source={images[safeIndex]} style={styles.image} resizeMode="contain" />
        </View>

        {images.length > 1 && (
          <View style={styles.thumbs}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbsContent}>
              {images.map((img, index) => (
                <TouchableOpacity key={index} onPress={() => setCurrentIndex(index)} activeOpacity={0.8}>
                  <View style={[styles.thumb, safeIndex === index && styles.thumbActive]}>
                    <Image source={img} style={styles.thumbImg} resizeMode="cover" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  thumbs: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  thumbsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbActive: {
    borderColor: colors.white,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
});
