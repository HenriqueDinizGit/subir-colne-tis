import React from 'react';
import {Card, Flex} from 'antd';
import './Banner.css';
import {Link} from 'react-router-dom';

function Banner(){
    return(
        <Card style={{height: 260, padding:'20px'}} className='banner'>
            <Flex vertical gap="30px">
                <Flex vertical align="flex-start">
                    <div className='banner-text'>
                        <h2>Personalize seu treino de acordo com seus objetivos.</h2>
                        <h4> Aqui você pode ter sua ficha montada por personais muito qualificados</h4>
                    </div>              
                </Flex>
                <Flex gap="large">
                <div className="banner-btns">
                    <Link to="/treinoscompartilhados">
                        <button className="btntraining">Buscar Treino Compartilhado</button>
                    </Link>
                </div>
                </Flex>
            </Flex>
        </Card>
    )
}

export default Banner;