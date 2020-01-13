import React, { Component } from 'react'
import Lists from './Lists.js'
import { appKey, appToken } from '../config.js'
import Bars from 'react-loading'
import Header from './Header.js'
import Checklist from './Checklists'

class BoardId extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            board: [],
            lists: [],
            card: [],
            checklist: []
        }
        this.popModal = this.popModal.bind(this)
    }

    //style
    LoadScr = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }

    boardCanvas = {
        display: 'flex',
        overflowX: 'auto',
        height: '80%',
        padding: '1em'
    }

    //life cycle components
    componentDidMount() {
        const boardData = fetch(`https://api.trello.com/1/boards/${this.props.match.params.id}?key=${appKey.key}&token=${appToken.token}`)
        boardData.then(res => res.json())
            .then(data =>
                this.setState({
                    board: data,
                    isLoading: false
                })
            )

        const listsData = fetch(`https://api.trello.com/1/boards/${this.props.match.params.id}/lists?key=${appKey.key}&token=${appToken.token}`)
        listsData.then(res => res.json())
            .then(data =>
                this.setState({
                    lists: data
                })
            )
    }

    //event functions
    popModal(cardInfo) {
        const checklistData = fetch(`https://api.trello.com/1/cards/${cardInfo.id}/checklists?key=${appKey.key}&token=${appToken.token}`)
        checklistData.then(res => res.json())
            .then(data => this.setState({
                card: cardInfo,
                checklist: data
            }))
    }

    render() {
        const { name, prefs } = this.state.board
        return (
            this.state.isLoading ?
                <div style={this.LoadScr}>
                    <Bars type={'bars'} color={'#33B0FF'} height={'20%'} width={'20%'} />
                </div>
                : <div><div style={{
                    height: '100vh',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: prefs.background,
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${prefs.backgroundImage})`
                }}>
                    <Header />
                    <section style={{ display: 'flex', padding: '1em 1em' }}
                        className='board-header'>
                        <h4 className='h4 text-white font-weight-bold'>{name}</h4>
                    </section>

                    <section style={this.boardCanvas}
                        className='board-canvas'>
                        {
                            this.state.lists.map(list =>
                                <Lists key={list.id}
                                    name={list.name}
                                    id={list.id}
                                    onCard={this.popModal}
                                />)
                        }
                    </section>
                </div>
                    <div className="modal fade" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" style={{ wordBreak: 'break-word' }} id="exampleModalScrollableTitle">{this.state.card.name}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"></span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='checklist-container'>
                                        {this.state.checklist.map(checklist =>
                                            <Checklist checklist={checklist}
                                                key={checklist.id} />
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <div className="checklist-add">
                                            <input className="checklist-input" type="text" /><button className="add-checklist" type="button">add checklist</button>
                                        </div>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BoardId


//board blue button to access all boards
//home button to redirect to boards
//add list by anchor button, close the list by PUT
//add card & delete card,add checklist & remove checklist
//add checkitem, remove checkitem & update status by PUT
//anchor change to react-link