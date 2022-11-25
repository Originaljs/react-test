
interface CircuitCompMetadata {
    name: string;
    icon: string;
    group: string;
    model: IModelType<any, any>;
}

interface CircuitComponentClass {
    new(project: Project, jsonData?: any): import("../window/components/base").BaseComponent
    get metaData(): CircuitCompMetadata
}

type ExtraProp<T> = T extends number ? { min?: number; max?: number; unit?: boolean; default: number } : { default: T }

