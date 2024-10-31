import{Ab as De,Bb as C,Cb as Le,Db as Be,G as be,Gb as Me,H as Re,K as $,N as Te,W as we,c as K,ja as ye,mb as ke,nb as Ee,ob as Ae,pb as x,qb as Ue,rb as Oe,sb as Se,tb as Ie,ub as Pe,vb as H,wb as Ne,xb as xe,yb as Ce,zb as ve}from"./chunk-VUSBVABX.js";var Ve="firebasestorage.googleapis.com",We="storageBucket",gt=2*60*1e3,bt=10*60*1e3,Rt=1e3;var d=class t extends Ae{constructor(e,n,s=0){super(ne(e),`Firebase Storage: ${n} (${ne(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,t.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ne(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}},l=function(t){return t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment",t}(l||{});function ne(t){return"storage/"+t}function he(){let t="An unknown error occurred, please check the error payload for server response.";return new d(l.UNKNOWN,t)}function Tt(t){return new d(l.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function wt(t){return new d(l.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function yt(){let t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new d(l.UNAUTHENTICATED,t)}function kt(){return new d(l.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Et(t){return new d(l.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function Xe(){return new d(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Ke(){return new d(l.CANCELED,"User canceled the upload/download.")}function At(t){return new d(l.INVALID_URL,"Invalid URL '"+t+"'.")}function Ut(t){return new d(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Ot(){return new d(l.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+We+"' property when initializing the app?")}function Ze(){return new d(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function St(){return new d(l.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function It(){return new d(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Pt(t){return new d(l.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function re(t){return new d(l.INVALID_ARGUMENT,t)}function Ye(){return new d(l.APP_DELETED,"The Firebase app was deleted.")}function Nt(t){return new d(l.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function z(t,e){return new d(l.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function j(t){throw new d(l.INTERNAL_ERROR,"Internal error: "+t)}var k=class t{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=t.makeFromUrl(e,n)}catch{return new t(e,"")}if(s.path==="")return s;throw Ut(e)}static makeFromUrl(e,n){let s=null,r="([A-Za-z0-9.\\-_]+)";function o(b){b.path.charAt(b.path.length-1)==="/"&&(b.path_=b.path_.slice(0,-1))}let i="(/(.*))?$",u=new RegExp("^gs://"+r+i,"i"),a={bucket:1,path:3};function c(b){b.path_=decodeURIComponent(b.path)}let h="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",m=new RegExp(`^https?://${f}/${h}/b/${r}/o${p}`,"i"),g={bucket:1,path:3},y=n===Ve?"(?:storage.googleapis.com|storage.cloud.google.com)":n,_="([^?#]*)",A=new RegExp(`^https?://${y}/${r}/${_}`,"i"),T=[{regex:u,indices:a,postModify:o},{regex:m,indices:g,postModify:c},{regex:A,indices:{bucket:1,path:2},postModify:c}];for(let b=0;b<T.length;b++){let P=T[b],N=P.regex.exec(e);if(N){let ee=N[P.indices.bucket],q=N[P.indices.path];q||(q=""),s=new t(ee,q),P.postModify(s);break}}if(s==null)throw At(e);return s}},oe=class{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}};function xt(t,e,n){let s=1,r=null,o=null,i=!1,u=0;function a(){return u===2}let c=!1;function h(..._){c||(c=!0,e.apply(null,_))}function f(_){r=setTimeout(()=>{r=null,t(m,a())},_)}function p(){o&&clearTimeout(o)}function m(_,...A){if(c){p();return}if(_){p(),h.call(null,_,...A);return}if(a()||i){p(),h.call(null,_,...A);return}s<64&&(s*=2);let T;u===1?(u=2,T=0):T=(s+Math.random())*1e3,f(T)}let g=!1;function y(_){g||(g=!0,p(),!c&&(r!==null?(_||(u=2),clearTimeout(r),f(0)):_||(u=1)))}return f(0),o=setTimeout(()=>{i=!0,y(!0)},n),y}function Ct(t){t(!1)}function vt(t){return t!==void 0}function Dt(t){return typeof t=="function"}function Lt(t){return typeof t=="object"&&!Array.isArray(t)}function Q(t){return typeof t=="string"||t instanceof String}function Fe(t){return de()&&t instanceof Blob}function de(){return typeof Blob<"u"}function qe(t,e,n,s){if(s<e)throw re(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw re(`Invalid value for '${t}'. Expected ${n} or less.`)}function F(t,e,n){let s=e;return n==null&&(s=`https://${e}`),`${n}://${s}/v0${t}`}function Je(t){let e=encodeURIComponent,n="?";for(let s in t)if(t.hasOwnProperty(s)){let r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var L=function(t){return t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT",t}(L||{});function Qe(t,e){let n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,o=e.indexOf(t)!==-1;return n||r||o}var ie=class{constructor(e,n,s,r,o,i,u,a,c,h,f,p=!0){this.url_=e,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=u,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=f,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((m,g)=>{this.resolve_=m,this.reject_=g,this.start_()})}start_(){let e=(s,r)=>{if(r){s(!1,new D(!1,null,!0));return}let o=this.connectionFactory_();this.pendingConnection_=o;let i=u=>{let a=u.loaded,c=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(a,c)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;let u=o.getErrorCode()===L.NO_ERROR,a=o.getStatus();if(!u||Qe(a,this.additionalRetryCodes_)&&this.retry){let h=o.getErrorCode()===L.ABORT;s(!1,new D(!1,null,h));return}let c=this.successCodes_.indexOf(a)!==-1;s(!0,new D(c,o))})},n=(s,r)=>{let o=this.resolve_,i=this.reject_,u=r.connection;if(r.wasSuccessCode)try{let a=this.callback_(u,u.getResponse());vt(a)?o(a):o()}catch(a){i(a)}else if(u!==null){let a=he();a.serverResponse=u.getErrorText(),this.errorCallback_?i(this.errorCallback_(u,a)):i(a)}else if(r.canceled){let a=this.appDelete_?Ye():Ke();i(a)}else{let a=Xe();i(a)}};this.canceled_?n(!1,new D(!1,null,!0)):this.backoffId_=xt(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Ct(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}},D=class{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}};function Bt(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function Mt(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Ft(t,e){e&&(t["X-Firebase-GMPID"]=e)}function qt(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function $t(t,e,n,s,r,o,i=!0){let u=Je(t.urlParams),a=t.url+u,c=Object.assign({},t.headers);return Ft(c,e),Bt(c,n),Mt(c,o),qt(c,s),new ie(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,i)}function Ht(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function jt(...t){let e=Ht();if(e!==void 0){let n=new e;for(let s=0;s<t.length;s++)n.append(t[s]);return n.getBlob()}else{if(de())return new Blob(t);throw new d(l.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function zt(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}function Gt(t){if(typeof atob>"u")throw Pt("base-64");return atob(t)}var E={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},G=class{constructor(e,n){this.data=e,this.contentType=n||null}};function Vt(t,e){switch(t){case E.RAW:return new G(et(e));case E.BASE64:case E.BASE64URL:return new G(tt(t,e));case E.DATA_URL:return new G(Xt(e),Kt(e))}throw he()}function et(t){let e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{let o=s,i=t.charCodeAt(++n);s=65536|(o&1023)<<10|i&1023,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(e)}function Wt(t){let e;try{e=decodeURIComponent(t)}catch{throw z(E.DATA_URL,"Malformed data URL.")}return et(e)}function tt(t,e){switch(t){case E.BASE64:{let r=e.indexOf("-")!==-1,o=e.indexOf("_")!==-1;if(r||o)throw z(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case E.BASE64URL:{let r=e.indexOf("+")!==-1,o=e.indexOf("/")!==-1;if(r||o)throw z(t,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Gt(e)}catch(r){throw r.message.includes("polyfill")?r:z(t,"Invalid character found")}let s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}var Y=class{constructor(e){this.base64=!1,this.contentType=null;let n=e.match(/^data:([^,]+)?,/);if(n===null)throw z(E.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let s=n[1]||null;s!=null&&(this.base64=Zt(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=e.substring(e.indexOf(",")+1)}};function Xt(t){let e=new Y(t);return e.base64?tt(E.BASE64,e.rest):Wt(e.rest)}function Kt(t){return new Y(t).contentType}function Zt(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}var J=class t{constructor(e,n){let s=0,r="";Fe(e)?(this.data_=e,s=e.size,r=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),s=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),s=e.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,n){if(Fe(this.data_)){let s=this.data_,r=zt(s,e,n);return r===null?null:new t(r)}else{let s=new Uint8Array(this.data_.buffer,e,n-e);return new t(s,!0)}}static getBlob(...e){if(de()){let n=e.map(s=>s instanceof t?s.data_:s);return new t(jt.apply(null,n))}else{let n=e.map(i=>Q(i)?Vt(E.RAW,i).data:i.data_),s=0;n.forEach(i=>{s+=i.byteLength});let r=new Uint8Array(s),o=0;return n.forEach(i=>{for(let u=0;u<i.length;u++)r[o++]=i[u]}),new t(r,!0)}}uploadData(){return this.data_}};function nt(t){let e;try{e=JSON.parse(t)}catch{return null}return Lt(e)?e:null}function Yt(t){if(t.length===0)return null;let e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Jt(t,e){let n=e.split("/").filter(s=>s.length>0).join("/");return t.length===0?n:t+"/"+n}function st(t){let e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}function Qt(t,e){return e}var R=class{constructor(e,n,s,r){this.server=e,this.local=n||e,this.writable=!!s,this.xform=r||Qt}},Z=null;function en(t){return!Q(t)||t.length<2?t:st(t)}function rt(){if(Z)return Z;let t=[];t.push(new R("bucket")),t.push(new R("generation")),t.push(new R("metageneration")),t.push(new R("name","fullPath",!0));function e(o,i){return en(i)}let n=new R("name");n.xform=e,t.push(n);function s(o,i){return i!==void 0?Number(i):i}let r=new R("size");return r.xform=s,t.push(r),t.push(new R("timeCreated")),t.push(new R("updated")),t.push(new R("md5Hash",null,!0)),t.push(new R("cacheControl",null,!0)),t.push(new R("contentDisposition",null,!0)),t.push(new R("contentEncoding",null,!0)),t.push(new R("contentLanguage",null,!0)),t.push(new R("contentType",null,!0)),t.push(new R("metadata","customMetadata",!0)),Z=t,Z}function tn(t,e){function n(){let s=t.bucket,r=t.fullPath,o=new k(s,r);return e._makeStorageReference(o)}Object.defineProperty(t,"ref",{get:n})}function nn(t,e,n){let s={};s.type="file";let r=n.length;for(let o=0;o<r;o++){let i=n[o];s[i.local]=i.xform(s,e[i.server])}return tn(s,t),s}function ot(t,e,n){let s=nt(e);return s===null?null:nn(t,s,n)}function sn(t,e,n,s){let r=nt(e);if(r===null||!Q(r.downloadTokens))return null;let o=r.downloadTokens;if(o.length===0)return null;let i=encodeURIComponent;return o.split(",").map(c=>{let h=t.bucket,f=t.fullPath,p="/b/"+i(h)+"/o/"+i(f),m=F(p,n,s),g=Je({alt:"media",token:c});return m+g})[0]}function it(t,e){let n={},s=e.length;for(let r=0;r<s;r++){let o=e[r];o.writable&&(n[o.server]=t[o.local])}return JSON.stringify(n)}var S=class{constructor(e,n,s,r){this.url=e,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}};function O(t){if(!t)throw he()}function fe(t,e){function n(s,r){let o=ot(t,r,e);return O(o!==null),o}return n}function rn(t,e){function n(s,r){let o=ot(t,r,e);return O(o!==null),sn(o,r,t.host,t._protocol)}return n}function W(t){function e(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=kt():r=yt():n.getStatus()===402?r=wt(t.bucket):n.getStatus()===403?r=Et(t.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return e}function _e(t){let e=W(t);function n(s,r){let o=e(s,r);return s.getStatus()===404&&(o=Tt(t.path)),o.serverResponse=r.serverResponse,o}return n}function on(t,e,n){let s=e.fullServerUrl(),r=F(s,t.host,t._protocol),o="GET",i=t.maxOperationRetryTime,u=new S(r,o,fe(t,n),i);return u.errorHandler=_e(e),u}function an(t,e,n){let s=e.fullServerUrl(),r=F(s,t.host,t._protocol),o="GET",i=t.maxOperationRetryTime,u=new S(r,o,rn(t,n),i);return u.errorHandler=_e(e),u}function un(t,e){let n=e.fullServerUrl(),s=F(n,t.host,t._protocol),r="DELETE",o=t.maxOperationRetryTime;function i(a,c){}let u=new S(s,r,i,o);return u.successCodes=[200,204],u.errorHandler=_e(e),u}function cn(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function at(t,e,n){let s=Object.assign({},n);return s.fullPath=t.path,s.size=e.size(),s.contentType||(s.contentType=cn(null,e)),s}function ln(t,e,n,s,r){let o=e.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function u(){let T="";for(let b=0;b<2;b++)T=T+Math.random().toString().slice(2);return T}let a=u();i["Content-Type"]="multipart/related; boundary="+a;let c=at(e,s,r),h=it(c,n),f="--"+a+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+a+`\r
Content-Type: `+c.contentType+`\r
\r
`,p=`\r
--`+a+"--",m=J.getBlob(f,s,p);if(m===null)throw Ze();let g={name:c.fullPath},y=F(o,t.host,t._protocol),_="POST",A=t.maxUploadRetryTime,U=new S(y,_,fe(t,n),A);return U.urlParams=g,U.headers=i,U.body=m.uploadData(),U.errorHandler=W(e),U}var B=class{constructor(e,n,s,r){this.current=e,this.total=n,this.finalized=!!s,this.metadata=r||null}};function pe(t,e){let n=null;try{n=t.getResponseHeader("X-Goog-Upload-Status")}catch{O(!1)}return O(!!n&&(e||["active"]).indexOf(n)!==-1),n}function hn(t,e,n,s,r){let o=e.bucketOnlyServerUrl(),i=at(e,s,r),u={name:i.fullPath},a=F(o,t.host,t._protocol),c="POST",h={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${s.size()}`,"X-Goog-Upload-Header-Content-Type":i.contentType,"Content-Type":"application/json; charset=utf-8"},f=it(i,n),p=t.maxUploadRetryTime;function m(y){pe(y);let _;try{_=y.getResponseHeader("X-Goog-Upload-URL")}catch{O(!1)}return O(Q(_)),_}let g=new S(a,c,m,p);return g.urlParams=u,g.headers=h,g.body=f,g.errorHandler=W(e),g}function dn(t,e,n,s){let r={"X-Goog-Upload-Command":"query"};function o(c){let h=pe(c,["active","final"]),f=null;try{f=c.getResponseHeader("X-Goog-Upload-Size-Received")}catch{O(!1)}f||O(!1);let p=Number(f);return O(!isNaN(p)),new B(p,s.size(),h==="final")}let i="POST",u=t.maxUploadRetryTime,a=new S(n,i,o,u);return a.headers=r,a.errorHandler=W(e),a}var $e=256*1024;function fn(t,e,n,s,r,o,i,u){let a=new B(0,0);if(i?(a.current=i.current,a.total=i.total):(a.current=0,a.total=s.size()),s.size()!==a.total)throw St();let c=a.total-a.current,h=c;r>0&&(h=Math.min(h,r));let f=a.current,p=f+h,m="";h===0?m="finalize":c===h?m="upload, finalize":m="upload";let g={"X-Goog-Upload-Command":m,"X-Goog-Upload-Offset":`${a.current}`},y=s.slice(f,p);if(y===null)throw Ze();function _(b,P){let N=pe(b,["active","final"]),ee=a.current+h,q=s.size(),te;return N==="final"?te=fe(e,o)(b,P):te=null,new B(ee,q,N==="final",te)}let A="POST",U=e.maxUploadRetryTime,T=new S(n,A,_,U);return T.headers=g,T.body=y.uploadData(),T.progressCallback=u||null,T.errorHandler=W(t),T}var w={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function se(t){switch(t){case"running":case"pausing":case"canceling":return w.RUNNING;case"paused":return w.PAUSED;case"success":return w.SUCCESS;case"canceled":return w.CANCELED;case"error":return w.ERROR;default:return w.ERROR}}var ae=class{constructor(e,n,s){if(Dt(e)||n!=null||s!=null)this.next=e,this.error=n??void 0,this.complete=s??void 0;else{let o=e;this.next=o.next,this.error=o.error,this.complete=o.complete}}};function v(t){return(...e)=>{Promise.resolve().then(()=>t(...e))}}var He=null,ue=class{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=L.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=L.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=L.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,s,r){if(this.sent_)throw j("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),r!==void 0)for(let o in r)r.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,r[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw j("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw j("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw j("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw j("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}},ce=class extends ue{initXhr(){this.xhr_.responseType="text"}};function I(){return He?He():new ce}var le=class{constructor(e,n,s=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=n,this._metadata=s,this._mappings=rt(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=r=>{if(this._request=void 0,this._chunkMultiplier=1,r._codeEquals(l.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let o=this.isExponentialBackoffExpired();if(Qe(r.status,[]))if(o)r=Xe();else{this.sleepTime=Math.max(this.sleepTime*2,Rt),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=r,this._transition("error")}},this._metadataErrorHandler=r=>{this._request=void 0,r._codeEquals(l.CANCELED)?this.completeTransitions_():(this._error=r,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((r,o)=>{this._resolve=r,this._reject=o,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){let e=this._transferred;return n=>this._updateProgress(e+n)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([n,s])=>{switch(this._state){case"running":e(n,s);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,n)=>{let s=hn(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(s,I,e,n);this._request=r,r.getPromise().then(o=>{this._request=void 0,this._uploadUrl=o,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((n,s)=>{let r=dn(this._ref.storage,this._ref._location,e,this._blob),o=this._ref.storage._makeRequest(r,I,n,s);this._request=o,o.getPromise().then(i=>{i=i,this._request=void 0,this._updateProgress(i.current),this._needToFetchStatus=!1,i.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=$e*this._chunkMultiplier,n=new B(this._transferred,this._blob.size()),s=this._uploadUrl;this._resolveToken((r,o)=>{let i;try{i=fn(this._ref._location,this._ref.storage,s,this._blob,e,this._mappings,n,this._makeProgressCallback())}catch(a){this._error=a,this._transition("error");return}let u=this._ref.storage._makeRequest(i,I,r,o,!1);this._request=u,u.getPromise().then(a=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(a.current),a.finalized?(this._metadata=a.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){$e*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,n)=>{let s=on(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(s,I,e,n);this._request=r,r.getPromise().then(o=>{this._request=void 0,this._metadata=o,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,n)=>{let s=ln(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(s,I,e,n);this._request=r,r.getPromise().then(o=>{this._request=void 0,this._metadata=o,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let n=this._transferred;this._transferred=e,this._transferred!==n&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let n=this._state==="paused";this._state=e,n&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Ke(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){let e=se(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,n,s,r){let o=new ae(n||void 0,s||void 0,r||void 0);return this._addObserver(o),()=>{this._removeObserver(o)}}then(e,n){return this._promise.then(e,n)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let n=this._observers.indexOf(e);n!==-1&&this._observers.splice(n,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(n=>{this._notifyObserver(n)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(se(this._state)){case w.SUCCESS:v(this._resolve.bind(null,this.snapshot))();break;case w.CANCELED:case w.ERROR:let n=this._reject;v(n.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(se(this._state)){case w.RUNNING:case w.PAUSED:e.next&&v(e.next.bind(e,this.snapshot))();break;case w.SUCCESS:e.complete&&v(e.complete.bind(e))();break;case w.CANCELED:case w.ERROR:e.error&&v(e.error.bind(e,this._error))();break;default:e.error&&v(e.error.bind(e,this._error))()}}resume(){let e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){let e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){let e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}};var M=class t{constructor(e,n){this._service=e,n instanceof k?this._location=n:this._location=k.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new t(e,n)}get root(){let e=new k(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return st(this._location.path)}get storage(){return this._service}get parent(){let e=Yt(this._location.path);if(e===null)return null;let n=new k(this._location.bucket,e);return new t(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw Nt(e)}};function _n(t,e,n){return t._throwIfRoot("uploadBytesResumable"),new le(t,new J(e),n)}function pn(t){t._throwIfRoot("getDownloadURL");let e=an(t.storage,t._location,rt());return t.storage.makeRequestWithTokens(e,I).then(n=>{if(n===null)throw It();return n})}function mn(t){t._throwIfRoot("deleteObject");let e=un(t.storage,t._location);return t.storage.makeRequestWithTokens(e,I)}function gn(t,e){let n=Jt(t._location.path,e),s=new k(t._location.bucket,n);return new M(t.storage,s)}function bn(t){return/^[A-Za-z]+:\/\//.test(t)}function Rn(t,e){return new M(t,e)}function ut(t,e){if(t instanceof V){let n=t;if(n._bucket==null)throw Ot();let s=new M(n,n._bucket);return e!=null?ut(s,e):s}else return e!==void 0?gn(t,e):t}function Tn(t,e){if(e&&bn(e)){if(t instanceof V)return Rn(t,e);throw re("To use ref(service, url), the first argument must be a Storage instance.")}else return ut(t,e)}function je(t,e){let n=e?.[We];return n==null?null:k.makeFromBucketSpec(n,t)}function wn(t,e,n,s={}){t.host=`${e}:${n}`,t._protocol="http";let{mockUserToken:r}=s;r&&(t._overrideAuthToken=typeof r=="string"?r:Ee(r,t.app.options.projectId))}var V=class{constructor(e,n,s,r,o){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=Ve,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=gt,this._maxUploadRetryTime=bt,this._requests=new Set,r!=null?this._bucket=k.makeFromBucketSpec(r,this._host):this._bucket=je(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=k.makeFromBucketSpec(this._url,e):this._bucket=je(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){qe("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){qe("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}_getAuthToken(){return K(this,null,function*(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let n=yield e.getToken();if(n!==null)return n.accessToken}return null})}_getAppCheckToken(){return K(this,null,function*(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(yield e.getToken()).token:null})}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new M(this,e)}_makeRequest(e,n,s,r,o=!0){if(this._deleted)return new oe(Ye());{let i=$t(e,this._appId,s,r,n,this._firebaseVersion,o);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}makeRequestWithTokens(e,n){return K(this,null,function*(){let[s,r]=yield Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,r).getPromise()})}},ze="@firebase/storage",Ge="0.13.2";var ct="storage";function lt(t,e,n){return t=x(t),_n(t,e,n)}function ht(t){return t=x(t),pn(t)}function dt(t){return t=x(t),mn(t)}function ft(t,e){return t=x(t),Tn(t,e)}function _t(t=Pe(),e){t=x(t);let s=Se(t,ct).getImmediate({identifier:e}),r=ke("storage");return r&&pt(s,...r),s}function pt(t,e,n,s={}){wn(t,e,n,s)}function yn(t,{instanceIdentifier:e}){let n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new V(n,s,r,e,Ie)}function kn(){Oe(new Ue(ct,yn,"PUBLIC").setMultipleInstances(!0)),H(ze,Ge,""),H(ze,Ge,"esm2017")}kn();var X=class{constructor(e){return e}},mt="storage",me=class{constructor(){return Ce(mt)}};var ge=new Re("angularfire2.storage-instances");function En(t,e){let n=xe(mt,t,e);return n&&new X(n)}function An(t){return(e,n)=>{let s=e.runOutsideAngular(()=>t(n));return new X(s)}}var Un={provide:me,deps:[[new $,ge]]},On={provide:X,useFactory:En,deps:[[new $,ge],Le]},Sn=(()=>{class t{constructor(){H("angularfire",Ne.full,"gcs")}static \u0275fac=function(s){return new(s||t)};static \u0275mod=Te({type:t});static \u0275inj=be({providers:[On,Un]})}return t})();function Qn(t,...e){return{ngModule:Sn,providers:[{provide:ge,useFactory:An(t),multi:!0,deps:[ye,we,De,Be,[new $,Me],[new $,ve],...e]}]}}var es=C(dt,!0);var ts=C(ht,!0);var ns=C(_t,!0);var ss=C(ft,!0);var rs=C(lt,!0);export{X as a,Qn as b,es as c,ts as d,ns as e,ss as f,rs as g};
