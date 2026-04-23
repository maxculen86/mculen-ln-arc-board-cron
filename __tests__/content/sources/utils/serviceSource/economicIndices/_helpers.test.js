import {
    sanitize,
    formatNumber,
    wrapStrong,
    formatVariation,
    HOME_FILTERS,
    filterForHome,
    transformInternals
} from '../../../../../../content/sources/utils/servicesSource/economicIndices/_helpers';

describe('content - sources - utils - serviceSource - economicIndices - _helpers', () => {
    describe('sanitize', () => {
        it('should return "-" for null', () => {
            expect(sanitize(null)).toBe('-');
        });

        it('should return "-" for undefined', () => {
            expect(sanitize(undefined)).toBe('-');
        });

        it('should return "-" for empty string', () => {
            expect(sanitize('')).toBe('-');
        });

        it('should return value as string', () => {
            expect(sanitize('GGAL')).toBe('GGAL');
            expect(sanitize(123)).toBe('123');
        });
    });

    describe('formatNumber', () => {
        it('should return "-" for null', () => {
            expect(formatNumber(null)).toBe('-');
        });

        it('should return "-" for undefined', () => {
            expect(formatNumber(undefined)).toBe('-');
        });

        it('should return "-" for empty string', () => {
            expect(formatNumber('')).toBe('-');
        });

        it('should return "-" for NaN', () => {
            expect(formatNumber('abc')).toBe('-');
        });

        it('should format number with es-AR locale', () => {
            const result = formatNumber(1000.5);
            expect(result).toMatch(/1[.,]000[.,]50/);
        });
    });

    describe('wrapStrong', () => {
        it('should return "-" for null', () => {
            expect(wrapStrong(null)).toBe('-');
        });

        it('should return "-" for undefined', () => {
            expect(wrapStrong(undefined)).toBe('-');
        });

        it('should return "-" for empty string', () => {
            expect(wrapStrong('')).toBe('-');
        });

        it('should wrap value in strong tag', () => {
            const result = wrapStrong(100);
            expect(result).toContain('<strong>');
            expect(result).toContain('</strong>');
        });
    });

    describe('formatVariation', () => {
        it('should return neutral span for null', () => {
            const result = formatVariation(null);
            expect(result).toBe('<span class="index-neutral">-</span>');
        });

        it('should return neutral span for undefined', () => {
            const result = formatVariation(undefined);
            expect(result).toBe('<span class="index-neutral">-</span>');
        });

        it('should return neutral span for empty string', () => {
            const result = formatVariation('');
            expect(result).toBe('<span class="index-neutral">-</span>');
        });

        it('should return neutral span for NaN', () => {
            const result = formatVariation('abc');
            expect(result).toBe('<span class="index-neutral">-</span>');
        });

        it('should return neutral span for zero', () => {
            const result = formatVariation(0);
            expect(result).toBe('<span class="index-neutral">0.0 %</span>');
        });

        it('should return positive span for positive values', () => {
            const result = formatVariation(5.5);
            expect(result).toBe('<span class="index-positive">5.5 %</span>');
        });

        it('should return negative span for negative values', () => {
            const result = formatVariation(-3.2);
            expect(result).toBe('<span class="index-negative">3.2 %</span>');
        });
    });

    describe('HOME_FILTERS', () => {
        describe('merval', () => {
            it('should return top 5 by highest absolute daily variation', () => {
                const cotizaciones = [
                    { ticket: 'A', var_diaria: 1 },
                    { ticket: 'B', var_diaria: -10 },
                    { ticket: 'C', var_diaria: 5 },
                    { ticket: 'D', var_diaria: -2 },
                    { ticket: 'E', var_diaria: 8 },
                    { ticket: 'F', var_diaria: 0.5 },
                    { ticket: 'G', var_diaria: -7 }
                ];

                const result = HOME_FILTERS.merval(cotizaciones);

                expect(result).toHaveLength(5);
                expect(result[0].ticket).toBe('B');
                expect(result[1].ticket).toBe('E');
                expect(result[2].ticket).toBe('G');
                expect(result[3].ticket).toBe('C');
                expect(result[4].ticket).toBe('D');
            });

            it('should return all if less than 5', () => {
                const cotizaciones = [
                    { ticket: 'A', var_diaria: 1 },
                    { ticket: 'B', var_diaria: 2 }
                ];

                const result = HOME_FILTERS.merval(cotizaciones);

                expect(result).toHaveLength(2);
            });
        });

        describe('etf', () => {
            it('should filter only DIA_US, QQQ_US, SPY_US', () => {
                const cotizaciones = [
                    { ticket: 'DIA_US', var_diaria: 1 },
                    { ticket: 'QQQ_US', var_diaria: 2 },
                    { ticket: 'SPY_US', var_diaria: 3 },
                    { ticket: 'OTHER', var_diaria: 4 },
                    { ticket: 'XYZ', var_diaria: 5 }
                ];

                const result = HOME_FILTERS.etf(cotizaciones);

                expect(result).toHaveLength(3);
                expect(result.map(item => item.ticket)).toEqual([
                    'DIA_US',
                    'QQQ_US',
                    'SPY_US'
                ]);
            });

            it('should return empty array if no allowed tickets', () => {
                const cotizaciones = [
                    { ticket: 'OTHER', var_diaria: 1 },
                    { ticket: 'XYZ', var_diaria: 2 }
                ];

                const result = HOME_FILTERS.etf(cotizaciones);

                expect(result).toHaveLength(0);
            });
        });
    });

    describe('filterForHome', () => {
        it('should return empty array if cotizaciones is not an array', () => {
            expect(filterForHome(null, 'merval')).toEqual([]);
            expect(filterForHome(undefined, 'merval')).toEqual([]);
            expect(filterForHome('string', 'merval')).toEqual([]);
        });

        it('should apply merval filter when tableType is merval', () => {
            const cotizaciones = [
                { ticket: 'A', var_diaria: 10 },
                { ticket: 'B', var_diaria: 5 }
            ];

            const result = filterForHome(cotizaciones, 'merval');

            expect(result).toHaveLength(2);
        });

        it('should apply etf filter when tableType is etf', () => {
            const cotizaciones = [
                { ticket: 'DIA_US', var_diaria: 1 },
                { ticket: 'OTHER', var_diaria: 2 }
            ];

            const result = filterForHome(cotizaciones, 'etf');

            expect(result).toHaveLength(1);
        });

        it('should return unfiltered cotizaciones for unknown tableType', () => {
            const cotizaciones = [
                { ticket: 'A', var_diaria: 1 },
                { ticket: 'B', var_diaria: 2 }
            ];

            const result = filterForHome(cotizaciones, 'unknown');

            expect(result).toEqual(cotizaciones);
        });
    });

    describe('transformInternals', () => {
        const mockCotizaciones = [
            {
                ticket: 'GGAL',
                var_diaria: 5.5,
                var_semanal: 2.1,
                var_mensual: -1.2,
                cotizacion_actual: 100,
                cotizacion_cierre: 98,
                habilitado: true
            },
            {
                ticket: 'ALUA',
                var_diaria: -3.2,
                var_semanal: 1.5,
                var_mensual: 0.8,
                cotizacion_actual: 50,
                cotizacion_cierre: 45,
                habilitado: true
            }
        ];

        it('should return valid table structure', () => {
            const data = {
                tableType: 'merval',
                fecha_actualizacion: '2026-02-24',
                hora_actualizacion: '10:00:00',
                cotizaciones: mockCotizaciones
            };

            const result = transformInternals(data, false);

            expect(result.type).toBe('table');
            expect(result._id).toBe('');
            expect(result.tableType).toBe('merval');
            expect(result.fecha_actualizacion).toBe('2026-02-24');
            expect(result.hora_actualizacion).toBe('10:00:00');
        });

        it('should have header with 6 columns', () => {
            const data = { tableType: 'merval', cotizaciones: [] };

            const result = transformInternals(data, false);

            expect(result.header).toHaveLength(6);
            expect(result.header.map(h => h.content)).toEqual([
                'Descripción',
                'Última',
                'Anterior',
                '% Día',
                '% Semanal',
                '% Mensual'
            ]);
        });

        it('should sort items alphabetically by ticket', () => {
            const data = {
                tableType: 'merval',
                cotizaciones: mockCotizaciones
            };

            const result = transformInternals(data, false);
            const tickets = result.rows.map(row => row[0].content);

            expect(tickets).toEqual(['ALUA', 'GGAL']);
        });

        it('should handle null data', () => {
            const result = transformInternals(null, false);

            expect(result.rows).toEqual([]);
        });

        it('should handle undefined data', () => {
            const result = transformInternals(undefined, false);

            expect(result.rows).toEqual([]);
        });

        it('should apply home filter when isHome is true', () => {
            const cotizaciones = [
                { ticket: 'DIA_US', var_diaria: 1, habilitado: true },
                { ticket: 'OTHER', var_diaria: 2, habilitado: true }
            ];
            const data = { tableType: 'etf', cotizaciones };

            const result = transformInternals(data, true);

            expect(result.rows).toHaveLength(1);
        });

        it('should filter riesgo-pais correctly', () => {
            const cotizaciones = [
                { ticket: 'RIESGO PAIS', var_diaria: 1, habilitado: true },
                { ticket: 'OTRO', var_diaria: 2, habilitado: true }
            ];
            const data = { tableType: 'riesgo-pais', cotizaciones };

            const result = transformInternals(data, false);

            expect(result.rows).toHaveLength(1);
            expect(result.rows[0][0].content).toBe('RIESGO PAIS');
        });

        it('should generate rows with correct structure', () => {
            const data = {
                tableType: 'merval',
                cotizaciones: [
                    {
                        ticket: 'TEST',
                        cotizacion_actual: 100,
                        cotizacion_cierre: 98,
                        var_diaria: 2,
                        var_semanal: 1,
                        var_mensual: -1,
                        habilitado: true
                    }
                ]
            };

            const result = transformInternals(data, false);
            const row = result.rows[0];

            expect(row).toHaveLength(6);
            expect(row[0]).toEqual({ _id: '', content: 'TEST', type: 'text' });
            expect(row[1].type).toBe('text');
            expect(row[1].content).toContain('<strong>');
        });

        describe('filtro habilitado', () => {
            it('should hide rows with habilitado === false', () => {
                const data = {
                    tableType: 'adrs',
                    cotizaciones: [
                        { ticket: 'TWTR', var_diaria: 1, habilitado: true },
                        { ticket: 'UTX', var_diaria: 0, habilitado: false }
                    ]
                };

                const result = transformInternals(data, false);

                expect(result.rows).toHaveLength(1);
                expect(result.rows[0][0].content).toBe('TWTR');
            });

            it('should hide rows when habilitado field is missing', () => {
                const data = {
                    tableType: 'merval',
                    cotizaciones: [
                        { ticket: 'GGAL', var_diaria: 1, habilitado: true },
                        { ticket: 'NOFIELD', var_diaria: 2 }
                    ]
                };

                const result = transformInternals(data, false);

                expect(result.rows).toHaveLength(1);
                expect(result.rows[0][0].content).toBe('GGAL');
            });

            it('should hide rows with habilitado null or undefined', () => {
                const data = {
                    tableType: 'merval',
                    cotizaciones: [
                        { ticket: 'A', var_diaria: 1, habilitado: null },
                        { ticket: 'B', var_diaria: 2, habilitado: undefined },
                        { ticket: 'C', var_diaria: 3, habilitado: true }
                    ]
                };

                const result = transformInternals(data, false);

                expect(result.rows).toHaveLength(1);
                expect(result.rows[0][0].content).toBe('C');
            });

            it('should apply habilitado filter before home top-5 for merval', () => {
                const cotizaciones = [
                    { ticket: 'A', var_diaria: 100, habilitado: false },
                    { ticket: 'B', var_diaria: 10, habilitado: true },
                    { ticket: 'C', var_diaria: 8, habilitado: true },
                    { ticket: 'D', var_diaria: 6, habilitado: true },
                    { ticket: 'E', var_diaria: 4, habilitado: true },
                    { ticket: 'F', var_diaria: 2, habilitado: true }
                ];
                const data = { tableType: 'merval', cotizaciones };

                const result = transformInternals(data, true);

                expect(result.rows).toHaveLength(5);
                const tickets = result.rows.map(row => row[0].content);
                expect(tickets).not.toContain('A');
            });

            it('should hide riesgo-pais row when habilitado is false', () => {
                const data = {
                    tableType: 'riesgo-pais',
                    cotizaciones: [
                        {
                            ticket: 'RIESGO PAIS',
                            var_diaria: 1,
                            habilitado: false
                        }
                    ]
                };

                const result = transformInternals(data, false);

                expect(result.rows).toHaveLength(0);
            });
        });
    });
});
