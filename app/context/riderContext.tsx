import * as React from "react";
import { Rider , RiderContextWrapper } from "../@types/rider";
import * as api from "../api";

export const RiderContext =
  React.createContext<RiderContextWrapper | null>(null);

interface Props {
  children: React.ReactNode;
}

const RiderProvider: React.FC<Props> = ({ children }: Props) => {

  const [rider, setRider]   = React.useState<Rider>({} as Rider);
  const [riders, setRiders] = React.useState<Rider[]>([]);

  
  const getRider = async (rider_id: string) => {
    const { data } = await api.getRider(rider_id);
    setRider({...data.rider});
  };

  const getRiders = async () => {
    const { data } = await api.getRiders();
    setRiders([...data.riders]);
  };

  const addRider = (rider: Rider) => {
    setRiders([...riders,rider])
  }

  const addRiders = async (riders: Rider[]) => {

    let addRiders = [...riders]

    // addRiders = addRiders.map((rider)=>{
    //   const id = `insertID${(Math.floor(Math.random() * 100)).toString()}`
    //   return {...rider,rider_id:id}
    // })

    await api.addRiders(addRiders)
  };

  const deleteRider = () => {
    //delete Rider using API call
  };

  return (
    <RiderContext.Provider
      value={{
        rider,
        riders,
        getRider,
        getRiders,
        addRider,
        addRiders,
        deleteRider
      }}
    >
      {children}
    </RiderContext.Provider>
  );
};

export default RiderProvider;
