import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const Pagination = ({
  currentPage,
  totalPages,
  setPageNumber,
  isLoading,
  setIsLoading,
}: {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  setPageNumber: (pageNumber: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const [breakCount, setBreakCount] = useState(0);

  useEffect(() => {
    const breakElements = document.querySelectorAll(".pagination .break");
    breakElements.forEach((element, index) => {
      element.setAttribute("aria-label", `Break ${index + 1}`);
    });
    const pageElements = document.querySelectorAll(".pagination li");

    if (breakElements.length === 0) {
      setBreakCount(0);
    }

    if (breakElements.length === 1) {
      setBreakCount(1);
    }

    if (breakElements.length > 1) {
      setBreakCount(2);
      for (let i = 0; i < breakElements.length - 1; i++) {
        const start = breakElements[i];
        const end = breakElements[i + 1];
        const startIndex = Array.from(pageElements).indexOf(start);
        const endIndex = Array.from(pageElements).indexOf(end);
        for (let j = startIndex + 1; j < endIndex; j++) {
          pageElements[j].classList.add("middle");
        }
      }
      for (let i = 0; i < pageElements.length; i++) {
        if (i < Array.from(pageElements).indexOf(breakElements[0])) {
          if (!pageElements[i].classList.contains("control")) {
            pageElements[i].classList.add(`start_${i}`);
          }
        }
        if (i > Array.from(pageElements).indexOf(breakElements[breakElements.length - 1])) {
          if (!pageElements[i].classList.contains("control")) {
            pageElements[i].classList.add(
              `end_${i - Array.from(pageElements).indexOf(breakElements[breakElements.length - 1])}`,
            );
          }
        }
      }
    } else {
      // remove all classes that aren't 'control' or 'selected' from page elements

      for (let i = 0; i < pageElements.length; i++) {
        if (
          !pageElements[i].classList.contains("control") &&
          !pageElements[i].classList.contains("selected")
        ) {
          pageElements[i].classList.remove("middle");
          pageElements[i].classList.remove(`start_${i}`);
          pageElements[i].classList.remove(
            `end_${i - Array.from(pageElements).indexOf(breakElements[0])}`,
          );
        }
      }
    }
  }, [currentPage, totalPages]);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`pagination${isLoading ? " disabled" : ""}${breakCount === 1 ? " single-break" : breakCount === 2 ? " multi-break" : " no-break"}`}
    >
      <ReactPaginate
        ariaLabelBuilder={(page) => `Go to page ${page}`}
        breakLabel="..."
        forcePage={currentPage - 1}
        nextClassName="control"
        previousClassName="control"
        nextLabel={
          <>
            Next
            <CaretRight size={15} weight="bold" />
          </>
        }
        pageCount={totalPages}
        previousLabel={
          <>
            <CaretLeft size={15} weight="bold" />
            Prev
          </>
        }
        renderOnZeroPageCount={null}
        pageRangeDisplayed={2}
        onPageChange={(page) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("p", `${page.selected + 1}`);
          window.history.pushState({}, "", newUrl.toString());
          setPageNumber(page.selected + 1);
          setIsLoading(true);
        }}
        hrefBuilder={(page) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("p", `${page}`);
          return newUrl.toString();
        }}
      />
    </nav>
  );
};
