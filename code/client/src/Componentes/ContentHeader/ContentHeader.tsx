import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faShare, faTrash, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import instance from "../../axios/custom"; // Certifique-se de que o caminho está correto

interface TitleProps {
    titulo: string;
}

const ContentHeader:  React.FC<TitleProps>= (props) => {
    const [showForm, setShowForm] = useState(false);
    const [nomeTreino, setNomeTreino] = useState('');
    const [grupoMuscular, setGrupoMuscular] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const toggleForm = () => setShowForm(!showForm);
    const closeForm = () => {
        setShowForm(false);
        window.location.reload(); // Recarrega a página
    };

    const createTreino = async () => {
        try {
            const response = await instance.post('/treino/', { nome: nomeTreino, grupoMuscular: grupoMuscular });
            console.log('Treino criado com sucesso:', response.data);
            closeForm(); 
        } catch (error) {
            console.error('Erro ao criar treino:', error);
        }
    };

    const handleSubmit = () => {
        createTreino(); 
    };

    const scrollLeft = () => {
        const cardContainer = document.querySelector('.horizontal-card-scroll');
        if (cardContainer) {
          const newPosition = scrollPosition - 150; 
          setScrollPosition(newPosition);
          cardContainer.scrollTo({ left: newPosition, behavior: 'smooth' });
        }
      };
      
      const scrollRight = () => {
        const cardContainer = document.querySelector('.horizontal-card-scroll');
        if (cardContainer) {
          const newPosition = scrollPosition + 150; 
          setScrollPosition(newPosition);
          cardContainer.scrollTo({ left: newPosition, behavior: 'smooth' });
        }
      };

    return (
        <div className="content-header">
            <h1 className="header-title">{props.titulo}</h1>
            <div className="action-buttons">
                <a aria-expanded="false" href="#" className="action-button action-button--primary" onClick={toggleForm}>
                  <FontAwesomeIcon icon={faPlus}  fill="currentColor" focusable="false" />
                  Criar Treino
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                  <FontAwesomeIcon icon={faShare}  fill="currentColor" focusable="false" />
                  Compartilhar Treino
                </a>
                <a aria-expanded="false" href="#" className="action-button">
                  <FontAwesomeIcon icon={faTrash}  fill="currentColor" focusable="false" />
                  Apagar Treino
                </a>
                
                <button type="button" disabled id="action-button--previous" className="action-button--horizontal-scroll" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
                <button type="button" id="action-button--next" className="action-button--horizontal-scroll" onClick={scrollRight}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </div>
            {showForm && (
                <div className="training-popup">
                    <form className="new-training-form" onSubmit={handleSubmit}>
                        <div className="top-form">
                            <h3 className="training-title">Criar Treino</h3>
                            <div className="cancel" onClick={closeForm}>
                                <FontAwesomeIcon icon={faXmark} className="cancel-icon"/>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome do Treino"
                            value={nomeTreino}
                            onChange={(e) => setNomeTreino(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Grupo Muscular"
                            value={grupoMuscular}
                            onChange={(e) => setGrupoMuscular(e.target.value)}
                        />
                        {/* Descomente e implemente se necessário
                        <label htmlFor="photo-upload">Escolha uma foto</label>
                        <input type="file" id="photo-upload" name="foto" accept="image/*" />
                        */}
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ContentHeader;
