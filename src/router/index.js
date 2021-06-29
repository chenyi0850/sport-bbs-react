import News from "../components/News"
import Articles from "../components/Articles"
import Videos from "../components/Videos"
import Equipment from "../components/Equipment"
import Write from "../components/Write"
import About from "../components/About"
import ArticleDetail from "../components/ArticleDetail"

const routes = [
    {
        title: '新闻',
        path: '/news',
        component: News
    },
    {
        title: '论坛',
        path: '/articles',
        component: Articles
    },
    {
        title: '视频',
        path: '/videos',
        component: Videos
    },
    {
        title: '装备',
        path: '/equipment',
        component: Equipment
    },
    {
        title: '发帖',
        path: '/write',
        component: Write
    },
    {
        title: '关于',
        path: '/about',
        component: About
    },
    {
        title: '文章详情',
        path: '/articleDetail',
        component: ArticleDetail
    }
]
export default routes