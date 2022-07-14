import { Pagination } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomPagination({ total, perPage, currentPage, handleOnAdjustPage }) {

  const totalPages = Math.ceil(total / perPage);
  function adjustPage(page) { 
    handleOnAdjustPage(page);
  }

  const paginationItems = [];

  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        onClick={() => adjustPage(number)}
        active={number == currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{paginationItems}</Pagination>;
}
