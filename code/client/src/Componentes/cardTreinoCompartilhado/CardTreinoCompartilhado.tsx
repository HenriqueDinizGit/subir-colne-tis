import React, { useState, useEffect } from "react";
import "../Content/Content.css";
import perna from "../../assets/perna.jpg";
import instance from "../../axios/custom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalShare from "../ModalShareTreino/ModalShare";
import AccordionTreinoCompartilhado from "./AccordionTreinoCompartilhado";

interface Treino {
  id: number;
  nome: string;
  grupoMuscular: string;
  imagem: string;
}

interface Usuario {
  id: number;
  nome: string;
  foto: string;
}

interface TreinoCompartilhado {
  id: number;
}

const CardTreinoCompartilhado: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<number | null>(null);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTrainIndex, setSelectedTrainIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [treinoCompartilhado, setTreinoCompartilhado] = useState<
    TreinoCompartilhado[]
  >([]);

  const toggleMenu = (index: number | null) => {
    if (selectedTrainIndex === index) {
      setIsMenuOpen(!isMenuOpen); // Toggle if the same index
    } else {
      setIsMenuOpen(true); // Open new menu if different index
    }
    setSelectedTrainIndex(index);
  };

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await instance.get("/manage-shared-treinos/");
        setTreinoCompartilhado(response.data);
        let t;
        if (Array.isArray(response.data)) {
          t = response.data.map((item) => {
            const treino = item.treinoCompartilhado; // Accessing the nested treinoCompartilhado object
            return {
              id: treino.id,
              nome: treino.nome,
              grupoMuscular: treino.grupoMuscular,
              imagem: treino.imagemBanner,
            };
          });
          setTreinos(t);
        } else {
          console.error("Dados recebidos não são um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar treinos:", error);
      }
    };
    fetchTreinos();
  }, []);

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

  const shareTreino = async () => {
    const isEditavel = false; // isEditavel deve ser igual ao valor passado po parâmetro
    setIsModalOpen(true);
    try {
      if (selectedTrain !== null) {
        const response = await instance.post(
          `/share-treino/compartilhar/${selectedTrain}?editavel=${isEditavel}`
        );
        await navigator.clipboard.writeText(response.data.linkCompartilhamento);
        console.log("Treino compartilhado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao compartilhar treino:", error);
    }
  };

  const getUsuariosFromSharedTreino = async (id: number) => {
    try {
      const response = await instance.get(`/manage-shared-treinos/${id}`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários do treino compartilhado:", error);
    }
  };

  const handleUsuariosFromSharedTreino = (userId: number) => {
    setUsuarios(usuarios.filter(user => user.id !== userId));
  };

  const excluirShareTreino = async (id: number) => {
    try {
      await instance.delete(`/manage-shared-treinos/${id}`);
      setTreinos(treinos.filter(item => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar treino compartilhado:", error);
    }
  };

  return (
    <div className="card-container">
      <div className="horizontal-card-scroll">
        {Array.isArray(treinos) &&
          treinos.map((item, index) => (
            <div
              className="card"
              key={index}
              onClick={() => {
                setSelectedTrain(item.id);
                getUsuariosFromSharedTreino(treinoCompartilhado[index].id);
              }}
            >
              <div className="top-card">
                <div className="card-cover">
                  <img className="img-treino" src={perna} alt={item.nome} />
                </div>
                <div className="card-actions">
                  <div className="menu-icon" onClick={() => toggleMenu(index)}>
                    <FontAwesomeIcon icon={faBars} className="icon-options" />
                  </div>
                  {isMenuOpen && selectedTrainIndex === index && (
                    <div className="treino-options">
                      <button onClick={() => handleShareClick(index)}>
                        Compartilhar
                      </button>
                      <button
                        onClick={() =>
                          excluirShareTreino(treinoCompartilhado[index].id)
                        }
                      >
                        Excluir Treino Compartilhado
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
              shareTreino();
              handleCloseModal();
            }}
          />
        )}
      </div>
      {selectedTrain !== null && (
        <div className="user-container">
          {usuarios.length > 0 ? (
            usuarios.map((user, index) => (
              <AccordionTreinoCompartilhado
                key={index}
                usuario={user}
                treinoCompartilhadoId={
                  treinoCompartilhado[index] ? treinoCompartilhado[index].id : 0
                }
                onDeleteUser={handleUsuariosFromSharedTreino}
              />
            ))
          ) : (
            <h2>Nenhum usuário copiou seu treino ainda.</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default CardTreinoCompartilhado;
