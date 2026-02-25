import { Children} from "react";


 // @ts-ignore
export default function App({ children }){
    return(
        <>
        <div data-theme={"retro"} className={"ComponentList min-h-screen bg-base "}>
            <div className={"grid-rows-subgrid"}>
                {Children.map(children, (child) =>
                    <>
                        {child}
                    </>
                )}
            </div>


        </div>

    </>)
}