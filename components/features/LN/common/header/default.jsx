import React from 'react';
import Logo from './components/logo';

function Header() {
    // TODO: Implementar el header con el nuevo DS y sumar test.
    return (
        <header className="w-full flex justify-center items-center p-16 border-b border-thin border-muted">
            <div className="md:w-304 md:h-32 xl:w-380 xl:h-40">
                <Logo />
            </div>
        </header>
    );
}

export default Header;
