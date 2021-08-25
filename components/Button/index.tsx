import React, { useEffect, useState } from 'react';

type Props = {
  text?: string;
};

async function getName() {
  return 1;
}

function Button(props: Props = {}) {
  const { text } = props;
  const [number, setNumber] = useState(0);

  async function init() {
    const name = await getName();
    setNumber(name);
  }
  useEffect(() => {
    init();
  }, []);
  return <button className="lep-button">{text + number || 'button'}</button>;
}

export default Button;
