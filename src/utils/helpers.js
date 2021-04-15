const dashes = /-/g;
const idFromUrl = /\/\d{1,}\//g;
const slashes = /^\/|\/$/g;

export const removeDashes = (name) => {
  return name.replace(dashes, " ");
};

export const capitalize = (name) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return capitalized.replace(dashes, " ");
};

export const extractId = (url) => {
  // https://pokeapi.co/api/v2/pokemon/{name}
  const match = url.match(idFromUrl);
  return match[0].replace(slashes, "");
};
