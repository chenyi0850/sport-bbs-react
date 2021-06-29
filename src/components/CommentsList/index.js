import React, { Component } from 'react'

import { Divider } from 'antd';
import { Button } from 'antd';
import './index.scss'

export default class CommentsList extends Component {
    render() {
        // console.log(this.props.comments)
        const comments = this.props.comments
        return (
            <div className="comments-list">
                <Divider />
                {this.props.commentsLength}条评论
                <Divider />
                {comments.map(value => {
                    const otherComment = value.other_comments
                    return (
                        <div key='value._id' className='comments'>
                            <div className='meta'>
                                <img src={value.user.avatar} alt="" />
                                <div>
                                    <h3>{value.user.name}</h3>
                                    <span>{value.create_time}</span>
                                </div>
                            </div>
                            <div className='content'>{value.content}</div>
                            <Button>回复</Button>
                            {/* {console.log(otherComment)} */}
                            {otherComment ? (
                                otherComment.map(otherComment => {
                                    return (
                                        <div className='other-comments' key="otherComment.create_time">
                                            <div className='meta'>
                                                <img src={otherComment.user.avatar} alt="" />
                                                <div>
                                                    <h3>{otherComment.user.name}</h3>
                                                    <span>{otherComment.create_time}</span>
                                                </div>
                                            </div>
                                            <div>回复 “ {otherComment.to_user.name} ”：{otherComment.content}</div>
                                            <Button>回复</Button>
                                        </div>
                                    )
                                })
                            ) : ''}
                            <Divider />
                        </div>
                    )
                })}
            </div>
        )
    }
}
