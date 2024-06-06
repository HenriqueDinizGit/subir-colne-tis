import * as React from 'react';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import instance from '../../axios/custom';

const chartSetting = {
  xAxis: [
    {
      label: 'Dias',
    },
  ],
  width:400,
  height: 350,
};

const valueFormatter = (value: number | null) => `${value} dias`;

export default function GraficoBarra() {
  const [dataset, setDataset] = useState<{ month: string, diasNaAcademia: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/dashboard/dias-academia-mes');
        setDataset(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='graficobarra' style={{ display: 'flex', alignItems: 'center' }}>
      {dataset.length > 0 ? (
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'diasNaAcademia', label: 'Frequência na academia', valueFormatter }]}
          layout="horizontal"
          {...chartSetting}
        />
      ) : (
        <h2>Você ainda não realizou nenhum treino</h2>
      )}
    </div>
  );
}
