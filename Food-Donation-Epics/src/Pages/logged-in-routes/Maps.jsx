import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/maps.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Navbar from "../../Components/Navbar/Navbar";
import { getCurrentUserDetail } from "../../Services/auth";
import { getEvents } from "../../Services/user-service";
import { useGeolocated } from "react-geolocated";
import { useMapEvents } from "react-leaflet";
import { postEvent, postFoodRequest } from "../../Services/user-service";
import { toast } from "react-toastify";

function Maps() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data); // Assuming the data you want is directly on the response object
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const eventArray = events;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  const [foodDonation, setFoodDonation] = useState({
    name_donor: "",
    food_type: "",
    perishability: "",
    delivery_method: "",
    quantity: "",
    scheduled_date: "",
    scheduled_time: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleFoodChange = (event) => {
    setFoodDonation({
      ...foodDonation,
      [event.target.name]: event.target.value,
    });
  };

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const initialPosition = [53.0709, 76.8317];
  const [mapCenter, setMapCenter] = useState(initialPosition);

  useEffect(() => {
    if (coords) {
      setMapCenter([coords.latitude, coords.longitude]);
    }
  }, [coords]);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const userDetails = getCurrentUserDetail();
    setUser(userDetails);
  }, []);

  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    if (clickedLocation) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: clickedLocation.lat,
        longitude: clickedLocation.lng,
      }));
    }
  }, [clickedLocation]);

  const handleLocationClick = (location) => {
    setClickedLocation(location);
  };

  // Retrieve the item from local storage
  const rawData = localStorage.getItem("data");
  let t = "";
  let approvedStatus;
  // Check if rawData exists
  if (rawData) {
    // Parse the JSON string into an object
    const data = JSON.parse(rawData);

    // Access the token property
    const token = data.token;
    t = token;
    approvedStatus = data?.user?.organization?.is_approved;
    // Log or use the token as needed
    console.log("Retrieved token:", token);
  } else {
    console.log("No data found in local storage.");
  }
  console.log(t);
  console.log(approvedStatus);

  const submitData = {
    ...formData,
    latitude: formData.latitude.toString(),
    longitude: formData.longitude.toString(),
  };

  console.log(submitData);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(t);
    if (error.isError) {
      console.log("Invalid form data");
      return;
    }

    postEvent(submitData, t)
      .then((resp) => {
        console.log(resp);
        console.log("success log");

        toast.success("Event Added Successfully", {
          position: "bottom-center",
          className: "toast-message",
        });

        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          latitude: 0,
          longitude: 0,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in adding the event");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  console.log(foodDonation);
  const handleFoodSubmit = (event) => {
    event.preventDefault();

    if (error.isError) {
      console.log("Invalid form data");
      return;
    }

    postFoodRequest(foodDonation, t)
      .then((resp) => {
        console.log(resp);
        console.log("success log");

        toast.success("Application Submitted Successfully", {
          position: "bottom-center",
          className: "toast-message",
        });

        setFoodDonation({
          name_donor: "",
          food_type: "",
          perishability: "",
          delivery_method: "",
          quantity: "",
          scheduled_date: "",
          scheduled_time: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in submitting the application");
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  console.log(eventArray);
  return (
    <>
      <Navbar />
      <div className="  grid grid-cols-2 h-screen">
        <div className="col-span-1">
          <MapContainer
            key={`${mapCenter[0]}-${mapCenter[1]}`}
            center={mapCenter}
            zoom={13}
            className="h-[100vh] w-[100vh]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {eventArray.map((e) => (
              <Marker
                position={[
                  parseFloat(e.latitude, 10),
                  parseFloat(e.longitude, 10),
                ]}
                key={e.id}
              >
                <Popup>
                  NAME : {e.title}
                  <br />
                  <button>
                    <Link
                      to={"/event/description"}
                      state={{ event: e }}
                      className="text-blue font-bold"
                    >
                      View More About Event
                    </Link>
                  </button>
                </Popup>
              </Marker>
            ))}
            <LocationMarker onLocationClick={handleLocationClick} />
          </MapContainer>
        </div>
        {user?.role === 1 ? (
          <div className="col-span-1 bg-yellow-100 flex items-center justify-center">
            <form className="w-full max-w-md p-5" onSubmit={handleSubmit}>
              <h2 className="text-black font-bold align-middle ml-[165px] mb-[20px]">
                Add New Event
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-bold text-gray-700"
                >
                  Title Of Event
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-bold text-gray-700"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="DD-MM-YYYY"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-bold text-gray-700"
                >
                  Time
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="00:00 in 24 hour format"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-bold text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="location"
                  name="location"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <input
                type="text"
                id="latitude"
                name="latitude"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter latitude"
                value={formData.latitude.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude: parseFloat(e.target.value),
                  })
                }
              />
              <input
                type="text"
                id="longitude"
                name="longitude"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter longitude"
                value={formData.longitude.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude: parseFloat(e.target.value),
                  })
                }
              />

              <div className="flex justify-center">
                {approvedStatus ? (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                ) : (
                  <p className="font-bold">
                    Get Your NGO Approved to create an event!!
                  </p>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="col-span-1 bg-yellow-100 flex items-center justify-center">
            <form className="w-full max-w-md p-5" onSubmit={handleFoodSubmit}>
              <h2 className="text-black font-bold align-middle ml-[165px] mb-[20px]">
                DONATE FOOD ?
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="donorName"
                  className="block text-sm font-bold text-gray-700"
                >
                  Name of Donor
                </label>
                <input
                  type="text"
                  id="name_donor"
                  name="name_donor"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Donor's Name"
                  value={foodDonation.name_donor}
                  onChange={handleFoodChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deliveryMethod"
                  className="block text-sm font-bold text-gray-700"
                >
                  Pickup or Drop
                </label>
                <select
                  id="delivery_method"
                  name="delivery_method"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={foodDonation.delivery_method}
                  onChange={handleFoodChange}
                >
                  <option value="">Select Option</option>
                  <option value="PICK-UP">Pickup</option>
                  <option value="DROP">Drop</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="perishability"
                  className="block text-sm font-bold text-gray-700"
                >
                  Perishability
                </label>
                <select
                  id="perishability"
                  name="perishability"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={foodDonation.perishability}
                  onChange={handleFoodChange}
                >
                  <option value="">Select Option</option>
                  <option value="PERISHABLE">Perishable</option>
                  <option value="NON-PERISHABLE">Non Perishable</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deliveryMethod"
                  className="block text-sm font-bold text-gray-700"
                >
                  Type Of Food
                </label>
                <select
                  id="food_type"
                  name="food_type"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={foodDonation.food_type}
                  onChange={handleFoodChange}
                >
                  <option value="">Select Option</option>
                  <option value="VEGETARIAN">Veg</option>
                  <option value="NON-VEGETARIAN">Non Veg</option>
                  <option value="VEGAN">Vegan</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-bold text-gray-700"
                >
                  Time of Pickup/Drop
                </label>
                <input
                  type="text"
                  id="scheduled_time"
                  name="scheduled_time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="00:00 am/pm"
                  value={foodDonation.scheduled_time}
                  onChange={handleFoodChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-bold text-gray-700"
                >
                  Date of Pickup/Drop
                </label>
                <input
                  type="text"
                  id="scheduled_date"
                  name="scheduled_date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="DD-MM-YYYY"
                  value={foodDonation.scheduled_date}
                  onChange={handleFoodChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-bold text-gray-700"
                >
                  Quantity of Food
                </label>
                <textarea
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                  placeholder="Enter Quantity"
                  value={foodDonation.quantity}
                  onChange={handleFoodChange}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

function LocationMarker({ onLocationClick }) {
  const map = useMapEvents({
    click(e) {
      onLocationClick(e.latlng);
    },
  });

  return null;
}

export default Maps;
