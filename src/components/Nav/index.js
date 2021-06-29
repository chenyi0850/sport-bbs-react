import React, { Component, Fragment } from 'react'
import './index.scss'
import { Menu, Modal, Avatar, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import routes from '../../router'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { setUserInfo, setLoginModalTrue, setLoginModalFalse } from '../../store/actionCreators'

import { login } from '../../network/api'

class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={this.selectedMenuItem} onClick={this.handleMenuClick}>
                    {routes.slice(0, 6).map((value) => {
                        return <Menu.Item key={value.path}>{value.title}</Menu.Item>;
                    })}
                    {this.props.userInfo ? <Menu.Item style={{ marginLeft: '600px' }} key="/user"><Avatar size="large" icon={<UserOutlined />}></Avatar></Menu.Item> : <Fragment><Menu.Item style={{ marginLeft: '600px' }} key='/login'>登录</Menu.Item>
                        <Menu.Item key='/register'>注册</Menu.Item></Fragment>}
                </Menu>
                <Modal title="登录" okText="登录" cancelText="取消" visible={this.props.isLoginModalVisible} footer={null} onCancel={this.handleCancel}>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入邮箱!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        )
    }

    selectedMenuItem = this.props.location.pathname === '/' ? '/news' : this.props.location.pathname

    handleMenuClick = (menuItem) => {
        if (menuItem.key === '/login') {
            this.props.setLoginModalTrue()
        } else if (menuItem.key === '/register') {
        } else {
            this.props.history.push(menuItem.key)
        }
    }

    //登录弹框的事件
    // isModalVisible = false
    handleCancel = () => {
        this.props.setLoginModalFalse()
    }

    // form表单事件
    onFinish = async (values) => {
        const res = await login(values)
        message.success('登录成功');
        this.props.setLoginModalFalse()
        this.props.setUserInfo(res.data.data)
        window.localStorage.userInfo = JSON.stringify(res.data.data)
        // console.log(res)
        // console.log('Success:', values);
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    isLoginModalVisible: state.isLoginModalVisible
})

const mapDispatchToProps = dispatch => ({
    setUserInfo(data) {
        const action = setUserInfo(data)
        dispatch(action)
    },
    setLoginModalTrue() {
        const action = setLoginModalTrue()
        dispatch(action)
    },
    setLoginModalFalse() {
        const action = setLoginModalFalse()
        dispatch(action)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))