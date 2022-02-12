import React, { useState } from "react";
import Select, { StylesConfig } from 'react-select'

const styles = {
  menu: base => ({
    ...base,
    marginTop: 0,
  }),
  control: provided => ({
    ...provided,
    height: 25,
    border: "1px solid #ff0000",
    borderRadius: "30px",
  }),
  placeholder: (defaultStyles) => {
    return {
        ...defaultStyles,
        color: '#ff0000',
    }
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#ff0000',
    }
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#ffdddd"
    };
  },

}



// Component for the add counselor page multi selectors.
export default function RoundMultiSelector({filters, id, onChange, isQuery, placeholder }) {
  //options here is one list from filters.

  //convert options in format of Select component
  const options = filters.list.map((item, index) => ({value: index, label: item}));
  
  const [optionSelected, setSelectedOptions] = useState([]);

  const handleChangeInner = (selected) => {
    //if this is a query option in the pricing tool it has to be in lowercase
    const optionsSelected = selected.map((item) => isQuery ? item.label.replace(/ /g, "_").toLowerCase():item.label);
    onChange({ id, optionsSelected});
    
    setSelectedOptions(selected);
  };

  
  return (
    <Select
      options={options}
      isLoading={!options}
      closeMenuOnSelect={false}
      onChange={handleChangeInner}
      value={optionSelected}
      id={id}
      styles={styles}
      placeholder={placeholder}
      required
      isMulti
    />
  );
}