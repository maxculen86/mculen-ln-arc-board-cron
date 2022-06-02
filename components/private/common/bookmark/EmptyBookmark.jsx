/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import getAssetsPath from '../utils/getAssetsPath';
import Text from '../text';
import Icon from '../icon';

const EmptyBookmark = () => {
    const { contextPath, deployment } = useAppContext();
    const placeholder = getAssetsPath(contextPath)(deployment)(
        'empty-bookmark.png'
    );

    return (
        <section className="empty-bookmark">
            <div className="placeholder-bookmark">
                <Static id="empty-placeholder">
                    <img src={placeholder} alt="Marcador de notas vacío" />
                </Static>
            </div>
            <div>
                <Text tag="h3" size="--m" weight="bold" font="--sueca">
                    ¡Todavía no guardaste ninguna nota!
                </Text>
                <Text extraClass="instruction" size="--twoxs" font="--arial">
                    <Text>
                        Presioná en el botón <Icon name="bookmark" /> dentro de
                        la nota y listo.
                    </Text>
                </Text>
            </div>
        </section>
    );
};

export default EmptyBookmark;
