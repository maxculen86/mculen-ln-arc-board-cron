import React from 'react';
import Consumer from 'fusion:consumer';

function Ranking(props) {
    return (
        <div className="com-ranking hlp-none hlp-tablet-none">
            <h2 className="com-title-section-m">
                {props.globalContent.name} más leídas
            </h2>
            <ul className="com-ordered">
                <li className="com-item">
                    <article className="mod-caja-nota --border ohlala">
                        <section id="" className="cont-figure">
                            <a href="" className="figure">
                                <picture id="" className="content-pic picture">
                                    <img
                                        src="https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg"
                                        alt=""
                                        className="content-img"
                                    />
                                </picture>
                            </a>
                        </section>
                        <div className="mod-caja-nota__descrip">
                            <h2 className="com-title-acu">
                                <a href="">
                                    <b>La escuela</b> que tiene de escudo al Che
                                    Guevara y donde izan la bandera de Cuba
                                </a>
                            </h2>
                        </div>
                    </article>
                </li>
                <li className="com-item">
                    <article className="mod-caja-nota --border ohlala">
                        <section id="" className="cont-figure">
                            <a href="" className="figure">
                                <picture id="" className="content-pic picture">
                                    <img
                                        src="https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg"
                                        alt=""
                                        className="content-img"
                                    />
                                </picture>
                            </a>
                        </section>
                        <div className="mod-caja-nota__descrip">
                            <h2 className="com-title-acu">
                                <a href="">
                                    <b>La escuela</b> que tiene de escudo al Che
                                    Guevara y donde izan la bandera de Cuba
                                </a>
                            </h2>
                        </div>
                    </article>
                </li>
                <li className="com-item">
                    <article className="mod-caja-nota --border ohlala">
                        <section id="" className="cont-figure">
                            <a href="" className="figure">
                                <picture id="" className="content-pic picture">
                                    <img
                                        src="https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg"
                                        alt=""
                                        className="content-img"
                                    />
                                </picture>
                            </a>
                        </section>
                        <div className="mod-caja-nota__descrip">
                            <h2 className="com-title-acu">
                                <a href="">
                                    <b>La escuela</b> que tiene de escudo al Che
                                    Guevara y donde izan la bandera de Cuba
                                </a>
                            </h2>
                        </div>
                    </article>
                </li>
            </ul>
        </div>
    );
}

export default Consumer(Ranking);
