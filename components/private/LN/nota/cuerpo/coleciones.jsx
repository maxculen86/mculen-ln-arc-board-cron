import React from 'react';
import ComTitle from '../../../common/com-title';
import ComParagraph from '../../../common/com-paragraph';

// TODO: investigar componte de ARC "social link"
export default function colecciones() {
    return (
        <div>
            <article className="colecciones">
                <section className="cont-figure"></section>
                <div className="hlp-paddingSides-15 hlp-paddingHeight-15">
                    <ComTitle
                        link="#"
                        tag="h2"
                        size="--xl"
                        content={'Colecciones LA NACION'}
                    />
                    <ComParagraph
                        size="--twoxs"
                        link="#"
                        content="Seguí el lanzamiento de los fascículos, libros o discos opcionales con tu diario LA NACION"
                    />
                </div>
            </article>
        </div>
    );
}
