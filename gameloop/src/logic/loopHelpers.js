export const LoopHelpers = {
    updateMethod: async (frameId) => {
        console.log("updated: ", frameId+1);
        return (frameId+1);
    }
};

export default LoopHelpers;