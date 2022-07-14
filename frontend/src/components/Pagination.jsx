import { Pagination } from "react-bootstrap";

export default function CustomPagination({ total, perPage, currentPage, handleOnAdjustPage }) {

  const totalPages = total == 0 ? 0 : Math.ceil(total / perPage);

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
