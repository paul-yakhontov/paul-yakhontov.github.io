import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ComponentProps } from '../store/store';



type Props = {
    component: ComponentProps[] | undefined;
}

const GeneratedPage: React.FC<Props> = ({ component }) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    {component && component.map((component, index) => (
                        <Typography key={index} variant={component.variant} gutterBottom >
                            {component.paragraph}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default GeneratedPage;