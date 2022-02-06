import React from "react";
import { useLocation } from "react-router-dom";

export default function RoleSelector({roleVal, setRoleVal})
 {
    const location = useLocation();

    React.useEffect(() => {
        if (location.role) {
            //console.log(location.role);
            document.getElementById(location.role).checked = true;
            setRoleVal(location.role);
            location.role = null;
        }
        else {
            document.getElementById(roleVal.toLowerCase()).checked = true;
        }
    });

    function toggleSelected(event) {
        const { name, value, checked } = event.target;
        setRoleVal(value);
    }

    return (
        <div>
            <label for="counselor">I am looking for a: </label>
<input type="radio" id="counselor" name="role" value="Counselor" onClick={(event) => toggleSelected(event)}
></input>

          <label for="counselor">Counselor</label>
          <input type="radio" id="supervisor" name="role" value="Supervisor" onClick={(event) => toggleSelected(event)}
></input>
          <label for="supervisor">Supervisor</label>
        </div>
        
    );
}