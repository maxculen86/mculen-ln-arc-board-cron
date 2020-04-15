import fs from 'fs';
import path from 'path';
import http from 'http';
import Url from 'url';
import parser from '../components/private/LN/api/v1/nota';

const PORT = 9000;
const HOST = '127.0.0.1';
const pathBase = '__mocks__/data/articles';
const { log, time, timeStamp, timeEnd } = console;

http.createServer((req, res) => {
    const url = new Url.URL(`http://${HOST}:${PORT}${req.url}`);

    if (url.pathname !== '/') {
        res.writeHead(404);
        res.end();

        return;
    }

    time('TIME');
    const id = url.searchParams.get('id');

    const filename = path.resolve(`${process.cwd()}/${pathBase}/${id}.json`);

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.write(err.message);
        } else {
            timeStamp('TIME');
            const json = JSON.parse(data.toString());

            timeStamp('TIME');
            const parsed = parser(json);

            timeStamp('TIME');
            const str = JSON.stringify(parsed, null, 2);

            log(parsed);

            timeStamp('TIME');
            res.writeHead(200, { 'content-type': 'application/json' });
            res.write(str);
        }
        res.end();
        timeEnd('TIME');
    });
}).listen(PORT, (...args) => {
    log(`Running on http://${HOST}:${PORT}/`);
    log();
    log(`http://${HOST}:${PORT}/?id=JZQDUAOPSRF3LLDZOT6374IDOM`);
    log(`http://${HOST}:${PORT}/?id=TWKFZQ6FCNF3ZKPHGGZPMSSOGQ`);
    log(`http://${HOST}:${PORT}/?id=XLHPSRHOAVDLRNP2LMCCEJM62Y`);
});
