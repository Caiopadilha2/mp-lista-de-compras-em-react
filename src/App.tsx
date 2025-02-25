import logo from './assets/logo.svg';
import { useState, useRef } from 'react';
import Item from './components/Item';
import {nanoid} from 'nanoid';

export type Item = {
  id: string
  name: string,
  quantity: string,
  completed: boolean,
}

function App() {

  const [items, setItems] = useState<Item[]>([
    { id: nanoid(), name: 'leite em pó', quantity: '3 caixas', completed: true},
    { id: nanoid(), name: 'arroz', quantity: '5 kg', completed: false},
    { id: nanoid(), name: 'feijão', quantity: '2 kg', completed: false},
    { id: nanoid(), name: 'cerveja', quantity: '1 litro', completed: true},
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const completedItems = items.filter((item) => item.completed);
  const notCompletedItems = items.filter((item) => !item.completed);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    // Pegar o nome e a quantidade que vêm no forumulário
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    const name = formData.get('name');
    const quantity = formData.get('quantity');
    
    // Construir um Item (objeto item)
    const newItem: Item = {
      id: nanoid(),
      name: name as string,
      quantity: quantity as string,
      completed: false,
    };

    // Adicionar o novo item à lista de items/estado
    const newItems = [newItem, ...items];
    setItems(newItems);


    // Limpar os inputs do formulário
    formEl.reset();

    // Dar foco no primeiro input

    inputRef.current && inputRef.current.focus()

  }

  function handleClickComplete(id: string){
    
    // Pegar o item correspondente e marcar o completed como o oposto
    const newItems = items.map(item => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    })

    // console.log(newItems);

    // setar o novo estado
    setItems(newItems);
  }

  function handleClickDelete(id: string){
    // Filtrar os items que não são iguais ao item a ser deletado
    const newItems = items.filter(item => item.id !== id);
    
    // setar o novo estado
    setItems(newItems);
  
  }
  

  return (
    <main className="max-w-2xl px-6 py-12 pb-20 mx-auto my-10 bg-white md:my-20 md:px-32 md:rounded-3xl">
      <header className="text-center">
        <img src={logo} alt="logotipo" className="mx-auto" />
        <h1 className="mt-4 text-3xl font-medium font-display">
          Lista de Compras
        </h1>
        <p className="text-sm text-slate-500">
          Facilite sua ida ao supermercado!
        </p>
        <hr className="w-1/3 mx-auto mt-6 mb-8" />
      </header>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="flex-shrink">
          <label htmlFor="name" className="block text-xs text-slate-400">
            Item
          </label>
          <input
            ref={inputRef}
            name='name'
            type="text"
            id="name"
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <div className="flex-shrink">
          <label htmlFor="quantity" className="block text-xs text-slate-400">
            Quantidade
          </label>
          <input
            name='quantity'
            type="text"
            id="quantity"
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <button className="self-end flex-shrink h-10 px-4 font-extrabold text-white rounded-lg bg-fuchsia-300">
          +
        </button>
      </form>
      <section className="mt-10 space-y-3 ">
        {/* <Item item={items[0]}/> */}
        {notCompletedItems.map((item) => (
          <Item key={item.id} item={item} handleClickComplete={handleClickComplete} handleClickDelete={handleClickDelete}/>
        ))}
      </section>
      <section className="mt-16 space-y-3">
        <h2 className="mb-10 text-3xl text-center font-display">
          Itens já comprados
        </h2>
        {completedItems.map((item) => (
          <Item key={item.id} item={item} handleClickComplete={handleClickComplete} handleClickDelete={handleClickDelete} />
        ))}
      </section>
    </main>
  );
}

export default App;
