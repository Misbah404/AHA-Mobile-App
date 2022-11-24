import React from 'react';
import RenderHtml from 'react-native-render-html';
export default function HtmlRender(props) {
  const {html, hStyle, pStyle} = props;

  return (
    <RenderHtml
      source={{html: html}}
      containerStyle={{padding: 20}}
      tagsStyles={{
        p: pStyle,
        h1: hStyle,
      }}
    />
  );
}

HtmlRender.propTypes = {};
HtmlRender.defaultProps = {};
