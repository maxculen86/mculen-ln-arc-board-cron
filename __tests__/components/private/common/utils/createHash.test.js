import createHash from '../../../../../components/private/common/utils/createHash';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

describe('createHash util', () => {
    test('return promise rejection when the digest function is not available', async () => {
        Object.defineProperty(globalThis, 'crypto', {
            value: {
                subtle: undefined
            },
            writable: true
        });

        await expect(createHash()).rejects.toEqual(
            new Error('crypto.subtle only works on HTTPS')
        );
    });

    test('should return hash when the data is passed', async () => {
        Object.defineProperty(globalThis, 'crypto', {
            value: {
                subtle: {
                    digest: jest.fn(() => Promise.resolve(new ArrayBuffer(32)))
                }
            },
            writable: true
        });

        expect(await createHash('MOCKED_DATA')).toEqual(
            '0000000000000000000000000000000000000000000000000000000000000000'
        );
    });
});
