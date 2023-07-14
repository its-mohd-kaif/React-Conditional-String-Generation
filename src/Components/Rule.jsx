import React, { useState, useEffect } from "react";
function Rule(props) {
  const { setRuleComponent, id, parentType, parentCondition, parentValue } =
    props;
  const [conditionOption, setConditionOption] = useState([]);
  const [value, setValue] = useState(parentValue !== "" ? parentValue : "");
  const [state, setState] = useState({
    type: parentType !== "" ? parentType : "",
    condition: parentCondition !== "" ? parentCondition : "",
  });
  const { condition, type } = state;
  const keys = [
    {
      label: "Title",
      value: "title",
    },
    {
      label: "Quantity",
      value: "quantity",
    },
    {
      label: "Price",
      value: "price",
    },
    {
      label: "Brand",
      value: "brand",
    },
  ];
  const stringCondition = [
    {
      label: "Equal",
      value: "==",
    },
    {
      label: "Not Equal",
      value: "!=",
    },
    {
      label: "Contain",
      value: "%LIKE%",
    },
    {
      label: "Not Contain",
      value: "!%LIKE%",
    },
  ];
  const intCondition = [
    {
      label: "Equal",
      value: "==",
    },
    {
      label: "Not Equal",
      value: "!=",
    },
    {
      label: "Less Than equals",
      value: "<=",
    },
    {
      label: "Greater than equals",
      value: ">=",
    },
  ];
  useEffect(() => {
    setConditionOption(stringCondition);
  }, []);
  // update state when user make some rules
  useEffect(() => {
    setRuleComponent((prevRuleComponent) => {
      const updatedRuleComponent = [...prevRuleComponent];
      const index = updatedRuleComponent.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        updatedRuleComponent[index] = {
          ...updatedRuleComponent[index],
          str: {
            type: type,
            condition: condition,
            value: value,
          },
        };
      }
      return updatedRuleComponent;
    });
  }, [type, condition, value]);
  return (
    <div className="mt-3" style={{ width: "90%" }}>
      <div class="d-flex justify-content-between">
        <select
          onChange={(e) => {
            setState({ ...state, type: e.target.value });
            if (e.target.value === "title" || e.target.value === "brand") {
              setConditionOption(stringCondition);
            } else if (
              e.target.value === "quantity" ||
              e.target.value === "price"
            ) {
              setConditionOption(intCondition);
            }
          }}
          class="form-select"
          aria-label="Default select example"
        >
          <option disabled selected>
            -- Select --
          </option>
          {keys.map((val, index) => (
            <option key={index} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            setState({
              ...state,
              condition: e.target.value,
            });
          }}
          class="form-select"
          aria-label="Default select example"
        >
          <option disabled selected>
            -- Select --
          </option>
          {conditionOption.map((val, index) => (
            <option key={index} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
        <div style={{ width: "30%" }}>
          <input
            type="text"
            class="form-control"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Rule;
