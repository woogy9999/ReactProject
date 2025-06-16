import { useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface SeoulMapProps {
    address: string;
}

const SeoulMap = ({ address }: SeoulMapProps) => {
    useEffect(() => {
        const { kakao } = window;

        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 장소명 검색 객체
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(address, function (result: any, status: string) {
            if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                const infowindow = new kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`
                });
                infowindow.open(map, marker);

                map.setCenter(coords);
            } else {
                console.error("장소 검색 실패:", status);
            }
        });
    }, [address]);

    return (
        <div id="map" style={{ width: "100%", height: "350px" }}></div>
    );
};

export default SeoulMap;
