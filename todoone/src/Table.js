// import { Table } from 'antd';

// const columns = [
//   {
//     title: 'Timestamp created',
//     dataIndex: 'timestamp',
//     defaultSortOrder: 'descend',
//     sorter: (a, b) => a.timestamp - b.timestamp,
//     render: (text) => <span>{text.toString()}</span>,
//     width: '20%',
//   },
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     sorter: (a, b) => a.title.localeCompare(b.title),
//     sortDirections: ['ascend', 'descend'],
//     width: '20%',
//   },
//   {
//     title: 'Description',
//     dataIndex: 'description',
//     width: '30%',
//   },
//   {
//     title: 'Due Date',
//     dataIndex: 'dueDate',
//     sorter: (a, b) => a.dueDate - b.dueDate,
//     sortDirections: ['ascend', 'descend'],
//     width: '15%',
//   },
//   {
//     title: 'Tag',
//     dataIndex: 'tag',
//     width: '10%',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     filters: [
//       { text: 'OPEN', value: 'OPEN' },
//       { text: 'WORKING', value: 'WORKING' },
//       { text: 'DONE', value: 'DONE' },
//       { text: 'OVERDUE', value: 'OVERDUE' },
//     ],
//     onFilter: (value, record) => record.status.indexOf(value) === 0,
//     width: '5%',
//   },
// ];

// const data = [
//   {
//     key: '1',
//     timestamp: new Date(),
//     title: 'Task 1',
//     description: 'Description of Task 1',
//     dueDate: new Date(),
//     tag: 'Tag 1',
//     status: 'OPEN',
//   },
//   // Add more data as required
// ];

// const TodoListTable = () => {
//   return (
//     <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
//   );
// };

// export default TodoListTable;






























import { useState } from 'react';
import { Table, Modal,message,Popconfirm,Space, Form, Input, DatePicker, Select, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const columns = [
  {
    title: 'Timestamp created',
    dataIndex: 'timestamp',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.timestamp - b.timestamp,
    render: (text) => <span>{text.toString()}</span>,
    width: '20%',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ['ascend', 'descend'],
    width: '20%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
  },
  
  {
    title: 'Tag',
    dataIndex: 'tag',
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'OPEN', value: 'OPEN' },
      { text: 'WORKING', value: 'WORKING' },
      { text: 'DONE', value: 'DONE' },
      { text: 'OVERDUE', value: 'OVERDUE' },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    width: '5%',
  },
  
];

const data = [
//   {
//     key: '1',
//     timestamp: new Date(),
//     title: 'Task 1',
//     description: 'Description of Task 1',
//     dueDate: new Date(),
//     tag: 'Tag 1',
//     status: 'OPEN',
//   },
  // Add more data as required
];

const TodoListTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setIsEdit(true);
    setSelectedRow(record);
    form.setFieldsValue(record);
  };

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSubmit = (values) => {
    const newData = {
      key: isEdit ? selectedRow.key : dataSource.length + 1,
      ...values,
    };
    
    if (isEdit) {
      const index = dataSource.findIndex((item) => item.key === selectedRow.key);
      if (index > -1) {
        const updatedData = [...dataSource];
        updatedData[index] = { ...selectedRow, ...newData };
        setDataSource(updatedData);
        setIsModalVisible(false);
        message.success('Task updated successfully');
      }
    } else {
      setDataSource([...dataSource, { ...newData }]);
      setIsModalVisible(false);
      message.success('Task added successfully');
    }
    };
    
    return (
    <>
    <Button type="primary" onClick={showModal}>
    Add Task
    </Button>
    <Table
    columns={[
    ...columns,
    {
    title: 'Action',
    dataIndex: 'action',
    width: '5%',
    render: (_, record) => (
    <Space>
    <Button type="link" onClick={() => handleEdit(record)}>
    Edit
    </Button>
    <Popconfirm
    title="Are you sure to delete this task?"
    onConfirm={() => handleDelete(record.key)}
    okText="Yes"
    cancelText="No"
    >
    <Button type="link" danger>
    Delete
    </Button>
    </Popconfirm>
    </Space>
    ),
    },
    ]}
    dataSource={dataSource}
    pagination={{ pageSize: 5 }}
    />
    <Modal
    title={isEdit ? 'Edit Task' : 'Add Task'}
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
    <Form form={form} onFinish={handleSubmit}>
    <Form.Item
    name="timestamp"
    label="Timestamp created"
    rules={[{ required: true, message: 'Please input timestamp created!' }]}
    >
    <DatePicker showTime />
    </Form.Item>
    <Form.Item
    name="title"
    label="Title"
    rules={[{ required: true, message: 'Please input title!' }]}
    >
    <Input />
    </Form.Item>
    <Form.Item
    name="description"
    label="Description"
    rules={[{ required: true, message: 'Please input description!' }]}
    >
    <Input.TextArea />
    </Form.Item>
    <Form.Item name="dueDate" label="Due Date">
    <DatePicker showTime />
    </Form.Item>
    <Form.Item name="tag" label="Tag">
    <Input />
    </Form.Item>
    <Form.Item
    name="status"
    label="Status"
    rules={[{ required: true, message: 'Please select status!' }]}
    >
    <Select>
    <Select.Option value="OPEN">OPEN</Select.Option>
    <Select.Option value="WORKING">WORKING</Select.Option>
    <Select.Option value="DONE">DONE</Select.Option>
    <Select.Option value="OVERDUE">OVERDUE</Select.Option>
    </Select>
    </Form.Item>
    </Form>
    </Modal>
    </>
    );
    };
    
    export default TodoListTable;