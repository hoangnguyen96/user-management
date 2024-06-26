const REGEX_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const REGEX_PATTERN = {
  EMAIL: REGEX_EMAIL,
};

const LENGTH_PHONE_NUMBER = 10;
const LENGTH_PRICE = 10;
const LENGTH_QUANTITY = 10;

export { REGEX_PATTERN, LENGTH_PHONE_NUMBER, LENGTH_PRICE, LENGTH_QUANTITY };
