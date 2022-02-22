import React, { Component } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

const { useState } = React;

export default function LocationSelect({ setProvVal, setCityVal, inPersonVal, setInPerson }) {
    const location = useLocation();
    const [locs, setLocs] = useState([]);

    const getLocations = async () => {
        const { data } = await Axios.get("/api/v2/counselors/locations/");
        const locLists = data;
        setLocs(locLists.locations);
    };

    React.useEffect(() => {
        getLocations();
    }, []);

    React.useEffect(() => {
        if (document.getElementById("inPersonToggle").checked == true) {
            if (document.getElementById('province') && document.getElementById('city')) {
            let province = document.getElementById("province");
            setProvVal(province.value);
            let city = document.getElementById("city");
            setCityVal(city.value);
            }
        }

        let inPersonChecked = document.getElementById("inPersonToggle");
        setInPerson(inPersonChecked.checked);
        if (location.inPerson) {
            // console.log(location.inPerson)
            if (location.inPerson[0] == 'true') {
                document.getElementById("inPersonToggle").checked = true;
                if (document.getElementById('province')) {
                    var provinceName = location.inPerson[1].replace(/_/g," ").toLowerCase().split(" ");
                    for (var i = 0; i < provinceName.length; i++) {
                        provinceName[i] = provinceName[i].charAt(0).toUpperCase() + provinceName[i].substring(1);     
                    }
                    provinceName = provinceName.join(" ");
                    document.getElementById('province').value = provinceName;
                    var cityList;
                    for (const currentLocation of locs) {
                        if(currentLocation.category == document.getElementById("province").value)            
                        {
                            cityList = currentLocation.list;
                            let cityOptions = "";
                            for (const city of cityList) {
                                cityOptions = cityOptions.concat('<option>' + city + '</option>')
                            }
                            document.getElementById("city").innerHTML = cityOptions;
                            var cityName = location.inPerson[2].replace(/_/g," ").toLowerCase().split(" ");
                            for (var i = 0; i < cityName.length; i++) {
                              cityName[i] = cityName[i].charAt(0).toUpperCase() + cityName[i].substring(1);     
                            }
                            cityName = cityName.join(" ");
                            cityName = cityName.split("-");
                            for (var i = 0; i < cityName.length; i++) {
                              cityName[i] = cityName[i].charAt(0).toUpperCase() + cityName[i].substring(1);     
                            }
                            cityName = cityName.join("-");
                            document.getElementById('city').value = cityName;
                            let province = document.getElementById("province");
                            setProvVal(province.value);
                            let city = document.getElementById("city");
                            setCityVal(city.value);
                            location.inPerson = null;
                            break;
                        }
                    }
                }
            }
        }

    });

    function changeProvince() {
        setProvVal(document.getElementById("province"));
        let cityList = null;
        //for (const location of LOCATIONS) {
        for (const currentLocation of locs) {
            if(currentLocation.category == document.getElementById("province").value)            
            {
                cityList = currentLocation.list;
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
                <label style={{fontSize:"24px"}}>I would like an in-person appointment&nbsp;&nbsp;</label>
                <input
                    style={{height:"30px",width:"30px"}}
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
                            <label style={{fontSize:"20px"}}>Select Province:</label>
                            <div>
                                <select style={{fontSize:"24px"}} class="form-select" aria-label="Default select example" id="province" onChange={changeProvince}>
                                    {locs.map((prov) =>                 
                                        {
                                            if (prov.list.length > 0) {
                                                return <option key={prov.category}>{prov.category}</option>
                                            }
                                        })};
                                </select>
                            </div>
                            <br></br>
                            <label style={{fontSize:"20px"}}>Select City:</label>
                                {locs[0] 
                                ?
                                <div>
                                    <select style={{fontSize:"24px"}} class="form-select" aria-label="Default select example" id="city" onChange={changeCity}>
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