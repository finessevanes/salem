import React, { useState, useEffect } from "react";

const StockForm = () => {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [stock, setStock] = useState([]);

  // const API_CALL = `https://financialmodelingprep.com/api/v3/quote/${tickerSymbol}`;
  const API_CALL = `https://financialmodelingprep.com/api/v3/historical-price-full/${tickerSymbol}?serietype=line`;

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_CALL)
      .then((res) => res.json())
      .then((stock) => {
        setStock(stock);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setTickerSymbol(value);
  };

  const { symbol } = stock;
  const historical = stock.historical;

  return (
    <div>
      {symbol}
      <br />
      {stock.historical &&
        historical.map((item) => (
          <p>
            Closing price: ${item.close}
            Date: {item.date}
          </p>
        ))}
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          value={tickerSymbol}
          name="tickerSymbol"
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default StockForm;
