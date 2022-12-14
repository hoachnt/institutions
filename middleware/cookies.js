export default ({ app }) => {
  const cookieRes = app.$cookies.get("chosenLang");

  return cookieRes;
};
