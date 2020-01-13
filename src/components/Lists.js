import React, { Component } from 'react'
import Cards  from './Cards.js'
import { appKey, appToken } from '../config.js'

class Lists extends Component {
    constructor(){
        super()
        this.state = {
            cards:[]
        }
    }

    //style
    card={
        padding: '0.5em', 
        overflowY: 'auto', 
        maxHeight: '16.5em'
    }

    //life cycle components
    componentDidMount(){
        const cardsData=fetch(`https://api.trello.com/1/lists/${this.props.id}/cards?key=${appKey.key}&token=${appToken.token}`)
        cardsData.then(res=>res.json())
            .then(data=>this.setState({
                 cards:data
            }))
    }

    render() {
        return (
            <div className='card-wrapper'>
                <div className="card mr-2 ml-2" style={{ maxWidth: "18rem", width:'18em' }}>
                    <div className="card-header bg-transparent">{this.props.name}</div>
                    <div className="card-body" style={this.card}>
                        { this.state.cards.map(card=>
                            <Cards key={card.id}
                            card={card}
                            onCard={this.props.onCard} 
                            />
                        )}
                    </div>
                    <div className='add-card'
                    style={{padding: '1em' }}>
                        <input className="card-input" type="text" style={{ width: "100%" }} /><br />
                        <button className="add-card" type="button" style={{ width: "100%" }}>add card</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lists;