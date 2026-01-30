import {useState} from "react";
import {ListItem} from "./ListItem.tsx";

export const [text, setText] = ('')

function ToDo() {
    const list = [];
    const [items, setItems] = useState([
        <ListItem id={0}/>
    ]);


    return (
        <>
            <div className={' flex justify-center items-center mb-32 '} data-theme={"synthwave"}>
                <div
                    className={'card outline-base-content outline-1 w-1/2 h-fit flex flex-col items-center justify-center bg-base-200'}>
                    <h1 className={'card-title self-center text-base-content text-2xl font-bold'}>To-Do</h1>
                    <ul id='list' className={'list w-full card-body grid grid-rows-2 '}>

                        {items}

                        <li className={'list flex w-full items-center'}>
                            <button className={'btn btn-primary text-3xl text-bold items-center justify-center'}
                                    type={'button'} onClick={() => setItems([...items, <ListItem id = {items.length}/>])}> +
                            </button>

                        </li>
                    </ul>

                </div>

            </div>
        </>
    );
}

export default ToDo;