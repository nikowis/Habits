import React from 'react';
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent(props) {

    const changePage = (e) => {
        const page = e.target.innerText;
        props.onPageChange(page);
    };

    let active = props.currentPage;
    let items = [];
    for (let number = 1; number <= props.totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={changePage}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination>{items}</Pagination>
    );
}

PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default PaginationComponent;