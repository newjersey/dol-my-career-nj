import { RouteComponentProps } from "@reach/router";
import { ReactElement } from "react";
import { Layout } from "../components/Layout";
import { Client } from "../domain/Client";
import { TrainingExplorerPageProps } from "../types/contentful";
import { PageBanner } from "../components/PageBanner";
import { SearchBlock } from "../components/SearchBlock";
import { HowTo } from "../components/HowTo";
import { Accordion } from "../components/Accordion";
import { Interrupter } from "../components/Interrupter";
import { CtaBanner } from "../components/CtaBanner";
import { IconNames } from "../types/icons";
import { SectionHeading } from "../components/modules/SectionHeading";
import { usePageTitle } from "../utils/usePageTitle";
import { useContentful } from "../utils/useContentful";
import { useTranslation } from "react-i18next";

interface Props extends RouteComponentProps {
  client: Client;
}

export const TrainingExplorerPage = (props: Props): ReactElement => {
  const { t } = useTranslation();
  const data: TrainingExplorerPageProps = useContentful({
    path: "/training-explorer",
  });

  const pageData = data?.trainingExplorerPage;

  const howToContent = {
    header: "How to use the Training Explorer",
    video: pageData?.demoVideoUrl,
    steps: [
      {
        heading: pageData?.stepOneHeading,
        icon: pageData?.stepOneIcon,
        description: pageData?.stepOneText,
      },
      {
        heading: pageData?.stepTwoHeading,
        icon: pageData?.stepTwoIcon,
        description: pageData?.stepTwoText,
      },
      {
        heading: pageData?.stepThreeHeading,
        icon: pageData?.stepThreeIcon,
        description: pageData?.stepThreeText,
      },
    ],
  };

  const interrupterContent = {
    header: pageData?.interrupterBannerHeading,
    links: pageData?.interrupterLinksCollection.items,
  };

  usePageTitle(`${pageData?.title} | ${process.env.REACT_APP_SITE_NAME}`);

  const seoObject = {
    title: `${pageData?.title} | ${process.env.REACT_APP_SITE_NAME}`,
    description: pageData?.pageDescription,
    image: pageData?.ogImage?.url,
    keywords: pageData?.keywords,
    url: props.location?.pathname,
  };

  return (
    <>
      {data && (
        <Layout
          client={props.client}
          seo={seoObject}
          footerComponent={
            <div className="cta-collection">
              <CtaBanner
                heading="Don’t see your question? Go to our FAQ page."
                noIndicator
                inlineButtons
                links={[
                  {
                    sys: {
                      id: "SeeallFAQs",
                    },
                    copy: "See all FAQs",
                    url: "/faq",
                    iconSuffix: "ArrowRight" as IconNames,
                  },
                ]}
                theme="blue"
              />
              <CtaBanner
                heading={pageData?.footerCtaHeading}
                inlineButtons
                noIndicator
                links={pageData?.footerCtaLinkCollection.items}
                theme="blue"
              />
            </div>
          }
        >
          <PageBanner {...pageData?.pageBanner} theme="green" />
          <section>
            <div className="container">
              <div id="how-to-steps-section">
                <div className="sectionHeading">
                  <h3 className="heading-tag">{t("TrainingPage.trainingProviderStepsHeader")}:</h3>
                </div>
                <div>
                  <ul>
                    <li>
                      <div className="list-num-container">
                        <div className="list-num">
                          1
                        </div>
                      </div>
                      <div className="list-info">
                        <h2>
                          {t("TrainingPage.trainingStepOne")}
                        </h2>
                        <div>
                          {t("TrainingPage.trainingStepOneDescription")}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="list-num-container">
                        <div className="list-num">
                          2
                        </div>
                      </div>
                      <div className="list-info">
                        <h2>
                          {t("TrainingPage.trainingStepTwo")}
                        </h2>
                        <div>
                          {t("TrainingPage.trainingStepTwoDescriptionP1")}<a href="/training-provider-resources#etpl
  ">{t("TrainingPage.trainingStepTwoDescriptionP2")}</a>{t("TrainingPage.trainingStepTwoDescriptionP3")}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="list-num-container">
                        <div className="list-num">
                          3
                        </div>
                      </div>
                      <div className="list-info">
                        <h2>
                          {t("TrainingPage.trainingStepThree")}
                        </h2>
                        <div>
                          {t("TrainingPage.trainingStepThreeDescription")}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="training-page-search-block" className="container">
              <SearchBlock drawerContent={pageData.drawerContent} />
            </div>
          </section>
          <HowTo {...howToContent} />
          <Interrupter {...interrupterContent} />
          <section className="landing-faq">
            <div className="container">
              <SectionHeading heading="Frequently Asked Questions" headingLevel={3} />

              {pageData?.faqsCollection.items.map((item, index: number) => (
                <Accordion
                  keyValue={index}
                  content={item.answer.json}
                  title={item.question}
                  key={item.sys?.id}
                />
              ))}
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};
