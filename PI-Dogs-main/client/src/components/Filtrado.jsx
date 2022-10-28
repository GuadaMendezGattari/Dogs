import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCreated, filterByTemps, getDogs } from '../redux/actions';
import style from './Filtrado.module.css';

export default function Filtrado() {
    const dispatch = useDispatch();

    const temps = useSelector(s => s.temperaments).sort((a , b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    function handleFilterCreated(e) {
        if(e.target.value !== 'all') dispatch(filterByCreated(e.target.value));
        else dispatch(getDogs());
    }

    function handleFilterTemps(e) {
        if(e.target.value !== 'all') dispatch(filterByTemps(e.target.value));
        else dispatch(getDogs());
    }

    return (
        <div className={style.divGrande}>
            <label className={style.label}>Filtrar por </label>
            <div>
                <select className={style.select} onChange={e => handleFilterTemps(e)}>
                    <option value='all'>Temperamento</option>
                    {
                        temps?.length && 
                        temps.map(el => {
                            return (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            );
                        }) 
                    }
                </select>
            </div>
            <div>
                <select className={style.select} onChange={e => handleFilterCreated(e)}>
                    <option value='all'>Creados o existentes</option>
                    <option value='api'>Existentes</option>
                    <option value='created'>Creados</option>
                </select>
            </div>
        </div>
    );
}