import NavBar from "./navbar";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
