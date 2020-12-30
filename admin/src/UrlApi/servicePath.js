const url = 'http://127.0.0.1:7001/admin/';
const servicePath = {
    checkLogin:url+'checkLogin',
    getTypeInfo:url+'getTypeInfo',
    addArticle:url+'addArticle',
    updateArticle:url+'updateArticle',
    articleList:url+'articleList',
    delarticleById:url+'delarticleById/', //根据id删除数据库对应数据
    getArticleById:url+'getArticleById/' //根据id获取文章详情
}
export default servicePath;