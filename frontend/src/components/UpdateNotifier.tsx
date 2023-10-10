import { Megaphone } from "@phosphor-icons/react";
import { Heading } from "./modules/Heading";
import Image from "../tempImage.jpg";

interface UpdateNotifierProps {
  className?: string;
  isDrawer?: boolean;
}

const Content = ({ fixed }: { fixed?: boolean }) => {
  return (
    <div className={`update-content${fixed ? " fixed" : ""}`}>
      <div className="wrapper">
        <div className="content">
          <Megaphone size={32} />
          <Heading level={4}>
            Want updates on new tools and features from New Jersey Career Central?
          </Heading>

          <form
            className="usa-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="usa-form-group">
              <label className="usa-label" htmlFor="input-email">
                Email (required)
              </label>

              <input
                className="usa-input"
                id="input-email"
                placeholder="Email"
                required
                name="input-email"
                type="email"
                aria-describedby="input-email-message"
              />
              <button type="submit" className="usa-button primary">
                <Megaphone size={32} />
                Sign Up for Updates
              </button>
              <p>
                Read about out{" "}
                <a
                  href="https://www.nj.gov/nj/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
        <div className="image">
          <img src={Image} alt="" />
        </div>
      </div>
    </div>
  );
};

const UpdateNotifier = ({ className, isDrawer }: UpdateNotifierProps) => {
  return (
    <div className={`update-notifier${className ? ` ${className}` : ""}`}>
      {isDrawer ? (
        <>
          <button className="usa-button primary">
            <Megaphone size={32} />
            Sign Up for Updates
          </button>
          <Content fixed />
        </>
      ) : (
        <Content />
      )}
    </div>
  );
};

export { UpdateNotifier };
