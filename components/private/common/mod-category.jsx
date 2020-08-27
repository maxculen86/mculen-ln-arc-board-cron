import React from 'react';
//import ComIcon from './com-icon';
//import '../../../resources/dist/css/ln/modules/mod-share.css';

const ModCategory = props => {
    const { revista, category } = props;

    return (
        <div className="mod-categories">
            {revista ? (
                <i className={`com-logo logo-${revista} --large`}></i>
            ) : (
                <h1 className="com-title --xl ">{category}</h1>
            )}

            <button type="button" className="com-button hlp-none">
                <i className="icon-left"></i>
            </button>
            <ol className="com-unordered --category">
                <li>
                    <a
                        href="/recetas/platos-de-comida-principal/"
                        className="com-link"
                        title="Principales"
                    >
                        Principales
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/carnes/"
                        className="com-link"
                        title="Carnes"
                    >
                        Carnes
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/celiacos-sin-gluten/"
                        className="com-link"
                        title="Celíacos"
                    >
                        Celíacos
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/vegetarianas/"
                        className="com-link"
                        title="Vegetarianas"
                    >
                        Vegetarianas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/faciles-y-rapidas/"
                        className="com-link"
                        title="Rápidas"
                    >
                        Rápidas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/pollo/"
                        className="com-link"
                        title="Pollo"
                    >
                        Pollo
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/dulces/"
                        className="com-link"
                        title="Dulces"
                    >
                        Dulces
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/guarniciones/"
                        className="com-link"
                        title="Guarniciones"
                    >
                        Guarniciones
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/entradas/"
                        className="com-link"
                        title="Entradas"
                    >
                        Entradas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/tortas/"
                        className="com-link"
                        title="Tortas"
                    >
                        Tortas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/postres/"
                        className="com-link"
                        title="Postres"
                    >
                        Postres
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/veganas/"
                        className="com-link"
                        title="Veganas"
                    >
                        Veganas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/ensaladas/"
                        className="com-link"
                        title="Ensaladas"
                    >
                        Ensaladas
                    </a>
                </li>
            </ol>
            <button type="button" className="com-button">
                <i className="icon-right"></i>
            </button>
        </div>
    );
};

export default ModCategory;
