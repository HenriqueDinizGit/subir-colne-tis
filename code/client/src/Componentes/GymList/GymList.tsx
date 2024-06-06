import React from "react";
import './GymList.css';
import image1 from '../../assets/tperna.webp';

interface Teacher {
    image: string;
    name: string;
    exercises: string;
    duration: string;
}

const teacher: Teacher[] = [
    {
        image: image1,
        name: 'Professor Mateus',
        exercises: '8 exercícios',
        duration: '1 hora e meia',
    },
    {
        image: image1,
        name: 'Professor Pedro',
        exercises: '5 exercícios',
        duration: '1 hora e 20 minutos',
    },
    {
        image: image1,
        name: 'Professora Bianca',
        exercises: '6 exercícios',
        duration: '2 horas',
    },
    {
        image: image1,
        name: 'Professor Mateus',
        exercises: '8 exercícios',
        duration: '1 hora e meia',
    }
];

const GymList: React.FC = () => {
    return (
        <div className="gym-list">
            <div className="list-header">
                <h2>Fichas</h2>
            </div>
            <div className="list-container">
                {teacher.map((teacher, index) => (
                    <div className="list" key={index}>
                        <div className="teacher-detail">
                            <img src={teacher.image} alt={teacher.name} />
                            <p>{teacher.name}</p>
                            <p>{teacher.exercises}</p>
                            <p>{teacher.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GymList;
