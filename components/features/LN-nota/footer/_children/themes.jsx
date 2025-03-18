import React from 'react';
import PropTypes from 'fusion:prop-types';
import { getSectionsAsTags } from '../_utils/helper';
import HeaderSection from '../../../../private/common/mod-headerSection';
import { RECETA } from '../../../../private/common/utils/subtypes/subtypeHelper';

function Themes({ globalContent }) {
    const { taxonomy, subtype } = globalContent;
    const isReceta = subtype === RECETA;

    if (isReceta) return null;

    const { tags = [], sections } = taxonomy || {};

    const listTags = [...getSectionsAsTags(sections), ...tags].map(
        ({ type = 'tag', slug, text }) => ({
            type,
            path: slug,
            text
        })
    );

    if (!listTags.length) return null;

    return (
        <div className="row" data-mrf-recirculation="n_temas">
            <div className="col-12">
                <HeaderSection tag="h3" title="Temas" line={false} />
                <ul>
                    {listTags.map(({ path, text }) => (
                        <li>
                            <a href={path}>{text}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Themes.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.shape()),
            sections: PropTypes.arrayOf(PropTypes.shape())
        }),
        subtype: PropTypes.string
    }).isRequired
};

export default Themes;
