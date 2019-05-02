import React from 'react';
import Button from '../../button';
export default function CarousellPrevButton({ onClick }) {
    return (
        <Button onClick={onClick} className={'previous'}>
            Prev
        </Button>
    );
}
