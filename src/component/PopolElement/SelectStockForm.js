import SearchBar from "./SearchBar";
import classes from "./SelectStockForm.module.css"

import {useEffect, useState} from 'react';
import Modal from "./Modals/Modal";
import ErrorModal from "./Modals/ErrorModal";



function SelectStockForm(){


    const [modalOpen, setModalOpen] = useState(false);             // 자본선택 modal 창 관리 변수

    const [searchResult, setsearchResult] = useState([]);         //  검색리스트 저장 변수
    const [searchResultPrice, setsearchResultPrice] = useState([]);        //  검색리스트의 {name:, price:} 저장 변수


    const [stockCart, setstockCart] = useState([]);             //   장바구니리스트 저장 변수

    const [stockCartTemp, setstockCartTemp] = useState([]);

    const [stockCartPrice, setstockCartPrice] = useState([]);        //  장바구니리스트의 {name:, price:} 저장 변수

    const [ErrormodalOpen, setErrormodalOpen] = useState(false);

    function OpenErrormodal(){
        setErrormodalOpen(true);
    }





    function CloseErrormodal(){
        setErrormodalOpen(false);
    }


    function openModal(){  
        if(stockCart.length === 0){
            OpenErrormodal();
            return;
        }
    
        setModalOpen(true);
    };

    function closeModal() {
        setModalOpen(false);
    };


    function selectHandler(parname, parprice){             // 검색리스트에서 주식 클릭시, 해당 주식명 params으로 받기

        if(!stockCart.includes(parname) ){            //  장바구니리스트에 이미 있는 주식인지 체크

            setstockCartPrice([...stockCartPrice, {name:parname, price:parprice}]);       // 장바구니리스트 추가
            setstockCart([...stockCart, parname]);
        } 
    }


   function deleteHandler(params){             //  장바구니 리스트에서 x 버튼 클릭시, 해당 주식 삭제

                                            // stockCart에서 제외하고 난뒤, 그걸 토대로 stockCartPrice에서 제외하기 떄문에
                                            // stockCart에 의존하는 콜백함수 필요. 하지만 stockCart는 장바구니 추가시에도 변경되는 변수이므로
                                            // stockCartTemp를 따로 또 만들어서 useEffect에 삽입!!

        setstockCartTemp(stockCart.filter( x => x !== params ));
        setstockCart(stockCart.filter( x => x !== params ));

    }

    useEffect(()=>{
        setstockCartPrice(stockCartPrice.filter( x => stockCartTemp.includes(x.name)));  
    },[stockCartTemp])

    





    useEffect(()=>{
        

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({
                code: searchResult
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            let temp = [];
            for(let i = 0; i < searchResult.length; i++){
                temp.push({name: searchResult[i], prcie: data[i]});
            }

            setsearchResultPrice(temp);
        })


        // let temp = [];
        // for(let i = 0; i < searchResult.length; i++){
        //     temp.push({name: searchResult[i], price: "1"});
        // }

        // setsearchResultPrice(temp);

    },[searchResult]);

   
    

    // map을 이용하여,  변경사항 반영된 검색리스트, 장바구니리스트  화면에 출력

    return(
        <>
            <SearchBar setsearchResult={setsearchResult}/>
            <section className={classes.box} >
                <ul className={classes.resultList}>
                    {searchResultPrice.map((item) =>{
                        return(
                            <li onClick={()=>selectHandler(item.name, item.price)}>{item.name} <span>{item.price}</span></li>
                        )
                    }) }

                
                </ul>

                <ul className={classes.cartList}>
                    <h2> 장바구니 </h2>

                    {stockCartPrice.map((item)=>{
                        return(
                            <li>
                                <span>{item.name}</span> 
                                <section>
                                    <span>{item.price}</span>
                                    <button className={classes.deletebtn} onClick={()=>deleteHandler(item.name)}>x</button> 
                                </section>
                                
                            </li>
                        )

                    })}

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