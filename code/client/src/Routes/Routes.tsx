import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../Paginas/LandingPage/LandingPage";
import Login from "../Paginas/Login/Login";
import MeusTreinos from "../Paginas/Dashboard/Treinos";
//import BasicDateCalendar from '../Paginas/Teste/teste';
import Info from '../Paginas/Info/teste';
import Teste from '../Paginas/teste/teste';
import PrivateComponent from '../Componentes/PrivateComponent/PrivateComponent';
import ShareTreinoPage from '../Paginas/shareTreinoPage/shareTreinoPage';
import Usuario from "../Paginas/Usuario/usuario";
import TreinosCompartilhados from "../Paginas/TreinosCompartilhados/treinoscompartilhados";
import Community from "../Paginas/Community/community";
import ShareComunidade from '../Paginas/shareComunidade/shareComunidade';


const RoutesApp: React.FC = () => {
    return (
        <Router> 
        <Routes>
            <Route element={<PrivateComponent />}>
                <Route path="/teste" element={<Teste />} />
                <Route path="/perfil" element={<MeusTreinos />} /> 
                <Route path="/info" element={<Info />} />
                <Route path="/community" element={<Community />} />
                <Route path="/user" element={<Usuario />} />
                <Route path="/treinoscompartilhados" element={<TreinosCompartilhados/>}/>
                <Route path="/shared-treino/:token" element={<ShareTreinoPage />} />
                <Route path="/shared-comunidade/:token" element={<ShareComunidade />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
    );
}

export default RoutesApp;
