import knex from "knex";
import Knex, { PgConnectionConfig } from "knex";
import { Error } from "../../domain/Error";
import {
  LocalException,
  SocDefinition,
  Program,
  EducationText,
  SalaryEstimate,
  NullableOccupation,
} from "../../domain/training/Program";
import { DataClient } from "../../domain/DataClient";
import { Occupation } from "../../domain/occupations/Occupation";

const APPROVED = "Approved";

export class PostgresDataClient implements DataClient {
  kdb: Knex;

  constructor(connection: PgConnectionConfig) {
    this.kdb = knex({
      client: "pg",
      connection: connection,
    });
  }

  findProgramsByIds = async (ids: string[]): Promise<Program[]> => {
    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    const programs = await this.kdb("etpl")
      .select(
        "etpl.programid",
        "etpl.providerid",
        "etpl.standardized_name as officialname",
        "etpl.calendarlengthid",
        "etpl.standardized_description as description",
        "etpl.cipcode",
        "etpl.tuition",
        "etpl.fees",
        "etpl.booksmaterialscost",
        "etpl.suppliestoolscost",
        "etpl.othercosts",
        "etpl.totalcost",
        "etpl.website",
        "etpl.standardized_name_1 as providername",
        "etpl.street1",
        "etpl.street2",
        "etpl.city",
        "etpl.state",
        "etpl.zip",
        "etpl.county",
        "etpl.contactfirstname",
        "etpl.contactlastname",
        "etpl.contacttitle",
        "etpl.phone",
        "etpl.phoneextension",
        "indemandcips.cipcode as indemandcip",
        "onlineprograms.programid as onlineprogramid",
        "outcomes_cip.peremployed2",
        "outcomes_cip.avgquarterlywage2"
      )
      .leftOuterJoin("indemandcips", "indemandcips.cipcode", "etpl.cipcode")
      .leftOuterJoin("onlineprograms", "onlineprograms.programid", "etpl.programid")
      .leftOuterJoin("outcomes_cip", function () {
        this.on("outcomes_cip.cipcode", "etpl.cipcode").on(
          "outcomes_cip.providerid",
          "etpl.providerid"
        );
      })
      .joinRaw(
        `join unnest('{${ids.join(
          ","
        )}}'::varchar[]) WITH ORDINALITY t(programid, ord) ON etpl.programid = t.programid`
      )
      .whereIn("etpl.programid", ids)
      .andWhere("etpl.statusname", APPROVED)
      .andWhere("etpl.providerstatusname", APPROVED)
      .orderByRaw("t.ord")
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });

    if (programs.length === 0) {
      return Promise.reject(Error.NOT_FOUND);
    }

    return programs;
  };

  getLocalExceptions = (): Promise<LocalException[]> => {
    return this.kdb("localexceptioncips")
      .select("cipcode", "county")
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  findOccupationsByCip = (cip: string): Promise<Occupation[]> => {
    return this.kdb("soccipcrosswalk")
      .select("soc2018code as soc", "soc2018title as title")
      .where("cipcode", cip)
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  findSocDefinitionBySoc = (soc: string): Promise<SocDefinition> => {
    return this.kdb("socdefinitions")
      .select("soccode as soc", "soctitle as title", "socdefinition as definition")
      .where("soccode", soc)
      .first()
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  find2018OccupationsBySoc2010 = (soc2010: string): Promise<Occupation[]> => {
    return this.kdb("soc2010to2018crosswalk")
      .select("soccode2018 as soc", "soctitle2018 as title")
      .where("soccode2010", soc2010)
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  find2010OccupationsBySoc2018 = (soc2018: string): Promise<Occupation[]> => {
    return this.kdb("soc2010to2018crosswalk")
      .select("soccode2010 as soc", "soctitle2010 as title")
      .where("soccode2018", soc2018)
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  getOccupationsInDemand = async (): Promise<NullableOccupation[]> => {
    return this.kdb("indemandsocs")
      .select("soc", "socdefinitions.soctitle as title")
      .leftOuterJoin("socdefinitions", "socdefinitions.soccode", "indemandsocs.soc")
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  getEducationTextBySoc = (soc: string): Promise<EducationText> => {
    return this.kdb("blsoccupationhandbook")
      .select("occupation_summary_how_to_become_one as howtobecomeone")
      .where("occupation_soc_coverage_soc_code", soc)
      .first()
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  getSalaryEstimateBySoc = (soc: string): Promise<SalaryEstimate> => {
    return this.kdb("oesestimates")
      .select("a_median as mediansalary")
      .where("occ_code", soc)
      .where("area_title", "New Jersey")
      .first()
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  getOESOccupationBySoc = (soc: string): Promise<Occupation> => {
    return this.kdb("oeshybridcrosswalk")
      .select("oes2019estimatescode as soc", "oes2019estimatestitle as title")
      .where("soccode2018", soc)
      .first()
      .catch((e) => {
        console.log("db error: ", e);
        return Promise.reject();
      });
  };

  disconnect = async (): Promise<void> => {
    await this.kdb.destroy();
  };
}
