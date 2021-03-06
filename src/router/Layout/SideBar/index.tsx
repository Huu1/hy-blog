import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Label from '@mui/icons-material/Label';
import { withRouter } from 'react-router';
import menuList, { IMenu } from 'Src/config/menu';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import { toggleSideDrawerVisible } from 'Src/store/feature/appSlice';
import { getUser } from 'Src/store/feature/userSlice';

const IconMap: any = {
  label: <Label />,
  home: <Label />,
  tag: <Label />,
};

const UserInfo = () => {
  const user = useSelector(getUser);
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(5, 30, 52)' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '2px',
            color: 'rgba(255,255,255,0.5)',
          }}
          secondaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '2px',
            color: 'rgba(255,255,255,0.5)',
          }}
          primary={user?.username}
          secondary='Jan 9, 2014'
        />
      </ListItem>
    </List>
  );
};

const AppMenu = (props: any) => {
  const { history } = props;
  const dispatch = useDispatch();
  const itemClick = (path: string) => {
    dispatch(toggleSideDrawerVisible());
    history.push(path);
  };
  return (
    <Box sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'rgb(5, 30, 52)', padding: '.5rem' }}>
      {/* <UserInfo />
      <Divider /> */}
      <List>
        {menuList.map((menu: IMenu) => {
          return (
            <ListItem disablePadding key={menu.title} onClick={() => itemClick(menu.path)}>
              <ListItemButton>
                <ListItemIcon style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {IconMap[menu.icon] || <Label />}
                </ListItemIcon>
                <ListItemText
                  primary={menu.title}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
};

export default withRouter(AppMenu);
