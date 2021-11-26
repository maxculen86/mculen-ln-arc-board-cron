import React from 'react';
import HeaderSection from '../../../common/mod-headerSection';

// TODO. reutilizar componente masNotas que ya tenemos en recetas. Este componente se agrega desde PageBuilder. NO lo llama el componente cuerpo
export default function masNotas() {
    return (
        <div className="keep-reading">
            <HeaderSection title="Seguí leyendo" />

            <a className="link">
                <strong>Villa La Angostura.</strong> Un choque en la ruta de los
                7 Lagos complica más la situación
            </a>
            <a className="link">
                <strong>Villa La Angostura.</strong> Un choque en la ruta de los
                7 Lagos complica más la situación
            </a>
            <a className="link">
                <strong>Villa La Angostura.</strong> Un choque en la ruta de los
                7 Lagos complica más la situación
            </a>
        </div>
    );
}
