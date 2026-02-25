import React from "react";
const PointsHeader = ({ points = 0 }) => {
    return(
        <div className="card-title">
            {points}
        </div>
    )
}
export default PointsHeader;