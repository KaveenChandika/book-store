'use client';

import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
const _ = require("lodash");

const PAGE_SIZE = 10;
// add type for props
export function Table(props) {
    const { books,searchCriteria } = props;
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(books.slice(0, PAGE_SIZE));
    const [sortStatus, setSortStatus] = useState({
        columnAccessor: 'title',
        direction: 'asc',
    });

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(books.slice(from, to));
    }, [page]);


    useEffect(() => {
        const data = _.sortBy(books, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'asc' ? data.reverse() : data);
    }, [sortStatus]);

    useEffect(() =>{
        if(searchCriteria != ''){
            let data =  records.filter((val:any) => val.title.includes(searchCriteria));
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE;
            setRecords(data.slice(from, to));
        }else{
            setRecords(books);
            alert("checking")
            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE;
            setRecords(books.slice(from, to));
        }
    },[page,books])
    return (
        <DataTable
            withTableBorder
            withColumnBorders
            striped
            page={page}
            onPageChange={(p) => setPage(p)}
            totalRecords={books.length}
            recordsPerPage={PAGE_SIZE}
            highlightOnHover
            height={600}
            scrollAreaProps={{ type: 'never' }}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            columns={[
                { accessor: 'title', sortable: true },
                { accessor: 'author', sortable: true },
                { accessor: 'description', sortable: true },
                { accessor: 'publication_year', sortable: true },
                { accessor: 'cover_image', sortable: true },
                { accessor: 'genre', sortable: true },

            ]}
            records={records}
        />
    );
}