import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import RouteForm from './components/RouteForm';
import Dashboard from './components/Dashboard';

function App() {
    const [tabIndex, setTabIndex] = useState(0);
    const [polylines, setPolylines] = useState([]);

    return (
        <div>
            <h1>Optimized Logistics by Translogi</h1>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Route Form</Tab>
                    <Tab>Dashboard</Tab>
                </TabList>

                <TabPanel>
                    <RouteForm setTabIndex={setTabIndex} setPolylines={setPolylines} />
                </TabPanel>
                <TabPanel>
                    <Dashboard polylines={polylines} />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default App;