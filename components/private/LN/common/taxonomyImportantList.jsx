import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import ComLink from '../../common/com-link';
import textSelector from '../../common/utils/recetaDictionary';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ConditionalWrapper from './conditionalWrapper';
import '../../../../resources/dist/css/ln/modules/mod-themes.css';

function TaxonomyImportantList({ list, showItems, extraClass, collapsible }) {
    const [collapsed, setCollapsed] = useState(true);
    const _classNames = classNames('mod-themes', extraClass, { collapsible });

    return (
        <ConditionalWrapper
            condition={collapsible}
            wrapperProps={{
                className:
                    'flex jc-between ai-start gap-8 border border-bottom border-thin border-neutral-light-100 mb-16'
            }}
        >
            <section className={_classNames}>
                {list
                    .slice(0, collapsible && collapsed ? 4 : showItems)
                    .map(item => {
                        const { type = '', path = '', text = '' } = item;
                        return (
                            <ComLink
                                link={`${type === 'tag' ? '/tema/' : ''}${path}/`}
                                keytext={text}
                                classCondition={classNames(
                                    'com-button --secondary --compact --transparent',
                                    { '--tag': type === 'tag' }
                                )}
                                title={
                                    path.includes('/recetas')
                                        ? `Ir a notas de ${textSelector(text)}`
                                        : `Ir a notas de ${text.charAt(0).toLowerCase() + text.slice(1)}`
                                }
                                key={path}
                            >
                                {text}
                            </ComLink>
                        );
                    })}
            </section>
            {Boolean(collapsible && list.length > 4) && (
                <button
                    type="button"
                    onClick={() => setCollapsed(curr => !curr)}
                >
                    <IconSprite
                        name="arrowDown"
                        width={20}
                        height={20}
                        className={classNames(
                            'p-4 rounded-circle bg-neutral-light-100 flex-shrink-0',
                            { 'rotate-180': !collapsed }
                        )}
                    />
                </button>
            )}
        </ConditionalWrapper>
    );
}

TaxonomyImportantList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            path: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired,
    showItems: PropTypes.number,
    extraClass: PropTypes.string,
    collapsible: PropTypes.Boolean
};

TaxonomyImportantList.defaultProps = {
    showItems: undefined,
    extraClass: '',
    collapsible: false
};

export default TaxonomyImportantList;
