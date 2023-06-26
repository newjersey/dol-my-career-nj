import { useEffect, useState } from "react";
import { RESOURCE_LISTING_QUERY } from "../queries/resourceCategory";
import { ResourceItemProps, ResourceListProps, TagProps } from "../types/contentful";
import { useContentfulClient } from "../utils/useContentfulClient";
import { FilterControls } from "./FilterControls";
import { ResourceCard } from "./ResourceCard";
import { ResourceListHeading } from "./modules/ResourceListHeading";

interface ResourceTagListProps {
  tags: TagProps[];
  audience: TagProps[];
  category?: string;
  info?: string;
}

export const ResourceList = ({
  tags,
  info,
  category = "All Resources",
  audience,
}: ResourceTagListProps) => {
  // get the title from all tags and audience and map them to a single array
  const allTags = [...tags].map((tag) => tag.title);

  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const [filteredResources, setFilteredResources] = useState<ResourceItemProps[]>([]);

  const data: ResourceListProps = useContentfulClient({
    query: RESOURCE_LISTING_QUERY,
    variables: { tags: allTags },
  });

  useEffect(() => {
    if (data) {
      if (selectedTags.length > 0) {
        const filtered = data.resources.items.filter((resource) => {
          const resourceTags = resource.tags.items.map((tag) => tag.title);
          return selectedTags.every((tag) => resourceTags.includes(tag.title));
        });
        setFilteredResources(filtered);
      } else {
        setFilteredResources(data.resources.items);
      }
    }
  }, [selectedTags]);

  const themeColor =
    category === "Career Support" ? "purple" : category === "Tuition Assistance" ? "green" : "navy";

  return (
    <section className="resource-list">
      {data && (
        <div className="container plus">
          <FilterControls
            onChange={(selected) =>
              setSelectedTags(
                selected
                  .map((tag) => tag)
                  .sort((a, b) => b.category.slug.localeCompare(a.category.slug))
              )
            }
            boxLabel={`${category} Filters`}
            groups={[
              {
                heading: category,
                items: tags,
              },
              {
                heading: "Audience",
                items: audience,
              },
            ]}
          />
          <div className="cards">
            {info && (
              <div className="usa-alert usa-alert--info">
                <div className="usa-alert__body">
                  <p className="usa-alert__text">{info}</p>
                </div>
              </div>
            )}

            <div className="listing-header">
              <ResourceListHeading
                tags={selectedTags}
                count={filteredResources.length}
                totalCount={data.resources.items.length}
                theme={themeColor}
              />
            </div>

            {filteredResources.map((resource) => {
              return <ResourceCard {...resource} theme={themeColor} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
