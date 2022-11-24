// @flow
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {editCommentRequest} from '../../actions/CommentActions';
import {Button, CustomNavbar, TextInput} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const EditComment = props => {
  const {_commentObj} = props;
  const {id, body, parent_id} = _commentObj;
  const [comment, setComment] = useState(() => body);
  const [isSendingCommentToServer, setIsSendingCommentToServer] = useState(
    () => false,
  );
  let [inputHeight, setInputHeight] = useState(50);
  const commentBodyRef = useRef(() => null);
  const dispatch = useDispatch();

  useEffect(() => {
    const {body} = _commentObj;
    setComment(body);
  }, [_commentObj]);

  function onUpdateCommentPressHandler() {
    setIsSendingCommentToServer(true);
    let params = `${id}`;
    const payload = {
      id,
      body: comment,
      parent_id,
    };
    if (!util.isNullValue(parent_id)) {
      params += `?parent_id=${parent_id}`;
    }
    dispatch(
      editCommentRequest(payload, params, res => {
        setIsSendingCommentToServer(false);
        if (res) Actions.pop();
      }),
    );
  }

  const renderCustomNavBar = useMemo(
    () => (
      <CustomNavbar
        title={strings.EDIT_COMMENT}
        hasBack
        titleStyle={AppStyles.titleStyleForCenter}
        leftRightButtonWrapperStyle={{justifyContent: 'center'}}
      />
    ),
    [],
  );

  const renderCommentWriteSection = () => (
    <View style={styles.commentsWriteSection}>
      <View style={{flex: 0.95}}>
        <TextInput
          ref={commentBodyRef?.current?.focus?.()}
          styleInput={[
            styles.textInput,
            {height: inputHeight > 40 ? inputHeight : 40},
          ]}
          placeholder={strings.DO_COMMENTS}
          placeholderTextColor={'gray'}
          selectionColor={Colors.appColorDarkBlue1}
          cursorColor={Colors.appColorDarkBlue1}
          onSubmitEditing={() => onUpdateCommentPressHandler()}
          returnKeyType="done"
          value={comment}
          onContentSizeChange={event => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
          autoFocus
          multiline
          onChangeText={val => {
            setComment(val);
          }}
        />
      </View>
    </View>
  );

  const renderUpdateButton = () => (
    <Button
      color={Colors.text.white}
      onPress={onUpdateCommentPressHandler}
      isLoading={isSendingCommentToServer}
      disabled={
        isSendingCommentToServer ||
        util.areValuesEqual(body, comment) ||
        util.isEmptyValue(comment)
      }
      style={[
        styles.updateBtn,
        {marginTop: inputHeight < 140 ? inputHeight : 140},
      ]}
      textStyle={styles.updateText}>
      {strings.UPDATE}
    </Button>
  );

  return (
    <View style={styles.container}>
      {renderCustomNavBar}
      <View style={styles.inputTextAndUpdateBtnSec}>
        {renderCommentWriteSection()}
        {renderUpdateButton()}
      </View>
    </View>
  );
};

EditComment.propTypes = {
  _commentObj: PropTypes.object.isRequired,
};
EditComment.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(EditComment);
