import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { aws } from '../AWS.js';
import Header from '../components/Header.js'

function AdminHomepage() {
    const [projects, updateProjects] = useState();
    const getProjects = () => {
        aws.get('/adminProjects')
        .then(response => {
            const projects = response.data.body.projects;
            updateProjects( projects );
        })
    }

    const renderProjects = () => {
        const renderedProjects = projects.map((project, index) => {
            return (
                <Container key={index}>
                    { project.projectName }
                </Container>
            )
        });
        return renderedProjects;
    }
    if (typeof projects === 'undefined') {
        return (
            <>
                <Header showAccountButtons={ false } loggedIn={ true } />
                <p>Loading projects...</p>
                { getProjects() }
            </>
        )
    }
    else return (
        <>
            <Header showAccountButtons={ false } loggedIn={ true } />
            { renderProjects() }
        </>
    );
}

export default AdminHomepage;