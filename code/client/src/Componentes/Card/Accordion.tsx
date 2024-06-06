import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Content/Content.css";
import instance from "../../axios/custom";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

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
interface AccordionTransitionProps {
  exercicio: Exercicio;
  onDeleteExercicio: (exercicioId: number) => void;
}

const AccordionTransition: React.FC<AccordionTransitionProps> = ({
  exercicio,
  onDeleteExercicio,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [seriesExercicio, setSeriesExercicio] = React.useState<
    SerieExercicio[]
  >([]);
  const [repeticoes, setRepeticoes] = React.useState<string>("");
  const [peso, setPeso] = React.useState<string>("");
  const [indexSerie, setIndexSerie] = React.useState<number>(0);

  useEffect(() => {
    const fetchSerieExercicio = async () => {
      try {
        const response = await instance.get(`/serie-exercicio/${exercicio.id}`);
        setSeriesExercicio(response.data); // Supondo que a resposta seja o array de treinos
      } catch (error) {
        console.error("Erro ao buscar a serie desse exercicio", error);
      }
    };

    fetchSerieExercicio();
  }, [exercicio.id]);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas dígitos numéricos
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    event.target.value = newValue;
  };

  const mudarNomeExercicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      return;
    }
    try {
      instance.put(`/exercicio/${exercicio.id}`, { nome: event.target.value });
      console.log("Nome do treino alterado com sucesso!");
    } catch (error) {
      console.error("Erro ao mudar nome do treino:", error);
    }
  };

  const mudarPesoRepeticoes = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (repeticoes === "" && peso === "") {
      return;
    }
    if (repeticoes === "") {
      setRepeticoes(event.target.placeholder);
    }
    if (peso === "") {
      setPeso(event.target.placeholder);
    }

    try {
      instance.put(`/serie-exercicio/${seriesExercicio[indexSerie].id}`, {
        repeticoes: +repeticoes,
        peso: +peso,
      });
      console.log("Peso e repetições alterados com sucesso!");
    } catch (error) {
      console.error("Erro ao mudar peso e repetições:", error);
    }
  };

  const adicionarSerieExercicio = async () => {
    try {
      const response = await instance.post("/serie-exercicio/", {
        repeticoes: 0,
        peso: 0,
        exercicioId: exercicio.id,
      });
      setSeriesExercicio((ex) => [...ex, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar série do exercício:", error);
    }
  };

  const deleteExercicio = async () => {
    try {
      instance.delete(`/exercicio/${exercicio.id}`);
      console.log("Exercício deletado com sucesso!");
      onDeleteExercicio(exercicio.id);
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
    }
  };

  const deleteSerieExercicio = async (serieId: number) => {
    try {
      await instance.delete(`/serie-exercicio/${serieId}`);
      setSeriesExercicio((currentSeries) =>
        currentSeries.filter((serie) => serie.id !== serieId)
      );
      console.log("Série deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar série:", error);
    }
  };

  return (
    <div className="accordion">
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        sx={{
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <div className="accordion-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="accordion-exercises">
              <input
                type="text"
                placeholder={exercicio.nome}
                onBlur={(e) => mudarNomeExercicio(e)}
                className="name-exercise"
              />
              <div onClick={deleteExercicio} className="delete-exercise">
                <FontAwesomeIcon icon={faTrashCan} className="icon" />
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {seriesExercicio.map((serie, index) => (
              <Typography key={serie.id}>
                <div
                  className="fields-exercises"
                  onClick={() => setIndexSerie(index)}
                >
                  <p>Repetições:</p>
                  <input
                    type="text"
                    name="repeticoes"
                    placeholder={serie.repeticoes.toString()}
                    onChange={(e) => {
                      handleInputChange(e);
                      setRepeticoes(e.target.value);
                    }}
                    onBlur={(e) => mudarPesoRepeticoes(e)}
                    className="repeticao-exercicio"
                  />
                  <p>X</p>
                  <input
                    type="text"
                    name="peso"
                    placeholder={serie.peso.toString()}
                    onChange={(e) => {
                      handleInputChange(e);
                      setPeso(e.target.value);
                    }}
                    onBlur={(e) => mudarPesoRepeticoes(e)}
                    className="carga-exercicio"
                  />
                  <p>Kg</p>
                  <div onClick={() => deleteSerieExercicio(serie.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className="icon" />
                  </div>
                </div>
              </Typography>
            ))}
            <button
              onClick={adicionarSerieExercicio}
              className="mais-repeticao"
            >
              {" "}
              +{" "}
            </button>
          </AccordionDetails>
        </div>
      </Accordion>
    </div>
  );
};

export default AccordionTransition;
