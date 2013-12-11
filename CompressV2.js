var libxml = require('libxmljs');
var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
           '<root>' +
               '<child foo="bar">' +
                   '<grandchild baz="fizbuzz">'+
			'<blah>grandchild content<inblah>blah blah</inblah></blah>' +
			'<blah1>grandchild content blah2</blah1>'+
		   '</grandchild>' +
               '</child>' +
               '<child foo="bar1">' +
                   '<grandchild baz="fizbuzz">grandchild content 1</grandchild>' +
               '</child>' +
               '<child foo="bar3">' +
                   '<grandchild baz="fizbuzz3">grandchild content 3</grandchild>' +
               '</child>' +
               '<sibling>with content!</sibling>' +
           '</root>';


var xmlDoc = libxml.parseXml(xml);
var allxml = xmlDoc.root();  //store all nodes as allxml
var allNodes = xmlDoc.childNodes(); //all child nodes to array

var metachild = new libxml.Element(xmlDoc, 'MetaTag');
allxml.addChild(metachild);

findAndIterate(allxml,0, metachild);

/***
	@breif: Recuesive function which read each node and call on the 
		replace function to it
	@args:	element - the libxml Element object holds all the nodes 
		required to replace
		id - the iterater variable which store the sequence level
		of the iteration. Initially 0
		metachild - meta data Node object which records the value and
		key pairs which get replaced  
*/
function findAndIterate(element, id, metachild)
{
	var num = hasChild(element);
	var i = 0;
	while (i < num ){
		id++;
		if (element.childNodes().length > 0){
			replaceCurrentTag(element, metachild)
			var node = element.childNodes()[i];		
			findAndIterate(node, id, metachild);
		}
		i++;
	}
}


/***
	@breif: Set the current tag value with an unique integer value
	@args:	currelem - the Elemenmt object which holds the nodes
		to be replaced
		metatag - the Element object of the meta data node
		
*/


function replaceCurrentTag(currelem, metatag){
var nme = allxml.find('//'+currelem.name());
var keyValues = allxml.find('//key');
var index = getMax(keyValues)+1;

	for (var i=0;i<nme.length;i++){
			if(nme[i].name() != 'MetaTag' && 
				nme[i].name() != 'pair' && 
					nme[i].name() != 'key' && 
						nme[i].name() != 'value' && !is_int(nme[i].name())){
							writeMetaTag(metatag, nme[i].name(),index);
							nme[i].name(index.toString());
				}
			}

}

/***
	@berif: Update the key->value pair in the meta node
	@args:	metatag - meta data Element object
		value - the current value of the tag
		j - replaced integer value 
*/
function writeMetaTag(metatag, value, j){

var newpair = new libxml.Element(xmlDoc, 'pair');
var pairkey = new libxml.Element(xmlDoc, 'key');
var pairvalue = new libxml.Element(xmlDoc, 'value');
var arrallTags = metatag.find('//value'); // get all meta childs to array
	if(arrallTags.length > 0)
	{
		var isthere = false;
		for(i=0;i<arrallTags.length;i++)
		{
			if(arrallTags[i].text() == value) isthere = true;
		}
		if(metatag.get('//value').text() != value && !isthere){
			metatag.addChild(newpair);
			newpair.addChild(pairkey);
			newpair.addChild(pairvalue);
			pairkey.text(j);
			pairvalue.text(value);
		}
	}
	else{
			metatag.addChild(newpair);
			newpair.addChild(pairkey);
			newpair.addChild(pairvalue);
			pairkey.text(j);
			pairvalue.text(value);
	}

}


function hasChild(xmlElement){
	var e = xmlElement.childNodes();
	if (e.length > 0){ return e.length;	}
}

function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else {
      return false;
  }
}

function getMax(array){
var max=0;
for(var arr = 0; arr<array.length; arr++){
	if(parseInt(array[arr].text())>max) { max = parseInt(array[arr].text());	}
	}
return max;
}
console.log(xmlDoc.toString());
