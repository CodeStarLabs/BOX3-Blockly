require('!style-loader!css-loader!../styles/material.indigo-pink.min.css');
require('./wc.js');
require('./login.js');
let loadBg=document.getElementById("loadBg");
const header=document.getElementById("header");
if(!localStorage||localStorage.themem==undefined)localStorage.themem="��ˬ��";
globalThis.yuColor=localStorage.themem;
const themem={
    "��ˬ��":{
        backgroundColor:"rgb(0,135,255)",
        color:"#FFF",
    },
    "�����":{
        backgroundColor:"#ffe200",
        color:"#631f0c",
    },
    "��ʯ��":{
        backgroundColor:"#00bf0a",
        color:"#FFF",
    },
    "Ԫ����":{
        backgroundColor:"#ff8715",
        color:"#FFF"
    },
    "�ǳ���":{
        backgroundColor:"#8f1fff",
        color:"#FFF"
    },
    "�һ���":{
        backgroundColor:"#ff155c",
        color:"#FFF"
    }
}
header.style.backgroundColor=themem[localStorage.themem].backgroundColor;
header.style.color=themem[localStorage.themem].color;
window.selectColor = function(e) {
    for(let x of document.getElementById("colorTheme").children) x.style.border = "3px solid rgba(0,0,0,0)";
    e.style.border = "3px solid rgb(255,215,0)";
    yuColor=e.id;
}
window.setTheme = function(){
    window.alert(Blockly.Msg['themeDlg'],Blockly.Msg['themeColor'],undefined,()=>{
        localStorage.themem = yuColor;
    });
}
Blockly.Msg['themeDlg'] = `
<div style="user-select:none" id="colorTheme">
<div class="colorDiv" style="background-color:rgb(0,135,255)" id="��ˬ��" onclick="selectColor(this);"><center style="position:relative;top:90px;">${Blockly.Msg['blue']}</center></div>
<div class ="colorDiv" style="background-color:#ffe200" id="�����" onclick="selectColor(this)"><center style="position:relative;top:90px;">${Blockly.Msg['yellow']}</center></div>
<div class ="colorDiv" style="background-color:#00bf0a" id="��ʯ��" onclick="selectColor(this)"><center style="position:relative;top:90px;">${Blockly.Msg['green']}</center></div>
<br/>
<div class ="colorDiv" style="background-color:#ff8715" id="Ԫ����" onclick="selectColor(this)"><center style="position:relative;top:90px;">${Blockly.Msg['orange']}</center></div>
<div class ="colorDiv" style="background-color:#8f1fff" id="�ǳ���" onclick="selectColor(this)"><center style="position:relative;top:90px;">${Blockly.Msg['purple']}</center></div>
<div class ="colorDiv" style="background-color:#ff155c" id="�һ���" onclick="selectColor(this)"><center style="position:relative;top:90px;">${Blockly.Msg['red']}</center></div>
</div>
`
function setColor(){
    Blockly.Themes.CUSTOM_THEME = Blockly.Theme.defineTheme('CUSTOM_THEME', {
        'base': Blockly.Themes.Classic,
        'categoryStyles': {
            'custom_category': {
                'colour': themem[localStorage.themem].backgroundColor                     // ��������ɫ��ʶ
            },
        },
        'componentStyles': {
            'toolboxBackgroundColour': "#FFF",     
            'insertionMarkerColour': '#f5f5f5',       
            'insertionMarkerOpacity': 0.3,            
            'cursorColour': '#f5f5f5',                
        }
    })
}
setColor();
class CustomCategory extends Blockly.ToolboxCategory {
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
    addColourBorder_(colour){
        this.rowDiv_.style.backgroundColor = colour;
    }
    setSelected(isSelected){
        var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            this.rowDiv_.style.backgroundColor = this.colour_;
            this.rowDiv_.style.boxShadow="1px 1px 10px grey";
        } else {
            this.rowDiv_.style.backgroundColor = this.colour_;
            labelDom.style.color = 'white';
            this.rowDiv_.style.boxShadow="";
        }
        // This is used for accessibility purposes.
        Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
}

    Blockly.registry.register(
        Blockly.registry.Type.TOOLBOX_ITEM,
        Blockly.ToolboxCategory.registrationName,
        CustomCategory, true);

function downLoad(text,name){
    var content = text;
    var data = new Blob([content],{type:"text/plain;charset=UTF-8"});
    var downloadUrl = window.URL.createObjectURL(data);
    var anchor=document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = name;
    anchor.click();
    window.URL.revokeObjectURL(data); 
}
(function() {
    //loading();
    globalThis.Version="V.1.3.12";
    window.onload=function(){
        try{
        document.body.removeChild(loadBg);}catch(e){}
    }

    function start() {
        setInterval(async()=>{
            let code=handlePlay();
            codeBorad.innerHTML=highLight(code+Blockly.Msg["code"]);
            save();
            header.style.backgroundColor=themem[localStorage.themem].backgroundColor;
            header.style.color=themem[localStorage.themem].color;
        },60);
    }
    var codeBorad=document.getElementById("code");
    var copy=document.getElementById("copy");
  function handlePlay(event) {
    let code=Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    return code;
  }
  
  copy.onclick=function(){
      try{
          copyToClipboard(codeBorad.innerText);
          alert(Blockly.Msg["COPY_OK"]);
      }catch(e){
          alert(Blockly.Msg["COPY_CANCEL"]+e.message);
      }
  }
  
  function copyToClipboard(s) {
      if (window.clipboardData) {
          window.clipboardData.setData('text', s);
      } else {
          (function(s) {
              document.oncopy = function(e) {
                  e.clipboardData.setData('text', s);
                  e.preventDefault();
                  document.oncopy = null;
              }
          })(s);
          document.execCommand('Copy');
      }
  }
  
  var workspace=Blockly.inject('blocklyDiv',{
    toolbox:document.getElementById("toolbox"),
    scrollbars:true,
    grid:
         {spacing: 50,
          length: 1.5,
          colour: 'grey',
          snap: true},
    trashcan: true,
    theme:Blockly.Themes.CUSTOM_THEME,
    renderer:"custom_renderer",
    media:"media/",
    zoom: {
        startScale: 0.9
    }
  });

  function highLight(code){
      code=code.replace(/\r\n|[\r\n]/g,"\n").replace(/^\s+|\s+$/g,"");
      code=code.replace(/(\/\/.*|\/\*[.\s]+?\*\/)|((["'])(?:\\.|[^\\\n])*?\3)|\b(break|continue|do|for|in|function|if|else|return|switch|this|throw|try|catch|finally|var|while|with|case|new|typeof|instance|delete|void|async|await)\b|\b(Box3World|Box3Entity|Box3Player|Box3Voxels|voxels|world|console|Object|Array|String|Number|Boolean|Function|RegExp|Date|Math|window|document|navigator|location)\b|\b(true|false)\b|\b(null|undefined|NaN)\b|(?:[^\W\d]|\$)[\$\w]*|(0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE]\d+)?)|([()!=<>{}+\-\*\/|&;?\.%\]\[])|(?:[^\)\]\}]|^)(\/(?!\*)(?:\\.|[^\\\/\n])+?\/[gim]*)|[.\s]/g,function(){
          var a,l,i,s;
          a=arguments;
          for(i=1;i<=9;i++)if(s=a[i]){
              s=htmlEncode(s);
              switch(i){
                  case 1:
                      return s.fontcolor("grey").italics();
                  case 2:case 3:
                      return s.fontcolor("#00B60C");
                  case 4:
                      return s.fontcolor("blue");
                  case 5:
                      return s.fontcolor("#190075");
                  case 6:
                      return s.fontcolor("#DD6600");
                  case 7:
                      return s.fontcolor("#BB4433");
                  case 8:
                      return s.fontcolor("#CC3322");
                  case 10:
                      return htmlEncode(a[0]).replace(s,s.fontcolor("#33AA33"));
                  case 9:
                      return s.fontcolor("#FF0D00");
              };
          };
          return htmlEncode(a[0]);
      });
    return code;
  }
  function htmlEncode(e){
      var i,s;
      for(i in s={
      "&amp;":/&/g,"&quot;":/"/g,"&#039;":/'/g,
      "&lt;":/</g,"&gt;":/>/g,"<br/>":/\n/g,
      "&nbsp;":/ /g,"&nbsp;&nbsp;":/\t/g
      })e=e.replace(s[i],i);
      return e;
  };
  /*function loading(){
      let dlg=document.createElement("div");
      dlg.style.width="100%";
      dlg.style.height=window.outerHeight+"px";
      dlg.style.position="fixed";
      dlg.style.top="0px";
      dlg.style.zIndex="200";
      dlg.style.backgroundColor="rgb(240,240,255)";
      dlg.style.userSelect="none";
      dlg.id="loadBg";
      dlg.innerHTML=`
          <center>
            <h1 class="title">BOX3 Blockly</h1>
            <img src="images/logo.png" style="position:fixed;border-radius:50%;margin-left:-48px;margin-top:10px;"></img>
            <div class="load"></div><br/>
            <p id="loadContent">${Blockly.Msg["LOAD"]}</p>
          </center>
      `
      document.body.appendChild(dlg);
  }*/
  globalThis.save=function(){
      var value=xmlToDom();
      localStorage.setItem("blocks",value)
  }
  globalThis.xmlToDom=function(){
      var xml=Blockly.Xml.workspaceToDom(workspace);
      var value=encodeURIComponent(Blockly.Xml.domToText(xml));
      return value;
  }
  function show(){
      let a;
      var xml=Blockly.Xml.textToDom((a=localStorage.blocks)?decodeURIComponent(a):Blockly.Msg['modeBlocks']);
      Blockly.Xml.domToWorkspace(xml,workspace);
  }
  globalThis.openFile=function() {
            var file = document.getElementById('files').files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            try {
                reader.onload = function () {
                    workspace.clear();
                    var xml = Blockly.Xml.textToDom(this.result);
                    Blockly.Xml.domToWorkspace(xml, workspace);
                }
                Blockly.alert(Blockly.Msg['openFinish'])
            } catch (e) {
                Blockly.alert(Blockly.Msg['openError']+e)
            }
        }
  show();
  start();
})();