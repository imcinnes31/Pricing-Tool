import React, { useState } from "react";
import Select from 'react-select'
import { useMediaQuery } from 'react-responsive'


// Component for the add counselor page single selectors.
export default function SingleSelector({filters, id, onChange, isQuery, isSearchable, userData}) {
  const isMobile = useMediaQuery({ query: '(max-device-width: 576px)' })
  const isTablet = useMediaQuery({ query: '(max-device-width: 1024px)' })

  const styles = {
    menu: base => ({
      ...base,
      marginTop: 0
    }),
    control: provided => ({
      ...provided,
      height: isMobile ? 75 : isTablet ? 120 : 25,
      fontSize: isMobile ? "48px" :  isTablet ? "72px" : "18px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        fontSize: isMobile ? "48px" : isTablet ? "60px" : "18px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      }
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        fontSize: isMobile ? "48px" : isTablet ? "64px" : "14px",
        fontWeight: isMobile ? "bold" : isTablet ? "none" : "none",
      };
    },
    menuList: base => ({
      ...base,
      maxHeight:  isMobile ? "600px" : isTablet ? "600px" : "400px",
    })
  }
  
  //isQuery is true if it will be used as a filter option in the main find a counselor page

  //options here is one list from filters.

  //convert options in format of Select component
  //Will be empty if filters is empty.
  const options = Object.entries(filters).length === 0?[]:filters.list.map((item, index) => ({value: index, label: item}));
  
  const [optionSelected, setSelectedOptions] = useState('');

  const handleChangeInner = (selected) => {
    //if this is a query option in the pricing tool it has to be in lowercase
    const optionsSelected = isQuery ? selected.label.replace(/ /g, "_").toLowerCase():selected.label;
    onChange({ id, optionsSelected});
    
    setSelectedOptions(selected);
  };

  React.useEffect(() => {
    if(userData) {
      for (const option in options) {
        if (options[option].label.replace(/ /g, "_").toLowerCase() === userData.replace(/ /g, "_").toLowerCase()) {
          setSelectedOptions(options[option]);
          break;
        }
      }
    }
  }, []);
  
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
      isSearchable={isSearchable}
      required
    />
  );
}
//Most Single select should not have search feature
SingleSelector.defaultProps = {
  isSearchable : false
}