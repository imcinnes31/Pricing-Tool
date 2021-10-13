import React, { useState } from "react";
import Select from 'react-select'

const styles = {
  menu: base => ({
    ...base,
    marginTop: 0
  })
}

// Component for the Admin page multi selectors.
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
      styles={styles}
      placeholder=""
      required
      isMulti
    />
  );
}