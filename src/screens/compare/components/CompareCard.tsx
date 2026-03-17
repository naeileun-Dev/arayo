import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../styles/colors';
import ChevronDownIcon from '../../../assets/icon/chevron-down.svg';
import MainLogo from '../../../assets/images/main_logo.svg';
import { QuoteStateBadge } from '../../estimate/components/QuoteStateBadge';
import { QuoteField, QuotePriceField } from '../../estimate/components/QuoteField';
import { QuoteServiceGrid } from '../../estimate/components/QuoteServiceGrid';
import { ServiceItem } from '../../estimate/components/quoteTypes';

const productImage = require('../../../assets/images/img01.png');
const COLLAPSED_HEIGHT = 420;

const FadeOverlay: React.FC = () => (
  <View style={styles.fadeWrap} pointerEvents="none">
    {[0, 0.15, 0.35, 0.6, 0.82, 1].map((op, i) => (
      <View key={i} style={[styles.fadeStep, { opacity: op }]} />
    ))}
  </View>
);

export interface CompareItem {
  id: string;
  companyName: string;
  companyLogo?: string;
  state: 'used' | 'new' | 'hold' | 'sold';
  contactName: string;
  phone: string;
  price: string;
  priceTag?: string;
  manufacturer: string;
  modelName: string;
  manufactureDate?: string;
  location?: string;
  warrantyPeriod?: string;
  services?: ServiceItem[];
}

interface Props {
  item: CompareItem;
  expanded: boolean;
  onExpand: () => void;
  contactOpen?: boolean;
  onToggleContact?: () => void;
  onChat?: () => void;
  onCall?: () => void;
  onMessage?: () => void;
}

export const CompareCard: React.FC<Props> = ({
  item,
  expanded,
  onExpand,
  contactOpen = false,
  onToggleContact,
  onChat,
  onCall,
  onMessage,
}) => (
  <View style={styles.card}>
    {/* 회사 정보 헤더 */}
    <View style={styles.cardHead}>
      <View style={styles.companyLogoWrap}>
        <MainLogo width={20} height={20} />
      </View>
      <Text style={styles.companyName}>{item.companyName}</Text>
    </View>

    {/* 콘텐츠 영역 */}
    <View style={styles.cardBody}>
      <View
        style={
          expanded ? undefined : { maxHeight: COLLAPSED_HEIGHT, overflow: 'hidden' }
        }
      >
        {/* 상품 이미지 + 뱃지 */}
        <View style={styles.thumbWrap}>
          <QuoteStateBadge state={item.state} />
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={productImage} style={styles.thumbImg} />
          </TouchableOpacity>
        </View>

        {/* 기본 정보 */}
        <QuoteField label="담당자명" value={item.contactName} isFirst />
        <QuoteField label="휴대폰번호" value={item.phone} />
        <QuotePriceField label="판매 금액" price={item.price} tag={item.priceTag} />

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 상세 정보 */}
        <QuoteField label="제조사" value={item.manufacturer} isFirst />
        <QuoteField label="모델명" value={item.modelName} />
        {item.manufactureDate && (
          <QuoteField label="제조연월" value={item.manufactureDate} />
        )}
        {item.location && (
          <QuoteField label="제품위치" value={item.location} />
        )}
        {item.warrantyPeriod && (
          <QuoteField label="보증기간" value={item.warrantyPeriod} />
        )}

        {/* 서비스 */}
        {item.services && item.services.length > 0 && (
          <QuoteServiceGrid services={item.services} />
        )}
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
  </View>
);

const styles = StyleSheet.create({
  card: {},
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.G200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    gap: 8,
  },
  companyLogoWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  cardBody: {
    backgroundColor: colors.G100,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
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

