//https://www.kobis.or.kr/kobis/business/main/main.do
//searchMainDailyBoxOffice.do
//searchMainRealTicket.do
//searchMainDailySeatTicket.do
const express = require('express');
const request = require('request');
const app = express();
const port = 3355;

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//서버 대기중
app.listen(port, () => {
    console.log("Server started", "http://localhost:3355");
})

// app.get("경로명",(req.res)=>{})
app.get('/movie/home', (req, res) => {
    let no = req.query.no;
    //console.log("요청 ", no);
    no=parseInt(no);
    // string no=request.getParameter("no")
    //res.send('영화 서버가 실행 중입니다.');
    let site = "";
    if (no === 1)
        site = "searchMainDailyBoxOffice.do";
    else if (no === 2)
        site = "searchMainRealTicket.do";
    else if (no === 3)
        site = "searchMainDailySeatTicket.do";
    else
        console.log(site);

    let url="http://www.kobis.or.kr/kobis/business/main/"+site;
    request({ url: url }, function (error, response, json) {
        //console.log(json);
        res.send(json);
    });
});

