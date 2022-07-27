import './ErrorModal.css';

function ErrorModal(props){
    const {open, close, main, header} = props;


    return (
   
        /* open 이 true 라면, 최상위 div에 modal class와 openModal class 두개를 동시에 부여한다!! */
      <div className={open   ? 'Errormodal ErroropenModal' : 'Errormodal'}>
        {open ? (
          <section className="Errormodalbox">
  
            <header className="Errormodalheader">
              
              {header}
            </header>
  
  
            <main className="Errormodalmain">
              
              {main}
              
            </main>

            
            <button className="Errorclosebtn" onClick={close}>
                확인
            </button>
            
            
  
          </section>
        ) : null}
  
      </div>
    );
}

export default ErrorModal;