import {Cookies} from "react-cookie";

// 쿠키 생성
const cookies = new Cookies();
/*

    문자열만 저장이 가능
    -----------------
    Map형식 (key,value)

    1. 쿠키 저장
       setCookie()
    2. 쿠키 읽기
        getCookie()
    3. 쿠키 전체 읽기
        getAll()
    4. 브라우저에 저장
       ------------ 서버에 저장할 수 없다 (서버에서 저장이 불가능)

 */
// 기간
export const setCookie = (name, value, options) => {

    return cookies.set(name, value, options);
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const getAll = () => {
    return cookies.getAll();
}

