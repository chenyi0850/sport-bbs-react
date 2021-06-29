import React, { Component } from 'react'
import { getArticleDetail } from '../../network/api'
import CommentsList from '../CommentsList'

// import { Alert } from 'antd'
import { Comment, Avatar, Form, Button, Input, Divider, message } from 'antd';
// import moment from 'moment';

import './index.scss'
import defaultAuth from '../../assets/avatar/user.png'
import basketball from '../../assets/avatar/basketball.jpg'

import { addComment } from '../../network/api';

import { connect } from 'react-redux'
import { setLoginModalFalse, setLoginModalTrue } from '../../store/actionCreators'

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                添加评论
            </Button>
        </Form.Item>
    </>
);

class ArticleDetail extends Component {
    render() {
        const { author, update_time, meta, comments } = this.state.articleDetail
        return (
            <div className="article-detail">
                <div className="meta">
                    <img src={this.state.authLogo} alt='作者头像' />
                    <div>
                        <h2>{author}</h2>
                        <span>{update_time}</span>
                        {meta ? <span><span>查看：{meta.views}</span><span>点赞：{meta.likes}</span><span>评论：{meta.comments}</span></span> : ''}
                    </div>
                </div>
                {/* <Alert message="文章不存在！！" type="error" /> */}
                <h1>{this.state.articleDetail.title}</h1>
                <img src={this.state.articleDetail.img_url} alt="" className='img-url' />
                <span dangerouslySetInnerHTML={{ __html: this.state.articleDetail.content }} className='content'></span>
                {/* {console.log(comments)} */}

                <Divider></Divider>
                <Comment
                    avatar={
                        <Avatar
                            src={window.localStorage.userInfo ? JSON.parse(window.localStorage.userInfo).avatar : ''}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={this.state.submitting}
                            value={this.state.value}
                        />
                    }
                />

                {comments ? <CommentsList comments={comments} commentsLength={meta.comments} /> : ''}
            </div>
        )
    }

    state = {
        articleDetail: {},
        authLogo: '',

        // 评论框
        comments: [],
        submitting: false,
        value: '',
    }

    async componentDidMount() {
        const res = await getArticleDetail({ id: this.props.location.state._id })
        switch (res.data.data.auth_logo) {
            case 'basketball': {
                this.setState({
                    articleDetail: res.data.data,
                    authLogo: basketball,
                })
                break
            }
            default: {
                this.setState({
                    articleDetail: res.data.data,
                    authLogo: defaultAuth
                })
                break
            }
        }

        // console.log(this.state.authLogo)
        // console.log(this.state.articleDetail)
    }


    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    handleSubmit = async () => {
        if (!this.state.value) {
            message.warn("请输入内容！")
            return
        }
        if (!window.localStorage.userInfo) {
            this.props.setLoginModalTrue()
        } else {
            this.setState({
                submitting: true,
            });
            await addComment({
                article_id: this.state.articleDetail._id,
                user_id: JSON.parse(window.localStorage.userInfo).user_id,
                content: this.state.value
            })
            this.setState({
                submitting: false,
            });
        }

    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    setLoginModalTrue() {
        const action = setLoginModalTrue()
        dispatch(action)
    },
    setLoginModalFalse() {
        const action = setLoginModalFalse()
        dispatch(action)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)
