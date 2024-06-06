import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://book-store-api", // e.g. https://book-store-api
  issuerBaseURL: "https://dev-ezil5aozoabyhhcn.eu.auth0.com/",
});
