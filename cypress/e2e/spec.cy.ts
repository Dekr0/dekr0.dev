describe("My First Test", () => {
    it("Visits the Guestbook Page", () => {
        cy.visit("http://localhost:4321/guestbook");

        cy.contains("Authenticate with GitHub").click();
    });
});
