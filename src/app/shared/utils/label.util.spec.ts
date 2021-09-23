import { LabelUtil } from './label.util';

describe('LabelUtil', () => {

    describe('getLabelKeyWithTypeLabel', () => {
        it('should return <label>.lbl', () => {
            const actual = LabelUtil.getLabelKeyWithTypeLabel('abc');
            expect(actual).toBe('ng.abc.lbl');
        });
    });

    describe('getLabelKeyWithTypeTitle', () => {
        it('should return <label>.title', () => {
            const actual = LabelUtil.getLabelKeyWithTypeTitle('abc');
            expect(actual).toBe('ng.abc.title');
        });
    });

    describe('getLabelKeyWithTypePlaceholder', () => {
        it('should return <label>.phd', () => {
            const actual = LabelUtil.getLabelKeyWithTypePlaceholder('abc');
            expect(actual).toBe('ng.abc.phd');
        });
    });

    describe('getLabelKeyWithTypeText', () => {
        it('should return <label>.text', () => {
            const actual = LabelUtil.getLabelKeyWithTypeText('abc');
            expect(actual).toBe('ng.abc.text');
        });
    });

    describe('getLabelKeyWithTypeError', () => {
        it('should return <label>.error', () => {
            const actual = LabelUtil.getLabelKeyWithTypeError('abc');
            expect(actual).toBe('ng.abc.error');
        });
    });

    describe('getLabelKeyWithTypeButton', () => {
        it('should return <label>.error', () => {
            const actual = LabelUtil.getLabelKeyWithTypeButton('abc');
            expect(actual).toBe('ng.abc.btn');
        });
    });
});
