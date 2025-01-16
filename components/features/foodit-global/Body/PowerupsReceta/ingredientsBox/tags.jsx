import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import PropTypes from 'prop-types';
import { addEventToDataLayerV2 } from '../../../../../private/LN/common/utils/addEventToDataLayer';

export function Tags({ items = [] }) {
    const handleClick = text => {
        addEventToDataLayerV2({
            event: 'click_tag',
            button: text
        });
    };

    return (
        items.length > 0 && (
            <ul className="flex flex-wrap gap-16">
                {items.map(({ text, url }) => (
                    <li key={text}>
                        <Button
                            variant="secondary"
                            title={text}
                            size={32}
                            href={url}
                            onClick={() => handleClick(text)}
                        >
                            {text}
                        </Button>
                    </li>
                ))}
            </ul>
        )
    );
}

Tags.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            url: PropTypes.string
        })
    ).isRequired
};

Tags.lazy = true;

export default Tags;
