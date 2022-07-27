import React, { useEffect, useState } from "react";
import classes from './ChartInfo.module.css'
function ChartInfo(){
    const [search, setSearch]=useState('');//검색창
    const onChange=(e)=>{
        setSearch(e.target.value)
        console.log(search)
    }
useEffect(()=>{
    fetch('http://54.215.210.171:8000/getPrice',{
        method: 'POST',
        body: JSON.stringify({
            'code': '005930',
            'start': '2022-06-25'
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(response => {return response.json()})
    .then(data => {
        console.log(data)
    }) 
},[])

    return(
        <>
        <input className={classes.search} type='text' value={search} onChange={onChange} placeholder='종목명 또는 코드를 입력하세요'/>
        </>
    )
}

export default ChartInfo;