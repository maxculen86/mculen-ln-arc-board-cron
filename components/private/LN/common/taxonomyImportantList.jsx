import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../resources/dist/css/ln/modules/mod-themes.css';
import ComLink from '../../common/com-link';
import textSelector from '../../common/utils/recetaDictionary';

const TaxonomyImportantList = ({ list, showItems, extraClass }) => {
    return (
        <section className={`mod-themes ${extraClass}`}>
            {list.slice(0, showItems).map(item => {
                const { path = '' } = item;
                return (
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
                        title={
                            path.includes('/recetas')
                                ? `Ir a notas de ${textSelector(item.text)}`
                                : `Ir a notas de ${item.text
                                      .charAt(0)
                                      .toLowerCase() + item.text.slice(1)}`
                        }
                    >
                        {item.text}
                    </ComLink>
                );
            })}
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
    extraClass: PropTypes.string
};

TaxonomyImportantList.defaultProps = {
    showItems: undefined,
    extraClass: ''
};

export default TaxonomyImportantList;
