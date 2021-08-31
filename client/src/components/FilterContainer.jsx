import React, { Fragment } from "react";
import DropdownComponent from "./Filter/Dropdown";
import Query from "./Filter/Query";
import Slider from "./Filter/Slider";

export default function FilterContainer({
  filters,
  isSelected,
  setIsSelected,
  setQuery
}) {
  return (
    <Fragment>
      <Slider />

      <DropdownComponent
        filters={filters}
        selected={isSelected}
        setSelected={setIsSelected}
      />

      <Query
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        setQuery={setQuery}
      />
    </Fragment>
  );
}
