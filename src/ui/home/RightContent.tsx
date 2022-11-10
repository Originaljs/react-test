import { useContext, useState, useEffect } from "react";
import { Input } from 'antd';
import { SearchOutlined, BellOutlined, DownOutlined, AuditOutlined, FolderAddOutlined, PlusOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons'

export const RightContent = (props: any) => {
    const [filter, setFilter] = useState("All files");
    const [sort, setSort] = useState('Last viewed');
    const [typography, setTypography] = useState(true);
    const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };
    const sortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };
    return (
        <div className="rightBox">
            <div className="rightTop">
                <Input className="rightSearchInput" size="large" prefix={<SearchOutlined />} placeholder='Search files,teams,or people' />
                <div className="rightTopItem">
                    <BellOutlined style={{ fontSize: '26px', lineHeight: '65px' }} />
                    <div className="userSetting">
                        <div className="userImg"></div>
                        <DownOutlined style={{ fontSize: '13px', lineHeight: '65px', marginLeft: '7px' }} />
                    </div>
                </div>

            </div>
            <div className="rightContent">
                <p className="rightTitle">Recently viewed</p>
                <div className="contentBox">
                    <div className="newScece">
                        <AuditOutlined style={{ fontSize: '26px', lineHeight: '80px' }} />
                        <div className="rightTextSence">
                            <p>New design file</p>
                            <span>Design and prototype</span>
                        </div>
                        <PlusOutlined style={{ fontSize: '13px', lineHeight: '80px', float: 'right' }} />
                    </div>
                    <div className="newScece">
                        <FolderAddOutlined style={{ fontSize: '26px', lineHeight: "80px" }} />
                        <div className="rightTextSence">
                            <p>Import file</p>
                            <span>Bring in files from other tools</span>
                        </div>
                        <PlusOutlined style={{ fontSize: '13px', lineHeight: '80px', float: 'right' }} />
                    </div>
                </div>
                <div className="screeningBox">
                    <span>Filter:</span>
                    <select name="filter" className="filterSelect" value={filter} onChange={filterChange}>
                        <option value="All files">All files</option>
                    </select>
                    <div className="sortShow" style={{ float: 'right', marginRight: '35px' }}>
                        <span>Sort:</span>
                        <select name="sort" className="filterSelect" value={sort} onChange={sortChange}>
                            <option value="Last viewed">Last viewed</option>
                        </select>
                        <AppstoreOutlined className="sortIconBig" style={{ color: typography ? "#79BCEE" : '' }} onClick={() => setTypography(true)} />
                        <MenuOutlined className="sortIconList" style={{ color: !typography ? "#79BCEE" : '' }} onClick={() => setTypography(false)} />
                    </div>
                </div>
                <div className="showBox">
                    
                </div>
            </div>
        </div>
    )
}