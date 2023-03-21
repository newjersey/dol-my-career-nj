import { CalendarLength } from "../CalendarLength";
import { Occupation } from "../occupations/Occupation";

export interface Training {
  id: string;
  name: string;
  cipCode: string;
  provider: Provider;
  description: string;
  certifications: string;
  prerequisites: string;
  calendarLength: CalendarLength;
  occupations: Occupation[];
  inDemand: boolean;
  localExceptionCounty: string[];
  tuitionCost: number;
  feesCost: number;
  booksMaterialsCost: number;
  suppliesToolsCost: number;
  otherCost: number;
  totalCost: number;
  online: boolean;
  percentEmployed: number | null;
  averageSalary: number | null;
  hasEveningCourses: boolean;
  languages: string[];
  isWheelchairAccessible: boolean;
  hasJobPlacementAssistance: boolean;
  hasChildcareAssistance: boolean;
}

export interface Provider {
  id: string;
  url: string;
  email: string;
  addresses: Address[];
  name: string;
  contactName: string;
  contactTitle: string;
  phoneNumber: string;
  phoneExtension: string;
  county: string;
}

export interface Address {
  name: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  targetContactPoints: ContactPoint[];
}

export interface ContactPoint {
  alternateName: string;
  contactType: string;
  faxNumber: string;
  name: string;
  socialMedia: string;
  telephone: string;
}
