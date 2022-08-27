import { useState } from 'react';
import { Avatar, Button, Modal, List, Input } from 'antd';
import { Event } from '../../Model/Event';
import { addEvent } from '../../Database';
import SOSBtn from '../../Components/SOSBtn/SOSBtn';
import { FAINT, ROBBERY, CAR_ACCIDENT, FIRE_BREAKOUT } from '../../Constants';
import { sendPush } from '../../Utils/Helper';
import './SOSForm.scss';
import { MdClose } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';

const data = [
  {
    title: 'There is someone faint',
    icon: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde is required.',
    type: FAINT,
  },
  {
    title: 'There is robbery in my area',
    icon: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde is required.',
    type: ROBBERY,
  },
  {
    title: 'Car accident happened',
    icon: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde is required.',
    type: CAR_ACCIDENT,
  },
  {
    title: 'Fire breakout',
    icon: 'https://cdn-icons-png.flaticon.com/512/136/136300.png',
    description: 'Someone with first aid knowlegde is required.',
    type: FIRE_BREAKOUT,
  },
];

export default function SOSForm({ nearbyTokens }) {
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [template, setTemplate] = useState({})

  const triggerSOS = () => {
    let uid = sessionStorage.getItem('uid');
    let long = sessionStorage.getItem('longitude');
    let lat = sessionStorage.getItem('latitude');
    let title = template.title ? template.title : "HELP!"
    let desc = template.description ? template.description : description
    let t = template.type ? template.type : "CUSTOM"
    let event = new Event(uid, t,title, desc, long, lat, [])
    addEvent(event);
    sendPush(nearbyTokens, new Event(uid, t,title, desc, long, lat, []));
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
    setTemplate({})
    setDescription(e.target.value);
  };

  return (
    <>
      <SOSBtn callback={showModal} />
      <Modal
        title="SOS Alert"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="sos-form"
        centered
        closeIcon={<MdClose size={'12pt'} />}
        okText="Send"
      >
        <Input
          placeholder="Custom SOS Alert"
          allowClear
          onChange={onChange}
          className="custom-input"
        />
        <List
          itemLayout="vertical"
          dataSource={data}
          size="small"
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                setTemplate(item);
              }}
              className={`sos-list-item ${
                template === item ? 'active' : ''
              }`}
              extra={
                template === item ? (
                  <BsCheckCircleFill
                    style={{ marginLeft: '0.05rem' }}
                    fontSize={'14pt'}
                    color={'#1890ff'}
                  />
                ) : (
                  <></>
                )
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}
