// lib/index.tsx
import React from 'react'
import ReactDOM from 'react-dom';
// import {Button} from './PC/Button/index'
import { Button } from '../../lib/PC/lepui/index'
import '../../lib/PC/style/index.less'
ReactDOM.render(<div>
    <Button />
</div>, document.getElementById('app'))