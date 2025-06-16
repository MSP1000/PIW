import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("/new", "routes/new.jsx"),
  route("edit:id", "routes/edit-book.jsx"),
  route("/test-login", "routes/test-login.jsx"),
  route("checkout", "routes/checkout.jsx")
];