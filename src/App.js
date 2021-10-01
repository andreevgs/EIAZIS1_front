import './App.css';
import { useState } from "react";
import axios from "axios";

function App() {
  const [docName, setDocName] = useState('');
  const [docContent, setDocContent] = useState('');
  const [docTitle, setDocTitle] = useState('');

  const [findWord, setFindWord] = useState('');
  const [coef, setCoef] = useState('');
  const [isFounded, setIsFounded] = useState(false);

  const handleCreateDoc = (e) => {
    e.preventDefault();

    const docObject = {
      name: docName,
      content: docContent,
      title: docTitle
    };
    axios.post('http://localhost:3001/library/document', docObject)
        .then(response => {
          alert('Документ добавлен');
          console.log(response);
        })
        .catch(error => {
          alert('Документ не добавлен, произошла ошибка');
          console.log(error);
        });

  }

  const handleFindDoc = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/library/document?word=${findWord}`)
        .then(response => {
          if (response.data.coef) {
              setCoef(response.data.coef);
          }
          else {
              setCoef('Не найдено');
          }

          if (!isFounded) {
            setIsFounded(true);
          }
          console.log(response);
        })
        .catch(error => {
          setIsFounded(false);
          alert('Ошибка поиска');
          console.log(error);
        });
  }

  return (
    <div className="App">
      <form method={'POST'}>
        <h2>Добавить документ</h2>
        <input
            name={'name'}
            placeholder={'навзвание'}
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
        />
        <input
            name={'content'}
            value={docContent}
            placeholder={'содержимое'}
            onChange={(e) => setDocContent(e.target.value)}
        />
        <input
            name={'title'}
            placeholder={'заголовок'}
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
        />
        <button
            type={'submit'}
            onClick={handleCreateDoc}
        >
          Записать
        </button>
      </form>
      <form method={'GET'}>
        <h2>Поиск по слову</h2>
        <input
            name={'name'}
            onChange={(e) => setFindWord(e.target.value)}
        />
        <button
            type={'submit'}
            onClick={handleFindDoc}
        >
          Искать
        </button>
      </form>
      {isFounded && (
          <h2>Коэфициент: {coef}</h2>
      )}
    </div>
  );
}

export default App;
