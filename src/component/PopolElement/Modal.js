


import './Modal.css';
import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

const Modal = (props) => {
  
  const { open, close } = props;
  const [balance, Setbalance] = useState(null);
  const amount = useRef();
  
  const uuid = sessionStorage.getItem('uuid');

  


  /* balance에 dummy data 로 테스트 */
  useEffect(()=>{
    Setbalance(150000);
  })
  

  /* 서버에서 잔고정보를 받아오기위한 fetch */
  
  useEffect(()=>{
    
    fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
      method: 'POST',
      body:JSON.stringify({
        'uuid' : {uuid}
      })
    }).then(response=> response.json())
    .then( data => {
      console.log(data);
    })

  },[])


  function submitHandler(e){
    e.preventDefault();

    const enteredamount = amount.current.value;

    // 설정금액이 잔고금액보다 크면, fetch하지않고 함수 벗어남

    if(Number(enteredamount) > Number(balance)){
      console.log(enteredamount);
      return;
    }

    fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
      method: 'POST',
      body:JSON.stringify({
        'amount' : {enteredamount}
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    })

    
  }



  return (
   
    <div className={open   ? 'openModal modal' : 'modal'}>
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

    </div>
  );
};

export default Modal;