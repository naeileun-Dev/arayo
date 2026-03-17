import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';
import type { RootStackParamList } from '../../types';

export const BusinessUpgradeFormScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BusinessUpgradeForm'>>();
  const { plan } = route.params;

  const [businessId, setBusinessId] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');

  const title = plan === 'gold' ? '골드기업회원 전환' : '일반기업회원 전환';

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <View style={styles.formContainer}>
            <View style={styles.formLi}>
              <View style={styles.labelRow}>
                <Text style={styles.formLabel}>기업회원 아이디</Text>
                <Text style={styles.reqMark}>*</Text>
              </View>

              <View style={styles.idInputRow}>
                <View style={styles.urlPrefix}>
                  <Text style={styles.urlPrefixText}>http://arayo.co.kr/home/</Text>
                </View>
                <TextInput
                  style={styles.idInput}
                  placeholder="5~20자 이내 영문, 숫자만 가능"
                  placeholderTextColor={colors.G500}
                  value={businessId}
                  onChangeText={setBusinessId}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.helpBlock}>*추후 변경 불가능합니다.</Text>
            </View>

            <View style={styles.formLi}>
              <View style={styles.labelRow}>
                <Text style={styles.formLabel}>사업자등록번호</Text>
                <Text style={styles.reqMark}>*</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="사업자등록번호를 입력해 주세요."
                placeholderTextColor={colors.G500}
                value={businessNumber}
                onChangeText={setBusinessNumber}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={styles.formBtnSet}>
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>인증하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    gap: 25,
  },
  formLi: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  reqMark: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
  },
  idInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlPrefix: {
    height: 50,
    backgroundColor: colors.G100,
    borderWidth: 1,
    borderColor: colors.G300,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderRightWidth: 0,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urlPrefixText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.G600,
  },
  idInput: {
    flex: 1,
    height: 50,
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 12,
  },
  helpBlock: {
    fontSize: 13,
    color: colors.G600,
    marginTop: 5,
  },
  input: {
    height: 50,
    fontSize: 13,
    fontWeight: '500',
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.G300,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  formBtnSet: {
    marginTop: 25,
  },
  submitBtn: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
  },
});

