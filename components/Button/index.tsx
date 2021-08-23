import React from 'react';

type Props = {
  text?: string;
};

function Button(props: Props = {}) {
  const { text } = props;
  return <button className="lep-button">{text || 'button'}</button>;
}

export default Button;
