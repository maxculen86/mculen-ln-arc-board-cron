import { parse } from 'node-html-parser';
import walkerBuilder from '../../../../../common/utils/walker';

const htmlText = text => {
    const rootTagName = 'root';

    const html = parse(`<${rootTagName}>${text}</${rootTagName}>`);
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
            const hrefRegex = new RegExp('href="(.*)"');
            const attrs = hrefRegex.exec(data.rawAttrs);
            const resp = {
                _t: data.tagName,
                href: attrs[1],
                valor: next(data.childNodes)
            };
            return resp;
        }
    );
    // Arc permite dale color a palabras 'mark'. Consultar que hacemos en este caso, por ahora, mando solo el texto plano
    walker.addCondition(
        node =>
            node.nodeType === 1 &&
            node.tagName !== 'mark' &&
            node.tagName !== 'br',
        (data, next) => {
            const resp = {
                _t: data.tagName,
                valor: next(data.childNodes)
            };
            return resp;
        }
    );
    walker.addCondition(
        node => !!node.rawText,
        (data, next) => {
            return data.rawText;
        }
    );

    const walkerResp = walker.parse(html.childNodes);
    return walkerResp;
};

export default htmlText;
