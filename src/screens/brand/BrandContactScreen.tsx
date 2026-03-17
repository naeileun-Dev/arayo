import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { BrandHeader } from './components/BrandHeader';
import { BottomButtonBar } from '../../components/common';
import {
  FormLabel,
  ValidationMsg,
  Checkbox,
} from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

const PADDING_LR = 20;

export const BrandContactScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandContact'>>();
  const brandId = route.params?.brandId || '1';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeThirdParty, setAgreeThirdParty] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreePrivacy(next);
    setAgreeThirdParty(next);
  };

  const handleTogglePrivacy = () => {
    const next = !agreePrivacy;
    setAgreePrivacy(next);
    setAgreeAll(next && agreeThirdParty);
  };

  const handleToggleThirdParty = () => {
    const next = !agreeThirdParty;
    setAgreeThirdParty(next);
    setAgreeAll(next && agreePrivacy);
  };

  const isFormValid = () => {
    return title.trim() && content.trim() && agreePrivacy && agreeThirdParty;
  };

  const handleSubmit = () => {
    setShowValidation(true);
    if (isFormValid()) {
      // TODO: Submit contact
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} currentPage="contact" />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Section Title */}
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>문의하기</Text>
            <Text style={styles.sectionTitleEn}>Contact us</Text>
          </View>

          {/* Title */}
          <View style={styles.formItem}>
            <View style={styles.formLabelRow}>
              <FormLabel text="제목" required />
              <Text style={styles.charCount}>({title.length}/50자)</Text>
            </View>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={(t) => setTitle(t.slice(0, 50))}
              placeholder="최대 50자 이내로 입력해 주세요."
              placeholderTextColor={colors.G400}
              maxLength={50}
            />
            <ValidationMsg
              message="*제목을 정확하게 입력해 주세요."
              visible={showValidation && !title.trim()}
            />
          </View>

          {/* Content */}
          <View style={styles.formItem}>
            <View style={styles.formLabelRow}>
              <FormLabel text="내용" required />
              <Text style={styles.charCount}>({content.length}/2,000자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={content}
              onChangeText={(t) => setContent(t.slice(0, 2000))}
              placeholder="내용을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
            <ValidationMsg
              message="*내용을 정확하게 입력해 주세요."
              visible={showValidation && !content.trim()}
            />
          </View>

          {/* Agreement Section */}
          <View style={styles.agreementSection}>
            <Checkbox
              checked={agreeAll}
              onPress={handleAgreeAll}
              label="전체 약관 동의"
            />
            <View style={styles.agreeDivider} />

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreePrivacy}
                onPress={handleTogglePrivacy}
                label="개인정보 수집 및 이용 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.agreeRow}>
              <Checkbox
                checked={agreeThirdParty}
                onPress={handleToggleThirdParty}
                label="개인정보 제 3자 제공 동의"
                labelStyle={styles.agreeLabelGray}
                subLabel="(필수)"
                subLabelColor={colors.error}
              />
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.agreeViewBtn}>보기</Text>
              </TouchableOpacity>
            </View>

            {showValidation && (!agreePrivacy || !agreeThirdParty) && (
              <ValidationMsg message="*내용을 정확하게 입력해 주세요." visible />
            )}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '취소', variant: 'gray', onPress: () => navigation.goBack() },
          { label: '등록하기', onPress: handleSubmit },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: PADDING_LR,
    paddingBottom: 20,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  sectionTitleEn: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G400,
  },
  formItem: {
    marginBottom: 25,
  },
  formLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.G400,
  },
  textInput: {
    height: 50,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 150,
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.white,
    textAlignVertical: 'top',
  },
  agreementSection: {
    marginTop: 10,
  },
  agreeDivider: {
    height: 1,
    backgroundColor: colors.G200,
    marginTop: 12,
    marginBottom: 12,
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  agreeLabelGray: {
    color: colors.G600,
    fontSize: 14,
  },
  agreeViewBtn: {
    fontSize: 14,
    color: colors.G600,
    textDecorationLine: 'underline',
  },
  bottomSpacer: {
    height: 20,
  },
});

