import { Frame } from 'playwright';

declare global {
    declare namespace e2e {
        function goto(p: {
            path: string;
            sandboxPath?: string;
            params?: {
                timeout?: number;
                waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
                referer?: string;
            };
            website?: 'la-nacion-ar' | 'ott';
        }): Frame;
    }
}
