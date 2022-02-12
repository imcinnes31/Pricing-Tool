import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import React from "react";
import { useLocation } from "react-router-dom";

export default function RoleSelector({roleVal, setRoleVal})
 {
    const location = useLocation();

    // React.useEffect(() => {
    //     if (location.role) {
    //         //console.log(location.role);
    //         document.getElementById(location.role).checked = true;
    //         setRoleVal(location.role);
    //         location.role = null;
    //     }
    //     else {
    //         document.getElementById(roleVal.toLowerCase()).checked = true;
    //     }
    // });

    function toggleSelected(event) {
        const { name, value, checked } = event.target;
        setRoleVal(value);
    }
    function toggleRole(event) {
        const { name, value, checked } = event.target;
        if(value){
            setRoleVal(value)
        }
        console.log(value);
    }

    return (
        <div>
            
            <ToggleButtonGroup onClick={(event) => toggleRole(event)} id="roleOptions" type="radio" name="roleOptions" defaultValue={"Counselor"}>
                <div style={{display:"block", paddingRight:30}}> <h4>{`I am looking for a:`}</h4> </div>
    <ToggleButton id="tbg-radio-1" value={"Counselor"}>
      Counselor
    </ToggleButton>
    <ToggleButton id="tbg-radio-2" value={"Supervisor"}>
      Supervisor
   
    </ToggleButton>
  </ToggleButtonGroup>
 
            {/* <label for="counselor">I am looking for a: </label>
<input type="radio" id="counselor" name="role" value="Counselor" onClick={(event) => toggleSelected(event)}
></input>

          <label for="counselor">Counselor</label>
          <input type="radio" id="supervisor" name="role" value="Supervisor" onClick={(event) => toggleSelected(event)}
></input>
          <label for="supervisor">Supervisor</label> */}
        </div>
        
    );
}