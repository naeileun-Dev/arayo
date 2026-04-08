import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImageUploadIcon from '../../assets/icon/image_upload.svg';
import ImageDeleteIcon from '../../assets/icon/image_delete.svg';

const IMAGE_SIZE = 98;
const DELETE_BTN_SIZE = 32;

interface ImageUploadGridProps {
  images: string[];
  maxCount: number;
  onRemove: (index: number) => void;
  onAdd: () => void;
  showRepresentativeBadge?: boolean;
  /** true = 흰색 배경, 테두리 없음 (브랜드관용) */
  plain?: boolean;
}

export const ImageUploadGrid: React.FC<ImageUploadGridProps> = ({
  images,
  maxCount,
  onRemove,
  onAdd,
  showRepresentativeBadge = false,
  plain = false,
}) => (
  <View style={styles.row}>
    {images.map((uri, idx) => {
      const isRepresentative = showRepresentativeBadge && idx === 0;
      return (
        <View
          key={idx}
          style={[
            styles.previewWrap,
            isRepresentative && styles.representativeBorder,
          ]}
        >
          <Image source={{ uri }} style={styles.preview} />
          {isRepresentative && (
            <View style={styles.representativeBadge}>
              <Text style={styles.representativeBadgeText}>대표</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => onRemove(idx)}
          >
            <ImageDeleteIcon width={18} height={18} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    })}
    {images.length < maxCount && (
      <View style={[styles.uploaderWrap, !plain && styles.uploaderBorder]}>
        <TouchableOpacity
          style={[styles.uploader, !plain && styles.uploaderFill]}
          activeOpacity={0.7}
          onPress={onAdd}
        >
          <ImageUploadIcon width={28} height={28} />
        </TouchableOpacity>
        <View style={styles.removeBtn}>
          <ImageDeleteIcon width={18} height={18} color="#fff" />
        </View>
      </View>
    )}
  </View>
);

/* ── Single upload box (for brand/processing screens) ── */
interface ImageUploadBoxProps {
  uri?: string | null;
  onAdd?: () => void;
  onDelete?: () => void;
  size?: number;
  /** true = 흰색 배경, 테두리 없음 (브랜드관용) */
  plain?: boolean;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  uri,
  onAdd,
  onDelete,
  size = IMAGE_SIZE,
  plain = false,
}) => {
  const sizeStyle = { width: size, height: size };
  if (uri) {
    return (
      <View style={[styles.previewWrap, sizeStyle]}>
        <Image source={{ uri }} style={styles.preview} />
        <TouchableOpacity style={styles.removeBtn} onPress={onDelete}>
          <ImageDeleteIcon width={18} height={18} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.uploaderWrap, !plain && styles.uploaderBorder, sizeStyle]}>
      <TouchableOpacity
        style={[styles.uploader, !plain && styles.uploaderFill]}
        activeOpacity={0.7}
        onPress={onAdd}
      >
        <ImageUploadIcon width={28} height={28} />
      </TouchableOpacity>
      <View style={styles.removeBtn}>
        <ImageDeleteIcon width={18} height={18} color="#fff" />
      </View>
    </View>
  );
};

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
  uploaderBorder: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  uploaderFill: {
    backgroundColor: '#F7F7F7',
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
  representativeBorder: {
    borderWidth: 2,
    borderColor: '#DB0025',
  },
  representativeBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#DB0025',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderBottomRightRadius: 6,
  },
  representativeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
