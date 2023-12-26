import { useEffect} from 'react'
import esriConfig from "@arcgis/core/config.js";
import { loadModules } from 'esri-loader';
import './App.css';

function App() {
      
  useEffect(()=>{
    const initMap = async () => {
    const [Map,MapView,FeatureLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer']);
    esriConfig.apiKey = "AAPK80f0ff59d80d4876ade08bdc6fac53a7-Bl_raqrsy-PAoWFD6ENJb92EiUBZk_tbNA20m5HUyAazcZgJw7SUiKioz6Aqcfm";
    const map =  new Map({
      basemap: "topo-vector"
    });
    const view = new MapView({
      map: map,
      center: [35.0, 31.5], 
      zoom: 8, 
      container: "viewDiv"
    });
    const popupLayer = {
      "content": " <span>City: {CITY_Name}</span><br><span>Population: {POP}</span>"
    }
    const trailheadsLayer = new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
      outFields: ["CITY_NAME","POP"],
      definitionExpression: "STATUS LIKE 'National%'",
      popupTemplate: popupLayer
    });
    map.add(trailheadsLayer);
  };
  initMap();
  },[])

  return (
    <>
      <div id="viewDiv"></div>
    </>
  )
}

export default App;
