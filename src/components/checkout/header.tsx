import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-xl font-bold text-[#ec1b21]">Small Room Soul</h1>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="hidden h-8 w-8 rounded-full bg-gray-200 sm:block"></div>
          <span className="hidden text-sm font-medium sm:block">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
