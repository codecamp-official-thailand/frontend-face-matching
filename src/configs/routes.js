import RequestPage from '../components/pages/requests/RequestPage'
import LoginPage from '../components/pages/maker/LoginPage'
import RegisterPage from '../components/pages/maker/RegisterPage'
import AllRequestPage from '../components/pages/maker/AllRequestPage'

const components = {
    requestPage: {
        component: RequestPage,
        url: '/requests'
    },
    loginPage: {
        component: LoginPage,
        url: '/login'
    },
    registerPage: {
        component: RegisterPage,
        url: '/register'
    },
    allRequestPage: {
        component: AllRequestPage,
        url: '/request-list'
    }
}

export default {
    guest: {
        routes: [
            components.requestPage,
            components.loginPage,
            components.registerPage
        ],
        redirectRoute: '/requests'
    },
    maker: {
        routes: [
            components.allRequestPage,
        ],
        redirectRoute: '/request-list'
    }
}