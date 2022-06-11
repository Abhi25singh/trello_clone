import React, { Component } from 'react'
import Cards from './Cards.js'
import { appKey, appToken } from '../config.js'
import Add from './addComponent.js'
import Remove from './removeComponent.js'

class Lists extends Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            input: ''
        }
        this.inputCard = this.inputCard.bind(this)
        this.postCard = this.postCard.bind(this)
        this.removeCard = this.removeCard.bind(this)
    }

    //style
    card = {
        padding: '0.5em',
        overflowY: 'auto',
        maxHeight: '16.5em'
    }

    //life cycle components
    componentDidMount() {
        const cardsData = fetch(`https://api.trello.com/1/lists/${this.props.id}/cards?key=${appKey.key}&token=${appToken.token}`)
        cardsData.then(res => res.json())
            .then(data => this.setState({
                cards: data
            }))
    }

    //event functions
    inputCard(event) {
        this.setState({
            input: event.value
        })
    }

    postCard(event) {
        const newCard = fetch(`https://api.trello.com/1/cards?name=${this.state.input}&pos=top&idList=${event.list}&key=${appKey.key}&token=${appToken.token}`, {
            method: 'POST'
        })
        newCard.then(res => res.json())
            .then(data => this.setState({
                cards: this.state.cards.concat(data)
            }))
    }

    removeCard(event) {
        const removeCard = fetch(`https://api.trello.com/1/cards/${event.card.id}?key=${appKey.key}&token=${appToken.token}`, {
            method: 'DELETE'
        })
        removeCard.then(res => res.json())
            .then(data => {
                if (!data.limit) {
                    const cards = this.state.cards.filter(card => card.id !== event.card.id)
                    return this.setState({ cards: cards })
                }
            })
    }


    render() {
        return (
            <div className='card-wrapper'>
                <div className="card mr-2 ml-2" style={{ maxWidth: "18rem", width: '18em' }}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div className="card-header bg-transparent">{this.props.name}</div>
                        <div><Remove name={'archive'}
                                list={this.props.id} 
                                onRemove={this.props.onRemove}/></div>
                    </div>
                    <div className="card-body" style={this.card}>
                        {this.state.cards.map(card =>
                            <Cards key={card.id}
                                card={card}
                                onCard={this.props.onCard}
                                onRemove={this.removeCard}/>
                        )}
                    </div>
                    <div
                        style={{ padding: '1em' }}>
                        <Add
                            name={'add-card'}
                            onAdd={this.postCard}
                            onInput={this.inputCard}
                            list={this.props.id} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Lists
