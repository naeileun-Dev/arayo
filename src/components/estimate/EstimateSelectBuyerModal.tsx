import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from '../common';
import GearsIcon from '../../assets/icon/gears.svg';
import ChevronDownIcon from '../../assets/icon/chevron-down.svg';

interface QuoteBuyer {
  id: string;
  companyName: string;
  tags: { label: string; color: string }[];
  info: { label: string; value: string }[];
}

const DUMMY_BUYERS: QuoteBuyer[] = [
  {
    id: '1',
    companyName: '아라요 기계장터',
    tags: [
      { label: '가격제안가능', color: '#DB0025' },
      { label: '9분전 대화', color: '#3B82F6' },
    ],
    info: [
      { label: '담당자명', value: '김샘플' },
      { label: '제품 유형', value: '중고' },
      { label: '휴대폰 번호', value: '01012345678' },
      { label: '제품 구분', value: '공작기계' },
      { label: '제품위치', value: '경기 안산' },
      { label: '제조연월', value: '06년 07월' },
      { label: '견적 금액', value: '40,500,000원' },
      { label: '제조사', value: '화천기계' },
    ],
  },
  {
    id: '2',
    companyName: '아라요 기계장터',
    tags: [
      { label: '가격제안가능', color: '#DB0025' },
      { label: '9분전 대화', color: '#3B82F6' },
    ],
    info: [
      { label: '담당자명', value: '김샘플' },
      { label: '제품 유형', value: '중고' },
      { label: '휴대폰 번호', value: '01012345678' },
      { label: '제품 구분', value: '공작기계' },
      { label: '제품위치', value: '경기 안산' },
      { label: '제조연월', value: '06년 07월' },
      { label: '견적 금액', value: '40,500,000원' },
      { label: '제조사', value: '화천기계' },
    ],
  },
  {
    id: '3',
    companyName: '스마트상사',
    tags: [
      { label: '9분전 대화', color: '#3B82F6' },
    ],
    info: [
      { label: '담당자명', value: '김샘플' },
      { label: '제품 유형', value: '중고' },
      { label: '휴대폰 번호', value: '01012345678' },
      { label: '제품 구분', value: '공작기계' },
    ],
  },
];

interface EstimateSelectBuyerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (buyerId: string) => void;
}

export const EstimateSelectBuyerModal: React.FC<EstimateSelectBuyerModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>어느분과 거래 하셨나요 ?</Text>
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.listArea} showsVerticalScrollIndicator={false}>
                {/* Empty option */}
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>나와 거래한 판매자/구매자가 없어요</Text>
                </View>

                {DUMMY_BUYERS.map((buyer) => {
                  const isSelected = selectedId === buyer.id;
                  const isExpanded = expandedIds.has(buyer.id);
                  const visibleInfo = isExpanded ? buyer.info : buyer.info.slice(0, 4);

                  return (
                    <TouchableOpacity
                      key={buyer.id}
                      style={[styles.buyerCard, isSelected && styles.buyerCardSelected]}
                      activeOpacity={0.8}
                      onPress={() => setSelectedId(buyer.id)}
                    >
                      {/* Company header */}
                      <View style={styles.companyRow}>
                        <View style={styles.avatarBox}>
                          <GearsIcon width={28} height={28} color={colors.white} />
                        </View>
                        <View style={styles.companyInfo}>
                          <Text style={styles.companyName}>{buyer.companyName}</Text>
                          <View style={styles.tagRow}>
                            {buyer.tags.map((tag, idx) => (
                              <View key={idx} style={[styles.tag, { backgroundColor: `${tag.color}14` }]}>
                                <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>

                      {/* Info grid */}
                      <View style={styles.infoGrid}>
                        {visibleInfo.map((item, idx) => (
                          <View key={idx} style={styles.infoCell}>
                            <Text style={styles.infoLabel}>{item.label}</Text>
                            <Text style={styles.infoValue}>{item.value}</Text>
                          </View>
                        ))}
                      </View>

                      {buyer.info.length > 4 && (
                        <TouchableOpacity
                          style={styles.expandBtn}
                          activeOpacity={0.7}
                          onPress={() => toggleExpand(buyer.id)}
                        >
                          <Text style={styles.expandText}>더보기</Text>
                          <ChevronDownIcon
                            width={16}
                            height={16}
                            color={colors.textPrimary}
                            style={isExpanded ? { transform: [{ rotate: '180deg' }] } : undefined}
                          />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Button
                title="선택하기"
                onPress={() => selectedId && onSelect(selectedId)}
                disabled={!selectedId}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing['2xl'],
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  listArea: {
    marginBottom: spacing.lg,
  },
  emptyCard: {
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G400,
  },
  buyerCard: {
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  buyerCardSelected: {
    borderColor: colors.primary,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCell: {
    width: '50%',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: colors.G500,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.sm,
    gap: 4,
  },
  expandText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
