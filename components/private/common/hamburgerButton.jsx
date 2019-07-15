import React from 'react';

export default function HamburgerButton({ className, children, onClick }) {
    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    );
}
