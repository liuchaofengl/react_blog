import React,{useState} from 'react';

import 'antd/dist/antd.css';
import { Card, Input, Button ,Spin,message } from 'antd';
import { UserOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import axios from "axios"
import "../static/css/Login.css"
import servicePath from '../UrlApi/servicePath.js'
const Login = (props) => {
    const [useName , setUserName] = useState('')
    const [passWord , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = () => {
        setIsLoading(true)
        if(!useName){
            message.error("用户名不能为空")
            setTimeout(()=>{setIsLoading(false)},500)
            return false
        }
        if(!passWord){
            message.error("密码不能为空")
            setTimeout(()=>{setIsLoading(false)},500)
            return false
        }
        let propsData = {
            useName:useName,
            passWord:passWord
        }
        console.log(propsData)
        axios({
            method:"post",
            url:servicePath.checkLogin,
            data:propsData,
            withCredentials: true
            
        })
        .then((res)=>{
            setIsLoading(false)
            if(res.data.data==="登录成功"){
                localStorage.setItem('openId',res.data.openId)
                props.history.push("/index")
            }else{
                message.error="账号和用户民错误"
            }
        })


        setTimeout(()=>{
            setIsLoading(false) 
        },1000)
    }
    return (
        <div className="login-div">
           <Spin tip="loading" spinning={isLoading}>
                <Card style={{width:400}} title="JSPang Blog  System" bordered={true}>
                    <Input
                        id="userName"
                        placeholder="Enter your useName"
                        size="large"
                        prefix={<UserOutlined />}
                        onChange={(e)=>{setUserName(e.target.value)}}

                    />
                    <br/>
                    <br/>
                    <Input
                        id="password"
                    placeholder="Enter your Password"
                    size="large"
                    prefix={<EyeInvisibleOutlined />}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/>
                    <br/>
                    <Button
                        size="large"
                        type="primary"
                        block
                        onClick={checkLogin}

                    >Click</Button>
                </Card>
           </Spin>
        </div>
    )
}
export default Login