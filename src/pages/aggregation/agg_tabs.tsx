import React, { ChangeEventHandler, useEffect, useMemo } from 'react';
import 'antd/dist/antd.css';
import {
  Tooltip, Input, Tabs, Divider,
} from 'antd';
import Text from '../../components/input/painting_content_title';
import ToolBar from '../../components/tool_bar/tool_bar';
import AvatarArea from '../../components/avatar/avatar_self';
import AvatarUser from '../../components/avatar/avatar_user';
import PaintingContent from '../../components/painting_content/painting_content';
import './agg_tabs.scss';

const { TabPane } = Tabs;

interface Props {
  docsArray: Array<any>;
  onTabChange: any;
  activeKey: string;
  currentDoc: any;
  goHome: Function;
  onSearch?: ChangeEventHandler;
}

const AggTabs: React.FC<Props> = ({
  docsArray, onTabChange, activeKey, currentDoc, onSearch, goHome,
}: Props) => {
  const Home = useMemo(() => {
    console.log(docsArray, currentDoc);
    return (
      <div className="slotName">
        <Tooltip title="go to dashboard">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <p
            className="p1"
            onClick={() => goHome()}
          >
            Dashboard
          </p>
        </Tooltip>
        <Divider type="vertical" style={{ fontSize: '50px' }} />
      </div>
    );
  }, [docsArray, currentDoc]);
  const AvatarBar = useMemo(() => {
    console.log('');
    return (
      <ToolBar list={[AvatarArea, AvatarUser]} BarType="avatar" />
    );
  }, []);
  const SearchTextBox = useMemo(() => (
    <Input
      placeholder="Type words to filter"
      defaultValue=""
      onChange={onSearch}
      className="tabsSearch"
    />
  ), [onSearch]);
  const slot = useMemo(() => ({
    left: Home,
    right: (
      <div>
        {AvatarBar}
        {SearchTextBox}
      </div>),
  }), [SearchTextBox]);

  useEffect(() => { }, []);
  return (
    <div>
      <Tabs
        tabBarExtraContent={slot}
        defaultActiveKey="1"
        activeKey={activeKey}
        className="tabsStyle"
        centered
        tabPosition="top"
        tabBarGutter={20}
        onChange={onTabChange}
      >
        {(docsArray || []).map((doc) => (
          <TabPane
            tab={(<Text className="canvasName" doc={doc} />)}
            key={doc.value.id}
          >
            <PaintingContent docObj={doc} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
AggTabs.defaultProps = {
  onSearch: () => { },
};

export default AggTabs;
