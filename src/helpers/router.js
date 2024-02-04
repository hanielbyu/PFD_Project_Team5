import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { HomeView, FaqView, SupportView, TechView, ApptView, LoginView, VideoCall, InstructionsView, RegistrationView} from '@/views';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { path: '/FAQ', component: FaqView },
        { path: '/support', component: SupportView },
        { path: '/tech', component: TechView },
        { path: '/schedule-appointment', component: ApptView },
        { path: '/login', component: LoginView },
        { path: '/video', component: VideoCall },
        { path: '/instruct', component: InstructionsView },
        { path: '/registration', component: RegistrationView },
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/registration'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});
