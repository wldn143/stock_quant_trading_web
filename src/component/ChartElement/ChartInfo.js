import React, { useEffect, useRef, useState } from "react";
import classes from "../HomeElement/MainChart.module.css";
import DrawChart from "../HomeElement/DrawChart";
import Loading from "../layout/Loading2";
import styled from "styled-components";

const SearchActiveBtn=styled.div`
    width: 350px;
    height: 35px;
    border:none;
    border-radius:8px;
    color:#545454;
    font-size:15px;
    background-color:#f2f2f2;
    cursor:pointer;
`
const SearchBar=styled.input`
    width: 400px;
    height: 42px;
    background-color:#f2f2f2;
    border:none;
    border-radius:8px;
    font-size:17px;
`
const ResultBtn=styled.button`
    height:52px;
    width:100%;
    cursor:pointer;
    border:none;
    text-align: left;   
    display:flex;
    flex-direction:column;
    background-color:#ffffff;
    &:hover {
        background-color:#f2f2f2;
    }
`
const CodeContainer=styled.div`
    color: #9c9c9c;
    height:15px;
    font-size:15px;
`
const NameContainer=styled.div`
    height:20px;
    font-size:17px;
`
function ChartInfo(){
    const [keyword, setKeyword]=useState('');//검색키워드
    const [result, setResult]=useState(); //검색된 키워드를 포함하는 종목 배열(자동완성 리스트)
    const [nameToCode, setNameToCode]=useState([])//{종목명:코드} 객체
    const [stockNames, setStockNames]=useState([])//종목명 배열
    const [stockCodes, setStockCodes]=useState([])//코드 배열
    let [loading, setLoading] = useState(true);
    let [chartDataObj1, setchartDataObj1] = useState(null); 
    const [isLoading, setisLoading] = useState(false);
    const [searchMode, setSearchMode]=useState(false);
    const wrapperRef=useRef(null);
    useOutsideAlerter(wrapperRef);
    let stockInfo=[];
    //종목명:코드 데이터 
    useEffect(()=>{ 
        setisLoading(true);
        if(nameToCode.length===0||stockCodes.length===0||stockNames.length===0){
        fetch(`http://54.215.210.171:8000/getNameToCode`)
        .then( response =>  response.json() )
        .then( data => {
            setNameToCode(data);
            setStockNames(Object.keys(nameToCode)) //전체 종목명 배열
            setStockCodes(Object.values(nameToCode)) //전체 코드 배열
        })
    }
    else{
        //{name:"동화약품",code:"000020"}
        for(let i=0; i<stockNames.length; i++){
            stockInfo[i]={name:stockNames[i], code:stockCodes[i]}
        }
        setLoading(false);
    }
    });

    //검색어처리
    const onChange=(e)=>{
        setKeyword(e.target.value)
    }

    function onSearch(){
        setSearchMode(true);
    }

    //검색어 포함하는 종목명을 배열로 filter
    useEffect(()=>{ 
        if(keyword!==''){
            const temp=stockInfo.filter((item)=>item.name.includes(keyword)).slice(0,5);
            setResult(temp)
        }
        else{
            setResult([])
        }
    },[keyword])

    //검색창클릭시에만 검색 컨테이너 표시
    function useOutsideAlerter(ref) {
        function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setSearchMode(false);
        }
        }
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

        /*차트 그리기*/
        let [chartData1, setchartData1] = useState({ 
            Open: {'keys':'values'},
            High: {'keys':'values'},
            Low:{'keys':'values'},
            Close:{'keys': 'values'}
        });
    
        function parsing1(){ 
            setchartDataObj1({
                date: Object.keys(chartData1.Open),
                open: Object.values(chartData1.Open),
                high: Object.values(chartData1.High),
                low: Object.values(chartData1.Low),
                close: Object.values(chartData1.Close)
            })
        }
    
        //차트 데이터 받아오기
        // useEffect(()=>{
        //     fetch('http://54.215.210.171:8000/getPrice',{
        //         method: 'POST',
        //         body: JSON.stringify({
        //             'code': '005930',
        //             'start': '2022-07-10'
        //         }),
        //         headers:{
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(response => {return response.json()})
        //     .then(data => {
        //         setchartData1(data);
        //         setLoading(false);
        //     }) 
        // },[])
    
        useEffect(()=>{
           parsing1(); 
        },[chartData1])

    return(
        <>
        <SearchActiveBtn onClick={onSearch} ref={wrapperRef}>
        {searchMode?<>{loading?<Loading/>:<><SearchBar type='text' value={keyword} onChange={onChange} placeholder="종목명을 입력하세요."/>
                
                <div style={{height:`${result.length*52}px`, width:'407px'}}>        
                
                {result.map((stock)=>{
                    return(
                    <ResultBtn key={stock.code}><NameContainer>{stock.name}</NameContainer><CodeContainer>{stock.code}</CodeContainer></ResultBtn>
                )})}

                </div>
                
                </>}</>
                :<>검색</>}
                </SearchActiveBtn>
        {/* {
            result!==undefined&&result.length?<>
            {loading?<Loading/>:
                <div style={{borderWidth: 0.5, borderColor: '#9c9c9c',borderStyle: 'solid', borderTop:"none", height:`${result.length*52}px`, width:'407px'}}>        
                {result.map((stock)=>{
                    return(
                    <ResultBtn key={stock.code}><NameContainer>{stock.name}</NameContainer><CodeContainer>{stock.code}</CodeContainer></ResultBtn>
                )})}
                </div>}
            </>:<></>
        } */}

            
        {/* {loading ? <Loading/> : 
        <section className={classes.frame1}>
            <section className={classes.firstblock}>
                <section className={classes.item}>
                    <section className={classes.itemDetail}>
                        <h2>Kospi</h2>
                        <h2 className={classes.itemPrice}>Price</h2>
                    </section>
                    <section className={classes.chart}>
                        {chartDataObj1 && <DrawChart props={chartDataObj1}/>}  
                    </section>
                </section>
            </section>   
        </section>
        } */}
        </>
    )
}

export default ChartInfo;