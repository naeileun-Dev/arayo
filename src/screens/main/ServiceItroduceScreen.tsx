import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../styles/colors';
import { Header } from '../../components/common';

const PADDING_LR = 20;

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────
interface GalleryItem {
    id: number;
    subject: string;
    description: string;
    image: any;
}

// ─────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────
const GALLERY_DATA: GalleryItem[] = [
    {
        id: 1,
        subject: '검증된 판매자',
        description:
            '사업자 인증과 거래 이력을 기반으로 검증된 판매자만 등록됩니다. 허위 매물 걱정 없이 안심하고 거래할 수 있습니다.',
        image: require('../../assets/images/service_introduce_1.png'),
    },
    {
        id: 2,
        subject: '전문가 상담 및 1:1 매칭 지원',
        description:
            '장비 선택이 고민될 땐 아라요 기계장터 전문 상담사에게 문의하세요. 관심 매물은 판매자와 1:1 채팅으로 상세 정보와 견적을 즉시 확인할 수 있습니다.',
        image: require('../../assets/images/service_introduce_2.png'),
    },
    {
        id: 3,
        subject: '검증된 판매자',
        description:
            '판매자가 직접 등록한 실거래가를 한눈에 비교할 수 있습니다. 다양한 조건의 매물을 살펴보고, 원하는 가격으로 판매자와 직접 협의하세요.',
        image: require('../../assets/images/service_introduce_3.png'),
    },
];

// ─────────────────────────────────────────────────
// Sub Components
// ─────────────────────────────────────────────────

/** 갤러리 아이템 */
const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
    <View style={styles.gallCard}>
        <Image source={item.image} style={styles.gallImage} resizeMode="cover" />
        <View style={styles.gallCon}>
            <Text style={styles.gallSubject}>{item.subject}</Text>
            <Text style={styles.gallDesc}>{item.description}</Text>
        </View>
    </View>
);

// ─────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────
export const ServiceIntroduceScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

            <Header title="서비스 소개" onBack={() => navigation.goBack()} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <LinearGradient
                    colors={['#590A0A', colors.secondary]}
                    style={styles.gradientBg}
                >
                    <Image
                        source={require('../../assets/images/Gear_Icons.png')}
                        style={styles.gearIconsBg}
                        resizeMode="contain"
                    />
                    <View style={styles.inner}>
                        <Text style={styles.subTitle}>
                            중고기계 물품 거래의 새로운 기준
                        </Text>

                        <Image
                            source={require('../../assets/images/service_introduce_text.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />

                        <Image
                            source={require('../../assets/images/service_introduce_backgroud.png')}
                            style={styles.introBackground}
                            resizeMode="contain"
                        />

                        <Text style={styles.descText}>
                            {'믿을 수 있는 중고 기계 장비를\n빠르고 손쉽게 찾아보세요'}
                        </Text>

                        <View style={styles.gallList}>
                            {GALLERY_DATA.map((item) => (
                                <GalleryCard key={item.id} item={item} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.bottomCta}>
                        <Text style={styles.ctaSubText}>
                            No.1 중고거래 플랫폼 아라요 기계장터에서
                        </Text>
                        <Text style={styles.ctaMainText}>지금 바로 시작하세요!</Text>
                        <TouchableOpacity
                            style={styles.ctaButton}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Main')}
                        >
                            <Text style={styles.ctaButtonText}>중고거래 구경하기</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

// ─────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────
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

    gradientBg: {
        flex: 1,
    },
    gearIconsBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    logoImage: {
        marginTop: -30,
        height: 150,
        marginBottom: -100,
    },
    introBackground: {
        width: '100%',
    },

    inner: {
        paddingTop: 60,
        alignItems: 'center',
        paddingHorizontal: PADDING_LR,
    },

    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFEDED',
        textAlign: 'center',
    },


    descText: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.white,
        textAlign: 'center',
        lineHeight: 31,
    },

    gallList: {
        marginTop: 60,
        width: '100%',
        gap: 15,
    },

    gallCard: {
        borderRadius: 6,
        overflow: 'hidden',
    },

    gallImage: {
        width: '100%',
        aspectRatio: 335 / 200,
    },

    gallCon: {
        backgroundColor: colors.overlay,
        padding: 20,
        gap: 10,
    },
    gallSubject: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
        textAlign: 'left',
    },
    gallDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.white,
        lineHeight: 21,
        textAlign: 'left',
    },

    bottomCta: {
        marginTop: 80,
        backgroundColor: colors.primary,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: PADDING_LR,
        alignItems: 'center',
    },
    ctaSubText: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.white,
        textAlign: 'center',
    },
    ctaMainText: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.white,
        textAlign: 'center',
        marginTop: 5,
    },

    ctaButton: {
        marginTop: 25,
        width: '100%',
        height: 50,
        borderRadius: 4,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
    },
});

