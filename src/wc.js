globalThis.wc={
    dialog:function(title,...elements){
        let dlg = document.createElement("DIALOG");
        let times=document.createElement("span");
        let titleDiv=document.createElement("div");
        titleDiv.className="wc-dialog-title";
        titleDiv.innerHTML=title;
        dlg.className="wc-dialog";
        times.innerHTML="&times";
        times.className="times";
        times.onclick=()=>{dlg.close();document.body.removeChild(dlg)};
        titleDiv.appendChild(times);
        dlg.appendChild(titleDiv);
        for(let x of elements){
            dlg.appendChild(x);
        }
        document.body.appendChild(dlg);
        dlg.showModal();
    },
    text:function(content,title){
        let contentDiv=document.createElement("div");
        contentDiv.className="wc-dialog-content";
        (typeof(content)=="string")?contentDiv.innerHTML=content:contentDiv.appendChild(content);
        this.dialog(title,contentDiv);
    },
    select:function(content,title,buttons=[],onclick){
        let contentDiv=document.createElement("div");
        let dlg = document.createElement("DIALOG");
        let times=document.createElement("span");
        let titleDiv=document.createElement("div");
        contentDiv.className="wc-dialog-content";
        contentDiv.innerHTML=content;
        contentDiv.id='content';
        titleDiv.className="wc-dialog-title";
        titleDiv.innerHTML=title;
        dlg.className="wc-dialog";
        times.innerHTML="&times";
        times.className="times";
        times.onclick=()=>{dlg.close();document.body.removeChild(dlg)};
        titleDiv.appendChild(times);
        dlg.appendChild(titleDiv);
        dlg.appendChild(contentDiv);
        for(let x of buttons){
            let btn=document.createElement("button");
            btn.className="wc-button "+x.className;
            btn.innerHTML=x.innerHTML;
            btn.onclick=()=>{
                times.onclick();
                onclick.call(dlg,buttons.indexOf(x));
            }
            dlg.appendChild(btn);
        }
        document.body.appendChild(dlg);
        dlg.showModal();
    },
    input:function(content,title,txt,buttons=[],onclick){
        let contentDiv=document.createElement("div");
        let dlg = document.createElement("DIALOG");
        let times=document.createElement("span");
        let titleDiv=document.createElement("div");
        let inputBox=document.createElement("input"); 
        inputBox.value=txt;
        inputBox.type="text";
        inputBox.className="input";
        contentDiv.className="wc-dialog-content";
        contentDiv.innerHTML=content+"<br/>";
        contentDiv.appendChild(inputBox);
        titleDiv.className="wc-dialog-title";
        titleDiv.innerHTML=title;
        dlg.className="wc-dialog";
        times.innerHTML="&times";
        times.className="times";
        times.onclick=()=>{dlg.close();document.body.removeChild(dlg)};
        titleDiv.appendChild(times);
        dlg.appendChild(titleDiv);
        dlg.appendChild(contentDiv);
        for(let x of buttons){
            let btn=document.createElement("button");
            btn.className="wc-button "+x.className;
            btn.innerHTML=x.innerHTML;
            btn.onclick=()=>{
                times.onclick();
                onclick.call(dlg,inputBox.value,buttons.indexOf(x));
            }
            dlg.appendChild(btn);
        }
        document.body.appendChild(dlg);
        dlg.showModal();
    }
}

window.alert = function (content,title=undefined,ok=undefined,onclick=()=>{}) {
    let result=false;
    wc.select(content,(!title)?Blockly.Msg['xt']:title,[{innerHTML:(!ok)?Blockly.Msg['ok']:ok,className:"wc-button1"}],(a)=>{
        onclick(a);
    });
}
window.confirm=function(text,onclick){
    wc.select(text,Blockly.Msg['xt'],[{innerHTML:Blockly.Msg['ok'],className:"wc-button1"},{innerHTML:Blockly.Msg['no'],className:'wc-button2'}],(index)=>{
        onclick(index==1?false:true);
    })
}
window.about=function(){
    let  center=document.createElement('CENTER');
    center.innerHTML=Blockly.Msg['aboutContent'];
    wc.text(center,Blockly.Msg['about']+"&nbsp;&nbsp;BOX3 Blockly");
}
window.prompt=function(content,txt,onclick){
    wc.input(content,Blockly.Msg['xt'],txt,[{innerHTML:Blockly.Msg['ok'],className:"wc-button1"},{innerHTML:Blockly.Msg['no'],className:"wc-button2"}],(t,b)=>{
        if(b===0){onclick&&onclick(t,b)};
    });
  
}
Blockly.dialog.setPrompt=window.prompt;