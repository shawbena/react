import React, { Component } from 'react';
import { render } from 'react-dom';
import bootstrap from '../bootstrap';

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);

bootstrap('ul', { children: listItems });