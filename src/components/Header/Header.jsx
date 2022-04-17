import React, { useEffect, useState } from 'react'
import { Button, Typography, Row, Col } from 'antd'
import {
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    RedditCircleFilled
} from '@ant-design/icons';
import { buildRedditAouthLink, buildRedditRegisterLink } from '../../utils/utils';
import { getStore } from '../../utils/utils';
import { isLooged } from '../../api/utils'

import './Header.css'

const Header = (props) => {
    const { Text } = Typography;
    const [reRender, setReRender] = useState(false);
    const user = getStore('user');

    const handleLogin = () => {
        window.location.href = buildRedditAouthLink();
    }

    const handleLogOut = () => {
        localStorage.setItem('token', JSON.stringify({}));
        setReRender(!reRender);
    }

    const handleRegisterClick = () => {
        window.location.href = buildRedditRegisterLink();
    }

    return (
        <div className='header'>
            <Row align='middle'>
                <RedditCircleFilled className='reddit-icon' />
                <Text strong className='title'>Reddit</Text>
            </Row>
            <Row>
                {isLooged() && <Col className='user'> <Text strong>{user?.name}</Text><div>{`Karma: ${user?.total_karma}`}</div></Col>}
                {!isLooged() && <Button shape='round' icon={<LoginOutlined />} onClick={handleLogin} color='blue'> Login </Button>}
                {isLooged() && <Button shape='round' icon={<LogoutOutlined />} onClick={handleLogOut} color='blue'> Logout </Button>}
                <Button className='register-button' shape='round' icon={<UserAddOutlined />} onClick={handleRegisterClick} color='blue'> Register </Button>
            </Row>
        </div >
    )
}


export default Header;