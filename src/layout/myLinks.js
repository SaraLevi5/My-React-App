import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUT, children: "About Us" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

const loggedInLinks = [{ to: ROUTES.FAVORITE, children: "Favorite" }];

const bizLinks = [
  { to: ROUTES.CREATECARD, children: "Create Card" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
];
const adminLinks = [{ to: ROUTES.CRMSYSTEM, children: "CRM system" }];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
