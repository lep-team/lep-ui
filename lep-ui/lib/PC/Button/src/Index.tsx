

import React, { FC } from 'react'
import { IPropsButton } from './button.d';
import './index.less';
const Button: FC<IPropsButton> = () => {
  return (
    <div>
      <button>Button</button>
    </div>
  )
}
export default Button
