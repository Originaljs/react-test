import { CSSProperties } from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { Mesh, Vector2, Vector3 } from 'three'
import { CircuitRenderer } from "../../circuit/renderer";
import DockLayout from 'rc-dock'
import { MouseEventControl } from "../../circuit/MouseEventControl";

export type GridText = {
    x: number | string
    y: number | string
    text: string
}

export class Project {
    @observable.ref
    static layout: DockLayout = null!

    @observable.ref
    renderer!: CircuitRenderer

    @observable
    static active: Project = null!

    @observable
    gridTextH: GridText[] = []

    @observable
    gridTextV: GridText[] = []

    @observable
    gridSub: number = 10

    readonly EventControl: MouseEventControl

    constructor() {
        makeObservable(this)
        this.EventControl = new MouseEventControl()
    }
    @action
    setCanvas(canvas: HTMLCanvasElement) {
        (canvas.parentElement as HTMLElement).style.backgroundColor = "aliceblue";
        this.EventControl.setElement(canvas)
        this.renderer = new CircuitRenderer(this, canvas)
    }
    @action
    setGridText(H: GridText[], V: GridText[]) {
        this.gridTextH = H;
        this.gridTextV = V;
    }
}