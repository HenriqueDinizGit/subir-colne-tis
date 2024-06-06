import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";


interface TitleProps {
    titulo: string;
}

const ContentHeaderGerenciarTreinosCompartilhados:  React.FC<TitleProps>= (props) => {

    const [scrollPosition, setScrollPosition] = useState(0);

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
                <button type="button" disabled id="action-button--previous" className="action-button--horizontal-scroll" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
                <button type="button" id="action-button--next" className="action-button--horizontal-scroll" onClick={scrollRight}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </div>
        </div>
    );
};

export default ContentHeaderGerenciarTreinosCompartilhados;
