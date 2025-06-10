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
app.get('/recipe/find',(req,res)=>{
    recipeFind(req,res);
})
// 요청 처리
async function recipeFind(req,res){
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
        const result=await connection.execute(
            `   SELECT no,poster,title,chef,hit,likecount,num 
                FROM (SELECT no,poster,title,chef,hit,likecount,rownum as num  
                FROM (SELECT no,poster,title,chef,hit,likecount 
                FROM recipe WHERE title LIKE :1 ORDER BY no ASC))
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
