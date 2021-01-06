import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './Category.module.css'
import SingleCard from './SingleCard';

function CategoryCard(props) {
  let [ls, setLs] = useState(props.liked);

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  return (
    <div>
      <div className={s.nav__wrapper}>
        <div className={s.nav}>
          {
            props.navData.map((item) => {
              return <SingleCard item={item}
                ls={ls}
                Setliked={props.Setliked}
                setCounter={props.setCounter}
                match={props.match}
                likedThunk={props.likedThunk}/>
            })
          }
        </div>
      </div>
    </div >
  );
}

export default CategoryCard;