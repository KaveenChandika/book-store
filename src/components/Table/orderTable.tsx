'use client';

import { Badge, Box, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
const _ = require("lodash");
import classes from './orderTable.module.css';
import books from '../../../component.json';
import Image from 'next/image';
import Link from 'next/link';

const PAGE_SIZE = 10;
// add type for props
export function OrderTable() {
    const orders = localStorage.getItem("order");
    const data = orders ? JSON.parse(orders) : [];
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<any[]>([]);
    const [items, setItems] = useState(data[0].order);

    useEffect(() =>{
      data[0].user[0]['orders'] = data[0].order;
      setRecords(data[0].user);
      console.log("ORDER ITEMS",data[0].user);
    },[])
    
    return (
        <DataTable
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            height="auto"
            width={'100%'}
            scrollAreaProps={{ type: 'never' }}
            columns={[
                { accessor: 'name', sortable: true },
                { accessor: 'email', sortable: true },
                { accessor: 'address', sortable: true },
                { accessor: 'mobile', sortable: true },

            ]}
            records={records}
            rowExpansion={{
                content: ({record}) => (
                  <>  
                    <div style={{margin:'20px',textAlign:'center'}}>
                        <Text fw={600} >ITEMS</Text>
                        {record?.orders?.map((dt:any) => (
                          <Stack className={classes.details} p="xs" gap={6}>
                            <Group gap={6} style={{display:'flex', gap:'2'}}>
                              <div style={{flex:2,display:'flex',alignItems:'center', gap:'10px'}}>
                                <Link href={`/ProductView/${dt.id}`}>
                                  <Image src={dt.cover_image} alt="Cover Image" width={80} height={80} />
                                </Link>
                                <div>
                                  {dt.title} <br/>
                                </div>
                              </div>
                              <div style={{flex:1}}>
                                Qty {dt.qty}
                              </div>
                              <div>
                                <Badge>Processing</Badge>
                              </div>
                            </Group>
                          </Stack>
                        ))}
                    </div>
                  </>
                ),
              }}
        />
    );
}