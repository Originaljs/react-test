/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState, ReactNode, forwardRef, useImperativeHandle } from 'react'
import { observer } from 'mobx-react-lite'
import Style from '../style/menu.module.css';

const DropDown = ({ children, title: name }: React.PropsWithChildren & { title: string | ReactNode }) => (
    <div className={Style.dropdown}>
        <a>{name}</a>
        <div className={Style.dropdownContent}>{children}</div>
    </div>
);

export const MenuBar = observer(
    forwardRef((props: any, ref) => {
        const [design_id, setDesign_id] = useState(null);

        useImperativeHandle(ref, () => ({ getResult }))
        const getResult = () => {
            const userDesign_id = localStorage.getItem("userDesign_id")
            setDesign_id(userDesign_id as any)
            if (userDesign_id) {

            }

        }

        const onTogglePage = () => {
            localStorage.setItem("userDesign_id", null as any);
            setDesign_id(null);
            // clearAllScenes();
            props.onTogglePage(true);
        };
        return (
            <div className={Style.menu}>
                <a onClick={onTogglePage}>Home</a>
                <DropDown title="Project" >
                    <a >New</a>
                    <a >Save</a>
                    <a >Load</a>
                </DropDown>
                <a>Edit</a>
                <DropDown title='Layout'>
                    <a >Reset</a>
                </DropDown>
                <a>Window</a>
                <a>More</a>
                <DropDown title='File'>
                    <a>Save as</a>
                    <a>Import</a>
                </DropDown>
                <a>Run Simulation</a>
                <a>Result</a>
                <a className={Style.saveBtn}>Save</a>

            </div>
        )

    })
)