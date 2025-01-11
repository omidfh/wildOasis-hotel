import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearcParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleCahnge(e) {
    searchParams.set("sortBy", e.target.value);
    setSearcParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleCahnge}
    />
  );
}

export default SortBy;
