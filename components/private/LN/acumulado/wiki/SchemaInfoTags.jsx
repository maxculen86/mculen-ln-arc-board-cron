/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';

const SchemaInfoTags = ({ classes, label, text, link }) => {
    return (
        <div className={classes}>
            <Text font="arial" size="4xs" weight="regular" extraClass="label">
                {label}
            </Text>
            {link ? (
                <ComLink link={link} target="_blank" textname={text} />
            ) : (
                <Text
                    font="sueca"
                    size="2xs"
                    weight="regular"
                    extraClass="text"
                >
                    {text}
                </Text>
            )}
        </div>
    );
};

export default SchemaInfoTags;

SchemaInfoTags.propTypes = {
    classes: PropTypes.string,
    link: PropTypes.string,
    label: PropTypes.string,
    text: PropTypes.string
};

SchemaInfoTags.defaultProps = {
    text: '',
    label: '',
    classes: '',
    link: ''
};
