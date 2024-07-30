const REGEX_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const REGEX_PATTERN = {
  EMAIL: REGEX_EMAIL,
};

const LENGTH_PHONE_NUMBER = 10;
const PRICE = 999999999;
const QUANTITY = 999999999;

export { REGEX_PATTERN, LENGTH_PHONE_NUMBER, PRICE, QUANTITY };
