import DockLayout, { LayoutData, TabGroup } from 'rc-dock'
import "rc-dock/dist/rc-dock-dark.css";
import { WindowType } from '../window/enums';

const DefaultGroup: TabGroup = {
    panelExtra: () => null!,
};
export const DefaultLayout: LayoutData = {
    dockbox: {
        mode: 'horizontal',
        children: [
            {
                tabs: [
                    {
                        id: 'ui-lib',
                        title: WindowType.Library,
                        content: <div />,
                        cached: true,
                        minWidth: 250,
                        minHeight: 250,
                        group: "default",
                    }
                ],
                size: 300,
                group: "default",
            },
            {
                tabs: [
                    {
                        id: 'ui-circuit',
                        title: WindowType.CircuitView,
                        content: <div />,
                        cached: true,
                        minWidth: 250,
                        minHeight: 250,
                        group: "default",
                    }
                ],
                size: 1000,
                group: "default",
            },
            {
                mode: "vertical",
                children: [
                    {
                        tabs: [
                            {
                                id: "ui-comp",
                                title: WindowType.ComponentList,
                                content: <div />,
                                minWidth: 250,
                                minHeight: 250,
                                cached: true,
                                group: "default",
                            }
                        ],
                        group: "default",
                    },
                    {
                        tabs: [
                            {
                                id: "ui-prop",
                                title: WindowType.Property,
                                content: <div />,
                                minWidth: 300,
                                minHeight: 250,
                                cached: true,
                                group: "default",
                            }
                        ],
                        group: "default",
                    },
                ],
                size: 300,
                group: "default",
            }
        ]
    }
}


export const MainLayout = () => {
    return (
        <DockLayout dropMode="edge"
            defaultLayout={DefaultLayout}
            groups={{ default: DefaultGroup }}
            style={{ width: "100%", height: "100%" }} />
    )
}
