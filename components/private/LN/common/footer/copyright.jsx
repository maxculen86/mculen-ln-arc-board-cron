import React from 'react';

const Copyright = () => {
    const year = new Date().getFullYear();
    const copyrightText = `Copyright ${year} SA LA NACION | Todos los derechos reservados`;
    return <p className="--threexs">{copyrightText}</p>;
};

export default Copyright;
