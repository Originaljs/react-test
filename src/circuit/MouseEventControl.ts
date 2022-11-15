import { OrthographicCamera } from 'three'
import { makeObservable, observable } from 'mobx'

export class MouseEventControl {
    @observable
    readonly camera: OrthographicCamera = new OrthographicCamera(-1, 1, -1, 1, 0, 1000)
    private controlStatus: boolean = false
    private mouseButton: number = 0;

    constructor() {
        makeObservable(this)
    }

    setElement(dom: HTMLElement): void {
        const mouseCoord = (e: MouseEvent) => {
            return { x: e.offsetX / dom.clientWidth * 2 - 1, y: 1 - e.offsetY / dom.clientHeight * 2 }
        }

        dom.addEventListener('mousemove', (e) => {
            const { x, y } = mouseCoord(e)

        })

        dom.addEventListener('click', (e) => {
            const { x, y } = mouseCoord(e)
        })

        dom.addEventListener('mouseup', (e) => {
            const { x, y } = mouseCoord(e)
        })

        dom.addEventListener('mousedown', (e) => {
            const { x, y } = mouseCoord(e)
            this.mouseButton = e.button
        })

        dom.addEventListener('wheel', (e) => {

        })

        dom.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
    }


}