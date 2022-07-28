import SearchBar from "./SearchBar";
import classes from "./SelectStockForm.module.css"

import {useState} from 'react';
import Modal from "./Modals/Modal";



function SelectStockForm(){

    const [modalOpen, setModalOpen] = useState(false);             // 자본선택 modal 창 관리 변수

    const [searchResult, setsearchResult] = useState([]);         //  검색리스트 저장 변수
    const [stockCart, setstockCart] = useState([]);             //   장바구니리스트 저장 변수



    const openModal = () => {     
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    function selectHandler(params){             // 검색리스트에서 주식 클릭시, 해당 주식명 params으로 받기
        if(!stockCart.includes(params)){            //  장바구니리스트에 이미 있는 주식인지 체크
            setstockCart([...stockCart, params]);       // 장바구니리스트 추가
        }              
    }

    function deleteHandler(params){             //  장바구니 리스트에서 x 버튼 클릭시, 해당 주식 삭제
        setstockCart(stockCart.filter(x=>x !== params));    
    }

   
    

    // map을 이용하여,  변경사항 반영된 검색리스트, 장바구니리스트  화면에 출력

    return(
        <>
            <SearchBar setsearchResult={setsearchResult}/>
            <section className={classes.box} >
                <ul className={classes.resultList}>
                    {searchResult.map((item) =>{
                        return(
                            <li onClick={()=>selectHandler(item)}>{item}</li>
                        )
                    }) }

                </ul>

                

                <ul className={classes.cartList}>
                    <h2> 장바구니 </h2>

                    {stockCart.map((item)=>{
                        return(
                            <li><span>{item}</span> <button onClick={()=>deleteHandler(item)}>x</button> </li>
                        )
                    })}
                </ul>

                <button className={classes.submitbtn} onClick={openModal}>선택 완료
                
                </button>
                
                <Modal open={modalOpen} close={closeModal}>
                    
                </Modal>

                
            </section>
            </>
    )
}

export default SelectStockForm;