import React,{useState,useEffect} from 'react';
import "../static/css/addArticle.css"
import marked from "marked"
import {Button,Select,Input,Row,Col,DatePicker,message} from "antd"
import servicePath from "../UrlApi/servicePath.js"
import axios from "axios"
const {Option} = Select;
const { TextArea } = Input;
function AddArticle(props) {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState('')   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('选择文章类型') //选择的文章类别
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      });
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html =  marked(e.target.value)
        setIntroducemd(html)
    }
    //获取文章类型
    const getTypeInfo =()=>{
        axios({
            method:"get",
            url:servicePath.getTypeInfo,
            withCredentials: true
        })
        .then((res) => {
            if(res.data.data == '没有登录'){
                localStorage.removeItem('openId')
                props.history.push('/')
            }else{
                setTypeInfo(res.data.data)
            }
            
        })
        .catch(err=>{
            console.log('出错啦')
            console.log(err)
        })
    }
    useEffect(()=>{
        getTypeInfo()
        console.log(props)
        if(props.match.params.id){
            setArticleId(props.match.params.id)
            getArticleById(props.match.params.id)
        }

    },[])

    //select里的onChange方法
    const setType = (value) =>{
        setSelectType(value)
        console.log(value)
    }
    //发布文章方法(先检测数据)
    const saveArticle = () => {
        if(!selectedType){
            message.error("文章类型不能为空")
            return false
        }else if(!introducemd){
            message.error("文章简介不能为空")
            return false
        }else if(!articleContent){
            message.error("文章内容不能为空")
            return false
        }else if(!articleTitle){
            message.error("文章标题不能为空")
            return false
        }
        message.success('检验通过！')
      
        let dataProps = {}
        dataProps.type_id = selectedType;
        dataProps.introduce=introducemd;
        dataProps.article_content=articleContent;
        dataProps.title=articleTitle
        
       
        
        let dateText = showDate.replace(/-/g,'/')
        console.log(new Date(dateText).getTime())
        dataProps.add_time = (new Date(dateText).getTime())/1000
        if(articleId==0){
            dataProps.view_count = Math.ceil(Math.random()*100)+1000

            axios({
                method:'post',
                url:servicePath.addArticle,
                data: dataProps,
                withCredentials:true
               
            })
            .then((res)=>{
                if(res.data.isSuccess){
                    setArticleId(res.data.insertId)
                    message.success("添加成功")
                }else{
                    message.error("未能传入数据哭")
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            dataProps.id = articleId
            axios({
                method:"post",
                url:servicePath.updateArticle,
                withCredentials:true,
                data:dataProps
            })
            .then(
                (res)=>{
                    if(res.data.updateSuccess){
                        message.success("文章修改成功")
                    }else{
                        message.error('修改失败')
                    }
                }
            )
        }
    }
    //修改文章时通过id获取文章详情
    const getArticleById = (id) => {
        axios({
            method:'get',
            url:servicePath.getArticleById+id,
            withCredentials:true
        })
        .then((res)=>{
            let temData = res.data.data[0]
            setArticleTitle(temData.title)
            setArticleContent(temData.article_content)
            let html = marked(temData.article_content)
            setMarkdownContent(html)
            setIntroducemd(temData.introduce)
            let temIn = marked(temData.introduce)
            setIntroducehtml(temIn)
            setShowDate(temData.add_time)
            
        })
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={(e)=>{setArticleTitle(e.target.value)}}
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={setType}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                                value={articleContent}
                                
                               
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{__html:markdownContent}}
                            >

                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                onChange = {changeIntroduce}
                                value={introducemd}

                            />
                            <br/><br/>
                            <div  className="introduce-html"
                                dangerouslySetInnerHTML={{__html:introducemd}}
                            ></div>
                        </Col>
                      
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    onChange={(date,dateString)=>{setShowDate(dateString)}}
                                   
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle