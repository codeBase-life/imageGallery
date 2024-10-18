import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery";
import "./App.css";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await fetch(
        `https://pixabay.com/api/?key=46549359-c7aec645617df86431f5c6c2e&q=${term}_type=photo&pretty=true`
      )
        .then((res) => res.json())
        .then((data) => setImages(data.hits));
      setLoading(false).catch((err) => console.log(err));
      setLoading(false);
    }
    loadData();
  }, [term]);
  return (
    <>
      <ImageSearch searchText={(text) => setTerm(text)} />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className=" container mx-auto">
          <div className=" grid grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageGallery key={image.id} image={image} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
