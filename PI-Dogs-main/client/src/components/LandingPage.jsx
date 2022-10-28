import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={style.divGrande}>
            <section className={style.section}>
                <h2 className={style.title}>Mi PI Dogs</h2>
                <h4 className={style.title}>Guadalupe Mendez Gattari</h4>
                <Link to='/home'><button className={style.btn}>Ir al home</button></Link>
            </section>
            <div className={style.otro}></div>
        </div>
    );
}