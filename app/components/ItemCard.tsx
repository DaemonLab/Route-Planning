import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  background:
    "linear-gradient(45deg, rgba(255,249,249,1) 4%, rgba(77,199,232,1) 100%)",
  border: "2px solid #ffffff",
  boxShadow: 24,
  p: 2,
};

function ItemCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex justify-center">
      <div className="bg-[#cee0d5] w-[90%] h-20 mb-5 flex items-center rounded-3xl relative">
        <div className="absolute top-auto left-0 h-[80%] flex items-center w-[75%] justify-center rounded-3xl bg-[#111111] text-white ml-2">
          <div>
            <span className="w-[100%] relative top-0 text-[12px]">
              Item ID:
            </span>
            <h1 className="font-bold text-2xl">79234y7942bhdsda</h1>
          </div>
        </div>

        <button
          onClick={handleOpen}
          className="absolute border-2 border-[#0deca5] top-auto right-0 h-[80%] flex items-center w-[20%] justify-center rounded-3xl bg-[#111111] text-[#0deca5] mr-2 font-bold"
        >
          Details
        </button>
      </div>
      <div className="rounded-lg">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <div className="grid grid-cols-2">
              <div>
                <Image alt="parcel" src="/parcel.webp" height={400} width={400}></Image>
              </div>
              <div className="px-4">
                <span className="w-[100%] relative top-0 text-[12px]">
                  Item ID:
                </span>
                <h1 className="font-bold text-2xl">79234y7942bhdsda</h1>
                <span className="w-[100%] relative top-0 text-[12px]">
                  Drop Location:
                </span>
                <h1 className="font-bold text-2xl">IIT Indore, Simrol</h1>
                <div className="text-center mt-2">Volumetric Weight</div>
                <div className="bg-[#111111] w-[70px] h-[70px] text-center ml-auto mr-auto rounded-lg text-[#0deca5] flex justify-center items-center font-bold text-2xl">
                  10
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ItemCard;
