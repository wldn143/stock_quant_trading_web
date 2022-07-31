import SearchBar from "../PopolElement/SearchBar";
import {useState, useEffect} from 'react';
import classes from './SearchLayout.module.css';
import {useNavigate} from 'react-router-dom';
import Loadingprice from "../layout/Loadingprice";

function SearchLayout(){    
    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false);


    const [SearchresultStockList, setSearchresultStockList] = useState([]);         //  검색리스트 저장 변수
    const [SearchresultPriceList, setSearchresultPriceList] = useState([]);        //  검색리스트의 price 저장 변수



    function selectHandler(params){                 // 주식 눌렀을때, chart 페이지로 이동. 해당 주식정보 chart 페이지로 전송
        navigate('/home/chart',{state:{
            code: params
        }}
            
        )
    }


    function EnjoySearchHandler(params){             //  즐겨찾기 버튼 눌렀을때의 동작
         fetch('',{
            method:'POST',
            body:JSON.stringify({
                code: params
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
         }).then()
    }


    useEffect(()=>{                 //  검색결과 리스트가 변할때마다,  서버에서 해당 리스트의 price 리스트를 받아옴.
        


        setisLoading(true);

        fetch('http://54.215.210.171:8000/getPreview',{
            method: 'POST',
            body:JSON.stringify({    
                code: SearchresultStockList        
            }),
            headers:{
                'Content-Type' : './application.json'
            }
        }).then( response => response.json())
        .then( data => {
            setSearchresultPriceList(data);                                 //  받아서 검색결과Price 리스트에 저장
            
            setisLoading(false);
        })


    },[SearchresultStockList]);





    //  getPreview를 통해서, 주식이름 리스트의 가격리스트를 받아오는 로딩시간 너무 길다.

    //  따라서, 비동기적 구현으로  주식이름 리스트를 먼저띄운뒤,    로딩스피너를 통해   가격리스트에 로딩상태를 띄운다.

    //  가격리스트가 수신 완료되면,  로딩상태를 가격리스트로 치환한다!!

    return(
        <>
            
            <SearchBar setsearchResult={setSearchresultStockList}/>
             
            <section className={classes.Searchbox} >
                <ul className={classes.SearchresultStockList}>
                    <section>
                        {  SearchresultStockList.map((item)=>{
                            return(
                                <li onClick={()=> selectHandler(item)} className={classes.stocklist}>
                                    <span>{item}</span>
                                </li>
                            )
                        })

                        }
                    </section>

                    {isLoading? 
                        <section>
                            { SearchresultStockList.map((price) =>{
                            return(<> 
                                <li className={classes.pricelist}>
                                    <Loadingprice/>
                                    <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandler(price)}>o</button>
                                </li>

                            </>
                            )
                            }) }
                        </section> 
                        
                        :

                        <section>
                            { SearchresultPriceList.map((price) =>{
                            return(<> 
                                <li className={classes.pricelist}>
                                    <span>{price}</span>
                                    <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandler(price)}>o</button>
                                </li>

                            </>
                            )
                            }) }

                        </section>
                    }    
                    

                </ul>
        
            </section>
            
        </>
    )
}

export default SearchLayout;