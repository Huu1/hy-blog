import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import './index.scss';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const ScrollBar = (props: {
  onTagChange: (event: React.SyntheticEvent, newValue: number) => void;
  tagList: any[];
  currentTag: string;
  value: any;
}) => {
  const { onTagChange, tagList = [], currentTag, value } = props;
  return (
    <div className='scrollBar-wrap'>
      {/* <span onClick={() => onTagChange('')} className={`${!currentTag ? 'checked' : ''} item`}>
        全部
      </span>
      {tagList.map((tag: any) => {
        return (
          <span
            onClick={() => onTagChange(tag.tagId)}
            className={`${currentTag === tag.tagId ? 'checked' : ''} item`}
            key={tag.id}
          >
            {tag.title}
          </span>
        );
      })} */}
      <Tabs
        value={value}
        onChange={onTagChange}
        indicatorColor='secondary'
        textColor='inherit'
        variant='scrollable'
        aria-label='full width tabs example'
      >
        <Tab label='Item One' {...a11yProps(0)} />
        <Tab label='Item Two' {...a11yProps(1)} />
        <Tab label='Item Three' {...a11yProps(2)} />
        <Tab label='Item Three' {...a11yProps(3)} />
        <Tab label='Item Three' {...a11yProps(4)} />
      </Tabs>
    </div>
  );
};

export default React.memo(ScrollBar);
