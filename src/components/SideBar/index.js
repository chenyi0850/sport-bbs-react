import React, { Component } from 'react'
import './index.scss'

export default class SideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="boundary"></div>
                <div className="content"></div>
            </div>
        )
    }
}
