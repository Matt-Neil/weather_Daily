import './App.css';
import React from "react";
import Nav from "./components/nav";
import MainInfo from "./components/mainInfo";
import SearchBox from "./components/searchBox";
import MainContextProvider from "./contexts/mainContext";
import RecentContextProvider from "./contexts/recentContext";
import UnitContextProvider from "./contexts/unitContext";
import Recent from "./components/recent";
import FavouriteContextProvider from "./contexts/favouriteContext";
import MidSectionLower from "./components/midSectionLower";
import UpdateContextProvider from "./contexts/updateContext";

function App() {
    return (
          <MainContextProvider>
              <RecentContextProvider>
                  <UnitContextProvider>
                      <FavouriteContextProvider>
                          <div className={"mainPage mainPageSmall mainPageLarge"}>
                              <div className={"midSection midSectionSmall midSectionLarge"}>
                                  <Nav />
                                  <div className={"midSectionUpper"}>
                                      <MainInfo />
                                      <div className={"searchBoxContainer searchBoxContainerSmall searchBoxContainerMedium searchBoxContainerLarge"}>
                                          <SearchBox />
                                          <Recent />
                                      </div>
                                  </div>
                                  <UpdateContextProvider>
                                    <MidSectionLower />
                                  </UpdateContextProvider>
                              </div>
                          </div>
                      </FavouriteContextProvider>
                  </UnitContextProvider>
              </RecentContextProvider>
          </MainContextProvider>
    );
}

export default App;
