import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import ComTitle from '../../private/common/com-title';

// TODO: Reoptimizar este componente
const seguirLeyendo = props => {
    return (
        <Static id="LN-Nota-SeguirLeyendo">
            {props.globalContent.related_content.basic.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <section
                                className="keep-reading"
                                data-is-block="true"
                                data-block-name="n_segui_leyendo"
                                data-diagramacion-id="0"
                            >
                                <ComTitle
                                    size="--l"
                                    tag="h4"
                                    content="Seguir Leyendo"
                                />
                                <SeguirLeyendo
                                    //////Armar el componente del subtitulooooo
                                    related_content={
                                        props.globalContent.related_content
                                            .basic
                                    }
                                />
                            </section>
                        </div>
                    </div>
                </>
            )}
        </Static>
    );
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

export default Consumer(seguirLeyendo);
