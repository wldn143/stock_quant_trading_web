


import './Modal.css';
import {useState, useEffect, useRef} from 'react';
import ErrorModal from './ErrorModal';
import {useNavigate} from 'react-router-dom';



// TODO 1 : 서버에서 잔고정보 받아오기

const Modal = (props) => {
  
  const { open, close, strategy, cartlist } = props;

  const balance = sessionStorage.getItem('balance');
  
  const amount = useRef();
  const navigate = useNavigate();
  
  const uuid = sessionStorage.getItem('uuid');

  

  const [OpenErrorhigh, SetOpenErrorhigh] = useState(false);  // 잔고초과 에러 모달
  const [OpenErrorlow, SetOpenErrorlow] = useState(false);  // 투자금액미달 에러 모달
  const [OpenSuccess, SetOpenSuccess] = useState(false); // 성공시 모달

  function CloseErrorhigh(){    // 잔고초과 에러 모달 close handler
    SetOpenErrorhigh(false);
  }

  function CloseErrorlow(){    // 잔고미달 에러 모달 close handler
    SetOpenErrorlow(false);
  }

  function CloseSuccess(){    // 성공 모달 close handler
    SetOpenSuccess(false);
    navigate('/home/balance');    // 성공모달 닫힐때, 잔고페이지로 이동
  }



  function submitHandler(e){
    e.preventDefault();

    const enteredamount = amount.current.value;

    // 설정금액이 잔고금액보다 크면, 에러모달 띄우기. fetch하지않고 함수 벗어남

    if(Number(enteredamount) > Number(balance)){
      console.log(enteredamount);
      SetOpenErrorhigh(true);
      return;
    }

    // 설정금액이 일정금액 미달이면, 에러모달 띄우기. fetch하지 않고 함수 벗어남

    if(Number(enteredamount) < Number(50000)){
      SetOpenErrorlow(true);
      return;
    }

    console.log(JSON.stringify({
      'strategy' : strategy.sttData,
      'cartlist' : cartlist,
      'amount' : enteredamount,
    }))

    // 금액 조건 만족시, 서버로 전략종류, 주식리스트, 설정금액 전송.  성공모달 띄우기

    fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
      method: 'POST',
      body:JSON.stringify({
        'strategy' : {strategy},
        'cartlist' : {cartlist},
        'amount' : {enteredamount},
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      SetOpenSuccess(true);
      console.log('투자데이터 서버로 전송 성공');
    })

    
  }



  return (
   
      /* open 이 true 라면, 최상위 div에 modal class와 openModal class 두개를 동시에 부여한다!! */
    <div className={open   ? 'modal openModal' : 'modal'}>
      {open ? (
        <section className="modalbox">

          <header className="modalheader">
            <button className="closebtn" onClick={close}>
              &times;
            </button>
            운용 금액 설정
          </header>


          <main className="modalmain">
            
            <p>잔고금액: {balance}</p>

            <form onSubmit={submitHandler}>
              <label htmlFor="select">설정금액: </label>
              <input type="number" id="select" placeholder='원' ref={amount}></input>

              <button className="completebtn">설정완료</button>
            </form>
            
          </main>


        </section>
      ) : null}

      <ErrorModal open={OpenErrorhigh} close={CloseErrorhigh} main="잔고를 초과하였습니다" header="error"></ErrorModal>
      <ErrorModal open={OpenErrorlow} close={CloseErrorlow} main="투자금액이 너무 적습니다" header="error"></ErrorModal>
      <ErrorModal open={OpenSuccess} close={CloseSuccess} main="투자에 성공하였습니다" header="success!"></ErrorModal>

    </div>
  );
};

export default Modal;