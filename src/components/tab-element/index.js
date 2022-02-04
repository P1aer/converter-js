import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.scss'
import React from "react";
import './index.scss'
import {Convert} from "./tabs/convert";
import {Send} from "./tabs/send";
import {History} from "./tabs/history";

export const TabMenu = ({ set, values }) => {

   return (
        <Tabs>
            <TabList>
                <Tab>Converter</Tab>
                <Tab>Send</Tab>
                <Tab>History</Tab>
            </TabList>
            <TabPanel>
                <Convert set={set} values={values}/>
            </TabPanel>
            <TabPanel>
              <Send values={values} set={set}/>
            </TabPanel>
            <TabPanel>
                <History/>
            </TabPanel>
        </Tabs>
    )
};
