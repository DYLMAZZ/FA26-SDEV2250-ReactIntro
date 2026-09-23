const welcome = {
    greeting: 'Hey',
    title: "React",
};

const title = 'React';

function getTitle(title) {
    return title;
}

function App() {
  return (
    <div>
    <h1>Hello {getTitle('React')}</h1>

    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
    </div>
  );
}
export default App;