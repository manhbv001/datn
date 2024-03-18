import { HeaderMenuItemProps } from '@/models/common';
import authServices from '@/services/auth.service';

export const HEADER_MENU: HeaderMenuItemProps[] = [
  {
    label: 'Trang chủ',
    path: '/',
    target: null,
  },
  {
    label: 'Việc làm',
    path: '/jobs',
    target: 'jobs',
  },
  {
    label: 'Công ty',
    path: '/companies',
    target: 'companies',
    subItems: [
      {
        label: 'Danh sách công ty',
        path: '/companies',
        target: 'companies',
      },
      {
        label: 'Công ty top đầu',
        path: '/top-companies',
        target: 'top-companies',
      },
    ],
  },
  // {
  //   label: 'Ứng viên',
  //   path: '/applicants',
  //   target: 'applicants',
  //   userType: UserTypes.Recruiter,
  // },
  {
    label: 'Mẫu CV',
    path: '/resumes',
    target: 'resumes',
  },
  {
    label: 'Khám phá',
    path: '/posts',
    target: 'posts',
  },
];

export const ACCOUNT_MENU = [
  {
    label: 'CMS',
    path: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/admin-auth`,
    // path: '/coming-soon',
  },
  {
    label: 'Feedback',
    path: '/feedback',
  },
  {
    label: 'Đăng xuất',
    path: '/sign-in',
    isLgout: true,
    action: authServices.logout,
  },
];

export const ADMIN_MENU = [
  {
    label: 'Đăng xuất',
    path: '/sign-in',
    isLgout: true,
    action: authServices.logout,
  },
];

export const APPLICANT_MENU = [
  {
    label: 'Quản lý hồ sơ',
    path: '/applicant-profile/profile',
  },
  {
    label: 'Quản lý CV',
    path: '/applicant-profile/resumes',
  },
  // {
  //   label: 'Quản lý Cover letters',
  //   path: '/applicant-profile/cover-letters',
  // },
  {
    label: 'Việc làm đã ứng tuyển',
    path: '/applicant-profile/applied-jobs',
  },
  {
    label: 'Việc làm đã lưu',
    path: '/applicant-profile/saved-jobs',
  },
  {
    label: 'Đăng xuất',
    path: '/sign-in',
    isLgout: true,
    action: authServices.logout,
  },
];

export const RECRUITER_MENU = [
  {
    label: 'Trang quản lý',
    path: '/recruiter',
  },
  {
    label: 'Đăng xuất',
    path: '/sign-in',
    isLgout: true,
    action: authServices.logout,
  },
];

export const FOOTER_DATA = {
  contact: {
    email: 'techomieeees@gmail.com',
    phone: '+84 987654321',
  },
  menu: [
    {
      key: 'footer-posts',
      label: 'Bài viết',
      url: '/posts',
    },
    {
      key: 'footer-articles',
      label: 'Tin tức',
      url: '/articles',
    },
    {
      key: 'footer-about',
      label: 'Giới thiệu',
      url: '/about-us',
    },
    {
      key: 'footer-pp',
      label: 'Chính sách & quyền riêng tư',
      url: '/privacy-policy',
    },
  ],
  socialNetworks: [
    {
      key: 'footer-fb',
      imgSrc: '/icons/facebook.png',
      alt: 'Follow Techomies trên Facebook',
      url: 'https://www.facebook.com/techomies',
    },
    {
      key: 'footer-threads',
      imgSrc: '/icons/threads.png',
      alt: 'Follow Techomies trên Threads',
      url: 'https://www.threads.net/techomies',
    },
    {
      key: 'footer-youtube',
      imgSrc: '/icons/youtube.png',
      alt: 'Subcribe Techomies trên Youtube',
      url: 'https://www.youtube.com/channel/UCob4JFtST3QJnpGeU_gUU8Q',
    },
    {
      key: 'footer-tiktok',
      imgSrc: '/icons/tiktok.png',
      alt: 'Follow Techomies trên TikTok',
      url: 'https://www.tiktok.com/@techomies',
    },
  ],
};
