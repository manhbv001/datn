'use client';
import Image from 'next/image';

const OAuthBtns = () => {
  const loginWithGoogle = () => {
    window.location.replace(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login/google`,
    );
  };

  return (
    <div className="flex justify-between gap-x-2">
      <button
        onClick={loginWithGoogle}
        className="inline-flex items-center gap-x-2 text-sm hover:text-[var(--active-color)] transition-all"
      >
        <Image src="/icons/google.png" width={28} height={28} alt="google" />
        Đăng nhập với Google
      </button>
      <button
        onClick={loginWithGoogle}
        className="inline-flex items-center gap-x-2 text-sm hover:text-[var(--active-color)] transition-all"
      >
        <Image
          src="/icons/facebook.png"
          width={28}
          height={28}
          alt="facebook"
        />
        Đăng nhập với Facebook
      </button>
    </div>
  );
};

export default OAuthBtns;
