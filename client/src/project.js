

//== Project Viewing Components ================================================

//-- Dependencies --------------------------------
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {URL_PROJECTS} from './index.js';
import List from './utilities/list.js';
import Loading from './utilities/loading.js';


//== Full List of Projects ========================================================

export function ProjectList() {
    return (
        <div class="project-list">
            <h1></h1>
            <List
                listUrl={URL_PROJECTS}
                itemComponent={ProjectListItem}
            />
        </div>
    );
}
function ProjectListItem({item}) {
    // Url Details does not use URL_PROJECTS, as URL_PROJECTS is the _API_ url
    const urlDetails = `/projects/${item.id}`;
    return (
        <Link to={urlDetails}>
            {item.name}
        </Link>
    )
}


//== Detailed Project View ========================================================

export class ProjectViewer extends React.Component {

    //-- Lifecycle -----------------------------------
    constructor() {
        super(...arguments);
        this.state = {
            project: null ,
            ready  : false,
        };
    }
    componentDidMount() {
        const projectId = this.props.match.params.id;
        const urlProjectData  = URL_PROJECTS + '/' + projectId;
        // Get basic Project Data:
        axios.get(urlProjectData)
        .then(response => {
            let data = response.data;
            this.setState({
                project : data,
                ready: true,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    //-- Rendering -----------------------------------
    render() {
        //
        const projectId = this.props.match.params.id;
        const urlProjectActions = `${URL_PROJECTS}/${projectId}/actions`;
        //
        let loadingProject;
        if(!this.state.ready){ loadingProject  = <Loading />;}
        //
        return (
            <div className="project-viewer">
                {loadingProject || <ProjectDetails project={this.state.project} />}
                <List
                    listUrl={urlProjectActions}
                    itemComponent={Action}
                />
            </div>
        )
    }
}


//== Supplementary Components ==================================================

function ProjectDetails({project}) {
    return (
        <div className="project-details">
            <h1>{project.name}</h1>
        </div>
    );
}
function Action({item}){
    return (
        <div className="action">
            "{item.text}"
        </div>
    );
}
