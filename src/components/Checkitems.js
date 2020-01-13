import React, { Component } from 'react'

class Checkitem extends Component {
    
    //style
    checkitemStyle={
        display: 'flex',
        justifyContent: 'space-between'
    }

    render() {
        const {name, status}=this.props.items
        return (
            <li className="item-container" style={this.checkitemStyle}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" />
                        </div>
                        <div className="items" >{name}</div>
                    </div>
                </div>
                <a href="#">remove</a>
            </li>
        )
    }
}

export default Checkitem