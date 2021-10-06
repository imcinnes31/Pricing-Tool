import React, { useState } from "react";
import Select from 'react-select'


// Component for the Register page multi selectors.
export default function MultiSelector({filters, id, onChange }) {
  //options here is one list from filters.

  //convert options in format of Select component
  const options = filters.list.map((item, index) => ({value: index, label: item}));
  
  const [optionSelected, setSelectedOptions] = useState([]);

  const handleChangeInner = (selected) => {
    // console.log(selected)
    const optionsSelected = selected.map((item) => item.label);
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
      required
      isMulti
    />
  );
}