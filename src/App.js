import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Select, Input, Button, Alert, theme,ConfigProvider, Modal, Space, Typography, Watermark } from 'antd';
import 'antd/dist/reset.css';
import { ThemeGrid } from './ThemeGrid';

const { Option } = Select;

const { useToken } = theme;

// Define a function to set the theme in local storage
export const setTheme = (custTheme) => {
  console.log(custTheme);
  localStorage.setItem('themeP', custTheme[0].primaryColor);
  localStorage.setItem('themeB', custTheme[0].baseColor);
  localStorage.setItem('themeT', custTheme[0].textColor);
};

// Define a function to get the theme from local storage
export const getTheme = () => {
  // Check if the theme exists in local storage
  if (localStorage.getItem('themeP') === undefined){
    // Set the default theme
    setTheme({primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'});
  }
  document.documentElement.style.setProperty('--primaryColor', localStorage.getItem('themeP'));
  document.documentElement.style.setProperty('--baseColor', localStorage.getItem('themeB'));
  document.documentElement.style.setProperty('--textColor', localStorage.getItem('themeT'));
  // Return the theme from local storage
  return({
    primaryColor:localStorage.getItem('themeP'),
    baseColor:localStorage.getItem('themeB'),
    textColor:localStorage.getItem('themeT')
  });
};


const FILAMENT_DENSITIES = {
  PLA: 1.24,
  ABS: 1.04,
  PETG: 1.27,
  TPU: 1.21
};

function App() {
  const [custTheme, setcustTheme] = useState(
    getTheme() || {primaryColor:'#7FB069',baseColor:'#282c34',textColor:'#cccccc'}
  );
  const [filamentType, setFilamentType] = useState('PLA');
  const [length, setLength] = useState('');
  const [costPerKg, setCostPerKg] = useState('');
  const [marginPercent, setMarginPercent] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [machineCostPerHour, setMachineCostPerHour] = useState('');
  const [estimatedPrintHours, setEstimatedPrintHours] = useState('');
  const [estimatedPrintMinutes, setEstimatedPrintMinutes] = useState('');
  const [weight, setWeight] = useState(null);
  const [price, setPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const calculateWeightAndPrice = () => {
    const radius = 1.75 / 2 / 10;
    const volume = Math.PI * Math.pow(radius, 2) * length * 100;
    const calculatedWeight = volume * FILAMENT_DENSITIES[filamentType];
    setWeight(calculatedWeight.toFixed(2));
    
    const totalTimeInHours = parseFloat(estimatedPrintHours) + (parseFloat(estimatedPrintMinutes) / 60);
    const basePrice = (calculatedWeight / 1000) * costPerKg + parseFloat(electricityCost) + (machineCostPerHour * totalTimeInHours);
    const margin = (marginPercent / 100) * basePrice;
    const calculatedFinalPrice = basePrice + margin;
    
    setPrice(basePrice.toFixed(2));
    setFinalPrice(calculatedFinalPrice.toFixed(2));
  };

  return (
    <ConfigProvider 
        theme={{
          token: {
            // Set the theme colors using state
            colorPrimary:custTheme?.primaryColor || '#7FB069',
            colorBgBase:custTheme?.baseColor || '#282c34',
            borderRadius:"8px",
            colorTextBase:custTheme?.textColor || '#cccccc',
            colorInfo:"#6CA6C1",
            colorError:"#EF767A",
            colorSuccess:'#7FB069',
            colorWarning:'#EDAE49'
          },
        }}
      >
    <div style={{ padding: '50px', backgroundColor: custTheme?.baseColor, height:"100vh", overflow:"hidden"}} zIndex={1}>
      <Typography.Title level={1} style={{ textAlign: 'center', color: custTheme?.textColor }}>
            LayerLoom - 3D Print Cost Calculator
        </Typography.Title>
      <Select defaultValue="PLA" onChange={value => setFilamentType(value)}>
        {Object.keys(FILAMENT_DENSITIES).map(type => (
          <Option key={type} value={type}>{type}</Option>
        ))}
      </Select>
      <Modal title="Color Settings" open={isModalOpen} width={'70%'} onCancel={handleCancel} footer={[]}>
        
      <Space  direction="vertical">
      <ThemeGrid/>
        </Space>
      </Modal>
      <Input 
        type="number"
        placeholder="Enter length in meters"
        value={length}
        onChange={e => setLength(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <Input 
        type="number"
        placeholder="Enter cost per kg"
        value={costPerKg}
        onChange={e => setCostPerKg(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <Input 
        type="number"
        placeholder="Enter machine cost per hour"
        value={machineCostPerHour}
        onChange={e => setMachineCostPerHour(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input 
          type="number"
          placeholder="Hours"
          value={estimatedPrintHours}
          onChange={e => setEstimatedPrintHours(e.target.value)}
          style={{ width: '48%', marginRight: '4%' }}
        />
        <Input 
          type="number"
          placeholder="Minutes"
          value={estimatedPrintMinutes}
          onChange={e => setEstimatedPrintMinutes(e.target.value)}
          style={{ width: '48%' }}
        />
      </div>
      <Input 
        type="number"
        placeholder="Enter margin percentage"
        value={marginPercent}
        onChange={e => setMarginPercent(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <Input 
        type="number"
        placeholder="Enter electricity cost"
        value={electricityCost}
        onChange={e => setElectricityCost(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <Button type="primary" onClick={calculateWeightAndPrice}>Calculate</Button>
      <Button type="secondary" onClick={showModal}>Themes</Button>
      {weight && (
        <Alert 
          message={`The weight is approximately ${weight} grams.`}
          type="info"
          style={{ margin: '10px 0' }}
        />
      )}
      {price && (
        <Alert 
          message={`The base price (including electricity and machine time) is $${price}.`}
          type="warning"
          style={{ margin: '10px 0' }}
        />
      )}
      {finalPrice && (
        <Alert 
          message={`The final price (after margin) is $${finalPrice}.`}
          type="success"
          style={{ margin: '10px 0' }}
        />
      )}
    </div>
    </ConfigProvider>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
