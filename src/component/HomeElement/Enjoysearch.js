import classes from './Enjoysearch.module.css';
import {useEffect, useState} from 'react';


// TODO 1 : 받아온 즐겨찾기 리스트 처음 3개 화면에 출력
// TODO 2 : uuid가 잘 반영되어서 서버로 가는지 체크
// TODO 3 : 서버에서 받아온 즐겨찾기리스트 데이터 parsing 잘 되는지 체크

function Enjoysearch(){


    const uuid = sessionStorage.getItem('uuid');


    // 즐겨찾기 리스트 받아오기

    useEffect(()=>{

        fetch(`http://haniumproject.com/getUserAccount/${uuid}`)
        .then( response => response.json())
        .then( data => {
            console.log(data)
            let temp = data.favlist.split(",");
            sessionStorage.setItem('FavList', JSON.stringify(temp));
        });

    },[])
    



    return <section className={classes.frame2}>
        <h2> 즐겨찾기 </h2>
        
        <table className={classes.table}>
            <thead className={classes.thead}>
                <tr>
                    <th className={classes.tobject}>종목명</th>
                    <th className={classes.tprice}>가격</th>
                </tr>
            </thead>

            <tbody className={classes.tbody}>
                <tr>
                    <th className={classes.tobject}>삼성전자</th>
                    <th className={classes.tprice}>35000</th>
                </tr>
                <tr>
                    <th className={classes.tobject}>LG화학</th>
                    <th className={classes.tprice}>25000</th>
                </tr>
                <tr>
                    <th className={classes.tobject}>SK이노베이션</th>
                    <th className={classes.tprice}>150000</th>
                </tr>
            </tbody>
        </table>
        
    </section>
    
}


export default Enjoysearch;