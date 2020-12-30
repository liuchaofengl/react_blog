'use strict'
const Controller = require('egg').Controller;
class MainAdmin extends Controller {
    async index(){
        this.ctx.body = "hi body"
    }
    // 用户登录检测接口
    async checkLogin(){
        let useName = this.ctx.request.body.useName;
        let passWord = this.ctx.request.body.passWord;
        let sql = "select useName,passWord from admin_user where useName='"+useName+"' and passWord='"+passWord+"'"
        const res = await this.app.mysql.query(sql)
        console.log(res)
        if(res.length>0){
            let openId = new Date().getTime();
            this.ctx.session.openId = {'openId':openId}
            this.ctx.body = {data:"登录成功",'openId':openId}
        }else{
            this.ctx.body = {data:"登录失败"}
        }
    }
    // 获取文章类型
    async getTypeInfo(){
        let res =await this.app.mysql.select('type_t')
        this.ctx.body = {data:res}

    }
    // 添加文章
    async addArticle(){
        const temArticle = this.ctx.request.body //前台axios传入的对象数据
        const result =await this.app.mysql.insert("article",temArticle)
        const isSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess:isSuccess,
            insertId:insertId
        }
     
    }
    // 修改文章
    async updateArticle(){
        const temArticle = this.ctx.request.body
        const result  = await this.app.mysql.update('article',temArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            updateSuccess:updateSuccess
        }
    }
    //文章列表(在后台文章列表里)
    async articleList(){
        let sql = 'SELECT article.id AS id,'+
        'article.title,type_t.typeName,'+
        'article.introduce,article.article_content,'+
        'article.view_count,'+
        "from_unixtime(article.add_time,'%Y-%m-%d %H:%i:%s') as add_time "+
        'FROM article LEFT JOIN type_t ON article.type_id = type_t.id '+
        'order by article.id DESC'
        let resList =await this.app.mysql.query(sql)
        this.ctx.body = {list:resList}
    }
    // 删除数据
    async delarticleById(){
        let id = this.ctx.params.id
        let res = this.app.mysql.delete('article',{id:id})
        this.ctx.body = {
            data:res
        }
    }
    // 通过id获取所有文章信息{在后台系统文章修改里调用}
    async getArticleById(){
        let id = this.ctx.params.id //这样获取id的形式只能用get形式
        let sql = 'SELECT article.id AS id,'+
        'article.title,type_t.typeName,'+
        'article.introduce,article.article_content,'+
        'article.view_count,'+
        "from_unixtime(article.add_time,'%Y-%m-%d') as add_time "+
        'FROM article LEFT JOIN type_t ON article.type_id = type_t.id '+
        'where article.id='+id
        let res =await this.app.mysql.query(sql)
        this.ctx.body = {
            data:res
        }
    }

}
module.exports = MainAdmin