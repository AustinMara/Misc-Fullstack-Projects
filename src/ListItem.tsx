import {useState} from "react";


interface ListItemProps {
    id?: number
}

const storeData = (key: number, value: any) => {
    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export function ListItem({id = 0}: ListItemProps) {
    let key = id;
    const [checked, setChecked] = useState(false);
    const [itemText, setItemText] = useState('');


    return (
        <li className={'list flex flex-row w-full align-middle gap-2 h-min'} onDoubleClick={() => {
        }}>
            <input type={'checkbox'} className={'checkbox w-1/12 h-auto align-middle aspect-square'} onClick={() => {
                setChecked(!checked)
            }}>

            </input>
            <input
                onChange={e =>
                    setItemText(e.target.value)
                }
                onBlur={() => {storeData(key, {checked, itemText})}}
                type={'text'}
                className={`
                    input-primary 
                    text-lg 
                    outline-2 
                    outline-base-300 
                    rounded-xl 
                    pl-1 
                    w-11/12 
                    focus:outline-accent
                    ${checked ? 'line-through outline-1 text-neutral' : ''}
                
                `}>

            </input>
            {id}
        </li>

    )
}