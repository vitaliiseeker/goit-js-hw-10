import '../css/styles.css';
import { fetchCountries } from "../js/modules/fetchCountries";
import { markupCountryList, markupOneCountry } from "./modules/markup";
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'right-top', width: '300px', fontSize: '20px' });

const DEBOUNCE_DELAY = 300;
const refs = {
  countrySearch: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryInfo: document.querySelector(".country-info"),
}

refs.countrySearch.addEventListener("input", debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {

  const nameCountry = e.target.value.trim();

  if (!nameCountry) return Notify.failure("Enter data in the search field");

  fetchCountries(nameCountry)
    .then(r => {

      if (r.length > 10) {
        refs.countryInfo.innerHTML = "";
        refs.countryList.innerHTML = "";
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
      }

      if (r.length > 1) {
        refs.countryInfo.innerHTML = "";
        refs.countryList.innerHTML = markupCountryList(r);
        return;
      }

      refs.countryList.innerHTML = "";
      refs.countryInfo.innerHTML = markupOneCountry(r);
    })

    .catch(r => {
      refs.countryInfo.innerHTML = "";
      refs.countryList.innerHTML = "";
      Notify.failure("Oops, there is no country with that name");
    });
}
