import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Animated,
  SafeAreaView,
  Platform,
} from 'react-native';
import RefreshIcon from '../../../assets/icon/refresh-cw.svg';
import CheckIcon from '../../../assets/icon/check.svg';
import SearchIcon from '../../../assets/icon/Search.svg';
import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import ChevronUpIcon from '../../../assets/icon/chevron-up.svg';
import { REGION_DATA, CITIES as REGION_CITIES } from '../../../constants/regionData';
import { CATEGORY_DATA, YEARS, MONTHS } from '../../../constants/categoryData';
import { colors as C } from '../../../styles/colors';
import { FilterState, MANUFACTURERS, PRICE_RANGES, DRAWER_WIDTH, SCREEN_HEIGHT } from '../types';

const CATEGORY_LIST = Object.values(CATEGORY_DATA);

export interface SelectedCategoryItem {
  category: string;
  sub: string;
}

interface FilterPanelProps {
  visible: boolean;
  filter: FilterState;
  onFilterChange: (f: FilterState) => void;
  onClose: () => void;
  onReset: () => void;
  selectedCategories: SelectedCategoryItem[];
  onCategoryToggle: (category: string, sub: string) => void;
}

interface AccordionHeaderProps {
  title: string;
  currentVal?: string;
  isActive?: boolean;
  expanded: boolean;
  onToggle: () => void;
}

interface RadioRowProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

interface SelectModalState {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}

interface ExpandedState {
  category: boolean;
  productType: boolean;
  saleStatus: boolean;
  manufacturer: boolean;
  location: boolean;
  price: boolean;
  date: boolean;
}

const AccordionHeader = ({ title, currentVal, isActive, expanded, onToggle }: AccordionHeaderProps) => (
  <TouchableOpacity style={styles.accordionHead} onPress={onToggle} activeOpacity={0.7}>
    <Text style={styles.accordionTitle}>{title}</Text>
    {currentVal !== undefined && (
      <Text style={[styles.accordionVal, isActive && styles.accordionValActive]}>{currentVal}</Text>
    )}
    {expanded ? (
      <ChevronUpIcon width={16} height={16} color={C.G500} />
    ) : (
      <ChevronDownIcon width={16} height={16} color={C.G500} />
    )}
  </TouchableOpacity>
);

const RadioRow = ({ label, selected, onPress }: RadioRowProps) => (
  <TouchableOpacity style={styles.radioRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.radioOuter, selected && styles.radioOuterOn]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={[styles.radioLabel, selected && styles.radioLabelOn]}>{label}</Text>
    {selected && <CheckIcon width={14} height={14} color={C.primary} />}
  </TouchableOpacity>
);

const CheckboxRow = ({ label, checked, onPress }: CheckboxRowProps) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxOn]}>
      {checked && <CheckIcon width={10} height={10} color={C.white} />}
    </View>
    <Text style={[styles.checkboxLabel, checked && styles.checkboxLabelOn]} numberOfLines={1}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const FilterPanel = ({
  visible,
  filter,
  onFilterChange,
  onClose,
  onReset,
  selectedCategories,
  onCategoryToggle,
}: FilterPanelProps) => {
  const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [expanded, setExpanded] = useState<ExpandedState>({
    category: true,
    productType: false,
    saleStatus: false,
    manufacturer: false,
    location: false,
    price: false,
    date: false,
  });

  const [mfSearch, setMfSearch] = useState('');
  const [selectModal, setSelectModal] = useState<SelectModalState>({
    visible: false,
    title: '',
    options: [],
    selected: '',
    onSelect: () => {},
  });

  const openSelectModal = (title: string, options: string[], selected: string, onSelect: (v: string) => void) => {
    setSelectModal({ visible: true, title, options, selected, onSelect });
  };

  const closeSelectModal = () => {
    setSelectModal(prev => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(DRAWER_WIDTH);
      backdropOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(backdropOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, slideAnim, backdropOpacity]);

  const animateClose = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: DRAWER_WIDTH, duration: 250, useNativeDriver: true }),
      Animated.timing(backdropOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => callback());
  };

  const handleClose = () => animateClose(onClose);

  const toggle = (key: keyof ExpandedState) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleManufacturer = (name: string) => {
    const next = filter.manufacturers.includes(name)
      ? filter.manufacturers.filter(m => m !== name)
      : [...filter.manufacturers, name];
    onFilterChange({ ...filter, manufacturers: next });
  };

  const filteredMf = MANUFACTURERS.filter(m => m.toLowerCase().includes(mfSearch.toLowerCase()));

  const mfVal =
    filter.manufacturers.length > 0
      ? filter.manufacturers[0] + (filter.manufacturers.length > 1 ? ` 외 ${filter.manufacturers.length - 1}` : '')
      : '전체';

  const locationVal = filter.city
    ? filter.county
      ? `${filter.city} ${filter.county}`
      : filter.city
    : '전체';

  const priceVal =
    filter.priceRange !== '전체'
      ? filter.priceRange
      : filter.priceMin || filter.priceMax
        ? `${filter.priceMin || '0'}~${filter.priceMax || '∞'}`
        : '전체';

  const dateFromStr = filter.dateFromYear ? `${filter.dateFromYear} ${filter.dateFromMonth}` : '';
  const dateToStr = filter.dateToYear ? `${filter.dateToYear} ${filter.dateToMonth}` : '';
  const dateVal = dateFromStr || dateToStr ? `${dateFromStr || '?'}~${dateToStr || '?'}` : '전체';

  const counties = filter.city ? REGION_DATA[filter.city] || [] : [];

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.drawerOverlay}>
        <Animated.View style={[styles.drawerBackdrop, { opacity: backdropOpacity }]}>
          <Pressable style={styles.backdropPressable} onPress={handleClose} />
        </Animated.View>

        <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={styles.drawerInner}>
            <View style={styles.panelHead}>
              <Text style={styles.panelTitle}>필터</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              <View style={styles.searchSection}>
                <View style={styles.searchWrap}>
                  <SearchIcon width={18} height={18} color={C.G400} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="어떤 설비를 찾으세요?"
                    placeholderTextColor={C.G400}
                    value={filter.searchText}
                    onChangeText={text => onFilterChange({ ...filter, searchText: text })}
                  />
                  {filter.searchText.length > 0 && (
                    <TouchableOpacity onPress={() => onFilterChange({ ...filter, searchText: '' })}>
                      <Text style={styles.searchClear}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="카테고리"
                  currentVal={
                    selectedCategories.length > 0
                      ? selectedCategories[0].sub +
                        (selectedCategories.length > 1 ? ` 외 ${selectedCategories.length - 1}` : '')
                      : undefined
                  }
                  isActive={selectedCategories.length > 0}
                  expanded={expanded.category}
                  onToggle={() => toggle('category')}
                />
                {expanded.category && (
                  <View style={styles.body}>
                    {CATEGORY_LIST.map(cat => (
                      <View key={cat.title}>
                        <View style={styles.catGroupHeader}>
                          <Text style={styles.catGroupTitle}>{cat.title}</Text>
                        </View>
                        {cat.sub.map(sub => {
                          const isSelected = selectedCategories.some(
                            s => s.category === cat.title && s.sub === sub
                          );
                          return (
                            <TouchableOpacity
                              key={sub}
                              style={styles.catSubRow}
                              onPress={() => onCategoryToggle(cat.title, sub)}
                              activeOpacity={0.7}
                            >
                              <Text style={[styles.catSubText, isSelected && styles.catSubTextOn]}>{sub}</Text>
                              <View style={[styles.catCheckbox, isSelected && styles.catCheckboxOn]}>
                                {isSelected && <CheckIcon width={12} height={12} color={C.white} />}
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="제품 유형"
                  currentVal={filter.productType}
                  isActive={filter.productType !== '전체'}
                  expanded={expanded.productType}
                  onToggle={() => toggle('productType')}
                />
                {expanded.productType && (
                  <View style={styles.body}>
                    {(['전체', '신품', '중고'] as const).map(opt => (
                      <RadioRow
                        key={opt}
                        label={opt}
                        selected={filter.productType === opt}
                        onPress={() => onFilterChange({ ...filter, productType: opt })}
                      />
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="판매 상태"
                  currentVal={filter.saleStatus}
                  isActive={filter.saleStatus !== '전체'}
                  expanded={expanded.saleStatus}
                  onToggle={() => toggle('saleStatus')}
                />
                {expanded.saleStatus && (
                  <View style={styles.body}>
                    {(['전체', '판매중', '판매완료'] as const).map(opt => (
                      <RadioRow
                        key={opt}
                        label={opt}
                        selected={filter.saleStatus === opt}
                        onPress={() => onFilterChange({ ...filter, saleStatus: opt })}
                      />
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="제조사"
                  currentVal={mfVal}
                  isActive={filter.manufacturers.length > 0}
                  expanded={expanded.manufacturer}
                  onToggle={() => toggle('manufacturer')}
                />
                {expanded.manufacturer && (
                  <View style={styles.body}>
                    <View style={styles.mfSearchWrap}>
                      <TextInput
                        style={styles.mfSearchInput}
                        placeholder="제조사 검색"
                        placeholderTextColor={C.G400}
                        value={mfSearch}
                        onChangeText={setMfSearch}
                      />
                    </View>
                    {filteredMf.map(m => (
                      <CheckboxRow
                        key={m}
                        label={m}
                        checked={filter.manufacturers.includes(m)}
                        onPress={() => toggleManufacturer(m)}
                      />
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="제품 위치"
                  currentVal={locationVal}
                  isActive={!!filter.city}
                  expanded={expanded.location}
                  onToggle={() => toggle('location')}
                />
                {expanded.location && (
                  <View style={styles.body}>
                    <View style={styles.selectRow}>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() =>
                          openSelectModal('시/도 선택', REGION_CITIES, filter.city, v => {
                            onFilterChange({ ...filter, city: v, county: '' });
                          })
                        }
                      >
                        <Text style={[styles.selectBtnText, filter.city && styles.selectBtnTextActive]}>
                          {filter.city || '시/도 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() => {
                          if (!filter.city) return;
                          openSelectModal('구/군 선택', counties, filter.county, v => {
                            onFilterChange({ ...filter, county: v });
                          });
                        }}
                      >
                        <Text style={[styles.selectBtnText, filter.county && styles.selectBtnTextActive]}>
                          {filter.county || '구/군 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="제품 가격"
                  currentVal={priceVal}
                  isActive={priceVal !== '전체'}
                  expanded={expanded.price}
                  onToggle={() => toggle('price')}
                />
                {expanded.price && (
                  <View style={styles.body}>
                    <View style={styles.priceInputRow}>
                      <TextInput
                        style={styles.priceInput}
                        placeholder="최소금액"
                        placeholderTextColor={C.G400}
                        keyboardType="numeric"
                        value={filter.priceMin}
                        onChangeText={t => onFilterChange({ ...filter, priceMin: t, priceRange: '전체' })}
                      />
                      <Text style={styles.priceTilde}>~</Text>
                      <TextInput
                        style={styles.priceInput}
                        placeholder="최대금액"
                        placeholderTextColor={C.G400}
                        keyboardType="numeric"
                        value={filter.priceMax}
                        onChangeText={t => onFilterChange({ ...filter, priceMax: t, priceRange: '전체' })}
                      />
                    </View>
                    {PRICE_RANGES.map(opt => (
                      <RadioRow
                        key={opt}
                        label={opt}
                        selected={filter.priceRange === opt}
                        onPress={() => onFilterChange({ ...filter, priceRange: opt, priceMin: '', priceMax: '' })}
                      />
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AccordionHeader
                  title="제조 연월"
                  currentVal={dateVal}
                  isActive={dateVal !== '전체'}
                  expanded={expanded.date}
                  onToggle={() => toggle('date')}
                />
                {expanded.date && (
                  <View style={styles.body}>
                    <Text style={styles.dateSubLabel}>시작</Text>
                    <View style={styles.selectRow}>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() =>
                          openSelectModal('시작 연도', YEARS, filter.dateFromYear, v => {
                            onFilterChange({ ...filter, dateFromYear: v });
                          })
                        }
                      >
                        <Text style={[styles.selectBtnText, filter.dateFromYear && styles.selectBtnTextActive]}>
                          {filter.dateFromYear || '연도 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() =>
                          openSelectModal('시작 월', MONTHS, filter.dateFromMonth, v => {
                            onFilterChange({ ...filter, dateFromMonth: v });
                          })
                        }
                      >
                        <Text style={[styles.selectBtnText, filter.dateFromMonth && styles.selectBtnTextActive]}>
                          {filter.dateFromMonth || '월 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.dateSubLabel, styles.dateSubLabelEnd]}>종료</Text>
                    <View style={styles.selectRow}>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() =>
                          openSelectModal('종료 연도', YEARS, filter.dateToYear, v => {
                            onFilterChange({ ...filter, dateToYear: v });
                          })
                        }
                      >
                        <Text style={[styles.selectBtnText, filter.dateToYear && styles.selectBtnTextActive]}>
                          {filter.dateToYear || '연도 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.selectBtn}
                        activeOpacity={0.7}
                        onPress={() =>
                          openSelectModal('종료 월', MONTHS, filter.dateToMonth, v => {
                            onFilterChange({ ...filter, dateToMonth: v });
                          })
                        }
                      >
                        <Text style={[styles.selectBtnText, filter.dateToMonth && styles.selectBtnTextActive]}>
                          {filter.dateToMonth || '월 선택'}
                        </Text>
                        <ChevronDownIcon width={14} height={14} color={C.G400} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              <View style={styles.bottomSpacer} />
            </ScrollView>

            <View style={styles.bottomBtns}>
              <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.7}>
                <RefreshIcon width={16} height={16} color={C.G600} />
                <Text style={styles.resetBtnText}>초기화</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>

      <Modal visible={selectModal.visible} transparent animationType="slide" onRequestClose={closeSelectModal}>
        <Pressable style={styles.selectOverlay} onPress={closeSelectModal}>
          <View style={styles.selectBox}>
            <View style={styles.selectBoxHead}>
              <Text style={styles.selectBoxTitle}>{selectModal.title}</Text>
              <TouchableOpacity onPress={closeSelectModal} activeOpacity={0.7}>
                <Text style={styles.selectBoxClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.selectBoxScroll} showsVerticalScrollIndicator={false}>
              {selectModal.options.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.selectOption, selectModal.selected === opt && styles.selectOptionActive]}
                  onPress={() => {
                    selectModal.onSelect(opt);
                    closeSelectModal();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.selectOptionText, selectModal.selected === opt && styles.selectOptionTextActive]}>
                    {opt}
                  </Text>
                  {selectModal.selected === opt && <CheckIcon width={14} height={14} color={C.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdropPressable: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: DRAWER_WIDTH,
    backgroundColor: C.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: { elevation: 24 },
    }),
  },
  drawerInner: {
    flex: 1,
    backgroundColor: C.white,
  },
  panelHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  panelTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.black,
  },
  closeBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    color: C.G600,
  },
  scrollArea: {
    flex: 1,
  },
  searchSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: 6,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: C.white,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: C.black,
    padding: 0,
  },
  searchClear: {
    fontSize: 14,
    color: C.G400,
    padding: 4,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  accordionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 8,
  },
  accordionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: C.black,
  },
  accordionVal: {
    fontSize: 13,
    color: C.G500,
  },
  accordionValActive: {
    color: C.primary200,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: C.G100,
  },
  catGroupHeader: {
    backgroundColor: C.G200,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  catGroupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.G700,
  },
  catSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
    backgroundColor: C.white,
  },
  catSubText: {
    flex: 1,
    fontSize: 14,
    color: C.black,
  },
  catSubTextOn: {
    color: C.primary,
    fontWeight: '600',
  },
  catCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: C.G300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.white,
  },
  catCheckboxOn: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: C.G300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterOn: {
    borderColor: C.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.primary,
  },
  radioLabel: {
    flex: 1,
    fontSize: 14,
    color: C.black,
  },
  radioLabelOn: {
    color: C.primary,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: C.G300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.white,
  },
  checkboxBoxOn: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: C.black,
  },
  checkboxLabelOn: {
    color: C.primary,
    fontWeight: '600',
  },
  mfSearchWrap: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  mfSearchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: C.black,
    backgroundColor: C.white,
  },
  selectRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
  },
  selectBtn: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: C.white,
  },
  selectBtnText: {
    fontSize: 14,
    color: C.G400,
  },
  selectBtnTextActive: {
    color: C.black,
    fontWeight: '500',
  },
  selectOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  selectBox: {
    backgroundColor: C.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: SCREEN_HEIGHT * 0.5,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
  },
  selectBoxHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.G200,
  },
  selectBoxTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.black,
  },
  selectBoxClose: {
    fontSize: 18,
    color: C.G600,
    padding: 4,
  },
  selectBoxScroll: {
    paddingHorizontal: 16,
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: C.G100,
  },
  selectOptionActive: {
    backgroundColor: '#fff5f7',
  },
  selectOptionText: {
    fontSize: 14,
    color: C.black,
  },
  selectOptionTextActive: {
    color: C.primary,
    fontWeight: '600',
  },
  dateSubLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: C.G700,
    marginTop: 12,
  },
  dateSubLabelEnd: {
    marginTop: 12,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 4,
  },
  priceInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: C.black,
    backgroundColor: C.white,
  },
  priceTilde: {
    fontSize: 16,
    color: C.G500,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 20,
  },
  bottomBtns: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    borderTopWidth: 1,
    borderTopColor: C.G200,
    backgroundColor: C.white,
  },
  resetBtn: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: C.G100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.G200,
  },
  resetBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.G600,
  },
});
