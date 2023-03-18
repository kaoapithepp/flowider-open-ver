export const isThereToken = localStorage.getItem("flowyFlowider") ?
    JSON.parse(localStorage.getItem("flowyFlowider") as string) :
    null;