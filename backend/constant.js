const PRIORITY = ['HIGH', 'MEDIUM', 'LOW'];

const TICKET_TYPE = ['STORY', 'TASK', 'BUG'];

const ROLE = ['SUPER-ADMIN', 'ADMIN', 'MANAGER', 'DEVELOPER', 'QA', 'SUPPORT'];

const REQUIRE_FIELD_FOR_TICKET_CREATION = ["companyId", "projectId", "type", "priority", "name", "stateId", "creator", "description"];

const FORBIDDEN_FIELD_FOR_TICKET_CREATION = ["closeDate", "reopenDate"];

const FORBIDDEN_FIELD_FOR_TICKET_UPDATE = ["companyId", "projectId", "type", "creator", "sprintId"];

module.exports = {
    PRIORITY,
    TICKET_TYPE,
    ROLE,
    REQUIRE_FIELD_FOR_TICKET_CREATION,
    FORBIDDEN_FIELD_FOR_TICKET_CREATION,
    FORBIDDEN_FIELD_FOR_TICKET_UPDATE
}