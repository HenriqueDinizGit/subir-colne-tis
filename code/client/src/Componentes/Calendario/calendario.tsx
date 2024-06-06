import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importar o idioma português
import instance from '../../axios/custom';
import ServerDay from './ServeDay';

interface TrainingDay {
  date: string;
  treino: string;
  descricao: string;
}

const StyledStaticDatePicker = styled(StaticDatePicker)({
  backgroundColor: 'transparent',
  '.MuiPickersDay-root': {
    backgroundColor: 'transparent',
  },
  '.MuiPickersCalendar-root': {
    backgroundColor: 'transparent',
  },
  '.MuiPaper-root': {
    backgroundColor: 'transparent',
  },
});

export default function BasicDateCalendar() {
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const today = dayjs().locale('pt-br'); // Configurar o idioma português

  useEffect(() => {
    const fetchTrainingDays = async () => {
      try {
        const response = await instance.get('/dashboard/treinos-especificos-dia');
        const fetchedDays = response.data;
        setTrainingDays(fetchedDays);
      } catch (error) {
        console.error('Erro ao buscar os dias de treino:', error);
      }
    };

    fetchTrainingDays();
  }, []);

  return (
    <div className="calendario">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <StyledStaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={today}
          onChange={() => {}}
          slots={{
            day: (dayProps) => (
              <ServerDay 
                {...dayProps} 
                highlightedDays={trainingDays} 
              />
            )
          }}
        />
      </LocalizationProvider>
    </div>
  );
}