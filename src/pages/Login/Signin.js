
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/layout/Loading';

let authorizationCode = new URL(window.location.href).searchParams.get('code');
/* URL에 있는 인가코드를 변수에 저장하는 로직. */

const REST_API_KEY = "52750403fc68645f09dd49b6b777a752";
const REDIRECT_URI = "http://localhost:3000/signin";

// 카카오로그인 성공시 이동되는 dummy page
// 인터페이스는 구현하지 않고, 서버통신함수만 적용

function SigninPage(){

    let navigate = useNavigate()
    let [accessToken, setaccessToken] = useState(-1);
    


    // 인가코드를 카카오에 보내서 직접 토큰을 받아오는 방식으로 변경 

    function authorizationHandler(){
        
        const bodyData= {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: authorizationCode
        }

        console.log(bodyData);

        const Stringbody= Object.keys(bodyData).map(k=> encodeURIComponent(k) + '=' + encodeURI(bodyData[k])).join("&");

        fetch('https://kauth.kakao.com/oauth/token',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            body: Stringbody
        }).then(response => response.json())
        .then(data => {
            setaccessToken(data.access_token);
        })

    }


    useEffect(()=>{
        authorizationHandler();
    },[])


    // 받아온 토큰을 서버에 전달

    useEffect(()=>{

        if(accessToken !== -1){

            console.log(accessToken);

            fetch('http://haniumproject.com/auth',{
                method: 'POST',
                body: JSON.stringify({
                    'code' : accessToken
                }),
                headers:{
                    'Content-type' : 'application/json'
                }
            }).then( response => response.json())
            .then( (data) => {
                console.log(data);
                sessionStorage.setItem('uuid', data.uuid);
                sessionStorage.setItem('name', data.name);

                if(data.registration === 0){
                    
                    navigate('/home')
                
                }else if(data.registration === 1){
                    
                    navigate('/signup', {state: {
                        name: data.name,
                        uuid: data.uuid
                    }
                    });
                }
            })  

        }

        /* 서버통신 테스트 성공
        accesstoken 서버로 전송 -> 응답데이터 registration 값으로 페이지 이도
        registration === 0 : 회원가입이 이미 완료된 회원. homepage로 이동
        registration === 1 : 회원가입이 안되있는 회원. signuppage로 이동
        */
          
    },[accessToken])
    
    
    

    return <>
        <Loading/>
    </>
}

export default SigninPage;


