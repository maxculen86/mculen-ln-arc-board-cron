import React from 'react';
import Consumer from 'fusion:consumer';
const MeteringAMPLayout = ({ globalContent }) => {
    const { id: _id = '', params: [articleType] = [] } = globalContent || {};
    const script = `
    function getCookie (name) {
            return document.cookie.replace(
                new RegExp("(?:(?:^|.*;\\s*)"+name+"\\s*=\\s*([^;]*).*$)|^.*$"),
                '$1'
            );
        };
        function findCookies (nameRegex) {
            const regex = new RegExp("("+nameRegex+")\\s*=\\s*([^;]*)", "g");
            const results = [];
            let match = regex.exec(document.cookie);
            const groups = nameRegex.split('(').length - 1;
            while (match != null) {
                results.push({ name: match[1], value: match[groups + 2] });
                match = regex.exec(document.cookie);
            }
            return results;
        };
        function setCookie (name, value) {
            const { name: _name, expire } = typeof name === 'object' ? name : { name };
            const cookieValue = ""+_name+"="+value+";domain=.lanacion.com.ar;path=/;expires="+new Date(expire).toUTCString()+";Secure;SameSite=None;";
            document.cookie = cookieValue;
        };
        function deleteCookie (name) {
            setCookie({ name, expire: 0 });
        };
        const cookies = findCookies('(amp|nota)Metering-[a-zA-Z0-9%-/]+');
        const auxDbName = 'auxMetering';
        const auxDb = getCookie(auxDbName);
        const auxDbArr = auxDb.split('|').filter(v => v);
        // Paso las cookies viejas a la nueva
        for (let index = 0; index < cookies.length; index++) {
                const c = cookies[index];
                const value = c.value;
                const obj = JSON.parse(value);
                if (obj.articleType !== 'abierta' && !auxDbArr.find(v => v.startsWith(obj._id))) {
                    auxDbArr.push(""+obj._id+","+obj.accessDate+"");
                }
                deleteCookie(c.name);
        }
        // Grabo nota actual
        const _id = "${_id}";
        const articleType = "${articleType}";
        if (articleType !== 'abierta' && !auxDbArr.find(v => v.startsWith(_id))) {
            auxDbArr.push(""+_id+","+Date.now()+"");
        }
        const quota = 15;
        if (auxDbArr.length > quota) {
            auxDbArr.splice(0, auxDbArr.length - quota);
        }
        setCookie({name: auxDbName, expire: Date.now()+30*24*3600*1000 }, auxDbArr.join('|'));
        console.log('\x1b[43mxxxxxxxxxxxxx I am Metering Script! xxxxxxxxxxxx');
    `;
    return (
        <script
            id="metering-amp"
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
};
export default Consumer(MeteringAMPLayout);
