export default (req: any, res: any) => {
  res.redirect(`${process.env.KEYCLOAK_ISSUER as string}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(
    "https://card.ueckoken.club"
  )}`);
};