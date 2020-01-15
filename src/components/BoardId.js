import React, { Component } from 'react'
import Lists from './Lists.js'
import { appKey, appToken } from '../config.js'
import Bars from 'react-loading'
import Header from './Header.js'
import Checklist from './Checklists.js'
import Add from './addComponent.js'


class BoardId extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            board: [],
            lists: [],
            card: [],
            checklist: [],
            input: ''
        }
        this.popModal = this.popModal.bind(this)
        this.postList = this.postList.bind(this)
        this.inputList = this.inputList.bind(this)
        this.closeList = this.closeList.bind(this)
        this.postChecklist = this.postChecklist.bind(this)
        this.inputChecklist = this.inputChecklist.bind(this)
        this.removeChecklist = this.removeChecklist.bind(this)
        this.postItem = this.postItem.bind(this)
        this.inputItem = this.inputItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleClick = this.handleClick.bind(this)
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

    inputList(event) {
        this.setState({ input: event.value })
    }

    postList(list) {
        const newList = fetch(`https://api.trello.com/1/lists?name=${this.state.input}&idBoard=${list.board}&pos=bottom&key=${appKey.key}&token=${appToken.token}`, {
            method: 'POST'
        })
        newList.then(res => res.json())
            .then(data => this.setState({ lists: this.state.lists.concat(data) }))
    }

    closeList(event) {
        const closeList = fetch(`https://api.trello.com/1/lists/${event.list}/closed?value=true&key=${appKey.key}&token=${appToken.token}`, {
            method: 'PUT'
        })
        closeList.then(res => res.json())
            .then(data => {
                if (!data.limit) {
                    const lists = this.state.lists.filter(list => list.id !== event.list)
                    return this.setState({ lists: lists })
                }
            })
    }

    inputChecklist(event) {
        this.setState({ input: event.value })
    }

    postChecklist(checklist) {
        const newCheckList = fetch(`https://api.trello.com/1/checklists?idCard=${checklist.card}&name=${this.state.input}&pos=bottom&key=${appKey.key}&token=${appToken.token}`, {
            method: 'POST'
        })
        newCheckList.then(res => res.json())
            .then(data => this.setState({ checklist: this.state.checklist.concat(data) }))
    }

    removeChecklist(event) {
        const removeChecklist = fetch(`https://api.trello.com/1/checklists/${event.checklist}?key=${appKey.key}&token=${appToken.token}`, {
            method: 'delete'
        })
        removeChecklist.then(res => res.json())
            .then(data => {
                if (!data.limit) {
                    const checklist = this.state.checklist.filter(checklist => checklist.id !== event.checklist)
                    return this.setState({ checklist: checklist })
                }
            })
    }

    inputItem(event) {
        this.setState({ input: event.value })
    }

    postItem(event) {
        const newItem = fetch(`https://api.trello.com/1/checklists/${event.checklist.id}/checkItems?name=${this.state.input}&pos=bottom&checked=false&key=${appKey.key}&token=${appToken.token}`, {
            method: 'POST'
        })
        newItem.then(res => res.json())
            .then(data => {
                const checklist = [...this.state.checklist]
                const index = checklist.indexOf(event.checklist)
                checklist[index].checkItems.push(data)
                this.setState({ checklist })
            })
    }

    removeItem(event) {
        const removeItem = fetch(`https://api.trello.com/1/checklists/${event.checkitem.idChecklist}/checkItems/${event.checkitem.id}?key=${appKey.key}&token=${appToken.token}`, {
            method: 'delete'
        })
        removeItem.then(res => res.json())
            .then(data => {
                if (!data.limit) {
                    const checklist = [...this.state.checklist]
                    const list = checklist.filter(list => list.id === event.checkitem.idChecklist)
                    const index = checklist.indexOf(list[0])
                    const items = checklist[index].checkItems.filter(item => item.id !== event.checkitem.id)
                    checklist[index].checkItems = items
                    return this.setState({ checklist })
                }
            })
    }

    handleClick(event) {
        const itemState = fetch(`https://api.trello.com/1/cards/${this.state.card.id}/checkItem/${event.id}?state=${event.state==='complete'?'incomplete':'complete'}&key=${appKey.key}&token=${appToken.token}`, {
            method: 'put'
        })
        itemState.then(res => res.json())
            .then(data => {
                const checklist = [...this.state.checklist]
                const list = checklist.filter(list => list.id === event.idChecklist)
                const index = checklist.indexOf(list[0])
                const items=checklist[index].checkItems.filter(item=>item.id !== event.id)
                checklist[index].checkItems=items
                checklist[index].checkItems.unshift(data)
                return this.setState({ checklist })
            })
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
                                    onRemove={this.closeList}
                                />)
                        }
                        <div style={{ height: '10%' }}>
                            <Add onAdd={this.postList}
                                onInput={this.inputList}
                                name={'add-list'}
                                board={this.props.match.params.id} />
                        </div>
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
                                    {this.state.checklist.map(checklist =>
                                        <Checklist checklist={checklist}
                                            key={checklist.id}
                                            onRemove={this.removeChecklist}
                                            onAdd={this.postItem}
                                            onInput={this.inputItem}
                                            onRemoveItem={this.removeItem}
                                            onChange={this.handleClick} />
                                    )}
                                    <div className="modal-footer">
                                        <Add onAdd={this.postChecklist}
                                            onInput={this.inputChecklist}
                                            name={'add-checklist'}
                                            card={this.state.card.id} />
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
//add checklist & remove checklist (+)
//add checkitem, remove checkitem & update status by PUT