import {
  faMobileButton,
  faLaptopCode,
  faServer,
  faGears
} from "@fortawesome/free-solid-svg-icons";
import { IServiceItem } from "@/types";

const services: IServiceItem[] = [
  {
    title: "Mobile App Development",
    icon: faMobileButton,
    shortDescription:
      "I create high-performance applications for Android and iOS platforms, focusing on intuitive interfaces and seamless API integrations.",
    description:
      "I offer comprehensive mobile app development services, specializing in creating user-friendly and high-performance applications for both Android and iOS platforms. My expertise includes designing intuitive interfaces, developing robust backend systems, and ensuring seamless integration with various APIs. I focus on delivering responsive and engaging mobile experiences that meet the specific needs of my clients, utilizing the latest technologies and best practices to ensure optimal performance and user satisfaction.",
  },
  {
    title: "Web Development",
    icon: faLaptopCode,
    shortDescription:
      "I design and deploy interactive websites, emphasizing user-centric design and efficient implementation of modern web technologies.",
    description:
      "In web development, I excel at designing, developing, and deploying responsive and interactive websites. My expertise includes crafting user-centric designs, writing clean and efficient code, and implementing modern web technologies to enhance functionality and performance. I am committed to creating visually appealing and easy-to-navigate websites that deliver an exceptional user experience. Whether it's a simple website or a complex web application, I ensure that every project is completed to the highest standards, meeting the unique requirements of each client.",
  },
  {
    title: "Backend Development",
    icon: faServer,
    shortDescription:
      "I specialize in building secure and scalable server-side applications, including RESTful APIs and database management.",
    description:
      "I provide specialized backend development services focused on creating robust, secure, and scalable server-side applications. My expertise includes developing RESTful APIs, managing databases, and implementing authentication and authorization mechanisms. I ensure seamless data integration and efficient server performance, supporting the overall functionality and responsiveness of web and mobile applications. My backend solutions are designed to handle high traffic and large datasets, providing a reliable foundation for any application.",
  },
  {
    title: "Analysis and Management",
    icon: faGears,
    shortDescription:
      "I specialize in data-driven analysis and effective project management for organizational efficiency and success.",
    description:
      "I offer expert analysis and management services to help businesses optimize their operations and achieve their goals. My skills include conducting thorough data analysis to uncover insights, developing strategic plans, and managing projects to ensure timely and successful completion. I focus on identifying areas for improvement, streamlining processes, and implementing effective solutions. With a keen eye for detail and a strategic mindset, I provide valuable guidance and support to drive business growth and efficiency.",
  },
];

export default services;
