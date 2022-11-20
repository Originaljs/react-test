import {
    Scene,
    WebGLRenderer,
    OrthographicCamera,
    Object3D, Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    LineSegments,
    EdgesGeometry,
    LineBasicMaterial,
    Vector3
} from "three";
import { Project, GridText } from "../ui/project";
import { addBufferGeometry } from "../helpers/unit";
import { InfiniteGrid } from "../helpers/InfiniteGrid";
import { roundTo, roundToString } from "../helpers/math";
export class CircuitRenderer {
    private readonly scene: Scene = new Scene()
    private readonly camera: OrthographicCamera
    private readonly renderer: WebGLRenderer
    private readonly GroundSheet: Mesh
    private readonly boundingMesh: LineSegments
    private raf = 0
    private readonly grid: InfiniteGrid = new InfiniteGrid({})
    project: Project
    container: Object3D = new Object3D()
    constructor(proj: Project, canvas: HTMLCanvasElement) {

        this.project = proj
        // render
        this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
        this.renderer.setClearColor(0xffffff, 0);

        // camera
        this.camera = proj.EventControl.camera
        this.camera.position.y = 5
        this.camera.lookAt(0, 0, 0)

        // object
        this.GroundSheet = new Mesh()
        this.GroundSheet.geometry = new PlaneGeometry(1, 1)
        this.GroundSheet.material = new MeshBasicMaterial({ color: 'red' })
        this.GroundSheet.rotateX(-Math.PI / 2)
        this.GroundSheet.position.y = -0.1
        this.GroundSheet.visible = false

        this.container.add(this.GroundSheet)

        const geometry = addBufferGeometry([0, 0.2, 0, 0, 0.2, 0, 0, 0.2, 0, 0, 0.2, 0],
            [0, 1, 2, 0, 2, 3])
        const edge = new EdgesGeometry(geometry)
        this.boundingMesh = new LineSegments(edge, new LineBasicMaterial({ color: 0x5885f6, side: 2 }))
        this.boundingMesh.visible = false


        this.scene.add(this.container, this.boundingMesh, this.grid)

        this.update()
    }

    // updata
    update(): void {

        const loop = (now: number) => {
            this.raf = requestAnimationFrame(loop)
            this.render(now)
        }
        this.raf = requestAnimationFrame(loop)
        console.log(this)
    }

    // render
    private lastRender!: number;
    render(now: number): void {
        if (!this.lastRender) {
            this.lastRender = now
            return
        }
        const dt = now - this.lastRender
        this.checkResolution()
        const position = this.project.EventControl.updateCamera(dt)

        this.camera.zoom = Math.max(Math.min(this.camera.zoom, 280000), 0.0005);
        this.camera.position.y = this.camera.zoom > 1000 ? 5 : 100;
        this.camera.updateProjectionMatrix()


        let x = (Math.abs(this.camera.left) + Math.abs(this.camera.right)) / this.camera.zoom
        let y = (Math.abs(this.camera.top) + Math.abs(this.camera.bottom)) / this.camera.zoom
        this.GroundSheet.scale.set(x, y * 1.5, 1)
        this.GroundSheet.position.set(position.x, -0.1, position.z)

        this.renderer.render(this.scene, this.camera)
        this.updateGrid()

        this.lastRender = now;
    }

    private snapUnit = 1;
    updateGrid(): void {
        const TL = new Vector3(-1, -1, 0);
        const BR = new Vector3(+1, +1, 0);

        // ws = world space
        const TL_WS = TL.unproject(this.camera);
        const BR_WS = BR.unproject(this.camera);

        const gs = this.project.gridSub;

        const X_SPAN = BR_WS.x - TL_WS.x;
        const Z_SPAN = TL_WS.z - BR_WS.z;

        const max_span = Math.max(X_SPAN, Z_SPAN);
        const size1 = 10 ** (Math.round(Math.log10(max_span)) - 1);
        const size2 = size1 * 10;

        this.snapUnit = this.grid.size1.value = size1 / (gs / 10);
        this.grid.size2.value = size2;
        this.grid.dist.value = max_span;

        const grid_cell = 10 ** (Math.round(Math.log10(max_span)) - 1); /* *
            (gs > 10 ? 1 : 10 / gs); */
        const centerx = roundTo(X_SPAN * 0.5 + TL_WS.x, grid_cell);
        const centerz = roundTo(Z_SPAN * 0.5 - TL_WS.z, grid_cell);

        const coords_h: GridText[] = [];
        const coords_v: GridText[] = [];

        const pos = new Vector3();

        {
            const unit = X_SPAN / grid_cell > 10 ? 2 : 1;
            for (
                let x = roundTo(TL_WS.x, grid_cell * unit);
                x < BR_WS.x;
                x += grid_cell * unit
            ) {
                pos.set(x, 0, -centerz);
                pos.project(this.camera);
                coords_h.push({
                    x: pos.x,
                    y: -pos.y,
                    text: roundToString(x, grid_cell),
                });
            }

            coords_h.push({
                x: `calc(100% - 1em)`,
                y: `calc(${50 * (1 - pos.y)}% - 1.5em)`,
                text: "X",
            });
        }

        {
            const unit = Z_SPAN / grid_cell > 10 ? 2 : 1;
            for (
                let y = roundTo(BR_WS.z, grid_cell * unit);
                y < TL_WS.z;
                y += grid_cell * unit
            ) {
                pos.set(centerx, 0, y);
                pos.project(this.camera);
                coords_v.push({
                    x: pos.x,
                    y: -pos.y,
                    text: roundToString(-y, grid_cell),
                });
            }

            coords_v.push({
                x: `calc(${50 * (pos.x + 1)}% + 3.5em)`,
                y: `1em`,
                text: "Y",
            });
        }

        this.project.setGridText(coords_h, coords_v);
    }
    //dom reSize 
    checkResolution(): void {
        const element = this.renderer.domElement.parentElement
        this.renderer.domElement.style.width = `${(element as any).clientWidth}px`;
        this.renderer.domElement.style.height = `${(element as any).clientHeight}px`;
        const w = (element as any).clientWidth * window.devicePixelRatio;
        const h = (element as any).clientHeight * window.devicePixelRatio;

        this.camera.left = -w / 2;
        this.camera.right = w / 2;
        this.camera.top = h / 2;
        this.camera.bottom = -h / 2;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }
}