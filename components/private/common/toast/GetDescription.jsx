/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../text';

const GetDescription = ({ status, description, custom }) => {
    const withNormalDescription = () => {
        return (
            description && (
                <Text size="--twoxs --description">{description}</Text>
            )
        );
    };
    const customDescription = {
        bookmark: {
            success: () => {
                return (
                    <Text size="2xs">
                        Se borró de <strong>Mis notas, Guardadas.</strong>
                    </Text>
                );
            },
            info: () => <></>,
            alert: () => <></>,
            danger: () => {
                return <Text size="2xs">Parece que hubo un problema.</Text>;
            }
        }[status]
    };
    return custom ? customDescription[custom]() : withNormalDescription();
};

GetDescription.propTypes = {
    custom: PropTypes.oneOf(['bookmark'])
};
GetDescription.defaultProps = {
    custom: ''
};
export default GetDescription;
