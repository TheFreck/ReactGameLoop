import axios from "axios";

const getBaseURL = (cb) => {
    if(process.env.NODE_ENV === "development"){
        cb("https://localhost:7112");
    }
    else if(process.env.NODE_ENV === "production"){
        cb("");
    }
}

export const calculateFrame = async (frame,cb) => {
    let next = (frame+1);
    // reach out to server
    getBaseURL(url => {
        const api = axios.create({
            baseURL: url
        });
        api.get("Loop")
        .then(yup => {
            console.log("yup: ", yup.data);
        })
        .catch(nope => console.error(nope));
    })
    cb({
        data:{},
        frame: next
    });
}

export default {
    calculateFrame
};