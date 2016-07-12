# MaaS Transport Service Provider Booking API

The following scenario explains the life-cycle of an individual trip
from a TSP viewpoint. Whenever a new concept (such as an actor or action)
is represented, it is imprinted in **bold**.

This scenario, with a few extra details is detailed in the process diagram
below. It should be noted from the picture that MaaS more often acts as a
caller than a callee for Transport Service Provider. 

The cases of how MaaS interacts with TSP are depicted below
![Maas-TSP Business Process](https://cdn.rawgit.com/maasglobal/maas-tsp-api/master/specs/maas-v1-overall.svg)
[source](https://github.com/maasglobal/maas-tsp-api/blob/master/specs/maas-v1-overall.svg "MaaS-TSP Business Process").

## Planning a Route

**User** **queries** for a **Route** with an address or latitude-logitude
pair from one place to another. MaaS queries the route from a third party
**Routing Engine** that contains the data for **TSP** routes. At this point
MaaS makes no queries to the TSP - it expects the Routing Engine contains 
valid GTFS data for the TSP.

**MaaS** shows several possible **Plans**, each containing a valid
**Route** with several **Legs** with a part of a route using a specific
TSP.

## Creating a Booking

User browses through the Plans and chooses to book a trip. For each Leg
in the Plan Route, MaaS creates a new **Booking** for a TSP.
It should be noted that the booking may be hours or days in
advance - a bit like in booking a hotel. The booking contains the
individual Leg as the detailed travel plan for the TSP, as well as
customer contact information.

TSP receives the booking and confirms the trip. TSP may modify the details
of the Booking, such as moving the **start location** to closest known
street address or delaying the Leg **start time**, as long as the
**end time** can be guaranteed. The Booking is supplemented with
**booked** state information and additional **terms** latest such as
the latest **cancellation time**.

MaaS checks that the booking succeeded and stores the Booking for future
reference.

## Navigating a Route

User starts to navigate the Route. MaaS tracks for the user location to
know if there are any changes needed in the plan. MaaS triggers the changes
for bookings by monitoring the individual Legs.

MaaS monitors the Booking terms and Leg **start time**.
When the actual Leg starts, MaaS **starts** the Leg and notifies the TSP.
User or TSP may request changes to the Booking, e.g. in a case of a delay
or cancellation.

Each of these scenarios are described below.

## Updating a Booking

A Booking may be updated by a User, MaaS or TSP when any party receives
new information that the Leg needs to be changed. Since the update may need
confirmation from User or a 3rd party system, it is an asynchronous
operation.

Either party (MaaS or TSP) may send an updated Booking with
**UPDATE_REQUESTED** state. The recipient processes the request
asynchronously and either confirms the request with **UPDATED** state,
sends its proposal with **UPDATE_REQUESTED**, or cancels the leg with
**CANCELLED** state.

## Cancelling a Booking

A Booking may be cancelled by User or MaaS within **cancellation time** in
**terms** of the Booking without a specific request. MaaS sends a modified
Booking with state **CANCELLED** information. TSP confirms and updates its
own systems.

It should be noted that cancellation is an exception case and is likely
happen only when the user chooses to cancel the whole route Plan.
Instead, MaaS and/or TSP should update the booking with new information.

TSP can assume Booking as paid if the cancellation time has passed and no
cancellation has been received from MaaS.

## Paying a Booking

A Booking may be paid (e.g. confirmed) before the **cancellation time**
in **terms** has expired. MaaS sends a modified Booking with **PAID**
state wich the TSP confirms.

TSP can assume Booking as paid if the cancellation time has passed and no
cancellation has been received from MaaS.

## Error Cases

It may be possible that MaaS sends an invalid request or the TSP cannot
fulfill a request. In any such case, TSP may respond with an error. If
TSP responds with an error, MaaS assumes the state was not changed (e.g.
a transaction was rolled back). MaaS may repeat the request
with the same or different data later on.

The same principle applies when TSP is communicating with MaaS.