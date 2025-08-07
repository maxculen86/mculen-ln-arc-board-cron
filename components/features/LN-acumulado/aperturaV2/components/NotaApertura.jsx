import React from 'react';
import PropTypes from 'prop-types';
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

NotaApertura.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            headlines: PropTypes.shape({
                mobile: PropTypes.string,
                basic: PropTypes.string,
                web: PropTypes.string
            }),
            label: PropTypes.shape({
                volanta: PropTypes.shape({
                    text: PropTypes.string
                }),
                chapita: PropTypes.shape({
                    text: PropTypes.string
                })
            }),
            taxonomy: PropTypes.shape({
                tags: PropTypes.arrayOf(PropTypes.string)
            }),
            display_date: PropTypes.string,
            website_url: PropTypes.string
        })
    ).isRequired
};

export default NotaApertura;
