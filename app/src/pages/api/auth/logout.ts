export default (req: any, res: any) => {
  res.redirect(`${process.env.KEYCLOAK_ISSUER as string}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
    "https://card.ueckoken.club"
  )}&id_token_hint=${req.cookies.id_token}`);
};