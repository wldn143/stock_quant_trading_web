
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../component/layout/Loading';

let authorizationCode = new URL(window.location.href).searchParams.get('code');
/* URL에 있는 인가코드를 변수에 저장하는 로직. */
const REST_API_KEY = "52750403fc68645f09dd49b6b777a752";
const REDIRECT_URI = "http://localhost:3000/signin"  

// 카카오로그인 성공시 이동되는 dummy page
// 인터페이스는 구현하지 않고, 서버통신함수만 적용

function SigninPage(){

    let navigate = useNavigate()
    const [token, setToken] = useState(-1);

    function authorizationHandler(){
        

        /* firebase 테스트용 fetch */
        
        // fetch("https://stock-a95d6-default-rtdb.firebaseio.com./.json",{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'code' : authorizationCode
        //     })
        // }).then(response => response.json())
        // .then( (data) => {
        //     if(!data){
        //         navigate('/home')
        //     }
        //     else{
        //         console.log(data)
        //     }
        // })
        fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_url=${REDIRECT_URI}&code=${authorizationCode}`,{
            method:'POST',
            headers:{
                'Content-type' : 'application/x-www-form-urlencoded;chartset=utf-8'
            }
        }).then((res) => res.json())
        .then((data)=>{
            console.log(data);
            setToken(data.access_token);
        })
        
        
        
        
    }


    useEffect(()=>{
        authorizationHandler();
    },[])

    useEffect(()=>{
        if(token !== -1){
            fetch('http://haniumproject.com:8000/auth',{
                method: 'POST',
                body: JSON.stringify({
                    'code' : token
                }),
                headers:{
                    'Content-type' : 'application/json'
                }
            }).then( response => response.json())
            .then( (data) => {
                console.log('로그인 성공');
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
            }).catch(err=>{
                console.log('로그인 실패');
                console.log(err);
            })    
            

            /* 서버통신 테스트 성공
            인가코드 서버로 전송 -> 응답데이터 registration 값으로 페이지 이도
            registration === 0 : 회원가입이 이미 완료된 회원. homepage로 이동
            registration === 1 : 회원가입이 안되있는 회원. signuppage로 이동
            */
            }
    },[token])
    
    
    

    return <>
        <Loading/>
    </>
}

export default SigninPage;


