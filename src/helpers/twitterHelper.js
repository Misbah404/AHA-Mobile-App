//api key
//ams0FAM62Yf8GYEFjNMToaKkp
//api key secret
//pSNCcCEn4KtBjg2hxlrOAj3hrS8KByLCX3RqBmAhL7NWzxiGoY
import React from 'react-native';
var {NativeModules} = React;
const {RNTwitterSignIn} = NativeModules;

// const Constants = {
//   TWITTER_COMSUMER_KEY: 'ams0FAM62Yf8GYEFjNMToaKkp',
//   TWITTER_CONSUMER_SECRET: 'pSNCcCEn4KtBjg2hxlrOAj3hrS8KByLCX3RqBmAhL7NWzxiGoY',
// };
const Constants = {
  TWITTER_COMSUMER_KEY: 'IhNmA7kG85YS0T3ufXoioz0Iu',
  TWITTER_CONSUMER_SECRET: 'ZIG7xSpoYSDSSkZjVMZlV7hVr2vIakKdJGXlKTxGYMZJFUTEoS',
};
export const twitterLogin = loginRequest => {
  RNTwitterSignIn.init(
    Constants.TWITTER_COMSUMER_KEY,
    Constants.TWITTER_CONSUMER_SECRET,
  );

  RNTwitterSignIn.logIn()
    .then(loginData => {
      loginRequest(loginData, 'twitter');
    })
    .catch(error => {
      console.log({error: error.message});
    });
};

//new
//APi key
//BxPlub3I2kC1qxzszSJ8VpRob
//api key secret
//Yvcz1Lf8aZ9YeKT3wvowWLJliggjZ6EN26pas7uGjhVsKfJVi0
//AAAAAAAAAAAAAAAAAAAAAOp1fQEAAAAAc8ao2y0ieuHFCFQc653AQlhHTf0%3DWRz8MorzlviqY5V15VuIAMFFg8DUtC4Eeq6ErbViZXSXJ5F4F3
