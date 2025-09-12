'use client';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { Card, CardContent } from '@mui/material';
import { HistoryContext } from '@/contexts/HistoryContext';
import parse from "html-react-parser";

const drawerWidth = 400;
const navItems = ['Recent'];

function DrawerAppBar(props) {
    const { chatHistory, addHistory } = useContext(HistoryContext);
    console.log(chatHistory);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const historyList = (
        [...chatHistory]?.reverse().map(element => (
            <Card key={element[0].parts[0].text} className='m-2'>
                <CardContent sx={{ height: '100%' }}>
                    <Typography variant="h5" component="div">
                        {element[0]?.parts[0].text || "No prompt"}
                    </Typography>
                    <Typography variant="body2" component="div" color='text.secondary'>
                        {`${element[1]?.parts?.[0].text.slice(0, 50)} ${element[1]?.parts?.[0].text.length > 50 ? '...' : ''}` || "No description noted"}
                    </Typography>
                </CardContent>
            </Card>
        ))
    )

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                History
            </Typography>
            <Divider />
            <List>
                {historyList}
            </List>
        </Box>
    );


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        My Next-JS Chatbot
                    </Typography>
                    <Box>
                        <Button sx={{ color: '#fff' }} onClick={handleDrawerToggle}>
                            History
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    anchor='right'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
