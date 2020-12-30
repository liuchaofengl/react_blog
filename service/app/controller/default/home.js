'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.app.mysql.get("article",{});
    ctx.body = result;
  };
  async list() {
    const { ctx } = this;
    ctx.body = 'hi, list';
  };
  async getArticleList() {
    let sql = 'SELECT article.id AS id,'+
    'article.title,type_t.typeName,'+
    'article.introduce,article.article_content,'+
    'article.view_count,'+
    "from_unixtime(article.add_time,'%Y-%m-%d %H:%i:%s') as add_time "+
    'FROM article LEFT JOIN type_t ON article.type_id = type_t.id'
    let result =await this.app.mysql.query(sql)
      this.ctx.body = {data:result}
  }

  // 通过文章Id获取文章内容
  async getArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT article.id AS id,'+
    'article.title,type_t.typeName,'+
    'article.introduce,article.article_content,'+
    "article.add_time as add_time "+
    'FROM article LEFT JOIN type_t ON article.type_id = type_t.id '+
    'where article.id='+id
    let result =await this.app.mysql.query(sql)
    this.ctx.body = {data:result}

  }
  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select("type_t")
    this.ctx.body = {data:result}
  }

}

module.exports = HomeController;
