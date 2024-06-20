const REGEX_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const REGEX_PATTERN = {
  EMAIL: REGEX_EMAIL,
};

export const LENGTH_PHONE_NUMBER = 10;
export const LENGTH_PRICE = 10;
export const LENGTH_QUANTITY = 10;
