import AfterLogin from "../component/layout/AfterLogin";
import styled from "styled-components";
import BalanceInfo from "../component/BalanceElement/BalanceInfo"
import StocksInfo from "../component/BalanceElement/StocksInfo"

const Title=styled.div`
    width:25%;
    display:flex;
    justify-content:center;
`
const Contents=styled.div`
    width:75%;
    margin-left: 40px;
`
const Layout=styled.div`
    display:flex;
    flex-direction:row;
    margin-top:70px
`
function BalancePage(){
    return <div>
        <AfterLogin>
            <Layout>
            <Title>
                <div style={{fontSize:"30px", fontWeight:"bold"}}>
                📒 잔고확인
                </div>
            </Title>
            <Contents>
            <BalanceInfo/>
            <StocksInfo/>
            </Contents>
            </Layout>
        </AfterLogin> 
    </div>
}

export default BalancePage;