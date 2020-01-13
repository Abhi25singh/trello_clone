import React, { Component } from 'react';
import { appKey, appToken } from '../config.js'
import { Link } from 'react-router-dom'

class Boards extends Component {
    constructor() {
        super()
        this.state = {
            boards: []
        }
    }
    
    //style
    LoadScr = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%'
    }

    boardScr = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }

    boardSize = {
        width: '30%',
        height: '30vh',
        margin: '1em 0'
    }
     
    //Life cycle components
    componentDidMount() {
        const boardData = fetch(`https://api.trello.com/1/members/abhisheksingh440/boards?key=${appKey.key}&token=${appToken.token}`)
        boardData.then(res => res.json())
            .then(data => this.setState({
                boards: data
            }))
    }

    render() {
        return (
            <main style={{ padding: '2em', height: '90vh' }}>
                <div style={this.boardScr}>
                    {this.state.boards.map(board =>
                        <Link to={`boards/${board.id}`} key={board.id}
                            style={this.boardSize}
                            className="card text-white">

                            <img style={{ height: '100%', backgroundColor: board.prefs.background }} className="card-img"
                                src={board.prefs.backgroundImage} />

                            <div className="card-hero-img">
                                <h5 className="card-title font-weight-bold">{board.name}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </main>
        )
    }
}

export default Boards