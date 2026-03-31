function InstructorBar(){
    return (
        <div className=" self-center card w-fit align-middle items-center content-center flex-row outline-accent outline-2 p-6 m-6">
            <div>
                {/* <img src="src\data\search.svg"></img> */}
                <input type = "text"  className="outline-accent-content rounded-xl divider-vertical outline-2 text-xl text-center m-2" placeholder="search by student name"></input>
            </div>
            
            <button className="btn m-2">+ Add Student</button>
        </div>
       
    )
}

export default InstructorBar;

