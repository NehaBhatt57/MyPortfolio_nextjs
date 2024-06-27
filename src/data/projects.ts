import { IProjectItem, ProjectType, RepoType } from "@/types";

const projects: IProjectItem[] = [
  {
    id: "social-media-app-reactnative",
    title: "Social Media App",
    description:
      "An app built in React Native offers cross-platform compatibility, native performance, and efficient development with a single JavaScript codebase.",
    icon: "/skills/reactnative.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/NehaBhatt57/social-media-app-reactnative",
    url: "https://github.com/NehaBhatt57/social-media-app-reactnative/releases",
    tags: ["ReactNative", "JavaScript", "ReactJS" , "Agora SDK"],
  },
  {
    id: "e-commerce-app-mern",
    title: "E-commerce App",
    description:
      "An e-commerce web application developed using React.js, Material UI, Redux, and Stripe.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/NehaBhatt57/ecommerce-web-reactjs",
    url: "https://NehaBhatt57.vercel.app",
    tags: ["React.js", "Redux", "Material UI", "Stripe"],
  },
  {
    id: "video-calling-app-reactnative",
    title: "Video Calling App",
    description:
      "A React Native video calling app facilitates real-time video communication across iOS and Android with native performance and a unified codebase.",
    icon: "/skills/reactnative.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/NehaBhatt57/video-calling-app-reactnative",
    url: "https://github.com/NehaBhatt57/video-calling-app-reactnative/releases",
    tags: ["ReactNative", "JavaScript", "ReactJS", "Agora SDK"],
  },
  {
    id: "social-media-api-nodejs",
    title: "Social Media API",
    description:
      "An RESTful API developed using Node.js, Express.js and MongoDB to integrate backend and frontend with ease.",
    icon: "/skills/nestjs.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/NehaBhatt57/social-media-api-nodejs",
    tags: ["Node.js", "Express.js", "MongoDB", "WebSocket"],
  },
  {
    id: "e-commerce-api-nodejs",
    title: "E-commerce API",
    description:
      "An RESTful API developed using Node.js, Express.js, MongoDB, and Stripe to integrate e-commerce backend.",
    icon: "/skills/nodejs.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/NehaBhatt57/ecommerce-api-nodejs",
    tags: ["Node.js", "Express.js", "MongoDB", "Stripe"],
  },
];

export default projects;

export function getProjectName(id: string) {
  const item = projects.find((e) => e.id === id);

  if (!item) return null;

  return item.title;
}

export function getProjectDetails(id: string): IProjectItem | null {
  const item = projects.find((e) => e.id === id);

  if (!item) return null;

  return item;
}
