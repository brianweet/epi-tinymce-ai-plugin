!function(i){"use strict";var r=function(t){if(!t.ok)throw console.log(t),new Error("Network response was not ok.");var e=t.headers.get("content-type");if(e&&e.includes("application/json"))return t.json();throw new TypeError("Oops, we did not receive JSON!")},c="Your AI content editor is working hard, please wait (30~40s) .";return tinymce.PluginManager.add("epi-tinymce-ai-plugin",function(o,t){o.addButton("epi-tinymce-ai-plugin",{tooltip:"Generate text",image:"https://openai.com/favicon.png",onclick:function(){var t=o.getBody().textContent;if(t.startsWith(c))i.alert("Please wait a bit or remove the wait message.");else{var e=function(t){return t.setProgressState(!0),t.setContent(c),setInterval(function(){t.setContent(t.getBody().textContent+".")},500)}(o),n=function(t){return"/api/ai-contenteditor/please-finish-my?sentence="+t}(t);i.fetch(n).then(function(t){return function(t,e){t.setProgressState(!1),clearInterval(e),t.focus()}(o,e),t}).then(r).then(function(e){return function(t){console.log(t),e.setContent(t.cleanResult)}}(o)).catch(function(e,n){return function(t){console.log(t),i.alert("Something went wrong, check console"),e.setContent(n)}}(o,t))}}})}),function(){}}(window)();