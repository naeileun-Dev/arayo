import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PADDING = 32;
const GRID_GAP = 16;
const IMAGE_SIZE = (SCREEN_WIDTH - GRID_PADDING - GRID_GAP) / 3;

const REMOVE_BTN_SIZE = 20;
const HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };

interface ImageUploadGridProps {
  images: string[];
  maxCount: number;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

export const ImageUploadGrid: React.FC<ImageUploadGridProps> = ({
  images,
  maxCount,
  onRemove,
  onAdd,
}) => (
  <View style={styles.row}>
    {images.map((uri, idx) => (
      <View key={idx} style={styles.previewWrap}>
        <Image source={{ uri }} style={styles.preview} />
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => onRemove(idx)}
          hitSlop={HIT_SLOP}
        >
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </View>
    ))}
    {images.length < maxCount && (
      <TouchableOpacity style={styles.uploader} activeOpacity={0.7} onPress={onAdd}>
        <Text style={styles.uploaderPlus}>+</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 5,
  },
  uploader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    backgroundColor: colors.G100,
  },
  uploaderPlus: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.G400,
  },
  previewWrap: {
    position: 'relative',
    overflow: 'hidden',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: REMOVE_BTN_SIZE,
    height: REMOVE_BTN_SIZE,
    borderRadius: REMOVE_BTN_SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  removeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
  },
});
