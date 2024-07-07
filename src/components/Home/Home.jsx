import React, { useContext, createContext } from 'react'
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
    getClassNameSuffix,
    lightMode
 }) => {

  console.log("%cconsole css styling example", "color: green");
  console.log(getClassNameSuffix(lightMode))

  const passPatchResponseObjectFromSnippetListToHome = (responseSnippetObject) => {
    onSnippetEdited(responseSnippetObject)
  }


  return (
    <>
    <div className="app">
      <Header snippets={snippets} setSnippets={setSnippets} onSnippetAdded={onSnippetAdded} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentUserId={currentUserId} lightMode={lightMode} getClassNameSuffix={getClassNameSuffix}/>
      <section className={`snippet-card-container${getClassNameSuffix(lightMode)}`}>
        
        <SnippetList
          filteredSnippets={filteredSnippets}
          passPatchResponseObjectFromSnippetListToHome={passPatchResponseObjectFromSnippetListToHome}
          onSnippetDeleted={onSnippetDeleted}
          snippets={snippets}
          user={user}
          getClassNameSuffix={getClassNameSuffix}
          lightMode={lightMode}
        />
      </section>
    </div>
  </>
  )
}

export default Home