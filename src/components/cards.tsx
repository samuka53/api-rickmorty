import { CadsProps } from "../types/card-types";

export function Cards({ image, name, status }: CadsProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-xs shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-100 object-cover rounded-lg mb-4"
      />
      <h3>{name}</h3>
      <p>{status}</p>
    </div>
  );
}
