import React, { ReactElement } from "react";
import njLogo from "../njlogo.svg";

export const Header = (): ReactElement => {
  return (
    <header className="header plxl fdr fac">
      <img className="nj-logo-header mrd" src={njLogo} alt="New Jersey innovation logo" />
      <h2 className="mrl">Training Explorer</h2>
    </header>
  );
};
