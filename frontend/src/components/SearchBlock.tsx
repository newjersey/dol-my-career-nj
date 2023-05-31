import { ArrowRight, CurrencyDollarSimple } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useState } from "react";

export const SearchBlock = () => {
  const [inPerson, setInPerson] = useState<boolean>(false);
  const [maxCost, setMaxCost] = useState<string>("");
  const [miles, setMiles] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);
  const [zipCode, setZipCode] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchUrl, setSearchUrl] = useState<string>("");

  useEffect(() => {
    const url = `/search/${searchTerm}?`;

    // Build the search parameters
    const params = [];
    if (inPerson) {
      params.push("inPerson=true");
    }
    if (maxCost) {
      params.push(`maxCost=${maxCost}`);
    }
    if (miles) {
      params.push(`miles=${miles}`);
    }
    if (online) {
      params.push("online=true");
    }
    if (zipCode) {
      params.push(`zip=${zipCode}`);
    }

    // Concatenate the search parameters to the url
    if (params.length > 0) {
      const queryParams = params.join("&");
      setSearchUrl(url + queryParams);
    } else {
      setSearchUrl(url);
    }
  }, [searchTerm, inPerson, maxCost, miles, online, zipCode]);
  return (
    <section className="search-block">
      <div className="container">
        <h2>Find Training</h2>
        <p>Search by training, provider, certification, SOC code, or keyword</p>
        <div className="row">
          <input
            type="text"
            className="search-input usa-input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
            }}
            defaultValue={searchTerm}
          />
          <div className="submit">
            <a href={searchUrl} className="usa-button">
              Search
            </a>
            <a href={`/search/${searchTerm}`} className="usa-button usa-button--unstyled">
              Advanced Search
              <ArrowRight />
            </a>
          </div>
        </div>
        <div className="filters">
          <h3>Filters</h3>
          <div className="row">
            <div className="area">
              <div className="label">Miles from Zip Code</div>
              <div className="inputs">
                <select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    if (e.target.value === "Miles") {
                      setMiles("");
                      return;
                    }
                    setMiles(e.target.value);
                  }}
                >
                  <option>Miles</option>
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>from</span>
                <input
                  type="number"
                  name="Zip"
                  id="zipCode"
                  placeholder="ZIP code"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setZipCode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="cost">
              <div className="label">Max Cost</div>
              <CurrencyDollarSimple />
              <input
                type="number"
                name="Max Cost"
                id="maxCost"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMaxCost(e.target.value);
                }}
              />
              <a href="/tuition-assistance" className="usa-button usa-button--unstyled">
                Tuition Assistance Information
              </a>
            </div>
            <div className="class">
              <div className="label">Class Format</div>
              <div className="checks">
                <div className="usa-checkbox">
                  <input
                    className="usa-checkbox__input"
                    id="in-person"
                    type="checkbox"
                    onChange={() => {
                      setInPerson(!inPerson);
                    }}
                  />
                  <label className="usa-checkbox__label" htmlFor="in-person">
                    In-Person
                  </label>
                </div>
                <div className="usa-checkbox">
                  <input
                    className="usa-checkbox__input"
                    id="online"
                    type="checkbox"
                    onChange={() => {
                      setOnline(!online);
                    }}
                  />
                  <label className="usa-checkbox__label" htmlFor="online">
                    Online
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
