import React, { ReactElement, useReducer } from "react";
import { LandingPage } from "./landing-page/LandingPage";
import { SearchResultsPage } from "./search-results/SearchResultsPage";
import { TrainingPage } from "./training-page/TrainingPage";
import { OccupationPage } from "./occupation-page/OccupationPage";
import { PrivacyPolicyPage } from "./privacy-policy-page/PrivacyPolicyPage";
import { TermsOfServicePage } from "./terms-of-service-page/TermsOfServicePage";
import { Client } from "./domain/Client";
import { Router } from "@reach/router";
import { NotFoundPage } from "./error/NotFoundPage";
import { InDemandOccupationsPage } from "./in-demand-occupations-page/InDemandOccupationsPage";
import { FundingPage } from "./funding-page/FundingPage";
import {
  initialFilterState,
  FilterReducer,
  filterReducer,
  FilterContext,
} from "./filtering/FilterContext";
import { SortReducer, sortReducer, initialSortState, SortContext } from "./sorting/SortContext";
import {
  initialComparisonState,
  ComparisonReducer,
  comparisonReducer,
  ComparisonContext,
} from "./comparison/ComparisonContext";
import { LandingPageCounselor } from "./landing-page/LandingPageCounselor";
import { LandingPageExplorer } from "./landing-page/LandingPageExplorer";
import { LandingPageTrainingProvider } from "./landing-page/LandingPageTrainingProvider";
import { EtplPage } from "./etpl-page/EtplPage";
import { FaqRoutes } from "./faqs/FaqRoutes";

interface Props {
  client: Client;
}

export const App = (props: Props): ReactElement => {
  const [sortState, sortDispatch] = useReducer<SortReducer>(sortReducer, initialSortState);
  const [filterState, filterDispatch] = useReducer<FilterReducer>(
    filterReducer,
    initialFilterState
  );
  const [comparisonState, comparisonDispatch] = useReducer<ComparisonReducer>(
    comparisonReducer,
    initialComparisonState
  );

  return (
    <ComparisonContext.Provider value={{ state: comparisonState, dispatch: comparisonDispatch }}>
      <SortContext.Provider value={{ state: sortState, dispatch: sortDispatch }}>
        <FilterContext.Provider value={{ state: filterState, dispatch: filterDispatch }}>
          <Router>
            <LandingPage path="/" />
            <LandingPageCounselor path="/counselor" />
            <LandingPageExplorer path="/explorer" />
            <LandingPageTrainingProvider path="/training-provider" />
            {FaqRoutes()}
            <SearchResultsPage path="/search" client={props.client} />
            <SearchResultsPage path="/search/:searchQuery" client={props.client} />
            <TrainingPage path="/training/:id" client={props.client} />
            <InDemandOccupationsPage path="/in-demand-occupations" client={props.client} />
            <OccupationPage path="/occupation/:soc" client={props.client} />
            <FundingPage path="/funding" />
            <PrivacyPolicyPage path="/privacy-policy" />
            <TermsOfServicePage path="/terms-of-service" />
            <EtplPage path="/etpl" client={props.client} />
            <NotFoundPage default />
          </Router>
        </FilterContext.Provider>
      </SortContext.Provider>
    </ComparisonContext.Provider>
  );
};
