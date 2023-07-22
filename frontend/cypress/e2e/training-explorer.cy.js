describe("Training Explorer Page", () => {
  it("is accessible", () => {
    cy.visit("/");
    cy.injectAxe();

    cy.contains("Certifications, Professional Development, Apprenticeships & More!").should(
      "exist",
    );
    cy.checkA11y();
  });
});
