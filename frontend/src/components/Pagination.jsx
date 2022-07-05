import { Pagination } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomPagination({ paginationData, url }) {
  const navigate = useNavigate();

  const { page, totalPages, hasNextPage, hasPrevPage, limit } = paginationData;
  function adjustPage(page) {
    navigate(`?page=${page}&limit=${limit}`);
  }

  const paginationItems = [];

  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        onClick={() => adjustPage(number)}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{paginationItems}</Pagination>;
}
