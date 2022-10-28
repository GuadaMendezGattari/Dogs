import React from 'react';
import style from './Paginado.module.css';

export default function Paginado({page, perPage, dogs, paginado}) {
    const numbers = [];
    for(let i = 1; i <= Math.ceil(dogs/perPage); i++) {
        numbers.push(i);
    }
    return (
        <div>
            <nav className={style.nav}>
                {
                    numbers &&
                    numbers.map(el => {
                        return (
                            <span key={el}>
                                <button className={page === el ? style.activo : style.btn} onClick={() => paginado(el)}>{el}</button>
                            </span>
                        );
                    })
                }
            </nav>
        </div>
    );
}