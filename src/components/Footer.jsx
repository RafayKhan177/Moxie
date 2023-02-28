import Logo from "../assets/logo (copy).png";

const Footer = () => {
  return (
    <footer class="p-4 bg-color_teal rounded-lg shadow md:px-6 md:py-8 ">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
          <img
            src={Logo}
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-color_skin sm:mb-0">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-color_orange sm:mx-auto  lg:my-8" />
      <span class="block text-sm text-color_skin sm:text-center ">
        © 3{" "}
        <a  class="hover:underline">
          RAFAY KHAN™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
