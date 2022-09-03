import classes from './Enjoysearch.module.css';
import {useEffect, useState} from 'react';


function Enjoysearch(){


    const uuid = sessionStorage.getItem('uuid');
    let [tostr, settostr] = useState([]);
    let [tostrPrice, settostrPrice] = useState([]);


    // 즐겨찾기 리스트 받아오기

    useEffect(()=>{
        console.log(uuid);
        fetch('http://haniumproject.com:8000/getUserAccount',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${uuid}`
            }
        })
        .then( response => response.json())
        .then( data => {
            console.log(data)
            settostr(data.favlist.split(",").slice(0,3));
            sessionStorage.setItem('balance', data.quantity);
            console.log('즐겨찾기 불러오기 성공');
            
        });
    },[])


    // 즐겨찾기 리스트 가격 받아오기

    useEffect(()=>{
        
        if(tostr.length !== 0){
            fetch('http://54.215.210.171:8000/getPreview',{
                method: 'POST',
                body:JSON.stringify({
                    code: tostr.slice(undefined,3)
                }),
                headers:{
                    'Content-Type' : './application.json'
                }
            }).then( response => response.json())
            .then( data => {
                settostrPrice(data);
                console.log('즐겨찾기 가격들 불러오기 성공');

            })
        }
        
    }, [tostr]);
    



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
                {tostr.map((item,idx)=>{

                    return(
                        <tr>
                            <th className={classes.tobject}>{item}</th>
                            <th className={classes.tprice}>{tostrPrice[idx]}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
    </section>
    
}


export default Enjoysearch;