import React, { useState } from "react";
import Select, { StylesConfig } from 'react-select'
import { useMediaQuery } from 'react-responsive'

// Component for the add counselor page multi selectors.
export default function RoundMultiSelector({filters, id, onChange, isQuery, placeholder }) {
  const isMobile = useMediaQuery({ query: '(max-device-width: 576px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 1024px)' })

  const styles = {
    menu: base => ({
      ...base,
      marginTop: 0,
      fontSize: isMobile ? "48px" :  isTablet ? "72px" : "18px",
    }),
    control: provided => ({
      ...provided,
      height: isMobile ? 84 : isTablet ? 120 : 25,
      border: isMobile ? "3px solid #ff0000" : isTablet ? "1px solid #ff0000" : "1px solid #ff0000",
      borderRadius: "30px",
      fontSize: isMobile ? "48px" :  isTablet ? "72px" : "18px",
    }),
    placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          color: '#ff0000',
          fontSize: isMobile ? "48px" :  isTablet ? "72px" : "18px",
          fontWeight: isMobile ? "bold" :  isTablet ? "none" : "none",
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#ff0000',
        fontSize: isMobile ? "48px" : isTablet ? "60px" : "18px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      }
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#ffdddd",
        fontSize: isMobile ? "40px" : isTablet ? "64px" : "14px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      };
    },
    menuList: base => ({
      ...base,
      maxHeight:  isMobile ? "600px" : isTablet ? "600px" : "400px",
    })
   
  
  }

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