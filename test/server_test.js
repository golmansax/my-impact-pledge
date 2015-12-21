import chai, { expect } from 'chai';
import React from 'react';
import Browser from 'zombie';
import server from '../server';
import dirtyChai from 'dirty-chai';

import { beforeEach, afterEach, it } from 'arrow-mocha/es5';

// Use React global so we don't need to require React for JSX
global.React = React;

chai.use(dirtyChai);

describe('server', function () {
  this.timeout(9000);

  beforeEach(() => {
    const port = 3001;
    this.server = server.listen(port);
    this.browser = new Browser({ site: 'http://localhost:' + port });
    return this.browser.visit('/');
  });

  afterEach(() => {
    this.server.close();
  });

  it('routes root page to portfolio', () => {
    expect(this.browser.text('title')).to.include('My Impact Pledge –');
    expect(this.browser.text('body')).to.include('Whatimpactwill you make?');
  });
});
