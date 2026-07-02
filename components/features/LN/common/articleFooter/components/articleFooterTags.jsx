import React, { Fragment } from 'react';
import { Scrollarea } from '@ln/ds-common-scrollarea';
import { Link } from '@ln/ds-common-link';
import Icon from '../../../../ui/ln/icon/default';

/**
 * @typedef {import('@ln/ds-common-link').LinkProps} LinkProps
 */

/**
 * Listado horizontal de temas. Recibe un array de LinkProps y agrega
 * automáticamente un separador (icono "bullet-filled") entre cada link.
 *
 * @param {object} props
 * @param {LinkProps[]} [props.tags=[]] - Links de temas a renderizar.
 * @returns {React.ReactElement}
 */
function Tags({ tags = [] }) {
    if (!tags || tags.length < 1) return null;
    return (
        <Scrollarea direction="horizontal" hideScrollbar className="h-32">
            <Scrollarea.Content className="items-center gap-6">
                {tags.map(({ children, ...linkProps }, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={linkProps.href ?? index}>
                        {index > 0 && (
                            <Icon
                                name="bullet-filled"
                                fill="#E5E5E5"
                                size={14}
                            />
                        )}
                        <Link {...linkProps}>
                            <span className="flex whitespace-nowrap items-center text-label-sm font-normal text-primary-default underline decoration-solid [text-decoration-skip-ink:none]">
                                {children}
                            </span>
                        </Link>
                    </Fragment>
                ))}
            </Scrollarea.Content>
            <div>
                <Scrollarea.Arrow
                    direction="start"
                    className="p-8 text-black-default"
                >
                    <Icon name="arrow-left" size={16} />
                </Scrollarea.Arrow>
                <Scrollarea.Arrow
                    direction="end"
                    className="p-8 text-black-default"
                >
                    <Icon name="arrow-right" size={16} />
                </Scrollarea.Arrow>
            </div>
            <Scrollarea.Gradient gradientColor="var(--color-white-default)" />
        </Scrollarea>
    );
}

Tags.displayName = 'ArticleFooterUi.Tags';

export default Tags;
