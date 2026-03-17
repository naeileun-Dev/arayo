import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import { QuoteStateBadge } from './QuoteStateBadge';
import { QuoteField, QuotePriceField } from './QuoteField';
import { QuoteServiceGrid } from './QuoteServiceGrid';
import { QuoteItem } from './quoteTypes';

const productImage = require('../../../assets/images/img01.png');
const COLLAPSED_HEIGHT = 420;

const FadeOverlay: React.FC = () => (
  <View style={styles.fadeWrap} pointerEvents="none">
    {[0, 0.15, 0.35, 0.6, 0.82, 1].map((op, i) => (
      <View key={i} style={[styles.fadeStep, { opacity: op }]} />
    ))}
  </View>
);

type QuoteVariant = 'estimate' | 'processing' | 'scrap';

interface Props {
  item: QuoteItem;
  expanded: boolean;
  onExpand: () => void;
  variant?: QuoteVariant;
  hideAction?: boolean;
  contactOpen?: boolean;
  onToggleContact?: () => void;
  onChat?: () => void;
  onCall?: () => void;
  onMessage?: () => void;
}

export const QuoteCard: React.FC<Props> = ({
  item,
  expanded,
  onExpand,
  variant = 'estimate',
  hideAction = false,
  contactOpen = false,
  onToggleContact,
  onChat,
  onCall,
  onMessage,
}) => {
  const showImage = variant === 'estimate';
  const showDetailInfo = variant === 'estimate';
  const showServices = variant !== 'scrap';
  const showTitle = variant === 'estimate';

  return (
  <View style={styles.card}>
    {showTitle && (
      <View style={styles.cardHead}>
        <Text style={styles.cardHeadText}>{item.title}</Text>
      </View>
    )}

    <View style={[styles.cardBody, !showTitle && styles.cardBodyNoTitle]}>
      <View
        style={
          expanded ? undefined : { maxHeight: COLLAPSED_HEIGHT, overflow: 'hidden' }
        }
      >
        {showImage && (
          <View style={styles.thumbWrap}>
            <QuoteStateBadge state={item.state} />
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={productImage} style={styles.thumbImg} />
            </TouchableOpacity>
          </View>
        )}

        <QuoteField label="담당자명" value={item.contactName} isFirst />
        <QuoteField label="휴대폰번호" value={item.phone} />
        <QuotePriceField label={item.priceLabel} price={item.price} tag={item.priceTag} />

        {showDetailInfo && (
          <>
            <View style={styles.divider} />
            <QuoteField label="제조사" value={item.manufacturer} isFirst />
            <QuoteField label="모델명" value={item.modelName} />
            <QuoteField label="제조연월" value={item.manufactureDate} />
            <QuoteField label="제품위치" value={item.location} />
            <QuoteField label="보증기간" value={item.warrantyPeriod} />
            <QuoteField label="설비 구분" value={item.equipmentType} />
          </>
        )}

        <View style={styles.divider} />
        <QuoteField label="상세 설명" value={item.description} multiline />

        {showServices && <QuoteServiceGrid services={item.services} />}
      </View>

      {/* 더보기 오버레이 */}
      {!expanded && (
        <View style={styles.expandWrap}>
          <FadeOverlay />
          <TouchableOpacity style={styles.expandBtn} onPress={onExpand} activeOpacity={0.7}>
            <Text style={styles.expandBtnLabel}>더보기</Text>
            <ChevronDownIcon width={14} height={14} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
    </View>

    {/* 연락하기 버튼 */}
    {!hideAction && (
      <View style={styles.actionWrap}>
        {contactOpen && (
          <View style={styles.actionHidden}>
            <TouchableOpacity style={styles.actionHiddenBtn} onPress={onChat} activeOpacity={0.6}>
              <Text style={styles.actionHiddenBtnText}>채팅하기</Text>
            </TouchableOpacity>
            <View style={styles.actionHiddenLine} />
            <TouchableOpacity style={styles.actionHiddenBtn} onPress={onCall} activeOpacity={0.6}>
              <Text style={styles.actionHiddenBtnText}>전화하기</Text>
            </TouchableOpacity>
            <View style={styles.actionHiddenLine} />
            <TouchableOpacity style={styles.actionHiddenBtn} onPress={onMessage} activeOpacity={0.6}>
              <Text style={styles.actionHiddenBtnText}>문자하기</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.actionMain} onPress={onToggleContact} activeOpacity={0.8}>
          <Text style={styles.actionMainText}>연락하기</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  card: {},
  cardHead: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: colors.G900,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
  },
  cardHeadText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  cardBody: {
    backgroundColor: colors.G100,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBodyNoTitle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  thumbWrap: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  thumbImg: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: colors.G300,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginVertical: 15,
  },
  expandWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  fadeWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fadeStep: { flex: 1, backgroundColor: colors.G100 },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  expandBtnLabel: { fontSize: 14, color: colors.black, marginRight: 4 },
  actionWrap: { position: 'relative', marginTop: 15 },
  actionHidden: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    zIndex: 3,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  actionHiddenBtn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  actionHiddenBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  actionHiddenLine: { height: 1, backgroundColor: colors.G200 },
  actionMain: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  actionMainText: { fontSize: 14, fontWeight: '500', color: colors.white },
});

