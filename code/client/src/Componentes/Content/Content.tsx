import React from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import './Content.css';
import Card from "../Card/Card";

const Content: React.FC = () => {

    return (
        <div className="content">
            <ContentHeader titulo="Meus Treinos"/>
            <Card/>
            
        </div>
    );
}

export default Content;
