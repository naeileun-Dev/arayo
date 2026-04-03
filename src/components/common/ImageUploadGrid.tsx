import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImageUploadIcon from '../../assets/icon/image_upload.svg';
import ImageDeleteIcon from '../../assets/icon/image_delete.svg';

const IMAGE_SIZE = 98;
const DELETE_BTN_SIZE = 32;

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
        >
          <ImageDeleteIcon width={18} height={18} color="#fff" />
        </TouchableOpacity>
      </View>
    ))}
    {images.length < maxCount && (
      <View style={styles.uploaderWrap}>
        <TouchableOpacity style={styles.uploader} activeOpacity={0.7} onPress={onAdd}>
          <ImageUploadIcon width={28} height={28} />
        </TouchableOpacity>
        <View style={styles.removeBtn}>
          <ImageDeleteIcon width={18} height={18} color="#fff" />
        </View>
      </View>
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
  uploaderWrap: {
    position: 'relative',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  uploader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  previewWrap: {
    position: 'relative',
    overflow: 'hidden',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: DELETE_BTN_SIZE,
    height: DELETE_BTN_SIZE,
    borderTopLeftRadius: 2,
    backgroundColor: 'rgba(27,27,27,0.7)',
  },
});
