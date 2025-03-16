import axiosInstance from "./axiosConfig";

export const AddItem = () => {
  axiosInstance
    .post("/additems", { name: "kamal" })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
