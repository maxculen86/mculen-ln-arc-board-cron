import { parse } from 'node-html-parser';
import walkerBuilder from '../../../../../../../common/utils/walker';
import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';
import unescapeHtml from '../../../../../../../common/utils/unescapeHtml';

const htmlText = (nodo, dataNota) => {
    if (!nodo) return null;

    const rootTagName = 'root';

    const html = parse(`<${rootTagName}>${nodo}</${rootTagName}>`);
    const walker = walkerBuilder([]);
    walker.addCondition(
        node => Array.isArray(node),
        (data, next) => {
            if (data.length === 1) return next(data[0]);

            const resp = [];
            data.forEach(n => {
                const v = next(n);
                if (v) resp.push(v);
            });
            return resp;
        }
    );
    walker.addCondition(
        node => node.tagName === rootTagName,
        (data, next) => {
            return next(data.childNodes);
        }
    );

    walker.addCondition(
        node => node.nodeType === 1 && node.tagName === 'a',
        (data, next) => {
            const attrs = getEmbedHref('href', data.rawAttrs.toLowerCase());
            return {
                _t: data.tagName,
                href: attrs,
                valor: next(data.childNodes)
            };
        }
    );

    walker.addCondition(
        node => node.nodeType === 1 && node.tagName === 'mark',
        (data, next) => {
            const classRegex = new RegExp('class="hl_(.*)"');
            const attrs = classRegex.exec(data.rawAttrs);
            return {
                _t: 'mark',
                color: attrs[1],
                valor: next(data.childNodes)
            };
        }
    );

    walker.addCondition(
        node => node.nodeType === 1 && node.tagName !== 'br',
        (data, next) => {
            return {
                _t: data.tagName,
                valor: next(data.childNodes)
            };
        }
    );

    walker.addCondition(
        node => !!node.rawText,
        (data, next) => {
            return unescapeHtml(data.rawText);
        }
    );

    return walker.parse(html.childNodes);
};

export default htmlText;
