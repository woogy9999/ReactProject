import {useState} from 'react'
import {useQuery} from "@tanstack/react-query"
import apiClient from "../../http-commons"
import ListImage from "../food/ListImage";
import PagePrint from "../food/PagePrint";

function InfoList() {
    const [curpage, setCurpage] = useState(1);
    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["info-list", curpage],
        queryFn: async () => {
            return await apiClient.get(`/info/list/${curpage}`);
        }
    });
    if (isLoading) {
        return <h3 className={"text-center"}>서버 데이터 전송 지연...</h3>
    }
    if (isError) {
        return <h3 className={"text-center"}>서버 에러 발생:{error}</h3>;
    }
    console.log(data)
    const info_list = data.data.list

    return (
        <div className="container">
            <div className="row">
                {
                    info_list.map((info,index) =>
                        <ListImage fno={info.no} name={info.title} poster={info.poster} key={index} />

                    )
                }
            </div>
            <div className="row text-center" style={{marginTop: "10px"}}>
                <PagePrint data={data.data} setCurpage={setCurpage} />
            </div>
        </div>

    )
}
export default InfoList;

