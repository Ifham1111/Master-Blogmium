# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Usage

first of all i created the react project with the help of vite

npm create vite@latest

then i removed unnecessary folders and the files after i mkdir pages & created the about, sgn in, sign put, projects, dashboard

then installed the required dependencies for react using npm

then i installed the react-router-dom

and i changed the app.jsx file like

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>

then i created the components as mkdir components and in side of it Header component created

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>

    so i config that in to app.jsx

    what is the benifits of using react-router-dom ? 
    1. It provides a way to navigate between different routes in an application, which allows users to start at the index.html file, and then move through all of the other components in the application without having to reload the page or make additional requests to the server.
    2. It also allows for the creation of nested routes, which can be useful for organizing complex applications.
    3. It also provides a way to pass data between different components in an application, which can be useful for sharing information between different parts of the application.

after it i used flowbite react <https://www.flowbite-react.com/docs/getting-started/introduction> package for responsive tailwind components

then config the flowbite package inside the tailwind css config

write the order what we are done p to now

1. install node js
2. install npm
3. install react
4. install react-router-dom
5. install flowbite-react
6. install tailwind css
7. create page & router
8. Header Component
9. create & run the server
10. connect db
11. create user model
12. create a test api routes
13. create sign-up api route and pass the user data's via POST with the hash formate to env=crypt the password
14. create middleware & a function to control the errors
15. create sign-in & sign-up page
16. create footer
17. sign page set uped with the sign in and with the jwt
18. global state management redux
19.
20.