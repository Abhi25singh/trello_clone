import React, { Component } from 'react'
import Checkitems from './Checkitems'
import Add from './addComponent.js'
import Remove from './removeComponent.js'

class Checklists extends Component {

    //style
    checklistStyle={
        display: 'flex',
        justifyContent: 'space-between'
    }


    render() {
        const {name ,checkItems}=this.props.checklist
        return (
            <div className='checklist-info'>
                <div className='checklist' style={this.checklistStyle}>
                    <div>{name}</div>
                    <Remove name={'remove'} 
                    checklist={this.props.checklist.id}
                    onRemove={this.props.onRemove}/>
                </div>
                <hr />
                <ul className="check-items">
                    {checkItems.map(item=>
                        <Checkitems key={item.id}
                            item={item} 
                            onRemoveItem={this.props.onRemoveItem}
                            onChange={this.props.onChange}/>)
                    }
                </ul>
                <div>
                    <Add name={'add-checkitem'}
                        onAdd={this.props.onAdd}
                        onInput={this.props.onInput}
                        checklist={this.props.checklist}/>
                </div>
                <br />
            </div>
        )
    }
}

export default Checklists