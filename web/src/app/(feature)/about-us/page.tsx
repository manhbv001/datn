import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về chúng tôi - Techomies',
  description: `Welcome to Techomies - your ultimate destination for all things
  technology! We are a team of tech enthusiasts, writers, and geeks who
  are passionate about exploring and sharing the latest advancements,
  trends, and breakthroughs in the world of technology.`,
};

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 pb-12">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p>Write later</p>
      {/* <p className="text-lg">
        Welcome to Techomies - your ultimate destination for all things
        technology! We are a team of tech enthusiasts, writers, and geeks who
        are passionate about exploring and sharing the latest advancements,
        trends, and breakthroughs in the world of technology.
      </p>
      <p className="text-lg mt-4">
        Our mission is to simplify technology and make it accessible to
        everyone. We believe that technology has the power to transform lives
        and improve the world we live in. Whether you are a tech-savvy
        professional or just a curious beginner, Techomies has something for
        you.
      </p>
      <p className="text-lg mt-4">
        Our blog covers a wide range of tech-related topics, including:
      </p>
      <ul className="list-disc ml-8 text-lg mt-2">
        <li>Hardware reviews and comparisons</li>
        <li>Software and app recommendations</li>
        <li>Tech tutorials and guides</li>
        <li>Industry insights and analysis</li>
        <li>Gadget launches and updates</li>
        <li>Internet of Things (IoT) and smart devices</li>
        <li>Artificial Intelligence and Machine Learning</li>
        <li>Blockchain and cryptocurrencies</li>
      </ul>
      <p className="text-lg mt-4">
        At Techomies, we strive to deliver accurate, unbiased, and
        well-researched content. Our team of experienced writers and tech
        experts works tirelessly to keep you informed and up-to-date with the
        fast-paced tech landscape.
      </p>
      <p className="text-lg mt-4">
        We are grateful for the amazing tech community that supports us. Your
        engagement, feedback, and comments inspire us to continually improve and
        evolve our content.
      </p>
      <p className="text-lg mt-4">
        Thank you for being a part of Techomies. Together, lets embark on this
        exciting journey through the ever-changing world of technology!
      </p> */}
    </div>
  );
};

export default AboutUs;
