import React, { Component } from 'react'

class Cards extends Component {
    
    //style
    card = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        padding: '0.5em',
    }

    render() {
        return (
            <div className="card mt-2 mb-2" 
            style={{width: '15rem'}} >
                <div className="card-body"
                 style={this.card}>
                    <h5 onClick={()=>this.props.onCard(this.props.card)}
                    className="card-title" 
                    data-toggle="modal" 
                    data-target="#exampleModalScrollable">
                        <span style={{wordBreak: 'break-word'}}>{this.props.card.name}</span>
                    </h5>
                    <a href="#" className="btn btn-danger ml-2">remove</a>
                </div>
            </div>
        )
    }
}

export default Cards