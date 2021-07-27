import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  companyOrPrivateAddress: string;
  numberOfIdentityCard: string;
  companyRegistrationNumber: string;
  telephone: string;
  fax: string;
  homePage: string;
  assignedPostalCode: string;
  isActive: boolean;
  createdOn: Date;
}
