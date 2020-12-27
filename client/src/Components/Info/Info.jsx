import React from 'react';
import s from './Info.module.css'
import Description from './Description';
import InfoMap from './InfoMap';
import Coments from './Coments';
import Preloader from '../Preloader/Preloader';

const Info = (props) => {
  return (
    <div>
      <Description infoData={props.infoData}
      liked={props.liked}
      Setliked={props.Setliked}
      setCounter={props.setCounter}/>
      <InfoMap infoData={props.infoData} />
      {!props.coments? <Preloader/>
      :
      <Coments 
      coments={props.coments}
      id={props.match.params.id}
      infoData={props.infoData}
      token={props.token}
      SetTotalCount={props.SetTotalCount}
      SetPageCount={props.SetPageCount}
      totalCount={props.totalCount}
      numberOfPage={props.numberOfPage}
      onOnePage={props.onOnePage}
      setComents={props.setComents}
      onPageChange={props.onPageChange}
      />
      }
    </div>
  );

}

export default Info
