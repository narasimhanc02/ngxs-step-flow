import {LabelKeyType} from '../label-key-type.enum';

export class LabelUtil {
    static LABEL_PREFIX = 'ng';

    static getLabelKeyWithTypeLabel(key: string): string {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.LABEL]);
    }

    static getLabelKeyWithTypeTitle(key: string): string {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.TITLE]);
    }

    static getLabelKeyWithTypePlaceholder(key: string) {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.PLACEHOLDER]);
    }

    static getLabelKeyWithTypeText(key: string) {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.TXT]);
    }

    static getLabelKeyWithTypeError(key: string) {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.ERROR]);
    }

    static getLabelKeyWithTypeButton(key: string) {
        return this.joinKeys([this.LABEL_PREFIX, key, LabelKeyType.BUTTON]);
    }

    static normalizeKey(key: string): string {
        return key.replace(/ /g, '-')
            .replace(/_/g, '-')
            .replace(/[^\.0-9a-zA-Z_-]/g, '')
            .toLowerCase();
    }

    private static joinKeys(values: string[]): string {
        return values.join('.');
    }
}
