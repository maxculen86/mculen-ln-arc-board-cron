import { pickVisible3 } from '../../../../../../components/features/LN-nota/crtNotaV2/_utils/pickVisible3';

const mk = id => ({
    _id: id,
    website_url: `https://www.lanacion.com.ar/n/${id}`,
    canonical_url: `https://www.lanacion.com.ar/n/${id}`
});

describe('pickVisible3', () => {
    it('removes current and returns 3', () => {
        const most = [mk('A'), mk('B'), mk('C'), mk('D')];
        const res = pickVisible3('A', most, []);
        expect(res.map(a => a._id)).toEqual(['B', 'C', 'D']);
    });

    it('excludes already seen by pathname', () => {
        const most = [mk('A'), mk('B'), mk('C'), mk('D')];
        const seen = ['/n/B'];
        const res = pickVisible3('Z', most, seen);
        expect(res.map(a => a._id)).toEqual(['A', 'C', 'D']);
    });

    it('if current is in top3, include 4th to complete', () => {
        const most = [mk('A'), mk('B'), mk('C'), mk('D'), mk('E')];
        const res = pickVisible3('B', most, []);
        expect(res.map(a => a._id)).toEqual(['A', 'C', 'D']);
    });

    it('handles short lists gracefully', () => {
        const most = [mk('A'), mk('B')];
        const res = pickVisible3('A', most, []);
        expect(res.map(a => a._id)).toEqual(['B']);
    });
});
