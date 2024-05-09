import React from 'react'
import Header from'../Header/Header.jsx'
import SnippetList from '../SnippetList/SnippetList.jsx'

const Home = ({ 
    onSnippetAdded,
    searchTerm,
    setSearchTerm,
    filteredSnippets,
    onSnippetEdited,
    onSnippetDeleted,
    snippets
 }) => {
  return (
    <>
    <div className="app">
      <Header onSnippetAdded={onSnippetAdded} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <section className="snippetCardContainer">
        <SnippetList
          filteredSnippets={filteredSnippets}
          onSnippetEdited={onSnippetEdited}
          onSnippetDeleted={onSnippetDeleted}
          snippets={snippets}
        />
      </section>
    </div>
  </>
  )
}

export default Home