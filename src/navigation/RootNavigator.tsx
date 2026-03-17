import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainTabNavigator';
import { SearchScreen, NotificationScreen, ServiceIntroduceScreen } from '../screens/main';
import { TermsScreen } from '../screens/terms/TermsScreen';
import { PrivacyScreen } from '../screens/terms/PrivacyScreen';
import { FAQScreen } from '../screens/terms/FAQScreen';
import {
  BusinessUpgradeScreen,
  BusinessUpgradeFormScreen,
  BusinessUpgradeFormNormalScreen,
  BusinessUpgradeFormGoldScreen,
  ProfileScreen,
  ProfileEditScreen,
  PasswordResetScreen,
  TradeReviewScreen,
  FavoriteListScreen,
  OrderDetailScreen,
  PurchasListScreen,
} from '../screens/mypage';
import { ProductViewScreen } from '../screens/product/ProductViewScreen';
import { ProductUploadScreen } from '../screens/product/ProductUploadScreen';
import { CategoryListScreen } from '../screens/category/CategoryListScreen';
import { SellListScreen } from '../screens/corporation/SellListScreen';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ChatRoomScreen } from '../screens/chat/ChatRoomScreen';
import { EstimateListScreen } from '../screens/estimate/EstimateListScreen';
import { EstimateDetailScreen } from '../screens/estimate/EstimateDetailScreen';
import { EstimateReplyListScreen } from '../screens/estimate/EstimateReplyListScreen';
import { EstimateWriteScreen } from '../screens/estimate/EstimateWriteScreen';
import { EstimateReplyWriteScreen } from '../screens/estimate/EstimateReplyWriteScreen';
import { ReceivedEstimateScreen } from '../screens/estimate/ReceivedEstimateScreen';
import { ProcessingListScreen } from '../screens/processing/ProcessingListScreen';
import { ProcessingDetailScreen } from '../screens/processing/ProcessingDetailScreen';
import { ProcessingWriteScreen } from '../screens/processing/ProcessingWriteScreen';
import { ProcessingReplyWriteScreen } from '../screens/processing/ProcessingReplyWriteScreen';
import { ScrapListScreen } from '../screens/scrap/ScrapListScreen';
import { ScrapWriteScreen } from '../screens/scrap/ScrapWriteScreen';
import { ScrapDetailScreen } from '../screens/scrap/ScrapDetailScreen';
import { ScrapReplyWriteScreen } from '../screens/scrap/ScrapReplyWriteScreen';
import { OrderWriteScreen } from '../screens/order/OrderWriteScreen';
import { OrderCompleteScreen } from '../screens/order/OrderCompleteScreen';
import { CompareProductsScreen } from '../screens/compare/CompareProductsScreen';
import { NoticeScreen } from '../screens/notice/NoticeScreen';
import { IndustryNewsScreen } from '../screens/news/IndustryNewsScreen';
import { IndustryNewsDetailScreen } from '../screens/news/IndustryNewsDetailScreen';
import { InquiryListScreen } from '../screens/inquiry/InquiryListScreen';
import { InquiryWriteScreen } from '../screens/inquiry/InquiryWriteScreen';
import { BrandHomeScreen } from '../screens/brand/BrandHomeScreen';
import { BrandDetailScreen } from '../screens/brand/BrandDetailScreen';
import { BrandWriteScreen } from '../screens/brand/BrandWriteScreen';
import { BrandAboutScreen } from '../screens/brand/BrandAboutScreen';
import { BrandNoticeScreen } from '../screens/brand/BrandNoticeScreen';
import { BrandNoticeWriteScreen } from '../screens/brand/BrandNoticeWriteScreen';
import { BrandProductsScreen } from '../screens/brand/BrandProductsScreen';
import { BrandContactScreen } from '../screens/brand/BrandContactScreen';
import { BrandProductDetailScreen } from '../screens/brand/BrandProductDetailScreen';
import { DevRouteScreen } from '../screens/dev/DevRouteScreen';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREENS = [
  { name: 'Search', component: SearchScreen },
  { name: 'Notification', component: NotificationScreen },
  { name: 'Terms', component: TermsScreen },
  { name: 'Privacy', component: PrivacyScreen },
  { name: 'BusinessUpgrade', component: BusinessUpgradeScreen },
  { name: 'ProductView', component: ProductViewScreen },
  { name: 'ProductUpload', component: ProductUploadScreen },
  { name: 'CategoryList', component: CategoryListScreen },
  { name: 'FAQ', component: FAQScreen },
  { name: 'PurchaseList', component: PurchasListScreen },
  { name: 'SalesList', component: SellListScreen },
  { name: 'OrderDetail', component: OrderDetailScreen },
  { name: 'OrderWrite', component: OrderWriteScreen },
  { name: 'OrderComplete', component: OrderCompleteScreen },
  { name: 'ChatList', component: ChatListScreen },
  { name: 'ChatRoom', component: ChatRoomScreen },
  { name: 'FavoriteList', component: FavoriteListScreen },
  { name: 'Profile', component: ProfileScreen },
  { name: 'ProfileEdit', component: ProfileEditScreen },
  { name: 'PasswordReset', component: PasswordResetScreen },
  { name: 'TradeReview', component: TradeReviewScreen },
  { name: 'EstimateReplyList', component: EstimateReplyListScreen },
  { name: 'EstimateDetail', component: EstimateDetailScreen },
  { name: 'BusinessUpgradeForm', component: BusinessUpgradeFormScreen },
  { name: 'EstimateList', component: EstimateListScreen },
  { name: 'BusinessUpgradeFormNormal', component: BusinessUpgradeFormNormalScreen },
  { name: 'BusinessUpgradeFormGold', component: BusinessUpgradeFormGoldScreen },
  { name: 'EstimateUpload', component: EstimateWriteScreen },
  { name: 'EstimateReplyWrite', component: EstimateReplyWriteScreen },
  { name: 'ProcessingList', component: ProcessingListScreen },
  { name: 'ProcessingUpload', component: ProcessingWriteScreen },
  { name: 'ProcessingDetail', component: ProcessingDetailScreen },
  { name: 'ProcessingReplyWrite', component: ProcessingReplyWriteScreen },
  { name: 'ScrapList', component: ScrapListScreen },
  { name: 'ScrapUpload', component: ScrapWriteScreen },
  { name: 'ScrapDetail', component: ScrapDetailScreen },
  { name: 'ScrapReplyWrite', component: ScrapReplyWriteScreen },
  { name: 'ReceivedEstimate', component: ReceivedEstimateScreen },
  { name: 'CompareProducts', component: CompareProductsScreen },
  { name: 'Notice', component: NoticeScreen },
  { name: 'IndustryNews', component: IndustryNewsScreen },
  { name: 'IndustryNewsDetail', component: IndustryNewsDetailScreen },
  { name: 'ServiceIntroduce', component: ServiceIntroduceScreen },
  { name: 'InquiryList', component: InquiryListScreen },
  { name: 'InquiryWrite', component: InquiryWriteScreen },
  { name: 'BrandHome', component: BrandHomeScreen },
  { name: 'BrandDetail', component: BrandDetailScreen },
  { name: 'BrandWrite', component: BrandWriteScreen },
  { name: 'BrandAbout', component: BrandAboutScreen },
  { name: 'BrandNotice', component: BrandNoticeScreen },
  { name: 'BrandNoticeWrite', component: BrandNoticeWriteScreen },
  { name: 'BrandProducts', component: BrandProductsScreen },
  { name: 'BrandContact', component: BrandContactScreen },
  { name: 'BrandProductDetail', component: BrandProductDetailScreen },
] as const;

export const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="DevRoute"
    screenOptions={{ headerShown: false, animation: 'fade' }}
  >
    <Stack.Screen name="DevRoute" component={DevRouteScreen} />
    <Stack.Screen name="Auth" component={AuthNavigator} />
    <Stack.Screen name="Main" component={MainNavigator} options={{ gestureEnabled: false }} />
    {SCREENS.map(({ name, component }) => (
      <Stack.Screen key={name} name={name} component={component} />
    ))}
  </Stack.Navigator>
);
