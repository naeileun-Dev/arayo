import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
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
} from '../estimate/components/FormComponents';
import type { RootStackParamList } from '../../types';

const PADDING_LR = 20;

export const BrandNoticeWriteScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BrandNoticeWrite'>>();
  const mode = route.params?.mode || 'create';
  const brandId = route.params?.brandId || '1';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const isFormValid = () => {
    return title.trim() && content.trim();
  };

  const handleSubmit = () => {
    setShowValidation(true);
    if (isFormValid()) {
      // TODO: Submit notice
      navigation.goBack();
    }
  };

  const pageTitle = mode === 'edit' ? '공지사항 수정' : '공지사항 등록';
  const submitLabel = mode === 'edit' ? '수정하기' : '등록하기';

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader brandId={brandId} showMenu={true} />

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
            <Text style={styles.sectionTitle}>{pageTitle}</Text>
            <Text style={styles.sectionTitleEn}>Notice</Text>
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

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButtonBar
        buttons={[
          { label: '취소', variant: 'gray', onPress: () => navigation.goBack() },
          { label: submitLabel, onPress: handleSubmit },
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
  bottomSpacer: {
    height: 20,
  },
});

