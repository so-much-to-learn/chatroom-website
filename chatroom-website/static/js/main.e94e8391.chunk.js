(this["webpackJsonpchatroom-website"]=this["webpackJsonpchatroom-website"]||[]).push([[0],{112:function(e,t,r){e.exports={colors:'"~styles/color.module.css"',sidebarBgc:"#4D474B",sidebarColor:"#A5A4A5",container:"login_container__24SaD",tab:"login_tab__2mzrB"}},153:function(e,t,r){e.exports={colors:'"../../styles/color.module.css"',sidebarBgc:"#4D474B",sidebarColor:"#A5A4A5",settingBar:"settingBar_settingBar__3KVTe"}},182:function(e,t,r){},330:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(11),o=r.n(s),c=r(107),i=r.n(c),u=r(18),l=(r(180),r(181),r(182),r(58)),m=r(108),p=r.n(m),b=r(147),d=r(109),f=r(42),g=r(43),h=r(63),y=(r(183),r(6)),O=r(148),j=r.n(O),E=r(175),v=r(12),w=j.a.create({baseURL:"http://sherlocked93.club:7300/mock/5f997599a934e3002d35f0e2/chat-web",timeout:5e3});w.interceptors.request.use((function(e){return e}),(function(e){return console.error("Error in fetch.ts:  ",e),Promise.reject(e)})),w.interceptors.response.use((function(e){var t=e.data,r=t.code,a=(t.data,t.message);e.config;if(![2e4].includes(r)){if(E.b.error("Error in fetch.js respone interceptors:  "+a),40001===r)_.resetUserInfo(),Object(v.e)().push("/login");return Promise.reject(new Error(a))}return e.data}),(function(e){return e.message="\u7f51\u7edc\u901a\u8baf\u5f02\u5e38\uff0c\u8bf7\u68c0\u67e5\uff01",Promise.reject(e)}));var I,k,L,C=w,N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.username,r=e.password;return C({method:"post",url:"/login",data:{username:t,password:r}})},P="cw-user-info",_=new(I=function(){function e(){Object(f.a)(this,e),Object(d.a)(this,"userInfo",k,this),Object(d.a)(this,"chatroomList",L,this),this._getUserInfo()}return Object(g.a)(e,[{key:"addMessage",value:function(e,t){console.log("addMessage")}},{key:"resetUserInfo",value:function(){this.userInfo={uid:null,username:null}}},{key:"userLogin",value:function(){var e=Object(b.a)(p.a.mark((function e(){var t,r,a,n,s,o=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:{},r=t.username,a=t.password,e.next=3,N({username:r,password:a});case 3:return n=e.sent,s=n.data,sessionStorage.setItem(P,JSON.stringify(s)),e.abrupt("return",this.userInfo=s);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getUserInfo",value:function(){var e=sessionStorage.getItem(P);this.userInfo=e?JSON.parse(e):e}},{key:"chatroomNameList",get:function(){return this.chatroomList.map((function(e){return{id:e.id,name:e.name,recentMessage:e.messageList[e.messageList.length-1].message}}))}}]),e}(),k=Object(h.a)(I.prototype,"userInfo",[y.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{uid:null,username:null}}}),L=Object(h.a)(I.prototype,"chatroomList",[y.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[{id:1,name:"\u54c8\u7f57\u7fa4",messageList:[{id:123,personName:"\u5c0f\u660e",message:"this is my message."},{id:124,personName:"\u5c0f\u7ea2",message:"my exam is passed."}]}]}}),Object(h.a)(I.prototype,"chatroomNameList",[y.g],Object.getOwnPropertyDescriptor(I.prototype,"chatroomNameList"),I.prototype),Object(h.a)(I.prototype,"addMessage",[y.f],Object.getOwnPropertyDescriptor(I.prototype,"addMessage"),I.prototype),Object(h.a)(I.prototype,"resetUserInfo",[y.f],Object.getOwnPropertyDescriptor(I.prototype,"resetUserInfo"),I.prototype),Object(h.a)(I.prototype,"userLogin",[y.f],Object.getOwnPropertyDescriptor(I.prototype,"userLogin"),I.prototype),I),B=r(51),S=r(50),A=r(153),F=r.n(A),D=function(e){Object(B.a)(r,e);var t=Object(S.a)(r);function r(){return Object(f.a)(this,r),t.apply(this,arguments)}return Object(g.a)(r,[{key:"render",value:function(){return n.a.createElement("div",{className:F.a.settingBar},"setting bar")}}]),r}(a.Component),T=function(e){Object(B.a)(r,e);var t=Object(S.a)(r);function r(){return Object(f.a)(this,r),t.apply(this,arguments)}return Object(g.a)(r,[{key:"render",value:function(){return n.a.createElement("div",null,"chatlist")}}]),r}(a.Component),U=function(e){Object(B.a)(r,e);var t=Object(S.a)(r);function r(){return Object(f.a)(this,r),t.apply(this,arguments)}return Object(g.a)(r,[{key:"render",value:function(){return n.a.createElement("div",null,"group name")}}]),r}(a.Component),q=function(e){Object(B.a)(r,e);var t=Object(S.a)(r);function r(){return Object(f.a)(this,r),t.apply(this,arguments)}return Object(g.a)(r,[{key:"render",value:function(){return n.a.createElement("div",null,"chatting panel")}}]),r}(a.Component),x=function(e){Object(B.a)(r,e);var t=Object(S.a)(r);function r(){return Object(f.a)(this,r),t.apply(this,arguments)}return Object(g.a)(r,[{key:"render",value:function(){return n.a.createElement("div",null,"typewriting")}}]),r}(a.Component),M=Object(l.b)("store")(Object(l.c)((function(e){var t=e.store;t.userInfo.uid||Object(v.e)().push("/login");return n.a.createElement("div",{className:"home"},t.chatroomNameList.map((function(e){return n.a.createElement("div",{key:e.id},e.recentMessage)})),n.a.createElement(D,null),n.a.createElement(T,null),n.a.createElement(U,null),n.a.createElement(q,null),n.a.createElement(x,null))}))),z=r(166),J=r(84),V=r(112),K=r.n(V),R=r(331),G=r(332),H=r(333),Q=r(334),W=r(173),X=R.a.TabPane,Y="last_login_username",Z=Object(l.b)("store")(Object(l.c)((function(e){var t=e.store,r=e.history,s=G.a.useForm(),o=Object(J.a)(s,1)[0],c=G.a.useForm(),i=Object(J.a)(c,1)[0],u=Object(a.useState)("login"),l=Object(J.a)(u,2),m=l[0],p=l[1],b=Object(a.useState)(localStorage.getItem(Y)||""),d=Object(J.a)(b,2),f=d[0],g=d[1],h=function(){return o.resetFields()},y=function(){return i.resetFields()},O={labelCol:{span:8},wrapperCol:{span:16}},j={wrapperCol:{offset:8,span:16}};return n.a.createElement("div",{className:K.a.container},n.a.createElement(R.a,{defaultActiveKey:"login",activeKey:m,className:K.a.tab,onChange:function(e){p(e),"login"===e?y():h()}},n.a.createElement(X,{tab:"\u767b\u5f55",key:"login"},n.a.createElement(G.a,Object.assign({name:"login",form:o},O,{initialValues:{remember:!0,username:f},onFinish:function(e){var a=e.remember,n=e.username,s=e.password;a&&window.localStorage.setItem(Y,n),t.userLogin({username:n,password:s}).then((function(){return r.push("/")}))}}),n.a.createElement(G.a.Item,{label:"\u7528\u6237\u540d\uff1a",name:"username",tooltip:"\u9009\u4e2d\u300c\u8bb0\u4f4f\u6211\u300d\u4e0b\u6b21\u5c06\u81ea\u52a8\u586b\u5199\u7528\u6237\u540d",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}]},n.a.createElement(H.a,null)),n.a.createElement(G.a.Item,{label:"\u5bc6\u7801\uff1a",name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}]},n.a.createElement(H.a.Password,null)),n.a.createElement(G.a.Item,Object.assign({name:"remember",valuePropName:"checked"},j),n.a.createElement(Q.a,null,"\u8bb0\u4f4f\u6211")),n.a.createElement(G.a.Item,j,n.a.createElement(W.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4"),n.a.createElement(W.a,{htmlType:"button",onClick:h},"\u91cd\u7f6e")))),n.a.createElement(X,{tab:"\u6ce8\u518c",key:"regist"},n.a.createElement(G.a,Object.assign({name:"regist",form:i},O,{onFinish:function(e){var t=e.username;(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.username,r=e.password;return C({method:"post",url:"/regist",data:{username:t,password:r}})})(e).then((function(){window.localStorage.setItem(Y,t),g(t),p("login"),y(),o.setFieldsValue({remember:!0,username:t}),E.b.success("\u6ce8\u518c\u6210\u529f\uff0c\u73b0\u5728\u767b\u5f55\u5427")})).catch((function(e){return console.error("Error: \u6ce8\u518c\u5931\u8d25 ",e)}))}}),n.a.createElement(G.a.Item,{label:"\u7528\u6237\u540d\uff1a",name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}]},n.a.createElement(H.a,null)),n.a.createElement(G.a.Item,{label:"\u5bc6\u7801\uff1a",name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"}]},n.a.createElement(H.a.Password,null)),n.a.createElement(G.a.Item,{label:"\u786e\u8ba4\u5bc6\u7801\uff1a",name:"passwordConfirm",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u786e\u8ba4\u5bc6\u7801"},function(e){var t=e.getFieldValue;return{validator:function(e,r){return t("password")===r?Promise.resolve():Promise.reject(new Error("The two passwords that you entered do not match!"))}}}]},n.a.createElement(H.a.Password,null)),n.a.createElement(G.a.Item,j,n.a.createElement(W.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4"),n.a.createElement(W.a,{htmlType:"button",onClick:y},"\u91cd\u7f6e"))))))}))),$=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(l.a,{store:_},n.a.createElement(z.a,null,n.a.createElement(v.a,{path:"/",component:M,exact:!0}),n.a.createElement(v.a,{path:"/login",component:Z}))))},ee=r(171),te=r.n(ee);r(318);i.a.locale("zh-cn"),o.a.render(n.a.createElement(u.a,{locale:te.a},n.a.createElement($,null)),document.getElementById("root"))}},[[330,1,2]]]);
//# sourceMappingURL=main.e94e8391.chunk.js.map