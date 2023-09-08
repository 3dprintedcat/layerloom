import React from 'react';
import { Card, Col, Row,Grid } from 'antd';

const { useBreakpoint } = Grid;

const themes = [
  // Prusa
  {
    name: 'Prusa Light',
    primaryColor: '#FF8A34',
    baseColor: '#E9E7E2', // Light beige
    textColor: '#333333'
  },
  {
    name: 'Prusa Dark',
    primaryColor: '#FF8A34',
    baseColor: '#2B2D2F', // Charcoal
    textColor: '#E0E0E0'
  },

  // Creality
  {
    name: 'Creality Light',
    primaryColor: '#339BFF',
    baseColor: '#EAF2F8', // Light sky blue
    textColor: '#333333'
  },
  {
    name: 'Creality Dark',
    primaryColor: '#339BFF',
    baseColor: '#1C2833', // Navy blue
    textColor: '#E0E0E0'
  },

  // Anycubic
  {
    name: 'Anycubic Light',
    primaryColor: '#339BFF',
    baseColor: '#D5E8D4', // Light mint
    textColor: '#333333'
  },
  {
    name: 'Anycubic Dark',
    primaryColor: '#339BFF',
    baseColor: '#154360', // Dark teal
    textColor: '#E0E0E0'
  },

  // Elegoo
  {
    name: 'Elegoo Light',
    primaryColor: '#E55A5A',
    baseColor: '#FAE5D3', // Peach
    textColor: '#333333'
  },
  {
    name: 'Elegoo Dark',
    primaryColor: '#E55A5A',
    baseColor: '#641E16', // Dark red
    textColor: '#E0E0E0'
  },

  // Flashforge
  {
    name: 'Flashforge Light',
    primaryColor: '#339BFF',
    baseColor: '#D4E6F1', // Pale blue
    textColor: '#333333'
  },
  {
    name: 'Flashforge Dark',
    primaryColor: '#339BFF',
    baseColor: '#1B4F72', // Deep blue
    textColor: '#E0E0E0'
  },

  // Dremel
  {
    name: 'Dremel Light',
    primaryColor: '#E86642',
    baseColor: '#FCF3CF', // Light yellow
    textColor: '#333333'
  },
  {
    name: 'Dremel Dark',
    primaryColor: '#E86642',
    baseColor: '#6E2C00', // Brown
    textColor: '#E0E0E0'
  },

  // Formlabs
  {
    name: 'Formlabs Light',
    primaryColor: '#505050',
    baseColor: '#D7DBDD', // Light gray
    textColor: '#333333'
  },
  {
    name: 'Formlabs Dark',
    primaryColor: '#505050',
    baseColor: '#424949', // Slate gray
    textColor: '#E0E0E0'
  }
];




export const ThemeGrid = () => {
  const screenSize = useBreakpoint();

  const setTheme = (theme) => {
    console.log(theme);
    localStorage.setItem('themeP', theme.primaryColor);
    localStorage.setItem('themeB', theme.baseColor);
    localStorage.setItem('themeT', theme.textColor);
    window.location.reload();
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={[8,8]}>
        {themes.map((theme, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
            <Card
              hoverable
              style={{ 
                backgroundColor: theme.baseColor, 
                color: theme.textColor, 
                borderColor: theme.primaryColor,
                borderWidth: '5px', // Adjust this value to change the border thickness
                borderStyle: 'solid' // This ensures the border is solid
              }}
              onClick={() => setTheme(theme)}
            >
              <Card.Meta 
                title={<span style={{ color: theme.textColor }}>{theme.name}</span>} 
                description={<span style={{ color: theme.textColor }}>Click to set this theme</span>} 
              />

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
