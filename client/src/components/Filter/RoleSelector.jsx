import React from "react";

export default function RoleSelector({roleVal, setRoleVal})
 {
    function toggleSelected(event) {
        const { name, value, checked } = event.target;
        setRoleVal(value)
        ;
    }

    return (
        <div>
            <label for="counselor">I am looking for a: </label>
<input type="radio" id="counselor" name="role" value="Counselor" checked onClick={(event) => toggleSelected(event)}
></input>

          <label for="counselor">Counselor</label>
          <input type="radio" id="supervisor" name="role" value="Supervision" onClick={(event) => toggleSelected(event)}
></input>
          <label for="supervisor">Supervisor</label>
        </div>
        
    );
}