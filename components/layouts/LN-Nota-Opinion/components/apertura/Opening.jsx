import React from 'react';
import Title from '../../../../features/LN/common/title/default';
import Breadcrumb from '../../../../features/LN/common/breadcrumb/default';

function Opening({ children, className }) {
    return <div className={className}>{children}</div>;
}

Opening.Breadcrumb = Breadcrumb;
Opening.Title = Title;

export default Opening;
