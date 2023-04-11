import { ReactElement } from "react";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import { LandingCard } from "./LandingCard";
import IconList from "./landing-icons/list.svg";
import IconOccupation from "./landing-icons/occupations.svg";
import { useMediaQuery } from "@material-ui/core";
import { ContactUsSection } from "../components/ContactUsSection";
import { Button } from "../components/Button";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import { Client } from "../domain/Client";

interface Props extends RouteComponentProps {
  client: Client;
}

export const LandingPageCounselor = (props: Props): ReactElement => {
  const isTablet = useMediaQuery("(min-width:768px)");
  const { t } = useTranslation();

  return (
    <Layout client={props.client}>
      <div className="container">
        <div className="landing-container mla mra">
          <h2 className="mtm mbd text-xl weight-500 align-center">{t("CounselorPage.header")}</h2>

          <div className="embed-youtube">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FarEy_eoNFE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h3 className="mbd text-l weight-500 align-center">
            {t("CounselorPage.sectionOneHeader")}
          </h3>
          <p className="mbl align-center">{t("CounselorPage.sectionOneText")}</p>

          <h3 className="mtl mbd text-l weight-500 align-center">
            {t("CounselorPage.sectionTwoHeader")}
          </h3>
          <p className="mbl align-center">{t("CounselorPage.sectionTwoText")}</p>

          <h3 className="mtl mbd text-l weight-500 align-center">
            {t("CounselorPage.sectionThreeHeader")}
          </h3>
          <div className="landing-card-container mla mra">
            <LandingCard hideBorderMobile className={`mbl ${isTablet ? "flex" : "align-center"}`}>
              <>
                <div className="landing-image mrs">
                  <img alt={t("IconAlt.etplList")} src={IconList} />
                </div>
                <div>
                  <p className={`mtz mbs ${!isTablet && "phl"}`}>
                    {t("CounselorPage.searchDescription")}
                  </p>
                  <Button variant="secondary" onClick={() => navigate("/search")}>
                    {t("CounselorPage.searchButton")}
                  </Button>
                </div>
              </>
            </LandingCard>
            <LandingCard hideBorderMobile className={`mbl ${isTablet ? "flex" : "align-center"}`}>
              <>
                <div className="landing-image mrd">
                  <img alt={t("IconAlt.landingPageOccupation")} src={IconOccupation} />
                </div>
                <div>
                  <p className={`mtz mbs ${!isTablet && "phl"}`}>
                    {t("CounselorPage.occupationDescription")}
                  </p>
                  <Button variant="secondary" onClick={() => navigate("/in-demand-occupations")}>
                    {t("CounselorPage.occupationButton")}
                  </Button>
                </div>
              </>
            </LandingCard>
          </div>

          <h3 className="mtl mbd text-l weight-500 align-center">
            {t("CounselorPage.sectionFourHeader")}
          </h3>
          <div className={`${isTablet && "landing-grid"} mam mbl align-center`}>
            <Link className="link-format-blue" to="/faq/data-sources">
              <LandingCard className={`height-100 weight-500 text-m ${!isTablet && "mbm"}`}>
                {t("CounselorPage.dataFaq")}
              </LandingCard>
            </Link>
            <Link className="link-format-blue" to="/faq/labor-demand-occupations">
              <LandingCard className={`height-100 weight-500 text-m ${!isTablet && "mbm"}`}>
                {t("CounselorPage.occupationsFaq")}
              </LandingCard>
            </Link>
            <Link className="link-format-blue" to="/faq/funding-opportunities">
              <LandingCard className={`height-100 weight-500 text-m ${!isTablet && "mbm"}`}>
                {t("CounselorPage.fundingFaq")}
              </LandingCard>
            </Link>
          </div>

          <ContactUsSection />
        </div>
      </div>
    </Layout>
  );
};
