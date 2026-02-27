import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { colors as C } from '../../../styles/colors';
import { SortType, SORT_OPTIONS } from '../types';

interface SortModalProps {
  visible: boolean;
  selected: SortType;
  onSelect: (v: SortType) => void;
  onClose: () => void;
  anchorLayout: { x: number; y: number; width: number; height: number };
}

const SortModal = ({ visible, selected, onSelect, onClose, anchorLayout }: SortModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <View style={[styles.sortDropdown, {
        position: 'absolute',
        top: anchorLayout.y + anchorLayout.height + 4,
        left: anchorLayout.x,
        width: anchorLayout.width,
      }]}>
        {SORT_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.sortOption, selected === opt && styles.sortOptionActive]}
            onPress={() => { onSelect(opt); onClose(); }}
          >
            <Text style={[styles.sortOptionText, selected === opt && styles.sortOptionTextActive]}>{opt}</Text>
            {selected === opt && <Text style={styles.sortCheckMark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sortDropdown: {
    backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.G200, overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  sortOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: C.G100,
  },
  sortOptionActive: { backgroundColor: '#fff5f7' },
  sortOptionText: { fontSize: 14, color: C.black, fontWeight: '400' },
  sortOptionTextActive: { color: C.primary, fontWeight: '600' },
  sortCheckMark: { fontSize: 14, color: C.primary, fontWeight: '700' },
});

export default SortModal;
