import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Content/Content.css";
import instance from "../../axios/custom";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Usuario from "../../Paginas/Usuario/usuario";
import perna from "../../assets/perna.jpg";

interface Usuario {
  id: number;
  nome: string;
  foto: string;
}

interface AccordionTransitionProps {
  usuario: Usuario;
  treinoCompartilhadoId: number;
  onDeleteUser: (userId: number) => void;
}

const AccordionTreinoCompartilhado: React.FC<AccordionTransitionProps> = ({
  usuario,
  treinoCompartilhadoId,
  onDeleteUser,
}) => {
  const deleteUsuarioFromSharedTreino = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await instance.delete(
        `/manage-shared-treinos/${treinoCompartilhadoId}/user/${usuario.id}`
      );
      onDeleteUser(usuario.id);
    } catch (error) {
      console.error("Erro ao deletar treino compartilhado:", error);
    }
  };
  return (
    <div className="accordion">
      <Accordion>
        <div className="accordion-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="card-cover">
              <img className="img-treino" src={perna} alt={usuario.nome} />
            </div>
            <p>{usuario.nome}</p>
            <div onClick={(e) => deleteUsuarioFromSharedTreino(e)}>
              <FontAwesomeIcon icon={faTrashCan} className="icon" />
            </div>
          </AccordionSummary>
        </div>
      </Accordion>
    </div>
  );
};

export default AccordionTreinoCompartilhado;
