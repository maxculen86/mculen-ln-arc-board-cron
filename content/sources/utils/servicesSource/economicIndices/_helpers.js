import get from '../../../../../components/private/common/utils/get';

export const sanitize = value =>
    value === null || value === undefined || value === '' ? '-' : String(value);

export const formatNumber = value => {
    if (value === null || value === undefined || value === '') return '-';
    const num = parseFloat(value);
    if (Number.isNaN(num)) return '-';
    return num.toLocaleString('es-AR');
};

export const wrapStrong = value =>
    value === null || value === undefined || value === ''
        ? '-'
        : `<strong>${formatNumber(value)}</strong>`;

export const formatVariation = value => {
    const num = parseFloat(value);

    if (
        value === null ||
        value === undefined ||
        value === '' ||
        Number.isNaN(num)
    ) {
        return '<span class="index-neutral">-</span>';
    }

    const clase = num > 0 ? 'index-positive' : 'index-negative';
    const texto = `${Math.abs(num)} %`;

    if (num === 0) return '<span class="index-neutral">0 %</span>';

    return `<span class="${clase}">${texto}</span>`;
};

export const HOME_FILTERS = {
    merval: cotizaciones =>
        [...cotizaciones]
            .sort(
                (a, b) =>
                    Math.abs(get(b, 'var_diaria', 0)) -
                    Math.abs(get(a, 'var_diaria', 0))
            )
            .slice(0, 5),
    etf: cotizaciones => {
        const allowedTickets = ['DIA_US', 'QQQ_US', 'SPY_US'];
        return cotizaciones.filter(item =>
            allowedTickets.includes(get(item, 'ticket', ''))
        );
    }
};

export const filterForHome = (cotizaciones, tableType) => {
    if (!Array.isArray(cotizaciones)) return [];
    const filterFn = HOME_FILTERS[tableType];
    return filterFn ? filterFn(cotizaciones) : cotizaciones;
};

export const transformInternals = (data, isHome) => {
    const {
        tableType,
        fecha_actualizacion: fechaActualizacion,
        hora_actualizacion: horaActualizacion,
        cotizaciones = []
    } = data || {};

    let items = cotizaciones;

    if (isHome) {
        items = filterForHome(items, tableType);
    } else if (tableType === 'riesgo-pais') {
        items = items.filter(item => get(item, 'ticket', '') === 'RIESGO PAIS');
    }

    const getTicketLabel = item =>
        get(item, 'ticket_name', '') || get(item, 'ticket', '');

    const itemsSortedByTicket = [...items].sort((itemA, itemB) =>
        getTicketLabel(itemA).localeCompare(getTicketLabel(itemB))
    );

    const rows = itemsSortedByTicket.map(item => [
        { _id: '', content: sanitize(getTicketLabel(item)), type: 'text' },
        {
            _id: '',
            content: wrapStrong(get(item, 'cotizacion_actual', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatNumber(get(item, 'cotizacion_cierre', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_diaria', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_semanal', '')),
            type: 'text'
        },
        {
            _id: '',
            content: formatVariation(get(item, 'var_mensual', '')),
            type: 'text'
        }
    ]);

    return {
        type: 'table',
        _id: '',
        tableType,
        fecha_actualizacion: fechaActualizacion,
        hora_actualizacion: horaActualizacion,
        header: [
            { _id: '', content: 'Descripción', type: 'text' },
            { _id: '', content: 'Última', type: 'text' },
            { _id: '', content: 'Anterior', type: 'text' },
            { _id: '', content: '% Día', type: 'text' },
            { _id: '', content: '% Semanal', type: 'text' },
            { _id: '', content: '% Mensual', type: 'text' }
        ],
        rows
    };
};
