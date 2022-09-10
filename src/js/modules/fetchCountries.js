export function fetchCountries(name) {

  const baseUrl = "https://restcountries.com/v3.1/";
  const endPoint = "name/";
  const options = "fields=name,capital,population,flags,languages";

  return fetch(`${baseUrl}${endPoint}${name}?${options}`)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
}

