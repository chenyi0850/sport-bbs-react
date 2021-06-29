import React, { Component } from 'react'
import { Carousel } from 'antd';
import ArticleItem from '../ArticleItem'

import './index.scss'

import { getArticleList } from '../../network/api';
    import { withRouter } from 'react-router-dom';

class News extends Component {
    render() {
        const { articles } = this.state
        return (
            <div className='news'>
                <Carousel autoplay dotPosition='top'>
                    {this.state.carouselImgs.map((value) => {
                        return <div key={value._id} className='carousel-item'><img src={value.img_url} alt="轮播图" /><h3>{value.title}</h3></div>
                    })}
                </Carousel>
                {articles.map((value) => {
                    return <ArticleItem key={value._id} articleDetail={value} onClick={this.toArticleDetail(value._id)} />
                })}
            </div>
        )
    }

    state = {
        articles: [
            {
                _id: '0',
                title: "标题1",
                author: "管理员",
                create_time: "2021-05-24 23:29:05",
                desc: "本次「掘力计划 · 线下沙龙」活动邀请到四位嘉宾为大家分享 云原生时代的框架&存储技术。此外，掘金首批官方签约作者 也将在此次活动上亮相哦～～ 敬请期待！😜",
                meta: {
                    views: 0,
                    likes: 0,
                    comments: 0
                },
                img_url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c27bb36efc1494bad6be01063f11c8c~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:426:240.image"
            },
        ],
        carouselImgs: []
    }

    async componentDidMount() {
        const res = await getArticleList({
            state: 1,
            type: 1,
            pageNum: 1,
            PageSize: 10
        })
        this.setState((state) => ({
            articles: [...res.data.data.list, ...state.articles],
            carouselImgs: res.data.data.list.slice(0, 5)
        }))
    }

    toArticleDetail = (_id) => {
        return () => {
            this.props.history.push({ pathname: '/articleDetail', state: { _id } })
        }
    }
}

export default withRouter(News)