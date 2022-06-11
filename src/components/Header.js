import React, { Component } from 'react'
import trello from '../assets/trello.svg'
import home from '../assets/home.svg'
import { Link } from 'react-router-dom'

class Header extends Component {
    state = {}

    header = {
        display: 'flex',
        justifyContent: 'space-between',   
        backgroundColor:'rgba(255, 255, 255, 0.3)'
    }

    render() {
        // console.log(this)
        return (
            <nav style={this.header}
                className="navbar navbar-dark">

                <Link to='/boards'><img src={home} alt='home_icon' /></Link>

                <Link className='navbar-brand' to='#'><img src={trello} alt='logo-icon' /></Link>

                <div className="btn-group dropleft">
                    {/* <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Boards</button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`boards/${1}`}>{1}</Link>
                    </div> */}
                </div>
            </nav>
        )
    }
}

export default Header
