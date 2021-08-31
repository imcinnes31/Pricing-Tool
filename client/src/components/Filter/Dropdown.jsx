import React, { Fragment } from "react";

export default function DropdownComponent({ filters, selected, setSelected }) {

  // (1) move the list of checked values to the home.jsx
  // (2) use the list to filter the results when you click find counselor now
  // (3) after clicking find counselor now, make the boxes auto filter without needing the button anymore

  function toggleSelected(event) {
    const { name, value, checked } = event.target;

    const val =
      name.replace(/ /g, "_").toLowerCase() +
      "=" +
      value.replace(/ /g, "_").toLowerCase();

    checked
      ? setSelected((prev) => prev.concat(val))
      : setSelected((prev) => prev.filter((item) => item !== val));
  }

  const rowStyles = {
    marginTop: "40px",
    display: "block",
    height: "100%",
    alignitems: "left",
    width: "75%",
  };

  return (
    <div className="row" style={rowStyles}>
      <div className="dropdown">
        {filters &&
          filters.map((obj, i) => (
            <Fragment key={obj.category}>
              <button
                className="btn secondary-button dropdown-toggle btn-sm px-4 rounded-pill orangered"
                type="button"
                id={`dropdown_${i + 1}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {obj.category}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby={`dropdown_${i + 1}`}
              >
                {obj.list &&
                  obj.list.map((item, j) => (
                    <li key={j} className="form-check form-check-inline">
                      <div className="form-check">
                        <input
                          id={`checkbox_${i + 1}_${j + 1}`}
                          name={obj.category}
                          type="checkbox"
                          className="form-check-input"
                          defaultValue={item}
                          aria-label="..."
                          onChange={(event) => toggleSelected(event)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox_${i + 1}_${j + 1}`}
                        >
                          {item}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </Fragment>
          ))}
      </div>
    </div>
  );
}
