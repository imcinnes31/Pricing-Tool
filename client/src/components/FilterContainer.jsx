import React, { Fragment } from "react";
import RoleSelector from "./Filter/RoleSelector";
import DropdownComponent from "./Filter/Dropdown";
import FilterDropdownComponent from "./Filter/FilterDropdown";
import LocationSelect from "./Filter/LocationSelect";
import Query from "./Filter/Query";
import Slider from "./Filter/Slider";

export default function FilterContainer({
  filters,
  isSelected,
  setIsSelected,
  setQuery,
  roleVal,
  setRoleVal,
  setCurrentProfile
}) {
  const [sliderVal, setSliderVal] = React.useState(0); // this variable holds the price slider value.
  const [provVal, setProvVal] = React.useState("");
  const [cityVal, setCityVal] = React.useState("");
  const [inPersonVal, setInPerson] = React.useState(false);

  return (
    <Fragment>
       <RoleSelector
      roleVal={roleVal}
      setRoleVal={setRoleVal}
      />
      
      <Slider sliderVal={sliderVal} setSliderVal={setSliderVal} />

     
      {/* <DropdownComponent // Filter
        filters={filters}
        selected={isSelected}
        setSelected={setIsSelected}
      /> */}

      <FilterDropdownComponent
        filters={filters}
        setIsSelected={setIsSelected}
        isSelected={isSelected}
      />

      <LocationSelect
        provVal={provVal}
        setProvVal={setProvVal}
        cityVal={cityVal} 
        setCityVal={setCityVal}
        inPersonVal={inPersonVal}
        setInPerson={setInPerson}
      />

      <Query // Apply Filters BUTTON
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        setQuery={setQuery}
        sliderVal={sliderVal}
        provVal={provVal}
        cityVal={cityVal}
        inPersonVal={inPersonVal}
        roleVal={roleVal}
        setCurrentProfile={setCurrentProfile}

      />
    </Fragment>
  );
}
