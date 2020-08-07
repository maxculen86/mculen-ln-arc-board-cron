import React, { useMemo } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

const filterElements = (contentElements, subtype) => {
    // Si la nota es subtype 9 se usa un `find()` ya que para las notas de html libre
    // se debe tomar solo el primer elemento del contentElements de tipo 'raw_html'
    const filter = subtype === '9' ? 'find' : 'filter';
    const elements = contentElements[filter](element => {
        const { type: __type, content = '' } = element;
        return __type === 'raw_html' && content !== '';
    });

    // el método find devuelve un objeto por lo que se retorna dentro de un arreglo
    // para normalizar el resultado
    return subtype === '9' ? [elements] : elements;
};

// TODO: consultar si solo se cargarán los scripts de especialess3.lanacion.com.ar
// o todos los que vengan en el cuerpo de la nota (esto se unificaría con los socialEmeds)
const getScripts = content => {
    const scriptCommentsPattern = /<!--.*<script.*-->/gim;
    const result = content.replace(scriptCommentsPattern, '');

    const scriptsPattern = /<script[\s\S].*src=".*especialess3.lanacion\.com\.ar.+"[\s\S]*?>[\s\S]*?<\/script>/gim;

    // const pattern = /<script\b[^>]*>([\s\S]*?)<\/script>|<link[^>]*href[^>]*>/g;

    return (
        result &&
        result.match(scriptsPattern) &&
        result.match(scriptsPattern).map(script => {
            // TODO: obtener las props y children para pasarlos como parámetros
            // este hardcode es solo para ver como debe funcionar correctamente en el ejemplo de
            // /deportes/prueba-html-libre-nid17072020/?adstest=true&_website=la-nacion-ar
            return React.createElement('script', {
                defer: '',
                src:
                    'https://especialess3.lanacion.com.ar/18/mundial/mundial2018_votacion_goles/js/all.v1566307521.min.js'
            });
        })
    );
};

const ScriptHtmlLibre = props => {
    const {
        globalContent: { type, subtype, content_elements: contentElements }
    } = props;

    if (type !== 'story') return null;

    const elements = filterElements(contentElements, subtype);

    const scripts = elements.map(element => {
        const { content = '' } = element;
        return getScripts(content);
    });

    if (!scripts || !scripts.length) return null;

    // TODO: remover el script de pym en el onload
    const onLoadScript = `
        window.addEventListener("load",function(t){
            var e=document.querySelector(".com-embed.--html").getElementsByTagName("script"); 
            HTMLCollection.prototype.filter=Array.prototype.filter,e.filter(function(t){return t.getAttribute("src") && t.getAttribute("src").includes('especialess3.lanacion.com.ar')}).forEach(function(t){return t.remove()})});
    `;

    /* const onLoadScript = `
        window.addEventListener("load",function(t){
            const embeds = document.querySelector('.com-embed');
            const scripts = embeds.getElementsByTagName('script');
            const links = embeds.getElementsByTagName('link');

            for(let i = scripts.length -1; i >= 0; i--){
                scripts[i].parentNode.removeChild(scripts[i]);
            }

            for(let i = links.length -1; i >= 0; i--){
                links[i].parentNode.removeChild(links[i]);
            }
        });
    `; */

    return (
        <>
            {/* {scripts} */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js" />
            {/* <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: onLoadScript
                }}
            /> */}
        </>
    );
};

ScriptHtmlLibre.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(ScriptHtmlLibre);
