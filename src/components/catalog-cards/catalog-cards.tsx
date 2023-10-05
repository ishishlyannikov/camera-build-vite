import {useAppSelector} from "../hooks/hooks.ts";
import {getCamerasList} from "../store/cameras-data/cameras-data-selectors.ts";
import ProductCard from "../product-card/product-card.tsx";


export default function CatalogCards() {
  const cameras = useAppSelector(getCamerasList);
  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) =>
        <ProductCard key={camera.id} camera={camera}/>
      )}
    </div>
  );
}
