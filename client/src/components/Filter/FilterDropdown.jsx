import React, { Fragment, useState } from "react";
import RoundMultiSelector from "../RoundMultiSelector";
import { Form, Row, Col, Container, Button } from "react-bootstrap";

export default function FilterDropdownComponent({ filters, setIsSelected, isSelected  }) {

    function handleSelect(currentMenu) {
        console.log(currentMenu)
        var selectedStuff = isSelected;
        var currentMenuName = currentMenu.id.replace(/ /g, "_").toLowerCase()

        for(var i=selectedStuff.length-1 ; i>=0;i--){
            if(selectedStuff[i].startsWith(currentMenuName + '=')) {
                selectedStuff.splice(i, 1);
            }
        }

        for (const option of currentMenu.optionsSelected) {
            var currentOption = currentMenu.id.replace(/ /g, "_").toLowerCase() + '=' + option.replace(/ /g, "_").toLowerCase();
            selectedStuff.push(currentOption);
        }

        setIsSelected(selectedStuff);
    };

    const labelStyles = {
        color: "red",
    };

    return(

        <div className="row">
        {filters &&
          filters.map((obj, i) => (
            <div className="row" style={{width: '600px'}}>
                
              <label style={labelStyles}>{obj.category}</label>
                <RoundMultiSelector
                filters={obj}
                id={`${obj.category}`}
                onChange={handleSelect}
                placeholder={`Select ${obj.category}`}
            />
            </div>

        ))}

        </div>

    );
}