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
import { FormLabel, ValidationMsg } from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

export const PurchaseInquiryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [companyName, setCompanyName] = useState('');
  const [contact, setContact] = useState('');
  const [content, setContent] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const isFormValid = () =>
    companyName.trim() && contact.trim() && content.trim();

  const handleSubmit = () => {
    setShowValidation(true);
    if (isFormValid()) {
      // TODO: Submit purchase inquiry
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
        <Text style={styles.headerTitle}>구매 문의</Text>
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
          {/* 업체명 */}
          <View style={styles.formItem}>
            <FormLabel text="업체명" required />
            <TextInput
              style={styles.textInput}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="업체명을 입력해주세요."
              placeholderTextColor={colors.G400}
            />
            <ValidationMsg
              message="*업체명을 입력해 주세요."
              visible={showValidation && !companyName.trim()}
            />
          </View>

          {/* 연락처 */}
          <View style={styles.formItem}>
            <FormLabel text="연락처" required />
            <TextInput
              style={styles.textInput}
              value={contact}
              onChangeText={setContact}
              placeholder="연락처 (예: 010-1234-5678)"
              placeholderTextColor={colors.G400}
              keyboardType="phone-pad"
            />
            <ValidationMsg
              message="*연락처를 입력해 주세요."
              visible={showValidation && !contact.trim()}
            />
          </View>

          {/* 상세내용 */}
          <View style={styles.formItem}>
            <View style={styles.formLabelRow}>
              <FormLabel text="상세내용" required />
              <Text style={styles.charCount}>({content.length}/500자)</Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={content}
              onChangeText={(t) => setContent(t.slice(0, 500))}
              placeholder="상세 내용을 입력해 주세요."
              placeholderTextColor={colors.G400}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
            <ValidationMsg
              message="*내용을 정확하게 입력해 주세요."
              visible={showValidation && !content.trim()}
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '취소', variant: 'gray', onPress: () => navigation.goBack() },
          { label: '구매문의 등록', onPress: handleSubmit },
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
  bottomSpacer: {
    height: 20,
  },
});
