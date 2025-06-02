const express = require('express');
const app = express();

const server=app.listen(3355,()=>{
    console.log("Server started on http://localhost:3355");
});

const cors = require('cors');
app.use(cors());

const oracledb=require('oracledb');
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT

app.get('/hotel/find',function (req,res){
    busanHotelFind(req,res);

})
async function busanHotelFind(request,response){
    // 검색에 받기
    let fd=request.query.fd; // request.getParameter("fd")
    let connection
    try
    {
        //오라클 연동
        connection=await oracledb.getConnection({
            user:"hr",
            password:"happy",
            connectionString:"localhost:1521/xe"
        })
        //sql문장을 전송 => 결과값 받기
        const result=await connection.execute(
            `SELECT no,title,poster,address
             FROM seoul_hotel  
             WHERE title LIKE '%'||:title||'%'`,
            [fd]
        );
        console.log(result.rows);
        response.json(result.rows);
    }catch(err){
        console.log(err);
    }
    finally {
        try{
            if(connection){
                await connection.close();
            }
        }catch(err){}
    }

}

//네이버 뉴스


var client_id = 'FB6UFDJ2hnNW83g0sa2o';
var client_secret = 'Agxl1L3HKW';
app.get('/news/list', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});