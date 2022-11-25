import { action, makeObservable } from "mobx";
import { types, IModelType } from "mobx-state-tree";
import { Project } from "../../project";
import catalog from "../catalog";


export enum CircitGroup {
    QUBIT = "Qubit",
}

type ExtractModelType<M, fallback = never> = M extends IModelType<infer T, infer A> ? T : fallback

type ExtractModelActions<M, fallback = never> = M extends IModelType<infer T, infer A> ? T : fallback

type ExtractModelInstance<M> = M extends IModelType<infer T, infer A> ? ReturnType<M['create']> : never

type ExtractModelCreateParam<M> = M extends IModelType<infer T, infer A> ? Parameters<M['create']>[0] : never

const PropModel = types.model({
    name: types.string,
    pos_x: types.number,
    pos_y: types.number,
    orientation: types.number

}).actions(
    (self) => ({
        set: (key: Extract<keyof typeof self, string>, value: any) => {
            Object.assign(self, { [key]: value })
        }
    })
)

export class BaseComponent<T = {}, CTOR_PROP = ExtractModelCreateParam<T>> {
    static get metadata(): CircuitCompMetadata {
        return {
            name: "BaseComponent",
            // TODO: do we generate an SVG for each component
            // or just take a screenshot of the component
            icon: null!,
            group: null!,
            model: PropModel,
        };
    }
    readonly props: ExtractModelInstance<IModelType<ExtractModelType<typeof PropModel> & ExtractModelType<T, any>,
        ExtractModelActions<typeof PropModel> & ExtractModelActions<T, any>>>

    readonly extras: Partial<{ [key in keyof typeof this.props]: ExtraProp<typeof this.props[key]> }> = {}
    protected readonly project: Project
    readonly objExtras: object
    component!: string
    connectionProperties!: string

    constructor(proj: Project, 
        init: CTOR_PROP, constraints: 
        { [key in keyof CTOR_PROP]: ExtraProp<CTOR_PROP[key]> }, 
        objConstraints?: object) {
        this.project = proj
        this.props = catalog.propModel(this)?.create({
            name: proj.assignName(this),
            pos_x: 0,
            pos_y: 0,
            orientation: 0,
            ...init
        })
        this.extras = <typeof this.extras>{
            orientation: { min: 0, max: 360, default: 0 },
            ...constraints,
        }
        this.objExtras = objConstraints!
        makeObservable(this)
    }

    displayName(): string {
        return this.props.name
    }

    setDisplayName(value: string) {
        this.props.set('name', value)
    }
}