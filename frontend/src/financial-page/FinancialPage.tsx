import { RouteComponentProps } from "@reach/router";
import { ReactElement, useState } from "react";
import { Layout } from "../components/Layout";
import { Client } from "../domain/Client";
import { FinancialResourcePageData } from "../types/contentful";
import { PageBanner } from "../components/PageBanner";
import { FinancialResourceFilter } from "../components/FinancialResourceFilter";
import { FinancialResource } from "../components/FinancialResource";
import { ContentfulRichText } from "../components/ContentfulRichText";
import { useContentfulClient } from "../utils/useContentfulClient";
import { TUITION_ASSISTANCE_PAGE_QUERY } from "../queries/tuitionAssistance";

interface Props extends RouteComponentProps {
  client: Client;
}

export const FinancialPage = (props: Props): ReactElement => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const data: FinancialResourcePageData = useContentfulClient({
    query: TUITION_ASSISTANCE_PAGE_QUERY,
  });

  // function that filters data.resources based on activeTags

  const getFilteredResources = () => {
    if (activeTags.length === 0) {
      return data?.resources.items;
    }

    return data?.resources.items.filter((resource) => {
      return resource.taggedCatsCollection.items.some((tag) => {
        return activeTags.includes(`${tag.sys?.id}`);
      });
    });
  };

  return (
    <Layout
      theme="support"
      client={props.client}
      footerComponent={
        data?.page.footerBannerTitle && data?.page.footerBannerCopy ? (
          <section className="footer-banner">
            <div className="container">
              <p>{data?.page.footerBannerTitle}</p>
              <ContentfulRichText document={data?.page.footerBannerCopy?.json} />
            </div>
          </section>
        ) : undefined
      }
    >
      {data && <PageBanner {...data.page.pageBanner} date={data.page.sys.publishedAt} />}
      <section className="resource-filter">
        <div className="container">
          <FinancialResourceFilter
            education={data?.education}
            funding={data?.funding}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />

          <div className="content">
            <div className="heading">
              <p className="showing">
                showing {getFilteredResources()?.length} out of {data?.resources.items.length}
              </p>
            </div>
            {getFilteredResources()?.map((resource) => (
              <FinancialResource key={resource.sys?.id} {...resource} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
