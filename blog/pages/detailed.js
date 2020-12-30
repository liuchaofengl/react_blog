import React,{useEffect,useState} from 'react'
import Head from 'next/head'
import {withRouter} from "next/router"
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from "../components/Advert"
import Footer from "../components/Footer"
import {Row,Col,List,Breadcrumb,Affix } from "antd"
import { ContactsOutlined, InstagramOutlined,TeamOutlined} from '@ant-design/icons';
import "../static/pages/detailed.css"
import servicePath from "../config/apiUrl"

import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import axios from "axios"

const Detailed = (datas) => {
 
let markdown='# P01:课程介绍和环境搭建\n' +
'[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
'> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
 '**这是加粗的文字**\n\n' +
'*这是倾斜的文字*`\n\n' +
'***这是斜体加粗的文字***\n\n' +
'~~这是加删除线的文字~~ \n\n'+
'\`console.log(111)\` \n\n'+
'# p02:来个Hello World 初始Vue3.0\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n'+
'***\n\n\n' +
'# p03:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p04:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'#5 p05:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p06:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p07:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'``` var a=11; ```'
const renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 
   
    let html = marked(datas.datas[0].introduce) 
  return (
      <>
        <Head>
            <title>博客详细页</title>
        </Head>
        <Header/>
        {/* 主题部分 */}
        <Row className="comm-main" type="flex" justify="center">
              <Col className="comm-left" xs={24} sm={24} md={10} lg={10} xl={10}>
                   <div>
                        <div className="bread-div">
                            <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                            <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="detailed-title">
                            React实战视频教程-技术胖Blog开发(更新08集)
                        </div>

                        <div className="list-icon center">
                            <span><TeamOutlined/> 2019-06-28</span>
                            <span> <InstagramOutlined/>视频教程</span>
                            <span><ContactsOutlined/> 5498人</span>
                        </div>
                        <div className="detailed-content" 
                            dangerouslySetInnerHTML={{__html:html}}
                        >
                            
                        </div>
                   </div>
              </Col>
              <Col className="comm-right" xs={0} sm={0} md={12} lg={10} xl={10}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={10}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                source={datas.datas[0].introduce}
                                ordered={false}
                            />
                        </div>
                    </Affix>
                    
              </Col>
        </Row>
        <Footer/>
      </>
  )
}
export async function getServerSideProps(content){
    let id = content.query.id
    const res = await axios.get(servicePath.getArticleById+id)
    const datas = res.data.data
    console.log(datas)
    return {
        props:{
            datas
        }
    }
}
export default Detailed;