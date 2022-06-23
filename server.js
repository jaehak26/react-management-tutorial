//package.json - yarn dev를 입력하면 둘 다 실행이 되게끔 함

const express= require("express");
//const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//api만들기 (json 파일형식)
app.get('/api/hello', 
(req,res) => {
    res.send({message: "hello express!"});
});

//json파일 검사기 - jsonlint
//json파일에서는 string을 작은 따옴표를 쓰면 안된다.
app.get('/api/customers', 
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