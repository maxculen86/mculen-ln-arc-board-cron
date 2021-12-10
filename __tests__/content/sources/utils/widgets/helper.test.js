import {
    getAuthForRequest,
    getDataFromQuery
} from '../../../../../content/sources/utils/widgets/helper';

describe('content - sources - utils -widgets - helper.js:', () => {
    describe('function getDataFromQuery', () => {
        it('when query is undefined should return default values', () => {
            expect(getDataFromQuery()).toStrictEqual({
                arcSite: 'la-nacion-ar',
                params: [],
                queryParams: {},
                uri: '',
                widget: undefined
            });
        });
        it('when query is defined should return data from query', () => {
            expect(
                getDataFromQuery({
                    uri: '/widgets/widgetName/param-1/param-2/',
                    'arc-site': 'la-nacion-ar',
                    id: 'HASOASOKPPFRMC'
                })
            ).toStrictEqual({
                arcSite: 'la-nacion-ar',
                params: ['param-1', 'param-2'],
                queryParams: { id: 'HASOASOKPPFRMC' },
                uri: '/widgets/widgetName/param-1/param-2/',
                widget: 'widgetName'
            });
        });
    });
    describe('function getAuthForRequest', () => {
        it('when token is undefined should return an empty object', () => {
            expect(getAuthForRequest()).toStrictEqual({});
        });
        it('when token is defined should return an authentication object', () => {
            const token = '762523BD-D5BC-4F2F-B173-BB01FEEDF059';
            expect(getAuthForRequest(token)).toStrictEqual({
                auth: {
                    bearer: token
                }
            });
        });
    });
});
