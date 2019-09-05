import React from 'react';
import '../../../../assets/bundles/css/ln/components/date.css';

const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];
export default function DateArticle({ display_date }) {
    const date = new Date(display_date);
    return (
        <h4 className="com-date">
            {`${date.getDate()} de ${
                MONTHS[date.getMonth()]
            } de ${date.getFullYear()} ● ${date.getHours()}:${date.getMinutes()}`}
        </h4>
    );
}
