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

    const uuid = sessionStorage.getItem('uuid');

    let [sttData, setsttData] = useState(null);         // 전략종류 저장하는 변수
    let [Clicked, setClicked] = useState([0,0]);  
    let [sttList, setsttList] = useState([]);      

    let [OpenModal, setOpenModal] = useState(false);     // Modal 상태 저장 변수
    

    function selectstt(idx, name){             // 전략1 버튼 클릭
        setsttData(name);
        let temp = [];
        for(let i = 0; i < Clicked.length; i++){
            if(i===idx){
                temp.push(1);
                continue;
            }
            temp.push(0);
        }
        setClicked(temp);
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

        
        navigate('/home/popol/select', {state:{
            strategy: {sttData}
        }})             // 장바구니 페이지로 이동 (선택전략정보도 같이 이동)
        
    }



    // 전략종류 받아오는 API

    useEffect(()=>{
        fetch('http://haniumproject.com:8000/getModelInfo',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${uuid}`
            }
        })
        .then(response=> response.json())
        .then(data => {
            setsttList(data);
            console.log('전략데이터 불러오기 성공');
        })
    },[])

    

   


    return(
        <>
            
            <section className={classes.box}>


                <h1> 사용하실 전략을 선택하세요 </h1>

                {sttList.map( (item, idx) => {
                    return(
                        <SelectButton Clicked={Clicked[idx]} onClick={()=>{selectstt(idx, item.name)}}>        
                            <h2>전략 {idx+1}</h2>
                            <h3>name: {item.name}</h3>
                            <h3>er : {item.er} </h3>
                            <h3>Sharpe: {item.sharpe}</h3>
                            <h3>fileName: {item.filename}</h3>
                        </SelectButton>
                    )
                })}
            

                
                <button className={classes.submitbtn} onClick={submitHandler}>다음 단계로</button>
                

            </section>

            <ErrorModal open={OpenModal} close={CloseModal} main="전략을 선택하세요" header="error"></ErrorModal>
        </>
    )
}

export default PopolForm;

