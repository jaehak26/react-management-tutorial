//package.json - yarn dev를 입력하면 둘 다 실행이 되게끔 함

//file system을 통해 파일을 읽어옴
const fs = require("fs");
const mysql = require("mysql");

const express= require("express");
//const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//database.json 읽기
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

//connection 객체 생성
//mysql 연결(database.json에 있는 데이터 사용)
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
//db 연결 수행
connection.connect();

//upload
const multer = require('multer');
//업로드 파일 지정
const upload = multer({dest: './upload'})

//api만들기

app.get('/api/customers', 
  (req,res)=>{
    console.log(data);
    connection.query(
      "SELECT * FROM CUSTOMER",
      (err, rows, fields) =>{
        res.send(rows);
      }
    )
  })

  app.use('/image',express.static('./upload'));
// customers경로에 고객 추가 데이터를 전송 시 이를 처리할 수 있도록 함
  app.use('/api/customers', upload.single('image'),
  (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)";
    let image = '/image/'+ req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
      (err,rows,fields) => {
        res.send(rows);
      })
  })

//api만들기 (json 파일형식)
app.get('/api/hello', 
(req,res) => {
    res.send({message: "hello express!"});
});

//json파일 검사기 - jsonlint
//json파일에서는 string을 작은 따옴표를 쓰면 안된다.
app.get('/api/customer', 
(req,res) => {
    res.send( {"customers": [
        {
          "id": 1,
          "image": "https://placeimg.com/64/64/1", 
          "name" : "나동빈",
          "birthday": "961222",
          "gender": "남자",
          "job": "대학생"
        },
        {
          "id": 2,
          "image": "https://placeimg.com/64/64/2", 
          "name" : "홍길동",
          "birthday": "960305",
          "gender": "남자",
          "job": "프로그래머"
        },
        {
          "id": 3,
          "image": "https://placeimg.com/64/64/3", 
          "name" : "이순신",
          "birthday": "921205",
          "gender": "남자",
          "job": "디자이너"
        }
      ]
}
      );
});


app.listen(port, 
    () => console.log(`listening on port ${port}`) );