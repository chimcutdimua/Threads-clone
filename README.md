# Thread App Clone

Thread App Clone là một ứng dụng mạng xã hội được xây dựng để mô phỏng các tính năng cơ bản của một nền tảng mạng xã hội. Ứng dụng này cho phép người dùng đăng ký, đăng nhập, đăng bài viết, theo dõi người dùng khác và xem các bài viết từ những người mà họ theo dõi.

## Tính năng

### 1. Đăng ký và Đăng nhập
- Người dùng có thể tạo tài khoản mới bằng cách cung cấp tên, tên người dùng, email và mật khẩu.
- Người dùng có thể đăng nhập vào tài khoản của mình bằng tên người dùng và mật khẩu.

### 2. Đăng bài viết
- Người dùng có thể đăng bài viết mới với nội dung văn bản.
- Bài viết sẽ được lưu trữ trong cơ sở dữ liệu và hiển thị trên trang chủ của người dùng.

### 3. Theo dõi người dùng
- Người dùng có thể theo dõi các người dùng khác để xem bài viết của họ.
- Danh sách những người dùng mà người dùng đang theo dõi sẽ được lưu trữ trong cơ sở dữ liệu.

### 4. Xem bài viết
- Người dùng có thể xem các bài viết từ những người mà họ theo dõi trên trang chủ của mình.
- Bài viết sẽ được sắp xếp theo thứ tự thời gian, với bài viết mới nhất ở trên cùng.

### 5. Đăng xuất
- Người dùng có thể đăng xuất khỏi tài khoản của mình.
- Thông tin người dùng sẽ được xóa khỏi localStorage và trạng thái người dùng sẽ được cập nhật.

## Công nghệ sử dụng

- **Frontend**: React, Chakra UI, Recoil
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Cài đặt và Chạy ứng dụng

### Yêu cầu hệ thống
- Node.js
- MongoDB

### Cài đặt

1. Clone repository:
    ```bash
    git clone https://github.com/yourusername/thread-app-clone.git
    cd thread-app-clone
    ```

2. Cài đặt các gói cần thiết cho backend:
    ```bash
    cd backend
    npm install
    ```

3. Cài đặt các gói cần thiết cho frontend:
    ```bash
    cd ../frontend
    npm install
    ```

### Chạy ứng dụng

1. Chạy backend server:
    ```bash
    cd backend
    npm start
    ```

2. Chạy frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

3. Mở trình duyệt và truy cập `http://localhost:3000` để xem ứng dụng.

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một pull request hoặc mở một issue mới trên GitHub.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
