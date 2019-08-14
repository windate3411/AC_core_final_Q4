# 短網址產生器 Url shortener

這是一個簡單的短網址產生器，當使用者輸入網址時會產生對應的短網址
此短網址在伺服器啟動時皆有效

## 專案預覽 Project preview

![image](https://github.com/windate3411/AC_core_final_Q4/blob/master/result.PNG)
![image](https://github.com/windate3411/AC_core_final_Q4/blob/master/result2.PNG)
![image](https://github.com/windate3411/AC_core_final_Q4/blob/master/result3.PNG)

## 專案需求 Prerequisites

為了確保程式順利運作，你需要安裝以下程式 You need to install following software 

+ [Node.js v10.16.0(LTS)](https://nodejs.org/en/)
+ [MongoDB v4.0.10](https://www.mongodb.com/)

## 如何開始 Getting Started
```
# 下載專案 Clone the repository:
git clone https://github.com/windate3411/AC_core_final_Q4.git

# 安裝NPM套件 Install NPM dependencies
npm install

# 執行程式 Start the app
npm run dev

順利執行時會在終端機看到
you are now listening at port 3000
mongodb connect
便可前往http://localhost:3000使用
```

## 給助教的話
為了節省助教的時間，將題目特別要求的程式碼獨立展示

+ 產生短id的程式碼
```
function ranNumbers(min, max) {
  let result = Math.floor(Math.random() * (max - min + 1)) + min
  return result
}

function genShortId(n) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortId = ''

  for (let i = 0; i < n; i++) {
    let index = ranNumbers(0, letters.length - 1)
    shortId += letters[index]
  }
  return shortId
}
```
+ 避免短ID重複的程式碼
```
// create url code
  const urlCode = genShortId(5)
  // check urlCode 這寫法極端的粗糙，但目前只做到這樣防止重複
  try {
    let url = await Url.findOne({ urlCode });
    if (url) {
      res.status(404).send('sorry urlCode seems to repeated,plz try again')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('server error')
  }
```
+ 檢查輸入的是否為正確網址(已加入前端驗證，此為後端驗證的部分)

```
// check longUrl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.render('index', { shortenUrl: url.shortUrl, urlCode: url.urlCode, url })
      } else {
        let shortUrl;
        if (process.env.HEROKU) {
          shortUrl = herokuUrl + '/' + urlCode;
        } else {
          shortUrl = baseUrl + '/' + urlCode;
        }
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
        await url.save();
        res.render('index', { shortenUrl: url.shortUrl, urlCode: url.urlCode, url })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('server error')
    }
  } else {
    res.status(401).json('Invalid long url')
  }
```
+ 在heroku或是本地伺服器執行時會產生不同的短網址

```
let shortUrl;
        if (process.env.HEROKU) {
          shortUrl = herokuUrl + '/' + urlCode;
        } else {
          shortUrl = baseUrl + '/' + urlCode;
        }
```

## 作者 Author

* **Danny Wang** 