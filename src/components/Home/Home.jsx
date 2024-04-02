import React from 'react'
import Header from'../Header/Header.jsx'
import SnippetList from '../SnippetList/SnippetList.jsx'

const Home = ({ 
    onSnippetAdded,
    searchTerm,
    setSearchTerm,
    API,
    filteredSnippets,
    onSnippetEdited,
    onSnippetDeleted
 }) => {
  return (
    <>
    <div className="app">
      <Header onSnippetAdded={onSnippetAdded} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <section className="snippetCardContainer">
        <SnippetList
          API={API}
          // snippets={snippets}
          filteredSnippets={filteredSnippets}
          onSnippetEdited={onSnippetEdited}
          onSnippetDeleted={onSnippetDeleted}
        />
      </section>
    </div>
  </>
  )
}

export default Home