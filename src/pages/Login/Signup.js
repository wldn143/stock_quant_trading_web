import { useLocation, useNavigate} from 'react-router-dom';
import {useRef} from 'react';



// 카카오로그인 후, 회원가입 페이지
// form제출을 통해 서버에 사용자정보 제출, 제출후 별도의 조건문없이 홈페이지로 이동.(로그인으로 간주)

function SignupPage(){
    let navigate = useNavigate();

    const location = useLocation();
    const userName = location.state.name;
    const userUuid = location.state.uuid;

    const apikeyInput = useRef();
    const secretInput = useRef();
    const canoInput = useRef();
    const acntInput = useRef();
    const quantityInput = useRef();

    

    function submitHandler(event){
        event.preventDefault();

        

        const enteredApikey = apikeyInput.current.value;
        const enteredSecret = secretInput.current.value;
        const enteredCano = canoInput.current.value;
        const enteredAcnt = acntInput.current.value;
        const enteredQuantity = quantityInput.current.value;

        const userInfo = {
            apikey: enteredApikey,
            secret: enteredSecret,
            cano: enteredCano,
            acnt: enteredAcnt,
            quantity: enteredQuantity,
            uuid: userUuid
        };

        fetch('http://haniumproject.com/registration',{
            method: 'POST',
            body:JSON.stringify(userInfo),
            headers:{
                'Content-type': 'application/json'
            }
        }).then(navigate('/home'));

        // 로그인 API : /registration
        // headers 적용 필수.

        
    }

    

    return<>
        <form onSubmit={submitHandler}>
            <h2>가입정보</h2>
            
            <h4><span>닉네임</span>  {userName}</h4>
        
            <section>
                <label htmlFor='apikey'>API KEY</label>
                <input type='number' required id="apikey" ref={apikeyInput}/>
            </section>

            <section>
                <label htmlFor='secret'>SECRET</label>
                <input type='number' required id="secret" ref={secretInput}/>
            </section>

            <h2>계좌정보</h2>
            
            <section>
                <label htmlFor='cano'>앞 8자리</label>
                <input type='number' required id='cano' ref={canoInput}/>
            </section>

            <section>
                <label htmlFor='acnt'>뒤 2자리</label>
                <input type='number' required id='acnt' ref={acntInput}/>
            </section>

            <section>
                <laebl htmlFor='quantity'>잔고량</laebl>
                <input type='number' required id='quantity' ref={quantityInput}/>
            </section>
            <button>Sign up!!</button>
            


        </form>
    </>
}

export default SignupPage;