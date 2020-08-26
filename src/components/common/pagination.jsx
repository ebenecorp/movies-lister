import React from "react";
import PropType from "prop-types";
import _ from "lodash";
import { paginate } from "../../utils/paginate";

const Pagination = (props) => {
  const { pageSize, itemsCount, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

paginate.propTypes = {
  pageSize: PropType.number.isRequired,
  itemsCount: PropType.number.isRequired,
  onPageChange: PropType.func.isRequired,
  currentPage: PropType.number.isRequired,
};

export default Pagination;
