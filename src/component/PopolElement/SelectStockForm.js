import SearchBar from "../SearchElement/SearchBar";
import classes from "./SelectStockForm.module.css"

import {useEffect, useState} from 'react';
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


// TODO 1 : 장바구니 주식 리스트, 서버로 전송하는 로직. (설정금액과 한꺼번에 전송할건지 아닌지)

// TODO 2 : 주식리스트, 주식가격, 즐겨찾기 버튼   하나의 바로 보이게 디자인 수정


function SelectStockForm(){

    let [isLoadingcart, setisLoadingcart] = useState(false);

    const uuid = sessionStorage.getItem('uuid');        // uuid sessionStorage에서 불러오기

    /* 즐겨찾기 목록 dummy data */
    const [tostr, settostr] = useState(['삼성전자','SK하이닉스']) 


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

        console.log(tostr);
        
        // fetch(`http://haniumproject.com/setUserFavList/${uuid}/${tostr}`)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     console.log("done fetch2");
        // });
    }


    function deleteHandler(item){             //   장바구니 x 버튼 눌렀을때

        setstockCartStock(stockCartStock.filter( x => x !== item ));     // 주식이름 리스트에서 filter로 제거

    }




    // 검색페이지 최초 랜더링시, 즐겨찾기 목록 서버에서 가져옴.
    useEffect(()=>{
        fetch(`http://haniumproject.com/getUserAccount/${uuid}`)
        .then( response => response.json())
        .then( data => {
            console.log(data)
            settostr(data.favlist.split(","));
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
                                <li className={classes.Formstocklist}>
                                    <span>{item}</span> 
                                    <button className={classes.deletebtn} onClick={()=>deleteHandler(item)}>x</button> 
                                </li>
                            )
                        })}
                    </section>
                    


                </ul>
                    

                



                <button className={classes.submitbtn} onClick={openModal}>선택 완료
                
                </button>
                
                <Modal open={modalOpen} close={closeModal}>
                    
                </Modal>
                <ErrorModal open={ErrormodalOpen} close={CloseErrormodal} main="장바구니에 주식을 추가하세요" header="error"></ErrorModal>

                
            </section>
            </>
    )
}

export default SelectStockForm;