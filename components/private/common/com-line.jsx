/* eslint-disable react/require-default-props */
import React from 'react';
import setClassName from './utils/setClassName';
import '../../../resources/dist/css/ln/components/com-line.css';

function ComLine(props) {
    const { classCondition = '' } = props;
    const _className = setClassName({
        baseClass: 'com-line',
        classCondition
    });
    return <div className={_className} />;
}

export default ComLine;
