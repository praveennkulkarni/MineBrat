import React, { useState, useEffect } from "react";
import Result from "./Result";

const ListOfCities = ({ stateName, statesList }) => {
  const [citiesList, setCitiesList] = useState(null);
  const [cityName, setCityName] = useState("");
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const selectedState = statesList.filter((item) => {
      return item.stateName === stateName;
    });
    console.log(selectedState[0].stateId);
    const fetchData = async () => {
      const res = await fetch(
        `http://api.minebrat.com/api/v1/states/cities/${selectedState[0].stateId}`
      );
      const data = await res.json();
      console.log(data);
      setCitiesList(data);
    };
    fetchData();
  }, []);
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (citiesList) {
  //     setDisplay(true);
  //   }
  // };
  const handleOptionChange = (e) => {
    e.preventDefault();
    setCityName(e.target.value);
    if (citiesList) {
      setDisplay(true);
    }
  };
  return (
    <div>
      <form>
        <select onChange={handleOptionChange}>
          {citiesList &&
            citiesList.map((item) => {
              return (
                <option key={item.cityId} value={item.cityName}>
                  {item.cityName}
                </option>
              );
            })}
        </select>
        {/* <button onClick={handleClick}>Submit</button> */}
      </form>
      <div>
        {display && <Result cityName={cityName} stateName={stateName} />}
      </div>
    </div>
  );
};

export default ListOfCities;
