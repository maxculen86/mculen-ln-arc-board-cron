import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';

const seguirLeyendo = props => {
    return (
        <Static id="LN-Nota-SeguirLeyendo">
            {props.globalContent.related_content.basic.length > 0 && (
                <>
                    <h4 className="com-subtitle_list">Seguir Leyendo:</h4>
                    <SeguirLeyendo
                        related_content={
                            props.globalContent.related_content.basic
                        }
                    />
                </>
            )}
        </Static>
    );
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

export default Consumer(seguirLeyendo);
