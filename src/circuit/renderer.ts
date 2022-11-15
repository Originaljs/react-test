import { Scene, WebGLRenderer, OrthographicCamera, Object3D } from "three";
import { Project } from "../ui/project";

export class CircuitRenderer {
    private readonly scene: Scene = new Scene()
    private readonly camera: OrthographicCamera
    project: Project
    constructor(proj: Project, canvas: HTMLCanvasElement) {

        this.project = proj
        this.camera = proj.EventControl.camera
        this.camera.position.y = 5
        this.camera.lookAt(0, 0, 0)
    }
}