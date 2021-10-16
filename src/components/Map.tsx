import React, { useEffect, useRef } from "react";
import { makeVar } from "@apollo/client";

const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
export const latlngVar = makeVar({lat: "", lng: ""});
const Map:React.FC<{addr: string}> = ({addr}) => {
    const container = useRef(null);
    const MapFunc =  () => {
        const map = new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(addr, function(result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                latlngVar({lat: result[0].y, lng: result[0].x});
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                console.log(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="padding: 10px 0;font-size:1.3rem;font-weight:700;width:150px;text-align:center;color:#00704a";>내 카페</div>'
                });
                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    };
    
    useEffect(() => {
        MapFunc();
        return () => {};  
    }, [addr]);
    return (
        <div className="map" style={{"width":"100%", "height": "400px", "borderRadius": "10px", "marginTop": "30px"}} ref={container}></div>
    );
};
export default Map;