import Categoria from "../../models/Categoria";


  interface FiltroCategoriaProps {
  categorias: Categoria[];
  categoriaSelecionada: number | null;
  onChangeCategoria: (categoriaId: number | null) => void;
  }

  function FiltroCategoria({
  categorias,
  categoriaSelecionada,
  onChangeCategoria,
  }: FiltroCategoriaProps) {

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    onChangeCategoria(value === '' ? null : Number(value));
  }

  return (
    <div className="flex justify-center my-4">
      <select
        aria-label="Filtrar por categoria"
        value={categoriaSelecionada ?? ''}
        onChange={handleChange}
        className="border rounded px-4 py-2  
        focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
        <option value="">Todas as categorias</option>

        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nomeCat}
          </option>
        ))}

      </select>
    </div>
  );
}

export default FiltroCategoria;
