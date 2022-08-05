import React, { useEffect, useRef, useState } from "react";
import classes from "./Chart.module.css";
import DrawChart from "../HomeElement/DrawChart";
import Loading from "../layout/Loading2";
import styled from "styled-components";
//로딩중에 검색어 입력하면 filter useEffect 처리 안됨
//차트 3초마다, selectedstock이 바뀌면 리렌더링
const SearchBar = styled.div`
  width: 405px;
  height: 42px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  background-image: url(${require("./searchIcon.png")});
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
  background-image: url(${require("./close.png")});
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
function ChartInfo() {
  const [keyword, setKeyword] = useState(""); //검색키워드
  const [result, setResult] = useState(); //검색된 키워드를 포함하는 종목 배열(자동완성 리스트)
  const [nameToCode, setNameToCode] = useState([]); //{종목명:코드} 객체
  const [stockNames, setStockNames] = useState([]); //종목명 배열
  const [stockCodes, setStockCodes] = useState([]); //코드 배열
  const [selectedStock, setSelectedStock] = useState(["삼성전자", "005930"]); //선택된 종목명,코드 배열
  const stockRef = useRef(["삼성전자", "005930"]); //3초마다 데이터 가져오기위함. 현재 선택된 종목ref
  const [selectedCodePrice, setSelectedCodePrice] = useState([]); //선택된 종목 현재 가격
  let [loading, setLoading] = useState(true);
  let [chartDataObj1, setchartDataObj1] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  let stockInfo = [];

  /*SearchBar */

  //전체 종목명, 코드 데이터 받아오기
  useEffect(() => {
    if (
      nameToCode.length === 0 ||
      stockCodes.length === 0 ||
      stockNames.length === 0
    ) {
      setLoading(true);
      fetch(`http://54.215.210.171:8000/getNameToCode`)
        .then((response) => response.json())
        .then((data) => {
          setNameToCode(data);
          setStockNames(Object.keys(nameToCode)); //전체 종목명 배열
          setStockCodes(Object.values(nameToCode)); //전체 코드 배열
        });
    } else {
      for (let i = 0; i < stockNames.length; i++) {
        stockInfo[i] = { name: stockNames[i], code: stockCodes[i] };
      }
      setLoading(false);
    }
  });

  //검색어처리
  const onChange = (e) => {
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
    setKeyword("");
    setSearchMode(false);
    setSelectedStock([n, c]);
    stockRef.current = [n, c];
    //새로고침 후에 기존검색 내역 가지고가기
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

  /*Chart*/

  useEffect(() => {
    setInterval(() => {
      //선택된 정목의 현재 가격 정보
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
        });

      //차트 데이터 받아오기
      fetch("http://54.215.210.171:8000/getPrice", {
        method: "POST",
        body: JSON.stringify({
          code: stockRef.current[1],
          start: "2022-07-10",
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
          setLoading(false);
        });
      console.log("3초마다 렌더링");
    }, 3000);
  }, []);

  /*차트 그리기*/
  let [chartData1, setchartData1] = useState({
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

  return (
    <>
      <SearchBar>
        <InputBox
          onClick={onSearch}
          ref={wrapperRef}
          type="text"
          value={keyword}
          onChange={onChange}
          placeholder="종목명을 입력하세요"
        />
        <DeleteBtn onClick={delKeyword} />
      </SearchBar>

      {searchMode ? (
        <>
          {loading ? (
            <Loading />
          ) : (
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
          )}
        </>
      ) : (
        <></>
      )}

      {selectedStock ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <section className={classes.frame1}>
              <section className={classes.firstblock}>
                <section className={classes.item}>
                  <section className={classes.itemDetail}>
                    <h2>{selectedStock}</h2>
                    <h2 className={classes.itemPrice}>
                      {selectedCodePrice[0]}
                    </h2>
                  </section>
                  <section className={classes.chart}>
                    {chartDataObj1 && <DrawChart props={chartDataObj1} />}
                  </section>
                </section>
              </section>
            </section>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ChartInfo;
