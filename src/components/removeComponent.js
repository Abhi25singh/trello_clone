import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RemoveComponent extends Component {
  
    render() {
        return (
            <Link onClick={() => this.props.onRemove(this.props)}
                to="#" className="btn btn-danger ml-2">{this.props.name}</Link>
        )
    }
}

export default RemoveComponent