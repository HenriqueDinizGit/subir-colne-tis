import React, { useState, useEffect } from "react";
import "../Content/Content.css";
import perna from "../../assets/perna.jpg";
import AccordionTransition from "./Accordion";
import instance from "../../axios/custom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalShare from "../ModalShareTreino/ModalShare";
import ChatModal from "../comunidademain/chatmodal";

interface Treino {
  id: number;
  nome: string;
  grupoMuscular: string;
  imagem: string;
  exercicios: Exercicio[];
}

interface Exercicio {
  id: number;
  nome: string;
  treinoId: number;
  seriesExercicio: SerieExercicio[];
}

interface SerieExercicio {
  id: number;
  exercicioId: number;
  repeticoes: number;
  peso: number;
}

const Card: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<number | null>(null);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]); // Estado para armazenar os treinos recebidos da API
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTrainIndex, setSelectedTrainIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string | null>(null);
  const [isTreinoIniciado, setIsTreinoIniciado] = useState(false);
  const [isTreinoFinalizado, setIsTreinoFinalizado] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [treinoRealizadoId, setTreinoRealizadoId] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const toggleMenu = (index: number | null) => {
    setSelectedTrainIndex(index);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = (index: number) => {
    getExercicios(treinos[index].id);
    setSelectedTrain(index);
    setSelectedCardName(treinos[index].nome);
    setIsTreinoIniciado(false); 
    setIsTreinoFinalizado(false);
    setFocusedIndex(index); 
  };

  const finalizarTreino = () => {
    if (selectedTrain !== null) {
      setIsTreinoIniciado(false);
      setIsTreinoFinalizado(false);
      setShowChatModal(true);
    }
  };
  
  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await instance.get("/treino/");
        if (Array.isArray(response.data)) { 
          setTreinos(response.data);
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };
    fetchTreinos();
  }, []);

  const copyTreino = async () => {
    let response;
    try {
      if (selectedTrain !== null) {
        response = await instance.post(`/treino/copyTreino/${selectedTrain}`);
      }
      if (response) {
        setTreinos([...treinos, response.data.treino]);
      }
    } catch (error) {
      console.error("Erro ao copiar exercício", error);
    }
  };

  const getExercicios = async (treinoId: number) => {
    console.log(`Enviando requisição para buscar exercícios do treino ID: ${treinoId}`);
    try {
      console.log("Buscando exercícios...");
      const response = await instance.get(`/exercicio/${treinoId}`);
      setExercicios(response.data);
      console.log("Exercícios recebidos com sucesso!");
      setSelectedTrain(prev => prev === treinoId ? null : treinoId); // Toggle the selected train using ID
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  };

  const adicionarExercicio = async () => {
    try {
      if (selectedTrain !== null) {
        const treinoId = selectedTrain;
        const response = await instance.post("/exercicio/", {
          nome: "Novo Exercício",
          treinoId: treinoId,
        });
        setExercicios((ex) => [...ex, response.data]);
        console.log("Exercício adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
    }
  };

  const iniciarTreino = async () => {
    try {
      const response = instance.post(`/treino-realizado/${selectedTrain}`, {
        descricao: "",
        foto: "",
      });
      console.log(`Treino ID ${selectedTrain} iniciado com sucesso!`);
      setIsTreinoIniciado(true);
      setTreinoRealizadoId((await response).data.id);
    } catch (error) {
      console.error("Erro ao iniciar treino:", error);
    }
  };

  const mudarNomeTreino = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.value === "") {
      return;
    }
    try {
      if (selectedTrain !== null) {
        instance.put(`/treino/${selectedTrain}`, {
          nome: event.target.value,
          grupoMuscular: treinos[index].grupoMuscular,
        });
        console.log("Nome do treino alterado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao mudar nome do treino:", error);
    }
  };

  const handleShareClick = (index: number) => {
    setSelectedCardIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCardIndex(null);
  };

  const deleteTreino = async () => {
    try {
      if (selectedTrain !== null) {
        instance.delete(`/treino/${selectedTrain}`);
        setTreinos(treinos.filter((item) => item.id !== selectedTrain));
      }
      console.log("Treino deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar treino:", error);
    }
  };

  const handleDeleteExercicio = (exercicioId: number) => {
    setExercicios(exercicios.filter(exercicio => exercicio.id !== exercicioId));
  };

  const shareTreino = async () => {
    const isEditavel: boolean = true; // isEditavel deve ser igual ao valor passado por parâmetro 
    setIsModalOpen(true);
    try {
      if (selectedTrain !== null) {
        const response = await instance.post(`/share-treino/compartilhar/${selectedTrain}?editavel=${isEditavel}`);
        await navigator.clipboard.writeText(response.data.linkCompartilhamento);
        console.log("Treino compartilhado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar treino:", error);
    }
  };

  return (
    <div className="card-container">
      <div className="horizontal-card-scroll">
        {Array.isArray(treinos) && treinos.map((item, index) => (
          <div
            className={`card ${focusedIndex === index ? 'focused' : ''}`}
            key={index}
            onClick={() => handleCardClick(index)}
          >
            <div className="top-card">
              <div className="card-cover">
                <img
                  className={`img-treino ${focusedIndex !== null && focusedIndex !== index ? 'grayscale' : ''}`}
                  src={perna}
                  alt={item.nome}
                />
              </div>
              <div className="card-actions">
                <div className="menu-icon" onClick={() => toggleMenu(index)}>
                  <FontAwesomeIcon icon={faBars} className="icon-options" />
                </div>
                {isMenuOpen && selectedTrainIndex === index && (
                  <div className="treino-options">
                    <button onClick={copyTreino}>
                      Copiar
                    </button>
                    <button onClick={deleteTreino}>
                      Apagar
                    </button>
                    <button onClick={() => handleShareClick(index)}>
                      Compartilhar
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="card-title">
              <input
                type="text"
                className="training-name"
                placeholder={item.nome}
                onBlur={(e) => mudarNomeTreino(e, index)}
              />
            </div>
          </div>
        ))}
        {isModalOpen && selectedCardIndex !== null && (
          <ModalShare
            onClose={handleCloseModal}
            onShare={() => {
              // const treinoId = treinos[selectedCardIndex].id; 
              shareTreino();
              handleCloseModal();
            }}
          />
        )}
      </div>
      {selectedCardName !== null && (
        <div className="bottom-actions">
          {!isTreinoIniciado && (
            <button className="start-training-button" onClick={iniciarTreino}>
              Iniciar Treino : {selectedCardName}
            </button>
          )}
          {isTreinoIniciado && !isTreinoFinalizado && (
            <button className="finish-training-button" onClick={finalizarTreino}>
              Finalizar Treino : {selectedCardName}
            </button>
          )}
        </div>
      )}
      {showChatModal && (
        <ChatModal
          onClose={() => setShowChatModal(false)}
          onShare={(description: string, photoUrl: string) => {
            // Lógica de compartilhamento do treino dentro do modal
            console.log("Compartilhando treino com:", description, photoUrl);
          }}
          treinoRealizadoId={treinoRealizadoId !== null ? treinoRealizadoId : 0}
        />
      )}
      {selectedTrain !== null && (
        <div className="exercises-container">
          {exercicios.map((exercicio, index) => (
            <AccordionTransition key={index} exercicio={exercicio} onDeleteExercicio={handleDeleteExercicio} />
          ))}
          <button className="sparkle u-hover--sparkle" onClick={adicionarExercicio}>
            + Adicionar Exercício
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
