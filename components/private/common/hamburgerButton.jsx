import React from 'react';

export default function HamburgerButton({ className, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={className}
            role="button"
            tabIndex="0"
        >
            {children}
        </button>
    );
}
