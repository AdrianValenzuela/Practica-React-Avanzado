import { getAdvertDetail } from './selectors';

describe('getAdvertDetail', () => {
    test('should return advert detail', () => {
        const data = [{id: '1'}, {id: '2'}];
        const result = getAdvertDetail({ adverts: { data } }, '1');

        expect(result.id).toBe('1');
    });
});