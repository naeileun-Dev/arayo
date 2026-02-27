import SalesIcon from '../../assets/icon/mypage/sales.svg';
import OrdersIcon from '../../assets/icon/mypage/orders.svg';
import WishlistIcon from '../../assets/icon/mypage/wishlist.svg';
import ChatsIcon from '../../assets/icon/mypage/chats.svg';
import ReviewsIcon from '../../assets/icon/mypage/reviews.svg';
import BrandhomeIcon from '../../assets/icon/mypage/brandhome.svg';
import ManagebrandIcon from '../../assets/icon/mypage/managebrand.svg';
import EstimatesIcon from '../../assets/icon/mypage/estimates.svg';
import OemhomeIcon from '../../assets/icon/mypage/oemhome.svg';
import ManageoemIcon from '../../assets/icon/mypage/manageoem.svg';
import OemrepliesIcon from '../../assets/icon/mypage/oemreplies.svg';
import ScrapmgtIcon from '../../assets/icon/mypage/scrapmgt.svg';
import InquiryIcon from '../../assets/icon/mypage/inquiry.svg';
import NoticeIcon from '../../assets/icon/mypage/notice.svg';
import FaqIcon from '../../assets/icon/mypage/faq.svg';
import MyinfoIcon from '../../assets/icon/mypage/myinfo.svg';

export const MENU_ICONS: Record<string, React.FC<any>> = {
  '판매내역': SalesIcon,
  '구매내역': OrdersIcon,
  '관심목록': WishlistIcon,
  '채팅내역': ChatsIcon,
  '거래후기': ReviewsIcon,
  '내 브랜드관 기업 홈': BrandhomeIcon,
  '브랜드관 업체 등록/수정': ManagebrandIcon,
  '견적답변 내역': EstimatesIcon,
  '내 임가공 기업 홈': OemhomeIcon,
  '임가공 업체 등록/수정': ManageoemIcon,
  '임가공 답변 내역': OemrepliesIcon,
  '고철처리 의뢰 내역': ScrapmgtIcon,
  '1:1 문의': InquiryIcon,
  '공지사항': NoticeIcon,
  '자주 묻는 질문': FaqIcon,
  '내 정보 확인/수정': MyinfoIcon,
};

export const MENU_SECTIONS = [
  {
    label: 'MY 거래',
    items: ['판매내역', '구매내역', '관심목록', '채팅내역', '거래후기'],
  },
  {
    label: 'MY 견적',
    items: ['내 브랜드관 기업 홈', '브랜드관 업체 등록/수정', '견적답변 내역'],
  },
  {
    label: 'MY 임가공',
    items: ['내 임가공 기업 홈', '임가공 업체 등록/수정', '임가공 답변 내역'],
  },
  {
    label: 'MY 고철처리',
    items: ['고철처리 의뢰 내역'],
  },
  {
    label: 'MY 활동',
    items: ['1:1 문의', '공지사항', '자주 묻는 질문'],
  },
  {
    label: 'MY 정보',
    items: ['내 정보 확인/수정'],
  },
];

export const USER_INFO = {
  name: '홍길동',
  email: 'honggildong@gmail.com',
  memberClass: '일반회원',
};
