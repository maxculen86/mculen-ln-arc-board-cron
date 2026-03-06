import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useDisclosure } from '@ln/hooks';
import { Link } from '@ln/contenidos-ui-link';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { cx } from '@ln/cva';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { shouldShowNoteFooterTopThemes } from '../_utils/topRenderConditions';

function Themes({ globalContent }) {
    const { isOpen: isCollapsed, onToggle: onToggleCollapse } =
        useDisclosure(true);
    const { taxonomy, subtype } = globalContent;
    const { tags = [] } = taxonomy || {};

    if (!shouldShowNoteFooterTopThemes({ subtype, tags })) return null;

    const listTags = tags.map(({ type = 'tag', slug, text }) => ({
        type,
        path: slug,
        text
    }));

    const RenderTags = ({ arrayTags = [] }) => {
        const showBullet = index => index !== 0 || (isCollapsed && index === 3);

        return arrayTags?.map(({ path, text, type }, index) => {
            if (isCollapsed && index > 2) return null;
            return (
                <li key={text} className="flex ai-center">
                    {showBullet(index) && (
                        <Icon size={24}>
                            <IconSprite
                                name="bulletFilled"
                                height={16}
                                fill="var(--neutral-light-200)"
                            />
                        </Icon>
                    )}
                    <Link
                        href={`${type === 'tag' ? '/tema/' : ''}${path}/`}
                        title={text}
                        className="text-12 capitalize-first-letter"
                    >
                        {text}
                    </Link>
                </li>
            );
        });
    };

    return (
        <div
            className="flex jc-between gap-8 ai-end_m"
            data-mrf-recirculation="n_temas"
        >
            <ul className="flex flex-wrap w-100 jc-start jc-end_m brand-color">
                <RenderTags arrayTags={listTags} />
            </ul>
            {listTags?.length > 3 && (
                <Button
                    title="Ver más"
                    onClick={onToggleCollapse}
                    size="inherit"
                    iconOnly
                >
                    <Icon
                        size={12}
                        hasWrapper
                        bgColor="var(--neutral-light-100)"
                        className={cx(
                            isCollapsed
                                ? 'rotate-0_max767 rotate-180_m'
                                : 'rotate-180_max767 rotate-0_m'
                        )}
                    >
                        <IconSprite name="arrowDown" type="default" />
                    </Icon>
                </Button>
            )}
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
