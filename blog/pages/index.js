import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import Link from "next/Link"
import "../static/pages/index.css"
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from "../components/Advert"
import Footer from "../components/Footer"
import {Row,Col,List} from "antd"
import { ContactsOutlined, InstagramOutlined,TeamOutlined} from '@ant-design/icons';
import axios from "axios"
import servicePath from "../config/apiUrl"
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const Home = (datas) => {
  const [myList,Setmylist] = useState(datas.datas)
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

  
  return (
      <>
        <Head>
            <title>Home</title>
        </Head>
        <Header/>
       {/* 主体部分 */}
        <Row className="comm-main" type="flex" justify="center">

              <Col className="comm-left" xs={24} sm={24} md={10} lg={10} xl={10}>
                    <List
                      header={<div>最新日志</div>}
                    
                      itemLayout="vertical"
                      dataSource={myList}
                      renderItem= { item =>(
                          <List.Item>
                              <div className="list-title" >
                                  <Link  href={{pathname:'/detailed',query:{id:item.id}}}>
                                      <a>{item.title}</a>
                                  </Link>
                              </div> 
                              <div className="list-icon">
                                  <span>
                                      <ContactsOutlined />
                                      {item.add_time}
                                  </span>
                                  <span>
                                      <InstagramOutlined />
                                      视频教程
                                  </span>
                                  <span>
                                    <TeamOutlined />
                                    人数 {item.view_count}
                                  </span>
                              </div>
                              <div className="list-context"
                                dangerouslySetInnerHTML={{__html:marked(item.article_content)}}
                              >
                                    

                              </div>

                          </List.Item>
                      )
                       
                      }
                    />
              </Col>
              <Col className="comm-right" xs={0} sm={0} md={12} lg={10} xl={10}>
                   <Author/>
                   <Advert/>
              </Col>
        </Row>

       
        <Footer/>
      </>
  )
}
export async function getStaticProps(){
    
    const res = await axios.get(servicePath.getArticleList)
    
    const datas = res.data.data

  
    return {
       props:{
         datas
       }
        
      
    }
}
export default Home;