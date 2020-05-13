import React, { useState } from "react";
import YearlyHistoricalPerformance from "./YearlyHistoricalPerformance";
import "./App.css";
import { LineChart, Line, Label, XAxis, YAxis, Tooltip } from "recharts";
import moment from "moment";

const StockForm = () => {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [stock, setStock] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [performanceData, setPerformanceData] = useState("");
  // const API_CALL = `https://financialmodelingprep.com/api/v3/quote/${tickerSymbol}`;
  const API_CALL = `https://financialmodelingprep.com/api/v3/historical-price-full/${tickerSymbol}?serietype=line`;
  const { symbol } = stock;
  const historical = stock.historical;
  const { historical: stockStats } = stock;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_CALL)
      .then((res) => res.json())
      .then((stock) => {
        setStock(stock);
        setIsSubmitted(true);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTickerSymbol(value);
  };

  const handleHP = () => {
    let performanceData = stockStats.map((instance) => (
      <li key={instance.date}>
        Date: {instance.date} Close: {instance.close}
      </li>
    ));
    setPerformanceData(performanceData);
  };

  return (
    <div className="stockForm">
      <form onSubmit={handleSubmit}>
        <input
          value={tickerSymbol}
          name="tickerSymbol"
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
      <h1>{symbol}</h1>
      <LineChart width={800} height={400} data={historical}>
        <Line type="monotone" stroke="#8884d8" dataKey="close" />
        <XAxis
          dataKey="date"
          tickFormatter={(unixTime) => moment(unixTime).format("MM YY")}
        />
        <Tooltip />
        {stock.historical && (
          <YAxis stroke="blue" axisLine={{ stroke: "#EAF0F4" }}>
            <Label
              value={"Price"}
              position="insideLeft"
              angle={-90}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
        )}
      </LineChart>
      <br />
      <br />
      {/* <ul> */}
      {isSubmitted && (
        // <button onClick={handleHP}>Historical Performance</button>
        <YearlyHistoricalPerformance stock={stock} stockStats={stockStats} />
      )}
      {/* {performanceData} */}
      {/* </ul> */}
    </div>
  );
};
export default StockForm;
