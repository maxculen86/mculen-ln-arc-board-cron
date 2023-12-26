import React from 'react';
import classNames from 'classnames';

export default function LoadingIcon({ className }) {
    const _classNames = classNames('loader', className);
    return <div className={_classNames} />;
}
