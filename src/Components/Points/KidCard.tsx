import NameHeader from "./NameHeader";
import PointsHeader from "./PointsHeader";

function KidCard(){
    return (
        <div className="card bg-base-200 content-center w-full justify-center items-center outline-accent outline-1">
            <NameHeader studentName="Austin Lunsford" />
            <PointsHeader points={150} />
        </div>
    )
}
export default KidCard;