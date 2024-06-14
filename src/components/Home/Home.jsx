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
    currentUserId,
    setSnippets,
    user,
 }) => {


  return (
    <>
    <div className="app">
      <Header snippets={snippets} setSnippets={setSnippets} onSnippetAdded={onSnippetAdded} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentUserId={currentUserId}/>
      <section className="snippetCardContainer">
        <SnippetList
          filteredSnippets={filteredSnippets}
          onSnippetEdited={onSnippetEdited}
          onSnippetDeleted={onSnippetDeleted}
          snippets={snippets}
          user={user}
        />
      </section>
    </div>
  </>
  )
}

export default Home