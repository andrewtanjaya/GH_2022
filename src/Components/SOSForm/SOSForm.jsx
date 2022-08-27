import { useState } from 'react';
import { Avatar, Button, Modal, List, Input } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default function SOSForm() {
  const [sosType, setSosType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

    // add SOS
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setSosType(e.target.value);
    console.log(sosType);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="SOS Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{sosType}</p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                setSosType(item.title);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.title}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        OR
        <Input
          placeholder="input with clear icon"
          allowClear
          onChange={onChange}
        />
      </Modal>
    </>
  );
}
