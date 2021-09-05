import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { contextProvider } from '../contextProvider';

type Props = {
  text?: string;
  className;
};

async function getName() {
  return 1;
}

function Button(props: Props) {
  const { getGlobalCls } = useContext(contextProvider);
  const { text, className } = props;
  const [number, setNumber] = useState(0);
  const prefixCls = getGlobalCls('button');

  const classes = classNames(prefixCls, className);

  async function init() {
    const name = await getName();
    setNumber(name);
  }
  useEffect(() => {
    init();
  }, []);
  return <button className={classes}>{text + number || 'button'}</button>;
}

export default Button;
