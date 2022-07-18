
import classes from './Loginlayout.module.css';

function Loginlayout(){

    const REST_API_KEY = "52750403fc68645f09dd49b6b777a752"
    const REDIRECT_URI = "http://localhost:3000/signup"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;


    return(
        <div>
            <div className={classes.box}>

                <h2 className={classes.name}> 주식 퀀트 트레이딩 </h2>
                <a href={KAKAO_AUTH_URL} >
                    <img src="https://www.gb.go.kr/Main/Images/ko/member/certi_kakao_login.png"className={classes.btn}>

                    </img>
                </a>

            </div>
            

        </div>
    )
}

export default Loginlayout;