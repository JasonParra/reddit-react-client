import React from 'react'
import { Button, Typography, Row } from 'antd'
import {
    LoginOutlined,
    UserAddOutlined,
    RedditCircleFilled
} from '@ant-design/icons';
import { buildRedditAouthLink, buildRedditRegisterLink } from '../../utils/utils';
import './Header.css'

const Header = () => {
    const { Text } = Typography;

    const handleLoginClick = () => {
        window.location.href = buildRedditAouthLink();
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
                <Button shape='round' icon={<LoginOutlined />} onClick={handleLoginClick} color='blue'> Login </Button>
                <Button className='register-button' shape='round' icon={<UserAddOutlined />} onClick={handleRegisterClick} color='blue'> Register </Button>
            </Row>
        </div >
    )
}


export default Header