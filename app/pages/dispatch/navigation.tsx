import Items from "../../components/Dispatch/Items";
import Navbar from "../../components/Home/Navbar";

export default function Navigation() {
  //Fetch Items from Backend
  //Fetch Riders from Backend

  /*   
                            INITIAL ASSIGNMENT

        -> Run algorithm to get items assigned to each rider and order of deliveries
        -> Add items assigned to that rider in rider.tasks[]
        -> Use Routing API to calculate the route from current location to rider.tasks[0] (Do this for each rider)
        -> Display on map
    */

  /*

                            ROUTE SIMULATION

        -> After certain intervals of time update the location of each rider (use current_location and current_route)
        -> Once a rider reaches some task_location, perform appropriate actions
    */

  /*                     PICKUP POINTS
        -> Maintain a array of 'unassigned pickup points'
        -> While updating the location of each rider, if a rider has reached a delivery point, add it to 
           an array of 'free riders'
        -> Send the array of 'unassigned pickup points' and 'free riders' to the algorithm to get an optimal 
           assignment of the pickup points
    */

  return (
    <div className="bg-[#111111] h-screen w-screen">
      <Navbar></Navbar>
      <div className="grid grid-cols-5 h-[100%] gap-3">
        <div className="col-span-2 h-[100%]">
          <Items></Items>
        </div>
        <div className="col-span-3 h-[100%]"></div>
      </div>
    </div>
  );
}
