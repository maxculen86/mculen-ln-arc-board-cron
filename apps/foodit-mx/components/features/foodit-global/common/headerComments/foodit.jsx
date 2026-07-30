import React from 'react';
import { Text } from '@ln/common-ui-text';

export function HeaderComments() {
    const handleVerLegales = () => {
        const verLegalesText =
            document.querySelector('#ver-legales-text') || null;
        verLegalesText && verLegalesText.classList.toggle('none');
    };
    return (
        <div className="flex flex-column mb-40">
            <section className="mb-16">
                <div className="flex ai-center jc-between mb-4">
                    <Text as="h4" className="prumo prumo-medium text-24">
                        Enviá tu comentario
                    </Text>
                    <span
                        title="Ver legales"
                        onClick={() => handleVerLegales()}
                        className="text-14 cursor-pointer"
                    >
                        Ver legales
                    </span>
                </div>
                <hr />
            </section>
            <Text id="ver-legales-text" className="none text-14">
                Los comentarios publicados son de exclusiva responsabilidad de
                sus autores y las consecuencias derivadas de ellos pueden ser
                pasibles de sanciones legales. Aquel usuario que incluya en sus
                mensajes algún comentario violatorio del reglamento será
                eliminado e inhabilitado para volver a comentar. Enviar
                comentario implica la aceptación del Reglamento.
            </Text>
        </div>
    );
}
