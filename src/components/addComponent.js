import React, { Component } from 'react'

class AddComponent extends Component {
    
    render() {
        return (
            <React.Fragment>
                <input
                    onMouseLeave={(evt) => this.props.onInput(evt.target)}
                    className="card-input" type="text" />
                <button
                    onClick={() => this.props.onAdd(this.props)}
                    className="add-card" type="button" >{this.props.name}</button>
            </React.Fragment>
        )
    }
}

export default AddComponent
