import { Avatar,Divider} from "antd"
import { GithubOutlined,WeiboCircleOutlined,WechatOutlined } from '@ant-design/icons';
import "../static/components/author.css"
// 作者简介组件
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" /></div>
            <div className="author-introduction">
                光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} className="account" icon={<GithubOutlined />} />
                <Avatar size={28} className="account" icon={<WeiboCircleOutlined />} />
                <Avatar size={28} className="account" icon={<WechatOutlined />} />
            </div>
        </div>
    )
}
export default Author