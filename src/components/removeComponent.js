import React, { Component } from 'react'

class RemoveComponent extends Component {
  
    render() {
        return (
            <a onClick={() => this.props.onRemove(this.props)}
                href="#" className="btn btn-danger ml-2">{this.props.name}</a>
        )
    }
}

export default RemoveComponent