import React, {useState} from 'react';
import {connect} from 'react-redux';
import SearchView from './SearchView';

function SearchController(props) {
  const [searchList, setsearchList] = useState(props.array);
  const [selectedIDs, setSelectedIDs] = useState([]);
  
  const setList = id => {
    if (selectedIDs.includes(id)) {
      setSelectedIDs(selectedIDs.filter(item => item !== id));
    } else {
      setSelectedIDs(oldArray => [...oldArray, id]);
    }
  };

  return (
    <SearchView
      {...props}
      setList={setList}
      searchList={searchList}
      selectedIDs={selectedIDs}
    />
  );
}
SearchController.propTypes = {};
SearchController.defaultProps = {};

const mapStateToProps = ({general}) => ({});

export default connect(mapStateToProps, null)(SearchController);
