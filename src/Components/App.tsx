import { Children} from "react";


 // @ts-ignore
export default function App({ children }){
    return(
        <>
        <div data-theme={"retro"} className={"ComponentList min-h-screen bg-base-100"}>
            <div className={""}>
                {Children.map(children, (child) =>
                    <>
                        {child}
                    </>
                )}
            </div>


        </div>

    </>)
}