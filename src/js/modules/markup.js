export function markupCountryList(countries) {

  return countries.reduce((acc, { name, flags }) =>
    `${acc}
      <li class="item">
        <div class="row">
          <img src=${flags.svg} width="60" alt=flags ${name.official}>
          ${name.official}
        </div>
      </li>
    `, "");
}

export function markupOneCountry(country) {

  return country.map(({ name, capital, population, flags, languages }) =>
    `<div class="row">
      <img src=${flags.svg} width="60" alt=flags ${name.official}>
        <span class="name-country">
          ${name.official}
        </span>
    </div>
      <p>
        <i>Capital:</i> ${capital}<br>
        <i>Population:</i> ${Intl.NumberFormat().format(population)}<br>
        <i>Languages:</i> ${Object.values(languages).join(", ")}
      </p>
    `);
}
