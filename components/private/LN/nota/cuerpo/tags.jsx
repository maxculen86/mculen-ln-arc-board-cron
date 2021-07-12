import React from 'react';
import HeaderSection from '../../../common/mod-headerSection';

// TODO: este componente es el mismo que usamos para los tags en recetas. BORRAR ESTE
export default function tags() {
    return (
        <div className="com-tag cont_tags">
            <HeaderSection title="Temas" />

            <a className="com-item" href="/recetas/platos-principales">
                Platos de comida principal
            </a>
            <a className="com-item" href="/recetas/carnes">
                Carnes
            </a>
            <a className="com-item" href="/recetas/faciles-y-rapidas">
                Fáciles y rápidas
            </a>
        </div>
    );
}
