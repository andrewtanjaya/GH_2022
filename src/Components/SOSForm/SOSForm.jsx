import { useState } from 'react';
import { Avatar, Button, Modal, List, Input } from 'antd';
import { Event } from '../../Model/Event';
import { addEvent, getEventByUID } from '../../Database';
import SOSBtn from '../../Components/SOSBtn/SOSBtn';
import {
  FAINT,
  ROBBERY,
  CAR_ACCIDENT,
  FIRE_BREAKOUT,
  CUSTOM,
  DEFAULT_EVENT_TITLE,
  FAINT_ICON,
  ROBBERY_ICON,
  FIRE_BREAKOUT_ICON,
  CAR_ACCIDENT_ICON,
  FAINT_DESCRIPTION,
  ROBBERY_DESCRIPTION,
  CAR_ACCIDENT_DESCRIPTION,
  FIRE_BREAKOUT_DESCRIPTION,
} from '../../Constants';
import { sendPush } from '../../Utils/Helper';
import './SOSForm.scss';
import { MdClose } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';

const data = [
  {
    title: 'There is someone faint',
    icon: FAINT_ICON,
    description: FAINT_DESCRIPTION,
    type: FAINT,
  },
  {
    title: 'There is robbery in my area',
    icon: ROBBERY_ICON,
    description: ROBBERY_DESCRIPTION,
    type: ROBBERY,
  },
  {
    title: 'Car accident happened',
    icon: CAR_ACCIDENT_ICON,
    description: CAR_ACCIDENT_DESCRIPTION,
    type: CAR_ACCIDENT,
  },
  {
    title: 'Fire breakout',
    icon: FIRE_BREAKOUT_ICON,
    description: FIRE_BREAKOUT_DESCRIPTION,
    type: FIRE_BREAKOUT,
  },
];

export default function SOSForm({ nearbyTokens }) {
  const [description, setDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [template, setTemplate] = useState({});

  const triggerSOS = () => {
    let uid = sessionStorage.getItem('uid');
    let long = sessionStorage.getItem('longitude');
    let lat = sessionStorage.getItem('latitude');
    let title = template.title ? template.title : DEFAULT_EVENT_TITLE;
    let desc = template.description ? template.description : description;
    let t = template.type ? template.type : CUSTOM;
    let event = new Event(uid, t, title, desc, long, lat, []);
    getEventByUID(event.uid).then((e) => {
      if (e === null || e === {}) {
        addEvent(event);
        sendPush(nearbyTokens, new Event(uid, t, title, desc, long, lat, []));
      } else {
        alert('Dismiss ongoing event first!');
      }
    });
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
    setTemplate({});
    setDescription(e.target.value);
  };

  return (
    <div className='form-container'>
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
              className={`sos-list-item ${template === item ? 'active' : ''}`}
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
    </div>
  );
}
