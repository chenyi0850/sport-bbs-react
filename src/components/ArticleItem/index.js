import React, { Component } from 'react'
import { EyeOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'

import './index.scss'

export default class ArticleItem extends Component {
    render() {
        const {title, author, create_time, desc, meta, img_url} = this.props.articleDetail
        return (
            <div className="article-item" onClick={this.props.onClick}>
                <div className="top">
                    <span className="author">{author}</span>
                    <span className="time">{create_time}</span>
                </div>
                <h3 className="title">{title}</h3>
                <div className="content">
                    <div className="left">
                        <p className="desc">{desc}</p>
                        <div className="meta">
                            <span className="meta-span"><EyeOutlined />{meta.views}</span>
                            <span className="meta-span"><LikeOutlined />{meta.likes}</span>
                            <span className="meta-span"><CommentOutlined />{meta.comments}</span>
                        </div>
                    </div>
                    <div className="right">
                        <img src={img_url} alt="文章图片" />
                    </div>
                </div>
            </div>
        )
    }

    // state = {
    //     articleDetail: {
    //         title: "标题",
    //         author: "管理员",
    //         create_time: "时间",
    //         desc: "本次「掘力计划 · 线下沙龙」活动邀请到四位嘉宾为大家分享 云原生时代的框架&存储技术。此外，掘金首批官方签约作者 也将在此次活动上亮相哦～～ 敬请期待！😜",
    //         meta: {
    //             views: 0,
    //             likes: 0,
    //             comments: 0
    //         },
    //         img_url: "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c27bb36efc1494bad6be01063f11c8c~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:426:240.image"
    //     }
    // }
}
