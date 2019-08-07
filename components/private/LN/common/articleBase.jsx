import React from 'react';
import ArticleTipoUno from './ArticleTypes/ArticleTipoUno';
import ArticleTipoDos from './ArticleTypes/ArticleTipoDos';
import ArticleTipoTres from './ArticleTypes/ArticleTipoTres';

export default function ArticleBase(props) {
    return (
        <ArticleType className={`mod-caja-nota ${props.extraClasses}`}>
            {props.children}
        </ArticleType>
    );
}

{
    /* <article class="mod-caja-nota lugares w-100-mobile">
    <section id="" class="cont-figure">
        <a href="" class="figure">
            <picture id="" class="content-pic picture">
                <img src="https://bucket1.glanacion.com/anexos/fotos/22/3054322h600.jpg" alt="" class="content-img">
            </picture>
        </a>
    </section>
    <div class="mod-caja-nota__descrip">
        <h2 class="com-title-acu"><a href=""><b>La escuela</b> que tiene de escudo al Che Guevara y donde izan la bandera de Cuba</a></h2>
        <h4 class="com-date">1 de Julio de 2019 • 08:05</h4>

    </div>
</article> */
}
