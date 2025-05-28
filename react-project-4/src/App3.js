import { useState, useEffect } from "react";
import axios from "axios";

const App3 = () => {
    const [movie, setMovie] = useState([]);
    const [no, setNo] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:3355/movie/home", {
            params: {
                no: no,
            },
        }).then((res) => {
            setMovie(res.data); // 데이터 구조에 따라 조정 필요
        });
    }, [no]);

    return (
        <div className="container">
            <div className="row">
                <table className="table">
                    <tbody>
                    <tr>
                        <td>
                            <button className="btn btn-primary" onClick={() => setNo(1)}>일일 박스오피스</button>
                            <button className="btn btn-danger" onClick={() => setNo(2)}>실시간 예매율</button>
                            <button className="btn btn-warning" onClick={() => setNo(3)}>좌석 점유율 순위</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table className="table">
                    <thead>
                    <tr>
                        <th className="text-center">순위</th>
                        <th className="text-center">포스터</th>
                        <th className="text-center">영화명</th>
                        <th className="text-center">감독</th>
                        <th className="text-center">장르</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movie.map((m, idx) => (
                        <tr key={idx}>
                            <td className="text-center">{m.rank}</td>
                            <td className="text-center">
                                <img src={"https://www.kobis.or.kr" + m.thumbUrl} alt="poster" width="40" />
                            </td>
                            <td className="text-center">{m.movieNm}</td>
                            <td className="text-center">{m.director}</td>
                            <td className="text-center">{m.genre}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App3;
