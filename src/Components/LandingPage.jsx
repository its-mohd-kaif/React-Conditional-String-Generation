import React, { useState } from "react";
import { useEffect } from "react";
import Rule from "./Rule";
function LandingPage() {
  // state for stored all data rule group forms
  const [ruleComponent, setRuleComponent] = useState([]);
  // state for strore conditions
  const [condition, setCondition] = useState("||");
  // state for store query string
  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    let randomId = Math.floor(Math.random() * 21212121);
    let obj = {
      id: randomId,
      str: {
        type: "",
        condition: "",
        value: "",
      },
    };
    setRuleComponent([...ruleComponent, obj]);
  }, []);

  useEffect(() => {
    let myString = objectArrayToString(ruleComponent, condition);
    setQueryString(myString);
  }, [ruleComponent, condition]);

  /**
   * method fo make dynamic query string
   * @param {*} objArray data of rules forms input
   * @param {*} optr select condition
   * @returns query string
   */
  function objectArrayToString(objArray, optr) {
    const strArray = objArray.map((obj) => {
      const { type, condition, value } = obj.str;
      if (optr === "||") {
        return ` ( ${type} ${condition} ${value} ) `;
      } else {
        return ` ${type} ${condition} ${value} `;
      }
    });

    if (optr === "&&") {
      return strArray.length > 1
        ? `(${strArray.join(` ${optr} `)})`
        : strArray[0];
    } else if (optr === "||") {
      return strArray.length > 1
        ? `${strArray.join(` ${optr} `)}`
        : strArray[0];
    } else {
      return "";
    }
  }
  const addMoreHandler = () => {
    let randomId = Math.floor(Math.random() * 21212121);
    let obj = {
      id: randomId,
      str: {
        type: "",
        condition: "",
        value: "",
      },
    };
    setRuleComponent([...ruleComponent, obj]);
  };

  const deleteRuleHandler = (id) => {
    const updatedComponent = ruleComponent.filter(
      (element) => element.id !== id
    );
    setRuleComponent(updatedComponent);
  };
  return (
    <div className="mt-2" style={{ width: "50%", margin: "auto" }}>
      <h1>Rule Group</h1>
      <div class="d-flex justify-content-between">
        <h6>Products must match</h6>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onClick={() => {
              setCondition("||");
            }}
            value={condition}
            checked={condition === "||" ? true : false}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Any Condition
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked={condition === "&&" ? true : false}
            onClick={() => {
              setCondition("&&");
            }}
            value={condition}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            All Conditions
          </label>
        </div>
      </div>
      {ruleComponent.map((val) => (
        <div key={val.id} class="d-flex justify-content-between">
          <Rule
            setRuleComponent={setRuleComponent}
            id={val.id}
            parentType={val.str.type}
            parentCondition={val.str.condition}
            parentValue={val.str.value}
          />
          {ruleComponent.length > 1 ? (
            <button
              onClick={() => deleteRuleHandler(val.id)}
              type="button"
              class="btn btn-danger m-3"
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
      <button onClick={addMoreHandler} type="button" class="btn btn-dark mt-3">
        Add More
      </button>

      <div class="d-flex mt-3">
        <p>Current Condition : </p>
        {queryString !== "" ? <p className="ms-5">{queryString}</p> : null}
      </div>
    </div>
  );
}

export default LandingPage;
