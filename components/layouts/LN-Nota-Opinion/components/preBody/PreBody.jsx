import React from 'react';
import Breadcrumb from '../../../../features/LN/common/breadcrumb/default';

function PreBody({ children }) {
    return <div className="w-full flex flex-col gap-16">{children}</div>;
}

PreBody.Breadcrumb = Breadcrumb;

export default PreBody;
