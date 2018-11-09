

//==============================================================================

//-- Dependencies --------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './utilities/reset.css';
import './index.css';
import {ProjectList, ProjectViewer} from './project.js';

//-- Constants -----------------------------------
export const URL_BASE     = 'http://localhost:8080';
export const URL_PROJECTS = URL_BASE + '/users'    ;

//-- Mounting ------------------------------------
const applicationStructure = (
    <Router><React.Fragment>
        <Route exact path="/" component={ProjectList} />
        <Route path="/projects/:id" component={ProjectViewer} />
    </React.Fragment></Router>
);
ReactDOM.render(applicationStructure, document.getElementById('root'));
