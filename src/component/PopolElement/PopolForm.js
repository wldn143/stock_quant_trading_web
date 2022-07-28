import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './PopolForm.module.css';
import ErrorModal from './Modals/ErrorModal';

import styled from 'styled-components';

const SelectButton=styled.button`               

    border: 1px solid #D8D8D8;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    width: 500px;
    transition: background-color 0.5s;
    margin-top: 50px;
    cursor: pointer;

    background-color: ${props => {              // 가변디자인. 버튼눌르면 버튼색바뀜
        if(props.Clicked === 1){
            return '#b39b9a';
        }
    }};

    h3{
        text-align: start;
    }


    &:hover{
        background-color:#b39b9a;
    }

`



function PopolForm(){

    

    const navigate = useNavigate();

    let [sttData, setsttData] = useState(null);         // 전략종류 저장하는 변수
    let [Clicked, setClicked] = useState([0,0]);        

    let [OpenModal, setOpenModal] = useState(false);     // Modal 상태 저장 변수
    

    function selectstt1(e){             // 전략1 버튼 클릭
        setsttData("stt1");
        setClicked([1,0]);
    }

    function selectstt2(e){             // 전략2 버튼 클릭
        setsttData("stt2");
        setClicked([0,1]);
    }

    function CloseModal(){              // Modal창 닫기버튼 클릭
        setOpenModal(false);
    }

    function submitHandler(e){          
        e.preventDefault();

        if(sttData === null){           //  선택 안하고 다음단계 버튼 클릭시 modal창 띄우고 종료
            setOpenModal(true);
            return;
        }

        fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{        // 선택 잘 했을때, 서버로 어떤저략인지 데이터 POST. 
            method:'POST',
            body:JSON.stringify({sttData}),
            headers:{
                'Content-type': 'application/json'
            }
        }).then(navigate('/home/popol/select'))             // 그후 장바구니 페이지로 이동
        
    }

    

   


    return(
        <>
            
            <section className={classes.box}>


                <h1> 사용하실 전략을 선택하세요 </h1>

                <SelectButton Clicked={Clicked[0]} onClick={selectstt1}>        
                    <h2>전략1</h2>
                    <h3>월간 수익률</h3>
                    <h3>변동 </h3>
                    <h3>Sharpe-Ratio</h3>
                </SelectButton>
                
                <SelectButton Clicked={Clicked[1]} onClick={selectstt2}>
                    <h2>전략2</h2>
                    <h3>월간 수익률</h3>
                    <h3>변동 </h3>
                    <h3>Sharpe-Ratio</h3>
                </SelectButton>

                
                <button className={classes.submitbtn} onClick={submitHandler}>다음 단계로</button>
                

            </section>

            <ErrorModal open={OpenModal} close={CloseModal} main="전략을 선택하세요" header="error"></ErrorModal>
        </>
    )
}

export default PopolForm;

