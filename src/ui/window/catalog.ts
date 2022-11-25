import { types, IModelType } from 'mobx-state-tree'
import { BaseComponent } from './components/base'
class catalog {
    static readonly groups: Map<string, CircuitComponentClass[]> = new Map()
    static readonly map: Map<string, CircuitComponentClass> = new Map()
    static readonly props: WeakMap<CircuitComponentClass, IModelType<any, any>> = new WeakMap()

    static register(...classes: CircuitComponentClass[]) {
        for(const c in classes){
            // const {group,name} = c.metadata;
        }

    }

    static propModel(com: BaseComponent) {
        return this.props.get(<CircuitComponentClass>com.constructor)
    }
}

export default catalog