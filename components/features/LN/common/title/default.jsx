import React from 'react';

// TODO para front: realizar ajustes de estilos segun diseño
function Title({ content }) {
    if (!content) return null;

    return (
        <h1 className="com-title --font-primary --sixxl --font-extra">
            {content}
        </h1>
    );
}
export default Title;
