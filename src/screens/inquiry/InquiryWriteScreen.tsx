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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import ChevronLeftIcon from '../../assets/icon/chevron-left.svg';
import { BottomButtonBar } from '../../components/common';
import {
  FormLabel,
  ValidationMsg,
  Checkbox,
  AgreementSection,
} from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

export const InquiryWriteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      // TODO: Submit inquiry
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width={24} height={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1:1 문의</Text>
        <View style={styles.iconButton} />
      </View>

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
          {/* 제목 */}
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

          {/* 내용 */}
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

          {/* 약관 동의 */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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

