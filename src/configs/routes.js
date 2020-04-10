import RequestPage from '../components/pages/requests/RequestPage'
import LoginPage from '../components/pages/maker/LoginPage'

const components = {
    requestPage: {
        component: RequestPage,
        url: '/requests'
    },
    loginPage: {
        component: LoginPage,
        url: '/login'
    }
}

export default {
    guest: {
        routes: [
            components.requestPage,
            components.loginPage
        ],
        redirectRoute: '/requests'
    },
    maker: {
        routes: [

        ],
        redirectRoute: '/login'
    }
}