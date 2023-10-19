import React, { useState, useEffect } from "react";
import ListOfCities from "./ListOfCities";

const StatesList = () => {
  const [statesList, setStatesList] = useState(null);
  const [stateName, setStateName] = useState("");
  const [display, setDisplay] = useState(false);
  const fetchStates = async () => {
    const res = await fetch("http://api.minebrat.com/api/v1/states");
    const data = await res.json();
    console.log(data);
    setStatesList(data);
  };
  useEffect(() => {
    fetchStates();
  }, []);
  const handleOptionChange = (e) => {
    e.preventDefault();
    // console.log(e.target[35].__reactFiber$4me6sso9ls8.key);
    console.log("clicked");
    console.log(e);
    console.log(e.target.value);
    setStateName(e.target.value);
    if (statesList) {
      setDisplay(true);
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (statesList) {
  //     setDisplay(true);
  //   }
  // };
  return (
    <div>
      <div>
        <form>
          <select onChange={handleOptionChange}>
            {statesList &&
              statesList.map((item) => {
                return (
                  <option
                    id={item.stateId}
                    key={item.stateId}
                    value={item.stateName}
                  >
                    {item.stateName}
                  </option>
                );
              })}
          </select>
          {/* <button onClick={handleSubmit}>Submit</button> */}
        </form>
      </div>
      <div>
        {display && (
          <ListOfCities statesList={statesList} stateName={stateName} />
        )}
      </div>
    </div>
  );
};

export default StatesList;
