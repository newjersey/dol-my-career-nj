import React, { ReactElement } from "react";
import { Icon } from "@material-ui/core";
// import { Link } from "@reach/router";

export const Footer = (): ReactElement => {
  return (
    <footer className="footer bg-light-purple pvd width-100 flex fac">
      <div className="container">
        <p className="flex fac maz">
          Made with&nbsp;
          <Icon className="red">favorite</Icon>
          &nbsp;by the Office of Innovation
        </p>
        {/*
          <Link className="no-link-format prd" to="/about">
            About
          </Link>
          <Link className="no-link-format phd" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="no-link-format phd" to="/tos">
            Terms of Service
          </Link>
        */}
      </div>
    </footer>
  );
};
