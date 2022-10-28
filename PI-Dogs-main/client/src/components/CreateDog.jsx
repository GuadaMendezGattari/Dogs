import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../redux/actions';
import { Link } from 'react-router-dom';
import validate from '../validation';
import style from './CreateDog.module.css';

export default function CreateDog() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        min_height: 0,
        max_height: 0,
        min_weight: 0,
        max_weight: 0,
        life_span: '',
        temperaments: []
    });
    const [errors, setErrors] = useState({
        name: 'Se debe ingresar un nombre',
        min_height: 'Se debe ingresar una altura minima',
        max_height: 'Se debe ingresar una altura maxima',
        min_weight: 'Se debe ingresar un peso minimo',
        max_weight: 'Se debe ingresar un peso maximo',
        temperaments: 'Se debe ingresar como minimo un temperamento'
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const temps = useSelector(s => s.temperaments).sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        if(e.target.value !== 'a') {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            setErrors(validate({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            }))
        }
    }

    function handleSubmit(e) {
        if(input.name !== '' && 
        input.min_height > 0 && 
        input.max_height > 0 && 
        input.min_weight > 0 &&
        input.max_weight > 0 &&
        input.temperaments.length > 0 &&
        !errors.name && 
        !errors.min_height &&
        !errors.max_height &&
        !errors.min_weight &&
        !errors.max_weight &&
        !errors.temperaments
        ) {
            dispatch(postDog({
                name: input.name,
                weight: `${input.min_weight} - ${input.max_weight} kg`,
                height: `${input.min_height} - ${input.max_height} cm`,
                life_span: input.life_span,
                temperaments: input.temperaments
            }));
            setInput({
                name: '',
                min_weight: 0,
                max_weight: 0,
                min_height: 0,
                max_height: 0,
                life_span: '',
                temperaments: []
            });
            alert('Personaje creado con exito');
        }
        else {
            e.preventDefault();
            alert('Debe completar los campos obligatorios correctamente');
        }
    }

    return (
        <div className={style.divGrande}>
            <div className={style.divBtn}>
                <h2 className={style.title}>Mi PI Dogs</h2>
                <h4 className={style.title}>Guadalupe Mendez Gattari</h4>
                <Link to='/home'><button className={style.btn1}>Volver al home</button></Link>
            </div>
            <div className={style.divSegundo}>
                <form className={style.divForm} onSubmit={e => handleSubmit(e)}>
                    <h2 className={style.f}>Formulario de creacion</h2>
                     <div className={style.div}>
                        <div className={style.d}>Nombre: </div>
                        <input className={style.input} type="text" placeholder='Nombre...' name='name' onChange={e => handleChange(e)}/>
                        {
                            errors.name && 
                            <p className={style.p}>{errors.name}</p>
                        }
                    </div>
                    <div className={style.div}>
                        <div className={style.d}>Altura minima: </div>
                        <input className={style.input} type='number' placeholder='Altura minima en cm...' name='min_height' onChange={e => handleChange(e)}/>
                        {
                            errors.min_height && 
                            <p className={style.p}>{errors.min_height}</p>
                        }
                    </div>
                    <div className={style.div}>
                        <div className={style.d}>Altura maxima: </div>
                        <input className={style.input} type='number' placeholder='Altura maxima en cm...' name='max_height' onChange={e => handleChange(e)}/>
                        {
                            errors.max_height && 
                            <p className={style.p}>{errors.max_height}</p>
                        }
                    </div>
                    <div className={style.div}>
                        <div className={style.d}>Peso minimo: </div>
                        <input className={style.input} type='number' placeholder='Peso minimo en kg...' name='min_weight' onChange={e => handleChange(e)}/>
                        {
                            errors.min_weight && 
                            <p className={style.p}>{errors.min_weight}</p>
                        }
                    </div>
                    <div className={style.div}>
                        <div className={style.d}>Peso maximo: </div>
                        <input className={style.input} type='number' placeholder='Peso maximo en kg...' name='max_weight' onChange={e => handleChange(e)}/>
                        {
                            errors.max_weight && 
                            <p className={style.p}>{errors.max_weight}</p>
                        }
                    </div>
                    <div className={style.div}>
                        <div className={style.di}>Años de vida: </div>
                        <input className={style.input} type="text" placeholder='ej: 10 - 20 years' name='life_span' onChange={e => handleChange(e)}/>
                    </div>
                    <div className={style.div}>
                        <div className={style.d}>Temperamento: </div>
                        <select className={style.input} onChange={e => handleSelect(e)}>
                            <option value='a'>Seleccione</option>
                            {
                                temps?.length &&
                                temps.map(el => {
                                    return (
                                        <option key={el.id} value={el.name}>{el.name}</option>
                                    );
                                })
                            }
                        </select>
                        {
                            input.temperaments.length > 0 &&
                            <p className={style.temps}>{input.temperaments.join(', ')}</p>
                        }
                        {
                            errors.temperaments &&
                            <p className={style.p}>{errors.temperaments}</p>
                        }
                    </div>
                    <button type='submit' className={style.btn2}>Crear raza</button>
                </form>
            </div>
        </div>
    );
}