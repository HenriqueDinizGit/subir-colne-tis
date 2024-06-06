import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './graficos.css';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from '../../axios/custom';

interface TreinoData {
  mes: string;
  [key: string]: number | string;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function GraficoPizza() {
  // Obtém a data atual para determinar o mês atual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Mês atual (0-11)
  const currentYear = currentDate.getFullYear(); // Ano atual

  // Dados de treino por mês
  const [dadosTreino, setDadosTreino] = useState<TreinoData[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para controlar o mês atual
  const [mesAtual, setMesAtual] = useState(currentMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/dashboard/treinos-especificos-mes');
        const formattedData = response.data.map((item: TreinoData) => {
          const { mes, ...rest } = item;
          return {
            mes,
            ...rest
          };
        });
        setDadosTreino(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para avançar para o próximo mês
  const proximoMes = () => {
    setMesAtual((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  // Função para voltar para o mês anterior
  const mesAnterior = () => {
    setMesAtual((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Dados de treino para o mês atual
  const dadosMesAtual = dadosTreino.find(dado => {
    const [mes, ano] = dado.mes.split(' ');
    const dataAno = parseInt(ano, 10);
    const dataMes = monthNames.indexOf(mes);

    return dataMes === mesAtual && dataAno === currentYear;
  });


  // Transformando os dados para o formato necessário pelo PieChart
  const seriesData = dadosMesAtual
    ? Object.keys(dadosMesAtual).filter(key => key !== 'mes').map((key, index) => ({
        id: index,
        value: dadosMesAtual[key] as number,
        label: key
      }))
    : [];

  return (
    <div className='graficopizza'>
      <div className='pizza-months'>
        <button onClick={mesAnterior} className='months-button'>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>{dadosMesAtual ? dadosMesAtual.mes : `${monthNames[mesAtual]} ${currentYear}`}</span>
        <button onClick={proximoMes} className='months-button'>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      {dadosMesAtual ? (
        <PieChart
          series={[
            {
              data: seriesData,
            },
          ]}
          caption={dadosMesAtual.mes}
          width={600}
        />
      ) : (
        <div>No data available for this month</div>
      )}
    </div>
  );
}