import SearchBar from "../PopolElement/SearchBar";
import {useState, useEffect} from 'react';
import classes from './SearchLayout.module.css';
import {useNavigate} from 'react-router-dom';
import Loadingprice from "../layout/Loadingprice";




// TODO 1 : Session Storage에 저장된 FavList 배열형태 tostr 에 저장

// TODO 2 : SearchResultStockList 가 변할때마다 랜더링되는 useEffect 에,  
//           tostr에 포함되있는 StockList가 있는지 검사. 검사후, Enjoybtn 색깔 변하게 처리

// TODO 3 : Enjoybtn 클릭시, FavList에 있는 주식인지 검사. 
//              tostr에 없는주식이라면 ->  tostr에 추가후 서버에 set
//              tostr에 있는주식이라면 ->  tostr에서 제거후 서버에 set

//              그후, rerender해서, 해당화면의 버튼색깔 변경해줘야함!


// 그냥 button list를 따로 만드는게 낳을듯.


function SearchLayout(){ 

    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false);

    const uuid = sessionStorage.getItem('uuid');        // uuid sessionStorage에서 불러오기

    const [tostr, settostr] = useState(JSON.parse(sessionStorage.getItem('FavLlist')));     // 즐겨찾기 목록 sessionStorage에서 불러오기


    


    const [SearchresultStockList, setSearchresultStockList] = useState([]);         //  검색리스트 저장 변수
    const [SearchresultPriceList, setSearchresultPriceList] = useState([]);        //  검색리스트의 price 저장 변수



    function selectHandler(params){                 // 주식 눌렀을때, chart 페이지로 이동. 해당 주식정보 chart 페이지로 전송
        navigate('/home/chart',{state:{
            code: params
        }}
        )
    }


    function EnjoySearchHandler(item){             //  즐겨찾기 버튼 눌렀을때의 동작

        if(!tostr.includes(item)){      
            settostr([...tostr, item]);
        }
        else{
            settostr(tostr.filter(x=> x !== item))
        }

        settostr(JSON.stringify(tostr));

        console.log(uuid);

        fetch(`http://haniumproject.com/getUserAccount/${uuid}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log("done fetch1");
        });
        
        fetch(`http://haniumproject.com/setUserFavList/${uuid}/${tostr}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("done fetch2");
        });
    }




    useEffect(()=>{                 //  검색결과 리스트가 변할때마다,  서버에서 해당 리스트의 price 리스트를 받아옴.
        
        setisLoading(true);



        // 즐겨찾기 목록에 있는 주식이름인지 체크. 즐겨찾기 목록에 있는 주식이름이라면, 버튼색깔 변경

        for(let i = 0; i < SearchresultStockList.length; i++){
            for(let j = 0; j < tostr.length; j++){
                if(SearchresultStockList[i] === tostr[j]){
                    // 버튼색깔 바꿔주기
                }
            }
        }




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
                            { SearchresultStockList.map((item) =>{
                            return(<> 
                                <li className={classes.pricelist}>
                                    <Loadingprice/>
                                    <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandler(item)}>o</button>
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
                                    <button className={classes.Enjoybtn} onClick={()=>EnjoySearchHandlerPrice(price, idx)}>o</button>
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