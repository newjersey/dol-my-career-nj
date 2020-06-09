CREATE TABLE IF NOT EXISTS programs
(
  PROVIDERID character varying(16),
  OFFICIALNAME character varying(256),
  CIPCODE character varying(16),
  APPROVINGAGENCYID character varying(8),
  OTHERAGENCY character varying(256),
  SUBMITTEDTOWIB character varying(64),
  TUITION decimal,
  FEES decimal,
  BOOKSMATERIALSCOST decimal,
  SUPPLIESTOOLSCOST decimal,
  OTHERCOSTS decimal,
  TOTALCOST decimal,
  PREREQUISITES text,
  WIAELIGIBLE character varying(8),
  LEADTODEGREE boolean,
  DEGREEAWARDED character varying(8),
  LEADTOLICENSE boolean,
  LICENSEAWARDED character varying(8),
  LEADTOINDUSTRYCREDENTIAL boolean,
  INDUSTRYCREDENTIAL character varying(8),
  FINANCIALAID character varying(8),
  DESCRIPTION text,
  CREDIT text,
  TOTALCLOCKHOURS decimal,
  CALENDARLENGTHID character varying(8),
  FEATURESDESCRIPTION text,
  WIBCOMMENT text,
  STATECOMMENT text,
  SUBMITTED timestamp,
  APPROVED character varying(8),
  CONTACTNAME character varying(256),
  CONTACTPHONE character varying(16),
  PHONEEXTENSION character varying(8),
  PROGRAMID character varying(8),
  STATUSNAME character varying(16),
  id serial NOT NULL PRIMARY KEY
);
