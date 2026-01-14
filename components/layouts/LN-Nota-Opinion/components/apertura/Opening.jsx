import React from 'react';
import Title from '../../../../features/LN/common/title/default';
import Breadcrumb from '../../../../features/LN/common/breadcrumb/default';

// TODO para front: realizar ajustes de estilos segun diseño
function Opening({ children }) {
    return (
        <div className="pt-65 -mt-65 pt-118_m -mt-87_m mt-0_l pt-112_l">
            {children}
        </div>
    );
}

Opening.Breadcrumb = Breadcrumb;
Opening.Title = Title;

export default Opening;
