import '../Compartilhados/compartilhados.css';
import ContentHeaderGerenciarTreinosCompartilhados from "../contentHeaderGerenciarTreinosCompartilhados/contentHeaderGerenciarTreinosCompartilhados";
import CardTreinoCompartilhado from '../cardTreinoCompartilhado/CardTreinoCompartilhado'; // Ajuste para o nome e caminho correto

const GerenciarTreinosCompartilhados = () => {
    return (
        <div className="content-share">
            <ContentHeaderGerenciarTreinosCompartilhados titulo="Treinos Compartilhados"/>
            <CardTreinoCompartilhado />
        </div>
    );
}

export default GerenciarTreinosCompartilhados;
