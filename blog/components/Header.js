
import React from 'react';
import '../static/components/header.css'
import {Row,Col,Menu} from "antd"
import { HomeOutlined,InstagramOutlined,RedditOutlined} from '@ant-design/icons'
const Header = () => {
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">技术胖</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={12} lg={10} xl={10}>
                    <Menu  mode="horizontal">
                        <Menu.Item key="Home" icon={<HomeOutlined />}>
                            博客首页
                        </Menu.Item>
                        <Menu.Item key="video" icon={<InstagramOutlined />}>
                            视频教程
                        </Menu.Item>
                        <Menu.Item key="smile" icon={<RedditOutlined />}>
                            快乐生活
                        </Menu.Item>
                
                    </Menu>
                </Col>

            </Row>
        </div>
    )
}
export default  Header