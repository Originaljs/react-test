import { useState, useContext, useRef, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import { ProjectContext } from "../..";

export const CircuitView = observer(() => {
    const element = useRef<HTMLCanvasElement>(null)
    const proj = useContext(ProjectContext).active
    useEffect(() => {
        proj.setCanvas(element.current as HTMLCanvasElement)
     }, [])
    return (
        <>
            <canvas ref={element} style={{position: "absolute",width:'100%',height:'100%'}}></canvas>
        </>
    )
})