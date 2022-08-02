

import classes from './SearchBar.module.css';
import { useEffect, useState} from 'react';


function SearchBar({setsearchResult}){


    /* 자동완성 dummy data */
    // let serverData=['삼성전자','한화','SK','삼성전자우','SK하이닉스', '한화투자증권'];


    /* 서버에서 받아온 주식데이터 */    
    let [serverData, setserverData] = useState([]);




    let [autoSearchResult, setautoSearchResult] = useState([]);  // 자동완성 결과 저장 변수
    let [inputValue, setinputValue] = useState();      //  검색값 저장 변수
   
    

    function inputChange(e){            // inputChange시 핸들링.   함수재활용 위해서, 애초에 e.target.value로 넘겨받음

        setinputValue(e);          
        let data = e;

        let filterdata = [];    

        filterdata = serverData.filter((x) =>               // filter함수를 통하여, 자동완성 결과 배열 구성
            x.toLowerCase().includes(data.toLowerCase())
        );

        filterdata = filterdata.slice(0,10);        // 자동완성 목록 10개로 제한

        if(data.length === 0){              // 아무입력도 없을때, 자동완성 드롭다운 없애기용
            filterdata = [];   
        }

        setautoSearchResult(filterdata);        // filtering 된 자동완성 배열 저장
    }




    /* 돋보기버튼클릭 or 엔터누르면,  SelectStockForm(부모컴포넌트) 에서받아온 set함수에 자동완성변수 삽입 */

    function onClick(){                         
        setsearchResult(autoSearchResult);
    }


    function onKeyPress(e){                     
        if(e.key=="Enter"){
            onClick();
        }
    }


    function autoClick(params){         // 자동완성 변수 클릭시
        setinputValue(params);          // 검색바에 해당값 띄우고
        inputChange(params);            // 자동완성리스트 업데이트
    }


    useEffect(()=>{             // sessionStorage 에서, 주식이름들 데이터 가져오기
        let temp = sessionStorage.getItem('StockNames');
        temp = JSON.parse(temp);        // 배열형태로 변환 필요
        setserverData(temp);
        
    },[])


    return(

        <section className={classes.searchbox}>
            <input
                type="text"
                className={classes.searchbar}
                placeholder="검색어를 입력하세요"
                value={inputValue}
                onKeyPress={onKeyPress}
                onChange={(e)=>inputChange(e.target.value)}
            >
            </input>
            <button className={classes.searchbtn} onClick={onClick}>🔍︎</button>

            {autoSearchResult.map((data) => {
                return(<>
                        <section className={classes.autoSearchResultList} onClick ={() => autoClick(data)}>
                            <span className={classes.autoItem}>{data}</span>
                        
                        </section>
                    </>                    
                )



            })}
            
        </section>


    )
}

export default SearchBar;