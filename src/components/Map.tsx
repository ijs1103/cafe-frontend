import React, { useEffect, useRef, useCallback } from "react";
import { makeVar } from "@apollo/client";

const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};
export const latlngVar = makeVar({lat: "", lng: ""});
// style은 inline style줄때 
const Map:React.FC<{addr: string, style: React.CSSProperties, hasMarker?: boolean}> = ({addr, style, hasMarker=true}) => {
    const container = useRef(null);
    const MapFunc =  useCallback(async () => {
        const map = await new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
        const geocoder = await new window.kakao.maps.services.Geocoder();
        await geocoder.addressSearch(addr, function(result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                latlngVar({lat: result[0].y, lng: result[0].x});
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });
                // 커스텀 마커
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="padding: 10px 0;font-size:1.3rem;font-weight:700;width:150px;text-align:center;color:#00704a";>내 카페</div>'
                });
                hasMarker && infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동
                map.setCenter(coords);
            }
        });
    }, [addr, hasMarker]);
    
    useEffect(() => {
        MapFunc();
        return () => {};  
    }, [MapFunc]);
    return (
        <div className="map" style={style} ref={container}></div>
    );
};
export default Map;