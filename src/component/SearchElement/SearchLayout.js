import SearchBar from "./SearchBar";
import {useState, useEffect} from 'react';
import classes from './SearchLayout.module.css';
import {useNavigate} from 'react-router-dom';
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


function SearchLayout(){ 

    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false);
    const [afterFirstFetch, setafterFirstFetch] = useState(false);

    const uuid = sessionStorage.getItem('uuid');        // uuid sessionStorage에서 불러오기

    /* 즐겨찾기 목록 dummy data */
    const [tostr, settostr] = useState([])  


    

    // 검색리스트 저장 변수. 초기데이터 : KOSPI 상위 10개 주식

    const [SearchresultStockList, setSearchresultStockList] = useState(['삼성전자', 'LG에너지솔루션', 'SK하이닉스', '삼성바이오로직스', '삼성전자우', 'LG화학', 'NAVER', '현대차', '삼성SDI', '기아']);     
    
    const [SearchresultPriceList, setSearchresultPriceList] = useState([]);        //  검색리스트의 price 저장 변수



    // 주식 눌렀을때, chart 페이지로 이동. 해당 주식정보 chart 페이지로 전송
    function selectHandler(params){                 
        navigate('/home/chart',{state:{
            code: params
        }}
        )
    }



    //  즐겨찾기 버튼 눌렀을때의 동작
    function EnjoySearchHandler(item){           

        if(!tostr.includes(item)){      
            settostr([item, ...tostr]); 
        }
        else{
            settostr(tostr.filter(x=> x !== item))
        }
    }

    //  tostr 변할때마다, 변한 tostr 배열 서버에 보내기
    useEffect(()=>{

        if(afterFirstFetch){
            fetch(`http://haniumproject.com:8000/setUserFavList`,{
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
                console.log("즐겨찾기 변경 완료");
            });
        }
        

    },[tostr]);


    // 즐겨찾기 목록에 있는 주식이름인지 체크하는 함수. item이 즐겨찾기 목록에 있는 주식이름이라면, 버튼색깔 변경
    function InEnjoyList(item){

        for(let i = 0; i < tostr.length; i++){
            if(tostr[i] === item){
                return true;
            }
        }
        return false;
    }


    // 검색페이지 최초 랜더링시, 즐겨찾기 목록 서버에서 가져옴.

    useEffect(()=>{
        fetch(`http://haniumproject.com:8000/getUserAccount`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${uuid}`
            }
        })
        .then( response => response.json())
        .then( data => {
            console.log(data)
            settostr(data.favlist.split(","));
            console.log('즐겨찾기 불러오기 완료');
            setafterFirstFetch(true);
        });
    },[])

    


    //  검색결과 리스트가 변할때마다,  서버에서 해당 리스트의 price 리스트를 받아옴.
    useEffect(()=>{                 
        
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


    // 즐겨찾기 버튼을 삼항연산자로 나눈다.
    // return 값이 boolean인 InEnjoyList 함수에 각 item을 넣고,  
    //                      tostr에 있는 item이면 노란별 띄우기
    //                      tostr에 없는 item이면 흰별 띄우기

    return(
        <>
            
            <SearchBar setsearchResult={setSearchresultStockList} />
             
            <section className={classes.Searchbox}>
                <ul className={classes.SearchresultStockList}>
                    <section className={classes.sec1}>
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
                        <section className={classes.sec2}>
                            { SearchresultStockList.map((item) =>{
                            return(<> 
                                <li className={classes.pricelist}>
                                    <Loadingprice/>
                                </li>

                            </>
                            )
                            }) }
                        </section> 
                        
                        :

                        <section className={classes.sec2}>
                            { SearchresultPriceList.map((price) =>{
                            return(<> 
                                <li className={classes.pricelist}>
                                    <span>{price}</span>
                                </li>

                            </>
                            )
                            }) }

                        </section>
                    }    

                    <section className={classes.sec3}>
                        { SearchresultStockList.map((item) => {
                            return(<>
                                <li className={classes.btnlist}>

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
        
            </section>
            
        </>
    )
}

export default SearchLayout;