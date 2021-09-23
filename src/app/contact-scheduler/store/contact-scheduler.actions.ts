import {ContactSchedulerFormModel} from '../models/contact-scheduler-form.model';

// tslint:disable-next-line:no-namespace
export namespace ContactSchedulerActions {
    export class ShowLoader {
        public static readonly type = '[CONTACT SCHEDULER] Show Loader';
        constructor() {}
    }

    export class HideLoader {
        public static readonly type = '[CONTACT SCHEDULER] Hide Loader';
        constructor() {}
    }

    export class SubmitFormData {
        static readonly type = '[CONTACT SCHEDULER] Submit Form Data';
        constructor(public formData: ContactSchedulerFormModel) { }
    }

    export class ClearFormData {
        static readonly type = '[CONTACT SCHEDULER] Clear Form Data';
        constructor(public payload: ContactSchedulerFormModel) { }
    }

}

