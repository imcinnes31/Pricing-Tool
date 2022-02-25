import React, { useState } from "react";
import Select from 'react-select'
import { useMediaQuery } from 'react-responsive'


// Component for the add counselor page multi selectors.
export default function MultiSelector({filters, id, onChange, isQuery }) {
  const isMobile = useMediaQuery({ query: '(max-device-width: 576px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 1024px)' })

  const styles = {
    menu: base => ({
      ...base,
      marginTop: 0
    }),
    control: provided => ({
      ...provided,
      height: isMobile ? 50 : isTablet ? 25 : 25,
      fontSize: isMobile ? "24px" :  isTablet ? "14px" : "14px",
    }),
    placeholder: (defaultStyles) => {
      return {
          ...defaultStyles,
          fontSize: isMobile ? "24px" :  isTablet ? "14px" : "14px",
          fontWeight: isMobile ? "bold" :  isTablet ? "none" : "none",
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: isMobile ? "24px" : isTablet ? "14px" : "14px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      }
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        fontSize: isMobile ? "20px" : isTablet ? "14px" : "14px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      };
    },
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
      closeMenuOnSelect={true}
      onChange={handleChangeInner}
      value={optionSelected}
      id={id}
      styles={styles}
      placeholder=""
      required
      isMulti
    />
  );
}