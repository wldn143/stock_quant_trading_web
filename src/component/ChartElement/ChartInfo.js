import React, { useEffect, useState } from "react";
import classes2 from './ChartInfo.module.css'
import classes from "../HomeElement/MainChart.module.css";
import DrawChart from "../HomeElement/DrawChart";
import Loading from "../layout/Loading2";
import styled from "styled-components";

const ResultContainer=styled.div`
    height:275px;
    width:407px;
    display:flex;
    flex-direction:column;
    justify-content: end;
    box-shadow:  3px 5px 5px 5px #eeeeee;
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
    //const [stockInfo,setStockInfo]=useState([]);
    let [loading, setLoading] = useState(true);
    let [chartDataObj1, setchartDataObj1] = useState(null); 
    const [isLoading, setisLoading] = useState(false);
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
        <input className={classes2.search} type='text' value={keyword} onChange={onChange} placeholder='종목명을 입력하세요'/>

        <ResultContainer>
        {loading?<Loading/>:
            <>        
            {result.map((stock)=>{
                return(
                <ResultBtn key={stock.code}><NameContainer>{stock.name}</NameContainer><CodeContainer>{stock.code}</CodeContainer></ResultBtn>
            )})}
            </>}
        </ResultContainer>
            
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