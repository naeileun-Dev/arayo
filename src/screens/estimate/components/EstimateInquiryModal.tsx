import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { colors } from '../../../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FEATURE_ITEMS = [
  {
    image: require('../../../assets/images/estimate_laptop.png'),
    text: 'PC/모바일로\n간편하게 견적 요청',
  },
  {
    image: require('../../../assets/images/estimate_headset.png'),
    text: '전문 업체\n무료 상담 진행',
  },
  {
    image: require('../../../assets/images/estimate_worker.png'),
    text: '원하는 조건의 제품을\n쉽고 빠르게 구매',
  },
  {
    image: require('../../../assets/images/estimate_engineer.png'),
    text: '필요한 제품의\n비교 견적 확인',
  },
];

const PROCESS_STEPS = [
  { label: '견적 등록', active: false, done: false },
  { label: '검수 후 답변 등록', active: false, done: false },
  { label: '견적 선택', active: true, done: false },
  { label: '의뢰완료', active: false, done: true },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EstimateInquiryModal: React.FC<Props> = ({ visible, onClose, onConfirm }) => {
  const [noShow7Days, setNoShow7Days] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>비교 견적 문의</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.closeX}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.subtitle}>원하시는 조건의 제품을 쉽고 빠르게 찾아 보세요.</Text>

            <View style={styles.featureList}>
              {FEATURE_ITEMS.map((item, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Image source={item.image} style={styles.featureImage} resizeMode="cover" />
                  <Text style={styles.featureText}>{item.text}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.processTitle}>견적 문의 프로세스</Text>
            <View style={styles.processList}>
              {PROCESS_STEPS.map((step, idx) => {
                const isLast = idx === PROCESS_STEPS.length - 1;
                return (
                  <View key={idx} style={styles.processItem}>
                    <View style={styles.processLeft}>
                      <View style={[
                        styles.stepCircle,
                        step.active && styles.stepCircleActive,
                        step.done && styles.stepCircleDone,
                      ]}>
                        {step.done ? (
                          <Text style={styles.stepCheck}>✓</Text>
                        ) : (
                          <Text style={[styles.stepNum, step.active && styles.stepNumActive]}>
                            {idx + 1}
                          </Text>
                        )}
                      </View>
                      {!isLast && (
                        <View style={[
                          styles.stepLine,
                          idx === PROCESS_STEPS.length - 2 && styles.stepLineDotted,
                        ]} />
                      )}
                    </View>
                    <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>
                      {step.label}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.noShowRow}
              onPress={() => setNoShow7Days(v => !v)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, noShow7Days && styles.checkboxChecked]}>
                {noShow7Days && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.noShowText}>7일간 보지 않기</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} activeOpacity={0.7}>
              <Text style={styles.cancelText}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm} activeOpacity={0.8}>
              <Text style={styles.confirmText}>견적 문의 하러가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  closeX: {
    fontSize: 18,
    color: colors.G600,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
    marginTop: 12,
    marginBottom: 20,
  },

  featureList: {
    gap: 14,
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    flexShrink: 0,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    lineHeight: 22,
    flex: 1,
  },

  processTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 20,
  },
  processList: {
    marginBottom: 24,
  },
  processItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    minHeight: 52,
  },
  processLeft: {
    alignItems: 'center',
    width: 36,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9C8CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepCircleDone: {
    backgroundColor: colors.primary,
  },
  stepNum: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
  },
  stepNumActive: {
    color: colors.white,
  },
  stepCheck: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  stepLine: {
    width: 2,
    flex: 1,
    minHeight: 16,
    backgroundColor: '#F4A0AA',
    marginTop: 4,
  },
  stepLineDotted: {
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderLeftColor: '#F4A0AA',
    borderStyle: 'dashed',
    width: 0,
  },
  stepLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.black,
    paddingTop: 8,
    flex: 1,
  },
  stepLabelDone: {
    color: colors.primary,
    fontWeight: '700',
  },

  noShowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: colors.G400,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxMark: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '700',
  },
  noShowText: {
    fontSize: 14,
    color: colors.G600,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.G200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.G600,
  },
  confirmBtn: {
    flex: 2,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
});
