// @flow
import React from "react";
import PropTypes from "prop-types";
import { Text } from "../";
import { strings } from "../../constants";
import styles from "./styles";

const NoDataFoundComponent = props => {
  const { text } = props;

  return (
    <Text style={styles.noDataFoundText}>
      {text}
    </Text>
  );
};

NoDataFoundComponent.propTypes = {
  shouldHideButton: PropTypes.bool
};
NoDataFoundComponent.defaultProps = {
  text: strings.NO_DATA_FOUND
};
export default NoDataFoundComponent;
