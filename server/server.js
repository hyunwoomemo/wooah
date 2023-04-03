const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const { join, resolve } = require('path');
const cookieParser = require('cookie-parser');
const path = require('path');


const configFileName = process.env.NODE_ENV !== 'production' ? '.env.server.development' : '.env.server.production'
const configPath = join(resolve(), configFileName);

const port = process.env.PORT || 8080;

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (!fs.existsSync(configPath)) {
  try {
    throw new Error();
  } catch (e) {
    console.error("================================================");
    console.error("|          Configuration Init Error            |");
    console.error("================================================");
    console.error("환경설정 파일을 찾을 수 없습니다. 환경설정 파일의 경로를 확인하세요.");
    console.error(`환경설정 파일 경로: ${configPath}`);
    console.error("프로그램을 종료합니다.");
    process.exit(1);
  }
}

dotenv.config({ path: configPath });

const db = mysql.createConnection({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
})


app.post('/join', (req, res) => {
  const groupName = req.body.groupName;
  const userEmail = req.body.userEmail;
  const userBaby = req.body.userBaby;
  const babyBirthday = req.body.babyBirthday;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;

  db.query('INSERT INTO user (group_name, user_email,user_baby,baby_birthday,password,passwordCheck) VALUES (?,?,?,?,?,?)',
    [groupName, userEmail, userBaby, babyBirthday, password, passwordCheck],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    }
  );
})

app.post('/login', (req, res) => {
  let groupName = req.body.groupName;
  let password = req.body.password;

  db.query("select group_name, user_email,user_baby,baby_birthday, parents from user where group_name =? and password =?;", [groupName, password], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  })
})

/** 라우터 (URL 분배기) 객체 설정 --> 맨 마지막에 설정 */
const router = express.Router();
// 라우터를 express에 등록
app.use('/', router);

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(express.static('build'))

app.use(require("./controllers/RecordController"));

app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
})