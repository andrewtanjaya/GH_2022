import { useState } from 'react';
import { Avatar, Button, Modal, List, Input } from 'antd';
import { Event } from '../../Model/Event';
import { addEvent } from '../../Database';
import SOSBtn from '../../Components/SOSBtn/SOSBtn';
import { FAINT, ROBBERY, CAR_ACCIDENT, FIRE_BREAKOUT } from '../../Constants';

const data = [
  {
    title: 'There is someone faint',
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde or doctor is required.',
    type: FAINT,
  },
  {
    title: 'There is robbery in my area',
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde or doctor is required.',
    type: ROBBERY,
  },
  {
    title: 'Car accident happened',
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde or doctor is required.',
    type: CAR_ACCIDENT,
  },
  {
    title: 'Fire breakout',
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde or doctor is required.',
    type: FIRE_BREAKOUT,
  },
];

export default function SOSForm() {
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const triggerSOS = () => {
    let uid = sessionStorage.getItem('uid');
    let long = sessionStorage.getItem('longitude');
    let lat = sessionStorage.getItem('latitude');
    addEvent(new Event(uid, 'SOS', description, long, lat, []));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    triggerSOS();
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
      <SOSBtn callback={showModal} />
      <Modal
        title="SOS Alert"
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
                setDescription(item.type);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.imgUrl} />}
                title={item.title}
                description={item.description}
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
