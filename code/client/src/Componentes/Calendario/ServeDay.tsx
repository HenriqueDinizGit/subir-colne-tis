import React, { useState } from 'react';
import './ServeDay.css';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface TrainingDay {
  date: string;
  treino: string;
  descricao: string;
}

interface ServerDayProps extends PickersDayProps<Dayjs> {
  highlightedDays: TrainingDay[];
}

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#6fbef3",
    color: 'theme.palette.primary.contrastText',
  },
}));

const ServerDay: React.FC<ServerDayProps> = (props) => {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;
  const [selectedTrainings, setSelectedTrainings] = useState<TrainingDay[]>([]);

  const handleClick = () => {
    const selected = highlightedDays.filter(td => td.date === day.format("YYYY-MM-DD"));
    if (selected.length > 0) {
      setSelectedTrainings(selected);
    }
  };

  const handleClose = () => {
    setSelectedTrainings([]);
  };

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDays.some(td => td.date === day.format("YYYY-MM-DD"));

  return (
    <div>
      <HighlightedDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        selected={isSelected}
        onClick={handleClick}
      />
      {selectedTrainings.length > 0 && (
        <Dialog open={true} onClose={handleClose} >
         <div className='treinosdodia'>
          <DialogTitle>Treinos do Dia</DialogTitle>
          <DialogContent>
            {selectedTrainings.map((training, index) => (
              <div key={index}>
                <p><strong>Data:</strong> {training.date}</p>
                <p><strong>Treino:</strong> {training.treino}</p>
                <p><strong>Descrição:</strong> {training.descricao}</p>
                <hr />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ServerDay;