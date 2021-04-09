export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const extractId = (url) => {
  // https://pokeapi.co/api/v2/pokemon/{name}
  const regex = /\/\d{1,}\//g;
  const match = url.match(regex);
  const id = match[0].replace(/^\/|\/$/g, "");
  return id;
};
