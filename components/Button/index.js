import React from 'react';
function Button(props = {}) {
  const { text } = props;
  return React.createElement(
    'button',
    { className: 'lep-button' },
    text || 'button'
  );
}
export default Button;
