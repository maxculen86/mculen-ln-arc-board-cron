import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/modules/mod-themes.css';
import ComLink from '../../common/com-link';

const TaxonomyImportantList = ({ list, showItems, extraTagText }) => {
    return (
        <section className="mod-themes">
            {list.slice(0, showItems).map(item => (
                <ComLink
                    link={
                        item.type === 'tag'
                            ? `/tema/${item.path}/`
                            : `${item.path}/`
                    }
                    keytext={item.text}
                    classCondition={
                        item.type === 'tag'
                            ? 'com-button --secondary --compact --transparent --tag'
                            : 'com-button --secondary --compact --transparent'
                    }
                    title={`Ir a notas de ${extraTagText} ${item.text}`}
                >
                    {item.text}
                </ComLink>
            ))}
        </section>
    );
};

TaxonomyImportantList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired,
    showItems: PropTypes.number,
    extraTagText: PropTypes.string
};

TaxonomyImportantList.defaultProps = {
    showItems: undefined,
    extraTagText: ''
};

export default TaxonomyImportantList;
