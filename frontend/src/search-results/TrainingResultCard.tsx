import React, { ReactElement } from "react";
import { TrainingResult } from "../domain/Training";
import { formatMoney } from "accounting";

interface Props {
  trainingResult: TrainingResult;
}

const CalendarLengthLookup = {
  0: "--",
  1: "Less than 1 day to complete",
  2: "1-2 days to complete",
  3: "3-7 days to complete",
  4: "2-3 weeks to complete",
  5: "4-11 weeks to complete",
  6: "3-5 months to complete",
  7: "6-12 months to complete",
  8: "13 months to 2 years to complete",
  9: "3-4 years to complete",
  10: "More than 4 years to complete",
};

export const TrainingResultCard = (props: Props): ReactElement => {
  const formatPercentEmployed = (percentEmployed: number | null): string => {
    if (percentEmployed === null) {
      return "--";
    }

    return (Math.trunc(percentEmployed * 1000) / 10).toFixed(1) + "% employed";
  };

  return (
    <a href={`/training/${props.trainingResult.id}`} className="no-link-format">
      <div className="card mbs container-fluid pam hover-shadow">
        <div className="row">
          <div className="col-xs-8">
            <h2 className="blue text-m weight-500">{props.trainingResult.name}</h2>
          </div>
          <div className="col-xs-4 align-right">
            <h3 className="text-m weight-500">{formatMoney(props.trainingResult.totalCost)}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-push-8 align-right-when-lg">
            <p className="mb-when-lg">
              <i className="material-icons mrxs hide-when-lg">card_travel</i>
              {formatPercentEmployed(props.trainingResult.percentEmployed)}
            </p>
          </div>
          <div className="col-md-8 col-md-pull-4">
            <p className="mt-when-lg mbz">
              <i className="material-icons mrxs">school</i>
              {props.trainingResult.provider.name}
            </p>
            <p className="mtxs mbz">
              <i className="material-icons mrxs">location_on</i>
              {props.trainingResult.provider.city}
            </p>
            <p className="mtxs mbz">
              <i className="material-icons mrxs">av_timer</i>
              {CalendarLengthLookup[props.trainingResult.calendarLength]}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};
