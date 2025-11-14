import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");

  const [newProducts, setNewProducts] = useState();

  const [sort, setSort] = useState("default");

  const SIZE = 10;
  const ref = useRef();
  const [start, setStart] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=190");

    const json = await response.json();
    // console.log(json?.products);

    setProducts(json?.products);
    setNewProducts(json?.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (start + SIZE > newProducts?.length) {
      setHasMore(false);
    }

    if (hasMore) {
      setStart((preVal) => preVal + SIZE);
    }
  }, [isVisible]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    setSearch(searchValue);
    setSort("default");

    setNewProducts(
      products.filter(
        (product) =>
          product?.category?.toLowerCase()?.includes(searchValue) ||
          product?.title?.toLowerCase()?.includes(searchValue) ||
          product?.brand?.toLowerCase()?.includes(searchValue)
      )
    );
  };

  const handleChange = (e) => {
    setSort(e.target.value);
    const filter = [...newProducts];

    if (e.target.value === "ascending") {
      filter.sort((a, b) => a.price - b.price);
    }
    if (e.target.value === "descreading") {
      filter.sort((a, b) => b.price - a.price);
    }

    setNewProducts(filter);
  };

  return (
    <main className="main">
      <h1>Dashboard</h1>
      <h2>All products</h2>

      <div>
        {/* Search icon */}
        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={handleSearch}
        />

        {/* filter menu */}
        <select value={sort} onChange={handleChange}>
          <option value="default">Apply filter</option>
          <option value="descreading">Highest</option>
          <option value="ascending">Lowest</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Category</td>
            <td>Brand</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {newProducts?.length === 0 ? (
            <p>No data found</p>
          ) : (
            newProducts?.slice(0, start + SIZE)?.map((product) => (
              <tr key={product.id} className="row">
                <td>
                  <img
                    src={product?.images}
                    alt="product image"
                    className="image"
                  />
                </td>
                <td>{product?.title}</td>
                <td>{product?.category}</td>
                <td>{product?.brand}</td>
                <td>{product?.price}</td>
              </tr>
            ))
          )}
        </tbody>
        {hasMore && <p ref={ref}>Loading...</p>}
      </table>
    </main>
  );
}

export default App;
