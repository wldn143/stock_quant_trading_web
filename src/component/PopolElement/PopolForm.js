import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


import styled from 'styled-components';

const selectButton=styled.button



function PopolForm(){

    

    const navigate = useNavigate();

    let [sttData, setsttData] = useState();
    
    

    function selectstt1(e){
        setsttData("stt1");
    }

    function selectstt2(e){
        setsttData("stt2");
    }

    function submitHandler(e){
        e.preventDefault();

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
            <selectButton></selectButton>
            <section>
                <selectButton  onClick={selectstt1}>
                    <h2>전략1</h2>
                </selectButton>
                
                <selectButton  onClick={selectstt2}>
                    <h2>전략2</h2>
                </selectButton>

                
                <button onClick={submitHandler}>Submit</button>
                

            </section>

            
        </>
    )
}

export default PopolForm;

