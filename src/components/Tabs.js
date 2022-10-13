import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Coleccion from './Coleccion';
import { useNFTsByOwner, useNFTsCollection } from '../hooks/useNfTData';
import { CircularProgress } from '@mui/material';
import Comprar from './Comprar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ account }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";
 
  const { nfts, loadingNftsC } = useNFTsCollection(contractPolygon);
	const { nftsAccount, loadingNftsO } = useNFTsByOwner({contractPolygon, account});

  return (
    <>
        <div>Direcion de cuenta</div>
        <p>{account}</p>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
            <Tab label="Coleccion" {...a11yProps(0)} />
            <Tab label="Dueño" {...a11yProps(1)} />
            <Tab label="Comprar" {...a11yProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {loadingNftsC ? (
                <Box display="flex" justifyContent="center">
                 <CircularProgress />
               </Box>

            ):(
                <Coleccion nfts={nfts} />
            )}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {loadingNftsO  ? (
                <Box display="flex" justifyContent="center">
                 <CircularProgress />
               </Box>

            ):(
                <Coleccion nfts={nftsAccount} owner={true}/>
            )}
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Comprar contract={contractPolygon} account={account}/>
        </TabPanel>
        </Box>
    </>
  );
}
