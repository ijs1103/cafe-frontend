import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../apollo";
const ME_QUERY = gql`
  query me {
    me {
      id
      username
      
    }
  }
`;
// 사용자가 로그인을 했는지 확인
function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    // 로컬에 토큰이 저장되어있지 않으면 쿼리문 자체를 스킵
    const { data } = useQuery(ME_QUERY, {
      skip: !hasToken,
    });
    useEffect(() => {
    // me 쿼리를 실행한 data가 null 인 경우 => 토큰을 로컬에 가지고 있으면서도 data 결과값이 null인 경우 => 토큰이 헤더에 제대로 담기지 않거나 뭔가 문제가 있는경우 
    // 로그아웃을 시켜준다
      if(data?.me === null) logUserOut();
    }, [data]);
    return {data};
}
export default useUser;