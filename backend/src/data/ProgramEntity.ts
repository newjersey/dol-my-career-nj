export interface ProgramEntity {
  providerid: string;
  officialname: string;
  cipcode: string;
  approvingagencyid: string;
  otheragency: string;
  submittedtowib: string;
  tuition: number;
  fees: number;
  booksmaterialscost: number;
  suppliestoolscost: number;
  othercosts: number;
  totalcost: string;
  prerequisites: string;
  wiaeligible: string;
  leadtodegree: boolean;
  degreeawarded: string;
  leadtolicense: boolean;
  licenseawarded: string;
  leadtoindustrycredential: boolean;
  industrycredential: string;
  financialaid: string;
  description: string;
  credit: string;
  totalclockhours: number;
  calendarlengthid: string;
  featuresdescription: string;
  wibcomment: string;
  statecomment: string;
  submitted: string;
  approved: string;
  contactname: string;
  contactphone: string;
  phoneextension: string;
  programid: string;
  statusname: string;
  id: string;
}

export interface ProgramOutcomeEntity {
  id: string;
  officialname: string;
  totalcost: string;
  peremployed2: string;
}
