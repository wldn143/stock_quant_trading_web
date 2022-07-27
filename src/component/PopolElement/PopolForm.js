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

    background-color: ${props => {
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

    let [sttData, setsttData] = useState(null);
    let [Clicked, setClicked] = useState([0,0]);

    let [OpenModal, setOpenModal] = useState(false);
    

    function selectstt1(e){
        setsttData("stt1");
        setClicked([1,0]);
    }

    function selectstt2(e){
        setsttData("stt2");
        setClicked([0,1]);
    }

    function CloseModal(){
        setOpenModal(false);
    }

    function submitHandler(e){
        e.preventDefault();

        if(sttData === null){
            setOpenModal(true);
            return;
        }

        fetch('https://stock-a95d6-default-rtdb.firebaseio.com/.json',{
            method:'POST',
            body:JSON.stringify({sttData}),
            headers:{
                'Content-type': 'application/json'
            }
        }).then(navigate('/home/popol/select'))
        .catch()
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

