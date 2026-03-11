import React from 'react';
import { Card } from '@ln/contenidos-ui-card';
import { replaceAllUrlsResizerObject } from '../../../../private/LN/common/utils/mediaHelper';
import { getCardPropsFromArticle } from '../../grillaNotasV2/_helpers';

function NotaApertura({ articles = [] }) {
    if (!articles.length) return null;

    return (
        <>
            {articles.map(art => {
                const article = replaceAllUrlsResizerObject(art);
                const cardProps = getCardPropsFromArticle(article);
                return (
                    <Card
                        {...cardProps}
                        variant="regular"
                        titleTag="h2"
                        cardSize="m-l"
                        titleSize="--twoxl"
                        titleWeight="--font-medium"
                    />
                );
            })}
        </>
    );
}

export default NotaApertura;
