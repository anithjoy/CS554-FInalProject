const stateData = require("./state");
const userData = require("./user");
const projectData = require("./project");
const ticketData = require("./ticket");

const isUserHaveAccessToUser = async(companyId, userId) =>{
    const user = await userData.getUserById(userId);
    if(user.companyId === companyId)
        return true;
    return false;
}

const isUserHaveAccessToState = async(companyId, stateId) =>{
    const state = await stateData.getStateById(stateId);
    if(state.companyId === companyId)
        return true;
    return false;
}

const isProjectHaveThisSprint = async(projectId, sprintId) =>{
    await projectData.getSprintbyId(projectId, sprintId);
    return true;
}

const isUserHaveAccessToProject = async(email, projectId) =>{
    const project = await projectData.getProjectById(projectId);
    if(project.manager==email || project.creator==email || project.watchers.includes(email))
        return true;
    return false;
}

const isUserHaveAccessToTicket = async(user, ticketId, flag=false) =>{
    const ticket = await ticketData.getTicketById(ticketId);
    if(flag)
        if(ticket.assign==user.email)
            true;
        else
            false;
    if(ticket.assign==user.email || ticket.creator==user.email || ticket.watchers.includes(user.email))
        return true;
    if((user.role=="SUPER-ADMIN"||user.role=="ADMIN"||user.role=="MANAGER") && ticket.companyId==user.companyId)
        return true;
    return false;
}

const isUserComment = async(email, commentId) =>{
    const comment = await ticketData.getCommentById(commentId);
    if(comment.sender == email)
        return true;
    return false;
}

module.exports = {
    isUserComment,
    isUserHaveAccessToTicket,
    isUserHaveAccessToProject,
    isProjectHaveThisSprint,
    isUserHaveAccessToState,
    isUserHaveAccessToUser
};