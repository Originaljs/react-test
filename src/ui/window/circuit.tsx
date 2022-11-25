import { useState, useContext, useRef, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import { ProjectContext } from "../..";
import Style from '../style/circuit.module.css'

export const CircuitView = observer(() => {
    const element = useRef<HTMLCanvasElement>(document.createElement("canvas"))
    const proj = useContext(ProjectContext).active
    useEffect(() => {
        proj.setCanvas(element.current as HTMLCanvasElement)
    }, [])
    return (
        <>
            <div className={Style.grid}>
                {proj.gridTextH.map(({ x, y, text }, index) =>
                (
                    <span key={index} style={{
                        left: typeof x === 'number' ? `${50 * (x + 1)}%` : x,
                        top: typeof y === 'number' ? `${50 * (y + 1)}%` : y
                    }}>
                        {text}
                    </span>
                )
                )}
            </div>
            <div className={Style.grid}>
                {proj.gridTextV.map(({ x, y, text }, index) =>
                (
                    <span key={index} style={{
                        left: typeof x === 'number' ? `${50 * (x + 1)}%` : x,
                        top: typeof y === 'number' ? `${50 * (y + 1)}%` : y
                    }}>
                        {text}
                    </span>
                )
                )}
            </div>
            <canvas ref={element} style={{ position: "absolute" }}></canvas>
        </>
    )
})