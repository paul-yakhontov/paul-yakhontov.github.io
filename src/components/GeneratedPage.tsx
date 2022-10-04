import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import { ResponsiveStyleValue } from '@mui/system';
import { ComponentProps } from '../store/store';

type Props = {
    component: ComponentProps[] | undefined;
    direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
}

const GenerateStack: React.FC<Props> = ({ component, direction }) => {
    if (component) {
        return (
            <Stack direction={direction} spacing={1} sx={{ padding: '1rem', justifyContent: 'space-around', marginBottom: '1rem' }} >
                <GenerateComponents component={component} />
            </Stack>
        )
    }
    return null;
}

const GenerateComponents: React.FC<Props> = ({ component }) => {
    return (
        <React.Fragment>
            {component && component.map((component, index) => {
                switch (component.name) {
                    case 'typography':
                        return (<Typography sx={component.sx} key={index} align={component.align} variant={component.variant} gutterBottom >
                            {component.paragraph}
                        </Typography>);
                    case 'divider':
                        return (<Divider
                            sx={component.sx}
                            key={index}
                            orientation={component.orientation}
                            textAlign={component.textAlign}
                            flexItem >
                            {component.paragraph}
                        </Divider>);
                    case 'stack':
                        return (<GenerateStack direction={component.direction} key={index} component={component.components} />);
                    case 'listItem':
                        return (<ListItem sx={component.sx} key={index}>{component.paragraph}</ListItem>);
                    case 'chip':
                        return (<Chip
                            key={index}
                            label={component.label}
                            sx={component.sx}
                            //component attribute left static based on opened issue with overload this component
                            component="a"
                            href={component.href}
                            clickable
                        />);
                    case 'avatar':
                        return (<Avatar sx={component.sx} key={index} alt={component.name} src={component.src} />);
                    default:
                        return null;
                }
            })}
        </React.Fragment>
    );
}


const GeneratedPage: React.FC<Props> = ({ component }) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ height: '100vh', paddingTop: '2vh' }}>
                    <GenerateComponents component={component} />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default GeneratedPage;