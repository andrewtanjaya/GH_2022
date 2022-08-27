import { useState } from 'react';
import { Avatar, Button, Modal, List, Input } from 'antd';
import { Event } from '../../Model/Event';
import { addEvent } from '../../Database';
import { sendPush } from '../../Utils/Helper';

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

export default function SOSForm({nearbyTokens}) {
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const triggerSOS = () => {
    let uid = sessionStorage.getItem("uid")
    let long = sessionStorage.getItem("longitude")
    let lat = sessionStorage.getItem("latitude")
    addEvent(new Event(uid, "SOS", description,long, lat,[]));
    sendPush(nearbyTokens)
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    triggerSOS()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
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
        <p>{description}</p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                setDescription(item.title);
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
