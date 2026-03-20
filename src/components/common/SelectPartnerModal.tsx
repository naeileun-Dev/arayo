import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';
import { Button } from './Button';

const userAvatar = require('../../assets/images/user01.png');

export interface PartnerOption {
  id: string;
  name: string;
  tags?: { label: string; color: string }[];
}

interface SelectPartnerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (partnerId: string) => void;
  partners?: PartnerOption[];
}

const DEFAULT_PARTNERS: PartnerOption[] = [
  {
    id: '1',
    name: '김샘플',
    tags: [
      { label: '가격제안가능', color: '#22C55E' },
      { label: '9분전 대화', color: '#3B82F6' },
    ],
  },
  {
    id: '2',
    name: '홍길동',
    tags: [{ label: '9분전 대화', color: '#3B82F6' }],
  },
];

export const SelectPartnerModal: React.FC<SelectPartnerModalProps> = ({
  visible,
  onClose,
  onSelect,
  partners = DEFAULT_PARTNERS,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedId(null);
    onClose();
  };

  const handleSelect = () => {
    if (selectedId) {
      onSelect(selectedId);
      setSelectedId(null);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>어느분과 거래 하셨나요 ?</Text>
                <TouchableOpacity
                  onPress={handleClose}
                  activeOpacity={0.7}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.listArea} showsVerticalScrollIndicator={false}>
                {/* "없어요" 옵션 — 선택 가능 */}
                <TouchableOpacity
                  style={[styles.emptyCard, selectedId === 'none' && styles.cardSelected]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedId('none')}
                >
                  <Text style={styles.emptyText}>나와 거래한 판매자/구매자가 없어요</Text>
                </TouchableOpacity>

                {/* 파트너 목록 */}
                {partners.map((partner) => {
                  const isSelected = selectedId === partner.id;
                  return (
                    <TouchableOpacity
                      key={partner.id}
                      style={[styles.partnerCard, isSelected && styles.cardSelected]}
                      activeOpacity={0.7}
                      onPress={() => setSelectedId(partner.id)}
                    >
                      <Image source={userAvatar} style={styles.avatar} />
                      <View style={styles.partnerInfo}>
                        <Text style={styles.partnerName}>{partner.name}</Text>
                        {partner.tags && partner.tags.length > 0 && (
                          <View style={styles.tagRow}>
                            {partner.tags.map((tag, idx) => (
                              <View key={idx} style={[styles.tag, { backgroundColor: `${tag.color}14` }]}>
                                <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Button
                title="선택하기"
                onPress={handleSelect}
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
    maxHeight: '80%',
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
    maxHeight: 350,
    marginBottom: spacing.xl,
  },
  emptyCard: {
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    color: '#7E7E7E',
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.G200,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
  },
});
