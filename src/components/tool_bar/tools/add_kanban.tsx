/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import {
  DatePicker,
  InputNumber, Modal, Select, Tooltip,
} from 'antd';
import addKanBan from '../../../utils/add_kanban';
import { useStateStore } from '../../../store/store';

const AddKanBan: React.FC<{}> = () => {
  const state = useStateStore();
  const [journeyMapModalVisible, setJourneyMapModalVisible] = useState(false);
  const [kanban, setKanban] = useState({
    teamNum: 3, start: '1', end: '1', unit: 'day', isFirst: false,
  });
  const size = ['month', 'week', 'day'];
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const handleOk = () => {
    addKanBan(kanban, state.currentDoc);
    setJourneyMapModalVisible(false);
  };
  function onChangeTeamNum(value: number) {
    setKanban({ ...kanban, teamNum: value });
  }
  function onChangeSize(value: string) {
    setKanban({ ...kanban, unit: value });
  }
  function onChangeDate(date: any) {
    setKanban({ ...kanban, start: date[0].format(), end: date[1].format() });
    console.log(kanban);
  }
  return (
    // eslint-disable-next-line object-curly-newline
    <div className="tool_icon">
      <Tooltip title="项目看板">
        <Icon
          iconName="Calendar"
          onClick={() => {
            setJourneyMapModalVisible(true);
          }}
        />
      </Tooltip>
      <Modal title="Please input journey map info" visible={journeyMapModalVisible} onOk={handleOk} onCancel={() => { setJourneyMapModalVisible(false); }}>
        <div>
          <>Input the total number of teams:</>
          <InputNumber min={2} max={20} value={kanban.teamNum} onChange={onChangeTeamNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
        </div>
        <div>
          <>Input the the start-stop time of the project</>
          <Select defaultValue="day" style={{ width: 120 }} onChange={onChangeSize}>
            {size.map((unit) => (
              <Option value={unit}>{unit}</Option>
            ))}
          </Select>
          {/* @ts-ignore */}
          <RangePicker picker={kanban.unit === 'week' ? 'date' : kanban.unit} onChange={onChangeDate} style={{ marginTop: '20px' }} />
        </div>
      </Modal>
    </div>

  );
};
export default AddKanBan;
