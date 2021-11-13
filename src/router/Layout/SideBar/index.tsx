import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { getAppdata } from 'Src/store/feature/appSlice';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material';

// const data = [
//   // { icon: <mdiLanguageJavascript />, label: 'Authentication' },
//   // { icon: <Dns />, label: 'Database' },
//   // { icon: <PermMedia />, label: 'Storage' },
//   { label: 'Hosting' },
// ];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const BoxItem = (props: any) => {
  const { data, title } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      sx={{
        bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
        pb: open ? 2 : 0,
      }}
    >
      <ListItemButton
        alignItems='flex-start'
        onClick={() => setOpen(!open)}
        sx={{
          px: 3,
          pt: 2.5,
          pb: open ? 0 : 2.5,
        }}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: 'medium',
            lineHeight: '20px',
            mb: '2px',
          }}
          // secondary={}
          secondaryTypographyProps={{
            noWrap: true,
            fontSize: 12,
            width: 50,
            lineHeight: '16px',
            color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
          }}
          sx={{ my: 0 }}
        />
        <KeyboardArrowDown
          sx={{
            mr: -1,
            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
            transition: '0.2s',
          }}
        />
      </ListItemButton>
      {open &&
        data.map((item: any) => (
          <ListItemButton key={item.title} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <Dns />
            </ListItemIcon>
            <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} />
          </ListItemButton>
        ))}
    </Box>
  );
};

export default function CustomizedList() {
  const appdata = useSelector(getAppdata);

  return (
    <Box sx={{ display: 'flex' }} style={{ height: '100%' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }} style={{ borderRadius: '0' }}>
          <FireNav component='nav' disablePadding>
            <ListItemButton component='a' href='#customized-list'>
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary='Firebash'
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component='div' disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary='返回首页'
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <BoxItem data={appdata?.tagList} title='分类' />
            <BoxItem data={appdata?.labelList} title='标签' />
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
