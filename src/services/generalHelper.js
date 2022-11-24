import moment from "moment";
import { RNS3 } from "react-native-aws3";
import { userSignOutSuccess } from "../actions/UserActions";
import DataHandler from "./DataHandler";
let S3 = require("aws-sdk/clients/s3");

/**
 *
 * @param {String} DateTime ISO String to be converted
 * @param {String} format Expected Format
 */
const ISOToFormat = (DateTime, format) => {
  if (moment(DateTime).format(format) === "Invalid date") {
    console.warn("Invalid Date");
    return null;
  } else {
    return moment(DateTime).format(format);
  }
};

/**
 *
 * @param {String} DateTime Formatted time
 * @param {String} format Format of given time
 */
const toISOString = (DateTime, format) => {
  return moment(DateTime, format).toISOString();
};

const setDateTime = (time, date) => {
  let finalTime = ISOToFormat(time, TIME_FORMAT1);
  let finalDate = ISOToFormat(date, DATE_FORMAT2);
  let finalDateTime = `${finalDate} ${finalTime}`;
  return toISOString(finalDateTime, DATE_TIME);
};

const TimeFromNow = data => {
  return moment(data).fromNow();
};

const GetCurrentTimeInISO = () => {
  return moment().toISOString();
};

const getTimeDifference = (from, to = moment()) => {
  from = moment(from);
  return from.diff(to, "minutes");
};

const generateRandomString = function(inputs, exits) {
  var length = 10;
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function logoutUser() {
  DataHandler.getStore().dispatch(userSignOutSuccess());
}

export {
  toISOString,
  ISOToFormat,
  getTimeDifference,
  GetCurrentTimeInISO,
  TimeFromNow,
  setDateTime,
  logoutUser
};
