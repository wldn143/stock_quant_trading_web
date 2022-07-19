
import { useNavigate } from 'react-router-dom';

let authorizationCode = new URL(window.location.href).searchParams.get('code');
/* URL에 있는 인가코드를 변수에 저장하는 로직. */

function SignupPage(){

    let navigate = useNavigate()

    function authorizationHandler(){

        /* firebase 테스트용 fetch */
        
        // fetch("https://stock-a95d6-default-rtdb.firebaseio.com./.json",{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'code' : authorizationCode
        //     })
        // }).then(response => response.json())
        // .then( (data) => {
        //     console.log(data)
        // })
        
        
        fetch('http://haniumproject.com/auth',{
            method: 'POST',
            body: JSON.stringify({
                'code' : authorizationCode
            })
        }).then( response => response.json())
        .then( (data) => {
            if(data.registration === false){
                navigate('/home')
            }
        })    
        


        /* 서버에서 uuid 받아오기 성공.  
        추후 registration, uuid 받아오면, 
        uuid -> 따로 저장
        registration -> false : 홈페이지 띄우기
        registration -> true : 회원가입 페이지 띄우기*/
    }

    
    
    

    return <>
        {authorizationHandler()}
    </>
}

export default SignupPage;


