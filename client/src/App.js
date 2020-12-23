import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from '../src/Components/Header/Header';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import Liked from './Components/Liked/Liked';
import Navbar from './Components/Navbar/NavbarContainer';
import Info from './Components/Info/InfoContainer';
import 'materialize-css'
import Search from './Components/Search/Search';
import { connect } from 'react-redux';
import { setSearched } from './redux/headerReduser';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Register from './Components/Auth/Register';
import { setToken, setUserId, setLogin, setLoaded } from './redux/authReduser'
import MainPage from './Components/MainPage/MainPage';

function App(props) {
  
  const login = useCallback((jwtToken, id) => {
    props.setToken(jwtToken)
    props.setUserId(id)
    localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwtToken }))
  }, []);

  props.setLogin(login)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    props.setLoaded(true)
  }, [login]);

  const onCloseList = () => {
    props.setSearched({ requestNumber: 0, request: [] })
  }
  return (
    <div className="App"
      onClick={onCloseList}
    >
      <div className='Header'
        style={props.location.pathname == '/' ? {
          position: 'absolute',
          width: '100%',
          zIndex: '1',
          background: 'none'
        }
          : {}
        }
      >
        <Header />
      </div>
      <Route exact path="/" render={() => <MainPage />} />
      <div className='__container'>
      <Route exact path="/category/:type" render={() => <Navbar />} />
      <Route path='/cinemas/:id' render={() => <Info />} />
      <Route path='/search/:riched' render={() => <Search />} />
      <Route path='/liked/:id?' render={() => <Liked />} />
      <Route path='/auth' render={() => <Auth />} />
      <Route path='/register' render={() => <Register />} />
      </div>
      <Footer />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isClosed: state.header.isClosed,
    loaded: state.auth.loaded,
    token: state.auth.token,
    userId: state.auth.userId,
    loaded: state.auth.loaded,
  }
}

export default connect(mapStateToProps, { setSearched, setToken, setUserId, setLogin, setLoaded })(withRouter(App));

