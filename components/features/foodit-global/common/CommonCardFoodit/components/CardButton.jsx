import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/cva';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { BOOKMARK_FILLED } from '../../bookmark/iconHelper';

export function CardButton({
    fill,
    handleBookmarkClick,
    container = 'grid',
    buttonProps
}) {
    const getTextClass = () => {
        if (container === 'link') return 'sm-none';
        if (container === 'grid' || container === 'related-content')
            return 'none';
        return 'lg-only';
    };

    const _textClassName = cx('uppercase', getTextClass());

    const _iconClassName = cx(
        'w-24',
        { 'w-20_lg': container !== 'grid' && container !== 'link' },
        { 'w-16_md': container === 'link' }
    );
    return (
        <Button
            variant="link"
            title="Guardar receta"
            onClick={handleBookmarkClick}
            {...buttonProps}
        >
            <Icon className={_iconClassName} color="dark">
                <IconSprite
                    name={fill ? BOOKMARK_FILLED : 'bookmark'}
                    critical={!fill}
                />
            </Icon>
            <span className={_textClassName}>Guardar</span>
        </Button>
    );
}

CardButton.propTypes = {
    fill: PropTypes.bool.isRequired,
    handleBookmarkClick: PropTypes.func.isRequired,
    container: PropTypes.string.isRequired,
    buttonProps: PropTypes.shape({
        'data-id': PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        'data-modal': PropTypes.string.isRequired,
        'data-test-id': PropTypes.string.isRequired,
        'data-father-type': PropTypes.string
    }).isRequired
};
