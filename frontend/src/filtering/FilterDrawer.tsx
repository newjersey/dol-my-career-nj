import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { Drawer } from "@material-ui/core";

import { FunnelSimple, MagnifyingGlass, X } from "@phosphor-icons/react";

import { FilterFormInput } from "./FilterFormInput";
import { FilterFormDropDown } from "./FilterFormDropDown";
import { FilterFormSwitch } from "./FilterFormSwitch";

interface Props {
  searchQuery?: string;
  inDemand?: boolean;
  maxCost?: number;
  miles?: string;
  zip?: string;
}

const MILES_VALUES = [5, 10, 25, 50];

export const FilterDrawer = ({
  searchQuery = "",
  maxCost,
  inDemand = false,
  miles = "10",
  zip = "",
}: Props): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  }

  const methods = useForm<Props>({
    defaultValues: {
      searchQuery,
      inDemand,
      maxCost,
      miles,
      zip,
    }
  });
  
  const { handleSubmit, getValues } = methods;

  const onSubmit = () => {
    const getValuesData = getValues();
    console.log(getValuesData)
  }

  return (
    <>
      <div className="filter-button-container">
        <button
          onClick={toggleDrawer}
        >
          {t("SearchResultsPage.filtersButton")} <FunnelSimple />
        </button>
      </div>
      <Drawer
        anchor="left"
        open={isOpen}
      >
        <div id="drawer-content-container">
          <div className="drawer-header">
            <h2>Add Filters</h2>
            <button
              className="close-button"
              onClick={toggleDrawer}
            >
              <X />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="form-container">
              <FormProvider {...methods}>
                <FilterFormInput
                  inputLabel="Search by training, provider, certifcation, SOC code, or keyword"
                  inputName="searchQuery"
                  hasIcon={true}
                  icon={<MagnifyingGlass />}
                />
                <FilterFormSwitch
                  inputLabel="Show In-Demand trainings only"
                  inputName="inDemand"
                  inputChecked={inDemand}
                />
                <FilterFormInput
                  inputLabel="Max Cost"
                  inputName="maxCost"
                  inputType="number"
                />
                <div className="field-group">
                  <div className="label-container">
                    <label>
                      Distance from ZIP code
                    </label>
                  </div>
                  <div className="zip-miles-group">
                    <FilterFormDropDown
                      dropdownName="miles"
                      options_values={MILES_VALUES}
                    />
                    <div className="conjunction-container">
                      from
                    </div>
                    <FilterFormInput
                      inputName="zip"
                    />
                  </div>
                </div>
                <button type="submit">Apply Filters</button>
              </FormProvider>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  )
};