/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import setClassName from './utils/setClassName';
import '../../../resources/dist/css/ln/components/com-line.css';

const ComLine = props => {
    const { classCondition = '' } = props;
    const _className = setClassName({
        baseClass: 'com-line',
        classCondition
    });
    return <div className={_className} />;
};

ComLine.propTypes = {
    classCondition: PropTypes.string
};

export default ComLine;
