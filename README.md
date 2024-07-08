# NGUYEN VU TRONG TUAN
# DATN_Thiet ke website dat lich kham benh truc tuyen
# Hướng dẫn cài đặt và chạy hệ thống

## Yêu cầu hệ thống

- Node.js v14.17.6 
- XAMPP hoặc bất kỳ server MySQL nào khác
- Trình duyệt web hiện đại (được khuyến nghị: Microsoft Edge, Google Chrome, Mozilla Firefox)

**Cấu hình cơ sở dữ liệu**

- Khởi động XAMPP và bật MySQL.
- Mở trình duyệt và truy cập vào http://localhost/phpmyadmin.
- Tạo cơ sở dữ liệu mới với tên `<tên_cơ_sở_dữ_liệu>`.

**Cài đặt backend**
- Cài đặt các dependencies: npm install

**Cài đặt frontend**
- Cài đặt các dependencies: npm install

**Cấu hình biến môi trường**
Chỉnh sửa các thông số cấu hình trong tệp `.env` để phù hợp với cài đặt cơ sở dữ liệu MySQL.
 
**Chạy ứng dụng**

- Khởi động backend: npm start
 
- Khởi động frontend: npm start

**Truy cập ứng dụng**
Mở trình duyệt và truy cập vào http://localhost:3000

## Các lưu ý
Đảm bảo rằng MySQL đã được cài đặt và đang chạy trước khi khởi động backend.
Để xác thực OAuth của Google, cần cấu hình OAuth trong tài khoản phát triển Google Cloud Console và cung cấp các thông tin cần thiết trong tệp `.env`.