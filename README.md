# CGV-Frontend

## Mô Tả Dự Án
Mục Tiêu: Xây dựng một trang web cho phép người dùng dễ dàng tìm kiếm, chọn phim, và đặt vé xem phim tại các rạp CGV.

## Công nghệ sử dụng

* [![React][React.js]][React-url]
* [![React Router][React-Router]][React-Router-url]
* [![Material UI][Material-UI]][Material-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Vite][Vite]][Vite-url]

## Deploy
Link:

## Các Tính Năng Chính
1. Trang Chính:
- ✅ Hiển thị danh sách phim đang chiếu và sắp chiếu.
- ✅ Hiển thị các sự kiện đặc biệt hoặc khuyến mãi.
- ✅ Cung cấp thông tin nhanh về các rạp CGV.
2. Chi Tiết Phim:
- ✅ Hiển thị thông tin chi tiết về phim (tiêu đề, mô tả, thời gian chiếu, đạo diễn, diễn viên, đánh giá).
- ✅ Trailer phim và hình ảnh.
3. Đặt Vé:
- ✅ Chọn rạp, thời gian chiếu và số lượng vé.
- ✅ Chức năng chọn chỗ ngồi.
- ✅ Thanh toán trực tuyến (thẻ tín dụng, ví điện tử).
4. Quản Lý Tài Khoản:
- ✅ Đăng ký và đăng nhập người dùng.
- ✅ Quản lý thông tin cá nhân và lịch sử đặt vé.

## Cài Đặt

1. Clone dự án về máy:

   ```sh
   git clone https://github.com/LeTung4712/CGV-Frontend.git
   cd CGV-Frontend
   ```
2. Cài đặt các phụ thuộc:
    ```sh
    npm install
    ```
    hoặc
    ```sh
    yarn
    ```
3. Chạy ứng dụng 
    ```sh
    npm run dev
    ```
    hoặc

    ```sh
    yarn dev
    ```

4. thêm api url vào .env
    ```js
    VITE_API_URL = 
    ```
## Cấu Trúc Dự Án

Dưới đây là cấu trúc thư mục của dự án:

```
my-react-app/
│
├── public/                   # Thư mục chứa các file tĩnh
│   |
│   └── favicon.ico           # Icon trang web
│
├── src/
│   ├── api/                  # Thư mục chứa cấu hình API
│   │   ├── apiClient.js        # File cấu hình client API
│   │   └── userService.js      # Ví dụ file dịch vụ API cho user                      
│   ├── assets/               # Thư mục chứa tài nguyên tĩnh (hình ảnh, font, v.v.)
│   ├── components/           # Thư mục chứa các component tái sử dụng
│   ├── constants/            # Thư mục chứa các hằng số sử dụng trong ứng dụng
│   │   └── routes.js           # File chứa các định nghĩa endpoint api
│   ├── pages/                # Thư mục chứa các trang (pages) của ứng dụng
│   │   ├── Home/               # Thư mục chứa trang home 
│   │   │   ├── Home.jsx            # Ví dụ trang chính cho người dùng
│   │   │   └── Home.css            # css trang home
│   │   └── Login/              # Thư mục chứa trang login
│   │       ├── Login.jsx           # Ví dụ trang login
│   │       └── Login.css           # css trang login
│   ├── router/               # Thư mục chứa cấu hình router
│   |   ├── AppRoute.jsx        # cấu hình quyền truy cập router
│   │   ├── PrivateRoute.jsx        # điều hứơng router yêu cầu login
│   │   ├── PublicRoute.jsx         # điều hứơng router không yêu cầu login
│   │   └── Routes.jsx          # Định nghĩa các route
│   ├── store/                # Thư mục chứa Redux store (nếu có)
│   │   └── index.js            # File cấu hình store
│   ├── utils/                # Thư mục chứa các hàm tiện ích
│   │   └── index.js            # File chứa các hàm tiện ích
│   ├── App.jsx               # Component gốc của ứng dụng
|   ├── App.css               # css base
|   ├── index.css             # css
│   └── main.jsx              # Entry point của ứng dụng
│
├── index.html                # File HTML chính
├── .env                      # File chứa các biến môi trường
├── .gitignore                # File để chỉ định các file không cần theo dõi trong Git
├── package.json              # File cấu hình gói NPM
├── vite.config.js            # File cấu hình Vite (nếu sử dụng Vite)
└── README.md                 # Tài liệu mô tả dự án

```

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Material-UI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[Material-url]: https://mui.com/
[React-Router]: https://img.shields.io/badge/React-Router-007BFF?style=for-the-badge&logo=react-router&logoColor=white
[React-Router-url]: https://reactrouter.com/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
