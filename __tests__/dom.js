import jsdom from 'jsdom';
import { DomController } from '../src/DomController';
import { expect } from '@jest/globals';

const {JSDOM} = jsdom;
const dom = new JSDOM('<html lang="en"><body id="root"></body></html>');

global.window = dom.window;
global.document = dom.window.document;

const createInstance = () => new DomController('#root');

afterEach(() => {
    document.body.innerHTML = '';
});

describe('DOM controller', () => {
    test('Creates empty table', () => {
        const domController = createInstance();

        domController.createTable();
        expect(document.querySelectorAll('table').length).toBe(1);
    });

    test('Creates table with 3 rows and 3 columns', () => {
        const domController = createInstance();

        domController.createTable(3, 3);

        expect(document.querySelectorAll('table').length).toBe(1);
        expect(document.querySelectorAll('tr').length).toBe(3);
        expect(document.querySelectorAll('td').length).toBe(9);
    });
});