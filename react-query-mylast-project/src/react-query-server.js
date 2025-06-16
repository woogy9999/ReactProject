const express=require('express');
const app=express();
const cors=require('cors');

app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]

}))

//서버 구동
const server=app.listen(3355,()=>{
    console.log("Server start on port 3355")
})

const oracledb=require('oracledb');

oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT
app.get('/seoul/find',(req,res)=>{
    seoulFind(req,res);
})
// 요청 처리
async function seoulFind(req,res){
    // 검색어 받기
    // String fd=request.getParameter("fd");
    let fd = req.query.fd || "";
    let rowSize=12

    let page = parseInt(req.query.page || "1");
    let start = (page * rowSize) - (rowSize - 1);
    let end = (page * rowSize);

    fd = `%${fd}%`;
    // 오라클 연결
    let connection
    try {
        // getConnection() => 서버연결
        connection=await oracledb.getConnection({
            user:"hr",
            password:"happy",
            connectString:"localhost:1521/xe",

        });
        // SQL문장 전송 => 결과값 받기 => 대문자로 가져와야함
        /*
        SNO         NOT NULL NUMBER
TITLE      NOT NULL VARCHAR2(200)
POSTER     NOT NULL VARCHAR2(300)
MSG        NOT NULL VARCHAR2(4000)
ADDRESS    NOT NULL VARCHAR2(300)
HIT                 NUMBER
LIKECOUNT           NUMBER
REPLYCOUNT          NUMBER
         */
        const result=await connection.execute(
            `   SELECT sno,poster,title,msg,address,likecount,replycount,num 
                FROM (SELECT sno,poster,title,msg,address,likecount,replycount,rownum as num  
                FROM (SELECT sno,poster,title,msg,address,likecount,replycount 
                FROM seoul_nature WHERE title LIKE :1 ORDER BY sno ASC))
                WHERE num BETWEEN :2 AND :3`,

            [fd,start,end]

        )

    console.log(result);
    res.json(result.rows);

    }catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }finally {
        try {
            if(connection) await connection.close();
        }catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}



var client_id = 'FB6UFDJ2hnNW83g0sa2o';
var client_secret = 'Agxl1L3HKW';
app.get('/news/list', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news.json?display=100&query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('error = ' + response.statusCode);
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});
