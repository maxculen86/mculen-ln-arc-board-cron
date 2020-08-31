import React from 'react';
import ComButton from './com-button';
//import '../../../resources/dist/css/ln/modules/mod-category.css';

const ModCategory = props => {
    const { revista, category, color } = props;

    return (
        <div className="mod-categories">
            {revista ? (
                <i className={`com-logo logo-${revista} --large`}></i>
            ) : (
                <h1 className="com-title --xl" style={color}>
                    {category}
                </h1>
            )}

            <button type="button" className="com-button hlp-none" style={color}>
                <i className="icon-left"></i>
            </button>
            <ComButton classCondition="hlp-none" iconName="left" />
            <ol className="com-unordered --category">
                <li>
                    <a
                        href="/recetas/platos-de-comida-principal/"
                        className="com-link"
                        title="Principales"
                        style={color}
                    >
                        Principales
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/carnes/"
                        className="com-link"
                        title="Carnes"
                        style={color}
                    >
                        Carnes
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/celiacos-sin-gluten/"
                        className="com-link"
                        title="Celíacos"
                        style={color}
                    >
                        Celíacos
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/vegetarianas/"
                        className="com-link"
                        title="Vegetarianas"
                        style={color}
                    >
                        Vegetarianas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/faciles-y-rapidas/"
                        className="com-link"
                        title="Rápidas"
                        style={color}
                    >
                        Rápidas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/pollo/"
                        className="com-link"
                        title="Pollo"
                        style={color}
                    >
                        Pollo
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/dulces/"
                        className="com-link"
                        title="Dulces"
                        style={color}
                    >
                        Dulces
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/guarniciones/"
                        className="com-link"
                        title="Guarniciones"
                        style={color}
                    >
                        Guarniciones
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/entradas/"
                        className="com-link"
                        title="Entradas"
                        style={color}
                    >
                        Entradas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/tortas/"
                        className="com-link"
                        title="Tortas"
                        style={color}
                    >
                        Tortas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/postres/"
                        className="com-link"
                        title="Postres"
                        style={color}
                    >
                        Postres
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/veganas/"
                        className="com-link"
                        title="Veganas"
                        style={color}
                    >
                        Veganas
                    </a>
                </li>
                <li>
                    <a
                        href="/recetas/ensaladas/"
                        className="com-link"
                        title="Ensaladas"
                        style={color}
                    >
                        Ensaladas
                    </a>
                </li>
            </ol>
            <ComButton iconName="right" />
        </div>
    );
};

export default ModCategory;
