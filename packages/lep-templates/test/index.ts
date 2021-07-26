import { Creator } from '../src/core';
import { ETemplateTypes } from '../src/types';
const test = new Creator(
  {
    name: 'demo-proj'
  },
  ETemplateTypes.REACT_PC_COMPONENT
);

test.create();

class PO { }
new PO();
const b = 1;
const a = {
  o: 1,
  a: '2'
};
