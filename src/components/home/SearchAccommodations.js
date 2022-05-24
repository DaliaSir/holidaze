import { useState, useEffect } from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../constants/api";
import { Link } from "react-router-dom";

export default function SearchAccommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + ACCOMMODATION_PATH;

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setAccommodations(json);
        } else {
          setError("An error occurred");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchAccommodations();
  }, [url]);

  if (loading) {
    return <></>
  }
  if (error) {
    return console.log(error);
  }

  const results = !searchInput
    ? []
    : accommodations.filter(accommodation =>
      accommodation.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );

  return (
    <>
      <input className="form-control" type="text" placeholder="Search for a place to stay..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <div className="search-dropdown">
        {results.map((item) => {
          return (
            <div className="search-dropdown__item" key={item.id} >
              <Link className="search-dropdown__item--link dropdown-item" to={`detail/${item.id}`}>
                <span>{item.name}</span>
                <div style={{ backgroundImage: `url(${item.images[0].url})` }}></div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
