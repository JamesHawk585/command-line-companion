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
    snippets, 
    currentUserId
 }) => {


  return (
    <>
    <div className="app">
      <Header onSnippetAdded={onSnippetAdded} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentUserId={currentUserId}/>
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