import React, { useState } from "react";
import Select from 'react-select'


// Component for the Register page multi selectors.
export default function MultiSelector({options, name, onChange }) {
    //options here is one list from filters.
    //convert options in format of Select component
    
    const [optionSelected, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    onChange({ name, category: selected.value });
    //console.log(selected)
    setSelectedOptions(selected);
  };
  
  return (
    <Select
      options={options}
      isLoading={!options}
      closeMenuOnSelect={true}
      onChange={handleChange}
      value={optionSelected}
      name={name}
    />
  );
}