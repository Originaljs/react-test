import { useState, useEffect } from "react";
import { Input } from 'antd';
import { SearchOutlined, BellOutlined, DownOutlined, AuditOutlined, FolderAddOutlined, PlusOutlined, AppstoreOutlined, MenuOutlined, ArrowDownOutlined, StarOutlined } from '@ant-design/icons'
import { userCode } from '../../http/request'
import { calculateDiffTime } from '../../helpers/unit'

export const RightContent = (props: any) => {
    const [filter, setFilter] = useState("All files");
    const [sort, setSort] = useState('Last viewed');
    const [typography, setTypography] = useState(true);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        localStorage.setItem("userDesign_id", null as any);
        userCode((data: any) => {
            console.log(data)
            const timestamp = Date.parse(new Date().toString()) / 1000;
            let arr: any = [];
            data.data.forEach((item: any) => {
                const times: string = calculateDiffTime(
                    item.created,
                    timestamp
                );
                arr.push({
                    name: item.name,
                    time: times,
                    design_id: item.design_id,
                    status: item.status,
                    parameters: item.parameters,
                    result_id: item.result_id,
                });
            });
            setUserList(arr);

        })

    }, [])

    const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };
    const sortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    };

    const loadNewScene = () => {
        localStorage.setItem("userDesign_id", null as any);
        props.onChangeScene();
    };

    const intoThreeScene = (item: any) => {
        // console.log(item);
        localStorage.setItem("userDesign_id", item.design_id);
        props.onChangeScene();
        // jsonToModel(item.parameters);
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
                    <div className="newScece" onClick={loadNewScene}>
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
                    {typography ? (userList.map((item: any) => {
                        return (<div className="projectBox projectStyle" key={item.design_id} onClick={() => intoThreeScene(item)}>
                            <div className="projectHead"></div>
                            <div className="projectBot">
                                <AuditOutlined style={{ fontSize: '26px', lineHeight: '60px' }} />
                                <div className="projectIntroduce">
                                    <p>{item.name}</p>
                                    <span>{item.time}</span>
                                </div>
                                <div className="projectImg"></div>
                            </div>
                        </div>)
                    })) : (
                        <div className="projectListBox">
                            <div className="projectListTitle">
                                <div className="listColLeft">File name</div>
                                <div className="listColRight">Last viewed <ArrowDownOutlined style={{ fontSize: '11px', marginLeft: '2px' }} /></div>
                            </div>
                            {userList.map((item: any) => {
                                return (
                                    <div className="projectListModel" key={item.design_id} onClick={() => intoThreeScene(item)}>
                                        <div className="listColLeft">
                                            <StarOutlined style={{ fontSize: '16px', marginRight: '10px' }} />
                                            <div className="listUserImg"></div>
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="listColRight">{item.time}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}