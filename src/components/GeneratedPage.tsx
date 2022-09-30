import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import { ComponentProps } from '../store/store';

type Props = {
    component: ComponentProps[] | undefined;
}

const GenerateStack: React.FC<Props> = ({ component }) => {
    console.log('component', component);
    return (
        <Stack direction="row" spacing={1} sx={{ padding: '1rem', justifyContent: 'space-around', marginBottom: '1rem' }} >
            {component?.map((item, index) => {
                switch (item.name) {
                    case 'chip':
                        return (<Chip
                            key={index}
                            label={item.label}
                            sx={{
                                backgroundColor: 'transparent',
                            }}
                            //component attribute left static based on opened issue with overload this component
                            component="a"
                            // color={item.color}
                            href={item.href}
                            clickable
                        />);
                    case 'divider':
                        return (<Divider key={index} orientation={item.orientation} flexItem />);
                }
            })}
        </Stack>
    );
}

const GeneratedPage: React.FC<Props> = ({ component }) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ height: '100vh' }}>
                    {component && component.map((component, index) => {
                        switch (component.name) {
                            case 'typography':
                                return (<Typography key={index} variant={component.variant} gutterBottom >
                                    {component.paragraph}
                                </Typography>);
                            case 'divider':
                                return (<Divider
                                    sx={{ color: 'primary.main', fontSize: '1.5rem', fontWeight: 700 }}
                                    key={index}
                                    textAlign={component.textAlign}>
                                    {component.paragraph}
                                </Divider>);
                            case 'stack':
                                return (<GenerateStack key={index} component={component.components} />);
                            case 'listItem':
                                return (<ListItem key={index}>{component.paragraph}</ListItem>)
                        }
                    })}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default GeneratedPage;