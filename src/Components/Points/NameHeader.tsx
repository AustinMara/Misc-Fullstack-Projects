import React from "react";
const NameHeader = ({ studentName = "default" }) => {
    return(
        <div className="card-title">
            {studentName}
        </div>
    )
}
export default NameHeader;