import React, { useState } from "react";
import Select from 'react-select'

const styles = {
  menu: base => ({
    ...base,
    marginTop: 0
  })
}

// Component for the add counselor page single selectors.
export default function MultiSelector({filters, id, onChange, isQuery}) {
  //options here is one list from filters.

  //convert options in format of Select component
  const options = filters.list.map((item, index) => ({value: index, label: item}));
  
  const [optionSelected, setSelectedOptions] = useState('');

  const handleChangeInner = (selected) => {
    //if this is a query option in the pricing tool it has to be in lowercase
    const optionsSelected = isQuery ? selected.label.replace(/ /g, "_").toLowerCase():selected.label;
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
      isSearchable={false}//Single select cannot enter search values
      required
    />
  );
}