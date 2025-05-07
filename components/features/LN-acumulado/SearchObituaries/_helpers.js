import { cx } from '@ln/cva';
import { SITE_LANACION } from 'fusion:environment';

export const optionsTime = [
    { label: 'Hoy', value: '24' },
    { label: 'Últimas 48 horas', value: '48' },
    { label: 'Última semana', value: '168' },
    { label: 'Todas las fechas', value: 'all' }
];

export const handleSearch = (keyword = '', selectedOption = {}) => {
    const baseUrl = `${SITE_LANACION}/buscador/`;
    const hasKeyword = keyword.trim() !== '';
    const hasTimeFilter = selectedOption.value !== 'all';

    const query = hasKeyword ? encodeURIComponent(keyword) : 'avisos';

    const fkey = hasTimeFilter ? 'section|pubdate' : 'section';
    const fval = hasTimeFilter ? `avisos|${selectedOption.value}` : 'avisos';

    const finalUrl = `${baseUrl}?query=${query}&fkey=${fkey}&fval=${fval}`;

    window.location.href = finalUrl;
};

export const getSelectOptionClass = ({ selectedValue, optionValue }) =>
    cx('text-14', {
        'text-blue-500': selectedValue === optionValue
    });
