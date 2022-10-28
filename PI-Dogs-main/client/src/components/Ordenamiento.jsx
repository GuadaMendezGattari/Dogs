import React from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, orderByName, orderByWeight } from '../redux/actions';
import style from './Ordenamiento.module.css';

export default function Ordenamiento() {
    const dispatch = useDispatch();

    function handleOrderByName(e) {
        if(e.target.value !== 'all') dispatch(orderByName(e.target.value));
        else dispatch(getDogs());
    }

    function handleOrderByWeight(e) {
        if(e.target.value !== 'all') dispatch(orderByWeight(e.target.value));
        else dispatch(getDogs());
    }
    return (
        <div className={style.divGrande}>
            <label className={style.label}>Ordenar por </label>
            <div>
                <select className={style.select} onChange={e => handleOrderByName(e)}>
                    <option value='all'>Orden alfabetico</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
            </div>
            <div>
                <select className={style.select} onChange={e => handleOrderByWeight(e)}>
                    <option value='all'>Peso</option>
                    <option value='asc'>Mas liviano a mas pesado</option>
                    <option value='desc'>Mas pesado a mas liviano</option>
                </select>
            </div>
        </div>
    );
}