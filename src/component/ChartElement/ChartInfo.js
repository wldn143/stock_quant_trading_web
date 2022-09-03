import React, { useEffect, useRef, useState } from "react";
import classes from "./Chart.module.css";
import DrawChart from "../HomeElement/DrawChart";
import Loading from "../layout/Loading2";
import styled from "styled-components";
import filledStar from "./image/filledStar.png";
import emptyStar from "./image/emptyStar.png";
import { useLocation } from "react-router-dom";
import DrawMonthChart from "./DrawMonthChart";
import DayChart from "./DayChart";
import MonthChart from "./MonthChart";
//로딩중에 검색어 입력하면 filter useEffect 처리 안됨
//차트 3초마다, selectedstock이 바뀌면 리렌더링
const SearchBar = styled.div`
  width: 405px;
  height: 42px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  background-image: url(${require("./image/searchIcon.png")});
  background-position: 13px center;
  background-size: 25px;
  background-repeat: no-repeat;
  display: flex;
`;
const InputBox = styled.input`
  width: 75%;
  height: 90%;
  margin-left: 50px;
  border: none;
  background-color: transparent;
  font-size: 17px;
  :focus {
    outline: none;
  }
`;
const DeleteBtn = styled.button`
  width: 25px;
  height: 42px;
  background-image: url(${require("./image/close.png")});
  border: none;
  background-size: 20px;
  background-repeat: no-repeat;
  cursor: pointer;
  background-position: center;
  margin-left: 10px;
  background-color: transparent;
  &:hover {
    background-color: #cdcdcd;
  }
`;
const ResultBtn = styled.button`
  height: 52px;
  width: 100%;
  cursor: pointer;
  border: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 2px;
  &:hover {
    background-color: #f2f2f2;
  }
`;
const CodeContainer = styled.div`
  color: #9c9c9c;
  height: 15px;
  font-size: 15px;
  margin-left: 45px;
`;
const NameContainer = styled.div`
  height: 20px;
  font-size: 17px;
  margin: 5px 0 0 45px;
`;
const FavContainer = styled.div`
  height: 50px;
  width: 700px;
  display: flex;
  border: 1px solid #e3e3e3;
  align-items: center;
  justify-content: end;
`;
const FavBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding-top: 3px;
  &:hover {
    background-color: #f2f2f2;
    border-radius: 5px;
  }
`;
const ChartSelectBtn = styled.button`
  height: 100%;
  width: 50px;
  cursor: pointer;
  border: none;
  &:minActive{
    bacground-color:red;
  }
  .
  `;
const ChartContainer = styled.div`
  border: 1px solid #e3e3e3;
  border-top: none;
  height: 400px;
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChartInfo() {
  const [keyword, setKeyword] = useState(""); //검색키워드
  const [result, setResult] = useState(); //검색된 키워드를 포함하는 종목 배열(자동완성 리스트)
  const { state } = useLocation();
  const [selectedStock, setSelectedStock] = useState(
    state === null ? ["삼성전자", "005930"] : [state.code]
  ); //선택된 종목명,코드 배열.. 검색 페이지에서 종목 가져올 수 있음
  const stockRef = useRef(
    state === null ? ["삼성전자", "005930"] : [state.code]
  ); //3초마다 데이터 가져오기위함. 현재 선택된 종목ref
  const [selectedCodePrice, setSelectedCodePrice] = useState([]); //선택된 종목 현재 가격
  let [loading, setLoading] = useState(true);
  let [chartDataObj1, setchartDataObj1] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [stockInfo, setStockInfo] = useState([]);
  const [tostr, settostr] = useState([]); //즐겨찾기 목록
  const uuid = sessionStorage.getItem("uuid");
  let stockNames = sessionStorage.getItem("StockNames");
  let stockCodes = sessionStorage.getItem("StockCodes");
  stockNames = stockNames.split(",");
  stockCodes = stockCodes.split(",");
  let [stockChange, setStockChange] = useState(false);
  const [chartType, setChartType] = useState("month");
  const [afterFirstFetch, setafterFirstFetch] = useState(false);

  /*SearchBar */
  //전체 종목명, 코드 데이터 받아오기
  useEffect(() => {
    for (let i = 0; i < stockNames.length; i++) {
      stockInfo[i] = { name: stockNames[i], code: stockCodes[i] };
    }
  }, []);

  //검색어처리
  const onChange = (e) => {
    setSearchMode(true);
    setKeyword(e.target.value);
  };
  function onSearch() {
    setSearchMode(true);
  }
  function delKeyword() {
    setKeyword("");
  }

  //검색어 포함하는 종목명을 배열로 filter
  useEffect(() => {
    if (keyword !== "") {
      const temp = stockInfo
        .filter((item) => item.name.includes(keyword))
        .slice(0, 5);
      setResult(temp);
    } else {
      setResult([]);
    }
  }, [keyword]);

  //종목 선택
  function selectStock(n, c) {
    setStockChange(true);
    setKeyword("");
    setSearchMode(false);
    setSelectedStock([n, c]);
    stockRef.current = [n, c];
  }

  //검색창클릭시에만 검색 컨테이너 표시
  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchMode(false);
        setKeyword("");
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  /* 즐겨찾기 */
  //유저의 즐겨찾기 목록 가져오기
  useEffect(() => {
    fetch(`http://haniumproject.com:8000/getUserAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${uuid}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        settostr(data.favlist.split(","));
        setafterFirstFetch(true);
      });
  }, []);

  //tostr 서버에 전송?
  useEffect(() => {
    if (afterFirstFetch) {
      fetch(`http://haniumproject.com:8000/setUserFavList`, {
        method: "POST",
        body: JSON.stringify({
          target: tostr.toString(),
        }),
        headers: {
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${uuid}`
        },
      }).then((response) => response.json());
    }
  }, [tostr]);

  //즐겨찾기 버튼 클릭시
  function EnjoySearchHandler(e) {
    if (!tostr.includes(e)) {
      settostr([e, ...tostr]);
    } else {
      settostr(tostr.filter((x) => x !== e));
    }

    console.log(tostr);
  }
  /*Chart*/

  const interval = useRef(null);
  const chartData = () => {
    //차트 데이터 받아오기
    fetch("http://54.215.210.171:8000/getPrice", {
      method: "POST",
      body: JSON.stringify({
        code: stockRef.current[0],
        start: "2022-06-27",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setchartData1(data);
      });
    fetch("http://54.215.210.171:8000/getPreview", {
      method: "POST",
      body: JSON.stringify({
        code: [stockRef.current[0]],
      }),
      headers: {
        "Content-Type": "./application.json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedCodePrice(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    chartData();
    interval.current = setInterval(setLoading(true), chartData, 10000);
    return () => {
      clearInterval(interval.current);
    };
  }, [stockRef.current[0]]);

  /*차트 그리기*/
  let [chartData1, setchartData1] = useState({
    //서버에서 받아온 차트데이터
    Open: { keys: "values" },
    High: { keys: "values" },
    Low: { keys: "values" },
    Close: { keys: "values" },
  });

  function parsing1() {
    setchartDataObj1({
      date: Object.keys(chartData1.Open),
      open: Object.values(chartData1.Open),
      high: Object.values(chartData1.High),
      low: Object.values(chartData1.Low),
      close: Object.values(chartData1.Close),
    });
  }

  useEffect(() => {
    parsing1();
  }, [chartData1]);

  const handleChartType = (e) => {
    const name = e.target.name;
    setChartType(name);
  };

  const selectChartType = {
    day: <DayChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />,
    month: (
      <MonthChart props={[selectedStock, selectedCodePrice, chartDataObj1]} />
    ),
  };

  return (
    <>
      <SearchBar>
        <InputBox
          onClick={onSearch}
          ref={wrapperRef}
          type="text"
          value={keyword}
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              selectStock(result[0].name, result[0].code);
            }
          }}
          placeholder="종목명을 입력하세요"
        />
        <DeleteBtn onClick={delKeyword} />
      </SearchBar>

      {searchMode ? (
        <>
          {result.length ? (
            <div
              ref={wrapperRef}
              style={{
                position: "relative",
                zIndex: "2",
                height: `${result.length * 52}px`,
                borderRadius: "8px",
                boxShadow: "0px 5px 15px -5px #c8c8c8",
                width: "407px",
              }}
            >
              {result.map((stock) => {
                return (
                  <ResultBtn
                    key={stock.code}
                    onClick={() => {
                      selectStock(stock.name, stock.code);
                    }}
                  >
                    <NameContainer>{stock.name}</NameContainer>
                    <CodeContainer>{stock.code}</CodeContainer>
                  </ResultBtn>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          position: "absolute",
          top: "200px",
          zIndex: "1",
          marginTop: "20px",
        }}
      >
        <FavContainer>
          {loading ? (
            <>
              <ChartSelectBtn onClick={handleChartType} name="day">
                일
              </ChartSelectBtn>
              <ChartSelectBtn onClick={handleChartType} name="month">
                월
              </ChartSelectBtn>
              <FavBtn onClick={() => EnjoySearchHandler(selectedStock[0])}>
                {tostr.includes(selectedStock[0]) ? (
                  <img src={filledStar} width={25} height={25} />
                ) : (
                  <img src={emptyStar} width={25} height={25} />
                )}
              </FavBtn>
              {/* <FavBtn>
                <img src={emptyStar} width={25} height={25} />
              </FavBtn> */}
            </>
          ) : (
            <>
              <ChartSelectBtn onClick={handleChartType} name="day">
                일
              </ChartSelectBtn>
              <ChartSelectBtn onClick={handleChartType} name="month">
                월
              </ChartSelectBtn>
              <FavBtn onClick={() => EnjoySearchHandler(selectedStock[0])}>
                {tostr.includes(selectedStock[0]) ? (
                  <img src={filledStar} width={25} height={25} />
                ) : (
                  <img src={emptyStar} width={25} height={25} />
                )}
              </FavBtn>
            </>
          )}
        </FavContainer>
        <ChartContainer>
          {loading !== true && <>{selectChartType[chartType]}</>}
        </ChartContainer>
      </div>
    </>
  );
}

export default ChartInfo;
