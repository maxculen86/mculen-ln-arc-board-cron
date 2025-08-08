import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/common-ui-text';

export function CardInfoNutricional({ title, cant, udm }) {
    return (
        <article className="text-center border border-all border-thin border-light-300 px-4 pt-8 pb-4 px-8_md py-8_md w-100 h-100">
            <Text className="prumo prumo-medium text-16">{title}</Text>
            <div className="bg-accent-vino-light">
                <Text className="roboto roboto-bold text-20 text-light-800">
                    {cant}{' '}
                    <span className="text-light-700 roboto-regular text-12">
                        {udm}
                    </span>
                </Text>
            </div>
        </article>
    );
}

CardInfoNutricional.propTypes = {
    title: PropTypes.string.isRequired,
    cant: PropTypes.string.isRequired,
    udm: PropTypes.string.isRequired
};
