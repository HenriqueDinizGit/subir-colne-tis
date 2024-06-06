import * as React from 'react';
import {Flex} from 'antd';
import GraficoPizza from './GraficoPizza';
import GraficoBarra from './GráficoBarra';
import './graficos.css';

export default function Grafico() {
  return (
    <Flex align='center' gap="large">
      <div className='graficos'>
          <GraficoBarra/>
          <GraficoPizza/>
      </div>
    </Flex>
    
  );
}