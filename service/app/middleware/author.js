// 路由守卫中间件
module.exports = options => {
    return async function author(ctx,next){
        if(ctx.session.openId){
           await next()
        }else{
            ctx.body = {data:"没有登录"}
        }
    }
}