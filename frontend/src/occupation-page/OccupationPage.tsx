import React, { ReactElement, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { Client } from "../domain/Client";
import { Occupation, OccupationDetail } from "../domain/Occupation";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BetaBanner } from "../components/BetaBanner";
import { Grouping } from "../components/Grouping";
import { InlineIcon } from "../components/InlineIcon";
import { InDemandTag } from "../components/InDemandTag";
import { Error } from "../domain/Error";
import { SomethingWentWrongPage } from "../error/SomethingWentWrongPage";
import { NotFoundPage } from "../error/NotFoundPage";
import { StatBlock } from "../components/StatBlock";
import { formatMoney } from "accounting";
import careeronestop from "../careeronestop.png";
import { TrainingResultCard } from "../search-results/TrainingResultCard";
import { TrainingResult } from "../domain/Training";
import { CircularProgress } from "@material-ui/core";
import { STAT_MISSING_DATA_INDICATOR } from "../constants";
import { useTranslation } from "react-i18next";

interface Props extends RouteComponentProps {
  soc?: string;
  client: Client;
}

const OPEN_JOBS_URL =
  "https://www.careeronestop.org/Toolkit/Jobs/find-jobs-results.aspx?keyword={SOC_CODE}&location=New%20Jersey&radius=0&source=NLX&currentpage=1";

export const OccupationPage = (props: Props): ReactElement => {
  const { t } = useTranslation();

  const [occupationDetail, setOccupationDetail] = useState<OccupationDetail | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (occupationDetail) {
      document.title = `${occupationDetail.title}`;
      setIsLoading(false);
    }
  }, [occupationDetail, isLoading]);

  useEffect(() => {
    const socCode = props.soc ? props.soc : "";

    props.client.getOccupationDetailBySoc(socCode, {
      onSuccess: (result: OccupationDetail) => {
        setError(null);
        setOccupationDetail(result);
      },
      onError: (error: Error) => setError(error),
    });
  }, [props.soc, props.client]);

  const seeMore = (tasks: string[]): ReactElement => {
    if (tasks.length > 5 && !isOpen) {
      return (
        <button className="weight-500 blue fin" onClick={(): void => setIsOpen(true)}>
          {t("OccupationPageStrings.seeMore")}
          <InlineIcon>keyboard_arrow_down</InlineIcon>
        </button>
      );
    } else if (tasks.length > 5 && isOpen) {
      return (
        <button className="weight-500 blue fin" onClick={(): void => setIsOpen(false)}>
          {t("OccupationPageStrings.seeLess")}
          <InlineIcon>keyboard_arrow_up</InlineIcon>
        </button>
      );
    } else {
      return <></>;
    }
  };

  const getTasksList = (tasks: string[]): ReactElement => {
    let tasksToShow = tasks;
    if (tasks.length > 5 && !isOpen) {
      tasksToShow = tasks.slice(0, 5);
    }

    if (tasks.length === 0) {
      return <p>{t("OccupationPageStrings.dataUnavailableText")}</p>;
    } else {
      return (
        <ul>
          {tasksToShow.map((task, key) => (
            <li key={key}>{task}</li>
          ))}
        </ul>
      );
    }
  };

  const getRelatedOccupations = (occupations: Occupation[]): ReactElement => {
    if (occupations.length === 0) {
      return <p>{t("OccupationPageStrings.dataUnavailableText")}</p>;
    } else {
      return (
        <>
          {occupations.map((occupation) => (
            <Link
              className="link-format-blue"
              to={`/occupation/${occupation.soc}`}
              key={occupation.soc}
            >
              <p key={occupation.soc} className="blue weight-500 mvs">
                {occupation.title}
              </p>
            </Link>
          ))}
        </>
      );
    }
  };

  const getRelatedTrainings = (trainings: TrainingResult[], occupation: string): ReactElement => {
    if (trainings.length === 0) {
      return <p>{t("OccupationPageStrings.dataUnavailableText")}</p>;
    } else {
      const trainingsToShow = trainings.slice(0, 3);
      const seeMore = trainings.length > 3;
      const resultsUrl = `/search/${occupation}`;

      return (
        <>
          {seeMore && (
            <Link className="link-format-blue weight-500 blue fin mhd" to={resultsUrl}>
              {t("OccupationPageStrings.relatedTrainingSeeMore")}
            </Link>
          )}

          {trainingsToShow.map((training) => (
            <TrainingResultCard key={training.id} trainingResult={training} />
          ))}
        </>
      );
    }
  };

  if (occupationDetail) {
    return (
      <>
        <Header />
        <BetaBanner />
        <main className="container below-banners" role="main">
          <div className="ptm weight-500 fin all-caps border-bottom-dark">
            {t("OccupationPageStrings.header")}
          </div>
          <h2 data-testid="title" className="text-xl ptd pbs weight-500">
            {occupationDetail.title}
          </h2>
          {occupationDetail.inDemand ? <InDemandTag /> : <></>}

          <div className="stat-block-stack mtm">
            <StatBlock
              title={t("OccupationPageStrings.jobsOpenTitle")}
              tooltipText={t("OccupationPageStrings.jobsOpenTooltip")}
              dataSource={t("OccupationPageStrings.jobsOpenSource")}
              data={
                occupationDetail.openJobsCount
                  ? occupationDetail.openJobsCount.toLocaleString()
                  : STAT_MISSING_DATA_INDICATOR
              }
              backgroundColorClass="bg-lightest-purple"
            />
            <StatBlock
              title={t("OccupationPageStrings.salaryTitle")}
              tooltipText={t("OccupationPageStrings.salaryTooltip")}
              data={
                occupationDetail.medianSalary
                  ? formatMoney(occupationDetail.medianSalary, { precision: 0 })
                  : STAT_MISSING_DATA_INDICATOR
              }
              backgroundColorClass="bg-lighter-purple"
            />
          </div>

          {occupationDetail.openJobsCount && (
            <div>
              <a
                data-testid="jobOpenings"
                className="link-format-blue weight-500 blue fin mtm"
                target="_blank"
                rel="noopener noreferrer"
                href={OPEN_JOBS_URL.replace(
                  "{SOC_CODE}",
                  (occupationDetail.openJobsSoc || "").toString()
                )}
              >
                {t("OccupationPageStrings.searchOpenJobsText")}
              </a>
            </div>
          )}

          <div className="row">
            <div className="col-md-8">
              <div className="container-fluid">
                <div className="row">
                  <Grouping
                    title={t("OccupationPageStrings.descriptionGroupHeader")}
                    backgroundColorClass="bg-purple"
                  >
                    <p>{occupationDetail.description}</p>
                  </Grouping>

                  <Grouping
                    title={t("OccupationPageStrings.dayInTheLifeGroupHeader")}
                    backgroundColorClass="bg-purple"
                  >
                    <>
                      {getTasksList(occupationDetail.tasks)}
                      {seeMore(occupationDetail.tasks)}
                    </>
                  </Grouping>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="container-fluid">
                <div className="row">
                  <Grouping title="Education" backgroundColorClass="bg-purple">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: occupationDetail.education
                          ? occupationDetail.education
                          : t("OccupationPageStrings.dataUnavailableText"),
                      }}
                    />
                  </Grouping>

                  <Grouping
                    title={t("OccupationPageStrings.relatedOccupationsGroupHeader")}
                    backgroundColorClass="bg-purple"
                  >
                    {getRelatedOccupations(occupationDetail.relatedOccupations)}
                  </Grouping>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-9">
              <div className="container-fluid">
                <div className="row">
                  <h2 className="text-xl ptd pbs weight-500 fin">
                    {t("OccupationPageStrings.relatedTrainingGroupHeader")}
                  </h2>
                  {getRelatedTrainings(occupationDetail.relatedTrainings, occupationDetail.title)}
                </div>
              </div>
            </div>
          </div>

          <div className="container-full ptxl">
            <p className="accessible-gray">
              <span className="bold">{t("OccupationPageStrings.sourceLabel")}</span>
              &nbsp;{t("OccupationPageStrings.onetSource")}
            </p>
            <p className="accessible-gray">
              <span className="bold">{t("OccupationPageStrings.sourceLabel")}</span>
              &nbsp;{t("OccupationPageStrings.blsSource")}
            </p>
            <p>
              <img src={careeronestop} alt="Source: CareerOneStop" />
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  } else if (error === Error.SYSTEM_ERROR) {
    return <SomethingWentWrongPage />;
  } else if (error === Error.NOT_FOUND) {
    return <NotFoundPage />;
  } else if (isLoading) {
    return (
      <>
        <Header />
        <BetaBanner />
        <div className="fdc page">
          <main className="container page fdr fjc fac ptl" role="main">
            <CircularProgress color="secondary" />
          </main>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
