import React, { ChangeEvent, ReactElement, useEffect, useState, useContext } from "react";
import { InputAdornment, Icon } from "@material-ui/core";
import { Input } from "./Input";
import { FilterActionType, FilterContext } from "../filtering/FilterContext";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";
interface Props {
  onSearch: (searchQuery: string) => void;
  initialValue?: string;
  stacked?: boolean;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  isLandingPage?: boolean;
}

const INPUT_PROPS = {
  "aria-label": "search",
  style: {
    padding: "6px 10px",
  },
};

export const Searchbar = (props: Props): ReactElement<Props> => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { dispatch } = useContext(FilterContext);

  useEffect(() => {
    if (props.initialValue) {
      setSearchQuery(props.initialValue as string);
    }
  }, [props.initialValue]);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      props.onSearch(searchQuery);
    }
  };

  const handleClearAll = (): void => {
    dispatch({ type: FilterActionType.REMOVE_ALL });
    // remove all params from URL except for "q"

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("p");
    urlParams.delete("inPerson");
    urlParams.delete("maxCost");
    urlParams.delete("miles");
    urlParams.delete("online");
    urlParams.delete("zip");
    urlParams.delete("cipCode");
    urlParams.delete("county");
    urlParams.delete("inDemand");
    urlParams.delete("socCode");
    urlParams.delete("days");
    urlParams.delete("weeks");
    urlParams.delete("months");
    urlParams.delete("years");
    urlParams.delete("isWheelchairAccessible");
    urlParams.delete("hasChildcareAssistance");
    urlParams.delete("hasEveningCourses");
    urlParams.delete("hasJobPlacementAssistance");
    urlParams.delete("arabic");
    urlParams.delete("chinese");
    urlParams.delete("french");
    urlParams.delete("frenchCreole");
    urlParams.delete("german");
    urlParams.delete("greek");
    urlParams.delete("hebrew");
    urlParams.delete("hindi");
    urlParams.delete("hungarian");
    urlParams.delete("italian");
    urlParams.delete("japanese");
    urlParams.delete("korean");
    urlParams.delete("polish");
    urlParams.delete("portuguese");
    urlParams.delete("russian");
    urlParams.delete("spanish");
    urlParams.delete("tagalog");
    urlParams.delete("vietnamese");

    window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
  };

  const flexDirection = props.stacked ? "fdc" : "fdr";
  const marginDirection = props.stacked ? "mtd" : "mld";

  return (
    <div className={`${flexDirection} fac ${props.className}`}>
      <Input
        inputProps={INPUT_PROPS}
        value={searchQuery}
        onChange={handleSearchInput}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
        placeholder={
          props.placeholder
            ? props.placeholder
            : t("SearchAndFilter.searchBarDefaultPlaceholderText")
        }
      />
      <div className={`${marginDirection} button-size-full fdc fac`}>
        <Button
          variant="primary"
          className="width-full"
          onClick={(): void => props.onSearch(searchQuery)}
        >
          {props.buttonText ? props.buttonText : t("SearchAndFilter.searchButtonDefaultText")}
        </Button>
        {props.isLandingPage !== true && (
          <Button variant="outline" className="width-full mvs" onClick={handleClearAll}>
            {t("SearchAndFilter.clearAllFiltersButtonLabel")}
          </Button>
        )}
      </div>
    </div>
  );
};
