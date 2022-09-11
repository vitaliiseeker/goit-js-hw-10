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

  fetchCountries(nameCountry).then(renderCountiesData).catch(onFetchError);
}

function renderCountiesData(r) {

  if (r.length > 10) {
    clearData(refs.countryList);
    clearData(refs.countryInfo);
    Notify.info("Too many matches found. Please enter a more specific name.");
    return;
  }

  if (r.length > 1) {
    clearData(refs.countryInfo);
    refs.countryList.innerHTML = markupCountryList(r);
    return;
  }

  clearData(refs.countryList);
  refs.countryInfo.innerHTML = markupOneCountry(r);
}

function onFetchError() {
  clearData(refs.countryList);
  clearData(refs.countryInfo);
  Notify.failure("Oops, there is no country with that name");
}

function clearData(refs) {
  refs.innerHTML = "";
}