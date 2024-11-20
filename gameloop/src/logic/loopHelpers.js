export default {
    calculateFrame: async (frame,cb) => {
        const next = (frame+1)%111;
        console.log("next: ", next);
        cb(next);
    }
}