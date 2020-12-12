import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import logo from '../../img/images.png'
import Introdaction from './Introdaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
//localStorage.clear()

function Navbar(props) {
  let [ls, setLs] = useState(
    [
      
    ]
    //props.liked
    );
  let [photos, setPhotos] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const req = await axios.get('http://localhost:8001/cinema/photos');
  //     setPhotos(req.data)
  //     console.log(req.data)
  //   }
  //   fetchData()
  // }, [])

  useEffect(() => {
    setPhotos(photos)
  }, [photos])

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name, index) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    } else {
      localStorage.setItem(name, index)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    }
    props.setCounter(counter)
    console.log(localStorage)
  }

  let pageCount = Math.ceil(props.totalCount / props.onOnePage);
  let arr = [];
  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
  }
  let onPageChange = (e) => {
    props.SetPageCount(props.numberOfPage + 1)
    props.onPageChange(props.numberOfPage * props.onOnePage, props.type, props.navData)
  };

  return (
    <div>
      <Introdaction typeTitle={props.typeTitle}/>
      <div className={s.nav}>
        {
          props.navData.map((item, index, array) => {
            if (array.indexOf(item) === index) {
              return <div className={s.cinema}>
                <NavLink to={`/cinemas/${item.name}`}>
                  <img src={item.photos.photoLarge}></img>
                  <div className={s.name}>
                    {item.name}
                  </div>
                </NavLink>
                <div className={s.liked} onClick={() => {
                  Liked(item.name, index)
                }}>
                  Добавить в избранное {
                    !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                  }
                </div>
              </div>
            }
          })
        }
      </div>
      <div onClick={onPageChange} className={s.pagination}>
        <h4>Загрузить еще</h4>
      </div>
    </div>
  );
}

export default Navbar;