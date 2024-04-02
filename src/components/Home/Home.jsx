import React from 'react'

const Home = () => {
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