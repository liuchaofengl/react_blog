import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import "../static/css/adminindex.css"
import {Route} from "react-router-dom"
import AddArticle from './AddArticle'
import ArticleList from './List'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,

  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function SiderDemo(props){
    const [collapsed,Setollapsed] = useState(false)

  const onCollapse = (collapsed)=> {
    Setollapsed(collapsed)   
   
  };

  //文章管理方法
  const handleSub = (e)=>{
    if(e.key == 'addarticle'){
        props.history.push('/index/add')
    }else if(e.key == 'articlelist'){
      props.history.push('/index/articlelist')
    }
  }
 
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                添加文章
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleSub}>
              <Menu.Item key="addarticle">增加文章</Menu.Item>
              <Menu.Item key="articlelist">文章列表</Menu.Item>
           
            </SubMenu>
        
            <Menu.Item key="9" icon={<FileOutlined />}>
                留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Route path="/index/" exact component={AddArticle}/>
                    <Route path="/index/add" exact component={AddArticle}/>
                    <Route path="/index/add/:id" exact component={AddArticle}/>
                    <Route path="/index/articlelist" exact component={ArticleList}/>
                </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  
}
export default SiderDemo