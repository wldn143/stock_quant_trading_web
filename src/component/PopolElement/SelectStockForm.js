import SearchBar from "./SearchBar";
import classes from "./SelectStockForm.module.css"

import {useEffect, useState} from 'react';
import Modal from "./Modals/Modal";
import ErrorModal from "./Modals/ErrorModal";

import Loadingprice from "../layout/Loadingprice";



function SelectStockForm(){

    let [isLoadingcart, setisLoadingcart] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);             // 자본선택 modal 창 관리 변수

    const [searchResultStock, setsearchResultStock] = useState([]);         //  검색리스트의 stockname 저장 변수
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




    function deleteHandler(item){             //   장바구니 x 버튼 눌렀을때

        setstockCartStock(stockCartStock.filter( x => x !== item ));     // 주식이름 리스트에서 filter로 제거

    }


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