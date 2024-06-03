import React, { useState } from 'react';
import { Table } from 'antd';
import "./index.scss"

const Home = () => {

  const columns = [
    {
      title: 'Job',
      dataIndex: 'job',
      
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      sorter: {
        compare: (a, b) => a.address - b.address,
        multiple: 1,
      },
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      job: `Edward King ${i}`,
      company: "Salams",
      createDate: `London, Park Lane no. ${i}`,
      endDate:"dewmdjednj"
    });
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  
  return (
    <section className='home'>
        <div className="container">
          <div className="home-inner">
          <Table pagination={{pageSize:5}} rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </div>
    </section>
  )
}

export default Home