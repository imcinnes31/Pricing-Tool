import React from "react";
import useHttpRequest from "../../hooks/HttpRequest";
import { Spinner } from "../Spinner";
import { useLocation } from "react-router-dom";

const MAX_PRICE = 500;
const MIN_PRICE = 50;

export default function Slider({ sliderVal, setSliderVal }) {
  const location = useLocation();
  const { loading, error, data } = useHttpRequest(
    "http://localhost:5000/api/v2/counselors/meta-data"
  );
  /**
   *   ^ use this api call to dynamically choose the max and minimum for the price slider bar. This makes sure
   *     that no matter what a counselors price may be, they will still be accessible via the price slider.
   */

  // console.log({ loading, error, data });

  React.useEffect(() => {
    if (!loading) {
      let slider = document.getElementById("customRange1");
      const min = parseInt(slider.min);
      const max = parseInt(slider.max);
      slider.value = min + (max - min) / 2;
      setSliderVal(slider.value);
      if(location.price) {
        slider.value = location.price;
        setSliderVal(slider.value);
        location.price = null;
      }
    }
  }, [loading]);

  React.useEffect(
    () =>
      (document.getElementById("selectValue").innerHTML = "$".concat(
        sliderVal
      )),
    [sliderVal]
  );

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
        I can afford up to{" "}
        <span id="selectValue" style={{ color: "var(--secondary_1)" }}></span>
      </label>
      {loading ? (
        <Spinner />
      ) : (
        <input
          type="range"
          className="form-range"
          id="customRange1"
          min={10*Math.floor((data['min_price'])/10)}
          max={10*Math.ceil((data['max_price'])/10)}
          step="10"
          onChange={() => setSliderVal(document.getElementById("customRange1").value)}
        />
      )}
    </div>
  );
}
