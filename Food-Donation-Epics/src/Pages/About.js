import React from "react";
import Base from "../Components/Base";
import HomeBase from "./HomeBase";
import TeamMembers from "./TeamMembers";
const aboutSection = [
  {
    id: 1,
    name: "MOTTO",
    description:
      "To combat food waste and alleviate hunger, our mission is to create an inclusive online platform that bridges the gap between surplus food providers and those facing food insecurity. We strive to empower communities to share resources, foster compassion, and build a sustainable future.",
    photo: "download.jpeg",
  },
  {
    id: 2,
    name: "VISION",
    description:
      "Our vision is to cultivate a world where no one goes hungry, and where surplus food is a catalyst for positive change. Through our website, we aim to establish a thriving network that not only redistributes excess food but also promotes awareness about sustainable consumption. Together, we envision building a compassionate community dedicated to eradicating hunger and minimizing food waste.",
    photo: "th.jpeg",
  },
  {
    id: 3,
    name: "ACHIEVEMENTS",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae incidunt aperiam suscipit id porro est laboriosam dignissimos dolore quod repellendus voluptatum officia fugit nulla nostrum sint hic neque, itaque voluptate!",
    photo: "download2.jpeg",
  },
];

const teamMembersData = [
  {
    name: "Saksham Agrawal",
    title: "Frontend, Backend, Integration",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Aditya Lala",
    title: "Backend, Documentation",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Sarthak Mishra",
    title: "Frontend, Documentation",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Sanskar Babel",
    title: "Frontend, Backend",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Anshul",
    title: "Documentation",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Zuhair",
    title: "Documentation",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  {
    name: "Aryavardhan Jain",
    title: "Frontend, Backend, Integration",
    imageUrl:
      "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
    socialLinks: [
      { icon: "mdi-linkedin", url: "#" },
      { icon: "mdi-twitter", url: "#" },
      { icon: "mdi-instagram", url: "#" },
    ],
  },
  // Add more team members here...
];
function About() {
  const list = aboutSection;
  // const size = aboutSection.length;
  return (
    <>
      <Base />
      <HomeBase />
      <div className="bg-yellow-100 mt-0">
        <ul className="bg-yellow-100 block overflow-hidden">
          {list.map((about) => (
            <Abt abtObj={about} key={about.id} />
          ))}
        </ul>
        <h1 class="text-gray-900 bg-yellow-100 text-4xl font-bold ml-[500px] pb-[50px]">
          Meet the Team
        </h1>
      </div>

      <div className="flex flex-wrap bg-yellow-100">
        {teamMembersData.map((member, index) => (
          <TeamMembers key={index} {...member} />
        ))}
      </div>
    </>
  );
}

function Abt({ abtObj }) {
  return (
    <li className="flex m-[100px] gap-12 shadow-lg rounded-lg">
      <img
        className="h-48 w-48 object-cover border-4 border-white rounded-lg m-3"
        src={abtObj.photo}
        alt="salamino"
      />
      <div className="flex flex-col p-1 gap-2 mt-4">
        <h3 className="font-normal font-mono text-3xl underline">
          {abtObj.name}
        </h3>
        <p className="font-bold font-mono">{abtObj.description}</p>
      </div>
    </li>
  );
}
export default About;
