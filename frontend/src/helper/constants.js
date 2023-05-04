export const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];

export const TICKET_TYPE = ['STORY', 'TASK', 'BUG'];

export const ROLE = ['ADMIN', 'MANAGER', 'DEVELOPER', 'QA', 'SUPPORT'];

export const REQUIRE_FIELD_FOR_TICKET_CREATION = ["companyId", "projectId", "type", "priority", "name", "stateId", "creator", "description"];

export const DEFAULT_STATE = ["TO DO", "IN PROGRESS", "DONE", "REOPEN", "CLOSE"];

export const NAV_LINKS = [
    {
        id: 1,
        url: "/dashboard",
        text: 'Dashboard',
    },
    {
        id: 2,
        url: '/user',
        text: 'Users',
    },
    {
        id: 3,
        url: '/state',
        text: 'States',
    },
    {
        id: 4,
        url: '/project',
        text: 'Projects',
    },
    {
        id: 5,
        url: '/ticket',
        text: 'Tickets',
    },
    {
        id: 6,
        url: '/login',
        text: 'logout',
    }
  ]