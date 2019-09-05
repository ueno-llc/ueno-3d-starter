import React from 'react';
import { Styles } from '../../styles/base';

export default function AppLayout(props: any) {
  return (
    <>
      <Styles />
      {props.children}
    </>
  );
}
