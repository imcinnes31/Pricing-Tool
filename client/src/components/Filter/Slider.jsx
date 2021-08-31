import React from "react";

export default function Slider() {
  return (
    <div className="row pt-5">
      <label
        className="form-label"
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "30px",
        }}
      >
        I can afford up to
      </label>
      <input type="range" className="form-range" id="customRange1" />
    </div>
  );
}
