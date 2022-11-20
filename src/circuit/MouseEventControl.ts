import { OrthographicCamera, Vector3 } from 'three'
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
            this.zoomTarget *= 1 - e.deltaY * 0.001

        })

        dom.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
    }

    private zoomTarget = 1;
    public zoomSpeed = 1;
    public smoothing = 1;
    readonly panTarget = new Vector3()

    moveCamera(cx0: number, cy0: number, cx1: number, cy1: number) {
        const c0 = new Vector3(cx0, cy0, 0);
        c0.unproject(this.camera);

        const c1 = new Vector3(cx1, cy1, 0);
        c1.unproject(this.camera);

        this.panTarget.x += c0.x - c1.x;
        this.panTarget.z += c0.z - c1.z;
    }
    
    updateCamera(dt: number) {
        const a = 150*this.smoothing / dt
        this.camera.zoom += (this.zoomTarget - this.camera.zoom)/a

        this.panTarget.setY(this.camera.position.y);
        this.camera.position.lerp(this.panTarget, (1 / a) * 2);
        return this.camera.position
    }




}