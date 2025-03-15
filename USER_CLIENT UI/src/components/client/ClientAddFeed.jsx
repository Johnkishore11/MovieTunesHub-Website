import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitClientFeed } from "../../redux/actions/clientActions";

const categories = {
  "Nature & Wildlife": ["Forests", "Wildlife Reserves", "Beaches"],
  "Historical & Cultural Tours": ["Museums", "Heritage Sites", "Palaces"],
  "Adventure Tours": ["Hiking", "Skydiving", "Water Sports"],
  "Food & Culinary Tours": ["Street Food", "Fine Dining", "Local Specialties"],
  "Shopping Tours": ["Markets", "Malls", "Boutiques"],
  "Religious & Pilgrimage Tours": ["Temples", "Churches", "Mosques"],
};

const ClientAddFeed = () => {
  const dispatch = useDispatch();
  const clientFeed = useSelector((state) => state.clientFeed) || {};
  const { loading = false, error = "", success = false } = clientFeed;

  // Initial state for all required details
  const initialFormState = useCallback(() => ({
    placeName: "",
    otherNames: "",
    category: "",
    subcategories: [],
    location: { country: "", state: "", district: "", city: "", address: "" },
    description: "",
    history: "",
    viewpoints: [], // Array of { name: "", description: "" }
    timeAvailability: [], // e.g., ["Day", "Night", "Afternoon"]
    visitTiming: "",      // Visiting hours as text or time range
    estimatedCost: "",
    costBreakdown: "",
    stayOptions: "",      // Nearby stay options
    foodStalls: "",       // Nearby food options
    transportDetails: [], // Array of { routeNumber: "", spotName: "", otherNames: "" }
    images: [],
  }), []);

  const [formData, setFormData] = useState(initialFormState());
  const [imagePreviews, setImagePreviews] = useState([]);

  // Reset subcategories when category changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, subcategories: [] }));
  }, [formData.category]);

  // Reset form on successful submission
  useEffect(() => {
    if (success) {
      setFormData(initialFormState());
      setImagePreviews([]);
    }
  }, [success, initialFormState]);

  // Handle simple text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle subcategory selection (multiple)
  const handleSubcategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, subcategories: selectedOptions }));
  };

  // Handle location details
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  // Handle image file input and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Handle dynamic viewpoint changes
  const handleViewpointChange = (index, field, value) => {
    const updatedViewpoints = [...formData.viewpoints];
    updatedViewpoints[index] = { ...updatedViewpoints[index], [field]: value };
    setFormData((prev) => ({ ...prev, viewpoints: updatedViewpoints }));
  };

  // Add a new viewpoint
  const addViewpoint = () => {
    setFormData((prev) => ({
      ...prev,
      viewpoints: [...prev.viewpoints, { name: "", description: "" }],
    }));
  };

  // Remove a viewpoint entry
  const removeViewpoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      viewpoints: prev.viewpoints.filter((_, i) => i !== index),
    }));
  };

  // Handle dynamic transportation details
  const handleTransportChange = (index, field, value) => {
    const updatedTransport = [...formData.transportDetails];
    updatedTransport[index] = { ...updatedTransport[index], [field]: value };
    setFormData((prev) => ({ ...prev, transportDetails: updatedTransport }));
  };

  // Add a new transportation detail
  const addTransport = () => {
    setFormData((prev) => ({
      ...prev,
      transportDetails: [
        ...prev.transportDetails,
        { routeNumber: "", spotName: "", otherNames: "" },
      ],
    }));
  };

  // Remove a transportation detail
  const removeTransport = (index) => {
    setFormData((prev) => ({
      ...prev,
      transportDetails: prev.transportDetails.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission by dispatching the Redux action
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitClientFeed(formData));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Submit a New Place</h2>
      {loading && <p className="text-blue-500">Submitting...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Feed submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Basic Details */}
        <label>Place Name:</label>
        <input
          type="text"
          name="placeName"
          value={formData.placeName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label>Other Names:</label>
        <input
          type="text"
          name="otherNames"
          value={formData.otherNames}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <label>Main Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {formData.category && categories[formData.category]?.length > 0 && (
          <>
            <label>Subcategories:</label>
            <select
              multiple
              name="subcategories"
              value={formData.subcategories}
              onChange={handleSubcategoryChange}
              className="border p-2 rounded"
            >
              {categories[formData.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </>
        )}
        {/* Location Details */}
        <label>Location:</label>
        {["country", "state", "district", "city", "address"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData.location[field]}
            onChange={handleLocationChange}
            className="border p-2 rounded"
            required
          />
        ))}
        {/* Description & History */}
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <label>History (if applicable):</label>
        <textarea
          name="history"
          value={formData.history}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {/* Key Highlights - Viewpoints & Attractions */}
        <label>Viewpoints:</label>
        {formData.viewpoints.map((viewpoint, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Viewpoint Name"
              value={viewpoint.name}
              onChange={(e) => handleViewpointChange(index, "name", e.target.value)}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={viewpoint.description}
              onChange={(e) => handleViewpointChange(index, "description", e.target.value)}
              className="border p-2 rounded"
            />
            <button type="button" onClick={() => removeViewpoint(index)} className="bg-red-300 p-1 rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addViewpoint} className="bg-gray-300 p-2 rounded">
          + Add Viewpoint
        </button>
        {/* Best Time to Visit - Time Availability & Visiting Hours */}
        <label>Best Time to Visit:</label>
        <select
          multiple
          name="timeAvailability"
          value={formData.timeAvailability}
          onChange={(e) =>
            handleChange({
              target: {
                name: "timeAvailability",
                value: Array.from(e.target.selectedOptions, (opt) => opt.value),
              },
            })
          }
          className="border p-2 rounded"
        >
          <option value="Day">Day</option>
          <option value="Night">Night</option>
          <option value="Afternoon">Afternoon</option>
        </select>
        <label>Visiting Hours:</label>
        <input
          type="text"
          name="visitTiming"
          value={formData.visitTiming}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {/* Cost & Expenses */}
        <label>Estimated Cost:</label>
        <input
          type="text"
          name="estimatedCost"
          value={formData.estimatedCost}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <label>Cost Breakdown:</label>
        <textarea
          name="costBreakdown"
          value={formData.costBreakdown}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {/* Stay & Food Options */}
        <label>Nearby Stay Options:</label>
        <input
          type="text"
          name="stayOptions"
          value={formData.stayOptions}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <label>Nearby Food Options:</label>
        <input
          type="text"
          name="foodStalls"
          value={formData.foodStalls}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {/* Transportation Details */}
        <label>Transportation Details:</label>
        {formData.transportDetails.map((transport, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="RTC Route Number"
              value={transport.routeNumber}
              onChange={(e) => handleTransportChange(index, "routeNumber", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Spot Name"
              value={transport.spotName}
              onChange={(e) => handleTransportChange(index, "spotName", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Other Names"
              value={transport.otherNames}
              onChange={(e) => handleTransportChange(index, "otherNames", e.target.value)}
              className="border p-2 rounded"
            />
            <button type="button" onClick={() => removeTransport(index)} className="bg-red-300 p-1 rounded">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addTransport} className="bg-gray-300 p-2 rounded">
          + Add Transport
        </button>
        {/* Image Upload & Preview */}
        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded" />
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 mt-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`preview-${index}`} className="w-16 h-16 object-cover rounded-md" />
            ))}
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ClientAddFeed;
