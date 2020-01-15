import React, { Component } from 'react'
import Remove from './removeComponent.js'

class Checkitem extends Component {
    
    //style
    checkitemStyle={
        display: 'flex',
        justifyContent: 'space-between',
        padding:'1em 0'
    }

    item={
        textDecoration:'line-through'
    }


    render() {
        const {name, state}=this.props.item
        return (
            <li className="item-container" style={this.checkitemStyle}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" checked={state==='complete'?true:false}
                                onChange={()=>this.props.onChange(this.props.item)}/>
                        </div>
                        {state==='complete'?
                        <div style={this.item} className="items" >{name}</div>
                        :<div className="items" >{name}</div>}
                    </div>
                </div>
                <Remove name={'remove'} 
                    checkitem={this.props.item}
                    onRemove={this.props.onRemoveItem} />
            </li>
        )
    }
}

export default Checkitem