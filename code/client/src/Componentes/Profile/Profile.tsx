import React from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import './Profile.css';
import avatar from '../../assets/imgperfil.webp';

interface Course {
    title: string;
    duration: string;
    height: string;
    weight: string;
    reason: string;
}

const courses: Course[] = [
    {
        title: '23 anos',
        duration: '1 ano',
        height: '183cm',
        weight: '97kg',
        reason: 'Perder gordura e definir'
    }
];

const Profile: React.FC = () => {
    return (
       <div className="profile">
        <ProfileHeader/>

        <div className="user-profile">
            <div className="user-detail">
                <img src={avatar} className="img-profile" alt="Avatar"/>
                <h3 className="username">Nome</h3>
                <span className="profession">Estudante</span>
            </div>

            <div className="user-courses">
                {courses.map((personal, index) => (
                    <div className="course" key={index}>
                        <div className="course-detail">
                            <span className="age">Idade: {personal.title}</span>
                            <span className="duration">Tempo de treino: {personal.duration}</span>
                            <span className="height">Altura: {personal.height}</span>
                            <span className="goal">Objetivo: {personal.reason}</span>
                            <span className="weight">Peso: {personal.weight}</span>                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
       </div>
    );
}

export default Profile;
