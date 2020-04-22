import RequestPage from "../components/pages/requests/RequestPage";
import LoginPage from "../components/pages/maker/LoginPage";
import RegisterPage from "../components/pages/maker/RegisterPage";
import AllRequestPage from "../components/pages/maker/AllRequestPage";
import DashboardPage from "../components/pages/dashboard/Dashboard";

const components = {
  requestPage: {
    component: RequestPage,
    url: "/requests",
  },
  loginPage: {
    component: LoginPage,
    url: "/login",
  },
  registerPage: {
    component: RegisterPage,
    url: "/register",
  },
  allRequestPage: {
    component: AllRequestPage,
    url: "/request-list",
  },
  dashboardPage: {
    component: DashboardPage,
    url: "/",
  },
};

export default {
  guest: {
    routes: [
      components.requestPage,
      components.loginPage,
      components.registerPage,
      components.dashboardPage,
    ],
    redirectRoute: "/",
  },
  maker: {
    routes: [components.allRequestPage],
    redirectRoute: "/request-list",
  },
};
