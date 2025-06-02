import { useEffect, useRef } from "react";

function FoodMap({ address, name }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return;

        // 지도를 생성하는 함수
        const mapContainer = mapRef.current;
        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 주소를 좌표로 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;font-size:13px;">${name}</div>`
                });
                infowindow.open(map, marker);

                map.setCenter(coords);
            }
        });
    }, [address, name]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
}

export default FoodMap;
