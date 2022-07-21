import classes from './Signuplayout.module.css';
import {useRef} from 'react';

import {useNavigate} from 'react-router-dom';

// 카카오로그인 후, 회원가입 페이지
// form제출을 통해 서버에 사용자정보 제출, 제출후 별도의 조건문없이 홈페이지로 이동.(로그인으로 간주)


function Signuplayout({props}){

    let navigate = useNavigate();

    const userName = props.state.name;
    const userUuid = props.state.uuid;

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

        // 회원가입 API : /registration
        // headers 적용 필수.

        
    }


    return(
        <form className={classes.form} onSubmit={submitHandler}>

            <h1> Sign Up Page </h1>

            <h2>  User Info</h2>
            
            <section className={classes.inputsec}>
                <label>Nick name</label>
                <span>{userName}</span>
            </section>
            
        
            <section className={classes.inputsec}>
                <label htmlFor='apikey'>API KEY</label>
                <input type='text' required id="apikey" ref={apikeyInput}/>
            </section>

            <section className={classes.inputsec}>
                <label htmlFor='secret'>SECRET</label>
                <input type='text' required id="secret" ref={secretInput}/>
            </section>

            <h2>  Account Info</h2>
            
            <section className={classes.inputsec}>
                <label htmlFor='cano'>앞 8자리</label>
                <input type='number' required id='cano' ref={canoInput}/>
            </section>

            <section className={classes.inputsec}>
                <label htmlFor='acnt'>뒤 2자리</label>
                <input type='number' required id='acnt' ref={acntInput}/>
            </section>

            <section className={classes.inputsec}>
                <label htmlFor='quantity'>잔고량</label>
                <input type='number' required id='quantity' ref={quantityInput}/>
            </section>

            <section className={classes.buttonsec}>
                <button> Join </button>
            </section>
            
        </form>


    )
}

export default Signuplayout;