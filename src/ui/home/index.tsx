import { useEffect } from 'react'
import { LeftList } from './LeftList';
import { RightContent } from './RightContent';
import '../style/home.css'

export const HomePage = (props: any) => {

    const onTogglePage = () => {
        props.onTogglePage(false);
    };
    useEffect(()=>{

    },[])
    return (<div className='homePage'>
        <LeftList/>
        <RightContent onChangeScene={onTogglePage}/>
    </div>)
}
