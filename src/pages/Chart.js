import AfterLogin from "../component/layout/AfterLogin";
import styled from "styled-components";
import ChartInfo from "../component/ChartElement/ChartInfo";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 70px;
`;
const Title = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
`;
const Contents = styled.div`
  width: 45%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function ChartPage() {
  return (
    <>
      <AfterLogin>
        <Layout>
          <Title>
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>
              📈 실시간 차트
            </div>
          </Title>
          <Contents>
            <ChartInfo />
          </Contents>
        </Layout>
      </AfterLogin>
    </>
  );
}

export default ChartPage;
