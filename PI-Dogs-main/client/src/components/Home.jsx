import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getTemperaments, getDogs } from '../redux/actions';
import Card from './Card';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import Filtrado from './Filtrado';
import Ordenamiento from './Ordenamiento';
import Paginado from './Paginado';
import style from './Home.module.css';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments());
        dispatch(getDogs());
    }, [dispatch]);

    const dogs = useSelector(s => s.dogs);

    const [page, setPage] = useState(1);
    const perPage = 8;
    const indexLastDog = page * perPage;
    const indexFirstDog = indexLastDog - perPage;
    const currentDogs = Array.isArray(dogs) ? dogs.slice(indexFirstDog, indexLastDog) : dogs.msg;

    function paginado(number) {
        setPage(number);
    }

    return (
        <div className={style.divGrande}>
            <div className={style.divChico}>
                <h2 className={style.title}>Mi PI Dogs</h2>
                <h4 className={style.title}>Guadalupe Mendez Gattari</h4>
                <Link to='/dogs'><button className={style.btn}>Crear raza de perro</button></Link>
            </div>
            <div className={style.divSegundo}>
                <SearchBar/>
                <Filtrado/>
                <Ordenamiento/>
            </div>
            <div>
                <Paginado page={page} perPage={perPage} dogs={dogs.length} paginado={paginado}/>
            </div>
            <div className={style.perros}>
                {
                    Array.isArray(currentDogs) ?
                    currentDogs.map(el => {
                        return (
                            <div key={el.id}>
                                <Card
                                id={el.id}
                                name={el.name}
                                image={el.image}
                                temperament={el.temperament ? el.temperament : el.temperaments}
                                weight={el.weight}
                                />
                            </div>
                        );
                    }) :
                    <p className={style.p}>{currentDogs}</p>
                }
            </div>
        </div>
    );
}

/* 
Tareas por hacer:
    - Hacer testing de BD
    - Hacer testing de Back
    - Hacer testing de Front
*/

