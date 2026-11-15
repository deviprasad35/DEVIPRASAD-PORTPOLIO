/**
 * projects.js — Static project data.
 *
 * Replace placeholder values (marked with TODO) with your actual projects.
 * Images should be placed in /public/screenshots/ and referenced by filename.
 *
 * Shape expected by the future backend:
 * {
 *   title: string,
 *   description: string,
 *   techStack: string[],
 *   image: string (path or URL),
 *   liveUrl: string,
 *   githubUrl: string,
 *   featured: boolean,
 *   order: number,
 * }
 */

const projects = [
  {
    id: '1',
    title: '[Featured Project Title]', // TODO: replace
    description:
      'A full-stack web application built with the MERN stack. This project demonstrates end-to-end development including authentication, REST APIs, and a responsive React frontend.', // TODO: replace
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    image: '/screenshots/project-1.png', // TODO: add screenshot
    liveUrl: '#', // TODO: replace with live URL
    githubUrl: '#', // TODO: replace with GitHub URL
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: '[Project Two Title]', // TODO: replace
    description:
      'A React-based application with dynamic UI components, state management, and API integration.',
    techStack: ['React', 'JavaScript', 'CSS3', 'REST API'],
    image: '/screenshots/project-2.png', // TODO: add screenshot
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    order: 2,
  },
  {
    id: '3',
    title: '[Project Three Title]', // TODO: replace
    description:
      'A Node.js backend service with Express, MongoDB, JWT authentication and RESTful API design.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    image: '/screenshots/project-3.png', // TODO: add screenshot
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    order: 3,
  },
];

export default projects;
