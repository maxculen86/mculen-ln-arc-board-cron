import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from '@ln/contenidos-ui-link';
import textSelector from '../../common/utils/recetaDictionary';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ConditionalWrapper from './conditionalWrapper';
import '../../../../resources/dist/css/ln/modules/mod-themes.css';

function TaxonomyImportantList({ list, showItems, extraClass, collapsible }) {
    const [collapsed, setCollapsed] = useState(true);
    const _classNames = classNames('mod-themes', extraClass, {
        collapsible,
        collapsed: collapsible && collapsed
    });

    if (!list) return null;

    return (
        <ConditionalWrapper
            condition={collapsible}
            wrapperProps={{
                className:
                    'flex jc-between ai-start gap-8 border border-bottom border-thin border-neutral-light-100 mb-16'
            }}
        >
            <section className={_classNames}>
                {list.slice(0, showItems).map(item => {
                    const { type = '', path = '', text = '' } = item;
                    const linkClassNames = classNames(
                        'themes-note com-button com-link --compact --transparent',
                        collapsible ? 'collapsible' : '--secondary',
                        { '--tag': type === 'tag' }
                    );
                    const linkTitle = path.includes('/recetas')
                        ? `Ir a notas de ${textSelector(text)}`
                        : `Ir a notas de ${text.charAt(0).toLowerCase() + text.slice(1)}`;
                    return (
                        <Link
                            href={`${type === 'tag' ? '/tema/' : ''}${path}/`}
                            className={linkClassNames}
                            title={linkTitle}
                            key={path}
                            keytext={text}
                        >
                            {text}
                        </Link>
                    );
                })}
            </section>
            {Boolean(collapsible && list.length > 4) && (
                <button
                    type="button"
                    onClick={() => setCollapsed(curr => !curr)}
                    className="sm-only"
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

export default TaxonomyImportantList;
