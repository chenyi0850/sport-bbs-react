import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Layout } from 'antd';
import Nav from './components/Nav'
import SideBar from './components/SideBar';
import routes from './router'
const { Header, Footer, Sider, Content } = Layout;



class App extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <Nav></Nav>
        </Header>
        <Layout className='layout'>
          <Content className='content'>
            <Switch>
              <Redirect from='/' to='/news' exact />
              {routes.map((value) => {
                return <Route key={value.path} path={value.path} component={value.component}></Route>
              })}
            </Switch>
          </Content>
          {/* {console.log(this.props.location.pathname)} */}
          {/* {this.props.location.pathname === ('/news' || '/articles' || '/videos' || '/equipment' || '/about' || '/articleDetail') && (<Sider width='350' theme="light"><SideBar /></Sider>)} */}
          <Sider width='350' theme="light"><SideBar /></Sider>
        </Layout>
        <Footer className="footer" style={{ textAlign: "center" }}>Sport BBS ©2021 Created by Chenyi</Footer>
      </Layout>
    )
  }
}

export default withRouter(App);
