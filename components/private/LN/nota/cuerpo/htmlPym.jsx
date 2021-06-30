/* eslint-disable react/no-danger */
import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import AnexoIframe from '../../acumulado/anexoIframe';

const parseStyles = styles => {
    return styles
        .split(';')
        .filter(item => item !== '')
        .reduce((obj, key) => {
            const style = key.split(':');
            return { ...obj, [style[0].trim()]: style[1] };
        }, {});
};

const getPropsFromNode = node => {
    return node && node.nodeType === 1 && node.attributes
        ? [...node.attributes].reduce((obj, attr) => {
              let { name, value } = attr;
              name = name === 'class' ? 'className' : name;
              value = name === 'async' ? true : value;
              return {
                  ...obj,
                  [name]: name === 'style' ? parseStyles(value) : value || ''
              };
          }, {})
        : null;
};

const convertNodeToComponent = (node, id) => {
    if (!node) return null;
    const {
        tagName,
        nodeName,
        innerHTML,
        outerText,
        nodeValue,
        classList,
        childNodes
    } = node;

    const tag = (tagName || nodeName).toLocaleLowerCase();

    if (node.nodeType !== 1) return null;

    const __props = getPropsFromNode(node);

    if (tag === 'iframe' && classList && classList.contains('pym'))
        return (
            <div className="contenido-externo">
                <AnexoIframe
                    url={__props.src}
                    id={id}
                    styles={__props.styles}
                    _props={__props}
                />
            </div>
        );

    if (!Object.keys(node.childNodes).length)
        return React.createElement(tag, __props);

    if (
        node.querySelectorAll('iframe.pym').length &&
        childNodes &&
        childNodes.length
    ) {
        return React.createElement(
            tag,
            __props,
            getComponentsFromNodeList(childNodes, id)
        );
    }

    return React.createElement(tag, {
        ...__props,
        dangerouslySetInnerHTML: {
            __html: tag === 'style' ? outerText : innerHTML || nodeValue || ''
        }
    });
};

const getComponentsFromNodeList = (nodeList, id) => {
    if (!nodeList) return null;
    return [...nodeList]
        .map((node, index) => convertNodeToComponent(node, `${id}-${index}`))
        .filter(item => item != null);
};

const getChildren = (nodes, id) => {
    const {
        head: { childNodes: headElements = [] },
        childNodes = null,
        body: { childNodes: bodyChildNodes = null }
    } = nodes;

    // El DOMParser retorna un nodo #document
    // los estilos se encuentran en el tag <head> y los elementos en el tag <body>
    // para luego convertir todos los nodos en componentes de la misma forma se colocaron en un arreglo
    return [headElements, bodyChildNodes || childNodes || []]
        .map(nodeList => getComponentsFromNodeList(nodeList, id))
        .filter(item => item != null);
};

const HtmlPym = props => {
    const { data } = props;
    const { content } = data || { content: null };
    const { _id: id } = data || '';
    const parser = useRef();

    if (!content) return null;

    if (!parser.current) {
        parser.current = new DOMParser();
    }
    if (
        !parser.current
            .parseFromString(content, 'text/html')
            .querySelectorAll('.pym').length
    )
        return null;

    const __children = getChildren(
        parser.current.parseFromString(content, 'text/html'),
        id
    );

    if (!__children.length) return null;
    return <div className="com-embed --html">{__children}</div>;
};

HtmlPym.arcType = 'raw_html';
HtmlPym.outputType = 'default';
HtmlPym.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string
    })
};
HtmlPym.defaultProps = {
    data: {
        _id: '',
        content: ''
    }
};

export default HtmlPym;
