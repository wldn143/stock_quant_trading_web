
import { useNavigate } from 'react-router-dom';

let authorizationCode = new URL(window.location.href).searchParams.get('code');
/* URL에 있는 인가코드를 변수에 저장하는 로직. */


// 카카오로그인 성공시 이동되는 dummy page
// 인터페이스는 구현하지 않고, 서버통신함수만 적용

function SigninPage(){

    let navigate = useNavigate()
    

    function authorizationHandler(e){
        

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
        
        
        fetch('http://haniumproject.com/auth',{
            method: 'POST',
            body: JSON.stringify({
                'code' : authorizationCode
            })
        }).then( response => response.json())
        .then( (data) => {
            if(data.registration === 0){
                navigate('/home'), {state: uuid 
                };
            }else if(data.registration === 1){
                navigate('/signup', {state: {
                    name: data.name,
                    uuid: data.uuid
                }
                });
            }
        })    
        


        /* 서버통신 테스트 성공
        인가코드 서버로 전송 -> 응답데이터 registration 값으로 페이지 이도
        registration === 0 : 회원가입이 이미 완료된 회원. homepage로 이동
        registration === 1 : 회원가입이 안되있는 회원. signuppage로 이동
        */
    }

    
    
    

    return <>
        {authorizationHandler()}
    </>
}

export default SigninPage;


