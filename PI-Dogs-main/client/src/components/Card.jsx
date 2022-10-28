import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({id, image, name, temperament, weight}) {
    return (
        <div className={style.div}>
            <img className={style.imagen} src={image} alt=""/>
            <Link to={`/dogs/${id}`}><h5 className={style.title}>{name}</h5></Link>
            <h5 className={style.title}>{Array.isArray(temperament) ? temperament.map(el => el.name).join(', ') : temperament}</h5>
            <h5 className={style.title}>{weight}</h5>
        </div>
    );
}