import { UsbOutlined, DownOutlined, FieldTimeOutlined, GlobalOutlined, FileOutlined } from '@ant-design/icons'
export const LeftList = () => {
    var name: string = 'test', email: string = 'test.com'
    return (<div className="leftBox">
        <div className="leftHead">
            <UsbOutlined style={{ fontSize: '26px', lineHeight: '60px' }} />
            <div className='leftHeadText'>
                <p>{name}</p>
                <span>{email}</span>
            </div>
            <DownOutlined style={{ fontSize: '13px', lineHeight: '60px' }} />
        </div>
        <div className="leftContent">
            <div className='leftContentBox'>
                <FieldTimeOutlined className='leftContentIconStyle' />
                <p>Recents</p>
            </div>
            <div className='leftContentBox'>
                <FileOutlined className='leftContentIconStyle' />
                <p>Drafts</p>
            </div>
            <div className='leftContentBox'>
                <GlobalOutlined className='leftContentIconStyle' />
                <p>Community</p>
            </div>

        </div>
    </div>)
}