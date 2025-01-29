import { useEffect, useState } from "react";
import { CadsProps } from "./types/card-types";
import { Pagination } from "./components/next-page";
import { Cards } from "./components/cards";
// import { NavBar } from "./components/nav-bar";

export default function App() {
  const [cards, setCards] = useState<CadsProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [navbar, setNavBar] = useState("");

  const getSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNavBar(value);
  };

  const filtereddMovies = cards.filter((card) =>
    card.name.toLowerCase().includes(navbar.toLowerCase())
  );

  useEffect(() => {
    async function fetchCardsApi(page: number) {
      setLoading(true);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        setCards(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCardsApi(currentPage);
  }, [currentPage]);

  return (
    <div className="dark:bg-gray-800">
      <div className="flex dark:text-white">
        <div>
          <input
            onChange={(event) => getSearch(event)}
            value={navbar}
            placeholder="Pequise aqui"
            className=" border-3 border-gray-400"
          />
        </div>
      </div>
      <h1 className="dark:text-white flex justify-center box mb-4 text-4xl">
        Personagens
      </h1>
      {loading ? <p>Carregando...</p> : null}
      <div className="flex justify-center flex-wrap dark:text-white gap-5">
        {filtereddMovies.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum card disponível</p>
        ) : (
          filtereddMovies.map((card) => (
            <Cards
              key={card.id}
              image={card.image}
              name={card.name}
              status={card.status}
            />
          ))
        )}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
