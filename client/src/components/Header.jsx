import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="flex justify-center items-center px-8 py-4 mx-auto absolute top-0 bg-black z-10 w-full">
        <Link to="/" className="text-white flex font-bold text-3xl">
          Welcome to Word Hunt
        </Link>
      </header>
    </div>
  );
};

export default Header;
