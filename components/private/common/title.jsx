import React from 'react';

function Title({ TitleTag = 'h3', className, title }) {
    return <TitleTag className={className}>{title}</TitleTag>;
}

export default Title;
