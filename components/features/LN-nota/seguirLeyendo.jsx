import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';

const seguirLeyendo = props => {
    return (
        <Static id="LN-Nota-SeguirLeyendo">
            {props.globalContent.related_content.basic.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-12">
                            <div className="keep-reading">
                                <h4 className="com-subtitle-nota-3">
                                    Seguir Leyendo
                                </h4>
                                <SeguirLeyendo
                                    related_content={
                                        props.globalContent.related_content
                                            .basic
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Static>
    );
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

export default Consumer(seguirLeyendo);
