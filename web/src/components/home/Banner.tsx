'use client';
import { FC } from 'react';
import 'swiper/css';

export interface IHomeBannerProps {}
const HomeBanner: FC<IHomeBannerProps> = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/736x/9e/93/92/9e93924bd189e8e876a021a058d77a16.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-5xl font-bold mb-2 text-yellow-400">
              Công nghệ AI - đón đầu xu hướng tìm việc mới
            </h1>
            <h2 className="text-5xl font-bold mb-4">
              Việc làm hấp dẫn dành cho bạn
            </h2>
          </div>

          {/* <form className="mt-4 bg-white bg-opacity-30 rounded-full p-4 flex items-center space-x-4 text-sm">
            <input
              type="text"
              placeholder="Tìm kiếm công việc"
              className="p-3 rounded-full border focus:outline-none focus:border-blue-500 flex-grow"
            />

            <div className="flex items-center">
              <label className="text-white">Ngành nghề:</label>
              <select className="w-[200px] text-[var(--text-gray-color)] ml-2 p-3 border rounded-full focus:outline-none focus:border-blue-500">
                <option selected disabled>
                  Lựa chọn ngành nghề
                </option>
                <option value="it">Công nghệ thông tin</option>
                <option value="finance">Tài chính</option>
                <option value="marketing">Marketing</option>
                <option value="healthcare">Chăm sóc sức khỏe</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="text-white">Lựa chọn nơi làm việc</label>
              <select
                placeholder="Chọn vị trí làm việc"
                className="w-[200px] text-[var(--text-gray-color)] ml-2 p-3 border rounded-full focus:outline-none focus:border-blue-500"
              >
                <option selected disabled>
                  Nơi làm việc:
                </option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP.Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Tìm kiếm
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
