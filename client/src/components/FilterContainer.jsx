import React, { Fragment } from "react";
import DropdownComponent from "./Filter/Dropdown";
import Query from "./Filter/Query";
import Slider from "./Filter/Slider";

export default function FilterContainer({
  filters,
  isSelected,
  setIsSelected,
  setQuery,
}) {
  const [sliderVal, setSliderVal] = React.useState(0); // this variable holds the price slider value.

  return (
    <Fragment>
      <Slider sliderVal={sliderVal} setSliderVal={setSliderVal} />

      <DropdownComponent // Filter
        filters={filters}
        selected={isSelected}
        setSelected={setIsSelected}
      />

      <Query // Apply Filters BUTTON
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        setQuery={setQuery}
        sliderVal={sliderVal}
      />
    </Fragment>
  );
}
