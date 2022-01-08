import React, { Fragment } from "react";
import DropdownComponent from "./Filter/Dropdown";
import LocationSelect from "./Filter/LocationSelect";
import Query from "./Filter/Query";
import Slider from "./Filter/Slider";

export default function FilterContainer({
  filters,
  isSelected,
  setIsSelected,
  setQuery,
}) {
  const [sliderVal, setSliderVal] = React.useState(0); // this variable holds the price slider value.
  const [provVal, setProvVal] = React.useState(0);
  const [cityVal, setCityVal] = React.useState(0);
  const [inPersonVal, setInPerson] = React.useState(false);

  return (
    <Fragment>
      <Slider sliderVal={sliderVal} setSliderVal={setSliderVal} />

      <DropdownComponent // Filter
        filters={filters}
        selected={isSelected}
        setSelected={setIsSelected}
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
      />
    </Fragment>
  );
}
