import SearchBar from "./SearchBar";
import classes from "./SelectStockForm.module.css"

import {useState} from 'react';
import Modal from "./Modals/Modal";

function SelectStockForm(){

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };

   
    

    return(
        <>
            <SearchBar/>
            <section className={classes.box} >
                <ul className={classes.resultList}>
                    <li>삼성전자 : 50000 <span></span></li>
                    <li>LG : 140000</li>
                    <li>sdf</li>
                    <li>sdf</li>
                    <li>sdf</li>
                </ul>

                <h2> 장바구니 </h2>

                <ul className={classes.cartList}>
                    <li>삼성전자 : 50000 <span></span></li>
                    <li>LG : 140000</li>
                    <li>sdf</li>
                    <li>sdf</li>
                    <li>sdf</li>
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