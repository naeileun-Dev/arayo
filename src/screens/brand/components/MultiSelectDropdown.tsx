import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { colors } from '../../../styles/colors';
import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import XIcon from '../../../assets/icon/X.svg';
import CheckIcon from '../../../assets/icon/check.svg';

interface Option {
  id: string;
  label: string;
}

interface MultiSelectDropdownProps {
  label: string;
  required?: boolean;
  placeholder: string;
  options: Option[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
  errorMessage?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  required,
  placeholder,
  options,
  selectedIds,
  onChange,
  isLoading = false,
  errorMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleRemove = (id: string) => {
    onChange(selectedIds.filter((sid) => sid !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>{label}</Text>
        {required && <Text style={styles.requiredMark}> *</Text>}
      </View>

      <TouchableOpacity
        style={[styles.selectBox, isOpen && styles.selectBoxActive]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        {selectedOptions.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}
          >
            {selectedOptions.map((opt) => (
              <View key={opt.id} style={styles.tag}>
                <Text style={styles.tagText} numberOfLines={1}>
                  {opt.label}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemove(opt.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
                >
                  <XIcon width={12} height={12} color={colors.G600} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <ChevronDownIcon width={20} height={20} color={colors.G500} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.optionsList} nestedScrollEnabled>
            {options.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                  onPress={() => handleToggle(opt.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <CheckIcon width={14} height={14} color={colors.white} />}
                  </View>
                  <Text style={styles.optionText} numberOfLines={1}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {isLoading && (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="small" color={colors.G400} />
              <Text style={styles.loadingText}>목록을 불러오는 중입니다.</Text>
            </View>
          )}
        </View>
      )}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
    color: colors.G600,
  },
  requiredMark: {
    fontSize: 15,
    color: colors.error,
  },
  selectBox: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectBoxActive: {
    borderColor: colors.primary,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingRight: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.G100,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    color: colors.black,
    maxWidth: 120,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.G400,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    backgroundColor: colors.white,
    maxHeight: 300,
    overflow: 'hidden',
  },
  optionsList: {
    maxHeight: 250,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  optionItemSelected: {
    backgroundColor: colors.G100,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.G300,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: colors.black,
  },
  loadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    color: colors.G500,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
    marginTop: 2,
    textDecorationLine: 'underline',
  },
});

