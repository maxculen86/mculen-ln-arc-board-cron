/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import SeguirLeyendo from '../../private/LN/nota/seguirLeyendo';
import get from '../../private/common/utils/get';
import filter from '../../../content/filters/LN/nota/articleAcu';
import articleBoxesTracker from '../../private/common/utils/noteTracker/articleBoxesTracker';

// TODO hacer unit test, fix hooks y default props

const seguirLeyendo = ({ globalContent, outputType }) => {
    const justThreeStories = content =>
        content
            .filter(element => element && element.type === 'story')
            .slice(0, 3);

    const getRelatedData = content =>
        content.map(article =>
            useContent({
                source: 'articleSourceNota',
                query: {
                    id: article._id,
                    imageConfig: 'boxArticles'
                },
                filter
            })
        );

    const relatedContent = get(globalContent, 'related_content.basic', []);
    const relatedStories = justThreeStories(relatedContent);
    const articles = getRelatedData(relatedStories);

    useEffect(() => {
        articleBoxesTracker({
            boxType: 'seguirLeyendo'
        });
    }, []);

    if (!articles.length) return null;

    return (
        <div className="row">
            <div className="col-12">
                <section
                    className="keep-reading"
                    data-is-block="true"
                    data-block-name="n_segui_leyendo"
                    data-diagramacion-id="0"
                >
                    <SeguirLeyendo
                        relatedContent={articles}
                        outputType={outputType}
                    />
                </section>
            </div>
        </div>
    );
};

seguirLeyendo.label = 'LN-Nota-SeguirLeyendo';

seguirLeyendo.propTypes = {
    globalContent: PropTypes.shape({
        related_content: PropTypes.shape({
            basic: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string,
                    headlines: PropTypes.shape({
                        basic: PropTypes.string,
                        mobile: PropTypes.string
                    })
                })
            )
        })
    }),
    outputType: PropTypes.string.isRequired
};

export default Consumer(seguirLeyendo);
