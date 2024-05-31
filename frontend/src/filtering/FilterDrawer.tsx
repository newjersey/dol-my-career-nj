import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { FunnelSimple, MagnifyingGlass, X } from "@phosphor-icons/react";
import { Drawer, useMediaQuery } from "@material-ui/core";

import { FilterFormInput } from "./FilterFormInput";

interface Props {
  searchQuery: string;
}

export const FilterDrawer = ({
  searchQuery
}: Props): ReactElement => {
  const { t } = useTranslation();
  const mobile = useMediaQuery("(max-width:767px)");
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const methods = useForm<Props>({
    defaultValues: {
      searchQuery
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Props) => {
    console.log(data);
  };

  return (
    <>
      <div id="filter-button-container">
        <button
          onClick={toggleDrawer}
        >
          {t("SearchResultsPage.filtersButton")} <FunnelSimple />
        </button>
      </div>
      <Drawer
        anchor={mobile ? "bottom" : "left"}
        open={open}
        // onClose={toggleDrawer}
      >
        <div id="filter-drawer-container">
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
                <div id="form-fields">
                  <FilterFormInput
                    inputLabel="Search by training, provider, certifcation, SOC code, or keyword"
                    inputName="searchQuery"
                    hasIcon={true}
                    icon={<MagnifyingGlass />}
                  />
                </div>
                <div id="drawer-btn-container" className="row">
                  <button type="submit" id="submit-button">Apply Filters</button>
                  <button type="reset" id="reset-button">Clear Filters</button>
                </div>
              </FormProvider>
            </div>
          </form>
        </div>
      </Drawer>
    </>
  )
}