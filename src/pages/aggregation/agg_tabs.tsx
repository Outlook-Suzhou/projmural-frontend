import React, { ChangeEventHandler, useEffect, useMemo } from 'react';
import 'antd/dist/antd.css';
import { Input, Tabs } from 'antd';
import PaintingContent from '../../components/painting_content/painting_content';
import './agg_tabs.scss';

const { TabPane } = Tabs;

interface Props {
  docsArray: Array<any>;
  onTabChange: any,
  onSearch?: ChangeEventHandler;
}

const AggTabs: React.FC<Props> = ({ docsArray, onTabChange, onSearch }: Props) => {
  const SearchTextBox = useMemo(() => (
    <Input
      placeholder="Type words to filter"
      defaultValue=""
      onChange={onSearch}
      className="tabsSearch"
    />
  ), [onSearch]);
  useEffect(() => { }, []);
  return (
    <div>
      <Tabs
        tabBarExtraContent={SearchTextBox}
        defaultActiveKey="1"
        className="tabsStyle"
        centered
        tabPosition="top"
        tabBarGutter={20}
        onChange={onTabChange}
      >
        {(docsArray || []).map((doc) => (
          <TabPane
            tab={(<div className="tabsFont">{doc.value.data.canvaName}</div>)}
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
