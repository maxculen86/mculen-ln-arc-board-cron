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

            //log(parsed);

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
    log(`http://${HOST}:${PORT}/?id=2KOBND62KNFVVBFQZOADNN6WNY`);
    log(`http://${HOST}:${PORT}/?id=74Y3EXNVPRA37LWJB3D2BZLQK4`);
    log(`http://${HOST}:${PORT}/?id=EBMQCONMLVB6ZBFFGTBLIWMYFQ`);
    log(`http://${HOST}:${PORT}/?id=5CT4YNKOB5AFNFQ7R33BOOVGAI`);
    log(`http://${HOST}:${PORT}/?id=FM2M3Y4ZXZD6VGONEPLLSQJWVA`);
    log(`http://${HOST}:${PORT}/?id=BFVO4LUXAJFJHC37GF24BTRLEM`);
    log(`http://${HOST}:${PORT}/?id=SRT6TQ2XPRCZXDMXQPAOKPT6N4`);
    log(`http://${HOST}:${PORT}/?id=ATLC5WVL4NH5HAHU2BWJXTSATY`);
    log(`http://${HOST}:${PORT}/?id=QAZ7BVHG5BCNFN7S67XCBP6PA4`);
    log(`http://${HOST}:${PORT}/?id=36G5V7RBRBH2XDBMBZHVCXZNBY`);
    log(`http://${HOST}:${PORT}/?id=JZQDUAOPSRF3LLDZOT6374IDOM`);
    log(`http://${HOST}:${PORT}/?id=TWKFZQ6FCNF3ZKPHGGZPMSSOGQ`);
    log(`http://${HOST}:${PORT}/?id=XLHPSRHOAVDLRNP2LMCCEJM62Y`);
});
