import React from 'react';

function Header(props) {
  const {title, children} = props;

  return (
    <header>
      <h1>{title}</h1>
      { children }
    </header>
  );
}

export default Header;