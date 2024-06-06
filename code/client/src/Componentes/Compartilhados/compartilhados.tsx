import React from "react";
import './compartilhados.css';
import ContentHeader from "../ContentHeader/ContentHeader";
import Card from "../Card/Card";

const Compartilhados: React.FC = () => {

    return (
        <div className="content-share">
            <ContentHeader titulo="Treinos Compartilhados"/>
            <Card/>
        </div>
    );
}

export default Compartilhados;
