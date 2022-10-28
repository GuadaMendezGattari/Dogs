import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDogDetail, backToHome } from '../redux/actions';
import style from './DogDetail.module.css';

export default function DogDetail() {
    let {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDogDetail(id));
    }, [dispatch, id]);
    const dog = useSelector(s => s.dogDetail);

    function handleButton(e) {
        dispatch(backToHome());
    }
    return (
        <div className={style.divGrande}>
            <div className={style.divBtn}>
                <h2 className={style.title}>Mi PI Dogs</h2>
                <h4 className={style.title}>Guadalupe Mendez Gattari</h4>
                <Link to='/home'><button className={style.btn} onClick={e => handleButton(e)}>Volver al home</button></Link>
            </div>
            <div className={style.divChico}>
                <section><img className={style.imagen} src={dog.image} alt=""/></section>
                <section>
                    <h2 className={style.tituloGrande}>Nombre: {dog.name}</h2>
                    <h5 className={style.tituloChico}>Altura: {dog.height}</h5>
                    <h5 className={style.tituloChico}>Peso: {dog.weight}</h5>
                    <h5 className={style.tituloChico}>Años de vida: {dog.life_span}</h5>
                    <h5 className={style.tituloChico2}>Temperamento: {dog.temperament ? dog.temperament : dog.temperaments ? dog.temperaments.map(el => el.name).join(', ') : 'No tiene temperamento definido'}</h5>
                </section>
            </div>
        </div>
    );
}