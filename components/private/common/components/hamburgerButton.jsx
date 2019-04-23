import React from 'react';
import Button from '../containers/button';

export default function HamburgerButton({ className, children }) {
    return <Button className={className}>{children}</Button>;
}
