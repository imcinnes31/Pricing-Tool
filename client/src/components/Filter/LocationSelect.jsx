import React, { Component } from "react";
import Axios from "axios";

const { useState } = React;

export default function LocationSelect({ setProvVal, setCityVal, inPersonVal, setInPerson }) {

    const [locs, setLocs] = useState([]);

    const getLocations = async () => {
        const { data } = await Axios.get(process.env.REACT_APP_BACKEND_API + "/v2/counselors/locations/");
        const locLists = data;
        setLocs(locLists.locations);
    };

    React.useEffect(() => {
        getLocations();
    }, []);

    React.useEffect(() => {
        if (document.getElementById("inPersonToggle").checked == true) {
            let province = document.getElementById("province");
            setProvVal(province.value);
            let city = document.getElementById("city");
            setCityVal(city.value);
        }

        let inPersonChecked = document.getElementById("inPersonToggle");
        setInPerson(inPersonChecked.checked);
    });

    function changeProvince() {
        setProvVal(document.getElementById("province"));
        let cityList = null;
        //for (const location of LOCATIONS) {
        for (const location of locs) {
            if(location.category == document.getElementById("province").value)            
            {
                cityList = location.list;
                break;
            }
        }
        let cityOptions = "";
        for (const city of cityList) {
            cityOptions = cityOptions.concat('<option>' + city + '</option>')
        }
        document.getElementById("city").innerHTML = cityOptions;
 
    };

    function changeCity() {
        setCityVal(document.getElementById("city"));
    };

    function toggleInPerson() {
        setInPerson(document.getElementById("inPersonToggle").checked);
    }

    return (

        <div>
            <br></br>
            <div class="d-flex justify-content-center">  
                <label>I would like an in-person appointment</label>
                <input
                    id='inPersonToggle'
                    name='in-person'
                    type="checkbox"
                    className="form-check-input"
                    defaultValue='in-person'
                    aria-label="..."
                    onChange={toggleInPerson}
                />
            </div>
            <div class="d-flex justify-content-center" id="locationMenus">

                {
                    inPersonVal == true
                    ?
                        <div>
                            <br></br>
                            <label>Select Province:</label>
                            <div>
                                <select class="form-select" aria-label="Default select example" id="province" onChange={changeProvince}>
                                    {locs.map((prov) =>                 
                                        {
                                            if (prov.list.length > 0) {
                                                return <option key={prov.category}>{prov.category}</option>
                                            }
                                        })};
                                </select>
                            </div>
                            <br></br>
                            <label>Select City:</label>
                                {locs[0] 
                                ?
                                <div>
                                    <select class="form-select" aria-label="Default select example" id="city" onChange={changeCity}>
                                        {locs[0].list.map((city) => (
                                            <option key={city}>{city}</option>
                                        ))};
                                    </select>
                                </div>
                                :
                                <div>
                                    <select class="form-select" aria-label="Default select example" id="city"><option>Please wait...</option></select>
                                </div>
                                }   
                        </div>
                    :
                    <div>
                        <p></p>
                    </div>
                }

            </div>
        </div>
    );
}