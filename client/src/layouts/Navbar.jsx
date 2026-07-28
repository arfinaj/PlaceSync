function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 bg-[#0B1120]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <h1 className="text-2xl font-bold text-white">
          Place<span className="text-violet-500">Sync</span>
        </h1>

        <div className="hidden gap-10 text-gray-300 md:flex">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Companies</a>
          <a href="#">About</a>
        </div>

        <button
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;