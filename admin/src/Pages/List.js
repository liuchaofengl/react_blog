import React,{useState,useEffect} from 'react';
import {Button,List,message,Row,Col,Modal} from "antd"
import servicePath from "../UrlApi/servicePath.js"
import axios from "axios"
import "../static/css/articleList.css"
function ArticleList(props){
    const {confirm} = Modal
    const [list,setList] = useState([])
    useEffect(()=>{
        getList()
    },[])
    const getList = () => {
        axios({
            method:'get',
            url:servicePath.articleList,
            withCredentials:true,
            header:{'Access-Control-Allow-Origin':'*'}
        })
        .then(res =>{
            setList(res.data.list)
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    //删除方法
    const handleDel = (id) => {
        confirm({
            title: '你真的删除吗?',
           
            content: '删了就找不回了!',
            onOk() {
              console.log('OK');
              axios({
                  method:"get",
                  url:servicePath.delarticleById+id,
                  withCredentials:true
              })
              .then((res=>{
                    message.success('删除成功')
                    getList()
              }))
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // 修改方法
    const handleUpdate = (id) =>{
        props.history.push('/index/add/'+id)
        
    }
    return (
        <div>
            <List
               
                header={
                    <Row>
                        <Col span={8}>标题</Col>
                        <Col span={4}>类别</Col>
                        <Col span={4}>发布时间</Col>
                        <Col span={4}>浏览量</Col>
                        <Col span={4}>操作</Col>
                    </Row>
                   
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item  >
                        <Row className='list-div'>
                            <Col span={8}>{item.title}</Col>
                            <Col span={4}>{item.typeName}</Col>
                            <Col span={4}>{item.add_time}</Col>
                            <Col span={4}>{item.view_count}</Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{handleUpdate(item.id)}}>修改</Button>
                               
                                
                                <Button type="primary" onClick={()=>{handleDel(item.id)}}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ArticleList;
