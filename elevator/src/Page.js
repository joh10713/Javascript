import React, { Component } from "react";
import "./App.css";
import ElevatorElementList from "./ElevatorElementList";

class Page extends Component {

  render() {

    var example = {"dates":[{"label":"date","dateAsset":[{"end":{"text":"","numeric":""},"label":"","start":{"text":"1st Century bCE","numeric":"-65322890640"},"isPrimary":false}]},{"label":"Creation Date","dateAsset":[{"end":{"text":"","numeric":""},"label":"","start":{"text":"1990","numeric":"631152000"},"isPrimary":false}]}],"title":"1","entries":[{"Date":true,"label":"date","entries":["1st Century bCE"]},{"label":"location","entries":["55105"],"Location":true},{"label":"multiselect","entries":["Ancient Egyptian, Ancient Egyptian, Early Dynastic (or Thinite), First Dynasty"],"Multiselect":true},{"label":"select","Select":true,"entries":["option 2"]},{"Tags":true,"label":"tag list","entries":["fda, twe, fds"]},{"Text":true,"label":"text","entries":["fdafda,fdsafds","vdsafds"]},{"label":"text area","entries":["\u00a0fdafsdjlak ;salkjfdksl;a jfe;kslajfsdajkl feskf"],"Textarea":true},{"Text":true,"label":"Access Conditions","entries":["fdafdsa"]},{"Date":true,"label":"Creation Date","entries":["1990"]}],"objectId":"595667b7ba98a8cd386f9381","locations":[{"label":"location","entries":[{"loc":{"type":"Point","coordinates":[-93.1629063,44.9330076]},"address":"55105","isPrimary":false,"locationLabel":""}]}]}

    var fillIn = {"recordtitle_1":[{"fieldContents":"boop","isPrimary":true}],"inlinerelatedasset_1":[{"targetAssetId":"597644f0ba98a84818b4171f","label":null,"isPrimary":true},{"targetAssetId":"5976583eba98a81918b4171f","label":null,"isPrimary":false}],"newwindowasset_1":[{"targetAssetId":"59764770ba98a86a5ab41721","label":"","isPrimary":false}],"templateId":53,"readyForDisplay":true,"collectionId":27,"availableAfter":null,"modified":{"date":"2017-07-24 20:27:45","timezone_type":3,"timezone":"UTC"},"modifiedBy":51,"createdBy":"","collectionMigration":null}

    var data = {"templateId":"53","templateName":"Related Asset Host","widgetArray":[{"widgetId":2145,"type":"text","allowMultiple":true,"attemptAutocomplete":false,"fieldTitle":"recordtitle_1","label":"Record Title","tooltip":"","fieldData":[]},{"widgetId":2146,"type":"related asset","allowMultiple":true,"attemptAutocomplete":true,"fieldTitle":"inlinerelatedasset_1","label":"Inline related asset","tooltip":"","fieldData":{"nestData":true,"showLabel":true,"displayInline":true,"thumbnailView":false,"defaultTemplate":54,"collapseNestedChildren":false}},{"widgetId":2147,"type":"related asset","allowMultiple":false,"attemptAutocomplete":true,"fieldTitle":"newwindowasset_1","label":"New Window Asset","tooltip":"","fieldData":{"nestData":true,"showLabel":true,"matchAgainst":[54,53],"displayInline":false,"thumbnailView":false,"defaultTemplate":54,"collapseNestedChildren":false}}],"collections":{"25":{"Blank Generation":{"28":"fades"}},"20":{"Collection two":{"23":"Test Collection"}},"29":"Date testing","1":"Initial Collection","26":"Lang Center New","24":"Language Center","40":"new test collection","35":"Obama Speeches","27":"really blank","41":"Speeches 2"},"allowedCollections":{"25":"Blank Generation","20":"Collection two","29":"Date testing","28":"fades","1":"Initial Collection","26":"Lang Center New","24":"Language Center","40":"new test collection","35":"Obama Speeches","27":"really blank","41":"Speeches 2","23":"Test Collection"}}

  return (
    <div className='page' style={{height: "100%"}}>
      <ElevatorElementList data={data} fillIn={fillIn} example={example} nested={false}/>
    </div>
  );
  }
}

export default Page;
