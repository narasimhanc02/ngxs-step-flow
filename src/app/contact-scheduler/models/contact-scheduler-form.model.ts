export class ContactSchedulerFormModel {
  firstName: string;
  lastName: string;
  emailId: string;
  responseStatus?: string;
  isError?: boolean;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getSuccessMessage(): string {
    return `${this.getFullName()} registered  successfully`;
  }

  getFailureMessage(): string {
    return `Please try again`;
  }

  isSuccess?(): boolean {
    return this.responseStatus === 'success';
  }

  isFailed?(): boolean {
    return this.responseStatus === 'failed' || this.isError === true;
  }
}
