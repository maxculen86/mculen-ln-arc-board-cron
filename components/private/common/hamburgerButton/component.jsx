import React from 'react';
import Button from '../button';

export default function HamburgerButton({ className, children }) {
    return <Button className={className}>{children}</Button>;
}
