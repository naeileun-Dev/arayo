import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import StarIcon from '../../assets/icon/star.svg';
import EmptyStarIcon from '../../assets/icon/empty_star.svg';
import CameraPlusIcon from '../../assets/icon/camera-plus.svg';
import TrashIcon from '../../assets/icon/trash.svg';
import XIcon from '../../assets/icon/X.svg';

import { colors as C } from '../../styles/colors';

const USER_IMG = require('../../assets/images/user01.png');
const MODAL_IMG = require('../../assets/images/img02.png');

const BORDER_RADIUS = 4;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─────────────────────────────────────────
// 타입
// ─────────────────────────────────────────
export type ReviewModalType = 'intro' | 'score' | 'write' | 'view' | null;

export interface ReviewModalProps {
  visible: boolean;
  type: ReviewModalType;
  onClose: () => void;
  onChangeType: (type: ReviewModalType) => void;
}

// ─────────────────────────────────────────
// 상수
// ─────────────────────────────────────────
const SCORE_ITEMS = [
  { label: '별로에요', stars: 1 },
  { label: '그저그래요', stars: 2 },
  { label: '괜찮아요', stars: 3 },
  { label: '좋아요', stars: 4 },
  { label: '최고에요', stars: 5 },
];

// ─────────────────────────────────────────
// 내부 버튼 컴포넌트
// ─────────────────────────────────────────
const ModalBtn = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.btnPrimary} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.btnPrimaryText}>{label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────
// 공통 후기 모달
// ─────────────────────────────────────────
const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  type,
  onClose,
  onChangeType,
}) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [reviewImages, setReviewImages] = useState<Asset[]>([]);

  const handlePickImage = () => {
    const remaining = 5 - reviewImages.length;
    if (remaining <= 0) return Alert.alert('알림', '최대 5장까지 등록할 수 있습니다.');
    launchImageLibrary({ mediaType: 'photo', selectionLimit: remaining }, (res) => {
      if (res.didCancel || res.errorCode) return;
      if (res.assets) setReviewImages(prev => [...prev, ...res.assets!].slice(0, 5));
    });
  };

  const removeImage = (index: number) => {
    setReviewImages(reviewImages.filter((_, i) => i !== index));
  };

  if (!visible || !type) return null;

  // ── 후기 소개 (intro) ──
  if (type === 'intro') {
    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>김샘플님이 보낸 후기가 도착했어요</Text>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <XIcon width={20} height={20} color={C.black} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.reviewWriter}>
                <Image source={USER_IMG} style={styles.reviewWriterImg} />
                <Text style={styles.reviewWriterName}>김샘플</Text>
              </View>
              <View style={styles.reviewSampleBoxView}>
                <View style={styles.starRow}>
                  <StarIcon width={18} height={18} color={C.star} />
                  <Text style={styles.starNumber}>4</Text>
                </View>
                <Text style={styles.reviewSampleTextView}>
                  문의 단계부터 응대가 빠르고, 제품 상태와 사양에 대해 상세하게
                  설명해 주셔서 신뢰가 갔습니다.
                </Text>
                <View style={styles.reviewBlurOverlay} />
              </View>
              <View style={styles.reviewInfoBox}>
                <Text style={styles.reviewInfoTitle}>전체 후기가 궁금하다면?</Text>
                <Text style={styles.reviewInfoSub}>
                  <Text style={styles.colorBlue}>5초만에</Text> 후기 작성하고, 받은 후기 확인하기
                </Text>
              </View>
              <View style={styles.modalBtnSet}>
                <ModalBtn label="5초 후기 작성" onPress={() => onChangeType('score')} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // ── 별점 선택 (score) ──
  if (type === 'score') {
    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>김샘플님에게 거래 후기 보내기</Text>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <XIcon width={20} height={20} color={C.black} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* 상품 요약 */}
              <View style={styles.grayBox}>
                <View style={styles.buyItemRow}>
                  <Image source={MODAL_IMG} style={styles.buyItemThumbImg} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalProductLabel}>상품명</Text>
                    <Text style={styles.modalProductTitle} numberOfLines={2}>
                      접촉+비접촉 겸용 래쇼날 CNC 비디오메타 CS-3020H
                    </Text>
                  </View>
                </View>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoDt}>상품금액</Text>
                  <Text style={styles.modalInfoDd}>2,400,000원</Text>
                </View>
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoDt}>거래완료일</Text>
                  <Text style={styles.modalInfoDd}>2025. 04. 21</Text>
                </View>
              </View>

              {/* 별점 선택 */}
              <View style={styles.mt10}>
                {SCORE_ITEMS.map((score) => (
                  <TouchableOpacity
                    key={score.stars}
                    style={[
                      styles.scoreBox,
                      selectedScore === score.stars && styles.scoreBoxChecked,
                    ]}
                    onPress={() => setSelectedScore(score.stars)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.scoreLabel, selectedScore === score.stars && styles.scoreLabelChecked]}>{score.label}</Text>
                    <View style={styles.scoreStarsRow}>
                      {Array.from({ length: 5 }, (_, i) =>
                        i < score.stars ? (
                          <StarIcon key={i} width={22} height={22} />
                        ) : (
                          <EmptyStarIcon key={i} width={22} height={22} />
                        ),
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalBtnSet}>
                <ModalBtn label="후기 작성하기" onPress={() => selectedScore && onChangeType('write')} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // ── 후기 작성 (write) ──
  if (type === 'write') {
    const isPositive = (selectedScore ?? 0) >= 3;
    const positiveOptions = [
      '시간 약속을 잘 지켜요',
      '설비 상태가 설명한 것과 같아요',
      '친절하고 매너가 좋아요',
      '좋은 설비를 저렴하게 판매해요',
    ];
    const negativeOptions = [
      '시간 약속을 안지켜요',
      '채팅 메세지를 읽고도 답이 없어요',
      '원하지않는 가격을 계속 요구해요',
      '약속장소에 나타나지 않았어요',
      '불친절해요',
    ];
    const reviewOptions = isPositive ? positiveOptions : negativeOptions;
    const scoreLabelText = SCORE_ITEMS.find((s) => s.stars === selectedScore)?.label ?? '';

    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => onChangeType('score')}
                style={styles.modalBackBtn}
              >
                <ChevronLeftIcon width={22} height={22} color={C.black} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>김샘플님에게 거래 후기 보내기</Text>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <XIcon width={20} height={20} color={C.black} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={[styles.grayBox, styles.flexRow, styles.flexMiddle]}>
                <Text style={styles.totalScoreLabel}>총 평점</Text>
                <View style={[styles.totalScoreStarsRow, styles.ml10]}>
                  {Array.from({ length: 5 }, (_, i) =>
                    i < (selectedScore ?? 0) ? (
                      <StarIcon key={i} width={25} height={25} />
                    ) : (
                      <EmptyStarIcon key={i} width={25} height={25} />
                    ),
                  )}
                </View>
                <Text style={[styles.mlAuto, styles.colorG400]}>{scoreLabelText}</Text>
              </View>
              <View style={styles.mt20}>
                <Text style={styles.sectionLabel}>별점에 따른 내용</Text>
                <View style={styles.mt10}>
                  {reviewOptions.map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[
                        styles.scoreBox,
                        selectedOpt === opt && styles.scoreBoxChecked,
                      ]}
                      onPress={() => setSelectedOpt(opt)}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.scoreLabel, selectedOpt === opt && styles.scoreLabelChecked]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.mt20}>
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionLabel}>
                    {isPositive ? '따뜻한 거래 경험을 알려주세요!' : '별로였던 경험을 알려주세요!'}
                  </Text>
                  <Text style={styles.sectionCount}>({reviewText.length}/2,000자)</Text>
                </View>
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={5}
                  placeholder="남겨주신 거래 후기는 상대방의 프로필에 공개돼요."
                  placeholderTextColor={C.G400}
                  value={reviewText}
                  onChangeText={setReviewText}
                />
              </View>
              {/* 이미지 섹션 */}
              <View style={styles.mt20}>
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionLabel}>이미지</Text>
                  <Text style={styles.sectionCount}>({reviewImages.length}/5)</Text>
                </View>
                <Text style={styles.imgHelpText}>• 최대 100MB까지 업로드 가능해요.</Text>
                <View style={styles.imgGrid}>
                  <TouchableOpacity
                    style={styles.imgAddBtn}
                    onPress={handlePickImage}
                    activeOpacity={0.7}
                  >
                    <CameraPlusIcon width={28} height={28} color={C.G400} />
                  </TouchableOpacity>
                  {reviewImages.map((img, idx) => (
                    <View key={idx} style={styles.imgThumbWrap}>
                      <Image source={{ uri: img.uri }} style={styles.imgThumb} />
                      <TouchableOpacity
                        style={styles.imgDeleteBtn}
                        onPress={() => removeImage(idx)}
                        activeOpacity={0.7}
                      >
                        <TrashIcon width={14} height={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.modalBtnSet}>
                <ModalBtn label="후기보내기" onPress={onClose} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  // ── 후기 확인 (view) ──
  if (type === 'view') {
    return (
      <Modal visible transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>김샘플님이 보낸 후기가 도착했어요</Text>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <XIcon width={20} height={20} color={C.black} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.reviewWriter}>
                <Image source={USER_IMG} style={styles.reviewWriterImg} />
                <Text style={styles.reviewWriterName}>김샘플</Text>
              </View>
              <View style={styles.reviewSampleBoxView}>
                <View style={styles.starRow}>
                  <StarIcon width={18} height={18} color={C.star} />
                  <Text style={styles.starNumber}>4</Text>
                </View>
                <Text style={styles.reviewSampleTextView}>
                  문의 단계부터 응대가 빠르고, 제품 상태와 사양에 대해 상세하게
                  설명해 주셔서 신뢰가 갔습니다.
                </Text>
                <View style={styles.reviewBlurOverlay} />
              </View>
              <View style={styles.reviewInfoBox}>
                <Text style={styles.reviewInfoTitle}>전체 후기가 궁금하다면?</Text>
                <Text style={styles.reviewInfoSub}>
                  <Text style={styles.colorBlue}>5초만에</Text> 후기 작성하고, 받은 후기 확인하기
                </Text>
              </View>
              <View style={styles.modalBtnSet}>
                <ModalBtn label="5초 후기 작성" onPress={() => onChangeType('score')} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  return null;
};

// ─────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────
const styles = StyleSheet.create({
  // ── 모달 공통 ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  modalBackBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  modalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: C.black,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalBtnSet: {
    marginTop: 30,
    marginBottom: 35,
    flexDirection: 'row',
    gap: 10,
  },

  // ── 버튼 ──
  btnPrimary: {
    height: 44,
    backgroundColor: C.primary,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnPrimaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },

  // ── 후기 관련 ──
  reviewWriter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  reviewWriterImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  reviewWriterName: {
    fontSize: 14,
    fontWeight: '500',
    color: C.black,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: C.star,
    marginLeft: 4,
  },
  reviewSampleBoxView: {
    backgroundColor: C.G100,
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  reviewSampleTextView: {
    fontSize: 13,
    color: C.G600,
    lineHeight: 19,
    letterSpacing: -0.2,
    marginTop: 8,
  },
  reviewBlurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(247,247,247,0.8)',
  },
  reviewInfoBox: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  reviewInfoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: C.black,
    marginBottom: 6,
  },
  reviewInfoSub: {
    fontSize: 14,
    color: C.G600,
    letterSpacing: -0.2,
  },
  colorBlue: {
    color: C.system100,
    fontWeight: '600',
  },

  // ── 상품 요약 ──
  buyItemRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  buyItemThumbImg: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS,
  },
  modalProductLabel: {
    fontSize: 11,
    color: C.G600,
    letterSpacing: -0.2,
  },
  modalProductTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: C.black,
    lineHeight: 17,
    marginTop: 2,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginTop: 4,
  },
  modalInfoDt: {
    fontSize: 12,
    color: C.G600,
  },
  modalInfoDd: {
    fontSize: 13,
    fontWeight: '600',
    color: C.black,
  },

  // ── 별점 선택 박스 ──
  scoreBox: {
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: C.G200,
    borderRadius: BORDER_RADIUS,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  scoreBoxChecked: {
    borderColor: C.primary,
  },
  scoreLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: C.G800,
    marginBottom: 6,
  },
  scoreLabelChecked: {
    color: C.black,
    fontWeight: '800',
  },
  scoreStarsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  totalScoreLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: C.black,
  },
  totalScoreStarsRow: {
    flexDirection: 'row',
    gap: 0,
  },
  sectionLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: C.black,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionCount: {
    fontSize: 13,
    color: C.G400,
  },

  // ── 폼 ──
  textArea: {
    borderWidth: 1,
    borderColor: C.G300,
    borderRadius: BORDER_RADIUS,
    padding: 12,
    fontSize: 14,
    color: C.black,
    textAlignVertical: 'top',
    minHeight: 120,
  },

  // ── 이미지 업로드 ──
  imgHelpText: {
    fontSize: 12,
    color: C.G500,
    marginBottom: 10,
  },
  imgGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imgAddBtn: {
    width: (SCREEN_WIDTH - 40 - 40 - 16) / 3,
    height: (SCREEN_WIDTH - 40 - 40 - 16) / 3,
    borderWidth: 1,
    borderColor: C.G300,
    borderStyle: 'dashed',
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.G100,
  },
  imgThumbWrap: {
    width: (SCREEN_WIDTH - 40 - 40 - 16) / 3,
    height: (SCREEN_WIDTH - 40 - 40 - 16) / 3,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    position: 'relative',
  },
  imgThumb: {
    width: '100%',
    height: '100%',
  },
  imgDeleteBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── 유틸리티 ──
  grayBox: {
    backgroundColor: C.G100,
    padding: 15,
    borderRadius: BORDER_RADIUS,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexMiddle: {
    alignItems: 'center',
  },
  ml10: {
    marginLeft: 10,
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  colorG400: {
    color: C.G400,
  },
});

export default ReviewModal;
