import Navbar from "./Navbar/Navbar";

function Base({ title = "Welcome to our Website", children }) {
  return (
    <div className="base">
      <Navbar />
      {/* <Navbar />
      {children}
      <Footer /> */}
    </div>
  );
}

export default Base;
