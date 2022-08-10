import classes from './Signuplayout.module.css';
import {useRef, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';

// 카카오로그인 후, 회원가입 페이지
// form제출을 통해 서버에 사용자정보 제출, 제출후 별도의 조건문없이 홈페이지로 이동.(로그인으로 간주)


function Signuplayout({props}){

    let navigate = useNavigate();

    const userName = props.state.name;
    const userUuid = props.state.uuid;

    let [apikeySend, setapikeySend] = useState(false);
    let [secretSend, setsecretSend] = useState(false);
    let [canoSend, setcanoSend] = useState(false);
    let [acntSend, setacntSend] = useState(false);
    let [quantitySend, setquantitySend] = useState(false);

    let [enteredApikey, setenteredApikey] = useState(-1);
    let [enteredSecret, setenteredSecret] = useState();
    let [enteredCano, setenteredCano] = useState(-1);
    let [enteredAcnt, setenteredAcnt] = useState();
    let [enteredQuantity, setenteredQuantity] = useState();



    const apikeyInput = useRef();
    const secretInput = useRef();
    const canoInput = useRef();
    const acntInput = useRef();
    const quantityInput = useRef();


    /* fetch를 5개로 쪼갬. fetch가 전부 끝나고 home 으로 이동해야하므로, 훅으로 제약 걸어줌 */

    function submitHandler(event){
        event.preventDefault();

        

        setenteredApikey(apikeyInput.current.value);
        setenteredSecret(secretInput.current.value);
        setenteredCano(canoInput.current.value);
        setenteredAcnt(acntInput.current.value);
        setenteredQuantity(quantityInput.current.value);
    }

    
    /* 실제 서비스 전까지, apikey 와 secret 은 POST 하면 안됨!! */

    // useEffect(()=>{
    //     if(enteredApikey !== -1){
    //         fetch('http://haniumproject.com/setUserApiKey',{
    //             method: 'POST',
    //             body:JSON.stringify({
    //                 'target' : enteredApikey
    //             }),
    //             headers:{
    //                 'Content-type': 'application/json',
    //                 'uuid' : userUuid
    //             }
    //         }).then(setapikeySend(true))

    //     }
    // },[enteredApikey])



    // useEffect(()=>{
    //     if(apikeySend){
    //         fetch('http://haniumproject.com/setUserSecret',{
    //             method: 'POST',
    //             body:JSON.stringify({
    //                 'target' : enteredSecret
    //             }),
    //             headers:{
    //                 'Content-type': 'application/json',
    //                 'uuid' : userUuid
    //             }
    //         }).then(setsecretSend(true))
    //     }
    // },[apikeySend])




    /* 제약조건 나오기 전까지, cano, acnt, quantity 서버에 업데이트 하면 안됨 */


    // useEffect(()=>{
    //     console.log(enteredCano);
    //     if(enteredCano !== -1){
    //         fetch('http://haniumproject.com/setUserCANO',{
    //             method: 'POST',
    //             body:JSON.stringify({
    //                 'target' : enteredCano
    //             }),
    //             headers:{
    //                 'Content-type': 'application/json',
    //                 'uuid' : userUuid
    //             }
    //         }).then(setcanoSend(true))
    //     }
        
    // },[enteredCano]);

    // useEffect(()=>{
    //     console.log(enteredAcnt);
    //     if(canoSend){
    //         fetch('http://haniumproject.com/setUserACNT',{
    //             method: 'POST',
    //             body:JSON.stringify({
    //                 'target' : enteredAcnt
    //             }),
    //             headers:{
    //                 'Content-type': 'application/json',
    //                 'uuid' : userUuid
    //             }
    //         }).then(setacntSend(true))
    //     }
    // },[canoSend])

    // useEffect(()=>{
    //     console.log(acntSend);
    //     console.log(enteredQuantity);
    //     if(acntSend){
    //         fetch('http://haniumproject.com/setUserQuantity',{
    //             method: 'POST',
    //             body:JSON.stringify({
    //                 'target' : enteredQuantity
    //             }),
    //             headers:{
    //                 'Content-type': 'application/json',
    //                 'uuid' : userUuid
    //             }
    //         }).then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setquantitySend(true);
    //             navigate('/home');
    //         });
    //     }
    // },[acntSend])


    return(

        <form className={classes.form} onSubmit={submitHandler}>

            <h1> 회원가입 </h1>

            <h2> 한국투자증권 정보 </h2>
            
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

            <h2> 계좌정보 </h2>
            
            <section className={classes.inputsec}>
                <label htmlFor='cano'>앞 8자리</label>
                <input type='text' required id='cano' ref={canoInput}/>
            </section>

            <section className={classes.inputsec}>
                <label htmlFor='acnt'>뒤 2자리</label>
                <input type='text' required id='acnt' ref={acntInput}/>
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