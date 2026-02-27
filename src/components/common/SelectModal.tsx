import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colors';

interface SelectModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scroll}>
            {options.map((opt) => {
              const isSelected = selectedValue === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.option, isSelected && styles.optionActive]}
                  onPress={() => {
                    onSelect(opt);
                    onClose();
                  }}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>
                    {opt}
                  </Text>
                  {isSelected && <Text style={styles.optionCheck}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    color: colors.G600,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G100,
  },
  optionActive: {
    backgroundColor: '#F9F9F9',
  },
  optionText: {
    fontSize: 15,
    color: colors.black,
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  optionCheck: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectModal;
