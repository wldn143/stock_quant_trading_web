import SearchBar from "../SearchElement/SearchBar";
import classes from "./SelectStockForm.module.css"

import {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Modal from "./Modals/Modal";
import ErrorModal from "./Modals/ErrorModal";

import Loadingprice from "../layout/Loadingprice";

import styled from 'styled-components';

const EnjoybtnOn=styled.button`
    cursor: pointer;
    border: none;
    padding: none;
    font-size: 25px;
    position: relative;
    bottom: 5px;
`

const EnjoybtnOff=styled.button`
    cursor: pointer;
    border: none;
    padding: none;
    font-size: 32px;
    position: relative;
    bottom: 10px;
   
`


// TODO 1 : 주식리스트 hover 처리


function SelectStockForm(){

    let location = useLocation();

    let [isLoadingcart, setisLoadingcart] = useState(false);
    const uuid = sessionStorage.getItem('uuid');        // uuid sessionStorage에서 불러오기

    /* 즐겨찾기 목록 dummy data */
    const [tostr, settostr] = useState([]) 


    const [modalOpen, setModalOpen] = useState(false);             // 자본선택 modal 창 관리 변수
    const [searchResultStock, setsearchResultStock] = useState(['삼성전자', 'LG에너지솔루션', 'SK하이닉스', '삼성바이오로직스', '삼성전자우', 'LG화학', 'NAVER', '현대차', '삼성SDI', '기아']);         //  검색리스트의 stockname 저장 변수
    const [searchResultPrice, setsearchResultPrice] = useState([]);        //  검색리스트의 price 저장 변수
    const [stockCartStock, setstockCartStock] = useState([]);             //   장바구니리스트 stockname 저장 변수
    const [ErrormodalOpen, setErrormodalOpen] = useState(false);        //  장바구니 비었는데 선택완료 버튼 눌렀을때, 에러모달


    function OpenErrormodal(){
        setErrormodalOpen(true);
    }

    function CloseErrormodal(){
        setErrormodalOpen(false);
    }

    function openModal(){  
        if(stockCartStock.length === 0){
            OpenErrormodal();
            return;
        }
    
        setModalOpen(true);
    };

    function closeModal() {
        setModalOpen(false);
    };


    function selectHandler(item){             // 검색리스트에서 주식 클릭시, 해당 주식명, 인덱스 params으로 받기

        if(!stockCartStock.includes(item) ){            //  장바구니리스트에 이미 있는 주식인지 체크

            setstockCartStock([...stockCartStock, item]);
        } 

    }



    // 즐겨찾기 목록에 있는 주식이름인지 체크하는 함수. item이 즐겨찾기 목록에 있는 주식이름이라면, 버튼색깔 변경
    function InEnjoyList(item){

        for(let i = 0; i < tostr.length; i++){
            if(tostr[i] === item){
                return true;
            }
        }
        return false;
    }


    //  즐겨찾기 버튼 눌렀을때의 동작

    function EnjoySearchHandler(item){             

        if(!tostr.includes(item)){      
            settostr([...tostr, item]);
        }
        else{
            settostr(tostr.filter(x=> x !== item))
        }
    }


    // tostr배열 변경될때 마다, 서버로 변경된 배열 보내기

    useEffect(()=>{
        fetch('http://haniumproject.com:8000/setUserFavList',{
            method: 'POST',
            body:JSON.stringify({
                'target' : tostr.toString()
            }),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${uuid}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("즐겨찾기 추가 완료");
        });
    },[tostr])



    function deleteHandler(item){             //   장바구니 x 버튼 눌렀을때

        setstockCartStock(stockCartStock.filter( x => x !== item ));     // 주식이름 리스트에서 filter로 제거

    }


    // 검색페이지 최초 랜더링시, 즐겨찾기 목록 서버에서 가져옴.
    

    useEffect(()=>{
        fetch('http://haniumproject.com:8000/getUserAccount',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${uuid}`
            }
        })
        .then( response => response.json())
        .then( data => {
            console.log(data)
            settostr(data.favlist.split(","));
            console.log('즐겨찾기 불러오기 성공');
        });

    },[])




    useEffect(()=>{
        
        setisLoadingcart(true);

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({
                code: searchResultStock
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            setsearchResultPrice(data);
            setisLoadingcart(false);
            console.log('가격정보 불러오기 성공');
        })


    },[searchResultStock]);

   
    

    // map을 이용하여,  변경사항 반영된 검색리스트, 장바구니리스트  화면에 출력

    return(
        <>
            <SearchBar setsearchResult={setsearchResultStock}/>
            <section className={classes.box} >
                <ul className={classes.resultList}>
                    <section>
                        {searchResultStock.map((item, idx) =>{
                            return(
                                <li className={classes.Formstocklist} onClick={()=>selectHandler(item)}>{item} </li>
                            )
                        }) }

                    </section>
                    
                    {isLoadingcart? 
                        <section>
                            {searchResultStock.map((x)=>{
                                return(
                                    <>                                
                                        <li className={classes.Formpricelist}> <Loadingprice/> </li>
                                    </>
                                )     
                            })}
                        </section>
                        :
                        <section>
                            {searchResultPrice.map((price)=>{
                                return(
                                    <>
                                        <li className={classes.Formpricelist}>{price}</li>
                                    </>
                                )
                            })

                            }
                        </section>
                    }      

                    <section>
                        { searchResultStock.map((item) => {
                            return(<>
                                <li className={classes.Formbtnlist}>

                                    {InEnjoyList(item) === true ?
                                        (<EnjoybtnOn onClick={()=>EnjoySearchHandler(item)}>⭐</EnjoybtnOn>)
                                        :
                                        (<EnjoybtnOff onClick={()=>EnjoySearchHandler(item)}>☆</EnjoybtnOff>)
                                    }
                                    
                                </li>
                            </>
                            )})
                        }

                        
                    </section> 


                    
                </ul>




                
                <h2 className={classes.carthead}> 장바구니 </h2>


                <ul className={classes.cartList}>
                    <section>
                        {stockCartStock.map((item)=>{
                            return(
                                <li className={classes.CartStockList}>
                                    <span>{item}</span> 
                                    <button className={classes.deletebtn} onClick={()=>deleteHandler(item)}>x</button> 
                                </li>
                            )
                        })}
                    </section>
                    


                </ul>
                    

                



                <button className={classes.submitbtn} onClick={openModal}>선택 완료
                
                </button>
                
                <Modal open={modalOpen} close={closeModal} strategy={location.state.strategy} cartlist={stockCartStock}>
                    
                </Modal>
                <ErrorModal open={ErrormodalOpen} close={CloseErrormodal} main="장바구니에 주식을 추가하세요" header="error"></ErrorModal>

                
            </section>
            </>
    )
}

export default SelectStockForm;