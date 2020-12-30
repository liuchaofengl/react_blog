module.exports = (app) => {
    const {router,controller} = app;
    const author = app.middleware.author()
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',author,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',author,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',author,controller.admin.main.updateArticle)
    router.get('/admin/articleList',author,controller.admin.main.articleList)
    router.get('/admin/delarticleById/:id',author,controller.admin.main.delarticleById)
    router.get('/admin/getArticleById/:id',author,controller.admin.main.getArticleById)
}