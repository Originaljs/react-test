import { Mesh, Color, PlaneGeometry, ShaderMaterial, IUniform } from "three";

export class InfiniteGrid extends Mesh {
    m: ShaderMaterial
    constructor({
        size1 = 10,
        size2 = 100,
        color = new Color("black"),
        distance = 8000,
        axes = "xzy",
    }) {

        const planeAxes = axes.substring(0, 2);
        const geometry = new PlaneGeometry(2, 2, 1, 1);
        const material = new ShaderMaterial({
            side: 2,
            transparent: true,
            uniforms: {
                uSize1: { value: size1 },
                uSize2: { value: size2 },
                uColor: { value: color },
                uDistance: { value: distance }
            },
            vertexShader:/*glsl*/`
                varying vec3 worldPosition;
                uniform float uDistance;
                void main(){
                    vec3 pos = position.${axes} * uDistance;
                    pos.${planeAxes} += cameraPosition.${planeAxes};
                    worldPosition = pos;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1);
                    gl_Position.z = -1.;
                }
            `,
            fragmentShader:/*glsl*/`
                varying vec3 worldPosition;
                uniform float uSize1;
                uniform float uSize2;
                uniform vec3 uColor;
                uniform float uDistance;

                float getGrid(float size) {
                    vec2 r = worldPosition.${planeAxes} / size;
                    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
                    float line = min(grid.x, grid.y);
                    return 1.0 - min(line, 1.0);
                }

                void main(){
                    float g1 = getGrid(uSize1);
                    float g2 = getGrid(uSize2);
                    gl_FragColor = vec4(uColor.rgb, min(g1 * 0.2 + g2 * 0.8, 1.0));
                }
            `
        })
        super(geometry, material)
        this.m = material

    }


    get size1() {
        return this.m.uniforms.uSize1 as IUniform<number>;
    }

    get size2() {
        return this.m.uniforms.uSize2 as IUniform<number>;
    }

    get dist() {
        return this.m.uniforms.uDistance as IUniform<number>;
    }
}