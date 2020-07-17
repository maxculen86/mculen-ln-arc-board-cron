import React from 'react';
import ComTitle from '../../../common/com-title';

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
                        size="xl"
                        content={'Colecciones LA NACION'}
                    />
                    <p className="hlp-margintop-5">
                        <a href="">
                            Seguí el lanzamiento de los fascículos, libros o
                            discos opcionales con tu diario LA NACION
                        </a>
                    </p>
                </div>
            </article>
        </div>
    );
}
