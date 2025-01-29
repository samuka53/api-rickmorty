type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-4 items-center mt-4">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Anterior
      </button>
      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={handlePageChange}
        className="border px-2 py-1 w-16 text-center dark:text-white"
      />
      <span className="dark:text-white">de {totalPages}</span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Próxima
      </button>
    </div>
  );
}
