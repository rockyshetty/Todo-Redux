import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
function pages(count,active,changePage){
  let pages1 = [];
  if (count > 0) {
    for (let number = 1; number <= count; number++) {
      pages1.push(
        <Pagination.Item key={number} active={number === active} id={number} onClick={(e) => { changePage(number)}}>
          {number}
        </Pagination.Item>,
      );
    }
  }
  return pages1;
}
export default function Paginator({count = 0, active = 1, changePage, css = {} , size = 'sm'}){
  return( 
    <Pagination size={size} style={css}>{pages(count,active,changePage)}</Pagination>
  )
}
