import InstructorBar from "./InstructorBar";
import KidCard from "./KidCard";

function Points(){
    return (
        <>
            <div className={'w-screen h-screen content-center align-middle flex flex-col'}>
                <div className="">Points</div>
                < InstructorBar />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6">
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                    <KidCard />
                </div>
                
            </div>
        </>
        
    )
}
export default Points;