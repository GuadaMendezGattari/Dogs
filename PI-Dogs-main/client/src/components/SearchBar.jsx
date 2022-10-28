import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, searchByName } from '../redux/actions';
import style from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(searchByName(name));
        setName('');
    }

    function handleBack(e) {
        dispatch(getDogs());
    }
    return (
        <div className={style.div}>
            <input className={style.input} type="text" placeholder='Buscar por nombre' value={name} onChange={e => handleChange(e)}/>
            <button className={style.btn} onClick={e => handleClick(e)}>Buscar</button>
            <button className={style.btn} onClick={e => handleBack(e)}>Volver a cargar todos</button>
        </div>
    );
}