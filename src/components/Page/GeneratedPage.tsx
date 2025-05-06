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
import { ResponsiveStyleValue, SystemStyleObject } from '@mui/system';
import { ComponentProps } from '@store/store';
import {
    containerSx,
    aboutRowSx,
    sectionSx,
  } from './GeneratedPage.styles';
  

interface GenerateStackProps {
  components: ComponentProps[];
  direction?: ResponsiveStyleValue<
    'row' | 'row-reverse' | 'column' | 'column-reverse'
  >;
  sx?: SystemStyleObject;
}

const GenerateStack: React.FC<GenerateStackProps> = ({ components, direction,  sx = {} }) => {

      return (
        <Stack
            direction={direction}
            spacing={1}
            sx={sx}
        >
            <GenerateComponents components={components} />
        </Stack>
)};
interface GenerateComponentsProps {
  components: ComponentProps[];
}

const GenerateComponents: React.FC<GenerateComponentsProps> = ({ components }) => (
  <>
    {components.map((c, i) => {
      switch (c.name) {
        case 'typography':
          return (
            <Typography
              key={i}
              align={c.align}
              variant={c.variant}
              gutterBottom
              sx={c.sx}
            >
              {c.paragraph}
            </Typography>
          );

        case 'divider':
          return (
            <Divider
              key={i}
              sx={c.sx}
              orientation={c.orientation}
              textAlign={c.textAlign}
              flexItem
            >
              {c.paragraph}
            </Divider>
          );

        case 'stack':
          return (
            <GenerateStack
              key={i}
              direction={c.direction}
              components={c.components!}
              sx={c.sx}
            />
          );

        case 'listItem':
          return (
            <ListItem key={i} sx={c.sx}>
              {c.paragraph}
            </ListItem>
          );

        case 'chip':
          return (
            <Chip
              key={i}
              label={c.label}
              sx={c.sx}
              component="a"
              href={c.href}
              clickable
            />
          );

        case 'avatar':
          return (
            <Avatar
              key={i}
              alt={c.alt || ''}
              src={c.src}
              sx={c.sx}
            />
          );

        case 'box':
          return (
            <Box key={i} sx={c.sx}>
              <GenerateComponents components={c.components!} />
            </Box>
          );

        case 'image':
          return (
            <Box
              key={i}
              component="img"
              src={c.src}
              alt={c.alt || ''}
              sx={c.sx}
            />
          );

        default:
          return null;
      }
    })}
  </>
);

interface GeneratedPageProps {
  component?: ComponentProps[];
}

const GeneratedPage: React.FC<GeneratedPageProps> = ({ component = []}) => {
  const first = component[0];
  const rest = component.slice(1);

  const isAbout =
    first?.name === 'stack' && typeof first.direction !== 'undefined';

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={containerSx}>
        {isAbout ? (
          <>
            <Box sx={aboutRowSx}>
              <GenerateComponents components={[first!]} />
            </Box>

            <Box>
              <GenerateComponents components={rest} />
            </Box>
          </>
        ) : (
        <Box sx={sectionSx}>
            <GenerateComponents components={component} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default GeneratedPage;
