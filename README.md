# faker-twitter

![image](https://user-images.githubusercontent.com/34929382/229097034-a3c634b0-3512-40c0-8bac-f5510ec27a54.png)

簡單的仿 twitter 社交平台

功能

- 登入系統
- 推文系統(可回覆推文)
- 通知系統(有人按讚或追蹤時)
- 多國語系(中英切換)
- DarkMode

使用的技術

- [Next.js](https://github.com/vercel/next.js) - 建構框架
- [next-auth](https://github.com/nextauthjs/next-auth) - 登入驗證
- [next-i18next](https://github.com/i18next/next-i18next) - 多國語系
- [next-themes](https://github.com/pacocoursey/next-themes) - 切換 DarkMode
- [prisma](https://github.com/prisma/prisma) - 與資料庫界接
- [swr](https://github.com/vercel/swr) - API 緩存
- [axios](https://github.com/axios/axios) - API 工具
- [Formik](https://github.com/jaredpalmer/formik)、[yup](https://github.com/jquense/yup) - 表單驗證
- [zustand](https://github.com/pmndrs/zustand) - modal 狀態控制
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss) - CSS
- [imgur](https://apidocs.imgur.com/) - 圖片上傳空間

其他

- 該專案使用 prisma 串接 mongoDB Atlas，如需更換 DB 需注意 schema 是否有不支援的 fuction
- 使用 imgur 作為圖片空間

## 事前準備

1. 至[MongoDb Atlas](https://www.mongodb.com/cloud)註冊並建立一個資料庫，取得該資料庫的連線資訊

   > 該專案使用 prisma 串接 mongoDB Atlas，如需更換 DB 種類需注意 schema 是否有不支援的 fuction

2. 申請[Imgur API](https://apidocs.imgur.com/)，並且取得`Client ID`、`Album ID`、`Access token`，詳細可以參考[超完整 Express Imgur 套件上傳教學](https://israynotarray.com/nodejs/20220517/432259079/)

## 使用

1. 新增環境變數

新增檔案 `.env` or `.env.local`

```bash
## 增加連線字串
DATABASE_URL=${your db connection string}

## next-auth加密資訊(內容可以隨便自訂)
NEXT_AUTH_JWT_SECRET="NEXT_AUTH_JWT_SECRET"
NEXT_AUTH_SECRET="NEXT_AUTH_SECRET"

## Imgur相關資訊
## api url
NEXT_IMGUR_API_URL='https://api.imgur.com/3/image'
## Album ID
NEXT_IMGUR_CLIENT_ID="8e54b0d6c3b6937"
## Access token
NEXT_IMGUR_ACCESS_TOKEN="de1fadc6c3c01a85bd23b88cc9c74ac27d22c599"
## 相簿 ID
NEXT_IMGUR_ALBUM_ID="n7yRQ6g"
```

2. 啟動

```bash
## 安裝依賴
npm install
## 初始化prisma服務
npx prisma generate
## 啟動
npm run dev
```
