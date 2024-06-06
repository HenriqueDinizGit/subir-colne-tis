import React from 'react';
import {Flex} from 'antd';
import BasicDateCalendar from '../Calendario/calendario';
import RecentExercise from '../LastExercises/lastexercises';
import './infoside.css';

function InfoSideContent(){
    return(
        <div className='infoside'>
            <BasicDateCalendar/>
            
        </div>
    );
}

export default InfoSideContent;