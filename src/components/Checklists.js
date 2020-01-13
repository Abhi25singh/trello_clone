import React, { Component } from 'react'
import Checkitems from './Checkitems'

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
                    <a href="#" className="checklist" >remove</a>
                </div>
                <hr />
                <ul className="check-items">
                    {checkItems.map(item=>
                        <Checkitems key={item.id}
                            items={item}
                        />)
                    }
                </ul>
                <div>
                    <input className='checkitem-input' type="text" />
                    <button className='add-checkitem' type="button">add checklist item</button>
                </div>
                <br />
            </div>
        )
    }
}

export default Checklists