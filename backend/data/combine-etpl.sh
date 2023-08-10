#!/usr/bin/env bash

DBNAME='etplcombination'
PROGRAMS_TABLE='programs'
PROVIDERS_TABLE='providers'
OUTPUT_FILENAME='combined_etpl_raw.csv'

# $1 first arg programs csv
# $2 second arg providers csv

# cleanup
psql -c "drop database $DBNAME;" -U postgres -h localhost -p 5432
rm `pwd`/$OUTPUT_FILENAME

# create new database just for this operation
psql -c "create database $DBNAME;" -U postgres -h localhost -p 5432

# create tables
psql $DBNAME -c "CREATE TABLE $PROGRAMS_TABLE (
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
  DEGREEAWARDEDNAME text,
  LEADTOLICENSE boolean,
  LICENSEAWARDED character varying(8),
  LICENSEAWARDEDNAME text,
  LEADTOINDUSTRYCREDENTIAL boolean,
  INDUSTRYCREDENTIAL character varying(8),
  INDUSTRYCREDENTIALNAME text,
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
  PROGRAMID character varying(8) not null primary key,
  STATUSNAME character varying(16),
  CREDENTIALTYPE text
);" -U postgres -h localhost -p 5432

psql $DBNAME -c "CREATE TABLE providers (
    PROVIDERID character varying(16) NOT NULL PRIMARY KEY,
    NAME character varying(256),
    SCHOOLIDENTIFICATIONNUMBER character varying(64),
    STREET1 character varying(128),
    STREET2 character varying(128),
    CITY character varying(64),
    STATE character varying(8),
    ZIP character varying(16),
    COUNTY character varying(32),
    MSTREET1 character varying(128),
    MSTREET2 character varying(128),
    MCITY character varying(64),
    MSTATE character varying(8),
    MZIP character varying(16),
    CONTACTFIRSTNAME character varying(128),
    CONTACTLASTNAME character varying(128),
    CONTACTTITLE character varying(128),
    PHONE character varying(16),
    PHONEEXTENSION character varying(8),
    FAX character varying(16),
    WEBSITE character varying(256),
    EMAIL character varying(256),
    LICENSINGAGENCYID character varying(16),
    TYPEID character varying(16),
    NONGOVAPPROVAL character varying(128),
    CERTAPPROVALEXP timestamp,
    CUSTOMIZED character varying(8),
    DISTANCELEARNING character varying(8),
    SPEAKSPANISH character varying(8),
    OTHERLANGUAGES character varying(8),
    LANGUAGES character varying(256),
    CAREERASSIST character varying(8),
    ONESTOPCAREER character varying(8),
    PERSONALASSIST character varying(8),
    ACCESSAJBATB character varying(8),
    CHILDCARE character varying(8),
    ASSISTOBTAININGCHILDCARE character varying(8),
    EVENINGCOURSES character varying(8),
    ACCESSFORDISABLED character varying(8),
    BUSROUTE1 character varying(256),
    BUSROUTE2 character varying(256),
    TRNROUTE1 character varying(256),
    TRNROUTE2 character varying(256),
    WIBCOMMENT text,
    STATECOMMENT text,
    DTSUBMITTED timestamp,
    STATUSNAME character varying(64)
  );" -U postgres -h localhost -p 5432

# copy data in
psql $DBNAME -c "\COPY $PROGRAMS_TABLE FROM '`pwd`/$1' DELIMITER ',' CSV HEADER;" -U postgres -h localhost -p 5432
psql $DBNAME -c "\COPY $PROVIDERS_TABLE FROM '`pwd`/$2' DELIMITER ',' CSV HEADER;" -U postgres -h localhost -p 5432

# export joined table as csv
psql $DBNAME -c "\copy (select programs.PROVIDERID,
    programs.OFFICIALNAME,
    programs.CIPCODE,
    programs.APPROVINGAGENCYID,
    programs.OTHERAGENCY,
    programs.SUBMITTEDTOWIB,
    programs.TUITION,
    programs.FEES,
    programs.BOOKSMATERIALSCOST,
    programs.SUPPLIESTOOLSCOST,
    programs.OTHERCOSTS,
    programs.TOTALCOST,
    programs.PREREQUISITES,
    programs.WIAELIGIBLE,
    programs.LEADTODEGREE,
    programs.DEGREEAWARDED,
    programs.DEGREEAWARDEDNAME,
    programs.LEADTOLICENSE,
    programs.LICENSEAWARDED,
    programs.LICENSEAWARDEDNAME,
    programs.LEADTOINDUSTRYCREDENTIAL,
    programs.INDUSTRYCREDENTIAL,
    programs.INDUSTRYCREDENTIALNAME,
    programs.FINANCIALAID,
    programs.DESCRIPTION,
    programs.CREDIT,
    programs.TOTALCLOCKHOURS,
    programs.CALENDARLENGTHID,
    programs.FEATURESDESCRIPTION,
    programs.WIBCOMMENT,
    programs.STATECOMMENT,
    programs.SUBMITTED,
    programs.APPROVED,
    programs.CONTACTNAME,
    programs.CONTACTPHONE,
    programs.PHONEEXTENSION as contactphoneextension,
    programs.PROGRAMID,
    programs.STATUSNAME,
    programs.CREDENTIALTYPE,
    providers.NAME,
    providers.SCHOOLIDENTIFICATIONNUMBER,
    providers.STREET1,
    providers.STREET2,
    providers.CITY,
    providers.STATE,
    providers.ZIP,
    providers.COUNTY,
    providers.MSTREET1,
    providers.MSTREET2,
    providers.MCITY,
    providers.MSTATE,
    providers.MZIP,
    providers.CONTACTFIRSTNAME,
    providers.CONTACTLASTNAME,
    providers.CONTACTTITLE,
    providers.PHONE,
    providers.PHONEEXTENSION,
    providers.FAX,
    providers.WEBSITE,
    providers.EMAIL,
    providers.LICENSINGAGENCYID,
    providers.TYPEID,
    providers.NONGOVAPPROVAL,
    providers.CERTAPPROVALEXP,
    providers.CUSTOMIZED,
    providers.DISTANCELEARNING,
    providers.SPEAKSPANISH,
    providers.OTHERLANGUAGES,
    providers.LANGUAGES,
    providers.CAREERASSIST,
    providers.ONESTOPCAREER,
    providers.PERSONALASSIST,
    providers.ACCESSAJBATB,
    providers.CHILDCARE,
    providers.ASSISTOBTAININGCHILDCARE,
    providers.EVENINGCOURSES,
    providers.ACCESSFORDISABLED,
    providers.BUSROUTE1,
    providers.BUSROUTE2,
    providers.TRNROUTE1,
    providers.TRNROUTE2,
    providers.WIBCOMMENT as providerwibcomment,
    providers.STATECOMMENT as providerstatecomment,
    providers.DTSUBMITTED,
    providers.STATUSNAME as providerstatusname
     from $PROGRAMS_TABLE left outer join $PROVIDERS_TABLE on $PROGRAMS_TABLE.providerid = $PROVIDERS_TABLE.providerid) to $OUTPUT_FILENAME csv header;" -U postgres -h localhost -p 5432

# cleanup
psql -c "drop database $DBNAME;" -U postgres -h localhost -p 5432