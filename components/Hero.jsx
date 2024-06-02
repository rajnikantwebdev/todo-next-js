// its is going to have all the components used on the main page

import BlogCard from "./BlogCard";
import AddBlogIcon from "./AddBlogIcon";
const Hero = () => {
  return (
    <section className="flex justify-center gap-8 py-8">
      <AddBlogIcon />
      <BlogCard />
      <BlogCard />
    </section>
  );
};

export default Hero;
