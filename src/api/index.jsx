import axios from "axios";

export const fetchProductApi = () => {
    let p2= axios.get(`${process.env.REACT_APP_DOMAIN_SERVER}/api/getProductImages`);
    // let p1= axios.get(`${process.env.PUBLIC_URL}/api/product.json`);

    return p2;
};

export const fetchChatApi1 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chatMember.json`);
};

export const fetchChatApi2 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chat.chats.json`);
};

export const fetchEmailApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/email.json`);
};

export const fetchBookmaekApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/bookmark.json`);
};

export const fetchTodoApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/todo.json`);
};

export const fetchTaskApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/task.json`);
};

export const fetchProjectApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/project.json`);
};
