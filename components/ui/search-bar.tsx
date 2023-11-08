import { Input } from "./input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 transform -translate-y-1/2 top-1/2 left-2" />
      <Input className="pl-7 w-72" placeholder="Search..." />
    </div>
  );
}
