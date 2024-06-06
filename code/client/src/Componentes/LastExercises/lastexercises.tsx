import React, { useEffect, useState } from 'react';
import { Flex, Typography, List } from 'antd';
import './lastexercises.css';
import instance from '../../axios/custom';

// Interface para os dados do exercício
interface ExerciseData {
  id: number;
  descricao: string;
  foto: string;
  treino_iniciado: string;
  treino_finalizado: string;
  treinoId: number;
  treino: {
    id: number;
    nome: string;
    grupoMuscular: string;
    usuarioId: number;
    imagemBanner: string;
    isOriginal: boolean;
    createdAt: string;
  };
}

function RecentExercise() {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await instance.get('treino-realizado/comunidade/1'); // Ajuste a URL conforme necessário
        if (Array.isArray(response.data)) {
          setExercises(response.data);
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
      }
    };

    fetchExercises();
  }, []);

  // Ordena os exercícios pela data de finalização do treino, do mais recente para o mais antigo
  const sortedExercises = exercises.sort((a, b) => new Date(b.treino_finalizado).getTime() - new Date(a.treino_finalizado).getTime());
  const lastTenExercises = sortedExercises.slice(0, 10);

  return (
    <Flex vertical gap='small' className='last-exercises'>
      <Flex>
        <Typography.Title level={3} className='recent-exercises'>
          Últimos Treinos
        </Typography.Title>
      </Flex>
      <List
        dataSource={lastTenExercises}
        className="training-list"
        renderItem={(exercise) => (
          <List.Item className='training-names'>
            <List.Item.Meta className='training-meta'
              title={<a href="#">{exercise.treino.nome}</a>}
              description={<span className="description">Descrição: {exercise.descricao}</span>}
            />
            <span className="time">
              {new Date(exercise.treino_finalizado).toLocaleString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </List.Item>
        )}
      />
    </Flex>
  );
}

export default RecentExercise;