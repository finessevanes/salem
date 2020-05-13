import React, { useState } from "react";
import moment from "moment";

const YearlyHistoricalPerformance = (props) => {
  const [displayHistorical, setDisplayHistorical] = useState([]);
  const todaysDate = new Date();

  const getNumDate = (date) => {
    let numDate = "";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    numDate = `${year}${month}${day}`;
    return parseInt(numDate);
  };
  const todaysNumDate = getNumDate(todaysDate);
  const getYtdNumDate = (date) => {
    let ytd = "";
    ytd = date.getFullYear() + "0000";
    return ytd;
  };
  const ytdStats = props.stockStats.filter(
    (instance) => instance.date.replace(/-/g, "") > getYtdNumDate(todaysDate)
  );

  const getYearsNumDate = (numDate, amountYears) => {
    let yearsNumDate = numDate - amountYears * 10000;
    return yearsNumDate;
  };
  const oneYearsNumDate = getYearsNumDate(getNumDate(todaysDate), 1);

  const threeYearsNumDate = getYearsNumDate(getNumDate(todaysDate), 3);
  const fiveYearsNumDate = getYearsNumDate(getNumDate(todaysDate), 5);
  const tenYearsNumDate = getYearsNumDate(getNumDate(todaysDate), 10);
  const maxYearsNumDate = props.stockStats.map((instance) => instance);

  const handleChange = (e) => {
    const years = e.target.value;
    console.log(years);
    if (years === "ytd") {
      let displayHistorical = ytdStats.map((instance) => (
        <li key={instance.date}>
          Date: {moment(new Date(instance.date)).format("MMMM D, Y")} Close:{" "}
          {instance.close}
        </li>
      ));
      setDisplayHistorical(displayHistorical);
    } else if (years === "max") {
      let displayHistorical = props.stockStats.map((instance) => (
        <li key={instance.date}>
          Date: {moment(new Date(instance.date)).format("MMMM D, Y")} Close:{" "}
          {instance.close}
        </li>
      ));
      setDisplayHistorical(displayHistorical);
    } else {
      console.log(`years: ${years}`);
      let yearsNumDate = getYearsNumDate(getNumDate(todaysDate), years);
      let yearsFiltered = props.stockStats.filter(
        (instance) => instance.date.replace(/-/g, "") > yearsNumDate
      );
      let displayHistorical = yearsFiltered.map((instance) => (
        <li key={instance.date}>
          Date: {moment(new Date(instance.date)).format("MMMM D, Y")} Close:{" "}
          {instance.close}
        </li>
      ));
      setDisplayHistorical(displayHistorical);
    }
  };

  return (
    <div>
      <select
        onChange={handleChange}
        name="historicalPerformance"
        value={displayHistorical}
      >
        <option>--- Historical Performance ---</option>
        <option value="ytd">YTD</option>
        <option value="1">1 Year</option>
        <option value="3">3 Year</option>
        <option value="5">5 Year</option>
        <option value="10">10 Year</option>
        <option value="max">Since Inception</option>
      </select>
      {displayHistorical}
    </div>
  );
};

export default YearlyHistoricalPerformance;
