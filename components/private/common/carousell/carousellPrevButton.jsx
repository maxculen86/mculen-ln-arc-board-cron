import React from 'react';
export default function CarousellPrevButton({ onClick }) {
    return (
        <button onClick={onClick} className={'previous'}>
            Prev
        </button>
    );
}
