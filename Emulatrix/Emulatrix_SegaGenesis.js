var afs;
var BrowserFS=BrowserFS;
var Module = {noInitialRun: true,arguments: ["-v", "--menu"],preRun: [],postRun: [],print: (function(){})(),printErr: function(text){},canvas: document.getElementById("canvas"),setStatus: function(text){},totalDependencies: 0,monitorRunDependencies: function(left){}};
function startFileSystem(){localStorage.clear();if(BrowserFS.FileSystem.IndexedDB.isAvailable()){var req=indexedDB.deleteDatabase("RetroArch");req.onsuccess=function(){};req.onerror=function(){};req.onblocked=function(){};}var imfs=new BrowserFS.FileSystem.InMemory();var setupFileSystem = false;if(BrowserFS.FileSystem.IndexedDB.isAvailable()){afs=new BrowserFS.FileSystem.AsyncMirror(imfs,new BrowserFS.FileSystem.IndexedDB(function(e,fs){if(e){afs=new BrowserFS.FileSystem.InMemory();setupFileSystem = true;}else{afs.initialize(function(e){if(e){afs=new BrowserFS.FileSystem.InMemory();setupFileSystem = true;}else{setupFileSystem = true;}});}},"RetroArch"));}if (setupFileSystem==true){var mfs=new BrowserFS.FileSystem.MountableFileSystem();mfs.mount("/home/web_user/retroarch/userdata",afs);BrowserFS.initialize(mfs);var BFS=new BrowserFS.EmscriptenFS();FS.mount(BFS,{root:"/home"},"/home");}}

// mobile compatibility
var JoyStick=function(t,e){var i=void 0===(e=e||{}).title?"joystick":e.title,n=void 0===e.width?0:e.width,o=void 0===e.height?0:e.height,h=void 0===e.internalFillColor?"rgba(0,0,0,0.25)":e.internalFillColor,r=void 0===e.internalLineWidth?2:e.internalLineWidth,d=(void 0===e.internalStrokeColor||e.internalStrokeColor,void 0===e.externalLineWidth?2:e.externalLineWidth),a=void 0===e.externalStrokeColor?"rgba(0,0,0,0)":e.externalStrokeColor,c=document.getElementById(t),l=document.createElement("canvas");l.id=i,0==n&&(n=c.clientWidth),0==o&&(o=c.clientHeight),l.width=n,l.height=o,c.appendChild(l);var u=l.getContext("2d"),g=0,s=2*Math.PI,f=(l.width-110)/2,v=f+5,w=f+30,p=l.width/2,C=l.height/2,L=l.width/10,W=-1*L,k=l.height/10,E=-1*k,m=p,S=C;function x(){u.beginPath(),u.arc(p,C,w,0,s,!1),u.lineWidth=d,u.strokeStyle=a,u.stroke()}function y(){u.beginPath(),m<f&&(m=v),m+f>l.width&&(m=l.width-v),S<f&&(S=v),S+f>l.height&&(S=l.height-v),u.arc(m,S,f,0,s,!1),u.fillStyle=h,u.fill(),u.lineWidth=r,u.strokeStyle="rgba(255,255,255,0.175)",u.stroke()}l.addEventListener("touchstart",function(t){g=1},!1),l.addEventListener("touchmove",function(t){if(t.preventDefault(),1==g)try{for(var e=l.getBoundingClientRect(),i=e.left+l.offsetWidth,n=e.top,o=-1,h=0;h<t.touches.length;h++)t.touches[h].pageX<=i&&t.touches[h].pageY>=n&&(o=h);o>-1&&(m=t.touches[o].pageX,S=l.height-(window.innerHeight-t.touches[o].pageY),m-=l.offsetLeft,u.clearRect(0,0,l.width,l.height),x(),y())}catch(t){}},!1),l.addEventListener("touchend",function(t){g=0,m=p,S=C,u.clearRect(0,0,l.width,l.height),x(),y()},!1),l.addEventListener("mousedown",function(t){g=1},!1),l.addEventListener("mousemove",function(t){1==g&&(m=t.pageX,S=l.height-(window.innerHeight-t.pageY),m-=l.offsetLeft,S-=l.offsetTop,u.clearRect(0,0,l.width,l.height),x(),y())},!1),l.addEventListener("mouseup",function(t){g=0,m=p,S=C,u.clearRect(0,0,l.width,l.height),x(),y()},!1),x(),y(),this.GetWidth=function(){return l.width},this.GetHeight=function(){return l.height},this.GetPosX=function(){return m},this.GetPosY=function(){return S},this.GetX=function(){return((m-p)/v*100).toFixed()},this.GetY=function(){return((S-C)/v*100*-1).toFixed()},this.GetDir=function(){var t="",e=m-p,i=S-C;return i>=E&&i<=k&&(t="C"),i<E&&(t="N"),i>k&&(t="S"),e<W&&("C"==t?t="W":t+="W"),e>L&&("C"==t?t="E":t+="E"),t}};
function isMobileDevice(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))}
function sendVirtualKey(keyState,keyValue){var oEvent=new KeyboardEvent(keyState,{bubbles:true,cancelable:false,char:"z",key:"z",shiftKey:false,ctrlKey:false,altKey:false,keyCode:90,code:keyValue});document.body.dispatchEvent(oEvent)}
function showVirtualJoystick(){joystick = new JoyStick("joyDiv");setInterval(function(){var joystickDirection = joystick.GetDir();switch(joystickDirection){case "N":try{sendVirtualKey("keydown","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break;case "S":try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keydown","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break;case "W":try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keydown","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break;case "E":try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keydown","ArrowRight")}catch(err){}break;case "NW":try{sendVirtualKey("keydown","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keydown","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break;case "NE":try{sendVirtualKey("keydown","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keydown","ArrowRight")}catch(err){}break;case "SE":try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keydown","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keydown","ArrowRight")}catch(err){}break;case "SW":try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keydown","ArrowDown");sendVirtualKey("keydown","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break;default:try{sendVirtualKey("keyup","ArrowUp");sendVirtualKey("keyup","ArrowDown");sendVirtualKey("keyup","ArrowLeft");sendVirtualKey("keyup","ArrowRight")}catch(err){}break}}, 25)}

// VARIABLE FOR PAUSING/RESUMING THE EMULATION
var Emulator_running = true;

// VARIABLE FOR CHECKING IF THE EMULATION WAS STARTED
var Emulator_started = false;

// genesis_plus_gx_libretro.js - VERSION 1.8.2 WITH TWO BUGFIXES - BROWSERITERATIONFUNC AND UPDATECANVASDIMENSIONS FUNCTIONS REWRITTEN
var Module = typeof Module !== "undefined" ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
    if (Module.hasOwnProperty(key)) {
        moduleOverrides[key] = Module[key];
    }
}
Module["arguments"] = [];
Module["thisProgram"] = "./this.program";
Module["quit"] = function (status, toThrow) {
    throw toThrow;
};
Module["preRun"] = [];
Module["postRun"] = [];
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_HAS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === "object";
ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = "";
function locateFile(path) {
    if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
    } else {
        return scriptDirectory + path;
    }
}
var read_, readAsync, readBinary, setWindowTitle;
if (ENVIRONMENT_IS_NODE) {
    scriptDirectory = __dirname + "/";
    var nodeFS;
    var nodePath;
    read_ = function shell_read(filename, binary) {
        var ret;
        if (!nodeFS) nodeFS = require("fs");
        if (!nodePath) nodePath = require("path");
        filename = nodePath["normalize"](filename);
        ret = nodeFS["readFileSync"](filename);
        return binary ? ret : ret.toString();
    };
    readBinary = function readBinary(filename) {
        var ret = read_(filename, true);
        if (!ret.buffer) {
            ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
    };
    if (process["argv"].length > 1) {
        Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
    }
    Module["arguments"] = process["argv"].slice(2);
    if (typeof module !== "undefined") {
        module["exports"] = Module;
    }
    process["on"]("uncaughtException", function (ex) {
        if (!(ex instanceof ExitStatus)) {
            throw ex;
        }
    });
    process["on"]("unhandledRejection", abort);
    Module["quit"] = function (status) {
        process["exit"](status);
    };
    Module["inspect"] = function () {
        return "[Emscripten Module object]";
    };
} else if (ENVIRONMENT_IS_SHELL) {
    if (typeof read != "undefined") {
        read_ = function shell_read(f) {
            return read(f);
        };
    }
    readBinary = function readBinary(f) {
        var data;
        if (typeof readbuffer === "function") {
            return new Uint8Array(readbuffer(f));
        }
        data = read(f, "binary");
        assert(typeof data === "object");
        return data;
    };
    if (typeof scriptArgs != "undefined") {
        Module["arguments"] = scriptArgs;
    } else if (typeof arguments != "undefined") {
        Module["arguments"] = arguments;
    }
    if (typeof quit === "function") {
        Module["quit"] = function (status) {
            quit(status);
        };
    }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
    } else if (document.currentScript) {
        scriptDirectory = document.currentScript.src;
    }
    if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
    } else {
        scriptDirectory = "";
    }
    read_ = function shell_read(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send(null);
        return xhr.responseText;
    };
    if (ENVIRONMENT_IS_WORKER) {
        readBinary = function readBinary(url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
        };
    }
    readAsync = function readAsync(url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
                onload(xhr.response);
                return;
            }
            onerror();
        };
        xhr.onerror = onerror;
        xhr.send(null);
    };
    setWindowTitle = function (title) {
        document.title = title;
    };
} else {
}
var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : (typeof console !== "undefined" && console.warn.bind(console)) || out);
for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
        Module[key] = moduleOverrides[key];
    }
}
moduleOverrides = undefined;
function dynamicAlloc(size) {
    var ret = HEAP32[DYNAMICTOP_PTR >> 2];
    var end = (ret + size + 15) & -16;
    if (end > _emscripten_get_heap_size()) {
        abort();
    }
    HEAP32[DYNAMICTOP_PTR >> 2] = end;
    return ret;
}
function getNativeTypeSize(type) {
    switch (type) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default: {
            if (type[type.length - 1] === "*") {
                return 4;
            } else if (type[0] === "i") {
                var bits = parseInt(type.substr(1));
                assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
                return bits / 8;
            } else {
                return 0;
            }
        }
    }
}
function warnOnce(text) {
    if (!warnOnce.shown) warnOnce.shown = {};
    if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
    }
}
var asm2wasmImports = {
    "f64-rem": function (x, y) {
        return x % y;
    },
    debugger: function () {
        debugger;
    },
};
var functionPointers = new Array(0);
function dynCall(sig, ptr, args) {
    if (args && args.length) {
        return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
    } else {
        return Module["dynCall_" + sig].call(null, ptr);
    }
}
var tempRet0 = 0;
var setTempRet0 = function (value) {
    tempRet0 = value;
};
var getTempRet0 = function () {
    return tempRet0;
};
var Runtime = {};
if (typeof WebAssembly !== "object") {
    err("no native wasm support detected");
}
function setValue(ptr, value, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
        case "i1":
            HEAP8[ptr >> 0] = value;
            break;
        case "i8":
            HEAP8[ptr >> 0] = value;
            break;
        case "i16":
            HEAP16[ptr >> 1] = value;
            break;
        case "i32":
            HEAP32[ptr >> 2] = value;
            break;
        case "i64":
            (tempI64 = [
                value >>> 0,
                ((tempDouble = value), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
            ]),
                (HEAP32[ptr >> 2] = tempI64[0]),
                (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
            break;
        case "float":
            HEAPF32[ptr >> 2] = value;
            break;
        case "double":
            HEAPF64[ptr >> 3] = value;
            break;
        default:
            abort("invalid type for setValue: " + type);
    }
}
var wasmMemory;
var wasmTable;
var ABORT = false;
var EXITSTATUS = 0;
function assert(condition, text) {
    if (!condition) {
        abort("Assertion failed: " + text);
    }
}
var ALLOC_NORMAL = 0;
var ALLOC_NONE = 3;
function allocate(slab, types, allocator, ptr) {
    var zeroinit, size;
    if (typeof slab === "number") {
        zeroinit = true;
        size = slab;
    } else {
        zeroinit = false;
        size = slab.length;
    }
    var singleType = typeof types === "string" ? types : null;
    var ret;
    if (allocator == ALLOC_NONE) {
        ret = ptr;
    } else {
        ret = [_malloc, stackAlloc, dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
    }
    if (zeroinit) {
        var stop;
        ptr = ret;
        assert((ret & 3) == 0);
        stop = ret + (size & ~3);
        for (; ptr < stop; ptr += 4) {
            HEAP32[ptr >> 2] = 0;
        }
        stop = ret + size;
        while (ptr < stop) {
            HEAP8[ptr++ >> 0] = 0;
        }
        return ret;
    }
    if (singleType === "i8") {
        if (slab.subarray || slab.slice) {
            HEAPU8.set(slab, ret);
        } else {
            HEAPU8.set(new Uint8Array(slab), ret);
        }
        return ret;
    }
    var i = 0,
        type,
        typeSize,
        previousType;
    while (i < size) {
        var curr = slab[i];
        type = singleType || types[i];
        if (type === 0) {
            i++;
            continue;
        }
        if (type == "i64") type = "i32";
        setValue(ret + i, curr, type);
        if (previousType !== type) {
            typeSize = getNativeTypeSize(type);
            previousType = type;
        }
        i += typeSize;
    }
    return ret;
}
function getMemory(size) {
    if (!runtimeInitialized) return dynamicAlloc(size);
    return _malloc(size);
}
var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
        var str = "";
        while (idx < endPtr) {
            var u0 = u8Array[idx++];
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0);
                continue;
            }
            var u1 = u8Array[idx++] & 63;
            if ((u0 & 224) == 192) {
                str += String.fromCharCode(((u0 & 31) << 6) | u1);
                continue;
            }
            var u2 = u8Array[idx++] & 63;
            if ((u0 & 240) == 224) {
                u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            } else {
                u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0);
            } else {
                var ch = u0 - 65536;
                str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
            }
        }
    }
    return str;
}
function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = (65536 + ((u & 1023) << 10)) | (u1 & 1023);
        }
        if (u <= 127) {
            if (outIdx >= endIdx) break;
            outU8Array[outIdx++] = u;
        } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            outU8Array[outIdx++] = 192 | (u >> 6);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            outU8Array[outIdx++] = 224 | (u >> 12);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        } else {
            if (outIdx + 3 >= endIdx) break;
            outU8Array[outIdx++] = 240 | (u >> 18);
            outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
            outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
            outU8Array[outIdx++] = 128 | (u & 63);
        }
    }
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
        if (u <= 127) ++len;
        else if (u <= 2047) len += 2;
        else if (u <= 65535) len += 3;
        else len += 4;
    }
    return len;
}
var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
function allocateUTF8(str) {
    var size = lengthBytesUTF8(str) + 1;
    var ret = _malloc(size);
    if (ret) stringToUTF8Array(str, HEAP8, ret, size);
    return ret;
}
function allocateUTF8OnStack(str) {
    var size = lengthBytesUTF8(str) + 1;
    var ret = stackAlloc(size);
    stringToUTF8Array(str, HEAP8, ret, size);
    return ret;
}
function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer);
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
}
function demangle(func) {
    return func;
}
function demangleAll(text) {
    var regex = /__Z[\w\d_]+/g;
    return text.replace(regex, function (x) {
        var y = demangle(x);
        return x === y ? x : y + " [" + x + "]";
    });
}
function jsStackTrace() {
    var err = new Error();
    if (!err.stack) {
        try {
            throw new Error(0);
        } catch (e) {
            err = e;
        }
        if (!err.stack) {
            return "(no stack trace available)";
        }
    }
    return err.stack.toString();
}
function stackTrace() {
    var js = jsStackTrace();
    if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
    return demangleAll(js);
}
var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
function alignUp(x, multiple) {
    if (x % multiple > 0) {
        x += multiple - (x % multiple);
    }
    return x;
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
function updateGlobalBufferViews() {
    Module["HEAP8"] = HEAP8 = new Int8Array(buffer);
    Module["HEAP16"] = HEAP16 = new Int16Array(buffer);
    Module["HEAP32"] = HEAP32 = new Int32Array(buffer);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer);
}
var DYNAMIC_BASE = 20462544,
    DYNAMICTOP_PTR = 15219632;
var TOTAL_STACK = 5242880;
var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 134217728;
if (INITIAL_TOTAL_MEMORY < TOTAL_STACK) err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
if (Module["wasmMemory"]) {
    wasmMemory = Module["wasmMemory"];
} else {
    wasmMemory = new WebAssembly.Memory({ initial: INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE });
}
if (wasmMemory) {
    buffer = wasmMemory.buffer;
}
INITIAL_TOTAL_MEMORY = buffer.byteLength;
updateGlobalBufferViews();
HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
            callback();
            continue;
        }
        var func = callback.func;
        if (typeof func === "number") {
            if (callback.arg === undefined) {
                Module["dynCall_v"](func);
            } else {
                Module["dynCall_vi"](func, callback.arg);
            }
        } else {
            func(callback.arg === undefined ? null : callback.arg);
        }
    }
}
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATMAIN__ = [];
var __ATEXIT__ = [];
var __ATPOSTRUN__ = [];
var runtimeInitialized = false;
var runtimeExited = false;
function preRun() {
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift());
        }
    }
    callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() {
    runtimeInitialized = true;
    if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
    TTY.init();
    callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
    FS.ignorePermissions = false;
    callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__);
    FS.quit();
    TTY.shutdown();
    runtimeExited = true;
}
function postRun() {
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift());
        }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
}
function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
}
var Math_abs = Math.abs;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_min = Math.min;
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null;
function getUniqueRunDependency(id) {
    return id;
}
function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
    }
}
function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
        }
    }
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(filename) {
    return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}
var wasmBinaryFile = "Emulatrix_SegaGenesis.wasm";
if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
}
function getBinary() {
    try {
        if (Module["wasmBinary"]) {
            return new Uint8Array(Module["wasmBinary"]);
        }
        if (readBinary) {
            return readBinary(wasmBinaryFile);
        } else {
            throw "both async and sync fetching of the wasm failed";
        }
    } catch (err) {
        abort(err);
    }
}
function getBinaryPromise() {
    if (!Module["wasmBinary"] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
        return fetch(wasmBinaryFile, { credentials: "same-origin" })
            .then(function (response) {
                if (!response["ok"]) {
                    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
                }
                return response["arrayBuffer"]();
            })
            .catch(function () {
                return getBinary();
            });
    }
    return new Promise(function (resolve, reject) {
        resolve(getBinary());
    });
}
function createWasm(env) {
    var info = { env: env, global: { NaN: NaN, Infinity: Infinity }, "global.Math": Math, asm2wasm: asm2wasmImports };
    function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module["asm"] = exports;
        removeRunDependency("wasm-instantiate");
    }
    addRunDependency("wasm-instantiate");
    function receiveInstantiatedSource(output) {
        receiveInstance(output["instance"]);
    }
    function instantiateArrayBuffer(receiver) {
        return getBinaryPromise()
            .then(function (binary) {
                return WebAssembly.instantiate(binary, info);
            })
            .then(receiver, function (reason) {
                err("failed to asynchronously prepare wasm: " + reason);
                abort(reason);
            });
    }
    function instantiateAsync() {
        if (!Module["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
            fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) {
                return WebAssembly.instantiateStreaming(response, info).then(receiveInstantiatedSource, function (reason) {
                    err("wasm streaming compile failed: " + reason);
                    err("falling back to ArrayBuffer instantiation");
                    instantiateArrayBuffer(receiveInstantiatedSource);
                });
            });
        } else {
            return instantiateArrayBuffer(receiveInstantiatedSource);
        }
    }
    if (Module["instantiateWasm"]) {
        try {
            var exports = Module["instantiateWasm"](info, receiveInstance);
            return exports;
        } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
        }
    }
    instantiateAsync();
    return {};
}
Module["asm"] = function (global, env, providedBuffer) {
    env["memory"] = wasmMemory;
    env["table"] = wasmTable = new WebAssembly.Table({ initial: 13170, maximum: 13170, element: "anyfunc" });
    env["__memory_base"] = 1024;
    env["__table_base"] = 0;
    var exports = createWasm(env);
    return exports;
};
var tempDouble;
var tempI64;
__ATINIT__.push({
    func: function () {
        ___emscripten_environ_constructor();
    },
});
function _emscripten_set_main_loop_timing(mode, value) {
    Browser.mainLoop.timingMode = mode;
    Browser.mainLoop.timingValue = value;
    if (!Browser.mainLoop.func) {
        return 1;
    }
    if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
            var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
            setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
        };
        Browser.mainLoop.method = "timeout";
    } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
            Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "rAF";
    } else if (mode == 2) {
        if (typeof setImmediate === "undefined") {
            var setImmediates = [];
            var emscriptenMainLoopMessageId = "setimmediate";
            var Browser_setImmediate_messageHandler = function (event) {
                if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                    event.stopPropagation();
                    setImmediates.shift()();
                }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            setImmediate = function Browser_emulated_setImmediate(func) {
                setImmediates.push(func);
                if (ENVIRONMENT_IS_WORKER) {
                    if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
                    Module["setImmediates"].push(func);
                    postMessage({ target: emscriptenMainLoopMessageId });
                } else postMessage(emscriptenMainLoopMessageId, "*");
            };
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
            setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = "immediate";
    }
    return 0;
}
function _emscripten_get_now() {
    abort();
}
function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
    Module["noExitRuntime"] = true;
    assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    Browser.mainLoop.func = func;
    Browser.mainLoop.arg = arg;
    var browserIterationFunc;
    if (typeof arg !== "undefined") {
        browserIterationFunc = function () {
            Module["dynCall_vi"](func, arg);
        };
    } else {
        browserIterationFunc = function () {
            if (Emulator_running == true) {
                Emulator_started = true;
                Module["dynCall_v"](func);
            }
        };
    }
    var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
    Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
            var start = Date.now();
            var blocker = Browser.mainLoop.queue.shift();
            blocker.func(blocker.arg);
            if (Browser.mainLoop.remainingBlockers) {
                var remaining = Browser.mainLoop.remainingBlockers;
                var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                if (blocker.counted) {
                    Browser.mainLoop.remainingBlockers = next;
                } else {
                    next = next + 0.5;
                    Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
                }
            }
            console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
            Browser.mainLoop.updateStatus();
            if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
            setTimeout(Browser.mainLoop.runner, 0);
            return;
        }
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
        Browser.mainLoop.currentFrameNumber = (Browser.mainLoop.currentFrameNumber + 1) | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
            Browser.mainLoop.scheduler();
            return;
        } else if (Browser.mainLoop.timingMode == 0) {
            Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
        GL.newRenderingFrameStarted();
        if (Browser.mainLoop.method === "timeout" && Module.ctx) {
            err(
                "Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"
            );
            Browser.mainLoop.method = "";
        }
        Browser.mainLoop.runIter(browserIterationFunc);
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
        if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
        Browser.mainLoop.scheduler();
    };
    if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps);
        else _emscripten_set_main_loop_timing(1, 1);
        Browser.mainLoop.scheduler();
    }
    if (simulateInfiniteLoop) {
        throw "SimulateInfiniteLoop";
    }
}
var Browser = {
    mainLoop: {
        scheduler: null,
        method: "",
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause: function () {
            Browser.mainLoop.scheduler = null;
            Browser.mainLoop.currentlyRunningMainloop++;
        },
        resume: function () {
            Browser.mainLoop.currentlyRunningMainloop++;
            var timingMode = Browser.mainLoop.timingMode;
            var timingValue = Browser.mainLoop.timingValue;
            var func = Browser.mainLoop.func;
            Browser.mainLoop.func = null;
            _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
            _emscripten_set_main_loop_timing(timingMode, timingValue);
            Browser.mainLoop.scheduler();
        },
        updateStatus: function () {
            if (Module["setStatus"]) {
                var message = Module["statusMessage"] || "Please wait...";
                var remaining = Browser.mainLoop.remainingBlockers;
                var expected = Browser.mainLoop.expectedBlockers;
                if (remaining) {
                    if (remaining < expected) {
                        Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
                    } else {
                        Module["setStatus"](message);
                    }
                } else {
                    Module["setStatus"]("");
                }
            }
        },
        runIter: function (func) {
            if (ABORT) return;
            if (Module["preMainLoop"]) {
                var preRet = Module["preMainLoop"]();
                if (preRet === false) {
                    return;
                }
            }
            try {
                func();
            } catch (e) {
                if (e instanceof ExitStatus) {
                    return;
                } else {
                    if (e && typeof e === "object" && e.stack) err("exception thrown: " + [e, e.stack]);
                    throw e;
                }
            }
            if (Module["postMainLoop"]) Module["postMainLoop"]();
        },
    },
    isFullscreen: false,
    pointerLock: false,
    moduleContextCreatedCallbacks: [],
    workers: [],
    init: function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
        if (Browser.initted) return;
        Browser.initted = true;
        try {
            new Blob();
            Browser.hasBlobConstructor = true;
        } catch (e) {
            Browser.hasBlobConstructor = false;
            console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
            console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
            Module.noImageDecoding = true;
        }
        var imagePlugin = {};
        imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
            return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
            var b = null;
            if (Browser.hasBlobConstructor) {
                try {
                    b = new Blob([byteArray], { type: Browser.getMimetype(name) });
                    if (b.size !== byteArray.length) {
                        b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
                    }
                } catch (e) {
                    warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
                }
            }
            if (!b) {
                var bb = new Browser.BlobBuilder();
                bb.append(new Uint8Array(byteArray).buffer);
                b = bb.getBlob();
            }
            var url = Browser.URLObject.createObjectURL(b);
            var img = new Image();
            img.onload = function img_onload() {
                assert(img.complete, "Image " + name + " could not be decoded");
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                Module["preloadedImages"][name] = canvas;
                Browser.URLObject.revokeObjectURL(url);
                if (onload) onload(byteArray);
            };
            img.onerror = function img_onerror(event) {
                console.log("Image " + url + " could not be decoded");
                if (onerror) onerror();
            };
            img.src = url;
        };
        Module["preloadPlugins"].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
            return !Module.noAudioDecoding && name.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
        };
        audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
            var done = false;
            function finish(audio) {
                if (done) return;
                done = true;
                Module["preloadedAudios"][name] = audio;
                if (onload) onload(byteArray);
            }
            function fail() {
                if (done) return;
                done = true;
                Module["preloadedAudios"][name] = new Audio();
                if (onerror) onerror();
            }
            if (Browser.hasBlobConstructor) {
                try {
                    var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
                } catch (e) {
                    return fail();
                }
                var url = Browser.URLObject.createObjectURL(b);
                var audio = new Audio();
                audio.addEventListener(
                    "canplaythrough",
                    function () {
                        finish(audio);
                    },
                    false
                );
                audio.onerror = function audio_onerror(event) {
                    if (done) return;
                    console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
                    function encode64(data) {
                        var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                        var PAD = "=";
                        var ret = "";
                        var leftchar = 0;
                        var leftbits = 0;
                        for (var i = 0; i < data.length; i++) {
                            leftchar = (leftchar << 8) | data[i];
                            leftbits += 8;
                            while (leftbits >= 6) {
                                var curr = (leftchar >> (leftbits - 6)) & 63;
                                leftbits -= 6;
                                ret += BASE[curr];
                            }
                        }
                        if (leftbits == 2) {
                            ret += BASE[(leftchar & 3) << 4];
                            ret += PAD + PAD;
                        } else if (leftbits == 4) {
                            ret += BASE[(leftchar & 15) << 2];
                            ret += PAD;
                        }
                        return ret;
                    }
                    audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
                    finish(audio);
                };
                audio.src = url;
                Browser.safeSetTimeout(function () {
                    finish(audio);
                }, 1e4);
            } else {
                return fail();
            }
        };
        Module["preloadPlugins"].push(audioPlugin);
        function pointerLockChange() {
            Browser.pointerLock =
                document["pointerLockElement"] === Module["canvas"] ||
                document["mozPointerLockElement"] === Module["canvas"] ||
                document["webkitPointerLockElement"] === Module["canvas"] ||
                document["msPointerLockElement"] === Module["canvas"];
        }
        var canvas = Module["canvas"];
        if (canvas) {
            canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function () {};
            canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function () {};
            canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
            document.addEventListener("pointerlockchange", pointerLockChange, false);
            document.addEventListener("mozpointerlockchange", pointerLockChange, false);
            document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
            document.addEventListener("mspointerlockchange", pointerLockChange, false);
            if (Module["elementPointerLock"]) {
                canvas.addEventListener(
                    "click",
                    function (ev) {
                        if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
                            Module["canvas"].requestPointerLock();
                            ev.preventDefault();
                        }
                    },
                    false
                );
            }
        }
    },
    createContext: function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
        var ctx;
        var contextHandle;
        if (useWebGL) {
            var contextAttributes = { antialias: false, alpha: false, majorVersion: 1 };
            if (webGLContextAttributes) {
                for (var attribute in webGLContextAttributes) {
                    contextAttributes[attribute] = webGLContextAttributes[attribute];
                }
            }
            if (typeof GL !== "undefined") {
                contextHandle = GL.createContext(canvas, contextAttributes);
                if (contextHandle) {
                    ctx = GL.getContext(contextHandle).GLctx;
                }
            }
        } else {
            ctx = canvas.getContext("2d");
        }
        if (!ctx) return null;
        if (setInModule) {
            if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
            Module.ctx = ctx;
            if (useWebGL) GL.makeContextCurrent(contextHandle);
            Module.useWebGL = useWebGL;
            Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
                callback();
            });
            Browser.init();
        }
        return ctx;
    },
    destroyContext: function (canvas, useWebGL, setInModule) {},
    fullscreenHandlersInstalled: false,
    lockPointer: undefined,
    resizeCanvas: undefined,
    requestFullscreen: function (lockPointer, resizeCanvas, vrDevice) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        Browser.vrDevice = vrDevice;
        if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
        if (typeof Browser.vrDevice === "undefined") Browser.vrDevice = null;
        var canvas = Module["canvas"];
        function fullscreenChange() {
            Browser.isFullscreen = false;
            var canvasContainer = canvas.parentNode;
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                canvas.exitFullscreen = Browser.exitFullscreen;
                if (Browser.lockPointer) canvas.requestPointerLock();
                Browser.isFullscreen = true;
                if (Browser.resizeCanvas) {
                    Browser.setFullscreenCanvasSize();
                } else {
                    Browser.updateCanvasDimensions(canvas);
                }
            } else {
                canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                canvasContainer.parentNode.removeChild(canvasContainer);
                if (Browser.resizeCanvas) {
                    Browser.setWindowedCanvasSize();
                } else {
                    Browser.updateCanvasDimensions(canvas);
                }
            }
            if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
            if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
        }
        if (!Browser.fullscreenHandlersInstalled) {
            Browser.fullscreenHandlersInstalled = true;
            document.addEventListener("fullscreenchange", fullscreenChange, false);
            document.addEventListener("mozfullscreenchange", fullscreenChange, false);
            document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
            document.addEventListener("MSFullscreenChange", fullscreenChange, false);
        }
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        canvasContainer.requestFullscreen =
            canvasContainer["requestFullscreen"] ||
            canvasContainer["mozRequestFullScreen"] ||
            canvasContainer["msRequestFullscreen"] ||
            (canvasContainer["webkitRequestFullscreen"]
                ? function () {
                      canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
                  }
                : null) ||
            (canvasContainer["webkitRequestFullScreen"]
                ? function () {
                      canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
                  }
                : null);
        if (vrDevice) {
            canvasContainer.requestFullscreen({ vrDisplay: vrDevice });
        } else {
            canvasContainer.requestFullscreen();
        }
    },
    requestFullScreen: function (lockPointer, resizeCanvas, vrDevice) {
        err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
        Browser.requestFullScreen = function (lockPointer, resizeCanvas, vrDevice) {
            return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
        };
        return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
    },
    exitFullscreen: function () {
        if (!Browser.isFullscreen) {
            return false;
        }
        var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function () {};
        CFS.apply(document, []);
        return true;
    },
    nextRAF: 0,
    fakeRequestAnimationFrame: function (func) {
        var now = Date.now();
        if (Browser.nextRAF === 0) {
            Browser.nextRAF = now + 1e3 / 60;
        } else {
            while (now + 2 >= Browser.nextRAF) {
                Browser.nextRAF += 1e3 / 60;
            }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
    },
    requestAnimationFrame: function (func) {
        if (typeof requestAnimationFrame === "function") {
            requestAnimationFrame(func);
            return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
    },
    safeCallback: function (func) {
        return function () {
            if (!ABORT) return func.apply(null, arguments);
        };
    },
    allowAsyncCallbacks: true,
    queuedAsyncCallbacks: [],
    pauseAsyncCallbacks: function () {
        Browser.allowAsyncCallbacks = false;
    },
    resumeAsyncCallbacks: function () {
        Browser.allowAsyncCallbacks = true;
        if (Browser.queuedAsyncCallbacks.length > 0) {
            var callbacks = Browser.queuedAsyncCallbacks;
            Browser.queuedAsyncCallbacks = [];
            callbacks.forEach(function (func) {
                func();
            });
        }
    },
    safeRequestAnimationFrame: function (func) {
        return Browser.requestAnimationFrame(function () {
            if (ABORT) return;
            if (Browser.allowAsyncCallbacks) {
                func();
            } else {
                Browser.queuedAsyncCallbacks.push(func);
            }
        });
    },
    safeSetTimeout: function (func, timeout) {
        Module["noExitRuntime"] = true;
        return setTimeout(function () {
            if (ABORT) return;
            if (Browser.allowAsyncCallbacks) {
                func();
            } else {
                Browser.queuedAsyncCallbacks.push(func);
            }
        }, timeout);
    },
    safeSetInterval: function (func, timeout) {
        Module["noExitRuntime"] = true;
        return setInterval(function () {
            if (ABORT) return;
            if (Browser.allowAsyncCallbacks) {
                func();
            }
        }, timeout);
    },
    getMimetype: function (name) {
        return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", bmp: "image/bmp", ogg: "audio/ogg", wav: "audio/wav", mp3: "audio/mpeg" }[name.substr(name.lastIndexOf(".") + 1)];
    },
    getUserMedia: function (func) {
        if (!window.getUserMedia) {
            window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
        }
        window.getUserMedia(func);
    },
    getMovementX: function (event) {
        return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
    },
    getMovementY: function (event) {
        return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
    },
    getMouseWheelDelta: function (event) {
        var delta = 0;
        switch (event.type) {
            case "DOMMouseScroll":
                delta = event.detail / 3;
                break;
            case "mousewheel":
                delta = event.wheelDelta / 120;
                break;
            case "wheel":
                delta = event.deltaY;
                switch (event.deltaMode) {
                    case 0:
                        delta /= 100;
                        break;
                    case 1:
                        delta /= 3;
                        break;
                    case 2:
                        delta *= 80;
                        break;
                    default:
                        throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
                }
                break;
            default:
                throw "unrecognized mouse wheel event: " + event.type;
        }
        return delta;
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseEvent: function (event) {
        if (Browser.pointerLock) {
            if (event.type != "mousemove" && "mozMovementX" in event) {
                Browser.mouseMovementX = Browser.mouseMovementY = 0;
            } else {
                Browser.mouseMovementX = Browser.getMovementX(event);
                Browser.mouseMovementY = Browser.getMovementY(event);
            }
            if (typeof SDL != "undefined") {
                Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
                Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
            } else {
                Browser.mouseX += Browser.mouseMovementX;
                Browser.mouseY += Browser.mouseMovementY;
            }
        } else {
            var rect = Module["canvas"].getBoundingClientRect();
            var cw = Module["canvas"].width;
            var ch = Module["canvas"].height;
            var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
            var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
            if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                var touch = event.touch;
                if (touch === undefined) {
                    return;
                }
                var adjustedX = touch.pageX - (scrollX + rect.left);
                var adjustedY = touch.pageY - (scrollY + rect.top);
                adjustedX = adjustedX * (cw / rect.width);
                adjustedY = adjustedY * (ch / rect.height);
                var coords = { x: adjustedX, y: adjustedY };
                if (event.type === "touchstart") {
                    Browser.lastTouches[touch.identifier] = coords;
                    Browser.touches[touch.identifier] = coords;
                } else if (event.type === "touchend" || event.type === "touchmove") {
                    var last = Browser.touches[touch.identifier];
                    if (!last) last = coords;
                    Browser.lastTouches[touch.identifier] = last;
                    Browser.touches[touch.identifier] = coords;
                }
                return;
            }
            var x = event.pageX - (scrollX + rect.left);
            var y = event.pageY - (scrollY + rect.top);
            x = x * (cw / rect.width);
            y = y * (ch / rect.height);
            Browser.mouseMovementX = x - Browser.mouseX;
            Browser.mouseMovementY = y - Browser.mouseY;
            Browser.mouseX = x;
            Browser.mouseY = y;
        }
    },
    asyncLoad: function (url, onload, onerror, noRunDep) {
        var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
        readAsync(
            url,
            function (arrayBuffer) {
                assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
                onload(new Uint8Array(arrayBuffer));
                if (dep) removeRunDependency(dep);
            },
            function (event) {
                if (onerror) {
                    onerror();
                } else {
                    throw 'Loading data file "' + url + '" failed.';
                }
            }
        );
        if (dep) addRunDependency(dep);
    },
    resizeListeners: [],
    updateResizeListeners: function () {
        var canvas = Module["canvas"];
        Browser.resizeListeners.forEach(function (listener) {
            listener(canvas.width, canvas.height);
        });
    },
    setCanvasSize: function (width, height, noUpdates) {
        var canvas = Module["canvas"];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize: function () {
        if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags | 8388608;
            HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module["canvas"]);
        Browser.updateResizeListeners();
    },
    setWindowedCanvasSize: function () {
        if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags & ~8388608;
            HEAP32[SDL.screen >> 2] = flags;
        }
        Browser.updateCanvasDimensions(Module["canvas"]);
        Browser.updateResizeListeners();
    },
    updateCanvasDimensions: function (canvas, wNative, hNative) {
        if (typeof canvas != "undefined" && typeof wNative != "undefined" && typeof hNative != "undefined") {
            canvas.widthNative = wNative;
            canvas.heightNative = hNative;
            if (typeof canvas.style != "undefined") {
                canvas.style.removeProperty("width");
                canvas.style.removeProperty("height");
                canvas.style.setProperty("width", wNative + "px", "important");
                canvas.style.setProperty("height", hNative + "px", "important");
            }
        }
    },
    wgetRequests: {},
    nextWgetRequestHandle: 0,
    getNextWgetRequestHandle: function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
    },
};
function _usleep(useconds) {
    var msec = useconds / 1e3;
    if ((ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self["performance"] && self["performance"]["now"]) {
        var start = self["performance"]["now"]();
        while (self["performance"]["now"]() - start < msec) {}
    } else {
        var start = Date.now();
        while (Date.now() - start < msec) {}
    }
    return 0;
}
var RA = {
    BUFFER_SIZE: 2048,
    context: null,
    buffers: [],
    numBuffers: 0,
    bufIndex: 0,
    bufOffset: 0,
    startTime: 0,
    nonblock: false,
    currentTimeWorkaround: false,
    setStartTime: function () {
        if (RA.context.currentTime) {
            RA.startTime = window["performance"]["now"]() - RA.context.currentTime * 1e3;
            Module["resumeMainLoop"]();
        } else window["setTimeout"](RA.setStartTime, 0);
    },
    getCurrentPerfTime: function () {
        if (RA.startTime) return (window["performance"]["now"]() - RA.startTime) / 1e3;
        else return 0;
    },
    process: function (queueBuffers) {
        var currentTime = RA.getCurrentPerfTime();
        for (var i = 0; i < RA.bufIndex; i++) {
            if (RA.buffers[i].endTime !== 0 && RA.buffers[i].endTime < currentTime) {
                RA.buffers[i].endTime = 0;
                var buf = RA.buffers.splice(i, 1);
                RA.buffers[RA.numBuffers - 1] = buf[0];
                i--;
                RA.bufIndex--;
            }
        }
    },
    fillBuffer: function (buf, samples) {
        var count = 0;
        const leftBuffer = RA.buffers[RA.bufIndex].getChannelData(0);
        const rightBuffer = RA.buffers[RA.bufIndex].getChannelData(1);
        while (samples && RA.bufOffset !== RA.BUFFER_SIZE) {
            leftBuffer[RA.bufOffset] = HEAPF32[(buf + count * 8) >> 2];
            rightBuffer[RA.bufOffset] = HEAPF32[(buf + (count * 8 + 4)) >> 2];
            RA.bufOffset++;
            count++;
            samples--;
        }
        return count;
    },
    queueAudio: function () {
        var index = RA.bufIndex;
        var startTime;
        if (RA.bufIndex) startTime = RA.buffers[RA.bufIndex - 1].endTime;
        else startTime = RA.context.currentTime;
        RA.buffers[index].endTime = startTime + RA.buffers[index].duration;
        const bufferSource = RA.context.createBufferSource();
        bufferSource.buffer = RA.buffers[index];
        bufferSource.connect(RA.context.destination);
        bufferSource.start(startTime);
        RA.bufIndex++;
        RA.bufOffset = 0;
    },
    block: function () {
        do {
            RA.process();
        } while (RA.bufIndex === RA.numBuffers);
    },
};
function _RWebAudioBufferSize() {
    return RA.numBuffers * RA.BUFFER_SIZE * 8;
}
function _RWebAudioFree() {
    RA.bufIndex = 0;
    RA.bufOffset = 0;
}
function _RWebAudioInit(latency) {
    var ac = window["AudioContext"] || window["webkitAudioContext"];
    if (!ac) return 0;
    RA.context = new ac();
    RA.numBuffers = ((latency * RA.context.sampleRate) / (1e3 * RA.BUFFER_SIZE)) | 0;
    if (RA.numBuffers < 2) RA.numBuffers = 2;
    for (var i = 0; i < RA.numBuffers; i++) {
        RA.buffers[i] = RA.context.createBuffer(2, RA.BUFFER_SIZE, RA.context.sampleRate);
        RA.buffers[i].endTime = 0;
    }
    RA.nonblock = false;
    RA.startTime = 0;
    RA.context.createGain();
    window["setTimeout"](RA.setStartTime, 0);
    Module["pauseMainLoop"]();
    return 1;
}
function _RWebAudioRecalibrateTime() {
    if (RA.startTime) {
        RA.startTime = window["performance"]["now"]() - RA.context.currentTime * 1e3;
    }
}
function _RWebAudioSampleRate() {
    return RA.context.sampleRate;
}
function _RWebAudioSetNonblockState(state) {
    RA.nonblock = state;
}
function _RWebAudioStart() {
    return true;
}
function _RWebAudioStop() {
    RA.bufIndex = 0;
    RA.bufOffset = 0;
    return true;
}
function _RWebAudioWrite(buf, size) {
    RA.process();
    var samples = size / 8;
    var count = 0;
    while (samples) {
        if (RA.bufIndex === RA.numBuffers) {
            if (RA.nonblock) break;
            else RA.block();
        }
        var fill = RA.fillBuffer(buf, samples);
        samples -= fill;
        count += fill;
        buf += fill * 8;
        if (RA.bufOffset === RA.BUFFER_SIZE) {
            RA.queueAudio();
        }
    }
    return count * 8;
}
function _RWebAudioWriteAvail() {
    RA.process();
    return ((RA.numBuffers - RA.bufIndex) * RA.BUFFER_SIZE - RA.bufOffset) * 8;
}
var RWC = {
    RETRO_CAMERA_BUFFER_OPENGL_TEXTURE: 0,
    RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER: 1,
    tmp: null,
    contexts: [],
    counter: 0,
    ready: function (data) {
        return RWC.contexts[data].runMode == 2 && !RWC.contexts[data].videoElement.paused && RWC.contexts[data].videoElement.videoWidth != 0 && RWC.contexts[data].videoElement.videoHeight != 0;
    },
};
function _RWebCamFree(data) {
    RWC.contexts[data].videoElement.pause();
    URL.revokeObjectURL(RWC.contexts[data].videoElement.src);
    RWC.contexts[data].videoElement = null;
    RWC.contexts[data] = null;
}
function _RWebCamInit(caps1, caps2, width, height) {
    if (!navigator) return 0;
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (!navigator.getMedia) return 0;
    var c = ++RWC.counter;
    RWC.contexts[c] = [];
    RWC.contexts[c].videoElement = document.createElement("video");
    if (width !== 0 && height !== 0) {
        RWC.contexts[c].videoElement.width = width;
        RWC.contexts[c].videoElement.height = height;
    }
    RWC.contexts[c].runMode = 1;
    RWC.contexts[c].glTex = caps1 & (1 << RWC.RETRO_CAMERA_BUFFER_OPENGL_TEXTURE);
    RWC.contexts[c].rawFb = caps1 & (1 << RWC.RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER);
    navigator.getMedia(
        { video: true, audio: false },
        function (stream) {
            RWC.contexts[c].videoElement.autoplay = true;
            RWC.contexts[c].videoElement.src = URL.createObjectURL(stream);
            RWC.contexts[c].runMode = 2;
        },
        function (err) {
            console.log("webcam request failed", err);
            RWC.runMode = 0;
        }
    );
    if (!RWC.tmp) RWC.tmp = _malloc(4);
    return c;
}
var GL = {
    counter: 1,
    lastError: 0,
    buffers: [],
    mappedBuffers: {},
    programs: [],
    framebuffers: [],
    renderbuffers: [],
    textures: [],
    uniforms: [],
    shaders: [],
    vaos: [],
    contexts: {},
    currentContext: null,
    offscreenCanvases: {},
    timerQueriesEXT: [],
    currArrayBuffer: 0,
    currElementArrayBuffer: 0,
    byteSizeByTypeRoot: 5120,
    byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
    programInfos: {},
    stringCache: {},
    unpackAlignment: 4,
    init: function () {
        GL.createLog2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
            GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i + 1);
        }
    },
    recordError: function recordError(errorCode) {
        if (!GL.lastError) {
            GL.lastError = errorCode;
        }
    },
    getNewId: function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
            table[i] = null;
        }
        return ret;
    },
    MINI_TEMP_BUFFER_SIZE: 256,
    miniTempBuffer: null,
    miniTempBufferViews: [0],
    MAX_TEMP_BUFFER_SIZE: 2097152,
    numTempVertexBuffersPerSize: 64,
    log2ceilLookup: null,
    createLog2ceilLookup: function (maxValue) {
        GL.log2ceilLookup = new Uint8Array(maxValue + 1);
        var log2 = 0;
        var pow2 = 1;
        GL.log2ceilLookup[0] = 0;
        for (var i = 1; i <= maxValue; ++i) {
            if (i > pow2) {
                pow2 <<= 1;
                ++log2;
            }
            GL.log2ceilLookup[i] = log2;
        }
    },
    generateTempBuffers: function (quads, context) {
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex + 1;
        for (var i = 0; i <= largestIndex; ++i) {
            context.tempIndexBuffers[i] = null;
            context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
            var ringbufferLength = GL.numTempVertexBuffersPerSize;
            context.tempVertexBuffers1[i] = [];
            context.tempVertexBuffers2[i] = [];
            var ringbuffer1 = context.tempVertexBuffers1[i];
            var ringbuffer2 = context.tempVertexBuffers2[i];
            ringbuffer1.length = ringbuffer2.length = ringbufferLength;
            for (var j = 0; j < ringbufferLength; ++j) {
                ringbuffer1[j] = ringbuffer2[j] = null;
            }
        }
        if (quads) {
            context.tempQuadIndexBuffer = GLctx.createBuffer();
            context.GLctx.bindBuffer(context.GLctx.ELEMENT_ARRAY_BUFFER, context.tempQuadIndexBuffer);
            var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
            var quadIndexes = new Uint16Array(numIndexes);
            var i = 0,
                v = 0;
            while (1) {
                quadIndexes[i++] = v;
                if (i >= numIndexes) break;
                quadIndexes[i++] = v + 1;
                if (i >= numIndexes) break;
                quadIndexes[i++] = v + 2;
                if (i >= numIndexes) break;
                quadIndexes[i++] = v;
                if (i >= numIndexes) break;
                quadIndexes[i++] = v + 2;
                if (i >= numIndexes) break;
                quadIndexes[i++] = v + 3;
                if (i >= numIndexes) break;
                v += 4;
            }
            context.GLctx.bufferData(context.GLctx.ELEMENT_ARRAY_BUFFER, quadIndexes, context.GLctx.STATIC_DRAW);
            context.GLctx.bindBuffer(context.GLctx.ELEMENT_ARRAY_BUFFER, null);
        }
    },
    getTempVertexBuffer: function getTempVertexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = (GL.currentContext.tempVertexBufferCounters1[idx] + 1) & (GL.numTempVertexBuffersPerSize - 1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
            return vbo;
        }
        var prevVBO = GLctx.getParameter(GLctx.ARRAY_BUFFER_BINDING);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(GLctx.ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ARRAY_BUFFER, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
    },
    getTempIndexBuffer: function getTempIndexBuffer(sizeBytes) {
        var idx = GL.log2ceilLookup[sizeBytes];
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
            return ibo;
        }
        var prevIBO = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, 1 << idx, GLctx.DYNAMIC_DRAW);
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
    },
    newRenderingFrameStarted: function newRenderingFrameStarted() {
        if (!GL.currentContext) {
            return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup[GL.MAX_TEMP_BUFFER_SIZE];
        for (var i = 0; i <= largestIndex; ++i) {
            GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
    },
    getSource: function (shader, count, string, length) {
        var source = "";
        for (var i = 0; i < count; ++i) {
            var len = length ? HEAP32[(length + i * 4) >> 2] : -1;
            source += UTF8ToString(HEAP32[(string + i * 4) >> 2], len < 0 ? undefined : len);
        }
        return source;
    },
    calcBufLength: function calcBufLength(size, type, stride, count) {
        if (stride > 0) {
            return count * stride;
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
    },
    usedTempBuffers: [],
    preDrawHandleClientVertexAttribBindings: function preDrawHandleClientVertexAttribBindings(count) {
        GL.resetBufferBinding = false;
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
            var cb = GL.currentContext.clientBuffers[i];
            if (!cb.clientside || !cb.enabled) continue;
            GL.resetBufferBinding = true;
            var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
            var buf = GL.getTempVertexBuffer(size);
            GLctx.bindBuffer(GLctx.ARRAY_BUFFER, buf);
            GLctx.bufferSubData(GLctx.ARRAY_BUFFER, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size));
            cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
        }
    },
    postDrawHandleClientVertexAttribBindings: function postDrawHandleClientVertexAttribBindings() {
        if (GL.resetBufferBinding) {
            GLctx.bindBuffer(GLctx.ARRAY_BUFFER, GL.buffers[GL.currArrayBuffer]);
        }
    },
    createContext: function (canvas, webGLContextAttributes) {
        var ctx = canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes);
        return ctx ? GL.registerContext(ctx, webGLContextAttributes) : 0;
    },
    registerContext: function (ctx, webGLContextAttributes) {
        var handle = _malloc(8);
        var context = { handle: handle, attributes: webGLContextAttributes, version: webGLContextAttributes.majorVersion, GLctx: ctx };
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
            GL.initExtensions(context);
        }
        context.maxVertexAttribs = context.GLctx.getParameter(context.GLctx.MAX_VERTEX_ATTRIBS);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
            context.clientBuffers[i] = { enabled: false, clientside: false, size: 0, type: 0, normalized: 0, stride: 0, ptr: 0, vertexAttribPointerAdaptor: null };
        }
        GL.generateTempBuffers(false, context);
        return handle;
    },
    makeContextCurrent: function (contextHandle) {
        GL.currentContext = GL.contexts[contextHandle];
        Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
        return !(contextHandle && !GLctx);
    },
    getContext: function (contextHandle) {
        return GL.contexts[contextHandle];
    },
    deleteContext: function (contextHandle) {
        if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
        if (typeof JSEvents === "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        _free(GL.contexts[contextHandle]);
        GL.contexts[contextHandle] = null;
    },
    initExtensions: function (context) {
        if (!context) context = GL.currentContext;
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
        var GLctx = context.GLctx;
        if (context.version < 2) {
            var instancedArraysExt = GLctx.getExtension("ANGLE_instanced_arrays");
            if (instancedArraysExt) {
                GLctx["vertexAttribDivisor"] = function (index, divisor) {
                    instancedArraysExt["vertexAttribDivisorANGLE"](index, divisor);
                };
                GLctx["drawArraysInstanced"] = function (mode, first, count, primcount) {
                    instancedArraysExt["drawArraysInstancedANGLE"](mode, first, count, primcount);
                };
                GLctx["drawElementsInstanced"] = function (mode, count, type, indices, primcount) {
                    instancedArraysExt["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
                };
            }
            var vaoExt = GLctx.getExtension("OES_vertex_array_object");
            if (vaoExt) {
                GLctx["createVertexArray"] = function () {
                    return vaoExt["createVertexArrayOES"]();
                };
                GLctx["deleteVertexArray"] = function (vao) {
                    vaoExt["deleteVertexArrayOES"](vao);
                };
                GLctx["bindVertexArray"] = function (vao) {
                    vaoExt["bindVertexArrayOES"](vao);
                };
                GLctx["isVertexArray"] = function (vao) {
                    return vaoExt["isVertexArrayOES"](vao);
                };
            }
            var drawBuffersExt = GLctx.getExtension("WEBGL_draw_buffers");
            if (drawBuffersExt) {
                GLctx["drawBuffers"] = function (n, bufs) {
                    drawBuffersExt["drawBuffersWEBGL"](n, bufs);
                };
            }
        }
        GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        var automaticallyEnabledExtensions = [
            "OES_texture_float",
            "OES_texture_half_float",
            "OES_standard_derivatives",
            "OES_vertex_array_object",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_depth_texture",
            "OES_element_index_uint",
            "EXT_texture_filter_anisotropic",
            "EXT_frag_depth",
            "WEBGL_draw_buffers",
            "ANGLE_instanced_arrays",
            "OES_texture_float_linear",
            "OES_texture_half_float_linear",
            "EXT_blend_minmax",
            "EXT_shader_texture_lod",
            "WEBGL_compressed_texture_pvrtc",
            "EXT_color_buffer_half_float",
            "WEBGL_color_buffer_float",
            "EXT_sRGB",
            "WEBGL_compressed_texture_etc1",
            "EXT_disjoint_timer_query",
            "WEBGL_compressed_texture_etc",
            "WEBGL_compressed_texture_astc",
            "EXT_color_buffer_float",
            "WEBGL_compressed_texture_s3tc_srgb",
            "EXT_disjoint_timer_query_webgl2",
        ];
        var exts = GLctx.getSupportedExtensions();
        if (exts && exts.length > 0) {
            GLctx.getSupportedExtensions().forEach(function (ext) {
                if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
                    GLctx.getExtension(ext);
                }
            });
        }
    },
    populateUniformTable: function (program) {
        var p = GL.programs[program];
        var ptable = (GL.programInfos[program] = { uniforms: {}, maxUniformLength: 0, maxAttributeLength: -1, maxUniformBlockNameLength: -1 });
        var utable = ptable.uniforms;
        var numUniforms = GLctx.getProgramParameter(p, 35718);
        for (var i = 0; i < numUniforms; ++i) {
            var u = GLctx.getActiveUniform(p, i);
            var name = u.name;
            ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
            if (name.slice(-1) == "]") {
                name = name.slice(0, name.lastIndexOf("["));
            }
            var loc = GLctx.getUniformLocation(p, name);
            if (loc) {
                var id = GL.getNewId(GL.uniforms);
                utable[name] = [u.size, id];
                GL.uniforms[id] = loc;
                for (var j = 1; j < u.size; ++j) {
                    var n = name + "[" + j + "]";
                    loc = GLctx.getUniformLocation(p, n);
                    id = GL.getNewId(GL.uniforms);
                    GL.uniforms[id] = loc;
                }
            }
        }
    },
};
function _glBindTexture(target, texture) {
    GLctx.bindTexture(target, GL.textures[texture]);
}
function emscriptenWebGLGet(name_, p, type) {
    if (!p) {
        GL.recordError(1281);
        return;
    }
    var ret = undefined;
    switch (name_) {
        case 36346:
            ret = 1;
            break;
        case 36344:
            if (type !== "Integer" && type !== "Integer64") {
                GL.recordError(1280);
            }
            return;
        case 36345:
            ret = 0;
            break;
        case 34466:
            var formats = GLctx.getParameter(34467);
            ret = formats ? formats.length : 0;
            break;
    }
    if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
            case "number":
                ret = result;
                break;
            case "boolean":
                ret = result ? 1 : 0;
                break;
            case "string":
                GL.recordError(1280);
                return;
            case "object":
                if (result === null) {
                    switch (name_) {
                        case 34964:
                        case 35725:
                        case 34965:
                        case 36006:
                        case 36007:
                        case 32873:
                        case 34229:
                        case 34068: {
                            ret = 0;
                            break;
                        }
                        default: {
                            GL.recordError(1280);
                            return;
                        }
                    }
                } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                    for (var i = 0; i < result.length; ++i) {
                        switch (type) {
                            case "Integer":
                                HEAP32[(p + i * 4) >> 2] = result[i];
                                break;
                            case "Float":
                                HEAPF32[(p + i * 4) >> 2] = result[i];
                                break;
                            case "Boolean":
                                HEAP8[(p + i) >> 0] = result[i] ? 1 : 0;
                                break;
                            default:
                                throw "internal glGet error, bad type: " + type;
                        }
                    }
                    return;
                } else {
                    try {
                        ret = result.name | 0;
                    } catch (e) {
                        GL.recordError(1280);
                        err("GL_INVALID_ENUM in glGet" + type + "v: Unknown object returned from WebGL getParameter(" + name_ + ")! (error: " + e + ")");
                        return;
                    }
                }
                break;
            default:
                GL.recordError(1280);
                return;
        }
    }
    switch (type) {
        case "Integer64":
            (tempI64 = [
                ret >>> 0,
                ((tempDouble = ret), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
            ]),
                (HEAP32[p >> 2] = tempI64[0]),
                (HEAP32[(p + 4) >> 2] = tempI64[1]);
            break;
        case "Integer":
            HEAP32[p >> 2] = ret;
            break;
        case "Float":
            HEAPF32[p >> 2] = ret;
            break;
        case "Boolean":
            HEAP8[p >> 0] = ret ? 1 : 0;
            break;
        default:
            throw "internal glGet error, bad type: " + type;
    }
}
function _glGetIntegerv(name_, p) {
    emscriptenWebGLGet(name_, p, "Integer");
}
function _RWebCamPoll(data, frame_raw_cb, frame_gl_cb) {
    if (!RWC.ready(data)) return 0;
    var ret = 0;
    if (RWC.contexts[data].glTexId !== 0 && frame_gl_cb !== 0) {
        _glGetIntegerv(32873, RWC.tmp);
        var prev = HEAP32[RWC.tmp >> 2];
        _glBindTexture(3553, RWC.contexts[data].glTexId);
        if (RWC.contexts[data].glFirstFrame) {
            Module.ctx.texImage2D(Module.ctx.TEXTURE_2D, 0, Module.ctx.RGB, Module.ctx.RGB, Module.ctx.UNSIGNED_BYTE, RWC.contexts[data].videoElement);
            RWC.contexts[data].glFirstFrame = false;
        } else {
            Module.ctx.texSubImage2D(Module.ctx.TEXTURE_2D, 0, 0, 0, Module.ctx.RGB, Module.ctx.UNSIGNED_BYTE, RWC.contexts[data].videoElement);
        }
        _glBindTexture(3553, prev);
        Runtime.dynCall("viii", frame_gl_cb, [RWC.contexts[data].glTexId, 3553, 0]);
        ret = 1;
    }
    if (RWC.contexts[data].rawFbCanvas && frame_raw_cb !== 0) {
        if (!RWC.contexts[data].rawFbCanvasCtx) {
            RWC.contexts[data].rawFbCanvas.width = RWC.contexts[data].videoElement.videoWidth;
            RWC.contexts[data].rawFbCanvas.height = RWC.contexts[data].videoElement.videoHeight;
            RWC.contexts[data].rawFbCanvasCtx = RWC.contexts[data].rawFbCanvas.getContext("2d");
            RWC.contexts[data].rawBuffer = _malloc(RWC.contexts[data].videoElement.videoWidth * RWC.contexts[data].videoElement.videoHeight * 4);
        }
        RWC.contexts[data].rawFbCanvasCtx.drawImage(RWC.contexts[data].videoElement, 0, 0, RWC.contexts[data].rawFbCanvas.width, RWC.contexts[data].rawFbCanvas.height);
        var image = RWC.contexts[data].rawFbCanvasCtx.getImageData(0, 0, RWC.contexts[data].videoElement.videoWidth, RWC.contexts[data].videoElement.videoHeight);
        Module.HEAPU8.set(image.data, RWC.contexts[data].rawBuffer);
        Runtime.dynCall("viiii", frame_raw_cb, [RWC.contexts[data].rawBuffer, RWC.contexts[data].videoElement.videoWidth, RWC.contexts[data].videoElement.videoHeight, RWC.contexts[data].videoElement.videoWidth * 4]);
        ret = 1;
    }
    return ret;
}
function __glGenObject(n, buffers, createFunction, objectTable) {
    for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]();
        var id = buffer && GL.getNewId(objectTable);
        if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
        } else {
            GL.recordError(1282);
        }
        HEAP32[(buffers + i * 4) >> 2] = id;
    }
}
function _glGenTextures(n, textures) {
    __glGenObject(n, textures, "createTexture", GL.textures);
}
function _glTexParameteri(x0, x1, x2) {
    GLctx["texParameteri"](x0, x1, x2);
}
function _RWebCamStart(data) {
    var ret = 0;
    if (RWC.contexts[data].glTex) {
        _glGenTextures(1, RWC.tmp);
        RWC.contexts[data].glTexId = HEAP32[RWC.tmp >> 2];
        if (RWC.contexts[data].glTexId !== 0) {
            _glGetIntegerv(32873, RWC.tmp);
            var prev = HEAP32[RWC.tmp >> 2];
            _glBindTexture(3553, RWC.contexts[data].glTexId);
            _glTexParameteri(3553, 10240, 9729);
            _glTexParameteri(3553, 10241, 9729);
            _glTexParameteri(3553, 10242, 33071);
            _glTexParameteri(3553, 10243, 33071);
            _glBindTexture(3553, prev);
            RWC.contexts[data].glFirstFrame = true;
            ret = 1;
        }
    }
    if (RWC.contexts[data].rawFb) {
        RWC.contexts[data].rawFbCanvas = document.createElement("canvas");
        ret = 1;
    }
    return ret;
}
function _glDeleteTextures(n, textures) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2];
        var texture = GL.textures[id];
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
    }
}
function _RWebCamStop(data) {
    if (RWC.contexts[data].glTexId) {
        _glDeleteTextures(1, RWC.contexts[data].glTexId);
    }
    if (RWC.contexts[data].rawFbCanvas) {
        if (RWC.contexts[data].rawBuffer) {
            _free(RWC.contexts[data].rawBuffer);
            RWC.contexts[data].rawBuffer = 0;
            RWC.contexts[data].rawFbCanvasCtx = null;
        }
        RWC.contexts[data].rawFbCanvas = null;
    }
}
function ___assert_fail(condition, filename, line, func) {
    abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
}
var ENV = {};
function ___buildEnvironment(environ) {
    var MAX_ENV_VALUES = 64;
    var TOTAL_ENV_SIZE = 1024;
    var poolPtr;
    var envPtr;
    if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true;
        ENV["USER"] = ENV["LOGNAME"] = "web_user";
        ENV["PATH"] = "/";
        ENV["PWD"] = "/";
        ENV["HOME"] = "/home/web_user";
        ENV["LANG"] = "C.UTF-8";
        ENV["LANG"] = ((typeof navigator === "object" && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8";
        ENV["_"] = Module["thisProgram"];
        poolPtr = getMemory(TOTAL_ENV_SIZE);
        envPtr = getMemory(MAX_ENV_VALUES * 4);
        HEAP32[envPtr >> 2] = poolPtr;
        HEAP32[environ >> 2] = envPtr;
    } else {
        envPtr = HEAP32[environ >> 2];
        poolPtr = HEAP32[envPtr >> 2];
    }
    var strings = [];
    var totalSize = 0;
    for (var key in ENV) {
        if (typeof ENV[key] === "string") {
            var line = key + "=" + ENV[key];
            strings.push(line);
            totalSize += line.length;
        }
    }
    if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
    }
    var ptrSize = 4;
    for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[(envPtr + i * ptrSize) >> 2] = poolPtr;
        poolPtr += line.length + 1;
    }
    HEAP32[(envPtr + strings.length * ptrSize) >> 2] = 0;
}
function ___lock() {}
function ___setErrNo(value) {
    if (Module["___errno_location"]) HEAP32[Module["___errno_location"]() >> 2] = value;
    return value;
}
function ___map_file(pathname, size) {
    ___setErrNo(1);
    return -1;
}
var PATH = {
    splitPath: function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
    },
    normalizeArray: function (parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
                parts.splice(i, 1);
            } else if (last === "..") {
                parts.splice(i, 1);
                up++;
            } else if (up) {
                parts.splice(i, 1);
                up--;
            }
        }
        if (allowAboveRoot) {
            for (; up; up--) {
                parts.unshift("..");
            }
        }
        return parts;
    },
    normalize: function (path) {
        var isAbsolute = path.charAt(0) === "/",
            trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(
            path.split("/").filter(function (p) {
                return !!p;
            }),
            !isAbsolute
        ).join("/");
        if (!path && !isAbsolute) {
            path = ".";
        }
        if (path && trailingSlash) {
            path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
    },
    dirname: function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
            return ".";
        }
        if (dir) {
            dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
    },
    basename: function (path) {
        if (path === "/") return "/";
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
    },
    extname: function (path) {
        return PATH.splitPath(path)[3];
    },
    join: function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join("/"));
    },
    join2: function (l, r) {
        return PATH.normalize(l + "/" + r);
    },
};
var PATH_FS = {
    resolve: function () {
        var resolvedPath = "",
            resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : FS.cwd();
            if (typeof path !== "string") {
                throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
                return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charAt(0) === "/";
        }
        resolvedPath = PATH.normalizeArray(
            resolvedPath.split("/").filter(function (p) {
                return !!p;
            }),
            !resolvedAbsolute
        ).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    },
    relative: function (from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
                if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
                if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
            }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
    },
};
var TTY = {
    ttys: [],
    init: function () {},
    shutdown: function () {},
    register: function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
    },
    stream_ops: {
        open: function (stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
                throw new FS.ErrnoError(19);
            }
            stream.tty = tty;
            stream.seekable = false;
        },
        close: function (stream) {
            stream.tty.ops.flush(stream.tty);
        },
        flush: function (stream) {
            stream.tty.ops.flush(stream.tty);
        },
        read: function (stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
                throw new FS.ErrnoError(6);
            }
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
                var result;
                try {
                    result = stream.tty.ops.get_char(stream.tty);
                } catch (e) {
                    throw new FS.ErrnoError(5);
                }
                if (result === undefined && bytesRead === 0) {
                    throw new FS.ErrnoError(11);
                }
                if (result === null || result === undefined) break;
                bytesRead++;
                buffer[offset + i] = result;
            }
            if (bytesRead) {
                stream.node.timestamp = Date.now();
            }
            return bytesRead;
        },
        write: function (stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
                throw new FS.ErrnoError(6);
            }
            try {
                for (var i = 0; i < length; i++) {
                    stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
                }
            } catch (e) {
                throw new FS.ErrnoError(5);
            }
            if (length) {
                stream.node.timestamp = Date.now();
            }
            return i;
        },
    },
    default_tty_ops: {
        get_char: function (tty) {
            if (!tty.input.length) {
                var result = null;
                if (ENVIRONMENT_IS_NODE) {
                    var BUFSIZE = 256;
                    var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
                    var bytesRead = 0;
                    var isPosixPlatform = process.platform != "win32";
                    var fd = process.stdin.fd;
                    if (isPosixPlatform) {
                        var usingDevice = false;
                        try {
                            fd = fs.openSync("/dev/stdin", "r");
                            usingDevice = true;
                        } catch (e) {}
                    }
                    try {
                        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
                    } catch (e) {
                        if (e.toString().indexOf("EOF") != -1) bytesRead = 0;
                        else throw e;
                    }
                    if (usingDevice) {
                        fs.closeSync(fd);
                    }
                    if (bytesRead > 0) {
                        result = buf.slice(0, bytesRead).toString("utf-8");
                    } else {
                        result = null;
                    }
                } else if (typeof window != "undefined" && typeof window.prompt == "function") {
                    result = window.prompt("Input: ");
                    if (result !== null) {
                        result += "\n";
                    }
                } else if (typeof readline == "function") {
                    result = readline();
                    if (result !== null) {
                        result += "\n";
                    }
                }
                if (!result) {
                    return null;
                }
                tty.input = intArrayFromString(result, true);
            }
            return tty.input.shift();
        },
        put_char: function (tty, val) {
            if (val === null || val === 10) {
                out(UTF8ArrayToString(tty.output, 0));
                tty.output = [];
            } else {
                if (val != 0) tty.output.push(val);
            }
        },
        flush: function (tty) {
            if (tty.output && tty.output.length > 0) {
                out(UTF8ArrayToString(tty.output, 0));
                tty.output = [];
            }
        },
    },
    default_tty1_ops: {
        put_char: function (tty, val) {
            if (val === null || val === 10) {
                err(UTF8ArrayToString(tty.output, 0));
                tty.output = [];
            } else {
                if (val != 0) tty.output.push(val);
            }
        },
        flush: function (tty) {
            if (tty.output && tty.output.length > 0) {
                err(UTF8ArrayToString(tty.output, 0));
                tty.output = [];
            }
        },
    },
};
var MEMFS = {
    ops_table: null,
    mount: function (mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
    },
    createNode: function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(1);
        }
        if (!MEMFS.ops_table) {
            MEMFS.ops_table = {
                dir: {
                    node: {
                        getattr: MEMFS.node_ops.getattr,
                        setattr: MEMFS.node_ops.setattr,
                        lookup: MEMFS.node_ops.lookup,
                        mknod: MEMFS.node_ops.mknod,
                        rename: MEMFS.node_ops.rename,
                        unlink: MEMFS.node_ops.unlink,
                        rmdir: MEMFS.node_ops.rmdir,
                        readdir: MEMFS.node_ops.readdir,
                        symlink: MEMFS.node_ops.symlink,
                    },
                    stream: { llseek: MEMFS.stream_ops.llseek },
                },
                file: {
                    node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
                    stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, allocate: MEMFS.stream_ops.allocate, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync },
                },
                link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} },
                chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops },
            };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
        } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
        } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
            parent.contents[name] = node;
        }
        return node;
    },
    getFileDataAsRegularArray: function (node) {
        if (node.contents && node.contents.subarray) {
            var arr = [];
            for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
            return arr;
        }
        return node.contents;
    },
    getFileDataAsTypedArray: function (node) {
        if (!node.contents) return new Uint8Array();
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
    },
    expandFileStorage: function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) | 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
        return;
    },
    resizeFileStorage: function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
            return;
        }
        if (!node.contents || node.contents.subarray) {
            var oldContents = node.contents;
            node.contents = new Uint8Array(new ArrayBuffer(newSize));
            if (oldContents) {
                node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
            return;
        }
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
    },
    node_ops: {
        getattr: function (node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
                attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
                attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
                attr.size = node.link.length;
            } else {
                attr.size = 0;
            }
            attr.atime = new Date(node.timestamp);
            attr.mtime = new Date(node.timestamp);
            attr.ctime = new Date(node.timestamp);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
        },
        setattr: function (node, attr) {
            if (attr.mode !== undefined) {
                node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
                node.timestamp = attr.timestamp;
            }
            if (attr.size !== undefined) {
                MEMFS.resizeFileStorage(node, attr.size);
            }
        },
        lookup: function (parent, name) {
            throw FS.genericErrors[2];
        },
        mknod: function (parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
        },
        rename: function (old_node, new_dir, new_name) {
            if (FS.isDir(old_node.mode)) {
                var new_node;
                try {
                    new_node = FS.lookupNode(new_dir, new_name);
                } catch (e) {}
                if (new_node) {
                    for (var i in new_node.contents) {
                        throw new FS.ErrnoError(39);
                    }
                }
            }
            delete old_node.parent.contents[old_node.name];
            old_node.name = new_name;
            new_dir.contents[new_name] = old_node;
            old_node.parent = new_dir;
        },
        unlink: function (parent, name) {
            delete parent.contents[name];
        },
        rmdir: function (parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i in node.contents) {
                throw new FS.ErrnoError(39);
            }
            delete parent.contents[name];
        },
        readdir: function (node) {
            var entries = [".", ".."];
            for (var key in node.contents) {
                if (!node.contents.hasOwnProperty(key)) {
                    continue;
                }
                entries.push(key);
            }
            return entries;
        },
        symlink: function (parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node;
        },
        readlink: function (node) {
            if (!FS.isLink(node.mode)) {
                throw new FS.ErrnoError(22);
            }
            return node.link;
        },
    },
    stream_ops: {
        read: function (stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes) return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            if (size > 8 && contents.subarray) {
                buffer.set(contents.subarray(position, position + size), offset);
            } else {
                for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
            }
            return size;
        },
        write: function (stream, buffer, offset, length, position, canOwn) {
            canOwn = false;
            if (!length) return 0;
            var node = stream.node;
            node.timestamp = Date.now();
            if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                if (canOwn) {
                    node.contents = buffer.subarray(offset, offset + length);
                    node.usedBytes = length;
                    return length;
                } else if (node.usedBytes === 0 && position === 0) {
                    node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
                    node.usedBytes = length;
                    return length;
                } else if (position + length <= node.usedBytes) {
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                    return length;
                }
            }
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position);
            else {
                for (var i = 0; i < length; i++) {
                    node.contents[position + i] = buffer[offset + i];
                }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length;
        },
        llseek: function (stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
                position += stream.position;
            } else if (whence === 2) {
                if (FS.isFile(stream.node.mode)) {
                    position += stream.node.usedBytes;
                }
            }
            if (position < 0) {
                throw new FS.ErrnoError(22);
            }
            return position;
        },
        allocate: function (stream, offset, length) {
            MEMFS.expandFileStorage(stream.node, offset + length);
            stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
        mmap: function (stream, buffer, offset, length, position, prot, flags) {
            if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(19);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
                allocated = false;
                ptr = contents.byteOffset;
            } else {
                if (position > 0 || position + length < stream.node.usedBytes) {
                    if (contents.subarray) {
                        contents = contents.subarray(position, position + length);
                    } else {
                        contents = Array.prototype.slice.call(contents, position, position + length);
                    }
                }
                allocated = true;
                ptr = _malloc(length);
                if (!ptr) {
                    throw new FS.ErrnoError(12);
                }
                buffer.set(contents, ptr);
            }
            return { ptr: ptr, allocated: allocated };
        },
        msync: function (stream, buffer, offset, length, mmapFlags) {
            if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(19);
            }
            if (mmapFlags & 2) {
                return 0;
            }
            var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
            return 0;
        },
    },
};
var IDBFS = {
    dbs: {},
    indexedDB: function () {
        if (typeof indexedDB !== "undefined") return indexedDB;
        var ret = null;
        if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, "IDBFS used, but indexedDB not supported");
        return ret;
    },
    DB_VERSION: 21,
    DB_STORE_NAME: "FILE_DATA",
    mount: function (mount) {
        return MEMFS.mount.apply(null, arguments);
    },
    syncfs: function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function (err, local) {
            if (err) return callback(err);
            IDBFS.getRemoteSet(mount, function (err, remote) {
                if (err) return callback(err);
                var src = populate ? remote : local;
                var dst = populate ? local : remote;
                IDBFS.reconcile(src, dst, callback);
            });
        });
    },
    getDB: function (name, callback) {
        var db = IDBFS.dbs[name];
        if (db) {
            return callback(null, db);
        }
        var req;
        try {
            req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
            return callback(e);
        }
        if (!req) {
            return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = function (e) {
            var db = e.target.result;
            var transaction = e.target.transaction;
            var fileStore;
            if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
                fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
            } else {
                fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
            }
            if (!fileStore.indexNames.contains("timestamp")) {
                fileStore.createIndex("timestamp", "timestamp", { unique: false });
            }
        };
        req.onsuccess = function () {
            db = req.result;
            IDBFS.dbs[name] = db;
            callback(null, db);
        };
        req.onerror = function (e) {
            callback(this.error);
            e.preventDefault();
        };
    },
    getLocalSet: function (mount, callback) {
        var entries = {};
        function isRealDir(p) {
            return p !== "." && p !== "..";
        }
        function toAbsolute(root) {
            return function (p) {
                return PATH.join2(root, p);
            };
        }
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
        while (check.length) {
            var path = check.pop();
            var stat;
            try {
                stat = FS.stat(path);
            } catch (e) {
                return callback(e);
            }
            if (FS.isDir(stat.mode)) {
                check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
            }
            entries[path] = { timestamp: stat.mtime };
        }
        return callback(null, { type: "local", entries: entries });
    },
    getRemoteSet: function (mount, callback) {
        var entries = {};
        IDBFS.getDB(mount.mountpoint, function (err, db) {
            if (err) return callback(err);
            try {
                var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
                transaction.onerror = function (e) {
                    callback(this.error);
                    e.preventDefault();
                };
                var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
                var index = store.index("timestamp");
                index.openKeyCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (!cursor) {
                        return callback(null, { type: "remote", db: db, entries: entries });
                    }
                    entries[cursor.primaryKey] = { timestamp: cursor.key };
                    cursor.continue();
                };
            } catch (e) {
                return callback(e);
            }
        });
    },
    loadLocalEntry: function (path, callback) {
        var stat, node;
        try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
        } catch (e) {
            return callback(e);
        }
        if (FS.isDir(stat.mode)) {
            return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
            node.contents = MEMFS.getFileDataAsTypedArray(node);
            return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
            return callback(new Error("node type not supported"));
        }
    },
    storeLocalEntry: function (path, entry, callback) {
        try {
            if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
            } else if (FS.isFile(entry.mode)) {
                FS.writeFile(path, entry.contents, { canOwn: true });
            } else {
                return callback(new Error("node type not supported"));
            }
            FS.chmod(path, entry.mode);
            FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
            return callback(e);
        }
        callback(null);
    },
    removeLocalEntry: function (path, callback) {
        try {
            var lookup = FS.lookupPath(path);
            var stat = FS.stat(path);
            if (FS.isDir(stat.mode)) {
                FS.rmdir(path);
            } else if (FS.isFile(stat.mode)) {
                FS.unlink(path);
            }
        } catch (e) {
            return callback(e);
        }
        callback(null);
    },
    loadRemoteEntry: function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function (event) {
            callback(null, event.target.result);
        };
        req.onerror = function (e) {
            callback(this.error);
            e.preventDefault();
        };
    },
    storeRemoteEntry: function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function () {
            callback(null);
        };
        req.onerror = function (e) {
            callback(this.error);
            e.preventDefault();
        };
    },
    removeRemoteEntry: function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function () {
            callback(null);
        };
        req.onerror = function (e) {
            callback(this.error);
            e.preventDefault();
        };
    },
    reconcile: function (src, dst, callback) {
        var total = 0;
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
            var e = src.entries[key];
            var e2 = dst.entries[key];
            if (!e2 || e.timestamp > e2.timestamp) {
                create.push(key);
                total++;
            }
        });
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
            var e = dst.entries[key];
            var e2 = src.entries[key];
            if (!e2) {
                remove.push(key);
                total++;
            }
        });
        if (!total) {
            return callback(null);
        }
        var errored = false;
        var db = src.type === "remote" ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        function done(err) {
            if (err && !errored) {
                errored = true;
                return callback(err);
            }
        }
        transaction.onerror = function (e) {
            done(this.error);
            e.preventDefault();
        };
        transaction.oncomplete = function (e) {
            if (!errored) {
                callback(null);
            }
        };
        create.sort().forEach(function (path) {
            if (dst.type === "local") {
                IDBFS.loadRemoteEntry(store, path, function (err, entry) {
                    if (err) return done(err);
                    IDBFS.storeLocalEntry(path, entry, done);
                });
            } else {
                IDBFS.loadLocalEntry(path, function (err, entry) {
                    if (err) return done(err);
                    IDBFS.storeRemoteEntry(store, path, entry, done);
                });
            }
        });
        remove
            .sort()
            .reverse()
            .forEach(function (path) {
                if (dst.type === "local") {
                    IDBFS.removeLocalEntry(path, done);
                } else {
                    IDBFS.removeRemoteEntry(store, path, done);
                }
            });
    },
};
var NODEFS = {
    isWindows: false,
    staticInit: function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process["binding"]("constants");
        if (flags["fs"]) {
            flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = { 1024: flags["O_APPEND"], 64: flags["O_CREAT"], 128: flags["O_EXCL"], 0: flags["O_RDONLY"], 2: flags["O_RDWR"], 4096: flags["O_SYNC"], 512: flags["O_TRUNC"], 1: flags["O_WRONLY"] };
    },
    bufferFrom: function (arrayBuffer) {
        return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
    },
    mount: function (mount) {
        assert(ENVIRONMENT_HAS_NODE);
        return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
    },
    createNode: function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
            throw new FS.ErrnoError(22);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
    },
    getMode: function (path) {
        var stat;
        try {
            stat = fs.lstatSync(path);
            if (NODEFS.isWindows) {
                stat.mode = stat.mode | ((stat.mode & 292) >> 2);
            }
        } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(-e.errno);
        }
        return stat.mode;
    },
    realPath: function (node) {
        var parts = [];
        while (node.parent !== node) {
            parts.push(node.name);
            node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
    },
    flagsForNode: function (flags) {
        flags &= ~2097152;
        flags &= ~2048;
        flags &= ~32768;
        flags &= ~524288;
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
            if (flags & k) {
                newFlags |= NODEFS.flagsForNodeMap[k];
                flags ^= k;
            }
        }
        if (!flags) {
            return newFlags;
        } else {
            throw new FS.ErrnoError(22);
        }
    },
    node_ops: {
        getattr: function (node) {
            var path = NODEFS.realPath(node);
            var stat;
            try {
                stat = fs.lstatSync(path);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
            if (NODEFS.isWindows && !stat.blksize) {
                stat.blksize = 4096;
            }
            if (NODEFS.isWindows && !stat.blocks) {
                stat.blocks = ((stat.size + stat.blksize - 1) / stat.blksize) | 0;
            }
            return {
                dev: stat.dev,
                ino: stat.ino,
                mode: stat.mode,
                nlink: stat.nlink,
                uid: stat.uid,
                gid: stat.gid,
                rdev: stat.rdev,
                size: stat.size,
                atime: stat.atime,
                mtime: stat.mtime,
                ctime: stat.ctime,
                blksize: stat.blksize,
                blocks: stat.blocks,
            };
        },
        setattr: function (node, attr) {
            var path = NODEFS.realPath(node);
            try {
                if (attr.mode !== undefined) {
                    fs.chmodSync(path, attr.mode);
                    node.mode = attr.mode;
                }
                if (attr.timestamp !== undefined) {
                    var date = new Date(attr.timestamp);
                    fs.utimesSync(path, date, date);
                }
                if (attr.size !== undefined) {
                    fs.truncateSync(path, attr.size);
                }
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        lookup: function (parent, name) {
            var path = PATH.join2(NODEFS.realPath(parent), name);
            var mode = NODEFS.getMode(path);
            return NODEFS.createNode(parent, name, mode);
        },
        mknod: function (parent, name, mode, dev) {
            var node = NODEFS.createNode(parent, name, mode, dev);
            var path = NODEFS.realPath(node);
            try {
                if (FS.isDir(node.mode)) {
                    fs.mkdirSync(path, node.mode);
                } else {
                    fs.writeFileSync(path, "", { mode: node.mode });
                }
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
            return node;
        },
        rename: function (oldNode, newDir, newName) {
            var oldPath = NODEFS.realPath(oldNode);
            var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
            try {
                fs.renameSync(oldPath, newPath);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        unlink: function (parent, name) {
            var path = PATH.join2(NODEFS.realPath(parent), name);
            try {
                fs.unlinkSync(path);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        rmdir: function (parent, name) {
            var path = PATH.join2(NODEFS.realPath(parent), name);
            try {
                fs.rmdirSync(path);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        readdir: function (node) {
            var path = NODEFS.realPath(node);
            try {
                return fs.readdirSync(path);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        symlink: function (parent, newName, oldPath) {
            var newPath = PATH.join2(NODEFS.realPath(parent), newName);
            try {
                fs.symlinkSync(oldPath, newPath);
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        readlink: function (node) {
            var path = NODEFS.realPath(node);
            try {
                path = fs.readlinkSync(path);
                path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
                return path;
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
    },
    stream_ops: {
        open: function (stream) {
            var path = NODEFS.realPath(stream.node);
            try {
                if (FS.isFile(stream.node.mode)) {
                    stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
                }
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        close: function (stream) {
            try {
                if (FS.isFile(stream.node.mode) && stream.nfd) {
                    fs.closeSync(stream.nfd);
                }
            } catch (e) {
                if (!e.code) throw e;
                throw new FS.ErrnoError(-e.errno);
            }
        },
        read: function (stream, buffer, offset, length, position) {
            if (length === 0) return 0;
            try {
                return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
            } catch (e) {
                throw new FS.ErrnoError(-e.errno);
            }
        },
        write: function (stream, buffer, offset, length, position) {
            try {
                return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
            } catch (e) {
                throw new FS.ErrnoError(-e.errno);
            }
        },
        llseek: function (stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
                position += stream.position;
            } else if (whence === 2) {
                if (FS.isFile(stream.node.mode)) {
                    try {
                        var stat = fs.fstatSync(stream.nfd);
                        position += stat.size;
                    } catch (e) {
                        throw new FS.ErrnoError(-e.errno);
                    }
                }
            }
            if (position < 0) {
                throw new FS.ErrnoError(22);
            }
            return position;
        },
    },
};
var WORKERFS = {
    DIR_MODE: 16895,
    FILE_MODE: 33279,
    reader: null,
    mount: function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
        var createdParents = {};
        function ensureParent(path) {
            var parts = path.split("/");
            var parent = root;
            for (var i = 0; i < parts.length - 1; i++) {
                var curr = parts.slice(0, i + 1).join("/");
                if (!createdParents[curr]) {
                    createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
                }
                parent = createdParents[curr];
            }
            return parent;
        }
        function base(path) {
            var parts = path.split("/");
            return parts[parts.length - 1];
        }
        Array.prototype.forEach.call(mount.opts["files"] || [], function (file) {
            WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function (obj) {
            WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function (pack) {
            pack["metadata"].files.forEach(function (file) {
                var name = file.filename.substr(1);
                WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
            });
        });
        return root;
    },
    createNode: function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date()).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
        if (mode === WORKERFS.FILE_MODE) {
            node.size = contents.size;
            node.contents = contents;
        } else {
            node.size = 4096;
            node.contents = {};
        }
        if (parent) {
            parent.contents[name] = node;
        }
        return node;
    },
    node_ops: {
        getattr: function (node) {
            return {
                dev: 1,
                ino: undefined,
                mode: node.mode,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: undefined,
                size: node.size,
                atime: new Date(node.timestamp),
                mtime: new Date(node.timestamp),
                ctime: new Date(node.timestamp),
                blksize: 4096,
                blocks: Math.ceil(node.size / 4096),
            };
        },
        setattr: function (node, attr) {
            if (attr.mode !== undefined) {
                node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
                node.timestamp = attr.timestamp;
            }
        },
        lookup: function (parent, name) {
            throw new FS.ErrnoError(2);
        },
        mknod: function (parent, name, mode, dev) {
            throw new FS.ErrnoError(1);
        },
        rename: function (oldNode, newDir, newName) {
            throw new FS.ErrnoError(1);
        },
        unlink: function (parent, name) {
            throw new FS.ErrnoError(1);
        },
        rmdir: function (parent, name) {
            throw new FS.ErrnoError(1);
        },
        readdir: function (node) {
            var entries = [".", ".."];
            for (var key in node.contents) {
                if (!node.contents.hasOwnProperty(key)) {
                    continue;
                }
                entries.push(key);
            }
            return entries;
        },
        symlink: function (parent, newName, oldPath) {
            throw new FS.ErrnoError(1);
        },
        readlink: function (node) {
            throw new FS.ErrnoError(1);
        },
    },
    stream_ops: {
        read: function (stream, buffer, offset, length, position) {
            if (position >= stream.node.size) return 0;
            var chunk = stream.node.contents.slice(position, position + length);
            var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
            buffer.set(new Uint8Array(ab), offset);
            return chunk.size;
        },
        write: function (stream, buffer, offset, length, position) {
            throw new FS.ErrnoError(5);
        },
        llseek: function (stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
                position += stream.position;
            } else if (whence === 2) {
                if (FS.isFile(stream.node.mode)) {
                    position += stream.node.size;
                }
            }
            if (position < 0) {
                throw new FS.ErrnoError(22);
            }
            return position;
        },
    },
};
var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: "/",
    initialized: false,
    ignorePermissions: true,
    trackingDelegate: {},
    tracking: { openFlags: { READ: 1, WRITE: 2 } },
    ErrnoError: null,
    genericErrors: {},
    filesystems: null,
    syncFSRequests: 0,
    handleFSError: function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
        return ___setErrNo(e.errno);
    },
    lookupPath: function (path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
        if (!path) return { path: "", node: null };
        var defaults = { follow_mount: true, recurse_count: 0 };
        for (var key in defaults) {
            if (opts[key] === undefined) {
                opts[key] = defaults[key];
            }
        }
        if (opts.recurse_count > 8) {
            throw new FS.ErrnoError(40);
        }
        var parts = PATH.normalizeArray(
            path.split("/").filter(function (p) {
                return !!p;
            }),
            false
        );
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
            var islast = i === parts.length - 1;
            if (islast && opts.parent) {
                break;
            }
            current = FS.lookupNode(current, parts[i]);
            current_path = PATH.join2(current_path, parts[i]);
            if (FS.isMountpoint(current)) {
                if (!islast || (islast && opts.follow_mount)) {
                    current = current.mounted.root;
                }
            }
            if (!islast || opts.follow) {
                var count = 0;
                while (FS.isLink(current.mode)) {
                    var link = FS.readlink(current_path);
                    current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
                    var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
                    current = lookup.node;
                    if (count++ > 40) {
                        throw new FS.ErrnoError(40);
                    }
                }
            }
        }
        return { path: current_path, node: current };
    },
    getPath: function (node) {
        var path;
        while (true) {
            if (FS.isRoot(node)) {
                var mount = node.mount.mountpoint;
                if (!path) return mount;
                return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
            }
            path = path ? node.name + "/" + path : node.name;
            node = node.parent;
        }
    },
    hashName: function (parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
    },
    hashAddNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
    },
    hashRemoveNode: function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
        } else {
            var current = FS.nameTable[hash];
            while (current) {
                if (current.name_next === node) {
                    current.name_next = node.name_next;
                    break;
                }
                current = current.name_next;
            }
        }
    },
    lookupNode: function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
            throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
                return node;
            }
        }
        return FS.lookup(parent, name);
    },
    createNode: function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
            FS.FSNode = function (parent, name, mode, rdev) {
                if (!parent) {
                    parent = this;
                }
                this.parent = parent;
                this.mount = parent.mount;
                this.mounted = null;
                this.id = FS.nextInode++;
                this.name = name;
                this.mode = mode;
                this.node_ops = {};
                this.stream_ops = {};
                this.rdev = rdev;
            };
            FS.FSNode.prototype = {};
            var readMode = 292 | 73;
            var writeMode = 146;
            Object.defineProperties(FS.FSNode.prototype, {
                read: {
                    get: function () {
                        return (this.mode & readMode) === readMode;
                    },
                    set: function (val) {
                        val ? (this.mode |= readMode) : (this.mode &= ~readMode);
                    },
                },
                write: {
                    get: function () {
                        return (this.mode & writeMode) === writeMode;
                    },
                    set: function (val) {
                        val ? (this.mode |= writeMode) : (this.mode &= ~writeMode);
                    },
                },
                isFolder: {
                    get: function () {
                        return FS.isDir(this.mode);
                    },
                },
                isDevice: {
                    get: function () {
                        return FS.isChrdev(this.mode);
                    },
                },
            });
        }
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
    },
    destroyNode: function (node) {
        FS.hashRemoveNode(node);
    },
    isRoot: function (node) {
        return node === node.parent;
    },
    isMountpoint: function (node) {
        return !!node.mounted;
    },
    isFile: function (mode) {
        return (mode & 61440) === 32768;
    },
    isDir: function (mode) {
        return (mode & 61440) === 16384;
    },
    isLink: function (mode) {
        return (mode & 61440) === 40960;
    },
    isChrdev: function (mode) {
        return (mode & 61440) === 8192;
    },
    isBlkdev: function (mode) {
        return (mode & 61440) === 24576;
    },
    isFIFO: function (mode) {
        return (mode & 61440) === 4096;
    },
    isSocket: function (mode) {
        return (mode & 49152) === 49152;
    },
    flagModes: { r: 0, rs: 1052672, "r+": 2, w: 577, wx: 705, xw: 705, "w+": 578, "wx+": 706, "xw+": 706, a: 1089, ax: 1217, xa: 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 },
    modeStringToFlags: function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === "undefined") {
            throw new Error("Unknown file open mode: " + str);
        }
        return flags;
    },
    flagsToPermissionString: function (flag) {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
            perms += "w";
        }
        return perms;
    },
    nodePermissions: function (node, perms) {
        if (FS.ignorePermissions) {
            return 0;
        }
        if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
            return 13;
        } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
            return 13;
        } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
            return 13;
        }
        return 0;
    },
    mayLookup: function (dir) {
        var err = FS.nodePermissions(dir, "x");
        if (err) return err;
        if (!dir.node_ops.lookup) return 13;
        return 0;
    },
    mayCreate: function (dir, name) {
        try {
            var node = FS.lookupNode(dir, name);
            return 17;
        } catch (e) {}
        return FS.nodePermissions(dir, "wx");
    },
    mayDelete: function (dir, name, isdir) {
        var node;
        try {
            node = FS.lookupNode(dir, name);
        } catch (e) {
            return e.errno;
        }
        var err = FS.nodePermissions(dir, "wx");
        if (err) {
            return err;
        }
        if (isdir) {
            if (!FS.isDir(node.mode)) {
                return 20;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                return 16;
            }
        } else {
            if (FS.isDir(node.mode)) {
                return 21;
            }
        }
        return 0;
    },
    mayOpen: function (node, flags) {
        if (!node) {
            return 2;
        }
        if (FS.isLink(node.mode)) {
            return 40;
        } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
                return 21;
            }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
    },
    MAX_OPEN_FDS: 4096,
    nextfd: function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
            if (!FS.streams[fd]) {
                return fd;
            }
        }
        throw new FS.ErrnoError(24);
    },
    getStream: function (fd) {
        return FS.streams[fd];
    },
    createStream: function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
            FS.FSStream = function () {};
            FS.FSStream.prototype = {};
            Object.defineProperties(FS.FSStream.prototype, {
                object: {
                    get: function () {
                        return this.node;
                    },
                    set: function (val) {
                        this.node = val;
                    },
                },
                isRead: {
                    get: function () {
                        return (this.flags & 2097155) !== 1;
                    },
                },
                isWrite: {
                    get: function () {
                        return (this.flags & 2097155) !== 0;
                    },
                },
                isAppend: {
                    get: function () {
                        return this.flags & 1024;
                    },
                },
            });
        }
        var newStream = new FS.FSStream();
        for (var p in stream) {
            newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
    },
    closeStream: function (fd) {
        FS.streams[fd] = null;
    },
    chrdev_stream_ops: {
        open: function (stream) {
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            if (stream.stream_ops.open) {
                stream.stream_ops.open(stream);
            }
        },
        llseek: function () {
            throw new FS.ErrnoError(29);
        },
    },
    major: function (dev) {
        return dev >> 8;
    },
    minor: function (dev) {
        return dev & 255;
    },
    makedev: function (ma, mi) {
        return (ma << 8) | mi;
    },
    registerDevice: function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
    },
    getDevice: function (dev) {
        return FS.devices[dev];
    },
    getMounts: function (mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push.apply(check, m.mounts);
        }
        return mounts;
    },
    syncfs: function (populate, callback) {
        if (typeof populate === "function") {
            callback = populate;
            populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
            console.log("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(err) {
            FS.syncFSRequests--;
            return callback(err);
        }
        function done(err) {
            if (err) {
                if (!done.errored) {
                    done.errored = true;
                    return doCallback(err);
                }
                return;
            }
            if (++completed >= mounts.length) {
                doCallback(null);
            }
        }
        mounts.forEach(function (mount) {
            if (!mount.type.syncfs) {
                return done(null);
            }
            mount.type.syncfs(mount, populate, done);
        });
    },
    mount: function (type, opts, mountpoint) {
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
            throw new FS.ErrnoError(16);
        } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(16);
            }
            if (!FS.isDir(node.mode)) {
                throw new FS.ErrnoError(20);
            }
        }
        var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
            FS.root = mountRoot;
        } else if (node) {
            node.mounted = mount;
            if (node.mount) {
                node.mount.mounts.push(mount);
            }
        }
        return mountRoot;
    },
    unmount: function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(22);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach(function (hash) {
            var current = FS.nameTable[hash];
            while (current) {
                var next = current.name_next;
                if (mounts.indexOf(current.mount) !== -1) {
                    FS.destroyNode(current);
                }
                current = next;
            }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        node.mount.mounts.splice(idx, 1);
    },
    lookup: function (parent, name) {
        return parent.node_ops.lookup(parent, name);
    },
    mknod: function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === "." || name === "..") {
            throw new FS.ErrnoError(22);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(1);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
    },
    create: function (path, mode) {
        mode = mode !== undefined ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
    },
    mkdir: function (path, mode) {
        mode = mode !== undefined ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
    },
    mkdirTree: function (path, mode) {
        var dirs = path.split("/");
        var d = "";
        for (var i = 0; i < dirs.length; ++i) {
            if (!dirs[i]) continue;
            d += "/" + dirs[i];
            try {
                FS.mkdir(d, mode);
            } catch (e) {
                if (e.errno != 17) throw e;
            }
        }
    },
    mkdev: function (path, mode, dev) {
        if (typeof dev === "undefined") {
            dev = mode;
            mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
    },
    symlink: function (oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(2);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
            throw new FS.ErrnoError(2);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(1);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
    },
    rename: function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        try {
            lookup = FS.lookupPath(old_path, { parent: true });
            old_dir = lookup.node;
            lookup = FS.lookupPath(new_path, { parent: true });
            new_dir = lookup.node;
        } catch (e) {
            throw new FS.ErrnoError(16);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(2);
        if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(18);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(22);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(39);
        }
        var new_node;
        try {
            new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {}
        if (old_node === new_node) {
            return;
        }
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
            throw new FS.ErrnoError(16);
        }
        if (new_dir !== old_dir) {
            err = FS.nodePermissions(old_dir, "w");
            if (err) {
                throw new FS.ErrnoError(err);
            }
        }
        try {
            if (FS.trackingDelegate["willMovePath"]) {
                FS.trackingDelegate["willMovePath"](old_path, new_path);
            }
        } catch (e) {
            console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        }
        FS.hashRemoveNode(old_node);
        try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
            throw e;
        } finally {
            FS.hashAddNode(old_node);
        }
        try {
            if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
        } catch (e) {
            console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
        }
    },
    rmdir: function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(16);
        }
        try {
            if (FS.trackingDelegate["willDeletePath"]) {
                FS.trackingDelegate["willDeletePath"](path);
            }
        } catch (e) {
            console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
            if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
        } catch (e) {
            console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
    },
    readdir: function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
            throw new FS.ErrnoError(20);
        }
        return node.node_ops.readdir(node);
    },
    unlink: function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
            throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(16);
        }
        try {
            if (FS.trackingDelegate["willDeletePath"]) {
                FS.trackingDelegate["willDeletePath"](path);
            }
        } catch (e) {
            console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
            if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
        } catch (e) {
            console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
        }
    },
    readlink: function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
            throw new FS.ErrnoError(2);
        }
        if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(22);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
    },
    stat: function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
            throw new FS.ErrnoError(2);
        }
        if (!node.node_ops.getattr) {
            throw new FS.ErrnoError(1);
        }
        return node.node_ops.getattr(node);
    },
    lstat: function (path) {
        return FS.stat(path, true);
    },
    chmod: function (path, mode, dontFollow) {
        var node;
        if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
        } else {
            node = path;
        }
        if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, { mode: (mode & 4095) | (node.mode & ~4095), timestamp: Date.now() });
    },
    lchmod: function (path, mode) {
        FS.chmod(path, mode, true);
    },
    fchmod: function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
            throw new FS.ErrnoError(9);
        }
        FS.chmod(stream.node, mode);
    },
    chown: function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
        } else {
            node = path;
        }
        if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, { timestamp: Date.now() });
    },
    lchown: function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
    },
    fchown: function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
            throw new FS.ErrnoError(9);
        }
        FS.chown(stream.node, uid, gid);
    },
    truncate: function (path, len) {
        if (len < 0) {
            throw new FS.ErrnoError(22);
        }
        var node;
        if (typeof path === "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
        } else {
            node = path;
        }
        if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(1);
        }
        if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(21);
        }
        if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(22);
        }
        var err = FS.nodePermissions(node, "w");
        if (err) {
            throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, { size: len, timestamp: Date.now() });
    },
    ftruncate: function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
            throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(22);
        }
        FS.truncate(stream.node, len);
    },
    utime: function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) });
    },
    open: function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
            throw new FS.ErrnoError(2);
        }
        flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === "undefined" ? 438 : mode;
        if (flags & 64) {
            mode = (mode & 4095) | 32768;
        } else {
            mode = 0;
        }
        var node;
        if (typeof path === "object") {
            node = path;
        } else {
            path = PATH.normalize(path);
            try {
                var lookup = FS.lookupPath(path, { follow: !(flags & 131072) });
                node = lookup.node;
            } catch (e) {}
        }
        var created = false;
        if (flags & 64) {
            if (node) {
                if (flags & 128) {
                    throw new FS.ErrnoError(17);
                }
            } else {
                node = FS.mknod(path, mode, 0);
                created = true;
            }
        }
        if (!node) {
            throw new FS.ErrnoError(2);
        }
        if (FS.isChrdev(node.mode)) {
            flags &= ~512;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(20);
        }
        if (!created) {
            var err = FS.mayOpen(node, flags);
            if (err) {
                throw new FS.ErrnoError(err);
            }
        }
        if (flags & 512) {
            FS.truncate(node, 0);
        }
        flags &= ~(128 | 512);
        var stream = FS.createStream({ node: node, path: FS.getPath(node), flags: flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false }, fd_start, fd_end);
        if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
            if (!FS.readFiles) FS.readFiles = {};
            if (!(path in FS.readFiles)) {
                FS.readFiles[path] = 1;
                console.log("FS.trackingDelegate error on read file: " + path);
            }
        }
        try {
            if (FS.trackingDelegate["onOpenFile"]) {
                var trackingFlags = 0;
                if ((flags & 2097155) !== 1) {
                    trackingFlags |= FS.tracking.openFlags.READ;
                }
                if ((flags & 2097155) !== 0) {
                    trackingFlags |= FS.tracking.openFlags.WRITE;
                }
                FS.trackingDelegate["onOpenFile"](path, trackingFlags);
            }
        } catch (e) {
            console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
        }
        return stream;
    },
    close: function (stream) {
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(9);
        }
        if (stream.getdents) stream.getdents = null;
        try {
            if (stream.stream_ops.close) {
                stream.stream_ops.close(stream);
            }
        } catch (e) {
            throw e;
        } finally {
            FS.closeStream(stream.fd);
        }
        stream.fd = null;
    },
    isClosed: function (stream) {
        return stream.fd === null;
    },
    llseek: function (stream, offset, whence) {
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(9);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(29);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(22);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
    },
    read: function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
            throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(22);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
            position = stream.position;
        } else if (!stream.seekable) {
            throw new FS.ErrnoError(29);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
            throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(22);
        }
        if (stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== "undefined";
        if (!seeking) {
            position = stream.position;
        } else if (!stream.seekable) {
            throw new FS.ErrnoError(29);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
            if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
        } catch (e) {
            console.log("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
        }
        return bytesWritten;
    },
    allocate: function (stream, offset, length) {
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(9);
        }
        if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(22);
        }
        if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(9);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(19);
        }
        if (!stream.stream_ops.allocate) {
            throw new FS.ErrnoError(95);
        }
        stream.stream_ops.allocate(stream, offset, length);
    },
    mmap: function (stream, buffer, offset, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(13);
        }
        if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(13);
        }
        if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(19);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
            return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    },
    munmap: function (stream) {
        return 0;
    },
    ioctl: function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(25);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
    },
    readFile: function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || "r";
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === "binary") {
            ret = buf;
        }
        FS.close(stream);
        return ret;
    },
    writeFile: function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || "w";
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
            throw new Error("Unsupported data type");
        }
        FS.close(stream);
    },
    cwd: function () {
        return FS.currentPath;
    },
    chdir: function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
            throw new FS.ErrnoError(2);
        }
        if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(20);
        }
        var err = FS.nodePermissions(lookup.node, "x");
        if (err) {
            throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
    },
    createDefaultDirectories: function () {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
    },
    createDefaultDevices: function () {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
            read: function () {
                return 0;
            },
            write: function (stream, buffer, offset, length, pos) {
                return length;
            },
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var random_device;
        if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
            var randomBuffer = new Uint8Array(1);
            random_device = function () {
                crypto.getRandomValues(randomBuffer);
                return randomBuffer[0];
            };
        } else if (ENVIRONMENT_IS_NODE) {
            try {
                var crypto_module = require("crypto");
                random_device = function () {
                    return crypto_module["randomBytes"](1)[0];
                };
            } catch (e) {}
        } else {
        }
        if (!random_device) {
            random_device = function () {
                abort("random_device");
            };
        }
        FS.createDevice("/dev", "random", random_device);
        FS.createDevice("/dev", "urandom", random_device);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
    },
    createSpecialDirectories: function () {
        FS.mkdir("/proc");
        FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount(
            {
                mount: function () {
                    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
                    node.node_ops = {
                        lookup: function (parent, name) {
                            var fd = +name;
                            var stream = FS.getStream(fd);
                            if (!stream) throw new FS.ErrnoError(9);
                            var ret = {
                                parent: null,
                                mount: { mountpoint: "fake" },
                                node_ops: {
                                    readlink: function () {
                                        return stream.path;
                                    },
                                },
                            };
                            ret.parent = ret;
                            return ret;
                        },
                    };
                    return node;
                },
            },
            {},
            "/proc/self/fd"
        );
    },
    createStandardStreams: function () {
        if (Module["stdin"]) {
            FS.createDevice("/dev", "stdin", Module["stdin"]);
        } else {
            FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (Module["stdout"]) {
            FS.createDevice("/dev", "stdout", null, Module["stdout"]);
        } else {
            FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (Module["stderr"]) {
            FS.createDevice("/dev", "stderr", null, Module["stderr"]);
        } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
        }
        var stdin = FS.open("/dev/stdin", "r");
        var stdout = FS.open("/dev/stdout", "w");
        var stderr = FS.open("/dev/stderr", "w");
    },
    ensureErrnoError: function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
            this.node = node;
            this.setErrno = function (errno) {
                this.errno = errno;
            };
            this.setErrno(errno);
            this.message = "FS error";
            if (this.stack) Object.defineProperty(this, "stack", { value: new Error().stack, writable: true });
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        [2].forEach(function (code) {
            FS.genericErrors[code] = new FS.ErrnoError(code);
            FS.genericErrors[code].stack = "<generic error, no stack>";
        });
    },
    staticInit: function () {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = { MEMFS: MEMFS, IDBFS: IDBFS, NODEFS: NODEFS, WORKERFS: WORKERFS };
    },
    init: function (input, output, error) {
        FS.init.initialized = true;
        FS.ensureErrnoError();
        Module["stdin"] = input || Module["stdin"];
        Module["stdout"] = output || Module["stdout"];
        Module["stderr"] = error || Module["stderr"];
        FS.createStandardStreams();
    },
    quit: function () {
        FS.init.initialized = false;
        var fflush = Module["_fflush"];
        if (fflush) fflush(0);
        for (var i = 0; i < FS.streams.length; i++) {
            var stream = FS.streams[i];
            if (!stream) {
                continue;
            }
            FS.close(stream);
        }
    },
    getMode: function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
    },
    joinPath: function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == "/") path = path.substr(1);
        return path;
    },
    absolutePath: function (relative, base) {
        return PATH_FS.resolve(base, relative);
    },
    standardizePath: function (path) {
        return PATH.normalize(path);
    },
    findObject: function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
            return ret.object;
        } else {
            ___setErrNo(ret.error);
            return null;
        }
    },
    analyzePath: function (path, dontResolveLastLink) {
        try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
        } catch (e) {}
        var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
        try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
        } catch (e) {
            ret.error = e.errno;
        }
        return ret;
    },
    createFolder: function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
    },
    createPath: function (parent, path, canRead, canWrite) {
        parent = typeof parent === "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
                FS.mkdir(current);
            } catch (e) {}
            parent = current;
        }
        return current;
    },
    createFile: function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
    },
    createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
            if (typeof data === "string") {
                var arr = new Array(data.length);
                for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
                data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, "w");
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
        }
        return node;
    },
    createDevice: function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
            open: function (stream) {
                stream.seekable = false;
            },
            close: function (stream) {
                if (output && output.buffer && output.buffer.length) {
                    output(10);
                }
            },
            read: function (stream, buffer, offset, length, pos) {
                var bytesRead = 0;
                for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = input();
                    } catch (e) {
                        throw new FS.ErrnoError(5);
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(11);
                    }
                    if (result === null || result === undefined) break;
                    bytesRead++;
                    buffer[offset + i] = result;
                }
                if (bytesRead) {
                    stream.node.timestamp = Date.now();
                }
                return bytesRead;
            },
            write: function (stream, buffer, offset, length, pos) {
                for (var i = 0; i < length; i++) {
                    try {
                        output(buffer[offset + i]);
                    } catch (e) {
                        throw new FS.ErrnoError(5);
                    }
                }
                if (length) {
                    stream.node.timestamp = Date.now();
                }
                return i;
            },
        });
        return FS.mkdev(path, mode, dev);
    },
    createLink: function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
    },
    forceLoadFile: function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
            try {
                obj.contents = intArrayFromString(read_(obj.url), true);
                obj.usedBytes = obj.contents.length;
            } catch (e) {
                success = false;
            }
        } else {
            throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
        if (!success) ___setErrNo(5);
        return success;
    },
    createLazyFile: function (parent, name, url, canRead, canWrite) {
        function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = [];
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length - 1 || idx < 0) {
                return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize) | 0;
            return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
            var xhr = new XMLHttpRequest();
            xhr.open("HEAD", url, false);
            xhr.send(null);
            if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
            var chunkSize = 1024 * 1024;
            if (!hasByteServing) chunkSize = datalength;
            var doXHR = function (from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr.send(null);
                if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                    return new Uint8Array(xhr.response || []);
                } else {
                    return intArrayFromString(xhr.responseText || "", true);
                }
            };
            var lazyArray = this;
            lazyArray.setDataGetter(function (chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray.chunks[chunkNum] === "undefined") {
                    lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
            });
            if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== "undefined") {
            if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            Object.defineProperties(lazyArray, {
                length: {
                    get: function () {
                        if (!this.lengthKnown) {
                            this.cacheLength();
                        }
                        return this._length;
                    },
                },
                chunkSize: {
                    get: function () {
                        if (!this.lengthKnown) {
                            this.cacheLength();
                        }
                        return this._chunkSize;
                    },
                },
            });
            var properties = { isDevice: false, contents: lazyArray };
        } else {
            var properties = { isDevice: false, url: url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
            node.contents = properties.contents;
        } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
        }
        Object.defineProperties(node, {
            usedBytes: {
                get: function () {
                    return this.contents.length;
                },
            },
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function (key) {
            var fn = node.stream_ops[key];
            stream_ops[key] = function forceLoadLazyFile() {
                if (!FS.forceLoadFile(node)) {
                    throw new FS.ErrnoError(5);
                }
                return fn.apply(null, arguments);
            };
        });
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
            if (!FS.forceLoadFile(node)) {
                throw new FS.ErrnoError(5);
            }
            var contents = stream.node.contents;
            if (position >= contents.length) return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents[position + i];
                }
            } else {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents.get(position + i);
                }
            }
            return size;
        };
        node.stream_ops = stream_ops;
        return node;
    },
    createPreloadedFile: function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init();
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency("cp " + fullname);
        function processData(byteArray) {
            function finish(byteArray) {
                if (preFinish) preFinish();
                if (!dontCreateFile) {
                    FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
                }
                if (onload) onload();
                removeRunDependency(dep);
            }
            var handled = false;
            Module["preloadPlugins"].forEach(function (plugin) {
                if (handled) return;
                if (plugin["canHandle"](fullname)) {
                    plugin["handle"](byteArray, fullname, finish, function () {
                        if (onerror) onerror();
                        removeRunDependency(dep);
                    });
                    handled = true;
                }
            });
            if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
            Browser.asyncLoad(
                url,
                function (byteArray) {
                    processData(byteArray);
                },
                onerror
            );
        } else {
            processData(url);
        }
    },
    indexedDB: function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    },
    DB_NAME: function () {
        return "EM_FS_" + window.location.pathname;
    },
    DB_VERSION: 20,
    DB_STORE_NAME: "FILE_DATA",
    saveFilesToDB: function (paths, onload, onerror) {
        onload = onload || function () {};
        onerror = onerror || function () {};
        var indexedDB = FS.indexedDB();
        try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
            return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
            console.log("creating db");
            var db = openRequest.result;
            db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0,
                fail = 0,
                total = paths.length;
            function finish() {
                if (fail == 0) onload();
                else onerror();
            }
            paths.forEach(function (path) {
                var putRequest = files.put(FS.analyzePath(path).object.contents, path);
                putRequest.onsuccess = function putRequest_onsuccess() {
                    ok++;
                    if (ok + fail == total) finish();
                };
                putRequest.onerror = function putRequest_onerror() {
                    fail++;
                    if (ok + fail == total) finish();
                };
            });
            transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
    },
    loadFilesFromDB: function (paths, onload, onerror) {
        onload = onload || function () {};
        onerror = onerror || function () {};
        var indexedDB = FS.indexedDB();
        try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
            return onerror(e);
        }
        openRequest.onupgradeneeded = onerror;
        openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            try {
                var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
            } catch (e) {
                onerror(e);
                return;
            }
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0,
                fail = 0,
                total = paths.length;
            function finish() {
                if (fail == 0) onload();
                else onerror();
            }
            paths.forEach(function (path) {
                var getRequest = files.get(path);
                getRequest.onsuccess = function getRequest_onsuccess() {
                    if (FS.analyzePath(path).exists) {
                        FS.unlink(path);
                    }
                    FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                    ok++;
                    if (ok + fail == total) finish();
                };
                getRequest.onerror = function getRequest_onerror() {
                    fail++;
                    if (ok + fail == total) finish();
                };
            });
            transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
    },
};
var SYSCALLS = {
    DEFAULT_POLLMASK: 5,
    mappings: {},
    umask: 511,
    calculateAt: function (dirfd, path) {
        if (path[0] !== "/") {
            var dir;
            if (dirfd === -100) {
                dir = FS.cwd();
            } else {
                var dirstream = FS.getStream(dirfd);
                if (!dirstream) throw new FS.ErrnoError(9);
                dir = dirstream.path;
            }
            path = PATH.join2(dir, path);
        }
        return path;
    },
    doStat: function (func, path, buf) {
        try {
            var stat = func(path);
        } catch (e) {
            if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
                return -20;
            }
            throw e;
        }
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[(buf + 4) >> 2] = 0;
        HEAP32[(buf + 8) >> 2] = stat.ino;
        HEAP32[(buf + 12) >> 2] = stat.mode;
        HEAP32[(buf + 16) >> 2] = stat.nlink;
        HEAP32[(buf + 20) >> 2] = stat.uid;
        HEAP32[(buf + 24) >> 2] = stat.gid;
        HEAP32[(buf + 28) >> 2] = stat.rdev;
        HEAP32[(buf + 32) >> 2] = 0;
        (tempI64 = [
            stat.size >>> 0,
            ((tempDouble = stat.size), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
        ]),
            (HEAP32[(buf + 40) >> 2] = tempI64[0]),
            (HEAP32[(buf + 44) >> 2] = tempI64[1]);
        HEAP32[(buf + 48) >> 2] = 4096;
        HEAP32[(buf + 52) >> 2] = stat.blocks;
        HEAP32[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0;
        HEAP32[(buf + 60) >> 2] = 0;
        HEAP32[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0;
        HEAP32[(buf + 68) >> 2] = 0;
        HEAP32[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0;
        HEAP32[(buf + 76) >> 2] = 0;
        (tempI64 = [
            stat.ino >>> 0,
            ((tempDouble = stat.ino), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
        ]),
            (HEAP32[(buf + 80) >> 2] = tempI64[0]),
            (HEAP32[(buf + 84) >> 2] = tempI64[1]);
        return 0;
    },
    doMsync: function (addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
    },
    doMkdir: function (path, mode) {
        path = PATH.normalize(path);
        if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
        FS.mkdir(path, mode, 0);
        return 0;
    },
    doMknod: function (path, mode, dev) {
        switch (mode & 61440) {
            case 32768:
            case 8192:
            case 24576:
            case 4096:
            case 49152:
                break;
            default:
                return -22;
        }
        FS.mknod(path, mode, dev);
        return 0;
    },
    doReadlink: function (path, buf, bufsize) {
        if (bufsize <= 0) return -22;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        HEAP8[buf + len] = endChar;
        return len;
    },
    doAccess: function (path, amode) {
        if (amode & ~7) {
            return -22;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        var perms = "";
        if (amode & 4) perms += "r";
        if (amode & 2) perms += "w";
        if (amode & 1) perms += "x";
        if (perms && FS.nodePermissions(node, perms)) {
            return -13;
        }
        return 0;
    },
    doDup: function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
    },
    doReadv: function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[(iov + i * 8) >> 2];
            var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
        }
        return ret;
    },
    doWritev: function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[(iov + i * 8) >> 2];
            var len = HEAP32[(iov + (i * 8 + 4)) >> 2];
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
        }
        return ret;
    },
    varargs: 0,
    get: function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2];
        return ret;
    },
    getStr: function () {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
    },
    getStreamFromFD: function () {
        var stream = FS.getStream(SYSCALLS.get());
        if (!stream) throw new FS.ErrnoError(9);
        return stream;
    },
    get64: function () {
        var low = SYSCALLS.get(),
            high = SYSCALLS.get();
        return low;
    },
    getZero: function () {
        SYSCALLS.get();
    },
};
function ___syscall10(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var path = SYSCALLS.getStr();
        FS.unlink(path);
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall140(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            offset_high = SYSCALLS.get(),
            offset_low = SYSCALLS.get(),
            result = SYSCALLS.get(),
            whence = SYSCALLS.get();
        var HIGH_OFFSET = 4294967296;
        var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
        var DOUBLE_LIMIT = 9007199254740992;
        if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
            return -75;
        }
        FS.llseek(stream, offset, whence);
        (tempI64 = [
            stream.position >>> 0,
            ((tempDouble = stream.position),
            +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
        ]),
            (HEAP32[result >> 2] = tempI64[0]),
            (HEAP32[(result + 4) >> 2] = tempI64[1]);
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall145(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        return SYSCALLS.doReadv(stream, iov, iovcnt);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall146(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            iov = SYSCALLS.get(),
            iovcnt = SYSCALLS.get();
        return SYSCALLS.doWritev(stream, iov, iovcnt);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall183(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var buf = SYSCALLS.get(),
            size = SYSCALLS.get();
        if (size === 0) return -22;
        var cwd = FS.cwd();
        var cwdLengthInBytes = lengthBytesUTF8(cwd);
        if (size < cwdLengthInBytes + 1) return -34;
        stringToUTF8(cwd, buf, size);
        return buf;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall194(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var fd = SYSCALLS.get(),
            zero = SYSCALLS.getZero(),
            length = SYSCALLS.get64();
        FS.ftruncate(fd, length);
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall195(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var path = SYSCALLS.getStr(),
            buf = SYSCALLS.get();
        return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall197(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            buf = SYSCALLS.get();
        return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
var PROCINFO = { ppid: 1, pid: 42, sid: 42, pgid: 42 };
function ___syscall20(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        return PROCINFO.pid;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall220(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            dirp = SYSCALLS.get(),
            count = SYSCALLS.get();
        if (!stream.getdents) {
            stream.getdents = FS.readdir(stream.path);
        }
        var struct_size = 280;
        var pos = 0;
        var off = FS.llseek(stream, 0, 1);
        var idx = Math.floor(off / struct_size);
        while (idx < stream.getdents.length && pos + struct_size <= count) {
            var id;
            var type;
            var name = stream.getdents[idx];
            if (name[0] === ".") {
                id = 1;
                type = 4;
            } else {
                var child = FS.lookupNode(stream.node, name);
                id = child.id;
                type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
            }
            (tempI64 = [
                id >>> 0,
                ((tempDouble = id), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
            ]),
                (HEAP32[(dirp + pos) >> 2] = tempI64[0]),
                (HEAP32[(dirp + pos + 4) >> 2] = tempI64[1]);
            (tempI64 = [
                ((idx + 1) * struct_size) >>> 0,
                ((tempDouble = (idx + 1) * struct_size),
                +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
            ]),
                (HEAP32[(dirp + pos + 8) >> 2] = tempI64[0]),
                (HEAP32[(dirp + pos + 12) >> 2] = tempI64[1]);
            HEAP16[(dirp + pos + 16) >> 1] = 280;
            HEAP8[(dirp + pos + 18) >> 0] = type;
            stringToUTF8(name, dirp + pos + 19, 256);
            pos += struct_size;
            idx += 1;
        }
        FS.llseek(stream, idx * struct_size, 0);
        return pos;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall221(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            cmd = SYSCALLS.get();
        switch (cmd) {
            case 0: {
                var arg = SYSCALLS.get();
                if (arg < 0) {
                    return -22;
                }
                var newStream;
                newStream = FS.open(stream.path, stream.flags, 0, arg);
                return newStream.fd;
            }
            case 1:
            case 2:
                return 0;
            case 3:
                return stream.flags;
            case 4: {
                var arg = SYSCALLS.get();
                stream.flags |= arg;
                return 0;
            }
            case 12: {
                var arg = SYSCALLS.get();
                var offset = 0;
                HEAP16[(arg + offset) >> 1] = 2;
                return 0;
            }
            case 13:
            case 14:
                return 0;
            case 16:
            case 8:
                return -22;
            case 9:
                ___setErrNo(22);
                return -1;
            default: {
                return -22;
            }
        }
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall3(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            buf = SYSCALLS.get(),
            count = SYSCALLS.get();
        return FS.read(stream, HEAP8, buf, count);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall38(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var old_path = SYSCALLS.getStr(),
            new_path = SYSCALLS.getStr();
        FS.rename(old_path, new_path);
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall39(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var path = SYSCALLS.getStr(),
            mode = SYSCALLS.get();
        return SYSCALLS.doMkdir(path, mode);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall4(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            buf = SYSCALLS.get(),
            count = SYSCALLS.get();
        return FS.write(stream, HEAP8, buf, count);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall40(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var path = SYSCALLS.getStr();
        FS.rmdir(path);
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall5(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var pathname = SYSCALLS.getStr(),
            flags = SYSCALLS.get(),
            mode = SYSCALLS.get();
        var stream = FS.open(pathname, flags, mode);
        return stream.fd;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall54(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(),
            op = SYSCALLS.get();
        switch (op) {
            case 21509:
            case 21505: {
                if (!stream.tty) return -25;
                return 0;
            }
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508: {
                if (!stream.tty) return -25;
                return 0;
            }
            case 21519: {
                if (!stream.tty) return -25;
                var argp = SYSCALLS.get();
                HEAP32[argp >> 2] = 0;
                return 0;
            }
            case 21520: {
                if (!stream.tty) return -25;
                return -22;
            }
            case 21531: {
                var argp = SYSCALLS.get();
                return FS.ioctl(stream, op, argp);
            }
            case 21523: {
                if (!stream.tty) return -25;
                return 0;
            }
            case 21524: {
                if (!stream.tty) return -25;
                return 0;
            }
            default:
                abort("bad ioctl syscall " + op);
        }
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall6(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD();
        FS.close(stream);
        return 0;
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___syscall85(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var path = SYSCALLS.getStr(),
            buf = SYSCALLS.get(),
            bufsize = SYSCALLS.get();
        return SYSCALLS.doReadlink(path, buf, bufsize);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function __emscripten_syscall_munmap(addr, len) {
    if (addr === -1 || len === 0) {
        return -22;
    }
    var info = SYSCALLS.mappings[addr];
    if (!info) return 0;
    if (len === info.len) {
        var stream = FS.getStream(info.fd);
        SYSCALLS.doMsync(addr, stream, len, info.flags);
        FS.munmap(stream);
        SYSCALLS.mappings[addr] = null;
        if (info.allocated) {
            _free(info.malloc);
        }
    }
    return 0;
}
function ___syscall91(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
        var addr = SYSCALLS.get(),
            len = SYSCALLS.get();
        return __emscripten_syscall_munmap(addr, len);
    } catch (e) {
        if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
        return -e.errno;
    }
}
function ___unlock() {}
function _abort() {
    Module["abort"]();
}
function _emscripten_get_now_is_monotonic() {
    return 0 || ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || (typeof performance === "object" && performance && typeof performance["now"] === "function");
}
function _clock_gettime(clk_id, tp) {
    var now;
    if (clk_id === 0) {
        now = Date.now();
    } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
        now = _emscripten_get_now();
    } else {
        ___setErrNo(22);
        return -1;
    }
    HEAP32[tp >> 2] = (now / 1e3) | 0;
    HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0;
    return 0;
}
var ERRNO_CODES = {
    EPERM: 1,
    ENOENT: 2,
    ESRCH: 3,
    EINTR: 4,
    EIO: 5,
    ENXIO: 6,
    E2BIG: 7,
    ENOEXEC: 8,
    EBADF: 9,
    ECHILD: 10,
    EAGAIN: 11,
    EWOULDBLOCK: 11,
    ENOMEM: 12,
    EACCES: 13,
    EFAULT: 14,
    ENOTBLK: 15,
    EBUSY: 16,
    EEXIST: 17,
    EXDEV: 18,
    ENODEV: 19,
    ENOTDIR: 20,
    EISDIR: 21,
    EINVAL: 22,
    ENFILE: 23,
    EMFILE: 24,
    ENOTTY: 25,
    ETXTBSY: 26,
    EFBIG: 27,
    ENOSPC: 28,
    ESPIPE: 29,
    EROFS: 30,
    EMLINK: 31,
    EPIPE: 32,
    EDOM: 33,
    ERANGE: 34,
    ENOMSG: 42,
    EIDRM: 43,
    ECHRNG: 44,
    EL2NSYNC: 45,
    EL3HLT: 46,
    EL3RST: 47,
    ELNRNG: 48,
    EUNATCH: 49,
    ENOCSI: 50,
    EL2HLT: 51,
    EDEADLK: 35,
    ENOLCK: 37,
    EBADE: 52,
    EBADR: 53,
    EXFULL: 54,
    ENOANO: 55,
    EBADRQC: 56,
    EBADSLT: 57,
    EDEADLOCK: 35,
    EBFONT: 59,
    ENOSTR: 60,
    ENODATA: 61,
    ETIME: 62,
    ENOSR: 63,
    ENONET: 64,
    ENOPKG: 65,
    EREMOTE: 66,
    ENOLINK: 67,
    EADV: 68,
    ESRMNT: 69,
    ECOMM: 70,
    EPROTO: 71,
    EMULTIHOP: 72,
    EDOTDOT: 73,
    EBADMSG: 74,
    ENOTUNIQ: 76,
    EBADFD: 77,
    EREMCHG: 78,
    ELIBACC: 79,
    ELIBBAD: 80,
    ELIBSCN: 81,
    ELIBMAX: 82,
    ELIBEXEC: 83,
    ENOSYS: 38,
    ENOTEMPTY: 39,
    ENAMETOOLONG: 36,
    ELOOP: 40,
    EOPNOTSUPP: 95,
    EPFNOSUPPORT: 96,
    ECONNRESET: 104,
    ENOBUFS: 105,
    EAFNOSUPPORT: 97,
    EPROTOTYPE: 91,
    ENOTSOCK: 88,
    ENOPROTOOPT: 92,
    ESHUTDOWN: 108,
    ECONNREFUSED: 111,
    EADDRINUSE: 98,
    ECONNABORTED: 103,
    ENETUNREACH: 101,
    ENETDOWN: 100,
    ETIMEDOUT: 110,
    EHOSTDOWN: 112,
    EHOSTUNREACH: 113,
    EINPROGRESS: 115,
    EALREADY: 114,
    EDESTADDRREQ: 89,
    EMSGSIZE: 90,
    EPROTONOSUPPORT: 93,
    ESOCKTNOSUPPORT: 94,
    EADDRNOTAVAIL: 99,
    ENETRESET: 102,
    EISCONN: 106,
    ENOTCONN: 107,
    ETOOMANYREFS: 109,
    EUSERS: 87,
    EDQUOT: 122,
    ESTALE: 116,
    ENOTSUP: 95,
    ENOMEDIUM: 123,
    EILSEQ: 84,
    EOVERFLOW: 75,
    ECANCELED: 125,
    ENOTRECOVERABLE: 131,
    EOWNERDEAD: 130,
    ESTRPIPE: 86,
};
function _dummyErrnoCodes() {
    if (!ERRNO_CODES) {
        console.error("ERRNO_CODES not imported!");
    }
}
var EGL = {
    errorCode: 12288,
    defaultDisplayInitialized: false,
    currentContext: 0,
    currentReadSurface: 0,
    currentDrawSurface: 0,
    contextAttributes: { alpha: false, depth: false, stencil: false, antialias: false },
    stringCache: {},
    setErrorCode: function (code) {
        EGL.errorCode = code;
    },
    chooseConfig: function (display, attribList, config, config_size, numConfigs) {
        if (display != 62e3) {
            EGL.setErrorCode(12296);
            return 0;
        }
        if (attribList) {
            for (;;) {
                var param = HEAP32[attribList >> 2];
                if (param == 12321) {
                    var alphaSize = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.alpha = alphaSize > 0;
                } else if (param == 12325) {
                    var depthSize = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.depth = depthSize > 0;
                } else if (param == 12326) {
                    var stencilSize = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.stencil = stencilSize > 0;
                } else if (param == 12337) {
                    var samples = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.antialias = samples > 0;
                } else if (param == 12338) {
                    var samples = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.antialias = samples == 1;
                } else if (param == 12544) {
                    var requestedPriority = HEAP32[(attribList + 4) >> 2];
                    EGL.contextAttributes.lowLatency = requestedPriority != 12547;
                } else if (param == 12344) {
                    break;
                }
                attribList += 8;
            }
        }
        if ((!config || !config_size) && !numConfigs) {
            EGL.setErrorCode(12300);
            return 0;
        }
        if (numConfigs) {
            HEAP32[numConfigs >> 2] = 1;
        }
        if (config && config_size > 0) {
            HEAP32[config >> 2] = 62002;
        }
        EGL.setErrorCode(12288);
        return 1;
    },
};
function _eglBindAPI(api) {
    if (api == 12448) {
        EGL.setErrorCode(12288);
        return 1;
    } else {
        EGL.setErrorCode(12300);
        return 0;
    }
}
function _eglChooseConfig(display, attrib_list, configs, config_size, numConfigs) {
    return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
}
function _eglCreateContext(display, config, hmm, contextAttribs) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    var glesContextVersion = 1;
    for (;;) {
        var param = HEAP32[contextAttribs >> 2];
        if (param == 12440) {
            glesContextVersion = HEAP32[(contextAttribs + 4) >> 2];
        } else if (param == 12344) {
            break;
        } else {
            EGL.setErrorCode(12292);
            return 0;
        }
        contextAttribs += 8;
    }
    if (glesContextVersion != 2) {
        EGL.setErrorCode(12293);
        return 0;
    }
    EGL.contextAttributes.majorVersion = glesContextVersion - 1;
    EGL.contextAttributes.minorVersion = 0;
    EGL.context = GL.createContext(Module["canvas"], EGL.contextAttributes);
    if (EGL.context != 0) {
        EGL.setErrorCode(12288);
        GL.makeContextCurrent(EGL.context);
        Module.useWebGL = true;
        Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
            callback();
        });
        GL.makeContextCurrent(null);
        return 62004;
    } else {
        EGL.setErrorCode(12297);
        return 0;
    }
}
function _eglCreateWindowSurface(display, config, win, attrib_list) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    if (config != 62002) {
        EGL.setErrorCode(12293);
        return 0;
    }
    EGL.setErrorCode(12288);
    return 62006;
}
function _eglDestroyContext(display, context) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    if (context != 62004) {
        EGL.setErrorCode(12294);
        return 0;
    }
    EGL.setErrorCode(12288);
    return 1;
}
function _eglDestroySurface(display, surface) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    if (surface != 62006) {
        EGL.setErrorCode(12301);
        return 1;
    }
    if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0;
    }
    if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0;
    }
    EGL.setErrorCode(12288);
    return 1;
}
function _eglGetConfigs(display, configs, config_size, numConfigs) {
    return EGL.chooseConfig(display, 0, configs, config_size, numConfigs);
}
function _eglGetCurrentContext() {
    return EGL.currentContext;
}
function _eglGetDisplay(nativeDisplayType) {
    EGL.setErrorCode(12288);
    return 62e3;
}
function _eglGetError() {
    return EGL.errorCode;
}
function _eglGetProcAddress(name_) {
    return _emscripten_GetProcAddress(name_);
}
function _eglInitialize(display, majorVersion, minorVersion) {
    if (display == 62e3) {
        if (majorVersion) {
            HEAP32[majorVersion >> 2] = 1;
        }
        if (minorVersion) {
            HEAP32[minorVersion >> 2] = 4;
        }
        EGL.defaultDisplayInitialized = true;
        EGL.setErrorCode(12288);
        return 1;
    } else {
        EGL.setErrorCode(12296);
        return 0;
    }
}
function _eglMakeCurrent(display, draw, read, context) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    if (context != 0 && context != 62004) {
        EGL.setErrorCode(12294);
        return 0;
    }
    if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006)) {
        EGL.setErrorCode(12301);
        return 0;
    }
    GL.makeContextCurrent(context ? EGL.context : null);
    EGL.currentContext = context;
    EGL.currentDrawSurface = draw;
    EGL.currentReadSurface = read;
    EGL.setErrorCode(12288);
    return 1;
}
function _eglQuerySurface(display, surface, attribute, value) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    if (surface != 62006) {
        EGL.setErrorCode(12301);
        return 0;
    }
    if (!value) {
        EGL.setErrorCode(12300);
        return 0;
    }
    EGL.setErrorCode(12288);
    switch (attribute) {
        case 12328:
            HEAP32[value >> 2] = 62002;
            return 1;
        case 12376:
            return 1;
        case 12375:
            HEAP32[value >> 2] = Module.canvas.width;
            return 1;
        case 12374:
            HEAP32[value >> 2] = Module.canvas.height;
            return 1;
        case 12432:
            HEAP32[value >> 2] = -1;
            return 1;
        case 12433:
            HEAP32[value >> 2] = -1;
            return 1;
        case 12434:
            HEAP32[value >> 2] = -1;
            return 1;
        case 12422:
            HEAP32[value >> 2] = 12420;
            return 1;
        case 12441:
            HEAP32[value >> 2] = 12442;
            return 1;
        case 12435:
            HEAP32[value >> 2] = 12437;
            return 1;
        case 12416:
        case 12417:
        case 12418:
        case 12419:
            return 1;
        default:
            EGL.setErrorCode(12292);
            return 0;
    }
}
function _eglSwapBuffers() {
    if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(12289);
    } else if (!Module.ctx) {
        EGL.setErrorCode(12290);
    } else if (Module.ctx.isContextLost()) {
        EGL.setErrorCode(12302);
    } else {
        EGL.setErrorCode(12288);
        return 1;
    }
    return 0;
}
function _eglTerminate(display) {
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0;
    }
    EGL.currentContext = 0;
    EGL.currentReadSurface = 0;
    EGL.currentDrawSurface = 0;
    EGL.defaultDisplayInitialized = false;
    EGL.setErrorCode(12288);
    return 1;
}
var JSEvents = {
    keyEvent: 0,
    mouseEvent: 0,
    wheelEvent: 0,
    uiEvent: 0,
    focusEvent: 0,
    deviceOrientationEvent: 0,
    deviceMotionEvent: 0,
    fullscreenChangeEvent: 0,
    pointerlockChangeEvent: 0,
    visibilityChangeEvent: 0,
    touchEvent: 0,
    previousFullscreenElement: null,
    previousScreenX: null,
    previousScreenY: null,
    removeEventListenersRegistered: false,
    removeAllEventListeners: function () {
        for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
            JSEvents._removeHandler(i);
        }
        JSEvents.eventHandlers = [];
        JSEvents.deferredCalls = [];
    },
    registerRemoveEventListeners: function () {
        if (!JSEvents.removeEventListenersRegistered) {
            __ATEXIT__.push(JSEvents.removeAllEventListeners);
            JSEvents.removeEventListenersRegistered = true;
        }
    },
    deferredCalls: [],
    deferCall: function (targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
            if (arrA.length != arrB.length) return false;
            for (var i in arrA) {
                if (arrA[i] != arrB[i]) return false;
            }
            return true;
        }
        for (var i in JSEvents.deferredCalls) {
            var call = JSEvents.deferredCalls[i];
            if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
                return;
            }
        }
        JSEvents.deferredCalls.push({ targetFunction: targetFunction, precedence: precedence, argsList: argsList });
        JSEvents.deferredCalls.sort(function (x, y) {
            return x.precedence < y.precedence;
        });
    },
    removeDeferredCalls: function (targetFunction) {
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
            if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
                JSEvents.deferredCalls.splice(i, 1);
                --i;
            }
        }
    },
    canPerformEventHandlerRequests: function () {
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
    },
    runDeferredCalls: function () {
        if (!JSEvents.canPerformEventHandlerRequests()) {
            return;
        }
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
            var call = JSEvents.deferredCalls[i];
            JSEvents.deferredCalls.splice(i, 1);
            --i;
            call.targetFunction.apply(this, call.argsList);
        }
    },
    inEventHandler: 0,
    currentEventHandler: null,
    eventHandlers: [],
    isInternetExplorer: function () {
        return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0;
    },
    removeAllHandlersOnTarget: function (target, eventTypeString) {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
                JSEvents._removeHandler(i--);
            }
        }
    },
    _removeHandler: function (i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
    },
    registerOrRemoveHandler: function (eventHandler) {
        var jsEventHandler = function jsEventHandler(event) {
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            JSEvents.runDeferredCalls();
            eventHandler.handlerFunc(event);
            JSEvents.runDeferredCalls();
            --JSEvents.inEventHandler;
        };
        if (eventHandler.callbackfunc) {
            eventHandler.eventListenerFunc = jsEventHandler;
            eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
            JSEvents.eventHandlers.push(eventHandler);
            JSEvents.registerRemoveEventListeners();
        } else {
            for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
                    JSEvents._removeHandler(i--);
                }
            }
        }
    },
    getBoundingClientRectOrZeros: function (target) {
        return target.getBoundingClientRect ? target.getBoundingClientRect() : { left: 0, top: 0 };
    },
    pageScrollPos: function () {
        if (window.pageXOffset > 0 || window.pageYOffset > 0) {
            return [window.pageXOffset, window.pageYOffset];
        }
        if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
            return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
        }
        return [document.body.scrollLeft | 0, document.body.scrollTop | 0];
    },
    getNodeNameForTarget: function (target) {
        if (!target) return "";
        if (target == window) return "#window";
        if (target == screen) return "#screen";
        return target && target.nodeName ? target.nodeName : "";
    },
    tick: function () {
        if (window["performance"] && window["performance"]["now"]) return window["performance"]["now"]();
        else return Date.now();
    },
    fullscreenEnabled: function () {
        return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    },
};
function __requestPointerLock(target) {
    if (target.requestPointerLock) {
        target.requestPointerLock();
    } else if (target.mozRequestPointerLock) {
        target.mozRequestPointerLock();
    } else if (target.webkitRequestPointerLock) {
        target.webkitRequestPointerLock();
    } else if (target.msRequestPointerLock) {
        target.msRequestPointerLock();
    } else {
        if (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) {
            return -3;
        } else {
            return -1;
        }
    }
    return 0;
}
function _emscripten_exit_pointerlock() {
    JSEvents.removeDeferredCalls(__requestPointerLock);
    if (document.exitPointerLock) {
        document.exitPointerLock();
    } else if (document.msExitPointerLock) {
        document.msExitPointerLock();
    } else if (document.mozExitPointerLock) {
        document.mozExitPointerLock();
    } else if (document.webkitExitPointerLock) {
        document.webkitExitPointerLock();
    } else {
        return -1;
    }
    return 0;
}
function _emscripten_force_exit(status) {
    Module["noExitRuntime"] = false;
    exit(status);
}
var __specialEventTargets = [0, typeof document !== "undefined" ? document : 0, typeof window !== "undefined" ? window : 0];
function __findEventTarget(target) {
    try {
        if (!target) return window;
        if (typeof target === "number") target = __specialEventTargets[target] || UTF8ToString(target);
        if (target === "#window") return window;
        else if (target === "#document") return document;
        else if (target === "#screen") return screen;
        else if (target === "#canvas") return Module["canvas"];
        return typeof target === "string" ? document.getElementById(target) : target;
    } catch (e) {
        return null;
    }
}
function __findCanvasEventTarget(target) {
    if (typeof target === "number") target = UTF8ToString(target);
    if (!target || target === "#canvas") {
        if (typeof GL !== "undefined" && GL.offscreenCanvases["canvas"]) return GL.offscreenCanvases["canvas"];
        return Module["canvas"];
    }
    if (typeof GL !== "undefined" && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
    return __findEventTarget(target);
}
function _emscripten_get_canvas_element_size(target, width, height) {
    var canvas = __findCanvasEventTarget(target);
    if (!canvas) return -4;
    HEAP32[width >> 2] = canvas.width;
    HEAP32[height >> 2] = canvas.height;
}
function __fillFullscreenChangeEventData(eventStruct, e) {
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    var isFullscreen = !!fullscreenElement;
    HEAP32[eventStruct >> 2] = isFullscreen;
    HEAP32[(eventStruct + 4) >> 2] = JSEvents.fullscreenEnabled();
    var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
    var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
    var id = reportedElement && reportedElement.id ? reportedElement.id : "";
    stringToUTF8(nodeName, eventStruct + 8, 128);
    stringToUTF8(id, eventStruct + 136, 128);
    HEAP32[(eventStruct + 264) >> 2] = reportedElement ? reportedElement.clientWidth : 0;
    HEAP32[(eventStruct + 268) >> 2] = reportedElement ? reportedElement.clientHeight : 0;
    HEAP32[(eventStruct + 272) >> 2] = screen.width;
    HEAP32[(eventStruct + 276) >> 2] = screen.height;
    if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement;
    }
}
function _emscripten_get_fullscreen_status(fullscreenStatus) {
    if (!JSEvents.fullscreenEnabled()) return -1;
    __fillFullscreenChangeEventData(fullscreenStatus);
    return 0;
}
function __fillGamepadEventData(eventStruct, e) {
    HEAPF64[eventStruct >> 3] = e.timestamp;
    for (var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(eventStruct + i * 8 + 16) >> 3] = e.axes[i];
    }
    for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] === "object") {
            HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i].value;
        } else {
            HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i];
        }
    }
    for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] === "object") {
            HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i].pressed;
        } else {
            HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i] == 1;
        }
    }
    HEAP32[(eventStruct + 1296) >> 2] = e.connected;
    HEAP32[(eventStruct + 1300) >> 2] = e.index;
    HEAP32[(eventStruct + 8) >> 2] = e.axes.length;
    HEAP32[(eventStruct + 12) >> 2] = e.buttons.length;
    stringToUTF8(e.id, eventStruct + 1304, 64);
    stringToUTF8(e.mapping, eventStruct + 1368, 64);
}
function _emscripten_get_gamepad_status(index, gamepadState) {
    if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
    if (!JSEvents.lastGamepadState[index]) return -7;
    __fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
    return 0;
}
function _emscripten_get_heap_size() {
    return HEAP8.length;
}
function _emscripten_glActiveTexture(x0) {
    GLctx["activeTexture"](x0);
}
function _emscripten_glAttachShader(program, shader) {
    GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
}
function _emscripten_glBeginQueryEXT(target, id) {
    GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.timerQueriesEXT[id]);
}
function _emscripten_glBindAttribLocation(program, index, name) {
    GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
}
function _emscripten_glBindBuffer(target, buffer) {
    if (target == GLctx.ARRAY_BUFFER) {
        GL.currArrayBuffer = buffer;
    } else if (target == GLctx.ELEMENT_ARRAY_BUFFER) {
        GL.currElementArrayBuffer = buffer;
    }
    GLctx.bindBuffer(target, GL.buffers[buffer]);
}
function _emscripten_glBindFramebuffer(target, framebuffer) {
    GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
}
function _emscripten_glBindRenderbuffer(target, renderbuffer) {
    GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
}
function _emscripten_glBindTexture(target, texture) {
    GLctx.bindTexture(target, GL.textures[texture]);
}
function _emscripten_glBindVertexArrayOES(vao) {
    GLctx["bindVertexArray"](GL.vaos[vao]);
    var ibo = GLctx.getParameter(GLctx.ELEMENT_ARRAY_BUFFER_BINDING);
    GL.currElementArrayBuffer = ibo ? ibo.name | 0 : 0;
}
function _emscripten_glBlendColor(x0, x1, x2, x3) {
    GLctx["blendColor"](x0, x1, x2, x3);
}
function _emscripten_glBlendEquation(x0) {
    GLctx["blendEquation"](x0);
}
function _emscripten_glBlendEquationSeparate(x0, x1) {
    GLctx["blendEquationSeparate"](x0, x1);
}
function _emscripten_glBlendFunc(x0, x1) {
    GLctx["blendFunc"](x0, x1);
}
function _emscripten_glBlendFuncSeparate(x0, x1, x2, x3) {
    GLctx["blendFuncSeparate"](x0, x1, x2, x3);
}
function _emscripten_glBufferData(target, size, data, usage) {
    GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
}
function _emscripten_glBufferSubData(target, offset, size, data) {
    GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
}
function _emscripten_glCheckFramebufferStatus(x0) {
    return GLctx["checkFramebufferStatus"](x0);
}
function _emscripten_glClear(x0) {
    GLctx["clear"](x0);
}
function _emscripten_glClearColor(x0, x1, x2, x3) {
    GLctx["clearColor"](x0, x1, x2, x3);
}
function _emscripten_glClearDepthf(x0) {
    GLctx["clearDepth"](x0);
}
function _emscripten_glClearStencil(x0) {
    GLctx["clearStencil"](x0);
}
function _emscripten_glColorMask(red, green, blue, alpha) {
    GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
}
function _emscripten_glCompileShader(shader) {
    GLctx.compileShader(GL.shaders[shader]);
}
function _emscripten_glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
    GLctx["compressedTexImage2D"](target, level, internalFormat, width, height, border, data ? HEAPU8.subarray(data, data + imageSize) : null);
}
function _emscripten_glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
    GLctx["compressedTexSubImage2D"](target, level, xoffset, yoffset, width, height, format, data ? HEAPU8.subarray(data, data + imageSize) : null);
}
function _emscripten_glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
    GLctx["copyTexImage2D"](x0, x1, x2, x3, x4, x5, x6, x7);
}
function _emscripten_glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
    GLctx["copyTexSubImage2D"](x0, x1, x2, x3, x4, x5, x6, x7);
}
function _emscripten_glCreateProgram() {
    var id = GL.getNewId(GL.programs);
    var program = GLctx.createProgram();
    program.name = id;
    GL.programs[id] = program;
    return id;
}
function _emscripten_glCreateShader(shaderType) {
    var id = GL.getNewId(GL.shaders);
    GL.shaders[id] = GLctx.createShader(shaderType);
    return id;
}
function _emscripten_glCullFace(x0) {
    GLctx["cullFace"](x0);
}
function _emscripten_glDeleteBuffers(n, buffers) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2];
        var buffer = GL.buffers[id];
        if (!buffer) continue;
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0;
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0;
    }
}
function _emscripten_glDeleteFramebuffers(n, framebuffers) {
    for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue;
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
    }
}
function _emscripten_glDeleteProgram(id) {
    if (!id) return;
    var program = GL.programs[id];
    if (!program) {
        GL.recordError(1281);
        return;
    }
    GLctx.deleteProgram(program);
    program.name = 0;
    GL.programs[id] = null;
    GL.programInfos[id] = null;
}
function _emscripten_glDeleteQueriesEXT(n, ids) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2];
        var query = GL.timerQueriesEXT[id];
        if (!query) continue;
        GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
        GL.timerQueriesEXT[id] = null;
    }
}
function _emscripten_glDeleteRenderbuffers(n, renderbuffers) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue;
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
    }
}
function _emscripten_glDeleteShader(id) {
    if (!id) return;
    var shader = GL.shaders[id];
    if (!shader) {
        GL.recordError(1281);
        return;
    }
    GLctx.deleteShader(shader);
    GL.shaders[id] = null;
}
function _emscripten_glDeleteTextures(n, textures) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2];
        var texture = GL.textures[id];
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
    }
}
function _emscripten_glDeleteVertexArraysOES(n, vaos) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2];
        GLctx["deleteVertexArray"](GL.vaos[id]);
        GL.vaos[id] = null;
    }
}
function _emscripten_glDepthFunc(x0) {
    GLctx["depthFunc"](x0);
}
function _emscripten_glDepthMask(flag) {
    GLctx.depthMask(!!flag);
}
function _emscripten_glDepthRangef(x0, x1) {
    GLctx["depthRange"](x0, x1);
}
function _emscripten_glDetachShader(program, shader) {
    GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
}
function _emscripten_glDisable(x0) {
    GLctx["disable"](x0);
}
function _emscripten_glDisableVertexAttribArray(index) {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = false;
    GLctx.disableVertexAttribArray(index);
}
function _emscripten_glDrawArrays(mode, first, count) {
    GL.preDrawHandleClientVertexAttribBindings(first + count);
    GLctx.drawArrays(mode, first, count);
    GL.postDrawHandleClientVertexAttribBindings();
}
function _emscripten_glDrawArraysInstancedANGLE(mode, first, count, primcount) {
    GLctx["drawArraysInstanced"](mode, first, count, primcount);
}
var __tempFixedLengthArray = [];
function _emscripten_glDrawBuffersWEBGL(n, bufs) {
    var bufArray = __tempFixedLengthArray[n];
    for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2];
    }
    GLctx["drawBuffers"](bufArray);
}
function _emscripten_glDrawElements(mode, count, type, indices) {
    var buf;
    if (!GL.currElementArrayBuffer) {
        var size = GL.calcBufLength(1, type, 0, count);
        buf = GL.getTempIndexBuffer(size);
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, buf);
        GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, 0, HEAPU8.subarray(indices, indices + size));
        indices = 0;
    }
    GL.preDrawHandleClientVertexAttribBindings(count);
    GLctx.drawElements(mode, count, type, indices);
    GL.postDrawHandleClientVertexAttribBindings(count);
    if (!GL.currElementArrayBuffer) {
        GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, null);
    }
}
function _emscripten_glDrawElementsInstancedANGLE(mode, count, type, indices, primcount) {
    GLctx["drawElementsInstanced"](mode, count, type, indices, primcount);
}
function _emscripten_glEnable(x0) {
    GLctx["enable"](x0);
}
function _emscripten_glEnableVertexAttribArray(index) {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = true;
    GLctx.enableVertexAttribArray(index);
}
function _emscripten_glEndQueryEXT(target) {
    GLctx.disjointTimerQueryExt["endQueryEXT"](target);
}
function _emscripten_glFinish() {
    GLctx["finish"]();
}
function _emscripten_glFlush() {
    GLctx["flush"]();
}
function _emscripten_glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
    GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
}
function _emscripten_glFramebufferTexture2D(target, attachment, textarget, texture, level) {
    GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
}
function _emscripten_glFrontFace(x0) {
    GLctx["frontFace"](x0);
}
function _emscripten_glGenBuffers(n, buffers) {
    __glGenObject(n, buffers, "createBuffer", GL.buffers);
}
function _emscripten_glGenFramebuffers(n, ids) {
    __glGenObject(n, ids, "createFramebuffer", GL.framebuffers);
}
function _emscripten_glGenQueriesEXT(n, ids) {
    for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
        if (!query) {
            GL.recordError(1282);
            while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0;
            return;
        }
        var id = GL.getNewId(GL.timerQueriesEXT);
        query.name = id;
        GL.timerQueriesEXT[id] = query;
        HEAP32[(ids + i * 4) >> 2] = id;
    }
}
function _emscripten_glGenRenderbuffers(n, renderbuffers) {
    __glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
}
function _emscripten_glGenTextures(n, textures) {
    __glGenObject(n, textures, "createTexture", GL.textures);
}
function _emscripten_glGenVertexArraysOES(n, arrays) {
    __glGenObject(n, arrays, "createVertexArray", GL.vaos);
}
function _emscripten_glGenerateMipmap(x0) {
    GLctx["generateMipmap"](x0);
}
function _emscripten_glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
    program = GL.programs[program];
    var info = GLctx.getActiveAttrib(program, index);
    if (!info) return;
    if (bufSize > 0 && name) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
    if (size) HEAP32[size >> 2] = info.size;
    if (type) HEAP32[type >> 2] = info.type;
}
function _emscripten_glGetActiveUniform(program, index, bufSize, length, size, type, name) {
    program = GL.programs[program];
    var info = GLctx.getActiveUniform(program, index);
    if (!info) return;
    if (bufSize > 0 && name) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
    if (size) HEAP32[size >> 2] = info.size;
    if (type) HEAP32[type >> 2] = info.type;
}
function _emscripten_glGetAttachedShaders(program, maxCount, count, shaders) {
    var result = GLctx.getAttachedShaders(GL.programs[program]);
    var len = result.length;
    if (len > maxCount) {
        len = maxCount;
    }
    HEAP32[count >> 2] = len;
    for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        HEAP32[(shaders + i * 4) >> 2] = id;
    }
}
function _emscripten_glGetAttribLocation(program, name) {
    return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}
function _emscripten_glGetBooleanv(name_, p) {
    emscriptenWebGLGet(name_, p, "Boolean");
}
function _emscripten_glGetBufferParameteriv(target, value, data) {
    if (!data) {
        GL.recordError(1281);
        return;
    }
    HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
}
function _emscripten_glGetError() {
    var error = GLctx.getError() || GL.lastError;
    GL.lastError = 0;
    return error;
}
function _emscripten_glGetFloatv(name_, p) {
    emscriptenWebGLGet(name_, p, "Float");
}
function _emscripten_glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
    var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
    if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
        result = result.name | 0;
    }
    HEAP32[params >> 2] = result;
}
function _emscripten_glGetIntegerv(name_, p) {
    emscriptenWebGLGet(name_, p, "Integer");
}
function _emscripten_glGetProgramInfoLog(program, maxLength, length, infoLog) {
    var log = GLctx.getProgramInfoLog(GL.programs[program]);
    if (log === null) log = "(unknown error)";
    if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
}
function _emscripten_glGetProgramiv(program, pname, p) {
    if (!p) {
        GL.recordError(1281);
        return;
    }
    if (program >= GL.counter) {
        GL.recordError(1281);
        return;
    }
    var ptable = GL.programInfos[program];
    if (!ptable) {
        GL.recordError(1282);
        return;
    }
    if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = "(unknown error)";
        HEAP32[p >> 2] = log.length + 1;
    } else if (pname == 35719) {
        HEAP32[p >> 2] = ptable.maxUniformLength;
    } else if (pname == 35722) {
        if (ptable.maxAttributeLength == -1) {
            program = GL.programs[program];
            var numAttribs = GLctx.getProgramParameter(program, 35721);
            ptable.maxAttributeLength = 0;
            for (var i = 0; i < numAttribs; ++i) {
                var activeAttrib = GLctx.getActiveAttrib(program, i);
                ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length + 1);
            }
        }
        HEAP32[p >> 2] = ptable.maxAttributeLength;
    } else if (pname == 35381) {
        if (ptable.maxUniformBlockNameLength == -1) {
            program = GL.programs[program];
            var numBlocks = GLctx.getProgramParameter(program, 35382);
            ptable.maxUniformBlockNameLength = 0;
            for (var i = 0; i < numBlocks; ++i) {
                var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
                ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length + 1);
            }
        }
        HEAP32[p >> 2] = ptable.maxUniformBlockNameLength;
    } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname);
    }
}
function _emscripten_glGetQueryObjecti64vEXT(id, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    var query = GL.timerQueriesEXT[id];
    var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0;
    } else {
        ret = param;
    }
    (tempI64 = [
        ret >>> 0,
        ((tempDouble = ret), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
    ]),
        (HEAP32[params >> 2] = tempI64[0]),
        (HEAP32[(params + 4) >> 2] = tempI64[1]);
}
function _emscripten_glGetQueryObjectivEXT(id, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    var query = GL.timerQueriesEXT[id];
    var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0;
    } else {
        ret = param;
    }
    HEAP32[params >> 2] = ret;
}
function _emscripten_glGetQueryObjectui64vEXT(id, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    var query = GL.timerQueriesEXT[id];
    var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0;
    } else {
        ret = param;
    }
    (tempI64 = [
        ret >>> 0,
        ((tempDouble = ret), +Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0) : 0),
    ]),
        (HEAP32[params >> 2] = tempI64[0]),
        (HEAP32[(params + 4) >> 2] = tempI64[1]);
}
function _emscripten_glGetQueryObjectuivEXT(id, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    var query = GL.timerQueriesEXT[id];
    var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0;
    } else {
        ret = param;
    }
    HEAP32[params >> 2] = ret;
}
function _emscripten_glGetQueryivEXT(target, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
}
function _emscripten_glGetRenderbufferParameteriv(target, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
}
function _emscripten_glGetShaderInfoLog(shader, maxLength, length, infoLog) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null) log = "(unknown error)";
    if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
}
function _emscripten_glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
    var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
    HEAP32[range >> 2] = result.rangeMin;
    HEAP32[(range + 4) >> 2] = result.rangeMax;
    HEAP32[precision >> 2] = result.precision;
}
function _emscripten_glGetShaderSource(shader, bufSize, length, source) {
    var result = GLctx.getShaderSource(GL.shaders[shader]);
    if (!result) return;
    if (bufSize > 0 && source) {
        var numBytesWrittenExclNull = stringToUTF8(result, source, bufSize);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
}
function _emscripten_glGetShaderiv(shader, pname, p) {
    if (!p) {
        GL.recordError(1281);
        return;
    }
    if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = "(unknown error)";
        HEAP32[p >> 2] = log.length + 1;
    } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1;
        HEAP32[p >> 2] = sourceLength;
    } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
    }
}
function stringToNewUTF8(jsString) {
    var length = lengthBytesUTF8(jsString) + 1;
    var cString = _malloc(length);
    stringToUTF8(jsString, cString, length);
    return cString;
}
function _emscripten_glGetString(name_) {
    if (GL.stringCache[name_]) return GL.stringCache[name_];
    var ret;
    switch (name_) {
        case 7939:
            var exts = GLctx.getSupportedExtensions();
            var gl_exts = [];
            for (var i = 0; i < exts.length; ++i) {
                gl_exts.push(exts[i]);
                gl_exts.push("GL_" + exts[i]);
            }
            ret = stringToNewUTF8(gl_exts.join(" "));
            break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
            var s = GLctx.getParameter(name_);
            if (!s) {
                GL.recordError(1280);
            }
            ret = stringToNewUTF8(s);
            break;
        case 7938:
            var glVersion = GLctx.getParameter(GLctx.VERSION);
            {
                glVersion = "OpenGL ES 2.0 (" + glVersion + ")";
            }
            ret = stringToNewUTF8(glVersion);
            break;
        case 35724:
            var glslVersion = GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
                if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
                glslVersion = "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")";
            }
            ret = stringToNewUTF8(glslVersion);
            break;
        default:
            GL.recordError(1280);
            return 0;
    }
    GL.stringCache[name_] = ret;
    return ret;
}
function _emscripten_glGetTexParameterfv(target, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
}
function _emscripten_glGetTexParameteriv(target, pname, params) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
}
function _emscripten_glGetUniformLocation(program, name) {
    name = UTF8ToString(name);
    var arrayIndex = 0;
    if (name[name.length - 1] == "]") {
        var leftBrace = name.lastIndexOf("[");
        arrayIndex = name[leftBrace + 1] != "]" ? parseInt(name.slice(leftBrace + 1)) : 0;
        name = name.slice(0, leftBrace);
    }
    var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name];
    if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) {
        return uniformInfo[1] + arrayIndex;
    } else {
        return -1;
    }
}
function emscriptenWebGLGetUniform(program, location, params, type) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    var data = GLctx.getUniform(GL.programs[program], GL.uniforms[location]);
    if (typeof data == "number" || typeof data == "boolean") {
        switch (type) {
            case "Integer":
                HEAP32[params >> 2] = data;
                break;
            case "Float":
                HEAPF32[params >> 2] = data;
                break;
            default:
                throw "internal emscriptenWebGLGetUniform() error, bad type: " + type;
        }
    } else {
        for (var i = 0; i < data.length; i++) {
            switch (type) {
                case "Integer":
                    HEAP32[(params + i * 4) >> 2] = data[i];
                    break;
                case "Float":
                    HEAPF32[(params + i * 4) >> 2] = data[i];
                    break;
                default:
                    throw "internal emscriptenWebGLGetUniform() error, bad type: " + type;
            }
        }
    }
}
function _emscripten_glGetUniformfv(program, location, params) {
    emscriptenWebGLGetUniform(program, location, params, "Float");
}
function _emscripten_glGetUniformiv(program, location, params) {
    emscriptenWebGLGetUniform(program, location, params, "Integer");
}
function _emscripten_glGetVertexAttribPointerv(index, pname, pointer) {
    if (!pointer) {
        GL.recordError(1281);
        return;
    }
    if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttribPointer on client-side array: not supported, bad data returned");
    }
    HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
}
function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
    if (!params) {
        GL.recordError(1281);
        return;
    }
    if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
    }
    var data = GLctx.getVertexAttrib(index, pname);
    if (pname == 34975) {
        HEAP32[params >> 2] = data["name"];
    } else if (typeof data == "number" || typeof data == "boolean") {
        switch (type) {
            case "Integer":
                HEAP32[params >> 2] = data;
                break;
            case "Float":
                HEAPF32[params >> 2] = data;
                break;
            case "FloatToInteger":
                HEAP32[params >> 2] = Math.fround(data);
                break;
            default:
                throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type;
        }
    } else {
        for (var i = 0; i < data.length; i++) {
            switch (type) {
                case "Integer":
                    HEAP32[(params + i * 4) >> 2] = data[i];
                    break;
                case "Float":
                    HEAPF32[(params + i * 4) >> 2] = data[i];
                    break;
                case "FloatToInteger":
                    HEAP32[(params + i * 4) >> 2] = Math.fround(data[i]);
                    break;
                default:
                    throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + type;
            }
        }
    }
}
function _emscripten_glGetVertexAttribfv(index, pname, params) {
    emscriptenWebGLGetVertexAttrib(index, pname, params, "Float");
}
function _emscripten_glGetVertexAttribiv(index, pname, params) {
    emscriptenWebGLGetVertexAttrib(index, pname, params, "FloatToInteger");
}
function _emscripten_glHint(x0, x1) {
    GLctx["hint"](x0, x1);
}
function _emscripten_glIsBuffer(buffer) {
    var b = GL.buffers[buffer];
    if (!b) return 0;
    return GLctx.isBuffer(b);
}
function _emscripten_glIsEnabled(x0) {
    return GLctx["isEnabled"](x0);
}
function _emscripten_glIsFramebuffer(framebuffer) {
    var fb = GL.framebuffers[framebuffer];
    if (!fb) return 0;
    return GLctx.isFramebuffer(fb);
}
function _emscripten_glIsProgram(program) {
    program = GL.programs[program];
    if (!program) return 0;
    return GLctx.isProgram(program);
}
function _emscripten_glIsQueryEXT(id) {
    var query = GL.timerQueriesEXT[id];
    if (!query) return 0;
    return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
}
function _emscripten_glIsRenderbuffer(renderbuffer) {
    var rb = GL.renderbuffers[renderbuffer];
    if (!rb) return 0;
    return GLctx.isRenderbuffer(rb);
}
function _emscripten_glIsShader(shader) {
    var s = GL.shaders[shader];
    if (!s) return 0;
    return GLctx.isShader(s);
}
function _emscripten_glIsTexture(id) {
    var texture = GL.textures[id];
    if (!texture) return 0;
    return GLctx.isTexture(texture);
}
function _emscripten_glIsVertexArrayOES(array) {
    var vao = GL.vaos[array];
    if (!vao) return 0;
    return GLctx["isVertexArray"](vao);
}
function _emscripten_glLineWidth(x0) {
    GLctx["lineWidth"](x0);
}
function _emscripten_glLinkProgram(program) {
    GLctx.linkProgram(GL.programs[program]);
    GL.populateUniformTable(program);
}
function _emscripten_glPixelStorei(pname, param) {
    if (pname == 3317) {
        GL.unpackAlignment = param;
    }
    GLctx.pixelStorei(pname, param);
}
function _emscripten_glPolygonOffset(x0, x1) {
    GLctx["polygonOffset"](x0, x1);
}
function _emscripten_glQueryCounterEXT(id, target) {
    GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.timerQueriesEXT[id], target);
}
function __computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
    function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
    }
    var plainRowSize = width * sizePerPixel;
    var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
    return height * alignedRowSize;
}
var __colorChannelsInGlTextureFormat = { 6402: 1, 6406: 1, 6407: 3, 6408: 4, 6409: 1, 6410: 2, 35904: 3, 35906: 4 };
var __sizeOfGlTextureElementType = { 5121: 1, 5123: 2, 5125: 4, 5126: 4, 32819: 2, 32820: 2, 33635: 2, 34042: 4, 36193: 2 };
function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
    var sizePerPixel = __colorChannelsInGlTextureFormat[format] * __sizeOfGlTextureElementType[type];
    if (!sizePerPixel) {
        GL.recordError(1280);
        return;
    }
    var bytes = __computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
    var end = pixels + bytes;
    switch (type) {
        case 5121:
            return HEAPU8.subarray(pixels, end);
        case 5126:
            return HEAPF32.subarray(pixels >> 2, end >> 2);
        case 5125:
        case 34042:
            return HEAPU32.subarray(pixels >> 2, end >> 2);
        case 5123:
        case 33635:
        case 32819:
        case 32820:
        case 36193:
            return HEAPU16.subarray(pixels >> 1, end >> 1);
        default:
            GL.recordError(1280);
    }
}
function _emscripten_glReadPixels(x, y, width, height, format, type, pixels) {
    var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
    if (!pixelData) {
        GL.recordError(1280);
        return;
    }
    GLctx.readPixels(x, y, width, height, format, type, pixelData);
}
function _emscripten_glReleaseShaderCompiler() {}
function _emscripten_glRenderbufferStorage(x0, x1, x2, x3) {
    GLctx["renderbufferStorage"](x0, x1, x2, x3);
}
function _emscripten_glSampleCoverage(value, invert) {
    GLctx.sampleCoverage(value, !!invert);
}
function _emscripten_glScissor(x0, x1, x2, x3) {
    GLctx["scissor"](x0, x1, x2, x3);
}
function _emscripten_glShaderBinary() {
    GL.recordError(1280);
}
function _emscripten_glShaderSource(shader, count, string, length) {
    var source = GL.getSource(shader, count, string, length);
    GLctx.shaderSource(GL.shaders[shader], source);
}
function _emscripten_glStencilFunc(x0, x1, x2) {
    GLctx["stencilFunc"](x0, x1, x2);
}
function _emscripten_glStencilFuncSeparate(x0, x1, x2, x3) {
    GLctx["stencilFuncSeparate"](x0, x1, x2, x3);
}
function _emscripten_glStencilMask(x0) {
    GLctx["stencilMask"](x0);
}
function _emscripten_glStencilMaskSeparate(x0, x1) {
    GLctx["stencilMaskSeparate"](x0, x1);
}
function _emscripten_glStencilOp(x0, x1, x2) {
    GLctx["stencilOp"](x0, x1, x2);
}
function _emscripten_glStencilOpSeparate(x0, x1, x2, x3) {
    GLctx["stencilOpSeparate"](x0, x1, x2, x3);
}
function _emscripten_glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
}
function _emscripten_glTexParameterf(x0, x1, x2) {
    GLctx["texParameterf"](x0, x1, x2);
}
function _emscripten_glTexParameterfv(target, pname, params) {
    var param = HEAPF32[params >> 2];
    GLctx.texParameterf(target, pname, param);
}
function _emscripten_glTexParameteri(x0, x1, x2) {
    GLctx["texParameteri"](x0, x1, x2);
}
function _emscripten_glTexParameteriv(target, pname, params) {
    var param = HEAP32[params >> 2];
    GLctx.texParameteri(target, pname, param);
}
function _emscripten_glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
    var pixelData = null;
    if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
}
function _emscripten_glUniform1f(location, v0) {
    GLctx.uniform1f(GL.uniforms[location], v0);
}
function _emscripten_glUniform1fv(location, count, value) {
    if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[count - 1];
        for (var i = 0; i < count; ++i) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2);
    }
    GLctx.uniform1fv(GL.uniforms[location], view);
}
function _emscripten_glUniform1i(location, v0) {
    GLctx.uniform1i(GL.uniforms[location], v0);
}
function _emscripten_glUniform1iv(location, count, value) {
    GLctx.uniform1iv(GL.uniforms[location], HEAP32.subarray(value >> 2, (value + count * 4) >> 2));
}
function _emscripten_glUniform2f(location, v0, v1) {
    GLctx.uniform2f(GL.uniforms[location], v0, v1);
}
function _emscripten_glUniform2fv(location, count, value) {
    if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[2 * count - 1];
        for (var i = 0; i < 2 * count; i += 2) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2);
    }
    GLctx.uniform2fv(GL.uniforms[location], view);
}
function _emscripten_glUniform2i(location, v0, v1) {
    GLctx.uniform2i(GL.uniforms[location], v0, v1);
}
function _emscripten_glUniform2iv(location, count, value) {
    GLctx.uniform2iv(GL.uniforms[location], HEAP32.subarray(value >> 2, (value + count * 8) >> 2));
}
function _emscripten_glUniform3f(location, v0, v1, v2) {
    GLctx.uniform3f(GL.uniforms[location], v0, v1, v2);
}
function _emscripten_glUniform3fv(location, count, value) {
    if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[3 * count - 1];
        for (var i = 0; i < 3 * count; i += 3) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2);
    }
    GLctx.uniform3fv(GL.uniforms[location], view);
}
function _emscripten_glUniform3i(location, v0, v1, v2) {
    GLctx.uniform3i(GL.uniforms[location], v0, v1, v2);
}
function _emscripten_glUniform3iv(location, count, value) {
    GLctx.uniform3iv(GL.uniforms[location], HEAP32.subarray(value >> 2, (value + count * 12) >> 2));
}
function _emscripten_glUniform4f(location, v0, v1, v2, v3) {
    GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3);
}
function _emscripten_glUniform4fv(location, count, value) {
    if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[4 * count - 1];
        for (var i = 0; i < 4 * count; i += 4) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
    }
    GLctx.uniform4fv(GL.uniforms[location], view);
}
function _emscripten_glUniform4i(location, v0, v1, v2, v3) {
    GLctx.uniform4i(GL.uniforms[location], v0, v1, v2, v3);
}
function _emscripten_glUniform4iv(location, count, value) {
    GLctx.uniform4iv(GL.uniforms[location], HEAP32.subarray(value >> 2, (value + count * 16) >> 2));
}
function _emscripten_glUniformMatrix2fv(location, count, transpose, value) {
    if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[4 * count - 1];
        for (var i = 0; i < 4 * count; i += 4) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
    }
    GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, view);
}
function _emscripten_glUniformMatrix3fv(location, count, transpose, value) {
    if (9 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[9 * count - 1];
        for (var i = 0; i < 9 * count; i += 9) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
            view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2];
            view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2];
            view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2];
            view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2];
            view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2);
    }
    GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, view);
}
function _emscripten_glUniformMatrix4fv(location, count, transpose, value) {
    if (16 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[16 * count - 1];
        for (var i = 0; i < 16 * count; i += 16) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
            view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2];
            view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2];
            view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2];
            view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2];
            view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2];
            view[i + 9] = HEAPF32[(value + (4 * i + 36)) >> 2];
            view[i + 10] = HEAPF32[(value + (4 * i + 40)) >> 2];
            view[i + 11] = HEAPF32[(value + (4 * i + 44)) >> 2];
            view[i + 12] = HEAPF32[(value + (4 * i + 48)) >> 2];
            view[i + 13] = HEAPF32[(value + (4 * i + 52)) >> 2];
            view[i + 14] = HEAPF32[(value + (4 * i + 56)) >> 2];
            view[i + 15] = HEAPF32[(value + (4 * i + 60)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2);
    }
    GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view);
}
function _emscripten_glUseProgram(program) {
    GLctx.useProgram(GL.programs[program]);
}
function _emscripten_glValidateProgram(program) {
    GLctx.validateProgram(GL.programs[program]);
}
function _emscripten_glVertexAttrib1f(x0, x1) {
    GLctx["vertexAttrib1f"](x0, x1);
}
function _emscripten_glVertexAttrib1fv(index, v) {
    GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
}
function _emscripten_glVertexAttrib2f(x0, x1, x2) {
    GLctx["vertexAttrib2f"](x0, x1, x2);
}
function _emscripten_glVertexAttrib2fv(index, v) {
    GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2]);
}
function _emscripten_glVertexAttrib3f(x0, x1, x2, x3) {
    GLctx["vertexAttrib3f"](x0, x1, x2, x3);
}
function _emscripten_glVertexAttrib3fv(index, v) {
    GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2]);
}
function _emscripten_glVertexAttrib4f(x0, x1, x2, x3, x4) {
    GLctx["vertexAttrib4f"](x0, x1, x2, x3, x4);
}
function _emscripten_glVertexAttrib4fv(index, v) {
    GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2], HEAPF32[(v + 12) >> 2]);
}
function _emscripten_glVertexAttribDivisorANGLE(index, divisor) {
    GLctx["vertexAttribDivisor"](index, divisor);
}
function _emscripten_glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
    var cb = GL.currentContext.clientBuffers[index];
    if (!GL.currArrayBuffer) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function (index, size, type, normalized, stride, ptr) {
            this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
    }
    cb.clientside = false;
    GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}
function _emscripten_glViewport(x0, x1, x2, x3) {
    GLctx["viewport"](x0, x1, x2, x3);
}
function _longjmp(env, value) {
    _setThrew(env, value || 1);
    throw "longjmp";
}
function _emscripten_longjmp(env, value) {
    _longjmp(env, value);
}
function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
    if (!target) target = "#canvas";
    target = __findEventTarget(target);
    if (!target) return -4;
    if (!target.requestPointerLock && !target.mozRequestPointerLock && !target.webkitRequestPointerLock && !target.msRequestPointerLock) {
        return -1;
    }
    var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
    if (!canPerformRequests) {
        if (deferUntilInEventHandler) {
            JSEvents.deferCall(__requestPointerLock, 2, [target]);
            return 1;
        } else {
            return -2;
        }
    }
    return __requestPointerLock(target);
}
function _emscripten_sample_gamepad_data() {
    return (JSEvents.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1;
}
function _emscripten_set_canvas_element_size(target, width, height) {
    var canvas = __findCanvasEventTarget(target);
    if (!canvas) return -4;
    canvas.width = width;
    canvas.height = height;
    return 0;
}
function _emscripten_set_element_css_size(target, width, height) {
    target = target ? __findEventTarget(target) : Module["canvas"];
    if (!target) return -4;
    target.style.width = width + "px";
    target.style.height = height + "px";
    return 0;
}
function __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
    if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc(280);
    var fullscreenChangeEventhandlerFunc = function (event) {
        var e = event || window.event;
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
        __fillFullscreenChangeEventData(fullscreenChangeEvent, e);
        if (dynCall_iiii(callbackfunc, eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
    };
    var eventHandler = { target: target, allowsDeferredCalls: false, eventTypeString: eventTypeString, callbackfunc: callbackfunc, handlerFunc: fullscreenChangeEventhandlerFunc, useCapture: useCapture };
    JSEvents.registerOrRemoveHandler(eventHandler);
}
function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (!JSEvents.fullscreenEnabled()) return -1;
    target = target ? __findEventTarget(target) : __specialEventTargets[1];
    if (!target) return -4;
    __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
    __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "mozfullscreenchange", targetThread);
    __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
    __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "msfullscreenchange", targetThread);
    return 0;
}
function __registerGamepadEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
    if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc(1432);
    var gamepadEventHandlerFunc = function (event) {
        var e = event || window.event;
        var gamepadEvent = JSEvents.gamepadEvent;
        __fillGamepadEventData(gamepadEvent, e.gamepad);
        if (dynCall_iiii(callbackfunc, eventTypeId, gamepadEvent, userData)) e.preventDefault();
    };
    var eventHandler = { target: __findEventTarget(target), allowsDeferredCalls: true, eventTypeString: eventTypeString, callbackfunc: callbackfunc, handlerFunc: gamepadEventHandlerFunc, useCapture: useCapture };
    JSEvents.registerOrRemoveHandler(eventHandler);
}
function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
    __registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
    return 0;
}
function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
    __registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
    return 0;
}
function __registerKeyEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
    if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(164);
    var keyEventHandlerFunc = function (event) {
        var e = event || window.event;
        var keyEventData = JSEvents.keyEvent;
        stringToUTF8(e.key ? e.key : "", keyEventData + 0, 32);
        stringToUTF8(e.code ? e.code : "", keyEventData + 32, 32);
        HEAP32[(keyEventData + 64) >> 2] = e.location;
        HEAP32[(keyEventData + 68) >> 2] = e.ctrlKey;
        HEAP32[(keyEventData + 72) >> 2] = e.shiftKey;
        HEAP32[(keyEventData + 76) >> 2] = e.altKey;
        HEAP32[(keyEventData + 80) >> 2] = e.metaKey;
        HEAP32[(keyEventData + 84) >> 2] = e.repeat;
        stringToUTF8(e.locale ? e.locale : "", keyEventData + 88, 32);
        stringToUTF8(e.char ? e.char : "", keyEventData + 120, 32);
        HEAP32[(keyEventData + 152) >> 2] = e.charCode;
        HEAP32[(keyEventData + 156) >> 2] = e.keyCode;
        HEAP32[(keyEventData + 160) >> 2] = e.which;
        if (dynCall_iiii(callbackfunc, eventTypeId, keyEventData, userData)) e.preventDefault();
    };
    var eventHandler = {
        target: __findEventTarget(target),
        allowsDeferredCalls: JSEvents.isInternetExplorer() ? false : true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture: useCapture,
    };
    JSEvents.registerOrRemoveHandler(eventHandler);
}
function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
    return 0;
}
function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
    return 0;
}
function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
    return 0;
}
function __fillMouseEventData(eventStruct, e, target) {
    HEAPF64[eventStruct >> 3] = JSEvents.tick();
    HEAP32[(eventStruct + 8) >> 2] = e.screenX;
    HEAP32[(eventStruct + 12) >> 2] = e.screenY;
    HEAP32[(eventStruct + 16) >> 2] = e.clientX;
    HEAP32[(eventStruct + 20) >> 2] = e.clientY;
    HEAP32[(eventStruct + 24) >> 2] = e.ctrlKey;
    HEAP32[(eventStruct + 28) >> 2] = e.shiftKey;
    HEAP32[(eventStruct + 32) >> 2] = e.altKey;
    HEAP32[(eventStruct + 36) >> 2] = e.metaKey;
    HEAP16[(eventStruct + 40) >> 1] = e.button;
    HEAP16[(eventStruct + 42) >> 1] = e.buttons;
    HEAP32[(eventStruct + 44) >> 2] = e["movementX"] || e["mozMovementX"] || e["webkitMovementX"] || e.screenX - JSEvents.previousScreenX;
    HEAP32[(eventStruct + 48) >> 2] = e["movementY"] || e["mozMovementY"] || e["webkitMovementY"] || e.screenY - JSEvents.previousScreenY;
    if (Module["canvas"]) {
        var rect = Module["canvas"].getBoundingClientRect();
        HEAP32[(eventStruct + 60) >> 2] = e.clientX - rect.left;
        HEAP32[(eventStruct + 64) >> 2] = e.clientY - rect.top;
    } else {
        HEAP32[(eventStruct + 60) >> 2] = 0;
        HEAP32[(eventStruct + 64) >> 2] = 0;
    }
    if (target) {
        var rect = JSEvents.getBoundingClientRectOrZeros(target);
        HEAP32[(eventStruct + 52) >> 2] = e.clientX - rect.left;
        HEAP32[(eventStruct + 56) >> 2] = e.clientY - rect.top;
    } else {
        HEAP32[(eventStruct + 52) >> 2] = 0;
        HEAP32[(eventStruct + 56) >> 2] = 0;
    }
    if (e.type !== "wheel" && e.type !== "mousewheel") {
        JSEvents.previousScreenX = e.screenX;
        JSEvents.previousScreenY = e.screenY;
    }
}
function __registerMouseEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
    if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(72);
    target = __findEventTarget(target);
    var mouseEventHandlerFunc = function (event) {
        var e = event || window.event;
        __fillMouseEventData(JSEvents.mouseEvent, e, target);
        if (dynCall_iiii(callbackfunc, eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
    };
    var eventHandler = {
        target: target,
        allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture: useCapture,
    };
    if (JSEvents.isInternetExplorer() && eventTypeString == "mousedown") eventHandler.allowsDeferredCalls = false;
    JSEvents.registerOrRemoveHandler(eventHandler);
}
function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
    return 0;
}
function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
    return 0;
}
function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
    return 0;
}
function __registerWheelEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
    if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104);
    var wheelHandlerFunc = function (event) {
        var e = event || window.event;
        var wheelEvent = JSEvents.wheelEvent;
        __fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(wheelEvent + 72) >> 3] = e["deltaX"];
        HEAPF64[(wheelEvent + 80) >> 3] = e["deltaY"];
        HEAPF64[(wheelEvent + 88) >> 3] = e["deltaZ"];
        HEAP32[(wheelEvent + 96) >> 2] = e["deltaMode"];
        if (dynCall_iiii(callbackfunc, eventTypeId, wheelEvent, userData)) e.preventDefault();
    };
    var mouseWheelHandlerFunc = function (event) {
        var e = event || window.event;
        __fillMouseEventData(JSEvents.wheelEvent, e, target);
        HEAPF64[(JSEvents.wheelEvent + 72) >> 3] = e["wheelDeltaX"] || 0;
        HEAPF64[(JSEvents.wheelEvent + 80) >> 3] = -(e["wheelDeltaY"] ? e["wheelDeltaY"] : e["wheelDelta"]);
        HEAPF64[(JSEvents.wheelEvent + 88) >> 3] = 0;
        HEAP32[(JSEvents.wheelEvent + 96) >> 2] = 0;
        var shouldCancel = dynCall_iiii(callbackfunc, eventTypeId, JSEvents.wheelEvent, userData);
        if (shouldCancel) {
            e.preventDefault();
        }
    };
    var eventHandler = { target: target, allowsDeferredCalls: true, eventTypeString: eventTypeString, callbackfunc: callbackfunc, handlerFunc: eventTypeString == "wheel" ? wheelHandlerFunc : mouseWheelHandlerFunc, useCapture: useCapture };
    JSEvents.registerOrRemoveHandler(eventHandler);
}
function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    target = __findEventTarget(target);
    if (typeof target.onwheel !== "undefined") {
        __registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
        return 0;
    } else if (typeof target.onmousewheel !== "undefined") {
        __registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "mousewheel", targetThread);
        return 0;
    } else {
        return -1;
    }
}
function _exit(status) {
    exit(status);
}
function _getenv(name) {
    if (name === 0) return 0;
    name = UTF8ToString(name);
    if (!ENV.hasOwnProperty(name)) return 0;
    if (_getenv.ret) _free(_getenv.ret);
    _getenv.ret = allocateUTF8(ENV[name]);
    return _getenv.ret;
}
function _glActiveTexture(x0) {
    GLctx["activeTexture"](x0);
}
function _glAttachShader(program, shader) {
    GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
}
function _glBindBuffer(target, buffer) {
    if (target == GLctx.ARRAY_BUFFER) {
        GL.currArrayBuffer = buffer;
    } else if (target == GLctx.ELEMENT_ARRAY_BUFFER) {
        GL.currElementArrayBuffer = buffer;
    }
    GLctx.bindBuffer(target, GL.buffers[buffer]);
}
function _glBindFramebuffer(target, framebuffer) {
    GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
}
function _glBindRenderbuffer(target, renderbuffer) {
    GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
}
function _glBlendEquation(x0) {
    GLctx["blendEquation"](x0);
}
function _glBlendFunc(x0, x1) {
    GLctx["blendFunc"](x0, x1);
}
function _glBufferData(target, size, data, usage) {
    GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
}
function _glCheckFramebufferStatus(x0) {
    return GLctx["checkFramebufferStatus"](x0);
}
function _glClear(x0) {
    GLctx["clear"](x0);
}
function _glClearColor(x0, x1, x2, x3) {
    GLctx["clearColor"](x0, x1, x2, x3);
}
function _glCompileShader(shader) {
    GLctx.compileShader(GL.shaders[shader]);
}
function _glCreateProgram() {
    var id = GL.getNewId(GL.programs);
    var program = GLctx.createProgram();
    program.name = id;
    GL.programs[id] = program;
    return id;
}
function _glCreateShader(shaderType) {
    var id = GL.getNewId(GL.shaders);
    GL.shaders[id] = GLctx.createShader(shaderType);
    return id;
}
function _glDeleteBuffers(n, buffers) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2];
        var buffer = GL.buffers[id];
        if (!buffer) continue;
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0;
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0;
    }
}
function _glDeleteFramebuffers(n, framebuffers) {
    for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue;
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
    }
}
function _glDeleteProgram(id) {
    if (!id) return;
    var program = GL.programs[id];
    if (!program) {
        GL.recordError(1281);
        return;
    }
    GLctx.deleteProgram(program);
    program.name = 0;
    GL.programs[id] = null;
    GL.programInfos[id] = null;
}
function _glDeleteRenderbuffers(n, renderbuffers) {
    for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue;
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
    }
}
function _glDeleteShader(id) {
    if (!id) return;
    var shader = GL.shaders[id];
    if (!shader) {
        GL.recordError(1281);
        return;
    }
    GLctx.deleteShader(shader);
    GL.shaders[id] = null;
}
function _glDisable(x0) {
    GLctx["disable"](x0);
}
function _glDisableVertexAttribArray(index) {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = false;
    GLctx.disableVertexAttribArray(index);
}
function _glDrawArrays(mode, first, count) {
    GL.preDrawHandleClientVertexAttribBindings(first + count);
    GLctx.drawArrays(mode, first, count);
    GL.postDrawHandleClientVertexAttribBindings();
}
function _glEnable(x0) {
    GLctx["enable"](x0);
}
function _glEnableVertexAttribArray(index) {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = true;
    GLctx.enableVertexAttribArray(index);
}
function _glFinish() {
    GLctx["finish"]();
}
function _glFlush() {
    GLctx["flush"]();
}
function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
    GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
}
function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
    GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
}
function _glGenBuffers(n, buffers) {
    __glGenObject(n, buffers, "createBuffer", GL.buffers);
}
function _glGenFramebuffers(n, ids) {
    __glGenObject(n, ids, "createFramebuffer", GL.framebuffers);
}
function _glGenRenderbuffers(n, renderbuffers) {
    __glGenObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
}
function _glGenerateMipmap(x0) {
    GLctx["generateMipmap"](x0);
}
function _glGetAttribLocation(program, name) {
    return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
}
function _glGetError() {
    var error = GLctx.getError() || GL.lastError;
    GL.lastError = 0;
    return error;
}
function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
    var log = GLctx.getProgramInfoLog(GL.programs[program]);
    if (log === null) log = "(unknown error)";
    if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
}
function _glGetProgramiv(program, pname, p) {
    if (!p) {
        GL.recordError(1281);
        return;
    }
    if (program >= GL.counter) {
        GL.recordError(1281);
        return;
    }
    var ptable = GL.programInfos[program];
    if (!ptable) {
        GL.recordError(1282);
        return;
    }
    if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = "(unknown error)";
        HEAP32[p >> 2] = log.length + 1;
    } else if (pname == 35719) {
        HEAP32[p >> 2] = ptable.maxUniformLength;
    } else if (pname == 35722) {
        if (ptable.maxAttributeLength == -1) {
            program = GL.programs[program];
            var numAttribs = GLctx.getProgramParameter(program, 35721);
            ptable.maxAttributeLength = 0;
            for (var i = 0; i < numAttribs; ++i) {
                var activeAttrib = GLctx.getActiveAttrib(program, i);
                ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length + 1);
            }
        }
        HEAP32[p >> 2] = ptable.maxAttributeLength;
    } else if (pname == 35381) {
        if (ptable.maxUniformBlockNameLength == -1) {
            program = GL.programs[program];
            var numBlocks = GLctx.getProgramParameter(program, 35382);
            ptable.maxUniformBlockNameLength = 0;
            for (var i = 0; i < numBlocks; ++i) {
                var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
                ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length + 1);
            }
        }
        HEAP32[p >> 2] = ptable.maxUniformBlockNameLength;
    } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(GL.programs[program], pname);
    }
}
function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null) log = "(unknown error)";
    if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    } else {
        if (length) HEAP32[length >> 2] = 0;
    }
}
function _glGetShaderiv(shader, pname, p) {
    if (!p) {
        GL.recordError(1281);
        return;
    }
    if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = "(unknown error)";
        HEAP32[p >> 2] = log.length + 1;
    } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = source === null || source.length == 0 ? 0 : source.length + 1;
        HEAP32[p >> 2] = sourceLength;
    } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
    }
}
function _glGetString(name_) {
    if (GL.stringCache[name_]) return GL.stringCache[name_];
    var ret;
    switch (name_) {
        case 7939:
            var exts = GLctx.getSupportedExtensions();
            var gl_exts = [];
            for (var i = 0; i < exts.length; ++i) {
                gl_exts.push(exts[i]);
                gl_exts.push("GL_" + exts[i]);
            }
            ret = stringToNewUTF8(gl_exts.join(" "));
            break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
            var s = GLctx.getParameter(name_);
            if (!s) {
                GL.recordError(1280);
            }
            ret = stringToNewUTF8(s);
            break;
        case 7938:
            var glVersion = GLctx.getParameter(GLctx.VERSION);
            {
                glVersion = "OpenGL ES 2.0 (" + glVersion + ")";
            }
            ret = stringToNewUTF8(glVersion);
            break;
        case 35724:
            var glslVersion = GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
                if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
                glslVersion = "OpenGL ES GLSL ES " + ver_num[1] + " (" + glslVersion + ")";
            }
            ret = stringToNewUTF8(glslVersion);
            break;
        default:
            GL.recordError(1280);
            return 0;
    }
    GL.stringCache[name_] = ret;
    return ret;
}
function _glGetUniformLocation(program, name) {
    name = UTF8ToString(name);
    var arrayIndex = 0;
    if (name[name.length - 1] == "]") {
        var leftBrace = name.lastIndexOf("[");
        arrayIndex = name[leftBrace + 1] != "]" ? parseInt(name.slice(leftBrace + 1)) : 0;
        name = name.slice(0, leftBrace);
    }
    var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name];
    if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) {
        return uniformInfo[1] + arrayIndex;
    } else {
        return -1;
    }
}
function _glIsProgram(program) {
    program = GL.programs[program];
    if (!program) return 0;
    return GLctx.isProgram(program);
}
function _glLinkProgram(program) {
    GLctx.linkProgram(GL.programs[program]);
    GL.populateUniformTable(program);
}
function _glPixelStorei(pname, param) {
    if (pname == 3317) {
        GL.unpackAlignment = param;
    }
    GLctx.pixelStorei(pname, param);
}
function _glReadPixels(x, y, width, height, format, type, pixels) {
    var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
    if (!pixelData) {
        GL.recordError(1280);
        return;
    }
    GLctx.readPixels(x, y, width, height, format, type, pixelData);
}
function _glRenderbufferStorage(x0, x1, x2, x3) {
    GLctx["renderbufferStorage"](x0, x1, x2, x3);
}
function _glScissor(x0, x1, x2, x3) {
    GLctx["scissor"](x0, x1, x2, x3);
}
function _glShaderSource(shader, count, string, length) {
    var source = GL.getSource(shader, count, string, length);
    GLctx.shaderSource(GL.shaders[shader], source);
}
function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
}
function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
    var pixelData = null;
    if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
}
function _glUniform1f(location, v0) {
    GLctx.uniform1f(GL.uniforms[location], v0);
}
function _glUniform1fv(location, count, value) {
    if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[count - 1];
        for (var i = 0; i < count; ++i) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2);
    }
    GLctx.uniform1fv(GL.uniforms[location], view);
}
function _glUniform1i(location, v0) {
    GLctx.uniform1i(GL.uniforms[location], v0);
}
function _glUniform2f(location, v0, v1) {
    GLctx.uniform2f(GL.uniforms[location], v0, v1);
}
function _glUniform2fv(location, count, value) {
    if (2 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[2 * count - 1];
        for (var i = 0; i < 2 * count; i += 2) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2);
    }
    GLctx.uniform2fv(GL.uniforms[location], view);
}
function _glUniform3f(location, v0, v1, v2) {
    GLctx.uniform3f(GL.uniforms[location], v0, v1, v2);
}
function _glUniform3fv(location, count, value) {
    if (3 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[3 * count - 1];
        for (var i = 0; i < 3 * count; i += 3) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2);
    }
    GLctx.uniform3fv(GL.uniforms[location], view);
}
function _glUniform4f(location, v0, v1, v2, v3) {
    GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3);
}
function _glUniform4fv(location, count, value) {
    if (4 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[4 * count - 1];
        for (var i = 0; i < 4 * count; i += 4) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
    }
    GLctx.uniform4fv(GL.uniforms[location], view);
}
function _glUniformMatrix4fv(location, count, transpose, value) {
    if (16 * count <= GL.MINI_TEMP_BUFFER_SIZE) {
        var view = GL.miniTempBufferViews[16 * count - 1];
        for (var i = 0; i < 16 * count; i += 16) {
            view[i] = HEAPF32[(value + 4 * i) >> 2];
            view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
            view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
            view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
            view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2];
            view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2];
            view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2];
            view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2];
            view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2];
            view[i + 9] = HEAPF32[(value + (4 * i + 36)) >> 2];
            view[i + 10] = HEAPF32[(value + (4 * i + 40)) >> 2];
            view[i + 11] = HEAPF32[(value + (4 * i + 44)) >> 2];
            view[i + 12] = HEAPF32[(value + (4 * i + 48)) >> 2];
            view[i + 13] = HEAPF32[(value + (4 * i + 52)) >> 2];
            view[i + 14] = HEAPF32[(value + (4 * i + 56)) >> 2];
            view[i + 15] = HEAPF32[(value + (4 * i + 60)) >> 2];
        }
    } else {
        var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2);
    }
    GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view);
}
function _glUseProgram(program) {
    GLctx.useProgram(GL.programs[program]);
}
function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
    var cb = GL.currentContext.clientBuffers[index];
    if (!GL.currArrayBuffer) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function (index, size, type, normalized, stride, ptr) {
            this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
    }
    cb.clientside = false;
    GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
}
function _glViewport(x0, x1, x2, x3) {
    GLctx["viewport"](x0, x1, x2, x3);
}
function _llvm_bswap_i64(l, h) {
    var retl = _llvm_bswap_i32(h) >>> 0;
    var reth = _llvm_bswap_i32(l) >>> 0;
    return (setTempRet0(reth), retl) | 0;
}
function _llvm_exp2_f32(x) {
    return Math.pow(2, x);
}
function _llvm_exp2_f64(a0) {
    return _llvm_exp2_f32(a0);
}
function _llvm_trap() {
    abort("trap!");
}
var ___tm_current = 15219488;
var ___tm_timezone = (stringToUTF8("GMT", 15219536, 4), 15219536);
function _tzset() {
    if (_tzset.called) return;
    _tzset.called = true;
    HEAP32[__get_timezone() >> 2] = new Date().getTimezoneOffset() * 60;
    var winter = new Date(2e3, 0, 1);
    var summer = new Date(2e3, 6, 1);
    HEAP32[__get_daylight() >> 2] = Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());
    function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
    }
    var winterName = extractZone(winter);
    var summerName = extractZone(summer);
    var winterNamePtr = allocate(intArrayFromString(winterName), "i8", ALLOC_NORMAL);
    var summerNamePtr = allocate(intArrayFromString(summerName), "i8", ALLOC_NORMAL);
    if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
        HEAP32[__get_tzname() >> 2] = winterNamePtr;
        HEAP32[(__get_tzname() + 4) >> 2] = summerNamePtr;
    } else {
        HEAP32[__get_tzname() >> 2] = summerNamePtr;
        HEAP32[(__get_tzname() + 4) >> 2] = winterNamePtr;
    }
}
function _localtime_r(time, tmPtr) {
    _tzset();
    var date = new Date(HEAP32[time >> 2] * 1e3);
    HEAP32[tmPtr >> 2] = date.getSeconds();
    HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
    HEAP32[(tmPtr + 8) >> 2] = date.getHours();
    HEAP32[(tmPtr + 12) >> 2] = date.getDate();
    HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
    HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
    HEAP32[(tmPtr + 24) >> 2] = date.getDay();
    var start = new Date(date.getFullYear(), 0, 1);
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
    HEAP32[(tmPtr + 28) >> 2] = yday;
    HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
    var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
    HEAP32[(tmPtr + 32) >> 2] = dst;
    var zonePtr = HEAP32[(__get_tzname() + (dst ? 4 : 0)) >> 2];
    HEAP32[(tmPtr + 40) >> 2] = zonePtr;
    return tmPtr;
}
function _localtime(time) {
    return _localtime_r(time, ___tm_current);
}
function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
}
function _mktime(tmPtr) {
    _tzset();
    var date = new Date(HEAP32[(tmPtr + 20) >> 2] + 1900, HEAP32[(tmPtr + 16) >> 2], HEAP32[(tmPtr + 12) >> 2], HEAP32[(tmPtr + 8) >> 2], HEAP32[(tmPtr + 4) >> 2], HEAP32[tmPtr >> 2], 0);
    var dst = HEAP32[(tmPtr + 32) >> 2];
    var guessedOffset = date.getTimezoneOffset();
    var start = new Date(date.getFullYear(), 0, 1);
    var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dstOffset = Math.min(winterOffset, summerOffset);
    if (dst < 0) {
        HEAP32[(tmPtr + 32) >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
    } else if (dst > 0 != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
    }
    HEAP32[(tmPtr + 24) >> 2] = date.getDay();
    var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0;
    HEAP32[(tmPtr + 28) >> 2] = yday;
    return (date.getTime() / 1e3) | 0;
}
function _nanosleep(rqtp, rmtp) {
    if (rqtp === 0) {
        ___setErrNo(22);
        return -1;
    }
    var seconds = HEAP32[rqtp >> 2];
    var nanoseconds = HEAP32[(rqtp + 4) >> 2];
    if (nanoseconds < 0 || nanoseconds > 999999999 || seconds < 0) {
        ___setErrNo(22);
        return -1;
    }
    if (rmtp !== 0) {
        HEAP32[rmtp >> 2] = 0;
        HEAP32[(rmtp + 4) >> 2] = 0;
    }
    return _usleep(seconds * 1e6 + nanoseconds / 1e3);
}
function abortOnCannotGrowMemory(requestedSize) {
    abort("OOM");
}
function emscripten_realloc_buffer(size) {
    var PAGE_MULTIPLE = 65536;
    size = alignUp(size, PAGE_MULTIPLE);
    var oldSize = buffer.byteLength;
    try {
        var result = wasmMemory.grow((size - oldSize) / 65536);
        if (result !== (-1 | 0)) {
            buffer = wasmMemory.buffer;
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
function _emscripten_resize_heap(requestedSize) {
    var oldSize = _emscripten_get_heap_size();
    var PAGE_MULTIPLE = 65536;
    var LIMIT = 2147483648 - PAGE_MULTIPLE;
    if (requestedSize > LIMIT) {
        return false;
    }
    var MIN_TOTAL_MEMORY = 16777216;
    var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
    while (newSize < requestedSize) {
        if (newSize <= 536870912) {
            newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
        } else {
            newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
        }
    }
    if (!emscripten_realloc_buffer(newSize)) {
        return false;
    }
    updateGlobalBufferViews();
    return true;
}
function __isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function __arraySum(array, index) {
    var sum = 0;
    for (var i = 0; i <= index; sum += array[i++]);
    return sum;
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function __addDays(date, days) {
    var newDate = new Date(date.getTime());
    while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth - newDate.getDate()) {
            days -= daysInCurrentMonth - newDate.getDate() + 1;
            newDate.setDate(1);
            if (currentMonth < 11) {
                newDate.setMonth(currentMonth + 1);
            } else {
                newDate.setMonth(0);
                newDate.setFullYear(newDate.getFullYear() + 1);
            }
        } else {
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }
    }
    return newDate;
}
function _strftime(s, maxsize, format, tm) {
    var tm_zone = HEAP32[(tm + 40) >> 2];
    var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[(tm + 4) >> 2],
        tm_hour: HEAP32[(tm + 8) >> 2],
        tm_mday: HEAP32[(tm + 12) >> 2],
        tm_mon: HEAP32[(tm + 16) >> 2],
        tm_year: HEAP32[(tm + 20) >> 2],
        tm_wday: HEAP32[(tm + 24) >> 2],
        tm_yday: HEAP32[(tm + 28) >> 2],
        tm_isdst: HEAP32[(tm + 32) >> 2],
        tm_gmtoff: HEAP32[(tm + 36) >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : "",
    };
    var pattern = UTF8ToString(format);
    var EXPANSION_RULES_1 = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
    };
    for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
    }
    var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    function leadingSomething(value, digits, character) {
        var str = typeof value === "number" ? value.toString() : value || "";
        while (str.length < digits) {
            str = character[0] + str;
        }
        return str;
    }
    function leadingNulls(value, digits) {
        return leadingSomething(value, digits, "0");
    }
    function compareByDay(date1, date2) {
        function sgn(value) {
            return value < 0 ? -1 : value > 0 ? 1 : 0;
        }
        var compare;
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
            if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
                compare = sgn(date1.getDate() - date2.getDate());
            }
        }
        return compare;
    }
    function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
            case 0:
                return new Date(janFourth.getFullYear() - 1, 11, 29);
            case 1:
                return janFourth;
            case 2:
                return new Date(janFourth.getFullYear(), 0, 3);
            case 3:
                return new Date(janFourth.getFullYear(), 0, 2);
            case 4:
                return new Date(janFourth.getFullYear(), 0, 1);
            case 5:
                return new Date(janFourth.getFullYear() - 1, 11, 31);
            case 6:
                return new Date(janFourth.getFullYear() - 1, 11, 30);
        }
    }
    function getWeekBasedYear(date) {
        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
                return thisDate.getFullYear() + 1;
            } else {
                return thisDate.getFullYear();
            }
        } else {
            return thisDate.getFullYear() - 1;
        }
    }
    var EXPANSION_RULES_2 = {
        "%a": function (date) {
            return WEEKDAYS[date.tm_wday].substring(0, 3);
        },
        "%A": function (date) {
            return WEEKDAYS[date.tm_wday];
        },
        "%b": function (date) {
            return MONTHS[date.tm_mon].substring(0, 3);
        },
        "%B": function (date) {
            return MONTHS[date.tm_mon];
        },
        "%C": function (date) {
            var year = date.tm_year + 1900;
            return leadingNulls((year / 100) | 0, 2);
        },
        "%d": function (date) {
            return leadingNulls(date.tm_mday, 2);
        },
        "%e": function (date) {
            return leadingSomething(date.tm_mday, 2, " ");
        },
        "%g": function (date) {
            return getWeekBasedYear(date).toString().substring(2);
        },
        "%G": function (date) {
            return getWeekBasedYear(date);
        },
        "%H": function (date) {
            return leadingNulls(date.tm_hour, 2);
        },
        "%I": function (date) {
            var twelveHour = date.tm_hour;
            if (twelveHour == 0) twelveHour = 12;
            else if (twelveHour > 12) twelveHour -= 12;
            return leadingNulls(twelveHour, 2);
        },
        "%j": function (date) {
            return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
        },
        "%m": function (date) {
            return leadingNulls(date.tm_mon + 1, 2);
        },
        "%M": function (date) {
            return leadingNulls(date.tm_min, 2);
        },
        "%n": function () {
            return "\n";
        },
        "%p": function (date) {
            if (date.tm_hour >= 0 && date.tm_hour < 12) {
                return "AM";
            } else {
                return "PM";
            }
        },
        "%S": function (date) {
            return leadingNulls(date.tm_sec, 2);
        },
        "%t": function () {
            return "\t";
        },
        "%u": function (date) {
            return date.tm_wday || 7;
        },
        "%U": function (date) {
            var janFirst = new Date(date.tm_year + 1900, 0, 1);
            var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
            var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
            if (compareByDay(firstSunday, endDate) < 0) {
                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
                var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
        },
        "%V": function (date) {
            var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
            var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
            var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
            var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
            var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
            if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
                return "53";
            }
            if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
                return "01";
            }
            var daysDifference;
            if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
                daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
            } else {
                daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
            }
            return leadingNulls(Math.ceil(daysDifference / 7), 2);
        },
        "%w": function (date) {
            return date.tm_wday;
        },
        "%W": function (date) {
            var janFirst = new Date(date.tm_year, 0, 1);
            var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
            var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
            if (compareByDay(firstMonday, endDate) < 0) {
                var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
                var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
                var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
                return leadingNulls(Math.ceil(days / 7), 2);
            }
            return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
        },
        "%y": function (date) {
            return (date.tm_year + 1900).toString().substring(2);
        },
        "%Y": function (date) {
            return date.tm_year + 1900;
        },
        "%z": function (date) {
            var off = date.tm_gmtoff;
            var ahead = off >= 0;
            off = Math.abs(off) / 60;
            off = (off / 60) * 100 + (off % 60);
            return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
        },
        "%Z": function (date) {
            return date.tm_zone;
        },
        "%%": function () {
            return "%";
        },
    };
    for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
            pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
        }
    }
    var bytes = intArrayFromString(pattern, false);
    if (bytes.length > maxsize) {
        return 0;
    }
    writeArrayToMemory(bytes, s);
    return bytes.length - 1;
}
function _sysconf(name) {
    switch (name) {
        case 30:
            return PAGE_SIZE;
        case 85:
            var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
            return maxHeapSize / PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
            return 200809;
        case 79:
            return 0;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
            return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
            return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
            return 1024;
        case 31:
        case 42:
        case 72:
            return 32;
        case 87:
        case 26:
        case 33:
            return 2147483647;
        case 34:
        case 1:
            return 47839;
        case 38:
        case 36:
            return 99;
        case 43:
        case 37:
            return 2048;
        case 0:
            return 2097152;
        case 3:
            return 65536;
        case 28:
            return 32768;
        case 44:
            return 32767;
        case 75:
            return 16384;
        case 39:
            return 1e3;
        case 89:
            return 700;
        case 71:
            return 256;
        case 40:
            return 255;
        case 2:
            return 100;
        case 180:
            return 64;
        case 25:
            return 20;
        case 5:
            return 16;
        case 6:
            return 6;
        case 73:
            return 4;
        case 84: {
            if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
            return 1;
        }
    }
    ___setErrNo(22);
    return -1;
}
function _time(ptr) {
    var ret = (Date.now() / 1e3) | 0;
    if (ptr) {
        HEAP32[ptr >> 2] = ret;
    }
    return ret;
}
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
    err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
    Module["requestFullScreen"] = Module["requestFullscreen"];
    Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice);
};
Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas, vrDevice) {
    Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
};
Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
    Browser.requestAnimationFrame(func);
};
Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
    Browser.setCanvasSize(width, height, noUpdates);
};
Module["pauseMainLoop"] = function Module_pauseMainLoop() {
    Browser.mainLoop.pause();
};
Module["resumeMainLoop"] = function Module_resumeMainLoop() {
    Browser.mainLoop.resume();
};
Module["getUserMedia"] = function Module_getUserMedia() {
    Browser.getUserMedia();
};
Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
    return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};
if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function _emscripten_get_now_actual() {
        var t = process["hrtime"]();
        return t[0] * 1e3 + t[1] / 1e6;
    };
} else if (typeof dateNow !== "undefined") {
    _emscripten_get_now = dateNow;
} else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
    _emscripten_get_now = function () {
        return performance["now"]();
    };
} else {
    _emscripten_get_now = Date.now;
}
var GLctx;
GL.init();
FS.staticInit();
if (ENVIRONMENT_HAS_NODE) {
    var fs = require("fs");
    var NODEJS_PATH = require("path");
    NODEFS.staticInit();
}
for (var i = 0; i < 32; i++) __tempFixedLengthArray.push(new Array(i));
function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
}
function invoke_i(index) {
    var sp = stackSave();
    try {
        return dynCall_i(index);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_ii(index, a1) {
    var sp = stackSave();
    try {
        return dynCall_ii(index, a1);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_iii(index, a1, a2) {
    var sp = stackSave();
    try {
        return dynCall_iii(index, a1, a2);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_iiii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return dynCall_iiii(index, a1, a2, a3);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_iiiii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return dynCall_iiiii(index, a1, a2, a3, a4);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return dynCall_iiiiii(index, a1, a2, a3, a4, a5);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_v(index) {
    var sp = stackSave();
    try {
        dynCall_v(index);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_vi(index, a1) {
    var sp = stackSave();
    try {
        dynCall_vi(index, a1);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
function invoke_vii(index, a1, a2) {
    var sp = stackSave();
    try {
        dynCall_vii(index, a1, a2);
    } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== "longjmp") throw e;
        _setThrew(1, 0);
    }
}
var asmGlobalArg = {};
var asmLibraryArg = {
    f: abort,
    c: setTempRet0,
    d: getTempRet0,
    K: invoke_i,
    p: invoke_ii,
    r: invoke_iii,
    i: invoke_iiii,
    ib: invoke_iiiii,
    ga: invoke_iiiiii,
    q: invoke_v,
    o: invoke_vi,
    h: invoke_vii,
    Ye: _RWebAudioBufferSize,
    Ne: _RWebAudioFree,
    Ce: _RWebAudioInit,
    re: _RWebAudioRecalibrateTime,
    ge: _RWebAudioSampleRate,
    Xd: _RWebAudioSetNonblockState,
    Md: _RWebAudioStart,
    Bd: _RWebAudioStop,
    qd: _RWebAudioWrite,
    fd: _RWebAudioWriteAvail,
    Wc: _RWebCamFree,
    Ib: _RWebCamInit,
    Lc: _RWebCamPoll,
    Ac: _RWebCamStart,
    sc: _RWebCamStop,
    w: ___assert_fail,
    ic: ___buildEnvironment,
    da: ___lock,
    bc: ___map_file,
    ua: ___setErrNo,
    Wb: ___syscall10,
    pa: ___syscall140,
    Mb: ___syscall145,
    na: ___syscall146,
    Gb: ___syscall183,
    Fb: ___syscall194,
    ma: ___syscall195,
    Eb: ___syscall197,
    Db: ___syscall20,
    Cb: ___syscall220,
    O: ___syscall221,
    Bb: ___syscall3,
    Ab: ___syscall38,
    zb: ___syscall39,
    yb: ___syscall4,
    xb: ___syscall40,
    $: ___syscall5,
    la: ___syscall54,
    N: ___syscall6,
    wb: ___syscall85,
    vb: ___syscall91,
    M: ___unlock,
    e: _abort,
    ub: _clock_gettime,
    tb: _dummyErrnoCodes,
    sb: _eglBindAPI,
    rb: _eglChooseConfig,
    ka: _eglCreateContext,
    qb: _eglCreateWindowSurface,
    ja: _eglDestroyContext,
    pb: _eglDestroySurface,
    ob: _eglGetConfigs,
    nb: _eglGetCurrentContext,
    mb: _eglGetDisplay,
    lb: _eglGetError,
    kb: _eglGetProcAddress,
    jb: _eglInitialize,
    _: _eglMakeCurrent,
    ia: _eglQuerySurface,
    hb: _eglSwapBuffers,
    gb: _eglTerminate,
    fb: _emscripten_exit_pointerlock,
    eb: _emscripten_force_exit,
    ha: _emscripten_get_canvas_element_size,
    db: _emscripten_get_fullscreen_status,
    T: _emscripten_get_gamepad_status,
    cb: _emscripten_get_heap_size,
    bb: _emscripten_glActiveTexture,
    ab: _emscripten_glAttachShader,
    $a: _emscripten_glBeginQueryEXT,
    _a: _emscripten_glBindAttribLocation,
    Za: _emscripten_glBindBuffer,
    Ya: _emscripten_glBindFramebuffer,
    Xa: _emscripten_glBindRenderbuffer,
    Wa: _emscripten_glBindTexture,
    Va: _emscripten_glBindVertexArrayOES,
    Ua: _emscripten_glBlendColor,
    Ta: _emscripten_glBlendEquation,
    Sa: _emscripten_glBlendEquationSeparate,
    Ra: _emscripten_glBlendFunc,
    Qa: _emscripten_glBlendFuncSeparate,
    Pa: _emscripten_glBufferData,
    Oa: _emscripten_glBufferSubData,
    Na: _emscripten_glCheckFramebufferStatus,
    Ma: _emscripten_glClear,
    La: _emscripten_glClearColor,
    Ka: _emscripten_glClearDepthf,
    Ja: _emscripten_glClearStencil,
    Ia: _emscripten_glColorMask,
    rf: _emscripten_glCompileShader,
    qf: _emscripten_glCompressedTexImage2D,
    pf: _emscripten_glCompressedTexSubImage2D,
    of: _emscripten_glCopyTexImage2D,
    nf: _emscripten_glCopyTexSubImage2D,
    mf: _emscripten_glCreateProgram,
    lf: _emscripten_glCreateShader,
    kf: _emscripten_glCullFace,
    jf: _emscripten_glDeleteBuffers,
    hf: _emscripten_glDeleteFramebuffers,
    gf: _emscripten_glDeleteProgram,
    ff: _emscripten_glDeleteQueriesEXT,
    ef: _emscripten_glDeleteRenderbuffers,
    df: _emscripten_glDeleteShader,
    cf: _emscripten_glDeleteTextures,
    bf: _emscripten_glDeleteVertexArraysOES,
    af: _emscripten_glDepthFunc,
    $e: _emscripten_glDepthMask,
    _e: _emscripten_glDepthRangef,
    Ze: _emscripten_glDetachShader,
    Xe: _emscripten_glDisable,
    We: _emscripten_glDisableVertexAttribArray,
    Ve: _emscripten_glDrawArrays,
    Ue: _emscripten_glDrawArraysInstancedANGLE,
    Te: _emscripten_glDrawBuffersWEBGL,
    Se: _emscripten_glDrawElements,
    Re: _emscripten_glDrawElementsInstancedANGLE,
    Qe: _emscripten_glEnable,
    Pe: _emscripten_glEnableVertexAttribArray,
    Oe: _emscripten_glEndQueryEXT,
    Me: _emscripten_glFinish,
    Le: _emscripten_glFlush,
    Ke: _emscripten_glFramebufferRenderbuffer,
    Je: _emscripten_glFramebufferTexture2D,
    Ie: _emscripten_glFrontFace,
    He: _emscripten_glGenBuffers,
    Ge: _emscripten_glGenFramebuffers,
    Fe: _emscripten_glGenQueriesEXT,
    Ee: _emscripten_glGenRenderbuffers,
    De: _emscripten_glGenTextures,
    Be: _emscripten_glGenVertexArraysOES,
    Ae: _emscripten_glGenerateMipmap,
    ze: _emscripten_glGetActiveAttrib,
    ye: _emscripten_glGetActiveUniform,
    xe: _emscripten_glGetAttachedShaders,
    we: _emscripten_glGetAttribLocation,
    ve: _emscripten_glGetBooleanv,
    ue: _emscripten_glGetBufferParameteriv,
    te: _emscripten_glGetError,
    se: _emscripten_glGetFloatv,
    qe: _emscripten_glGetFramebufferAttachmentParameteriv,
    pe: _emscripten_glGetIntegerv,
    oe: _emscripten_glGetProgramInfoLog,
    ne: _emscripten_glGetProgramiv,
    me: _emscripten_glGetQueryObjecti64vEXT,
    le: _emscripten_glGetQueryObjectivEXT,
    ke: _emscripten_glGetQueryObjectui64vEXT,
    je: _emscripten_glGetQueryObjectuivEXT,
    ie: _emscripten_glGetQueryivEXT,
    he: _emscripten_glGetRenderbufferParameteriv,
    fe: _emscripten_glGetShaderInfoLog,
    ee: _emscripten_glGetShaderPrecisionFormat,
    de: _emscripten_glGetShaderSource,
    ce: _emscripten_glGetShaderiv,
    be: _emscripten_glGetString,
    ae: _emscripten_glGetTexParameterfv,
    $d: _emscripten_glGetTexParameteriv,
    _d: _emscripten_glGetUniformLocation,
    Zd: _emscripten_glGetUniformfv,
    Yd: _emscripten_glGetUniformiv,
    Wd: _emscripten_glGetVertexAttribPointerv,
    Vd: _emscripten_glGetVertexAttribfv,
    Ud: _emscripten_glGetVertexAttribiv,
    Td: _emscripten_glHint,
    Sd: _emscripten_glIsBuffer,
    Rd: _emscripten_glIsEnabled,
    Qd: _emscripten_glIsFramebuffer,
    Pd: _emscripten_glIsProgram,
    Od: _emscripten_glIsQueryEXT,
    Nd: _emscripten_glIsRenderbuffer,
    Ld: _emscripten_glIsShader,
    Kd: _emscripten_glIsTexture,
    Jd: _emscripten_glIsVertexArrayOES,
    Id: _emscripten_glLineWidth,
    Hd: _emscripten_glLinkProgram,
    Gd: _emscripten_glPixelStorei,
    Fd: _emscripten_glPolygonOffset,
    Ed: _emscripten_glQueryCounterEXT,
    Dd: _emscripten_glReadPixels,
    Cd: _emscripten_glReleaseShaderCompiler,
    Ad: _emscripten_glRenderbufferStorage,
    zd: _emscripten_glSampleCoverage,
    yd: _emscripten_glScissor,
    xd: _emscripten_glShaderBinary,
    wd: _emscripten_glShaderSource,
    vd: _emscripten_glStencilFunc,
    ud: _emscripten_glStencilFuncSeparate,
    td: _emscripten_glStencilMask,
    sd: _emscripten_glStencilMaskSeparate,
    rd: _emscripten_glStencilOp,
    pd: _emscripten_glStencilOpSeparate,
    od: _emscripten_glTexImage2D,
    nd: _emscripten_glTexParameterf,
    md: _emscripten_glTexParameterfv,
    ld: _emscripten_glTexParameteri,
    kd: _emscripten_glTexParameteriv,
    jd: _emscripten_glTexSubImage2D,
    id: _emscripten_glUniform1f,
    hd: _emscripten_glUniform1fv,
    gd: _emscripten_glUniform1i,
    ed: _emscripten_glUniform1iv,
    dd: _emscripten_glUniform2f,
    cd: _emscripten_glUniform2fv,
    bd: _emscripten_glUniform2i,
    ad: _emscripten_glUniform2iv,
    $c: _emscripten_glUniform3f,
    _c: _emscripten_glUniform3fv,
    Zc: _emscripten_glUniform3i,
    Yc: _emscripten_glUniform3iv,
    Xc: _emscripten_glUniform4f,
    Vc: _emscripten_glUniform4fv,
    Uc: _emscripten_glUniform4i,
    Tc: _emscripten_glUniform4iv,
    Sc: _emscripten_glUniformMatrix2fv,
    Rc: _emscripten_glUniformMatrix3fv,
    Qc: _emscripten_glUniformMatrix4fv,
    Pc: _emscripten_glUseProgram,
    Oc: _emscripten_glValidateProgram,
    Nc: _emscripten_glVertexAttrib1f,
    Mc: _emscripten_glVertexAttrib1fv,
    Kc: _emscripten_glVertexAttrib2f,
    Jc: _emscripten_glVertexAttrib2fv,
    Ic: _emscripten_glVertexAttrib3f,
    Hc: _emscripten_glVertexAttrib3fv,
    Gc: _emscripten_glVertexAttrib4f,
    Fc: _emscripten_glVertexAttrib4fv,
    Ec: _emscripten_glVertexAttribDivisorANGLE,
    Dc: _emscripten_glVertexAttribPointer,
    Cc: _emscripten_glViewport,
    Bc: _emscripten_longjmp,
    zc: _emscripten_memcpy_big,
    yc: _emscripten_request_pointerlock,
    xc: _emscripten_resize_heap,
    Ha: _emscripten_sample_gamepad_data,
    Ga: _emscripten_set_canvas_element_size,
    Fa: _emscripten_set_element_css_size,
    wc: _emscripten_set_fullscreenchange_callback_on_thread,
    vc: _emscripten_set_gamepadconnected_callback_on_thread,
    uc: _emscripten_set_gamepaddisconnected_callback_on_thread,
    tc: _emscripten_set_keydown_callback_on_thread,
    rc: _emscripten_set_keypress_callback_on_thread,
    qc: _emscripten_set_keyup_callback_on_thread,
    pc: _emscripten_set_main_loop,
    Ea: _emscripten_set_main_loop_timing,
    oc: _emscripten_set_mousedown_callback_on_thread,
    nc: _emscripten_set_mousemove_callback_on_thread,
    mc: _emscripten_set_mouseup_callback_on_thread,
    lc: _emscripten_set_wheel_callback_on_thread,
    kc: _exit,
    x: _getenv,
    S: _glActiveTexture,
    Da: _glAttachShader,
    fa: _glBindBuffer,
    v: _glBindFramebuffer,
    Ca: _glBindRenderbuffer,
    j: _glBindTexture,
    X: _glBlendEquation,
    E: _glBlendFunc,
    jc: _glBufferData,
    W: _glCheckFramebufferStatus,
    D: _glClear,
    V: _glClearColor,
    hc: _glCompileShader,
    gc: _glCreateProgram,
    Ba: _glCreateShader,
    ea: _glDeleteBuffers,
    C: _glDeleteFramebuffers,
    fc: _glDeleteProgram,
    Aa: _glDeleteRenderbuffers,
    za: _glDeleteShader,
    t: _glDeleteTextures,
    s: _glDisable,
    ca: _glDisableVertexAttribArray,
    z: _glDrawArrays,
    L: _glEnable,
    ec: _glEnableVertexAttribArray,
    dc: _glFinish,
    cc: _glFlush,
    ya: _glFramebufferRenderbuffer,
    U: _glFramebufferTexture2D,
    g: _glGenBuffers,
    ba: _glGenFramebuffers,
    ac: _glGenRenderbuffers,
    B: _glGenTextures,
    Z: _glGenerateMipmap,
    xa: _glGetAttribLocation,
    wa: _glGetError,
    aa: _glGetIntegerv,
    $b: _glGetProgramInfoLog,
    va: _glGetProgramiv,
    _b: _glGetShaderInfoLog,
    ta: _glGetShaderiv,
    m: _glGetString,
    J: _glGetUniformLocation,
    Zb: _glIsProgram,
    Yb: _glLinkProgram,
    I: _glPixelStorei,
    sa: _glReadPixels,
    Xb: _glRenderbufferStorage,
    ra: _glScissor,
    Vb: _glShaderSource,
    H: _glTexImage2D,
    l: _glTexParameteri,
    Y: _glTexSubImage2D,
    qa: _glUniform1f,
    Ub: _glUniform1fv,
    A: _glUniform1i,
    Tb: _glUniform2f,
    u: _glUniform2fv,
    Sb: _glUniform3f,
    Rb: _glUniform3fv,
    Qb: _glUniform4f,
    Pb: _glUniform4fv,
    Ob: _glUniformMatrix4fv,
    G: _glUseProgram,
    Nb: _glVertexAttribPointer,
    y: _glViewport,
    Hb: _llvm_bswap_i64,
    R: _llvm_exp2_f32,
    k: _llvm_exp2_f64,
    F: _llvm_trap,
    Q: _localtime,
    b: _longjmp,
    Lb: _mktime,
    oa: _nanosleep,
    n: _strftime,
    Kb: _sysconf,
    P: _time,
    Jb: abortOnCannotGrowMemory,
    a: DYNAMICTOP_PTR,
};
var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
Module["asm"] = asm;
var ___emscripten_environ_constructor = (Module["___emscripten_environ_constructor"] = function () {
    return Module["asm"]["sf"].apply(null, arguments);
});
var ___errno_location = (Module["___errno_location"] = function () {
    return Module["asm"]["tf"].apply(null, arguments);
});
var __get_daylight = (Module["__get_daylight"] = function () {
    return Module["asm"]["uf"].apply(null, arguments);
});
var __get_timezone = (Module["__get_timezone"] = function () {
    return Module["asm"]["vf"].apply(null, arguments);
});
var __get_tzname = (Module["__get_tzname"] = function () {
    return Module["asm"]["wf"].apply(null, arguments);
});
var _cmd_load_state = (Module["_cmd_load_state"] = function () {
    return Module["asm"]["xf"].apply(null, arguments);
});
var _cmd_save_state = (Module["_cmd_save_state"] = function () {
    return Module["asm"]["yf"].apply(null, arguments);
});
var _cmd_savefiles = (Module["_cmd_savefiles"] = function () {
    return Module["asm"]["zf"].apply(null, arguments);
});
var _cmd_take_screenshot = (Module["_cmd_take_screenshot"] = function () {
    return Module["asm"]["Af"].apply(null, arguments);
});
var _emscripten_GetProcAddress = (Module["_emscripten_GetProcAddress"] = function () {
    return Module["asm"]["Bf"].apply(null, arguments);
});
var _fflush = (Module["_fflush"] = function () {
    return Module["asm"]["Cf"].apply(null, arguments);
});
var _free = (Module["_free"] = function () {
    return Module["asm"]["Df"].apply(null, arguments);
});
var _llvm_bswap_i32 = (Module["_llvm_bswap_i32"] = function () {
    return Module["asm"]["Ef"].apply(null, arguments);
});
var _main = (Module["_main"] = function () {
    return Module["asm"]["Ff"].apply(null, arguments);
});
var _malloc = (Module["_malloc"] = function () {
    return Module["asm"]["Gf"].apply(null, arguments);
});
var _setThrew = (Module["_setThrew"] = function () {
    return Module["asm"]["Hf"].apply(null, arguments);
});
var stackAlloc = (Module["stackAlloc"] = function () {
    return Module["asm"]["Hg"].apply(null, arguments);
});
var stackRestore = (Module["stackRestore"] = function () {
    return Module["asm"]["Ig"].apply(null, arguments);
});
var stackSave = (Module["stackSave"] = function () {
    return Module["asm"]["Jg"].apply(null, arguments);
});
var dynCall_fffff = (Module["dynCall_fffff"] = function () {
    return Module["asm"]["If"].apply(null, arguments);
});
var dynCall_fi = (Module["dynCall_fi"] = function () {
    return Module["asm"]["Jf"].apply(null, arguments);
});
var dynCall_fii = (Module["dynCall_fii"] = function () {
    return Module["asm"]["Kf"].apply(null, arguments);
});
var dynCall_fiii = (Module["dynCall_fiii"] = function () {
    return Module["asm"]["Lf"].apply(null, arguments);
});
var dynCall_i = (Module["dynCall_i"] = function () {
    return Module["asm"]["Mf"].apply(null, arguments);
});
var dynCall_ii = (Module["dynCall_ii"] = function () {
    return Module["asm"]["Nf"].apply(null, arguments);
});
var dynCall_iidii = (Module["dynCall_iidii"] = function () {
    return Module["asm"]["Of"].apply(null, arguments);
});
var dynCall_iidiiii = (Module["dynCall_iidiiii"] = function () {
    return Module["asm"]["Pf"].apply(null, arguments);
});
var dynCall_iif = (Module["dynCall_iif"] = function () {
    return Module["asm"]["Qf"].apply(null, arguments);
});
var dynCall_iii = (Module["dynCall_iii"] = function () {
    return Module["asm"]["Rf"].apply(null, arguments);
});
var dynCall_iiifi = (Module["dynCall_iiifi"] = function () {
    return Module["asm"]["Sf"].apply(null, arguments);
});
var dynCall_iiii = (Module["dynCall_iiii"] = function () {
    return Module["asm"]["Tf"].apply(null, arguments);
});
var dynCall_iiiif = (Module["dynCall_iiiif"] = function () {
    return Module["asm"]["Uf"].apply(null, arguments);
});
var dynCall_iiiifi = (Module["dynCall_iiiifi"] = function () {
    return Module["asm"]["Vf"].apply(null, arguments);
});
var dynCall_iiiii = (Module["dynCall_iiiii"] = function () {
    return Module["asm"]["Wf"].apply(null, arguments);
});
var dynCall_iiiiifiii = (Module["dynCall_iiiiifiii"] = function () {
    return Module["asm"]["Xf"].apply(null, arguments);
});
var dynCall_iiiiii = (Module["dynCall_iiiiii"] = function () {
    return Module["asm"]["Yf"].apply(null, arguments);
});
var dynCall_iiiiiii = (Module["dynCall_iiiiiii"] = function () {
    return Module["asm"]["Zf"].apply(null, arguments);
});
var dynCall_iiiiiiii = (Module["dynCall_iiiiiiii"] = function () {
    return Module["asm"]["_f"].apply(null, arguments);
});
var dynCall_iiiiiiiii = (Module["dynCall_iiiiiiiii"] = function () {
    return Module["asm"]["$f"].apply(null, arguments);
});
var dynCall_iiiiijiii = (Module["dynCall_iiiiijiii"] = function () {
    return Module["asm"]["ag"].apply(null, arguments);
});
var dynCall_iiji = (Module["dynCall_iiji"] = function () {
    return Module["asm"]["bg"].apply(null, arguments);
});
var dynCall_iijii = (Module["dynCall_iijii"] = function () {
    return Module["asm"]["cg"].apply(null, arguments);
});
var dynCall_iji = (Module["dynCall_iji"] = function () {
    return Module["asm"]["dg"].apply(null, arguments);
});
var dynCall_j = (Module["dynCall_j"] = function () {
    return Module["asm"]["eg"].apply(null, arguments);
});
var dynCall_ji = (Module["dynCall_ji"] = function () {
    return Module["asm"]["fg"].apply(null, arguments);
});
var dynCall_jiiii = (Module["dynCall_jiiii"] = function () {
    return Module["asm"]["gg"].apply(null, arguments);
});
var dynCall_jiij = (Module["dynCall_jiij"] = function () {
    return Module["asm"]["hg"].apply(null, arguments);
});
var dynCall_jij = (Module["dynCall_jij"] = function () {
    return Module["asm"]["ig"].apply(null, arguments);
});
var dynCall_jiji = (Module["dynCall_jiji"] = function () {
    return Module["asm"]["jg"].apply(null, arguments);
});
var dynCall_v = (Module["dynCall_v"] = function () {
    return Module["asm"]["kg"].apply(null, arguments);
});
var dynCall_vf = (Module["dynCall_vf"] = function () {
    return Module["asm"]["lg"].apply(null, arguments);
});
var dynCall_vff = (Module["dynCall_vff"] = function () {
    return Module["asm"]["mg"].apply(null, arguments);
});
var dynCall_vffff = (Module["dynCall_vffff"] = function () {
    return Module["asm"]["ng"].apply(null, arguments);
});
var dynCall_vfi = (Module["dynCall_vfi"] = function () {
    return Module["asm"]["og"].apply(null, arguments);
});
var dynCall_vi = (Module["dynCall_vi"] = function () {
    return Module["asm"]["pg"].apply(null, arguments);
});
var dynCall_vif = (Module["dynCall_vif"] = function () {
    return Module["asm"]["qg"].apply(null, arguments);
});
var dynCall_viff = (Module["dynCall_viff"] = function () {
    return Module["asm"]["rg"].apply(null, arguments);
});
var dynCall_vifff = (Module["dynCall_vifff"] = function () {
    return Module["asm"]["sg"].apply(null, arguments);
});
var dynCall_viffff = (Module["dynCall_viffff"] = function () {
    return Module["asm"]["tg"].apply(null, arguments);
});
var dynCall_vii = (Module["dynCall_vii"] = function () {
    return Module["asm"]["ug"].apply(null, arguments);
});
var dynCall_viif = (Module["dynCall_viif"] = function () {
    return Module["asm"]["vg"].apply(null, arguments);
});
var dynCall_viiffff = (Module["dynCall_viiffff"] = function () {
    return Module["asm"]["wg"].apply(null, arguments);
});
var dynCall_viii = (Module["dynCall_viii"] = function () {
    return Module["asm"]["xg"].apply(null, arguments);
});
var dynCall_viiii = (Module["dynCall_viiii"] = function () {
    return Module["asm"]["yg"].apply(null, arguments);
});
var dynCall_viiiii = (Module["dynCall_viiiii"] = function () {
    return Module["asm"]["zg"].apply(null, arguments);
});
var dynCall_viiiiif = (Module["dynCall_viiiiif"] = function () {
    return Module["asm"]["Ag"].apply(null, arguments);
});
var dynCall_viiiiii = (Module["dynCall_viiiiii"] = function () {
    return Module["asm"]["Bg"].apply(null, arguments);
});
var dynCall_viiiiiii = (Module["dynCall_viiiiiii"] = function () {
    return Module["asm"]["Cg"].apply(null, arguments);
});
var dynCall_viiiiiiii = (Module["dynCall_viiiiiiii"] = function () {
    return Module["asm"]["Dg"].apply(null, arguments);
});
var dynCall_viiiiiiiii = (Module["dynCall_viiiiiiiii"] = function () {
    return Module["asm"]["Eg"].apply(null, arguments);
});
var dynCall_viiiiiiiiii = (Module["dynCall_viiiiiiiiii"] = function () {
    return Module["asm"]["Fg"].apply(null, arguments);
});
var dynCall_vj = (Module["dynCall_vj"] = function () {
    return Module["asm"]["Gg"].apply(null, arguments);
});
Module["asm"] = asm;
function ExitStatus(status) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status;
}
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
var calledMain = false;
dependenciesFulfilled = function runCaller() {
    if (!Module["calledRun"]) run();
    if (!Module["calledRun"]) dependenciesFulfilled = runCaller;
};
Module["callMain"] = function callMain(args) {
    args = args || [];
    var argc = args.length + 1;
    var argv = stackAlloc((argc + 1) * 4);
    HEAP32[argv >> 2] = allocateUTF8OnStack(Module["thisProgram"]);
    for (var i = 1; i < argc; i++) {
        HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
    }
    HEAP32[(argv >> 2) + argc] = 0;
    try {
        var ret = Module["_main"](argc, argv);
        exit(ret, true);
    } catch (e) {
        if (e instanceof ExitStatus) {
            return;
        } else if (e == "SimulateInfiniteLoop") {
            Module["noExitRuntime"] = true;
            return;
        } else {
            var toLog = e;
            if (e && typeof e === "object" && e.stack) {
                toLog = [e, e.stack];
            }
            err("exception thrown: " + toLog);
            Module["quit"](1, e);
        }
    } finally {
        calledMain = true;
    }
};
function run(args) {
    args = args || Module["arguments"];
    if (runDependencies > 0) {
        return;
    }
    preRun();
    if (runDependencies > 0) return;
    if (Module["calledRun"]) return;
    function doRun() {
        if (Module["calledRun"]) return;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        if (Module["_main"] && shouldRunNow) Module["callMain"](args);
        postRun();
    }
    if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function () {
            setTimeout(function () {
                Module["setStatus"]("");
            }, 1);
            doRun();
        }, 1);
    } else {
        doRun();
    }
}
Module["run"] = run;
function exit(status, implicit) {
    if (implicit && Module["noExitRuntime"] && status === 0) {
        return;
    }
    if (Module["noExitRuntime"]) {
    } else {
        ABORT = true;
        EXITSTATUS = status;
        exitRuntime();
        if (Module["onExit"]) Module["onExit"](status);
    }
    Module["quit"](status, new ExitStatus(status));
}
function abort(what) {
    if (Module["onAbort"]) {
        Module["onAbort"](what);
    }
    what += "";
    out(what);
    err(what);
    ABORT = true;
    EXITSTATUS = 1;
    throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
}
Module["abort"] = abort;
if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
    }
}
var shouldRunNow = true;
if (Module["noInitialRun"]) {
    shouldRunNow = false;
}
run();

// browserfs.min.js
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.BrowserFS=a()}}(function(){var a;return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(b,c,d){(function(b,e){!function(b,e){"object"==typeof d&&"undefined"!=typeof c?e(d):"function"==typeof a&&a.amd?a(["exports"],e):e(b.async=b.async||{})}(this,function(a){"use strict";function c(a,b,c){var d=c.length;switch(d){case 0:return a.call(b);case 1:return a.call(b,c[0]);case 2:return a.call(b,c[0],c[1]);case 3:return a.call(b,c[0],c[1],c[2])}return a.apply(b,c)}function d(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}function f(a){var b=d(a)?mb.call(a):"";return b==jb||b==kb}function g(a){return!!a&&"object"==typeof a}function h(a){return"symbol"==typeof a||g(a)&&pb.call(a)==nb}function i(a){if("number"==typeof a)return a;if(h(a))return qb;if(d(a)){var b=f(a.valueOf)?a.valueOf():a;a=d(b)?b+"":b}if("string"!=typeof a)return 0===a?a:+a;a=a.replace(rb,"");var c=tb.test(a);return c||ub.test(a)?vb(a.slice(2),c?2:8):sb.test(a)?qb:+a}function j(a){if(!a)return 0===a?a:0;if(a=i(a),a===wb||a===-wb){var b=a<0?-1:1;return b*xb}return a===a?a:0}function k(a){var b=j(a),c=b%1;return b===b?c?b-c:b:0}function l(a,b){if("function"!=typeof a)throw new TypeError(yb);return b=zb(void 0===b?a.length-1:k(b),0),function(){for(var d=arguments,e=-1,f=zb(d.length-b,0),g=Array(f);++e<f;)g[e]=d[b+e];switch(b){case 0:return a.call(this,g);case 1:return a.call(this,d[0],g);case 2:return a.call(this,d[0],d[1],g)}var h=Array(b+1);for(e=-1;++e<b;)h[e]=d[e];return h[b]=g,c(a,this,h)}}function m(a){return l(function(b){var c=b.pop();a.call(this,b,c)})}function n(a){return l(function(b,c){var d=m(function(c,d){var e=this;return a(b,function(a,b){a.apply(e,c.concat([b]))},d)});return c.length?d.apply(this,c):d})}function o(a){return function(b){return null==b?void 0:b[a]}}function p(a){return"number"==typeof a&&a>-1&&a%1==0&&a<=Bb}function q(a){return null!=a&&p(Ab(a))&&!f(a)}function r(){}function s(a){return function(){if(null!==a){var b=a;a=null,b.apply(this,arguments)}}}function t(a){return Cb&&a[Cb]&&a[Cb]()}function u(a){return Db(Object(a))}function v(a,b){return null!=a&&(Fb.call(a,b)||"object"==typeof a&&b in a&&null===u(a))}function w(a){return Gb(Object(a))}function x(a,b){for(var c=-1,d=Array(a);++c<a;)d[c]=b(c);return d}function y(a){return g(a)&&q(a)}function z(a){return y(a)&&Jb.call(a,"callee")&&(!Lb.call(a,"callee")||Kb.call(a)==Hb)}function A(a){return"string"==typeof a||!Mb(a)&&g(a)&&Pb.call(a)==Nb}function B(a){var b=a?a.length:void 0;return p(b)&&(Mb(a)||A(a)||z(a))?x(b,String):null}function C(a,b){return b=null==b?Qb:b,!!b&&("number"==typeof a||Rb.test(a))&&a>-1&&a%1==0&&a<b}function D(a){var b=a&&a.constructor,c="function"==typeof b&&b.prototype||Sb;return a===c}function E(a){var b=D(a);if(!b&&!q(a))return w(a);var c=B(a),d=!!c,e=c||[],f=e.length;for(var g in a)!v(a,g)||d&&("length"==g||C(g,f))||b&&"constructor"==g||e.push(g);return e}function F(a){var b=-1,c=a.length;return function(){return++b<c?{value:a[b],key:b}:null}}function G(a){var b=-1;return function(){var c=a.next();return c.done?null:(b++,{value:c.value,key:b})}}function H(a){var b=E(a),c=-1,d=b.length;return function(){var e=b[++c];return c<d?{value:a[e],key:e}:null}}function I(a){if(q(a))return F(a);var b=t(a);return b?G(b):H(a)}function J(a){return function(){if(null===a)throw new Error("Callback was already called.");var b=a;a=null,b.apply(this,arguments)}}function K(a){return function(b,c,d){function e(a){if(i-=1,a)h=!0,d(a);else{if(h&&i<=0)return d(null);f()}}function f(){for(;i<a&&!h;){var b=g();if(null===b)return h=!0,void(i<=0&&d(null));i+=1,c(b.value,b.key,J(e))}}if(d=s(d||r),a<=0||!b)return d(null);var g=I(b),h=!1,i=0;f()}}function L(a,b,c,d){K(b)(a,c,d)}function M(a,b){return function(c,d,e){return a(c,b,d,e)}}function N(a,b){var c;if("function"!=typeof b)throw new TypeError(Tb);return a=k(a),function(){return--a>0&&(c=b.apply(this,arguments)),a<=1&&(b=void 0),c}}function O(a){return N(2,a)}function P(a,b,c){function d(a){a?c(a):++f===g&&c(null)}c=O(c||r);var e=0,f=0,g=a.length;for(0===g&&c(null);e<g;e++)b(a[e],e,J(d))}function Q(a,b,c){var d=q(a)?P:Ub;d(a,b,c)}function R(a){return function(b,c,d){return a(Q,b,c,d)}}function S(a,b,c,d){d=s(d||r),b=b||[];var e=[],f=0;a(b,function(a,b,d){var g=f++;c(a,function(a,b){e[g]=b,d(a)})},function(a){d(a,e)})}function T(a){return function(b,c,d,e){return a(K(c),b,d,e)}}function U(a){return m(function(b,c){var e;try{e=a.apply(this,b)}catch(a){return c(a)}d(e)&&"function"==typeof e.then?e.then(function(a){c(null,a)},function(a){c(a.message?a:new Error(a))}):c(null,e)})}function V(a,b){for(var c=-1,d=a?a.length:0;++c<d&&b(a[c],c,a)!==!1;);return a}function W(a){return function(b,c,d){for(var e=-1,f=Object(b),g=d(b),h=g.length;h--;){var i=g[a?h:++e];if(c(f[i],i,f)===!1)break}return b}}function X(a,b){return a&&_b(a,b,E)}function Y(a,b,c){for(var d=a.length,e=b+(c?1:-1);c?e--:++e<d;){var f=a[e];if(f!==f)return e}return-1}function Z(a,b,c){if(b!==b)return Y(a,c);for(var d=c-1,e=a.length;++d<e;)if(a[d]===b)return d;return-1}function $(a,b,c){function d(a,b){t.push(function(){h(a,b)})}function e(){if(0===t.length&&0===o)return c(null,n);for(;t.length&&o<b;){var a=t.shift();a()}}function f(a,b){var c=q[a];c||(c=q[a]=[]),c.push(b)}function g(a){var b=q[a]||[];V(b,function(a){a()}),e()}function h(a,b){if(!p){var d=J(l(function(b,d){if(o--,d.length<=1&&(d=d[0]),b){var e={};X(n,function(a,b){e[b]=a}),e[a]=d,p=!0,q=[],c(b,e)}else n[a]=d,g(a)}));o++;var e=b[b.length-1];b.length>1?e(n,d):e(d)}}function i(){for(var a,b=0;u.length;)a=u.pop(),b++,V(j(a),function(a){0===--v[a]&&u.push(a)});if(b!==m)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function j(b){var c=[];return X(a,function(a,d){Mb(a)&&Z(a,b,0)>=0&&c.push(d)}),c}"function"==typeof b&&(c=b,b=null),c=s(c||r);var k=E(a),m=k.length;if(!m)return c(null);b||(b=m);var n={},o=0,p=!1,q={},t=[],u=[],v={};X(a,function(b,c){if(!Mb(b))return d(c,[b]),void u.push(c);var e=b.slice(0,b.length-1),g=e.length;return 0===g?(d(c,b),void u.push(c)):(v[c]=g,void V(e,function(h){if(!a[h])throw new Error("async.auto task `"+c+"` has a non-existent dependency in "+e.join(", "));f(h,function(){g--,0===g&&d(c,b)})}))}),i(),e()}function _(a,b){for(var c=-1,d=a?a.length:0,e=Array(d);++c<d;)e[c]=b(a[c],c,a);return e}function aa(a,b){var c=-1,d=a.length;for(b||(b=Array(d));++c<d;)b[c]=a[c];return b}function ba(a){return a&&a.Object===Object?a:null}function ca(a){if("string"==typeof a)return a;if(h(a))return hc?hc.call(a):"";var b=a+"";return"0"==b&&1/a==-fc?"-0":b}function da(a,b,c){var d=-1,e=a.length;b<0&&(b=-b>e?0:e+b),c=c>e?e:c,c<0&&(c+=e),e=b>c?0:c-b>>>0,b>>>=0;for(var f=Array(e);++d<e;)f[d]=a[d+b];return f}function ea(a,b,c){var d=a.length;return c=void 0===c?d:c,!b&&c>=d?a:da(a,b,c)}function fa(a,b){for(var c=a.length;c--&&Z(b,a[c],0)>-1;);return c}function ga(a,b){for(var c=-1,d=a.length;++c<d&&Z(b,a[c],0)>-1;);return c}function ha(a){return a.match(zc)}function ia(a){return null==a?"":ca(a)}function ja(a,b,c){if(a=ia(a),a&&(c||void 0===b))return a.replace(Ac,"");if(!a||!(b=ca(b)))return a;var d=ha(a),e=ha(b),f=ga(d,e),g=fa(d,e)+1;return ea(d,f,g).join("")}function ka(a){return a=a.toString().replace(Ec,""),a=a.match(Bc)[2].replace(" ",""),a=a?a.split(Cc):[],a=a.map(function(a){return ja(a.replace(Dc,""))})}function la(a,b){var c={};X(a,function(a,b){function d(b,c){var d=_(e,function(a){return b[a]});d.push(c),a.apply(null,d)}var e;if(Mb(a))e=aa(a),a=e.pop(),c[b]=e.concat(e.length>0?d:a);else if(1===a.length)c[b]=a;else{if(e=ka(a),0===a.length&&0===e.length)throw new Error("autoInject task functions require explicit parameters.");e.pop(),c[b]=e.concat(d)}}),$(c,b)}function ma(a){setTimeout(a,0)}function na(a){return l(function(b,c){a(function(){b.apply(null,c)})})}function oa(){this.head=this.tail=null,this.length=0}function pa(a,b){a.length=1,a.head=a.tail=b}function qa(a,b,c){function d(a,b,c){if(null!=c&&"function"!=typeof c)throw new Error("task callback must be a function");return h.started=!0,Mb(a)||(a=[a]),0===a.length&&h.idle()?Hc(function(){h.drain()}):(V(a,function(a){var d={data:a,callback:c||r};b?h._tasks.unshift(d):h._tasks.push(d)}),void Hc(h.process))}function e(a){return l(function(b){f-=1,V(a,function(a){V(g,function(b,c){if(b===a)return g.splice(c,1),!1}),a.callback.apply(a,b),null!=b[0]&&h.error(b[0],a.data)}),f<=h.concurrency-h.buffer&&h.unsaturated(),h.idle()&&h.drain(),h.process()})}if(null==b)b=1;else if(0===b)throw new Error("Concurrency must not be zero");var f=0,g=[],h={_tasks:new oa,concurrency:b,payload:c,saturated:r,unsaturated:r,buffer:b/4,empty:r,drain:r,error:r,started:!1,paused:!1,push:function(a,b){d(a,!1,b)},kill:function(){h.drain=r,h._tasks.empty()},unshift:function(a,b){d(a,!0,b)},process:function(){for(;!h.paused&&f<h.concurrency&&h._tasks.length;){var b=[],c=[],d=h._tasks.length;h.payload&&(d=Math.min(d,h.payload));for(var i=0;i<d;i++){var j=h._tasks.shift();b.push(j),c.push(j.data)}0===h._tasks.length&&h.empty(),f+=1,g.push(b[0]),f===h.concurrency&&h.saturated();var k=J(e(b));a(c,k)}},length:function(){return h._tasks.length},running:function(){return f},workersList:function(){return g},idle:function(){return h._tasks.length+f===0},pause:function(){h.paused=!0},resume:function(){if(h.paused!==!1){h.paused=!1;for(var a=Math.min(h.concurrency,h._tasks.length),b=1;b<=a;b++)Hc(h.process)}}};return h}function ra(a,b){return qa(a,1,b)}function sa(a,b,c,d){d=s(d||r),Jc(a,function(a,d,e){c(b,a,function(a,c){b=c,e(a)})},function(a){d(a,b)})}function ta(a,b,c,d){var e=[];a(b,function(a,b,d){c(a,function(a,b){e=e.concat(b||[]),d(a)})},function(a){d(a,e)})}function ua(a){return function(b,c,d){return a(Jc,b,c,d)}}function va(a){return a}function wa(a,b,c){return function(d,e,f,g){function h(a){g&&(a?g(a):g(null,c(!1)))}function i(a,d,e){return g?void f(a,function(d,h){g&&(d?(g(d),g=f=!1):b(h)&&(g(null,c(!0,a)),g=f=!1)),e()}):e()}arguments.length>3?(g=g||r,a(d,e,i,h)):(g=f,g=g||r,f=e,a(d,i,h))}}function xa(a,b){return b}function ya(a){return l(function(b,c){b.apply(null,c.concat([l(function(b,c){"object"==typeof console&&(b?console.error&&console.error(b):console[a]&&V(c,function(b){console[a](b)}))})]))})}function za(a,b,c){function d(b,d){return b?c(b):d?void a(e):c(null)}c=J(c||r);var e=l(function(a,e){return a?c(a):(e.push(d),void b.apply(this,e))});d(null,!0)}function Aa(a,b,c){c=J(c||r);var d=l(function(e,f){return e?c(e):b.apply(this,f)?a(d):void c.apply(null,[null].concat(f))});a(d)}function Ba(a,b,c){Aa(a,function(){return!b.apply(this,arguments)},c)}function Ca(a,b,c){function d(b){return b?c(b):void a(e)}function e(a,e){return a?c(a):e?void b(d):c(null)}c=J(c||r),a(e)}function Da(a){return function(b,c,d){return a(b,d)}}function Ea(a,b,c){Q(a,Da(b),c)}function Fa(a,b,c,d){K(b)(a,Da(c),d)}function Ga(a){return m(function(b,c){var d=!0;b.push(function(){var a=arguments;d?Hc(function(){c.apply(null,a)}):c.apply(null,a)}),a.apply(this,b),d=!1})}function Ha(a){return!a}function Ia(a,b,c,d){d=s(d||r);var e=[];a(b,function(a,b,d){c(a,function(c,f){c?d(c):(f&&e.push({index:b,value:a}),d())})},function(a){a?d(a):d(null,_(e.sort(function(a,b){return a.index-b.index}),o("value")))})}function Ja(a,b){function c(a){return a?d(a):void e(c)}var d=J(b||r),e=Ga(a);c()}function Ka(a,b,c,d){d=s(d||r);var e={};L(a,b,function(a,b,d){c(a,b,function(a,c){return a?d(a):(e[b]=c,void d())})},function(a){d(a,e)})}function La(a,b){return b in a}function Ma(a,b){var c=Object.create(null),d=Object.create(null);b=b||va;var e=m(function(e,f){var g=b.apply(null,e);La(c,g)?Hc(function(){f.apply(null,c[g])}):La(d,g)?d[g].push(f):(d[g]=[f],a.apply(null,e.concat([l(function(a){c[g]=a;var b=d[g];delete d[g];for(var e=0,f=b.length;e<f;e++)b[e].apply(null,a)})])))});return e.memo=c,e.unmemoized=a,e}function Na(a,b,c){c=c||r;var d=q(b)?[]:{};a(b,function(a,b,c){a(l(function(a,e){e.length<=1&&(e=e[0]),d[b]=e,c(a)}))},function(a){c(a,d)})}function Oa(a,b){Na(Q,a,b)}function Pa(a,b,c){Na(K(b),a,c)}function Qa(a,b){return qa(function(b,c){a(b[0],c)},b,1)}function Ra(a,b){var c=Qa(a,b);return c.push=function(a,b,d){if(null==d&&(d=r),"function"!=typeof d)throw new Error("task callback must be a function");if(c.started=!0,Mb(a)||(a=[a]),0===a.length)return Hc(function(){c.drain()});b=b||0;for(var e=c._tasks.head;e&&b>=e.priority;)e=e.next;V(a,function(a){var f={data:a,priority:b,callback:d};e?c._tasks.insertBefore(e,f):c._tasks.push(f)}),Hc(c.process)},delete c.unshift,c}function Sa(a,b){return b=s(b||r),Mb(a)?a.length?void V(a,function(a){a(b)}):b():b(new TypeError("First argument to race must be an array of functions"))}function Ta(a,b,c,d){var e=cd.call(a).reverse();sa(e,b,c,d)}function Ua(a){return m(function(b,c){return b.push(l(function(a,b){if(a)c(null,{error:a});else{var d=null;1===b.length?d=b[0]:b.length>1&&(d=b),c(null,{value:d})}})),a.apply(this,b)})}function Va(a,b,c,d){Ia(a,b,function(a,b){c(a,function(a,c){a?b(a):b(null,!c)})},d)}function Wa(a){var b;return Mb(a)?b=_(a,Ua):(b={},X(a,function(a,c){b[c]=Ua.call(this,a)})),b}function Xa(a){return function(){return a}}function Ya(a,b,c){function d(a,b){if("object"==typeof b)a.times=+b.times||f,a.intervalFunc="function"==typeof b.interval?b.interval:Xa(+b.interval||g);else{if("number"!=typeof b&&"string"!=typeof b)throw new Error("Invalid arguments for async.retry");a.times=+b||f}}function e(){b(function(a){a&&i++<h.times?setTimeout(e,h.intervalFunc(i)):c.apply(null,arguments)})}var f=5,g=0,h={times:f,intervalFunc:Xa(g)};if(arguments.length<3&&"function"==typeof a?(c=b||r,b=a):(d(h,a),c=c||r),"function"!=typeof b)throw new Error("Invalid arguments for async.retry");var i=1;e()}function Za(a,b){return b||(b=a,a=null),m(function(c,d){function e(a){b.apply(null,c.concat([a]))}a?Ya(a,e,d):Ya(e,d)})}function $a(a,b){Na(Jc,a,b)}function _a(a,b,c){function d(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}Vb(a,function(a,c){b(a,function(b,d){return b?c(b):void c(null,{value:a,criteria:d})})},function(a,b){return a?c(a):void c(null,_(b.sort(d),o("value")))})}function ab(a,b,c){function d(){h||(f.apply(null,arguments),clearTimeout(g))}function e(){var b=a.name||"anonymous",d=new Error('Callback function "'+b+'" timed out.');d.code="ETIMEDOUT",c&&(d.info=c),h=!0,f(d)}var f,g,h=!1;return m(function(c,h){f=h,g=setTimeout(e,b),a.apply(null,c.concat(d))})}function bb(a,b,c,d){for(var e=-1,f=kd(jd((b-a)/(c||1)),0),g=Array(f);f--;)g[d?f:++e]=a,a+=c;return g}function cb(a,b,c,d){Xb(bb(0,a,1),b,c,d)}function db(a,b,c,d){3===arguments.length&&(d=c,c=b,b=Mb(a)?[]:{}),d=s(d||r),Q(a,function(a,d,e){c(b,a,d,e)},function(a){d(a,b)})}function eb(a){return function(){return(a.unmemoized||a).apply(null,arguments)}}function fb(a,b,c){if(c=J(c||r),!a())return c(null);var d=l(function(e,f){return e?c(e):a()?b(d):void c.apply(null,[null].concat(f))});b(d)}function gb(a,b,c){fb(function(){return!a.apply(this,arguments)},b,c)}function hb(a,b){function c(e){if(d===a.length)return b.apply(null,[null].concat(e));var f=J(l(function(a,d){return a?b.apply(null,[a].concat(d)):void c(d)}));e.push(f);var g=a[d++];g.apply(null,e)}if(b=s(b||r),!Mb(a))return b(new Error("First argument to waterfall must be an array of functions"));if(!a.length)return b();var d=0;c([])}var ib,jb="[object Function]",kb="[object GeneratorFunction]",lb=Object.prototype,mb=lb.toString,nb="[object Symbol]",ob=Object.prototype,pb=ob.toString,qb=NaN,rb=/^\s+|\s+$/g,sb=/^[-+]0x[0-9a-f]+$/i,tb=/^0b[01]+$/i,ub=/^0o[0-7]+$/i,vb=parseInt,wb=1/0,xb=1.7976931348623157e308,yb="Expected a function",zb=Math.max,Ab=o("length"),Bb=9007199254740991,Cb="function"==typeof Symbol&&Symbol.iterator,Db=Object.getPrototypeOf,Eb=Object.prototype,Fb=Eb.hasOwnProperty,Gb=Object.keys,Hb="[object Arguments]",Ib=Object.prototype,Jb=Ib.hasOwnProperty,Kb=Ib.toString,Lb=Ib.propertyIsEnumerable,Mb=Array.isArray,Nb="[object String]",Ob=Object.prototype,Pb=Ob.toString,Qb=9007199254740991,Rb=/^(?:0|[1-9]\d*)$/,Sb=Object.prototype,Tb="Expected a function",Ub=M(L,1/0),Vb=R(S),Wb=n(Vb),Xb=T(S),Yb=M(Xb,1),Zb=n(Yb),$b=l(function(a,b){return l(function(c){return a.apply(null,b.concat(c))})}),_b=W(),ac=ba("object"==typeof e&&e),bc=ba("object"==typeof self&&self),cc=ba("object"==typeof this&&this),dc=ac||bc||cc||Function("return this")(),ec=dc.Symbol,fc=1/0,gc=ec?ec.prototype:void 0,hc=gc?gc.toString:void 0,ic="\\ud800-\\udfff",jc="\\u0300-\\u036f\\ufe20-\\ufe23",kc="\\u20d0-\\u20f0",lc="\\ufe0e\\ufe0f",mc="["+ic+"]",nc="["+jc+kc+"]",oc="\\ud83c[\\udffb-\\udfff]",pc="(?:"+nc+"|"+oc+")",qc="[^"+ic+"]",rc="(?:\\ud83c[\\udde6-\\uddff]){2}",sc="[\\ud800-\\udbff][\\udc00-\\udfff]",tc="\\u200d",uc=pc+"?",vc="["+lc+"]?",wc="(?:"+tc+"(?:"+[qc,rc,sc].join("|")+")"+vc+uc+")*",xc=vc+uc+wc,yc="(?:"+[qc+nc+"?",nc,rc,sc,mc].join("|")+")",zc=RegExp(oc+"(?="+oc+")|"+yc+xc,"g"),Ac=/^\s+|\s+$/g,Bc=/^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m,Cc=/,/,Dc=/(=.+)?(\s*)$/,Ec=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,Fc="function"==typeof setImmediate&&setImmediate,Gc="object"==typeof b&&"function"==typeof b.nextTick;ib=Fc?setImmediate:Gc?b.nextTick:ma;var Hc=na(ib);oa.prototype.removeLink=function(a){return a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev,a.prev=a.next=null,this.length-=1,a},oa.prototype.empty=oa,oa.prototype.insertAfter=function(a,b){b.prev=a,b.next=a.next,a.next?a.next.prev=b:this.tail=b,a.next=b,this.length+=1},oa.prototype.insertBefore=function(a,b){b.prev=a.prev,b.next=a,a.prev?a.prev.next=b:this.head=b,a.prev=b,this.length+=1},oa.prototype.unshift=function(a){this.head?this.insertBefore(this.head,a):pa(this,a)},oa.prototype.push=function(a){this.tail?this.insertAfter(this.tail,a):pa(this,a)},oa.prototype.shift=function(){return this.head&&this.removeLink(this.head)},oa.prototype.pop=function(){return this.tail&&this.removeLink(this.tail)};var Ic,Jc=M(L,1),Kc=l(function(a){return l(function(b){var c=this,d=b[b.length-1];"function"==typeof d?b.pop():d=r,sa(a,b,function(a,b,d){b.apply(c,a.concat([l(function(a,b){d(a,b)})]))},function(a,b){d.apply(c,[a].concat(b))})})}),Lc=l(function(a){return Kc.apply(null,a.reverse())}),Mc=R(ta),Nc=ua(ta),Oc=l(function(a){var b=[null].concat(a);return m(function(a,c){return c.apply(this,b)})}),Pc=wa(Q,va,xa),Qc=wa(L,va,xa),Rc=wa(Jc,va,xa),Sc=ya("dir"),Tc=M(Fa,1),Uc=wa(Q,Ha,Ha),Vc=wa(L,Ha,Ha),Wc=M(Vc,1),Xc=R(Ia),Yc=T(Ia),Zc=M(Yc,1),$c=ya("log"),_c=M(Ka,1/0),ad=M(Ka,1);Ic=Gc?b.nextTick:Fc?setImmediate:ma;var bd=na(Ic),cd=Array.prototype.slice,dd=R(Va),ed=T(Va),fd=M(ed,1),gd=wa(Q,Boolean,va),hd=wa(L,Boolean,va),id=M(hd,1),jd=Math.ceil,kd=Math.max,ld=M(cb,1/0),md=M(cb,1),nd={applyEach:Wb,applyEachSeries:Zb,apply:$b,asyncify:U,auto:$,autoInject:la,cargo:ra,compose:Lc,concat:Mc,concatSeries:Nc,constant:Oc,detect:Pc,detectLimit:Qc,detectSeries:Rc,dir:Sc,doDuring:za,doUntil:Ba,doWhilst:Aa,during:Ca,each:Ea,eachLimit:Fa,eachOf:Q,eachOfLimit:L,eachOfSeries:Jc,eachSeries:Tc,ensureAsync:Ga,every:Uc,everyLimit:Vc,everySeries:Wc,filter:Xc,filterLimit:Yc,filterSeries:Zc,forever:Ja,log:$c,map:Vb,mapLimit:Xb,mapSeries:Yb,mapValues:_c,mapValuesLimit:Ka,mapValuesSeries:ad,memoize:Ma,nextTick:bd,parallel:Oa,parallelLimit:Pa,priorityQueue:Ra,queue:Qa,race:Sa,reduce:sa,reduceRight:Ta,reflect:Ua,reflectAll:Wa,reject:dd,rejectLimit:ed,rejectSeries:fd,retry:Ya,retryable:Za,seq:Kc,series:$a,setImmediate:Hc,some:gd,someLimit:hd,someSeries:id,sortBy:_a,timeout:ab,times:ld,timesLimit:cb,timesSeries:md,transform:db,unmemoize:eb,until:gb,waterfall:hb,whilst:fb,all:Uc,any:gd,forEach:Ea,forEachSeries:Tc,forEachLimit:Fa,forEachOf:Q,forEachOfSeries:Jc,forEachOfLimit:L,inject:sa,foldl:sa,foldr:Ta,select:Xc,selectLimit:Yc,selectSeries:Zc,wrapSync:U};a.default=nd,a.applyEach=Wb,a.applyEachSeries=Zb,a.apply=$b,a.asyncify=U,a.auto=$,a.autoInject=la,a.cargo=ra,a.compose=Lc,a.concat=Mc,a.concatSeries=Nc,a.constant=Oc,a.detect=Pc,a.detectLimit=Qc,a.detectSeries=Rc,a.dir=Sc,a.doDuring=za,a.doUntil=Ba,a.doWhilst=Aa,a.during=Ca,a.each=Ea,a.eachLimit=Fa,a.eachOf=Q,a.eachOfLimit=L,a.eachOfSeries=Jc,a.eachSeries=Tc,a.ensureAsync=Ga,a.every=Uc,a.everyLimit=Vc,a.everySeries=Wc,a.filter=Xc,a.filterLimit=Yc,a.filterSeries=Zc,a.forever=Ja,a.log=$c,a.map=Vb,a.mapLimit=Xb,a.mapSeries=Yb,a.mapValues=_c,a.mapValuesLimit=Ka,a.mapValuesSeries=ad,a.memoize=Ma,a.nextTick=bd,a.parallel=Oa,a.parallelLimit=Pa,a.priorityQueue=Ra,a.queue=Qa,a.race=Sa,a.reduce=sa,a.reduceRight=Ta,a.reflect=Ua,a.reflectAll=Wa,a.reject=dd,a.rejectLimit=ed,a.rejectSeries=fd,a.retry=Ya,a.retryable=Za,a.seq=Kc,a.series=$a,a.setImmediate=Hc,a.some=gd,a.someLimit=hd,a.someSeries=id,a.sortBy=_a,a.timeout=ab,a.times=ld,a.timesLimit=cb,a.timesSeries=md,a.transform=db,a.unmemoize=eb,a.until=gb,a.waterfall=hb,a.whilst=fb,a.all=Uc,a.allLimit=Vc,a.allSeries=Wc,a.any=gd,a.anyLimit=hd,a.anySeries=id,a.find=Pc,a.findLimit=Qc,a.findSeries=Rc,a.forEach=Ea,a.forEachSeries=Tc,a.forEachLimit=Fa,a.forEachOf=Q,a.forEachOfSeries=Jc,a.forEachOfLimit=L,a.inject=sa,a.foldl=sa,a.foldr=Ta,a.select=Xc,a.selectLimit=Yc,a.selectSeries=Zc,a.wrapSync=U})}).call(this,b("bfs-process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"bfs-process":11}],2:[function(a,b,c){"use strict";function d(a,b,c,d,e,f){if(b>e||b<f)throw new TypeError("value is out of bounds");if(c+d>a.length)throw new RangeError("index out of range")}function e(a,b,c,d){if(c+d>a.length)throw new RangeError("index out of range")}function f(a,b,c){if(a+b>c)throw new RangeError("index out of range")}var g=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},h=a("./buffer_core"),i=a("./buffer_core_array"),j=a("./buffer_core_arraybuffer"),k=a("./buffer_core_imagedata"),l=a("./string_util"),m=a("./util"),n=[j,k,i],o=function(){var a,b;for(a=0;a<n.length;a++)if(b=n[a],b.isAvailable())return b;throw new Error("This browser does not support any available BufferCore implementations.")}(),p={};p[0]=0,p[1]=127,p[2]=32767,p[3]=8388607,p[4]=2147483647,p[5]=549755813887,p[6]=0x7fffffffffff;var q={};q[0]=0,q[1]=-128,q[2]=-32768,q[3]=-8388608,q[4]=-2147483648,q[5]=-549755813888,q[6]=-0x800000000000;var r={};r[0]=0,r[1]=255,r[2]=65535,r[3]=16777215,r[4]=4294967295,r[5]=0xffffffffff,r[6]=0xffffffffffff;var s=function(){function a(b,c,d){void 0===c&&(c="utf8");var e;if(!(this instanceof a))return new a(b,c);if(this.offset=0,b instanceof h.BufferCoreCommon){this.data=b;var f="number"==typeof c?c:0,g="number"==typeof d?d:this.data.getLength();this.offset=f,this.length=g-f}else if("number"==typeof b){if(b!==b>>>0)throw new RangeError("Buffer size must be a uint32.");this.length=b,this.data=new o(b)}else if(m.isArrayBufferView(b))this.data=new j(b),this.length=b.byteLength;else if(m.isArrayBuffer(b))this.data=new j(b),this.length=b.byteLength;else if(b instanceof a){var i=b;this.data=new o(b.length),this.length=b.length,i.copy(this)}else if(Array.isArray(b)||null!=b&&"object"==typeof b&&"number"==typeof b[0]){for(this.data=new o(b.length),e=0;e<b.length;e++)this.data.writeUInt8(e,b[e]);this.length=b.length}else if("string"==typeof b)this.length=a.byteLength(b,c),this.data=new o(this.length),this.write(b,0,this.length,c);else{if("Buffer"!==b.type||!Array.isArray(b.data))throw new Error("Invalid argument to Buffer constructor: "+b);for(this.data=new o(b.data.length),e=0;e<b.data.length;e++)this.data.writeUInt8(e,b.data[e]);this.length=b.data.length}}return a.getAvailableBufferCores=function(){return n.filter(function(a){return a.isAvailable()})},a.getPreferredBufferCore=function(){return o},a.setPreferredBufferCore=function(a){o=a},a.prototype.getBufferCore=function(){return this.data},a.prototype.getOffset=function(){return this.offset},a.prototype.set=function(a,b){return b<0?this.writeInt8(b,a):this.writeUInt8(b,a)},a.prototype.get=function(a){return this.readUInt8(a)},a.prototype.write=function(b,c,d,e){if(void 0===c&&(c=0),void 0===d&&(d=this.length),void 0===e&&(e="utf8"),"string"==typeof c?(e=""+c,c=0,d=this.length):"string"==typeof d&&(e=""+d,d=this.length),c>this.length||c<0)throw new RangeError("Invalid offset.");var f=l.FindUtil(e);return d=d+c>this.length?this.length-c:d,c+=this.offset,f.str2byte(b,0===c&&d===this.length?this:new a(this.data,c,d+c))},a.prototype.toString=function(b,c,d){if(void 0===b&&(b="utf8"),void 0===c&&(c=0),void 0===d&&(d=this.length),!(c<=d))throw new Error("Invalid start/end positions: "+c+" - "+d);if(c===d)return"";d>this.length&&(d=this.length);var e=l.FindUtil(b);return e.byte2str(0===c&&d===this.length?this:new a(this.data,c+this.offset,d+this.offset))},a.prototype.toJSON=function(){for(var a=this.length,b=new Array(a),c=0;c<a;c++)b[c]=this.readUInt8(c);return{type:"Buffer",data:b}},a.prototype.inspect=function(){var a,b=[],d=this.length<c.INSPECT_MAX_BYTES?this.length:c.INSPECT_MAX_BYTES;for(a=0;a<d;a++)b.push(this.readUInt8(a).toString(16));return"<Buffer "+b.join(" ")+(this.length>d?" ... ":"")+">"},a.prototype.toArrayBuffer=function(){var b=this.getBufferCore();if(b instanceof j){var c=b.getDataView(),d=c.buffer;return 0===this.offset&&0===c.byteOffset&&c.byteLength===d.byteLength&&this.length===c.byteLength?d:d.slice(this.offset+c.byteOffset,this.length)}var d=new ArrayBuffer(this.length),e=new a(d);return this.copy(e,0,0,this.length),d},a.prototype.toUint8Array=function(){var b=this.getBufferCore();if(b instanceof j){var c=b.getDataView(),d=c.buffer,e=this.offset+c.byteOffset,f=this.length;return new Uint8Array(d).subarray(e,e+f)}var d=new ArrayBuffer(this.length),g=new a(d);return this.copy(g,0,0,this.length),new Uint8Array(d)},a.prototype.indexOf=function(b,c){void 0===c&&(c=0);var d;if("string"==typeof b)d=new a(b,"utf8");else if(a.isBuffer(b))d=b;else{if("number"!=typeof b)throw new TypeError("indexOf only operates on strings, buffers, and numbers.");d=new a([b])}c>2147483647?c=2147483647:c<-2147483648&&(c=-2147483648),c>>=0,c<0&&(c=this.length+c,c<0&&(c=0));var e=0,f=d.length,g=this.length;if(0===f)return-1;for(;e<f&&c<g;)d.readUInt8(e)==this.readUInt8(c)?e++:e=0,c++;return e==f?c-f:-1},a.prototype.copy=function(b,c,d,e){if(void 0===c&&(c=0),void 0===d&&(d=0),void 0===e&&(e=this.length),d<0)throw new RangeError("sourceStart out of bounds");if(e<0)throw new RangeError("sourceEnd out of bounds");if(c<0)throw new RangeError("targetStart out of bounds");if(e<=d||d>=this.length||c>b.length)return 0;var f=Math.min(e-d,b.length-c,this.length-d);if(b instanceof a&&this.data instanceof j){var g=b.getBufferCore();if(g instanceof j)return this.data.copyTo(g,c+b.offset,d+this.offset,d+f+this.offset)}for(var h=0;h<f-3;h+=4)b.writeInt32LE(this.readInt32LE(d+h),c+h);for(var h=4294967292&f;h<f;h++)b.writeUInt8(this.readUInt8(d+h),c+h);return f},a.prototype.slice=function(b,c){if(void 0===b&&(b=0),void 0===c&&(c=this.length),b>>=0,c>>=0,b<0&&(b+=this.length,b<0&&(b=0)),c<0&&(c+=this.length,c<0&&(c=0)),c>this.length&&(c=this.length),b>c&&(b=c),b<0||c<0||b>this.length||c>this.length)throw new Error("Invalid slice indices.");return new a(this.data,b+this.offset,c+this.offset)},a.prototype.sliceCopy=function(b,c){if(void 0===b&&(b=0),void 0===c&&(c=this.length),b<0&&(b+=this.length,b<0&&(b=0)),c<0&&(c+=this.length,c<0&&(c=0)),c>this.length&&(c=this.length),b>c&&(b=c),b<0||c<0||b>=this.length||c>this.length)throw new Error("Invalid slice indices.");return new a(this.data.copy(b+this.offset,c+this.offset))},a.prototype.fill=function(b,c,d){void 0===c&&(c=0),void 0===d&&(d=this.length);if(c>>=0,d>>=0,c<0||d>this.length)throw new RangeError("out of range index");if(d<=c)return this;if("string"!=typeof b)b>>>=0;else if(1===b.length){var e=b.charCodeAt(0);e<256&&(b=e)}if("number"==typeof b)c+=this.offset,d+=this.offset,this.data.fill(b,c,d);else if(b.length>0){for(var f=a.byteLength(b,"utf8"),g=d-f;c<g;)this.write(b,c,f,"utf8"),c+=f;c<d&&this.write(b,c,d-c,"utf8")}return this},a.prototype.readUIntLE=function(a,b,c){void 0===c&&(c=!1),a>>>=0,b>>>=0,c||f(a,b,this.length),a+=this.offset;var d=0;switch(b){case 1:return this.data.readUInt8(a);case 2:return this.data.readUInt16LE(a);case 3:return this.data.readUInt8(a)|this.data.readUInt16LE(a+1)<<8;case 4:return this.data.readUInt32LE(a);case 6:d+=131072*(this.data.readUInt8(a+5)<<23);case 5:return d+=512*(this.data.readUInt8(a+4)<<23),d+this.data.readUInt32LE(a);default:throw new Error("Invalid byteLength: "+b)}},a.prototype.readUIntBE=function(a,b,c){void 0===c&&(c=!1),a>>>=0,b>>>=0,c||f(a,b,this.length),a+=this.offset;var d=0;switch(b){case 1:return this.data.readUInt8(a);case 2:return this.data.readUInt16BE(a);case 3:return this.data.readUInt8(a+2)|this.data.readUInt16BE(a)<<8;case 4:return this.data.readUInt32BE(a);case 6:d+=131072*(this.data.readUInt8(a)<<23),a++;case 5:return d+=512*(this.data.readUInt8(a)<<23),d+this.data.readUInt32BE(a+1);default:throw new Error("Invalid byteLength: "+b)}},a.prototype.readIntLE=function(a,b,c){switch(void 0===c&&(c=!1),a>>>=0,b>>>=0,c||f(a,b,this.length),a+=this.offset,b){case 1:return this.data.readInt8(a);case 2:return this.data.readInt16LE(a);case 3:return this.data.readUInt8(a)|this.data.readInt16LE(a+1)<<8;case 4:return this.data.readInt32LE(a);case 6:return 131072*(this.data.readInt8(a+5)<<23)+this.readUIntLE(a-this.offset,5,c);case 5:return 512*(this.data.readInt8(a+4)<<23)+this.data.readUInt32LE(a);default:throw new Error("Invalid byteLength: "+b)}},a.prototype.readIntBE=function(a,b,c){switch(void 0===c&&(c=!1),a>>>=0,b>>>=0,c||f(a,b,this.length),a+=this.offset,b){case 1:return this.data.readInt8(a);case 2:return this.data.readInt16BE(a);case 3:return this.data.readUInt8(a+2)|this.data.readInt16BE(a)<<8;case 4:return this.data.readInt32BE(a);case 6:return 131072*(this.data.readInt8(a)<<23)+this.readUIntBE(a-this.offset+1,5,c);case 5:return 512*(this.data.readInt8(a)<<23)+this.data.readUInt32BE(a+1);default:throw new Error("Invalid byteLength: "+b)}},a.prototype.readUInt8=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,1,this.length),a+=this.offset,this.data.readUInt8(a)},a.prototype.readUInt16LE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,2,this.length),a+=this.offset,this.data.readUInt16LE(a)},a.prototype.readUInt16BE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,2,this.length),a+=this.offset,this.data.readUInt16BE(a)},a.prototype.readUInt32LE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,4,this.length),a+=this.offset,this.data.readUInt32LE(a)},a.prototype.readUInt32BE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,4,this.length),a+=this.offset,this.data.readUInt32BE(a)},a.prototype.readInt8=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,1,this.length),a+=this.offset,this.data.readInt8(a)},a.prototype.readInt16LE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,2,this.length),a+=this.offset,this.data.readInt16LE(a)},a.prototype.readInt16BE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,2,this.length),a+=this.offset,this.data.readInt16BE(a)},a.prototype.readInt32LE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,4,this.length),a+=this.offset,this.data.readInt32LE(a)},a.prototype.readInt32BE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,4,this.length),a+=this.offset,this.data.readInt32BE(a)},a.prototype.readFloatLE=function(a,b){return void 0===b&&(b=!1),a>>>=0,
b||f(a,4,this.length),a+=this.offset,this.data.readFloatLE(a)},a.prototype.readFloatBE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,4,this.length),a+=this.offset,this.data.readFloatBE(a)},a.prototype.readDoubleLE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,8,this.length),a+=this.offset,this.data.readDoubleLE(a)},a.prototype.readDoubleBE=function(a,b){return void 0===b&&(b=!1),a>>>=0,b||f(a,8,this.length),a+=this.offset,this.data.readDoubleBE(a)},a.prototype.writeUIntLE=function(a,b,c,e){void 0===e&&(e=!1),b>>>=0,e||d(this,a,b,c,r[c],0);var f=b+c;switch(b+=this.offset,c){case 1:this.data.writeUInt8(b,a);break;case 2:this.data.writeUInt16LE(b,a);break;case 3:this.data.writeUInt8(b,255&a),this.data.writeUInt16LE(b+1,a>>8);break;case 4:this.data.writeUInt32LE(b,a);break;case 6:this.data.writeUInt8(b,255&a),a=Math.floor(a/256),b++;case 5:this.data.writeUInt8(b,255&a),a=Math.floor(a/256),this.data.writeUInt32LE(b+1,a);break;default:throw new Error("Invalid byteLength: "+c)}return f},a.prototype.writeUIntBE=function(a,b,c,e){void 0===e&&(e=!1),b>>>=0,e||d(this,a,b,c,r[c],0);var f=b+c;switch(b+=this.offset,c){case 1:this.data.writeUInt8(b,a);break;case 2:this.data.writeUInt16BE(b,a);break;case 3:this.data.writeUInt8(b+2,255&a),this.data.writeUInt16BE(b,a>>8);break;case 4:this.data.writeUInt32BE(b,a);break;case 6:this.data.writeUInt8(b+5,255&a),a=Math.floor(a/256);case 5:this.data.writeUInt8(b+4,255&a),a=Math.floor(a/256),this.data.writeUInt32BE(b,a);break;default:throw new Error("Invalid byteLength: "+c)}return f},a.prototype.writeIntLE=function(a,b,c,e){void 0===e&&(e=!1),b>>>=0,e||d(this,a,b,c,p[c],q[c]);var f=b+c;switch(b+=this.offset,c){case 1:this.data.writeInt8(b,a);break;case 2:this.data.writeInt16LE(b,a);break;case 3:this.data.writeUInt8(b,255&a),this.data.writeInt16LE(b+1,a>>8);break;case 4:this.data.writeInt32LE(b,a);break;case 6:this.data.writeUInt8(b,255&a),a=Math.floor(a/256),b++;case 5:this.data.writeUInt8(b,255&a),a=Math.floor(a/256),this.data.writeInt32LE(b+1,a);break;default:throw new Error("Invalid byteLength: "+c)}return f},a.prototype.writeIntBE=function(a,b,c,e){void 0===e&&(e=!1),b>>>=0,e||d(this,a,b,c,p[c],q[c]);var f=b+c;switch(b+=this.offset,c){case 1:this.data.writeInt8(b,a);break;case 2:this.data.writeInt16BE(b,a);break;case 3:this.data.writeUInt8(b+2,255&a),this.data.writeInt16BE(b,a>>8);break;case 4:this.data.writeInt32BE(b,a);break;case 6:this.data.writeUInt8(b+5,255&a),a=Math.floor(a/256);case 5:this.data.writeUInt8(b+4,255&a),a=Math.floor(a/256),this.data.writeInt32BE(b,a);break;default:throw new Error("Invalid byteLength: "+c)}return f},a.prototype.writeUInt8=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,1,255,0),this.data.writeUInt8(b+this.offset,a),b+1},a.prototype.writeUInt16LE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,2,65535,0),this.data.writeUInt16LE(b+this.offset,a),b+2},a.prototype.writeUInt16BE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,2,65535,0),this.data.writeUInt16BE(b+this.offset,a),b+2},a.prototype.writeUInt32LE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,4,4294967295,0),this.data.writeUInt32LE(b+this.offset,a),b+4},a.prototype.writeUInt32BE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,4,4294967295,0),this.data.writeUInt32BE(b+this.offset,a),b+4},a.prototype.writeInt8=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,1,127,-128),this.data.writeInt8(b+this.offset,a),b+1},a.prototype.writeInt16LE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,2,32767,-32768),this.data.writeInt16LE(b+this.offset,a),b+2},a.prototype.writeInt16BE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,2,32767,-32768),this.data.writeInt16BE(b+this.offset,a),b+2},a.prototype.writeInt32LE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,4,2147483647,-2147483648),this.data.writeInt32LE(b+this.offset,a),b+4},a.prototype.writeInt32BE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||d(this,a,b,4,2147483647,-2147483648),this.data.writeInt32BE(b+this.offset,a),b+4},a.prototype.writeFloatLE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||e(this,a,b,4),this.data.writeFloatLE(b+this.offset,a),b+4},a.prototype.writeFloatBE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||e(this,a,b,4),this.data.writeFloatBE(b+this.offset,a),b+4},a.prototype.writeDoubleLE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||e(this,a,b,8),this.data.writeDoubleLE(b+this.offset,a),b+8},a.prototype.writeDoubleBE=function(a,b,c){return void 0===c&&(c=!1),b>>>=0,c||e(this,a,b,8),this.data.writeDoubleBE(b+this.offset,a),b+8},a.isEncoding=function(a){try{l.FindUtil(a)}catch(a){return!1}return!0},a.compare=function(a,b){if(a===b)return 0;var c,d,e,f=a.length,g=b.length,h=Math.min(f,g);for(c=0;c<h;c++)if(d=a.readUInt8(c),e=b.readUInt8(c),d!==e)return d>e?1:-1;return f===g?0:f>g?1:-1},a.isBuffer=function(b){return b instanceof a},a.byteLength=function(a,b){void 0===b&&(b="utf8");var c;try{c=l.FindUtil(b)}catch(a){c=l.FindUtil("utf8")}return"string"!=typeof a&&(a=""+a),c.byteLength(a)},a.concat=function(b,c){var d;if(0===b.length||0===c)return new a(0);if(void 0===c){c=0;for(var e=0;e<b.length;e++){if(d=b[e],!a.isBuffer(d))throw new TypeError("Concat only operates on Buffer objects.");c+=d.length}}for(var f=new a(c),g=0,h=0;h<b.length;h++){if(d=b[h],!a.isBuffer(d))throw new TypeError("Concat only operates on Buffer objects.");g+=d.copy(f,g)}return f},a.prototype.equals=function(b){if(a.isBuffer(b)){var c;if(b.length!==this.length)return!1;for(c=0;c<this.length;c++)if(this.readUInt8(c)!==b.readUInt8(c))return!1;return!0}throw new TypeError("Argument must be a buffer.")},a.prototype.compare=function(b){return a.compare(this,b)},a}();c.Buffer=s;var t=s,u=function(a){function b(c,d,e){if(a.call(this,+c!=c?0:+c),!(this instanceof b))return new b(c,d,e)}return g(b,a),b.isBuffer=function(a){return s.isBuffer(a)},b.byteLength=function(a,b){return s.byteLength(a,b)},b.concat=function(a,b){return s.concat(a,b)},b}(s);c.SlowBuffer=u,t=u,c.INSPECT_MAX_BYTES=50},{"./buffer_core":3,"./buffer_core_array":4,"./buffer_core_arraybuffer":5,"./buffer_core_imagedata":6,"./string_util":8,"./util":9}],3:[function(a,b,c){"use strict";var d=Math.pow(2,128),e=-1*d,f=2139095040,g=-8388608,h=2143289344,i=function(){function a(){}return a.prototype.getLength=function(){throw new Error("BufferCore implementations should implement getLength.")},a.prototype.writeInt8=function(a,b){this.writeUInt8(a,255&b|(2147483648&b)>>>24)},a.prototype.writeInt16LE=function(a,b){this.writeUInt8(a,255&b),this.writeUInt8(a+1,b>>>8&255|(2147483648&b)>>>24)},a.prototype.writeInt16BE=function(a,b){this.writeUInt8(a+1,255&b),this.writeUInt8(a,b>>>8&255|(2147483648&b)>>>24)},a.prototype.writeInt32LE=function(a,b){this.writeUInt8(a,255&b),this.writeUInt8(a+1,b>>>8&255),this.writeUInt8(a+2,b>>>16&255),this.writeUInt8(a+3,b>>>24&255)},a.prototype.writeInt32BE=function(a,b){this.writeUInt8(a+3,255&b),this.writeUInt8(a+2,b>>>8&255),this.writeUInt8(a+1,b>>>16&255),this.writeUInt8(a,b>>>24&255)},a.prototype.writeUInt8=function(a,b){throw new Error("BufferCore implementations should implement writeUInt8.")},a.prototype.writeUInt16LE=function(a,b){this.writeUInt8(a,255&b),this.writeUInt8(a+1,b>>8&255)},a.prototype.writeUInt16BE=function(a,b){this.writeUInt8(a+1,255&b),this.writeUInt8(a,b>>8&255)},a.prototype.writeUInt32LE=function(a,b){this.writeInt32LE(a,0|b)},a.prototype.writeUInt32BE=function(a,b){this.writeInt32BE(a,0|b)},a.prototype.writeFloatLE=function(a,b){this.writeInt32LE(a,this.float2intbits(b))},a.prototype.writeFloatBE=function(a,b){this.writeInt32BE(a,this.float2intbits(b))},a.prototype.writeDoubleLE=function(a,b){var c=this.double2longbits(b);this.writeInt32LE(a,c[0]),this.writeInt32LE(a+4,c[1])},a.prototype.writeDoubleBE=function(a,b){var c=this.double2longbits(b);this.writeInt32BE(a+4,c[0]),this.writeInt32BE(a,c[1])},a.prototype.readInt8=function(a){var b=this.readUInt8(a);return 128&b?4294967168|b:b},a.prototype.readInt16LE=function(a){var b=this.readUInt16LE(a);return 32768&b?4294934528|b:b},a.prototype.readInt16BE=function(a){var b=this.readUInt16BE(a);return 32768&b?4294934528|b:b},a.prototype.readInt32LE=function(a){return 0|this.readUInt32LE(a)},a.prototype.readInt32BE=function(a){return 0|this.readUInt32BE(a)},a.prototype.readUInt8=function(a){throw new Error("BufferCore implementations should implement readUInt8.")},a.prototype.readUInt16LE=function(a){return this.readUInt8(a+1)<<8|this.readUInt8(a)},a.prototype.readUInt16BE=function(a){return this.readUInt8(a)<<8|this.readUInt8(a+1)},a.prototype.readUInt32LE=function(a){return(this.readUInt8(a+3)<<24|this.readUInt8(a+2)<<16|this.readUInt8(a+1)<<8|this.readUInt8(a))>>>0},a.prototype.readUInt32BE=function(a){return(this.readUInt8(a)<<24|this.readUInt8(a+1)<<16|this.readUInt8(a+2)<<8|this.readUInt8(a+3))>>>0},a.prototype.readFloatLE=function(a){return this.intbits2float(this.readInt32LE(a))},a.prototype.readFloatBE=function(a){return this.intbits2float(this.readInt32BE(a))},a.prototype.readDoubleLE=function(a){return this.longbits2double(this.readInt32LE(a+4),this.readInt32LE(a))},a.prototype.readDoubleBE=function(a){return this.longbits2double(this.readInt32BE(a),this.readInt32BE(a+4))},a.prototype.copy=function(a,b){throw new Error("BufferCore implementations should implement copy.")},a.prototype.fill=function(a,b,c){for(var d=b;d<c;d++)this.writeUInt8(d,a)},a.prototype.float2intbits=function(a){var b,c,d;return 0===a?0:a===Number.POSITIVE_INFINITY?f:a===Number.NEGATIVE_INFINITY?g:isNaN(a)?h:(d=a<0?1:0,a=Math.abs(a),a<=1.1754942106924411e-38&&a>=1.401298464324817e-45?(b=0,c=Math.round(a/Math.pow(2,-126)*Math.pow(2,23)),d<<31|b<<23|c):(b=Math.floor(Math.log(a)/Math.LN2),c=Math.round((a/Math.pow(2,b)-1)*Math.pow(2,23)),d<<31|b+127<<23|c))},a.prototype.double2longbits=function(a){var b,c,d,e;return 0===a?[0,0]:a===Number.POSITIVE_INFINITY?[0,2146435072]:a===Number.NEGATIVE_INFINITY?[0,-1048576]:isNaN(a)?[0,2146959360]:(e=a<0?1<<31:0,a=Math.abs(a),a<=2.225073858507201e-308&&a>=5e-324?(b=0,d=a/Math.pow(2,-1022)*Math.pow(2,52)):(b=Math.floor(Math.log(a)/Math.LN2),a<Math.pow(2,b)&&(b-=1),d=(a/Math.pow(2,b)-1)*Math.pow(2,52),b=b+1023<<20),c=d*Math.pow(2,-32)|0|e|b,[65535&d,c])},a.prototype.intbits2float=function(a){if(a===f)return Number.POSITIVE_INFINITY;if(a===g)return Number.NEGATIVE_INFINITY;var b,c=(2147483648&a)>>>31,h=(2139095040&a)>>>23,i=8388607&a;return b=0===h?Math.pow(-1,c)*i*Math.pow(2,-149):Math.pow(-1,c)*(1+i*Math.pow(2,-23))*Math.pow(2,h-127),(b<e||b>d)&&(b=NaN),b},a.prototype.longbits2double=function(a,b){var c=(2147483648&a)>>>31,d=(2146435072&a)>>>20,e=(1048575&a)*Math.pow(2,32)+b;return 0===d&&0===e?0:2047===d?0===e?1===c?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:NaN:0===d?Math.pow(-1,c)*e*Math.pow(2,-1074):Math.pow(-1,c)*(1+e*Math.pow(2,-52))*Math.pow(2,d-1023)},a}();c.BufferCoreCommon=i},{}],4:[function(a,b,c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("./buffer_core"),f=[4294967040,4294902015,4278255615,16777215],g=function(a){function b(b){a.call(this),this.length=b,this.buff=new Array(Math.ceil(b/4));for(var c=this.buff.length,d=0;d<c;d++)this.buff[d]=0}return d(b,a),b.isAvailable=function(){return!0},b.prototype.getLength=function(){return this.length},b.prototype.writeUInt8=function(a,b){b&=255;var c=a>>2,d=3&a;this.buff[c]=this.buff[c]&f[d],this.buff[c]=this.buff[c]|b<<(d<<3)},b.prototype.readUInt8=function(a){var b=a>>2,c=3&a;return this.buff[b]>>(c<<3)&255},b.prototype.copy=function(a,c){for(var d=new b(c-a),e=a;e<c;e++)d.writeUInt8(e-a,this.readUInt8(e));return d},b.bufferType="Array",b}(e.BufferCoreCommon);b.exports=g},{"./buffer_core":3}],5:[function(a,b,c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("./buffer_core"),f=a("./util"),g=function(a){function b(b){if(a.call(this),"number"==typeof b)this.buff=new DataView(new ArrayBuffer(b));else if(b instanceof DataView)this.buff=b;else if(f.isArrayBufferView(b))this.buff=new DataView(b.buffer,b.byteOffset,b.byteLength);else{if(!f.isArrayBuffer(b))throw new TypeError("Invalid argument.");this.buff=new DataView(b)}this.length=this.buff.byteLength}return d(b,a),b.isAvailable=function(){return"undefined"!=typeof DataView},b.prototype.getLength=function(){return this.length},b.prototype.writeInt8=function(a,b){this.buff.setInt8(a,b)},b.prototype.writeInt16LE=function(a,b){this.buff.setInt16(a,b,!0)},b.prototype.writeInt16BE=function(a,b){this.buff.setInt16(a,b,!1)},b.prototype.writeInt32LE=function(a,b){this.buff.setInt32(a,b,!0)},b.prototype.writeInt32BE=function(a,b){this.buff.setInt32(a,b,!1)},b.prototype.writeUInt8=function(a,b){this.buff.setUint8(a,b)},b.prototype.writeUInt16LE=function(a,b){this.buff.setUint16(a,b,!0)},b.prototype.writeUInt16BE=function(a,b){this.buff.setUint16(a,b,!1)},b.prototype.writeUInt32LE=function(a,b){this.buff.setUint32(a,b,!0)},b.prototype.writeUInt32BE=function(a,b){this.buff.setUint32(a,b,!1)},b.prototype.writeFloatLE=function(a,b){this.buff.setFloat32(a,b,!0)},b.prototype.writeFloatBE=function(a,b){this.buff.setFloat32(a,b,!1)},b.prototype.writeDoubleLE=function(a,b){this.buff.setFloat64(a,b,!0)},b.prototype.writeDoubleBE=function(a,b){this.buff.setFloat64(a,b,!1)},b.prototype.readInt8=function(a){return this.buff.getInt8(a)},b.prototype.readInt16LE=function(a){return this.buff.getInt16(a,!0)},b.prototype.readInt16BE=function(a){return this.buff.getInt16(a,!1)},b.prototype.readInt32LE=function(a){return this.buff.getInt32(a,!0)},b.prototype.readInt32BE=function(a){return this.buff.getInt32(a,!1)},b.prototype.readUInt8=function(a){return this.buff.getUint8(a)},b.prototype.readUInt16LE=function(a){return this.buff.getUint16(a,!0)},b.prototype.readUInt16BE=function(a){return this.buff.getUint16(a,!1)},b.prototype.readUInt32LE=function(a){return this.buff.getUint32(a,!0)},b.prototype.readUInt32BE=function(a){return this.buff.getUint32(a,!1)},b.prototype.readFloatLE=function(a){return this.buff.getFloat32(a,!0)},b.prototype.readFloatBE=function(a){return this.buff.getFloat32(a,!1)},b.prototype.readDoubleLE=function(a){return this.buff.getFloat64(a,!0)},b.prototype.readDoubleBE=function(a){return this.buff.getFloat64(a,!1)},b.prototype.copy=function(a,c){var d,e=this.buff.buffer,f=this.buff.byteOffset;if(ArrayBuffer.prototype.slice)d=e.slice(f+a,f+c);else{var g=c-a;d=new ArrayBuffer(g);var h=new Uint8Array(d),i=new Uint8Array(e,f);h.set(i.subarray(a,c))}return new b(d)},b.prototype.copyTo=function(a,b,c,d){var e=new Uint8Array(a.buff.buffer,a.buff.byteOffset),f=new Uint8Array(this.buff.buffer,this.buff.byteOffset+c,d-c);return e.set(f,b),d-c},b.prototype.fill=function(a,b,c){a=255&a;var d,e=c-b,f=4*(e/4|0),g=a<<24|a<<16|a<<8|a;for(d=0;d<f;d+=4)this.writeInt32LE(d+b,g);for(d=f;d<e;d++)this.writeUInt8(d+b,a)},b.prototype.getDataView=function(){return this.buff},b.bufferType="ArrayBuffer",b}(e.BufferCoreCommon);b.exports=g},{"./buffer_core":3,"./util":9}],6:[function(a,b,c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("./buffer_core"),f=function(a){function b(c){a.call(this),this.length=c,this.buff=b.getCanvasPixelArray(c)}return d(b,a),b.getCanvasPixelArray=function(a){var c=b.imageDataFactory;return void 0===c&&(b.imageDataFactory=c=document.createElement("canvas").getContext("2d")),0===a&&(a=1),c.createImageData(Math.ceil(a/4),1).data},b.isAvailable=function(){return"undefined"!=typeof CanvasPixelArray&&void 0!==document.createElement("canvas").getContext},b.prototype.getLength=function(){return this.length},b.prototype.writeUInt8=function(a,b){this.buff[a]=b},b.prototype.readUInt8=function(a){return this.buff[a]},b.prototype.copy=function(a,c){for(var d=new b(c-a),e=a;e<c;e++)d.writeUInt8(e-a,this.buff[e]);return d},b.bufferType="ImageData",b}(e.BufferCoreCommon);b.exports=f},{"./buffer_core":3}],7:[function(a,b,c){"use strict";var d=function(){function a(){}return a.str2byte=function(b,c){for(var d=b.length>c.length?c.length:b.length,e=0;e<d;e++){var f=b.charCodeAt(e);if(f>127){var g=a.extendedChars.indexOf(b.charAt(e));g>-1&&(f=g+128)}c.writeUInt8(f,e)}return d},a.byte2str=function(b){for(var c=new Array(b.length),d=0;d<b.length;d++){var e=b.readUInt8(d);e>127?c[d]=a.extendedChars[e-128]:c[d]=String.fromCharCode(e)}return c.join("")},a.byteLength=function(a){return a.length},a.extendedChars=["Ç","ü","é","â","ä","à","å","ç","ê","ë","è","ï","î","ì","Ä","Å","É","æ","Æ","ô","ö","ò","û","ù","ÿ","Ö","Ü","ø","£","Ø","×","ƒ","á","í","ó","ú","ñ","Ñ","ª","º","¿","®","¬","½","¼","¡","«","»","_","_","_","¦","¦","Á","Â","À","©","¦","¦","+","+","¢","¥","+","+","-","-","+","-","+","ã","Ã","+","+","-","-","¦","-","+","¤","ð","Ð","Ê","Ë","È","i","Í","Î","Ï","+","+","_","_","¦","Ì","_","Ó","ß","Ô","Ò","õ","Õ","µ","þ","Þ","Ú","Û","Ù","ý","Ý","¯","´","­","±","_","¾","¶","§","÷","¸","°","¨","·","¹","³","²","_"," "],a}();c.__esModule=!0,c.default=d},{}],8:[function(a,b,c){"use strict";function d(a){var b,c=a.length,d=(c-1>>13)+1,e=new Array(d);for(b=0;b<d;b++)e[b]=g.apply(String,a.slice(8192*b,8192*(b+1)));return e.join("")}function e(a){switch(a=function(){switch(typeof a){case"object":return""+a;case"string":return a;default:throw new TypeError("Invalid encoding argument specified")}}(),a=a.toLowerCase()){case"utf8":case"utf-8":return h;case"ascii":return i;case"binary":return j;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return l;case"hex":return m;case"base64":return k;case"binary_string":return n;case"binary_string_ie":return o;case"extended_ascii":return f.default;default:throw new TypeError("Unknown encoding: "+a)}}var f=a("./extended_ascii"),g=String.fromCharCode;c.fromCharCodes=d,c.FindUtil=e;var h=function(){function a(){}return a.str2byte=function(a,b){for(var c=b.length,d=0,e=0,f=a.length;d<f&&e<c;){var g=a.charCodeAt(d++);if(55296<=g&&g<=56319){if(e+3>=c||d>=f)break;var h=a.charCodeAt(d);if(56320<=h&&h<=57343){var i=(1023&g|1024)<<10|1023&h;b.writeUInt8(i>>18|240,e++),b.writeUInt8(i>>12&63|128,e++),b.writeUInt8(i>>6&63|128,e++),b.writeUInt8(63&i|128,e++),d++}else b.writeUInt8(239,e++),b.writeUInt8(191,e++),b.writeUInt8(189,e++)}else if(56320<=g&&g<=57343)b.writeUInt8(239,e++),b.writeUInt8(191,e++),b.writeUInt8(189,e++);else if(g<128)b.writeUInt8(g,e++);else if(g<2048){if(e+1>=c)break;b.writeUInt8(g>>6|192,e++),b.writeUInt8(63&g|128,e++)}else if(g<65536){if(e+2>=c)break;b.writeUInt8(g>>12|224,e++),b.writeUInt8(g>>6&63|128,e++),b.writeUInt8(63&g|128,e++)}}return e},a.byte2str=function(a){for(var b=[],c=0;c<a.length;){var e=a.readUInt8(c++);if(e<128)b.push(e);else{if(e<192)throw new Error("Found incomplete part of character in string.");if(e<224)b.push((31&e)<<6|63&a.readUInt8(c++));else if(e<240)b.push((15&e)<<12|(63&a.readUInt8(c++))<<6|63&a.readUInt8(c++));else{if(!(e<248))throw new Error("Unable to represent UTF-8 string as UTF-16 JavaScript string.");var f=a.readUInt8(c+2);b.push(1023&((7&e)<<8|(63&a.readUInt8(c++))<<2|(63&a.readUInt8(c++))>>4)|55296),b.push((15&f)<<6|63&a.readUInt8(c++)|56320)}}}return d(b)},a.byteLength=function(a){for(var b=a.length,c=a.length-1;c>=0;c--){var d=a.charCodeAt(c);d>127&&d<=2047?b++:d>2047&&d<=65535&&(b+=2),d>=56320&&d<=57343&&c--}return b},a}();c.UTF8=h;var i=function(){function a(){}return a.str2byte=function(a,b){for(var c=a.length>b.length?b.length:a.length,d=0;d<c;d++)b.writeUInt8(a.charCodeAt(d)%256,d);return c},a.byte2str=function(a){for(var b=new Array(a.length),c=0;c<a.length;c++)b[c]=127&a.readUInt8(c);return d(b)},a.byteLength=function(a){return a.length},a}();c.ASCII=i;var j=function(){function a(){}return a.str2byte=function(a,b){for(var c=a.length>b.length?b.length:a.length,d=0;d<c;d++)b.writeUInt8(255&a.charCodeAt(d),d);return c},a.byte2str=function(a){for(var b=new Array(a.length),c=0;c<a.length;c++)b[c]=255&a.readUInt8(c);return d(b)},a.byteLength=function(a){return a.length},a}();c.BINARY=j;var k=function(){function a(){}return a.byte2str=function(b){for(var c="",d=0;d<b.length;){var e=b.readUInt8(d++),f=d<b.length?b.readUInt8(d++):NaN,g=d<b.length?b.readUInt8(d++):NaN,h=e>>2,i=(3&e)<<4|f>>4,j=(15&f)<<2|g>>6,k=63&g;isNaN(f)?j=k=64:isNaN(g)&&(k=64),c=c+a.num2b64[h]+a.num2b64[i]+a.num2b64[j]+a.num2b64[k]}return c},a.str2byte=function(b,c){var d=c.length,e="",f=0;b=b.replace(/[^A-Za-z0-9\+\/\=\-\_]/g,"");for(var g=0;f<b.length&&g<c.length;){var h=a.b642num[b.charAt(f++)],i=a.b642num[b.charAt(f++)],j=a.b642num[b.charAt(f++)],k=a.b642num[b.charAt(f++)],l=h<<2|i>>4,m=(15&i)<<4|j>>2,n=(3&j)<<6|k;if(c.writeUInt8(l,g++),g===d)break;if(64!==j&&(e+=c.writeUInt8(m,g++)),g===d)break;if(64!==k&&(e+=c.writeUInt8(n,g++)),g===d)break}return g},a.byteLength=function(a){return Math.floor(6*a.replace(/[^A-Za-z0-9\+\/\-\_]/g,"").length/8)},a.b64chars=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/","="],a.num2b64=function(){for(var b=new Array(a.b64chars.length),c=0;c<a.b64chars.length;c++){var d=a.b64chars[c];b[c]=d}return b}(),a.b642num=function(){for(var b={},c=0;c<a.b64chars.length;c++){var d=a.b64chars[c];b[d]=c}return b["-"]=62,b._=63,b}(),a}();c.BASE64=k;var l=function(){function a(){}return a.str2byte=function(a,b){var c=a.length;2*c>b.length&&(c=b.length%2===1?(b.length-1)/2:b.length/2);for(var d=0;d<c;d++)b.writeUInt16LE(a.charCodeAt(d),2*d);return 2*c},a.byte2str=function(a){if(a.length%2!==0)throw new Error("Invalid UCS2 byte array.");for(var b=new Array(a.length/2),c=0;c<a.length;c+=2)b[c/2]=String.fromCharCode(a.readUInt8(c)|a.readUInt8(c+1)<<8);return b.join("")},a.byteLength=function(a){return 2*a.length},a}();c.UCS2=l;var m=function(){function a(){}return a.str2byte=function(a,b){if(a.length%2===1)throw new Error("Invalid hex string");var c=a.length>>1;c>b.length&&(c=b.length);for(var d=0;d<c;d++){var e=this.hex2num[a.charAt(d<<1)],f=this.hex2num[a.charAt((d<<1)+1)];b.writeUInt8(e<<4|f,d)}return c},a.byte2str=function(a){for(var b=a.length,c=new Array(b<<1),d=0,e=0;e<b;e++){var f=15&a.readUInt8(e),g=a.readUInt8(e)>>4;c[d++]=this.num2hex[g],c[d++]=this.num2hex[f]}return c.join("")},a.byteLength=function(a){return a.length>>1},a.HEXCHARS="0123456789abcdef",a.num2hex=function(){for(var b=new Array(a.HEXCHARS.length),c=0;c<a.HEXCHARS.length;c++){var d=a.HEXCHARS[c];b[c]=d}return b}(),a.hex2num=function(){var b,c,d={};for(b=0;b<a.HEXCHARS.length;b++)c=a.HEXCHARS[b],d[c]=b;var e="ABCDEF";for(b=0;b<e.length;b++)c=e[b],d[c]=b+10;return d}(),a}();c.HEX=m;var n=function(){function a(){}return a.str2byte=function(b,c){if(0===b.length)return 0;var d=a.byteLength(b);d>c.length&&(d=c.length);var e=0,f=0,g=f+d,h=b.charCodeAt(e++);0!==h&&(c.writeUInt8(255&h,0),f=1);for(var i=f;i<g;i+=2){var j=b.charCodeAt(e++);g-i===1&&c.writeUInt8(j>>8,i),g-i>=2&&c.writeUInt16BE(j,i)}return d},a.byte2str=function(a){var b=a.length;if(0===b)return"";var c,e=(b>>1)+1,f=new Array(e),g=0;for(1===(1&b)?f[0]=256|a.readUInt8(g++):f[0]=0,c=1;c<e;c++)f[c]=a.readUInt16BE(g),g+=2;return d(f)},a.byteLength=function(a){if(0===a.length)return 0;var b=a.charCodeAt(0),c=a.length-1<<1;return 0!==b&&c++,c},a}();c.BINSTR=n;var o=function(){function a(){}return a.str2byte=function(a,b){for(var c=a.length>b.length?b.length:a.length,d=0;d<c;d++)b.writeUInt8(a.charCodeAt(d)-32,d);return c},a.byte2str=function(a){for(var b=new Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(a.readUInt8(c)+32);return b.join("")},a.byteLength=function(a){return a.length},a}();c.BINSTRIE=o},{"./extended_ascii":7}],9:[function(a,b,c){"use strict";"undefined"==typeof ArrayBuffer?(c.isArrayBufferView=function(a){return!1},c.isArrayBuffer=function(a){return!1}):(c.isArrayBuffer=function(a){return"number"==typeof a.byteLength},ArrayBuffer.isView?c.isArrayBufferView=function(a){return ArrayBuffer.isView(a)}:c.isArrayBufferView=function(a){return c.isArrayBuffer(a.buffer)})},{}],10:[function(a,b,c){(function(a){"use strict";function c(a){var b=d.exec(a);return b.shift(),b}var d=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,e=function(){function b(){}return b.normalize=function(a){""===a&&(a=".");var c=a.charAt(0)===b.sep;a=b._removeDuplicateSeps(a);for(var d=a.split(b.sep),e=[],f=0;f<d.length;f++){var g=d[f];"."!==g&&(".."===g&&(c||!c&&e.length>0&&".."!==e[0])?e.pop():e.push(g))}if(!c&&e.length<2)switch(e.length){case 1:""===e[0]&&e.unshift(".");break;default:e.push(".")}return a=e.join(b.sep),c&&a.charAt(0)!==b.sep&&(a=b.sep+a),a},b.join=function(){for(var a=[],c=0;c<arguments.length;c++)a[c-0]=arguments[c];for(var d=[],e=0;e<a.length;e++){var f=a[e];if("string"!=typeof f)throw new TypeError("Invalid argument type to path.join: "+typeof f);""!==f&&d.push(f)}return b.normalize(d.join(b.sep))},b.resolve=function(){for(var c=[],d=0;d<arguments.length;d++)c[d-0]=arguments[d];for(var e=[],f=0;f<c.length;f++){var g=c[f];if("string"!=typeof g)throw new TypeError("Invalid argument type to path.join: "+typeof g);""!==g&&(g.charAt(0)===b.sep&&(e=[]),e.push(g))}var h=b.normalize(e.join(b.sep));if(h.length>1&&h.charAt(h.length-1)===b.sep)return h.substr(0,h.length-1);if(h.charAt(0)!==b.sep){"."!==h.charAt(0)||1!==h.length&&h.charAt(1)!==b.sep||(h=1===h.length?"":h.substr(2));var i=a.cwd();h=""!==h?this.normalize(i+("/"!==i?b.sep:"")+h):i}return h},b.relative=function(a,c){var d;a=b.resolve(a),c=b.resolve(c);var e=a.split(b.sep),f=c.split(b.sep);f.shift(),e.shift();var g=0,h=[];for(d=0;d<e.length;d++){var i=e[d];if(i!==f[d]){g=e.length-d;break}}h=f.slice(d),1===e.length&&""===e[0]&&(g=0),g>e.length&&(g=e.length);var j="";for(d=0;d<g;d++)j+="../";return j+=h.join(b.sep),j.length>1&&j.charAt(j.length-1)===b.sep&&(j=j.substr(0,j.length-1)),j},b.dirname=function(a){a=b._removeDuplicateSeps(a);var c=a.charAt(0)===b.sep,d=a.split(b.sep);return""===d.pop()&&d.length>0&&d.pop(),d.length>1||1===d.length&&!c?d.join(b.sep):c?b.sep:"."},b.basename=function(a,c){if(void 0===c&&(c=""),""===a)return a;a=b.normalize(a);var d=a.split(b.sep),e=d[d.length-1];if(""===e&&d.length>1)return d[d.length-2];if(c.length>0){var f=e.substr(e.length-c.length);if(f===c)return e.substr(0,e.length-c.length)}return e},b.extname=function(a){a=b.normalize(a);var c=a.split(b.sep);if(a=c.pop(),""===a&&c.length>0&&(a=c.pop()),".."===a)return"";var d=a.lastIndexOf(".");return d===-1||0===d?"":a.substr(d)},b.isAbsolute=function(a){return a.length>0&&a.charAt(0)===b.sep},b._makeLong=function(a){return a},b.parse=function(a){var b=c(a);return{root:b[0],dir:b[0]+b[1].slice(0,-1),base:b[2],ext:b[3],name:b[2].slice(0,b[2].length-b[3].length)}},b.format=function(a){if(null===a||"object"!=typeof a)throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof a);var c=a.root||"";if("string"!=typeof c)throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof a.root);var d=a.dir?a.dir+b.sep:"",e=a.base||"";return d+e},b._removeDuplicateSeps=function(a){return a=a.replace(this._replaceRegex,this.sep)},b.sep="/",b._replaceRegex=new RegExp("//+","g"),b.delimiter=":",b.posix=b,b.win32=b,b}();b.exports=e}).call(this,a("bfs-process"))},{"bfs-process":11}],11:[function(a,b,c){"use strict";function d(a){g[a]||("function"==typeof f[a]?g[a]=function(){return f[a].apply(f,arguments)}:g[a]=f[a])}var e=a("./process"),f=new e,g={};for(var h in f)d(h);g.initializeTTYs=function(){null===f.stdin&&(f.initializeTTYs(),g.stdin=f.stdin,g.stdout=f.stdout,g.stderr=f.stderr)},f.nextTick(function(){g.initializeTTYs()}),b.exports=g},{"./process":12}],12:[function(a,b,c){(function(c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("events"),f=null,g=function(){function a(a,b){this.fun=a,this.array=b}return a.prototype.run=function(){this.fun.apply(null,this.array)},a}(),h=function(){function a(){this._queue=[],this._draining=!1,this._currentQueue=null,this._queueIndex=-1}return a.prototype.push=function(a){var b=this;1!==this._queue.push(a)||this._draining||setTimeout(function(){return b._drainQueue()},0)},a.prototype._cleanUpNextTick=function(){this._draining=!1,this._currentQueue&&this._currentQueue.length?this._queue=this._currentQueue.concat(this._queue):this._queueIndex=-1,this._queue.length&&this._drainQueue()},a.prototype._drainQueue=function(){var a=this;if(!this._draining){var b=setTimeout(function(){return a._cleanUpNextTick()});this._draining=!0;for(var c=this._queue.length;c;){for(this._currentQueue=this._queue,this._queue=[];++this._queueIndex<c;)this._currentQueue&&this._currentQueue[this._queueIndex].run();this._queueIndex=-1,c=this._queue.length}this._currentQueue=null,this._draining=!1,clearTimeout(b)}},a}(),i=function(b){function e(){b.apply(this,arguments),this.startTime=Date.now(),this._cwd="/",this.platform="browser",this.argv=[],this.execArgv=[],this.stdout=null,this.stderr=null,this.stdin=null,this.domain=null,this._queue=new h,this.execPath=c,this.env={},this.exitCode=0,this._gid=1,this._uid=1,this.version="v5.0",this.versions={http_parser:"0.0",node:"5.0",v8:"0.0",uv:"0.0",zlib:"0.0",ares:"0.0",icu:"0.0",modules:"0",openssl:"0.0"},this.config={target_defaults:{cflags:[],default_configuration:"Release",defines:[],include_dirs:[],libraries:[]},variables:{clang:0,host_arch:"x32",node_install_npm:!1,node_install_waf:!1,node_prefix:"",node_shared_cares:!1,node_shared_http_parser:!1,node_shared_libuv:!1,node_shared_zlib:!1,node_shared_v8:!1,node_use_dtrace:!1,node_use_etw:!1,node_use_openssl:!1,node_shared_openssl:!1,strict_aliasing:!1,target_arch:"x32",v8_use_snapshot:!1,v8_no_strict_aliasing:0,visibility:""}},this.pid=1e3*Math.random()|0,this.title="node",this.arch="x32",this._mask=18,this.connected=void 0}return d(e,b),e.prototype.chdir=function(b){null===f&&(f=a("path")),this._cwd=f.resolve(b)},e.prototype.cwd=function(){return this._cwd},e.prototype.uptime=function(){return(Date.now()-this.startTime)/1e3|0},e.prototype.nextTick=function(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];this._queue.push(new g(a,b))},e.prototype.abort=function(){this.emit("abort")},e.prototype.exit=function(a){this.exitCode=a,this.emit("exit",[a])},e.prototype.getgid=function(){return this._gid},e.prototype.setgid=function(a){"number"==typeof a?this._gid=a:this._gid=1},e.prototype.getuid=function(){return this._uid},e.prototype.setuid=function(a){"number"==typeof a?this._uid=a:this._uid=1},e.prototype.kill=function(a,b){this.emit("kill",[a,b])},e.prototype.memoryUsage=function(){return{rss:0,heapTotal:0,heapUsed:0}},e.prototype.umask=function(a){void 0===a&&(a=this._mask);var b=this._mask;return this._mask=a,this.emit("umask",[a]),b},e.prototype.hrtime=function(){var a;a="undefined"!=typeof performance?performance.now():Date.now?Date.now():(new Date).getTime();var b=a/1e3|0;return a-=1e3*b,a=1e6*a|0,[b,a]},e.prototype.initializeTTYs=function(){if(null===this.stdout){var b=a("./tty");this.stdout=new b,this.stderr=new b,this.stdin=new b}},e.prototype.disconnect=function(){},e}(e.EventEmitter);b.exports=i}).call(this,"/node_modules/bfs-process/js")},{"./tty":13,events:17,path:10}],13:[function(a,b,c){(function(c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,
new c)},e=a("stream"),f=function(a){function b(){a.call(this),this.isRaw=!1,this.columns=80,this.rows=120,this.isTTY=!0,this._bufferedWrites=[],this._waitingForWrites=!1}return d(b,a),b.prototype.setRawMode=function(a){this.isRaw!==a&&(this.isRaw=a,this.emit("modeChange"))},b.prototype.changeColumns=function(a){a!==this.columns&&(this.columns=a,this.emit("resize"))},b.prototype.changeRows=function(a){a!==this.rows&&(this.rows=a,this.emit("resize"))},b.isatty=function(a){return a&&a instanceof b},b.prototype._write=function(a,b,d){var e;try{var f;f="string"==typeof a?new c(a,b):a,this._bufferedWrites.push(f),this._waitingForWrites&&this._read(1024)}catch(a){e=a}finally{d(e)}},b.prototype._read=function(a){if(0===this._bufferedWrites.length)this._waitingForWrites=!0;else for(;this._bufferedWrites.length>0&&(this._waitingForWrites=this.push(this._bufferedWrites.shift()),this._waitingForWrites););},b}(e.Duplex);b.exports=f}).call(this,a("bfs-buffer").Buffer)},{"bfs-buffer":2,stream:34}],14:[function(a,b,c){},{}],15:[function(a,b,c){(function(b){"use strict";var d=a("buffer"),e=d.Buffer,f=d.SlowBuffer,g=d.kMaxLength||2147483647;c.alloc=function(a,b,c){if("function"==typeof e.alloc)return e.alloc(a,b,c);if("number"==typeof c)throw new TypeError("encoding must not be number");if("number"!=typeof a)throw new TypeError("size must be a number");if(a>g)throw new RangeError("size is too large");var d=c,f=b;void 0===f&&(d=void 0,f=0);var h=new e(a);if("string"==typeof f)for(var i=new e(f,d),j=i.length,k=-1;++k<a;)h[k]=i[k%j];else h.fill(f);return h},c.allocUnsafe=function(a){if("function"==typeof e.allocUnsafe)return e.allocUnsafe(a);if("number"!=typeof a)throw new TypeError("size must be a number");if(a>g)throw new RangeError("size is too large");return new e(a)},c.from=function(a,c,d){if("function"==typeof e.from&&(!b.Uint8Array||Uint8Array.from!==e.from))return e.from(a,c,d);if("number"==typeof a)throw new TypeError('"value" argument must not be a number');if("string"==typeof a)return new e(a,c);if("undefined"!=typeof ArrayBuffer&&a instanceof ArrayBuffer){var f=c;if(1===arguments.length)return new e(a);"undefined"==typeof f&&(f=0);var g=d;if("undefined"==typeof g&&(g=a.byteLength-f),f>=a.byteLength)throw new RangeError("'offset' is out of bounds");if(g>a.byteLength-f)throw new RangeError("'length' is out of bounds");return new e(a.slice(f,f+g))}if(e.isBuffer(a)){var h=new e(a.length);return a.copy(h,0,0,a.length),h}if(a){if(Array.isArray(a)||"undefined"!=typeof ArrayBuffer&&a.buffer instanceof ArrayBuffer||"length"in a)return new e(a);if("Buffer"===a.type&&Array.isArray(a.data))return new e(a.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")},c.allocUnsafeSlow=function(a){if("function"==typeof e.allocUnsafeSlow)return e.allocUnsafeSlow(a);if("number"!=typeof a)throw new TypeError("size must be a number");if(a>=g)throw new RangeError("size is too large");return new f(a)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{buffer:2}],16:[function(a,b,c){(function(a){function b(a){return Array.isArray?Array.isArray(a):"[object Array]"===q(a)}function d(a){return"boolean"==typeof a}function e(a){return null===a}function f(a){return null==a}function g(a){return"number"==typeof a}function h(a){return"string"==typeof a}function i(a){return"symbol"==typeof a}function j(a){return void 0===a}function k(a){return"[object RegExp]"===q(a)}function l(a){return"object"==typeof a&&null!==a}function m(a){return"[object Date]"===q(a)}function n(a){return"[object Error]"===q(a)||a instanceof Error}function o(a){return"function"==typeof a}function p(a){return null===a||"boolean"==typeof a||"number"==typeof a||"string"==typeof a||"symbol"==typeof a||"undefined"==typeof a}function q(a){return Object.prototype.toString.call(a)}c.isArray=b,c.isBoolean=d,c.isNull=e,c.isNullOrUndefined=f,c.isNumber=g,c.isString=h,c.isSymbol=i,c.isUndefined=j,c.isRegExp=k,c.isObject=l,c.isDate=m,c.isError=n,c.isFunction=o,c.isPrimitive=p,c.isBuffer=a.isBuffer}).call(this,{isBuffer:a("../../is-buffer/index.js")})},{"../../is-buffer/index.js":19}],17:[function(a,b,c){function d(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function e(a){return"function"==typeof a}function f(a){return"number"==typeof a}function g(a){return"object"==typeof a&&null!==a}function h(a){return void 0===a}b.exports=d,d.EventEmitter=d,d.prototype._events=void 0,d.prototype._maxListeners=void 0,d.defaultMaxListeners=10,d.prototype.setMaxListeners=function(a){if(!f(a)||a<0||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},d.prototype.emit=function(a){var b,c,d,f,i,j;if(this._events||(this._events={}),"error"===a&&(!this._events.error||g(this._events.error)&&!this._events.error.length)){if(b=arguments[1],b instanceof Error)throw b;var k=new Error('Uncaught, unspecified "error" event. ('+b+")");throw k.context=b,k}if(c=this._events[a],h(c))return!1;if(e(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:f=Array.prototype.slice.call(arguments,1),c.apply(this,f)}else if(g(c))for(f=Array.prototype.slice.call(arguments,1),j=c.slice(),d=j.length,i=0;i<d;i++)j[i].apply(this,f);return!0},d.prototype.addListener=function(a,b){var c;if(!e(b))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,e(b.listener)?b.listener:b),this._events[a]?g(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,g(this._events[a])&&!this._events[a].warned&&(c=h(this._maxListeners)?d.defaultMaxListeners:this._maxListeners,c&&c>0&&this._events[a].length>c&&(this._events[a].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),"function"==typeof console.trace&&console.trace())),this},d.prototype.on=d.prototype.addListener,d.prototype.once=function(a,b){function c(){this.removeListener(a,c),d||(d=!0,b.apply(this,arguments))}if(!e(b))throw TypeError("listener must be a function");var d=!1;return c.listener=b,this.on(a,c),this},d.prototype.removeListener=function(a,b){var c,d,f,h;if(!e(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,d=-1,c===b||e(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(g(c)){for(h=f;h-- >0;)if(c[h]===b||c[h].listener&&c[h].listener===b){d=h;break}if(d<0)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(d,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},d.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],e(c))this.removeListener(a,c);else if(c)for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},d.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?e(this._events[a])?[this._events[a]]:this._events[a].slice():[]},d.prototype.listenerCount=function(a){if(this._events){var b=this._events[a];if(e(b))return 1;if(b)return b.length}return 0},d.listenerCount=function(a,b){return a.listenerCount(b)}},{}],18:[function(a,b,c){"function"==typeof Object.create?b.exports=function(a,b){a.super_=b,a.prototype=Object.create(b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}})}:b.exports=function(a,b){a.super_=b;var c=function(){};c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a}},{}],19:[function(a,b,c){function d(a){return!!a.constructor&&"function"==typeof a.constructor.isBuffer&&a.constructor.isBuffer(a)}function e(a){return"function"==typeof a.readFloatLE&&"function"==typeof a.slice&&d(a.slice(0,0))}b.exports=function(a){return null!=a&&(d(a)||e(a)||!!a._isBuffer)}},{}],20:[function(b,c,d){(function(e){!function(b){if("object"==typeof d&&"undefined"!=typeof c)c.exports=b();else if("function"==typeof a&&a.amd)a([],b);else{var f;f="undefined"!=typeof window?window:"undefined"!=typeof e?e:"undefined"!=typeof self?self:this,f.pako=b()}}(function(){return function a(c,d,e){function f(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof b&&b;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var l=d[h]={exports:{}};c[h][0].call(l.exports,function(a){var b=c[h][1][a];return f(b?b:a)},l,l.exports,a,c,d,e)}return d[h].exports}for(var g="function"==typeof b&&b,h=0;h<e.length;h++)f(e[h]);return f}({1:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],2:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(a){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(a){g=!1}for(var h=new e.Buf8(256),i=0;i<256;i++)h[i]=i>=252?6:i>=248?5:i>=240?4:i>=224?3:i>=192?2:1;h[254]=h[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,i=b||a.length,j=new Array(2*i);for(e=0,c=0;c<i;)if(f=a[c++],f<128)j[e++]=f;else if(g=h[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<i;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+h[a[c]]>b?c:b}},{"./common":1}],3:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],4:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],5:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],6:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],7:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],8:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":1,"./adler32":3,"./crc32":5,"./inffast":7,"./inftrees":9}],9:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(var T=0;;){T++,z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":1}],10:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],11:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}],"/lib/inflate.js":[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":1,"./utils/strings":2,"./zlib/constants":4,"./zlib/gzheader":6,"./zlib/inflate":8,"./zlib/messages":10,"./zlib/zstream":11}]},{},[])("/lib/inflate.js")})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],21:[function(a,b,c){(function(a){"use strict";function c(b,c,d,e){if("function"!=typeof b)throw new TypeError('"callback" argument must be a function');var f,g,h=arguments.length;switch(h){case 0:case 1:return a.nextTick(b);case 2:return a.nextTick(function(){b.call(null,c)});case 3:return a.nextTick(function(){b.call(null,c,d)});case 4:return a.nextTick(function(){b.call(null,c,d,e)});default:
for(f=new Array(h-1),g=0;g<f.length;)f[g++]=arguments[g];return a.nextTick(function(){b.apply(null,f)})}}!a.version||0===a.version.indexOf("v0.")||0===a.version.indexOf("v1.")&&0!==a.version.indexOf("v1.8.")?b.exports=c:b.exports=a.nextTick}).call(this,a("bfs-process"))},{"bfs-process":11}],22:[function(a,b,c){b.exports=a("./lib/_stream_duplex.js")},{"./lib/_stream_duplex.js":23}],23:[function(a,b,c){"use strict";function d(a){return this instanceof d?(j.call(this,a),k.call(this,a),a&&a.readable===!1&&(this.readable=!1),a&&a.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,a&&a.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",e)):new d(a)}function e(){this.allowHalfOpen||this._writableState.ended||h(f,this)}function f(a){a.end()}var g=Object.keys||function(a){var b=[];for(var c in a)b.push(c);return b};b.exports=d;var h=a("process-nextick-args"),i=a("core-util-is");i.inherits=a("inherits");var j=a("./_stream_readable"),k=a("./_stream_writable");i.inherits(d,j);for(var l=g(k.prototype),m=0;m<l.length;m++){var n=l[m];d.prototype[n]||(d.prototype[n]=k.prototype[n])}},{"./_stream_readable":25,"./_stream_writable":27,"core-util-is":16,inherits:18,"process-nextick-args":21}],24:[function(a,b,c){"use strict";function d(a){return this instanceof d?void e.call(this,a):new d(a)}b.exports=d;var e=a("./_stream_transform"),f=a("core-util-is");f.inherits=a("inherits"),f.inherits(d,e),d.prototype._transform=function(a,b,c){c(null,a)}},{"./_stream_transform":26,"core-util-is":16,inherits:18}],25:[function(a,b,c){(function(c){"use strict";function d(a,b,c){return"function"==typeof a.prependListener?a.prependListener(b,c):void(a._events&&a._events[b]?E(a._events[b])?a._events[b].unshift(c):a._events[b]=[c,a._events[b]]:a.on(b,c))}function e(b,c){O=O||a("./_stream_duplex"),b=b||{},this.objectMode=!!b.objectMode,c instanceof O&&(this.objectMode=this.objectMode||!!b.readableObjectMode);var d=b.highWaterMark,e=this.objectMode?16:16384;this.highWaterMark=d||0===d?d:e,this.highWaterMark=~~this.highWaterMark,this.buffer=new N,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=b.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,b.encoding&&(M||(M=a("string_decoder/").StringDecoder),this.decoder=new M(b.encoding),this.encoding=b.encoding)}function f(b){return O=O||a("./_stream_duplex"),this instanceof f?(this._readableState=new e(b,this),this.readable=!0,b&&"function"==typeof b.read&&(this._read=b.read),void F.call(this)):new f(b)}function g(a,b,c,d,e){var f=k(b,c);if(f)a.emit("error",f);else if(null===c)b.reading=!1,l(a,b);else if(b.objectMode||c&&c.length>0)if(b.ended&&!e){var g=new Error("stream.push() after EOF");a.emit("error",g)}else if(b.endEmitted&&e){var i=new Error("stream.unshift() after end event");a.emit("error",i)}else{var j;!b.decoder||e||d||(c=b.decoder.write(c),j=!b.objectMode&&0===c.length),e||(b.reading=!1),j||(b.flowing&&0===b.length&&!b.sync?(a.emit("data",c),a.read(0)):(b.length+=b.objectMode?1:c.length,e?b.buffer.unshift(c):b.buffer.push(c),b.needReadable&&m(a))),o(a,b)}else e||(b.reading=!1);return h(b)}function h(a){return!a.ended&&(a.needReadable||a.length<a.highWaterMark||0===a.length)}function i(a){return a>=P?a=P:(a--,a|=a>>>1,a|=a>>>2,a|=a>>>4,a|=a>>>8,a|=a>>>16,a++),a}function j(a,b){return a<=0||0===b.length&&b.ended?0:b.objectMode?1:a!==a?b.flowing&&b.length?b.buffer.head.data.length:b.length:(a>b.highWaterMark&&(b.highWaterMark=i(a)),a<=b.length?a:b.ended?b.length:(b.needReadable=!0,0))}function k(a,b){var c=null;return H.isBuffer(b)||"string"==typeof b||null===b||void 0===b||a.objectMode||(c=new TypeError("Invalid non-string/buffer chunk")),c}function l(a,b){if(!b.ended){if(b.decoder){var c=b.decoder.end();c&&c.length&&(b.buffer.push(c),b.length+=b.objectMode?1:c.length)}b.ended=!0,m(a)}}function m(a){var b=a._readableState;b.needReadable=!1,b.emittedReadable||(L("emitReadable",b.flowing),b.emittedReadable=!0,b.sync?D(n,a):n(a))}function n(a){L("emit readable"),a.emit("readable"),u(a)}function o(a,b){b.readingMore||(b.readingMore=!0,D(p,a,b))}function p(a,b){for(var c=b.length;!b.reading&&!b.flowing&&!b.ended&&b.length<b.highWaterMark&&(L("maybeReadMore read 0"),a.read(0),c!==b.length);)c=b.length;b.readingMore=!1}function q(a){return function(){var b=a._readableState;L("pipeOnDrain",b.awaitDrain),b.awaitDrain&&b.awaitDrain--,0===b.awaitDrain&&G(a,"data")&&(b.flowing=!0,u(a))}}function r(a){L("readable nexttick read 0"),a.read(0)}function s(a,b){b.resumeScheduled||(b.resumeScheduled=!0,D(t,a,b))}function t(a,b){b.reading||(L("resume read 0"),a.read(0)),b.resumeScheduled=!1,b.awaitDrain=0,a.emit("resume"),u(a),b.flowing&&!b.reading&&a.read(0)}function u(a){var b=a._readableState;for(L("flow",b.flowing);b.flowing&&null!==a.read(););}function v(a,b){if(0===b.length)return null;var c;return b.objectMode?c=b.buffer.shift():!a||a>=b.length?(c=b.decoder?b.buffer.join(""):1===b.buffer.length?b.buffer.head.data:b.buffer.concat(b.length),b.buffer.clear()):c=w(a,b.buffer,b.decoder),c}function w(a,b,c){var d;return a<b.head.data.length?(d=b.head.data.slice(0,a),b.head.data=b.head.data.slice(a)):d=a===b.head.data.length?b.shift():c?x(a,b):y(a,b),d}function x(a,b){var c=b.head,d=1,e=c.data;for(a-=e.length;c=c.next;){var f=c.data,g=a>f.length?f.length:a;if(e+=g===f.length?f:f.slice(0,a),a-=g,0===a){g===f.length?(++d,c.next?b.head=c.next:b.head=b.tail=null):(b.head=c,c.data=f.slice(g));break}++d}return b.length-=d,e}function y(a,b){var c=I.allocUnsafe(a),d=b.head,e=1;for(d.data.copy(c),a-=d.data.length;d=d.next;){var f=d.data,g=a>f.length?f.length:a;if(f.copy(c,c.length-a,0,g),a-=g,0===a){g===f.length?(++e,d.next?b.head=d.next:b.head=b.tail=null):(b.head=d,d.data=f.slice(g));break}++e}return b.length-=e,c}function z(a){var b=a._readableState;if(b.length>0)throw new Error('"endReadable()" called on non-empty stream');b.endEmitted||(b.ended=!0,D(A,b,a))}function A(a,b){a.endEmitted||0!==a.length||(a.endEmitted=!0,b.readable=!1,b.emit("end"))}function B(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c],c)}function C(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}b.exports=f;var D=a("process-nextick-args"),E=a("isarray");f.ReadableState=e;var F,G=(a("events").EventEmitter,function(a,b){return a.listeners(b).length});!function(){try{F=a("stream")}catch(a){}finally{F||(F=a("events").EventEmitter)}}();var H=a("buffer").Buffer,I=a("buffer-shims"),J=a("core-util-is");J.inherits=a("inherits");var K=a("util"),L=void 0;L=K&&K.debuglog?K.debuglog("stream"):function(){};var M,N=a("./internal/streams/BufferList");J.inherits(f,F);var O,O;f.prototype.push=function(a,b){var c=this._readableState;return c.objectMode||"string"!=typeof a||(b=b||c.defaultEncoding,b!==c.encoding&&(a=I.from(a,b),b="")),g(this,c,a,b,!1)},f.prototype.unshift=function(a){var b=this._readableState;return g(this,b,a,"",!0)},f.prototype.isPaused=function(){return this._readableState.flowing===!1},f.prototype.setEncoding=function(b){return M||(M=a("string_decoder/").StringDecoder),this._readableState.decoder=new M(b),this._readableState.encoding=b,this};var P=8388608;f.prototype.read=function(a){L("read",a),a=parseInt(a,10);var b=this._readableState,c=a;if(0!==a&&(b.emittedReadable=!1),0===a&&b.needReadable&&(b.length>=b.highWaterMark||b.ended))return L("read: emitReadable",b.length,b.ended),0===b.length&&b.ended?z(this):m(this),null;if(a=j(a,b),0===a&&b.ended)return 0===b.length&&z(this),null;var d=b.needReadable;L("need readable",d),(0===b.length||b.length-a<b.highWaterMark)&&(d=!0,L("length less than watermark",d)),b.ended||b.reading?(d=!1,L("reading or ended",d)):d&&(L("do read"),b.reading=!0,b.sync=!0,0===b.length&&(b.needReadable=!0),this._read(b.highWaterMark),b.sync=!1,b.reading||(a=j(c,b)));var e;return e=a>0?v(a,b):null,null===e?(b.needReadable=!0,a=0):b.length-=a,0===b.length&&(b.ended||(b.needReadable=!0),c!==a&&b.ended&&z(this)),null!==e&&this.emit("data",e),e},f.prototype._read=function(a){this.emit("error",new Error("not implemented"))},f.prototype.pipe=function(a,b){function e(a){L("onunpipe"),a===m&&g()}function f(){L("onend"),a.end()}function g(){L("cleanup"),a.removeListener("close",j),a.removeListener("finish",k),a.removeListener("drain",r),a.removeListener("error",i),a.removeListener("unpipe",e),m.removeListener("end",f),m.removeListener("end",g),m.removeListener("data",h),s=!0,!n.awaitDrain||a._writableState&&!a._writableState.needDrain||r()}function h(b){L("ondata"),t=!1;var c=a.write(b);!1!==c||t||((1===n.pipesCount&&n.pipes===a||n.pipesCount>1&&C(n.pipes,a)!==-1)&&!s&&(L("false write response, pause",m._readableState.awaitDrain),m._readableState.awaitDrain++,t=!0),m.pause())}function i(b){L("onerror",b),l(),a.removeListener("error",i),0===G(a,"error")&&a.emit("error",b)}function j(){a.removeListener("finish",k),l()}function k(){L("onfinish"),a.removeListener("close",j),l()}function l(){L("unpipe"),m.unpipe(a)}var m=this,n=this._readableState;switch(n.pipesCount){case 0:n.pipes=a;break;case 1:n.pipes=[n.pipes,a];break;default:n.pipes.push(a)}n.pipesCount+=1,L("pipe count=%d opts=%j",n.pipesCount,b);var o=(!b||b.end!==!1)&&a!==c.stdout&&a!==c.stderr,p=o?f:g;n.endEmitted?D(p):m.once("end",p),a.on("unpipe",e);var r=q(m);a.on("drain",r);var s=!1,t=!1;return m.on("data",h),d(a,"error",i),a.once("close",j),a.once("finish",k),a.emit("pipe",m),n.flowing||(L("pipe resume"),m.resume()),a},f.prototype.unpipe=function(a){var b=this._readableState;if(0===b.pipesCount)return this;if(1===b.pipesCount)return a&&a!==b.pipes?this:(a||(a=b.pipes),b.pipes=null,b.pipesCount=0,b.flowing=!1,a&&a.emit("unpipe",this),this);if(!a){var c=b.pipes,d=b.pipesCount;b.pipes=null,b.pipesCount=0,b.flowing=!1;for(var e=0;e<d;e++)c[e].emit("unpipe",this);return this}var f=C(b.pipes,a);return f===-1?this:(b.pipes.splice(f,1),b.pipesCount-=1,1===b.pipesCount&&(b.pipes=b.pipes[0]),a.emit("unpipe",this),this)},f.prototype.on=function(a,b){var c=F.prototype.on.call(this,a,b);if("data"===a)this._readableState.flowing!==!1&&this.resume();else if("readable"===a){var d=this._readableState;d.endEmitted||d.readableListening||(d.readableListening=d.needReadable=!0,d.emittedReadable=!1,d.reading?d.length&&m(this,d):D(r,this))}return c},f.prototype.addListener=f.prototype.on,f.prototype.resume=function(){var a=this._readableState;return a.flowing||(L("resume"),a.flowing=!0,s(this,a)),this},f.prototype.pause=function(){return L("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(L("pause"),this._readableState.flowing=!1,this.emit("pause")),this},f.prototype.wrap=function(a){var b=this._readableState,c=!1,d=this;a.on("end",function(){if(L("wrapped end"),b.decoder&&!b.ended){var a=b.decoder.end();a&&a.length&&d.push(a)}d.push(null)}),a.on("data",function(e){if(L("wrapped data"),b.decoder&&(e=b.decoder.write(e)),(!b.objectMode||null!==e&&void 0!==e)&&(b.objectMode||e&&e.length)){var f=d.push(e);f||(c=!0,a.pause())}});for(var e in a)void 0===this[e]&&"function"==typeof a[e]&&(this[e]=function(b){return function(){return a[b].apply(a,arguments)}}(e));var f=["error","close","destroy","pause","resume"];return B(f,function(b){a.on(b,d.emit.bind(d,b))}),d._read=function(b){L("wrapped _read",b),c&&(c=!1,a.resume())},d},f._fromList=v}).call(this,a("bfs-process"))},{"./_stream_duplex":23,"./internal/streams/BufferList":28,"bfs-process":11,buffer:2,"buffer-shims":15,"core-util-is":16,events:17,inherits:18,isarray:29,"process-nextick-args":21,"string_decoder/":35,util:14}],26:[function(a,b,c){"use strict";function d(a){this.afterTransform=function(b,c){return e(a,b,c)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function e(a,b,c){var d=a._transformState;d.transforming=!1;var e=d.writecb;if(!e)return a.emit("error",new Error("no writecb in Transform class"));d.writechunk=null,d.writecb=null,null!==c&&void 0!==c&&a.push(c),e(b);var f=a._readableState;f.reading=!1,(f.needReadable||f.length<f.highWaterMark)&&a._read(f.highWaterMark)}function f(a){if(!(this instanceof f))return new f(a);h.call(this,a),this._transformState=new d(this);var b=this;this._readableState.needReadable=!0,this._readableState.sync=!1,a&&("function"==typeof a.transform&&(this._transform=a.transform),"function"==typeof a.flush&&(this._flush=a.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(a){g(b,a)}):g(b)})}function g(a,b){if(b)return a.emit("error",b);var c=a._writableState,d=a._transformState;if(c.length)throw new Error("Calling transform done when ws.length != 0");if(d.transforming)throw new Error("Calling transform done when still transforming");return a.push(null)}b.exports=f;var h=a("./_stream_duplex"),i=a("core-util-is");i.inherits=a("inherits"),i.inherits(f,h),f.prototype.push=function(a,b){return this._transformState.needTransform=!1,h.prototype.push.call(this,a,b)},f.prototype._transform=function(a,b,c){throw new Error("Not implemented")},f.prototype._write=function(a,b,c){var d=this._transformState;if(d.writecb=c,d.writechunk=a,d.writeencoding=b,!d.transforming){var e=this._readableState;(d.needTransform||e.needReadable||e.length<e.highWaterMark)&&this._read(e.highWaterMark)}},f.prototype._read=function(a){var b=this._transformState;null!==b.writechunk&&b.writecb&&!b.transforming?(b.transforming=!0,this._transform(b.writechunk,b.writeencoding,b.afterTransform)):b.needTransform=!0}},{"./_stream_duplex":23,"core-util-is":16,inherits:18}],27:[function(a,b,c){(function(c){"use strict";function d(){}function e(a,b,c){this.chunk=a,this.encoding=b,this.callback=c,this.next=null}function f(b,c){E=E||a("./_stream_duplex"),b=b||{},this.objectMode=!!b.objectMode,c instanceof E&&(this.objectMode=this.objectMode||!!b.writableObjectMode);var d=b.highWaterMark,e=this.objectMode?16:16384;this.highWaterMark=d||0===d?d:e,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var f=b.decodeStrings===!1;this.decodeStrings=!f,this.defaultEncoding=b.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(a){o(c,a)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new w(this)}function g(b){return E=E||a("./_stream_duplex"),this instanceof g||this instanceof E?(this._writableState=new f(b,this),this.writable=!0,b&&("function"==typeof b.write&&(this._write=b.write),"function"==typeof b.writev&&(this._writev=b.writev)),void A.call(this)):new g(b)}function h(a,b){var c=new Error("write after end");a.emit("error",c),x(b,c)}function i(a,b,c,d){var e=!0,f=!1;return null===c?f=new TypeError("May not write null values to stream"):C.isBuffer(c)||"string"==typeof c||void 0===c||b.objectMode||(f=new TypeError("Invalid non-string/buffer chunk")),f&&(a.emit("error",f),x(d,f),e=!1),e}function j(a,b,c){return a.objectMode||a.decodeStrings===!1||"string"!=typeof b||(b=D.from(b,c)),b}function k(a,b,c,d,f){c=j(b,c,d),C.isBuffer(c)&&(d="buffer");var g=b.objectMode?1:c.length;b.length+=g;var h=b.length<b.highWaterMark;if(h||(b.needDrain=!0),b.writing||b.corked){var i=b.lastBufferedRequest;b.lastBufferedRequest=new e(c,d,f),i?i.next=b.lastBufferedRequest:b.bufferedRequest=b.lastBufferedRequest,b.bufferedRequestCount+=1}else l(a,b,!1,g,c,d,f);return h}function l(a,b,c,d,e,f,g){b.writelen=d,b.writecb=g,b.writing=!0,b.sync=!0,c?a._writev(e,b.onwrite):a._write(e,f,b.onwrite),b.sync=!1}function m(a,b,c,d,e){--b.pendingcb,c?x(e,d):e(d),a._writableState.errorEmitted=!0,a.emit("error",d)}function n(a){a.writing=!1,a.writecb=null,a.length-=a.writelen,a.writelen=0}function o(a,b){var c=a._writableState,d=c.sync,e=c.writecb;if(n(c),b)m(a,c,d,b,e);else{var f=s(c);f||c.corked||c.bufferProcessing||!c.bufferedRequest||r(a,c),d?y(p,a,c,f,e):p(a,c,f,e)}}function p(a,b,c,d){c||q(a,b),b.pendingcb--,d(),u(a,b)}function q(a,b){0===b.length&&b.needDrain&&(b.needDrain=!1,a.emit("drain"))}function r(a,b){b.bufferProcessing=!0;var c=b.bufferedRequest;if(a._writev&&c&&c.next){var d=b.bufferedRequestCount,e=new Array(d),f=b.corkedRequestsFree;f.entry=c;for(var g=0;c;)e[g]=c,c=c.next,g+=1;l(a,b,!0,b.length,e,"",f.finish),b.pendingcb++,b.lastBufferedRequest=null,f.next?(b.corkedRequestsFree=f.next,f.next=null):b.corkedRequestsFree=new w(b)}else{for(;c;){var h=c.chunk,i=c.encoding,j=c.callback,k=b.objectMode?1:h.length;if(l(a,b,!1,k,h,i,j),c=c.next,b.writing)break}null===c&&(b.lastBufferedRequest=null)}b.bufferedRequestCount=0,b.bufferedRequest=c,b.bufferProcessing=!1}function s(a){return a.ending&&0===a.length&&null===a.bufferedRequest&&!a.finished&&!a.writing}function t(a,b){b.prefinished||(b.prefinished=!0,a.emit("prefinish"))}function u(a,b){var c=s(b);return c&&(0===b.pendingcb?(t(a,b),b.finished=!0,a.emit("finish")):t(a,b)),c}function v(a,b,c){b.ending=!0,u(a,b),c&&(b.finished?x(c):a.once("finish",c)),b.ended=!0,a.writable=!1}function w(a){var b=this;this.next=null,this.entry=null,this.finish=function(c){var d=b.entry;for(b.entry=null;d;){var e=d.callback;a.pendingcb--,e(c),d=d.next}a.corkedRequestsFree?a.corkedRequestsFree.next=b:a.corkedRequestsFree=b}}b.exports=g;var x=a("process-nextick-args"),y=!c.browser&&["v0.10","v0.9."].indexOf(c.version.slice(0,5))>-1?setImmediate:x;g.WritableState=f;var z=a("core-util-is");z.inherits=a("inherits");var A,B={deprecate:a("util-deprecate")};!function(){try{A=a("stream")}catch(a){}finally{A||(A=a("events").EventEmitter)}}();var C=a("buffer").Buffer,D=a("buffer-shims");z.inherits(g,A);var E;f.prototype.getBuffer=function(){for(var a=this.bufferedRequest,b=[];a;)b.push(a),a=a.next;return b},function(){try{Object.defineProperty(f.prototype,"buffer",{get:B.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(a){}}();var E;g.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},g.prototype.write=function(a,b,c){var e=this._writableState,f=!1;return"function"==typeof b&&(c=b,b=null),C.isBuffer(a)?b="buffer":b||(b=e.defaultEncoding),"function"!=typeof c&&(c=d),e.ended?h(this,c):i(this,e,a,c)&&(e.pendingcb++,f=k(this,e,a,b,c)),f},g.prototype.cork=function(){var a=this._writableState;a.corked++},g.prototype.uncork=function(){var a=this._writableState;a.corked&&(a.corked--,a.writing||a.corked||a.finished||a.bufferProcessing||!a.bufferedRequest||r(this,a))},g.prototype.setDefaultEncoding=function(a){if("string"==typeof a&&(a=a.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((a+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+a);return this._writableState.defaultEncoding=a,this},g.prototype._write=function(a,b,c){c(new Error("not implemented"))},g.prototype._writev=null,g.prototype.end=function(a,b,c){var d=this._writableState;"function"==typeof a?(c=a,a=null,b=null):"function"==typeof b&&(c=b,b=null),null!==a&&void 0!==a&&this.write(a,b),d.corked&&(d.corked=1,this.uncork()),d.ending||d.finished||v(this,d,c)}}).call(this,a("bfs-process"))},{"./_stream_duplex":23,"bfs-process":11,buffer:2,"buffer-shims":15,"core-util-is":16,events:17,inherits:18,"process-nextick-args":21,"util-deprecate":36}],28:[function(a,b,c){"use strict";function d(){this.head=null,this.tail=null,this.length=0}var e=(a("buffer").Buffer,a("buffer-shims"));b.exports=d,d.prototype.push=function(a){var b={data:a,next:null};this.length>0?this.tail.next=b:this.head=b,this.tail=b,++this.length},d.prototype.unshift=function(a){var b={data:a,next:this.head};0===this.length&&(this.tail=b),this.head=b,++this.length},d.prototype.shift=function(){if(0!==this.length){var a=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,a}},d.prototype.clear=function(){this.head=this.tail=null,this.length=0},d.prototype.join=function(a){if(0===this.length)return"";for(var b=this.head,c=""+b.data;b=b.next;)c+=a+b.data;return c},d.prototype.concat=function(a){if(0===this.length)return e.alloc(0);if(1===this.length)return this.head.data;for(var b=e.allocUnsafe(a>>>0),c=this.head,d=0;c;)c.data.copy(b,d),d+=c.data.length,c=c.next;return b}},{buffer:2,"buffer-shims":15}],29:[function(a,b,c){var d={}.toString;b.exports=Array.isArray||function(a){return"[object Array]"==d.call(a)}},{}],30:[function(a,b,c){b.exports=a("./lib/_stream_passthrough.js")},{"./lib/_stream_passthrough.js":24}],31:[function(a,b,c){(function(d){var e=function(){try{return a("stream")}catch(a){}}();c=b.exports=a("./lib/_stream_readable.js"),c.Stream=e||c,c.Readable=c,c.Writable=a("./lib/_stream_writable.js"),c.Duplex=a("./lib/_stream_duplex.js"),c.Transform=a("./lib/_stream_transform.js"),c.PassThrough=a("./lib/_stream_passthrough.js"),!d.browser&&"disable"===d.env.READABLE_STREAM&&e&&(b.exports=e)}).call(this,a("bfs-process"))},{"./lib/_stream_duplex.js":23,"./lib/_stream_passthrough.js":24,"./lib/_stream_readable.js":25,"./lib/_stream_transform.js":26,"./lib/_stream_writable.js":27,"bfs-process":11}],32:[function(a,b,c){b.exports=a("./lib/_stream_transform.js")},{"./lib/_stream_transform.js":26}],33:[function(a,b,c){b.exports=a("./lib/_stream_writable.js")},{"./lib/_stream_writable.js":27}],34:[function(a,b,c){function d(){e.call(this)}b.exports=d;var e=a("events").EventEmitter,f=a("inherits");f(d,e),d.Readable=a("readable-stream/readable.js"),d.Writable=a("readable-stream/writable.js"),d.Duplex=a("readable-stream/duplex.js"),d.Transform=a("readable-stream/transform.js"),d.PassThrough=a("readable-stream/passthrough.js"),d.Stream=d,d.prototype.pipe=function(a,b){function c(b){a.writable&&!1===a.write(b)&&j.pause&&j.pause()}function d(){j.readable&&j.resume&&j.resume()}function f(){k||(k=!0,a.end())}function g(){k||(k=!0,"function"==typeof a.destroy&&a.destroy())}function h(a){if(i(),0===e.listenerCount(this,"error"))throw a}function i(){j.removeListener("data",c),a.removeListener("drain",d),j.removeListener("end",f),j.removeListener("close",g),j.removeListener("error",h),a.removeListener("error",h),j.removeListener("end",i),j.removeListener("close",i),a.removeListener("close",i)}var j=this;j.on("data",c),a.on("drain",d),a._isStdio||b&&b.end===!1||(j.on("end",f),j.on("close",g));var k=!1;return j.on("error",h),a.on("error",h),j.on("end",i),j.on("close",i),a.on("close",i),a.emit("pipe",j),a}},{events:17,inherits:18,"readable-stream/duplex.js":22,"readable-stream/passthrough.js":30,"readable-stream/readable.js":31,"readable-stream/transform.js":32,"readable-stream/writable.js":33}],35:[function(a,b,c){function d(a){if(a&&!i(a))throw new Error("Unknown encoding: "+a)}function e(a){return a.toString(this.encoding)}function f(a){this.charReceived=a.length%2,this.charLength=this.charReceived?2:0}function g(a){this.charReceived=a.length%3,this.charLength=this.charReceived?3:0}var h=a("buffer").Buffer,i=h.isEncoding||function(a){switch(a&&a.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},j=c.StringDecoder=function(a){switch(this.encoding=(a||"utf8").toLowerCase().replace(/[-_]/,""),d(a),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=f;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=g;break;default:return void(this.write=e)}this.charBuffer=new h(6),this.charReceived=0,this.charLength=0};j.prototype.write=function(a){for(var b="";this.charLength;){var c=a.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:a.length;if(a.copy(this.charBuffer,this.charReceived,0,c),this.charReceived+=c,this.charReceived<this.charLength)return"";a=a.slice(c,a.length),b=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var d=b.charCodeAt(b.length-1);if(!(d>=55296&&d<=56319)){if(this.charReceived=this.charLength=0,0===a.length)return b;break}this.charLength+=this.surrogateSize,b=""}this.detectIncompleteChar(a);var e=a.length;this.charLength&&(a.copy(this.charBuffer,0,a.length-this.charReceived,e),e-=this.charReceived),b+=a.toString(this.encoding,0,e);var e=b.length-1,d=b.charCodeAt(e);if(d>=55296&&d<=56319){var f=this.surrogateSize;return this.charLength+=f,this.charReceived+=f,this.charBuffer.copy(this.charBuffer,f,0,f),a.copy(this.charBuffer,0,0,f),b.substring(0,e)}return b},j.prototype.detectIncompleteChar=function(a){for(var b=a.length>=3?3:a.length;b>0;b--){var c=a[a.length-b];if(1==b&&c>>5==6){this.charLength=2;break}if(b<=2&&c>>4==14){this.charLength=3;break}if(b<=3&&c>>3==30){this.charLength=4;break}}this.charReceived=b},j.prototype.end=function(a){var b="";if(a&&a.length&&(b=this.write(a)),this.charReceived){var c=this.charReceived,d=this.charBuffer,e=this.encoding;b+=d.slice(0,c).toString(e)}return b}},{buffer:2}],36:[function(a,b,c){(function(a){function c(a,b){function c(){if(!e){if(d("throwDeprecation"))throw new Error(b);d("traceDeprecation")?console.trace(b):console.warn(b),e=!0}return a.apply(this,arguments)}if(d("noDeprecation"))return a;var e=!1;return c}function d(b){try{if(!a.localStorage)return!1}catch(a){return!1}var c=a.localStorage[b];return null!=c&&"true"===String(c).toLowerCase()}b.exports=c}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(a,b,c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("../core/file_system"),f=a("../core/api_error"),g=a("../core/file_flag"),h=a("../generic/preload_file"),i=a("path"),j=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return d(b,a),b.prototype.syncSync=function(){this.isDirty()&&(this._fs._syncSync(this),this.resetDirty())},b.prototype.closeSync=function(){this.syncSync()},b}(h.PreloadFile),k=function(a){function b(b,c){if(a.call(this),this._queue=[],this._queueRunning=!1,this._isInitialized=!1,this._initializeCallbacks=[],this._sync=b,this._async=c,!b.supportsSynch())throw new Error("The first argument to AsyncMirror needs to be a synchronous file system.")}return d(b,a),b.prototype.getName=function(){return"AsyncMirror"},b.isAvailable=function(){return!0},b.prototype._syncSync=function(a){this._sync.writeFileSync(a.getPath(),a.getBuffer(),null,g.FileFlag.getFileFlag("w"),a.getStats().mode),this.enqueueOp({apiMethod:"writeFile",arguments:[a.getPath(),a.getBuffer(),null,a.getFlag(),a.getStats().mode]})},b.prototype.initialize=function(a){var b=this,c=this._initializeCallbacks,d=function(a){b._isInitialized=!a,b._initializeCallbacks=[],c.forEach(function(b){return b(a)})};if(this._isInitialized)a();else if(1===c.push(a)){var e=function(a,c,d){"/"!==a&&b._sync.mkdirSync(a,c),b._async.readdir(a,function(b,c){function e(b){b?d(b):f<c.length?(h(i.join(a,c[f]),e),f++):d()}var f=0;b?d(b):e()})},f=function(a,c,d){b._async.readFile(a,null,g.FileFlag.getFileFlag("r"),function(e,f){if(e)d(e);else try{b._sync.writeFileSync(a,f,null,g.FileFlag.getFileFlag("w"),c)}catch(a){e=a}finally{d(e)}})},h=function(a,c){b._async.stat(a,!1,function(b,d){b?c(b):d.isDirectory()?e(a,d.mode,c):f(a,d.mode,c)})};e("/",0,d)}},b.prototype.checkInitialized=function(){if(!this._isInitialized)throw new f.ApiError(f.ErrorCode.EPERM,"AsyncMirrorFS is not initialized. Please initialize AsyncMirrorFS using its initialize() method before using it.")},b.prototype.isReadOnly=function(){return!1},b.prototype.supportsSynch=function(){return!0},b.prototype.supportsLinks=function(){return!1},b.prototype.supportsProps=function(){return this._sync.supportsProps()&&this._async.supportsProps()},b.prototype.enqueueOp=function(a){var b=this;if(this._queue.push(a),!this._queueRunning){this._queueRunning=!0;var c=function(a){if(a&&console.error("WARNING: File system has desynchronized. Received following error: "+a+"\n$"),b._queue.length>0){var d=b._queue.shift(),e=d.arguments;e.push(c),b._async[d.apiMethod].apply(b._async,e)}else b._queueRunning=!1};c()}},b.prototype.renameSync=function(a,b){this.checkInitialized(),this._sync.renameSync(a,b),this.enqueueOp({apiMethod:"rename",arguments:[a,b]})},b.prototype.statSync=function(a,b){return this.checkInitialized(),this._sync.statSync(a,b)},b.prototype.openSync=function(a,b,c){this.checkInitialized();var d=this._sync.openSync(a,b,c);return d.closeSync(),new j(this,a,b,this._sync.statSync(a,!1),this._sync.readFileSync(a,null,g.FileFlag.getFileFlag("r")))},b.prototype.unlinkSync=function(a){this.checkInitialized(),this._sync.unlinkSync(a),this.enqueueOp({apiMethod:"unlink",arguments:[a]})},b.prototype.rmdirSync=function(a){this.checkInitialized(),this._sync.rmdirSync(a),this.enqueueOp({apiMethod:"rmdir",arguments:[a]})},b.prototype.mkdirSync=function(a,b){this.checkInitialized(),this._sync.mkdirSync(a,b),this.enqueueOp({apiMethod:"mkdir",arguments:[a,b]})},b.prototype.readdirSync=function(a){return this.checkInitialized(),this._sync.readdirSync(a)},b.prototype.existsSync=function(a){return this.checkInitialized(),this._sync.existsSync(a)},b.prototype.chmodSync=function(a,b,c){this.checkInitialized(),this._sync.chmodSync(a,b,c),this.enqueueOp({apiMethod:"chmod",arguments:[a,b,c]})},b.prototype.chownSync=function(a,b,c,d){this.checkInitialized(),this._sync.chownSync(a,b,c,d),this.enqueueOp({apiMethod:"chown",arguments:[a,b,c,d]})},b.prototype.utimesSync=function(a,b,c){this.checkInitialized(),this._sync.utimesSync(a,b,c),this.enqueueOp({apiMethod:"utimes",arguments:[a,b,c]})},b}(e.SynchronousFileSystem);c.__esModule=!0,c.default=k},{"../core/api_error":52,"../core/file_flag":56,"../core/file_system":57,"../generic/preload_file":68,path:10}],38:[function(a,b,c){(function(b){"use strict";function d(){null===p&&(p={},p[Dropbox.ApiError.NETWORK_ERROR]=l.ErrorCode.EIO,p[Dropbox.ApiError.INVALID_PARAM]=l.ErrorCode.EINVAL,p[Dropbox.ApiError.INVALID_TOKEN]=l.ErrorCode.EPERM,p[Dropbox.ApiError.OAUTH_ERROR]=l.ErrorCode.EPERM,p[Dropbox.ApiError.NOT_FOUND]=l.ErrorCode.ENOENT,p[Dropbox.ApiError.INVALID_METHOD]=l.ErrorCode.EINVAL,p[Dropbox.ApiError.NOT_ACCEPTABLE]=l.ErrorCode.EINVAL,p[Dropbox.ApiError.CONFLICT]=l.ErrorCode.EINVAL,p[Dropbox.ApiError.RATE_LIMITED]=l.ErrorCode.EBUSY,p[Dropbox.ApiError.SERVER_ERROR]=l.ErrorCode.EBUSY,p[Dropbox.ApiError.OVER_QUOTA]=l.ErrorCode.ENOSPC)}function e(a){return a&&a.stat.isFile}function f(a){return a&&a.stat.isFolder}function g(a){return null===a||void 0===a||"object"==typeof a&&"number"==typeof a.byteLength}var h=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},i=a("../generic/preload_file"),j=a("../core/file_system"),k=a("../core/node_fs_stats"),l=a("../core/api_error"),m=a("async"),n=a("path"),o=a("../core/util"),p=null,q=function(){function a(a){this._cache={},this._client=a}return a.prototype.getCachedInfo=function(a){return this._cache[a.toLowerCase()]},a.prototype.putCachedInfo=function(a,b){this._cache[a.toLowerCase()]=b},a.prototype.deleteCachedInfo=function(a){delete this._cache[a.toLowerCase()]},a.prototype.getCachedDirInfo=function(a){var b=this.getCachedInfo(a);return f(b)?b:null},a.prototype.getCachedFileInfo=function(a){var b=this.getCachedInfo(a);return e(b)?b:null},a.prototype.updateCachedDirInfo=function(a,b,c){void 0===c&&(c=null);var d=this.getCachedInfo(a);null===b.contentHash||void 0!==d&&d.stat.contentHash===b.contentHash||this.putCachedInfo(a,{stat:b,contents:c})},a.prototype.updateCachedFileInfo=function(a,b,c){
void 0===c&&(c=null);var d=this.getCachedInfo(a);null===b.versionTag||void 0!==d&&d.stat.versionTag===b.versionTag||this.putCachedInfo(a,{stat:b,contents:c})},a.prototype.updateCachedInfo=function(a,b,c){void 0===c&&(c=null),b.isFile&&g(c)?this.updateCachedFileInfo(a,b,c):b.isFolder&&Array.isArray(c)&&this.updateCachedDirInfo(a,b,c)},a.prototype.readdir=function(a,b){var c=this,d=this.getCachedDirInfo(a);this._wrap(function(b){null!==d&&d.contents?c._client.readdir(a,{contentHash:d.stat.contentHash},b):c._client.readdir(a,b)},function(e,f,g,h){e?e.status===Dropbox.ApiError.NO_CONTENT&&null!==d?b(null,d.contents.slice(0)):b(e):(c.updateCachedDirInfo(a,g,f.slice(0)),h.forEach(function(b){c.updateCachedInfo(n.join(a,b.name),b)}),b(null,f))})},a.prototype.remove=function(a,b){var c=this;this._wrap(function(b){c._client.remove(a,b)},function(d,e){d||c.updateCachedInfo(a,e),b(d)})},a.prototype.move=function(a,b,c){var d=this;this._wrap(function(c){d._client.move(a,b,c)},function(e,f){e||(d.deleteCachedInfo(a),d.updateCachedInfo(b,f)),c(e)})},a.prototype.stat=function(a,b){var c=this;this._wrap(function(b){c._client.stat(a,b)},function(d,e){d||c.updateCachedInfo(a,e),b(d,e)})},a.prototype.readFile=function(a,b){var c=this,d=this.getCachedFileInfo(a);null!==d&&null!==d.contents?this.stat(a,function(e,f){e?b(e):f.contentHash===d.stat.contentHash?b(e,d.contents.slice(0),d.stat):c.readFile(a,b)}):this._wrap(function(b){c._client.readFile(a,{arrayBuffer:!0},b)},function(d,e,f){d||c.updateCachedInfo(a,f,e.slice(0)),b(d,e,f)})},a.prototype.writeFile=function(a,b,c){var d=this;this._wrap(function(c){d._client.writeFile(a,b,c)},function(e,f){e||d.updateCachedInfo(a,f,b.slice(0)),c(e,f)})},a.prototype.mkdir=function(a,b){var c=this;this._wrap(function(b){c._client.mkdir(a,b)},function(d,e){d||c.updateCachedInfo(a,e,[]),b(d)})},a.prototype._wrap=function(a,b){var c=0,d=function(e){var f=2;if(e&&3>++c)switch(e.status){case Dropbox.ApiError.SERVER_ERROR:case Dropbox.ApiError.NETWORK_ERROR:case Dropbox.ApiError.RATE_LIMITED:setTimeout(function(){a(d)},1e3*f);break;default:b.apply(null,arguments)}else b.apply(null,arguments)};a(d)},a}(),r=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return h(b,a),b.prototype.sync=function(a){var b=this;if(this.isDirty()){var c=this.getBuffer(),d=o.buffer2ArrayBuffer(c);this._fs._writeFileStrict(this.getPath(),d,function(c){c||b.resetDirty(),a(c)})}else a()},b.prototype.close=function(a){this.sync(a)},b}(i.PreloadFile);c.DropboxFile=r;var s=function(a){function c(b){a.call(this),this._client=new q(b),d()}return h(c,a),c.prototype.getName=function(){return"Dropbox"},c.isAvailable=function(){return"undefined"!=typeof Dropbox},c.prototype.isReadOnly=function(){return!1},c.prototype.supportsSymlinks=function(){return!1},c.prototype.supportsProps=function(){return!1},c.prototype.supportsSynch=function(){return!1},c.prototype.empty=function(a){var b=this;this._client.readdir("/",function(c,d){if(c)a(b.convert(c,"/"));else{var e=function(a,c){var d=n.join("/",a);b._client.remove(d,function(a){c(a?b.convert(a,d):null)})},f=function(b){b?a(b):a()};m.each(d,e,f)}})},c.prototype.rename=function(a,b,c){var d=this;this._client.move(a,b,function(e){e?d._client.stat(b,function(f,g){if(f||g.isFolder){var h=e.response.error.indexOf(a)>-1?a:b;c(d.convert(e,h))}else d._client.remove(b,function(e){e?c(d.convert(e,b)):d.rename(a,b,c)})}):c()})},c.prototype.stat=function(a,b,c){var d=this;this._client.stat(a,function(b,e){if(b)c(d.convert(b,a));else{if(null==e||!e.isRemoved){var f=new k.default(d._statType(e),e.size);return c(null,f)}c(l.ApiError.FileError(l.ErrorCode.ENOENT,a))}})},c.prototype.open=function(a,c,d,e){var f=this;this._client.readFile(a,function(d,g,h){if(!d){var i;i=null===g?new b(0):o.arrayBuffer2Buffer(g);var j=f._makeFile(a,c,h,i);return e(null,j)}if(c.isReadable())e(f.convert(d,a));else switch(d.status){case Dropbox.ApiError.NOT_FOUND:var k=new ArrayBuffer(0);return f._writeFileStrict(a,k,function(b,d){if(b)e(b);else{var g=f._makeFile(a,c,d,o.arrayBuffer2Buffer(k));e(null,g)}});default:return e(f.convert(d,a))}})},c.prototype._writeFileStrict=function(a,b,c){var d=this,e=n.dirname(a);this.stat(e,!1,function(f,g){f?c(l.ApiError.FileError(l.ErrorCode.ENOENT,e)):d._client.writeFile(a,b,function(b,e){b?c(d.convert(b,a)):c(null,e)})})},c.prototype._statType=function(a){return a.isFile?k.FileType.FILE:k.FileType.DIRECTORY},c.prototype._makeFile=function(a,b,c,d){var e=this._statType(c),f=new k.default(e,c.size);return new r(this,a,b,f,d)},c.prototype._remove=function(a,b,c){var d=this;this._client.stat(a,function(e,f){e?b(d.convert(e,a)):f.isFile&&!c?b(l.ApiError.FileError(l.ErrorCode.ENOTDIR,a)):!f.isFile&&c?b(l.ApiError.FileError(l.ErrorCode.EISDIR,a)):d._client.remove(a,function(c){b(c?d.convert(c,a):null)})})},c.prototype.unlink=function(a,b){this._remove(a,b,!0)},c.prototype.rmdir=function(a,b){this._remove(a,b,!1)},c.prototype.mkdir=function(a,b,c){var d=this,e=n.dirname(a);this._client.stat(e,function(b,f){b?c(d.convert(b,e)):d._client.mkdir(a,function(b){c(b?l.ApiError.FileError(l.ErrorCode.EEXIST,a):null)})})},c.prototype.readdir=function(a,b){var c=this;this._client.readdir(a,function(a,d){return a?b(c.convert(a)):b(null,d)})},c.prototype.convert=function(a,b){void 0===b&&(b=null);var c=p[a.status];return void 0===c&&(c=l.ErrorCode.EIO),null==b?new l.ApiError(c):l.ApiError.FileError(c,b)},c}(j.BaseFileSystem);c.__esModule=!0,c.default=s}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/file_system":57,"../core/node_fs_stats":60,"../core/util":61,"../generic/preload_file":68,async:1,"bfs-buffer":2,path:10}],39:[function(a,b,c){(function(b){"use strict";function d(a,b){void 0===b&&(b="");for(var c=a.errno,d=a.node,e=[];d&&(e.unshift(d.name),d!==d.parent);)d=d.parent;return new j.ApiError(c,j.ErrorStrings[c],e.length>0?"/"+e.join("/"):b)}var e=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},f=a("../core/file_system"),g=a("../core/node_fs_stats"),h=a("../core/file"),i=a("../core/util"),j=a("../core/api_error"),k=function(a){function b(b,c,d,e,f){a.call(this),this._fs=b,this._FS=c,this._path=d,this._flag=e,this._stream=f}return e(b,a),b.prototype.getPos=function(){},b.prototype.close=function(a){var b=null;try{this.closeSync()}catch(a){b=a}finally{a(b)}},b.prototype.closeSync=function(){try{this._FS.close(this._stream)}catch(a){throw d(a,this._path)}},b.prototype.stat=function(a){try{a(null,this.statSync())}catch(b){a(b)}},b.prototype.statSync=function(){try{return this._fs.statSync(this._path,!1)}catch(a){throw d(a,this._path)}},b.prototype.truncate=function(a,b){var c=null;try{this.truncateSync(a)}catch(a){c=a}finally{b(c)}},b.prototype.truncateSync=function(a){try{this._FS.ftruncate(this._stream.fd,a)}catch(a){throw d(a,this._path)}},b.prototype.write=function(a,b,c,d,e){try{e(null,this.writeSync(a,b,c,d),a)}catch(a){e(a)}},b.prototype.writeSync=function(a,b,c,e){try{var f=i.buffer2Uint8array(a);return null===e&&(e=void 0),this._FS.write(this._stream,f,b,c,e)}catch(a){throw d(a,this._path)}},b.prototype.read=function(a,b,c,d,e){try{e(null,this.readSync(a,b,c,d),a)}catch(a){e(a)}},b.prototype.readSync=function(a,b,c,e){try{var f=i.buffer2Uint8array(a);return null===e&&(e=void 0),this._FS.read(this._stream,f,b,c,e)}catch(a){throw d(a,this._path)}},b.prototype.sync=function(a){a()},b.prototype.syncSync=function(){},b.prototype.chown=function(a,b,c){var d=null;try{this.chownSync(a,b)}catch(a){d=a}finally{c(d)}},b.prototype.chownSync=function(a,b){try{this._FS.fchown(this._stream.fd,a,b)}catch(a){throw d(a,this._path)}},b.prototype.chmod=function(a,b){var c=null;try{this.chmodSync(a)}catch(a){c=a}finally{b(c)}},b.prototype.chmodSync=function(a){try{this._FS.fchmod(this._stream.fd,a)}catch(a){throw d(a,this._path)}},b.prototype.utimes=function(a,b,c){var d=null;try{this.utimesSync(a,b)}catch(a){d=a}finally{c(d)}},b.prototype.utimesSync=function(a,b){this._fs.utimesSync(this._path,a,b)},b}(h.BaseFile);c.EmscriptenFile=k;var l=function(a){function c(b){a.call(this),this._FS=b}return e(c,a),c.isAvailable=function(){return!0},c.prototype.getName=function(){return this._FS.DB_NAME()},c.prototype.isReadOnly=function(){return!1},c.prototype.supportsLinks=function(){return!0},c.prototype.supportsProps=function(){return!0},c.prototype.supportsSynch=function(){return!0},c.prototype.renameSync=function(a,b){try{this._FS.rename(a,b)}catch(c){throw c.errno===j.ErrorCode.ENOENT?d(c,this.existsSync(a)?b:a):d(c)}},c.prototype.statSync=function(a,b){try{var c=b?this._FS.lstat(a):this._FS.stat(a),e=this.modeToFileType(c.mode);return new g.default(e,c.size,c.mode,c.atime,c.mtime,c.ctime)}catch(b){throw d(b,a)}},c.prototype.modeToFileType=function(a){return this._FS.isDir(a)?g.FileType.DIRECTORY:this._FS.isFile(a)?g.FileType.FILE:this._FS.isLink(a)?g.FileType.SYMLINK:void 0},c.prototype._tryStats=function(a){try{return this.statSync(a,!1)}catch(a){return null}},c.prototype.openSync=function(a,b,c){try{var e=this._FS.open(a,b.getFlagString(),c);if(this._FS.isDir(e.node.mode))throw this._FS.close(e),j.ApiError.EISDIR(a);return new k(this,this._FS,a,b,e)}catch(b){throw d(b,a)}},c.prototype.unlinkSync=function(a){try{this._FS.unlink(a)}catch(b){throw d(b,a)}},c.prototype.rmdirSync=function(a){try{this._FS.rmdir(a)}catch(b){throw d(b,a)}},c.prototype.mkdirSync=function(a,b){try{this._FS.mkdir(a,b)}catch(b){throw d(b,a)}},c.prototype.readdirSync=function(a){try{return this._FS.readdir(a).filter(function(a){return"."!==a&&".."!==a})}catch(b){throw d(b,a)}},c.prototype.truncateSync=function(a,b){try{this._FS.truncate(a,b)}catch(b){throw d(b,a)}},c.prototype.readFileSync=function(a,b,c){try{var e=this._FS.readFile(a,{flags:c.getFlagString()}),f=i.uint8Array2Buffer(e);return b?f.toString(b):f}catch(b){throw d(b,a)}},c.prototype.writeFileSync=function(a,c,e,f,g){try{e&&(c=new b(c,e));var h=i.buffer2Uint8array(c);this._FS.writeFile(a,h,{flags:f.getFlagString(),encoding:"binary"}),this._FS.chmod(a,g)}catch(b){throw d(b,a)}},c.prototype.chmodSync=function(a,b,c){try{b?this._FS.lchmod(a,c):this._FS.chmod(a,c)}catch(b){throw d(b,a)}},c.prototype.chownSync=function(a,b,c,e){try{b?this._FS.lchown(a,c,e):this._FS.chown(a,c,e)}catch(b){throw d(b,a)}},c.prototype.symlinkSync=function(a,b,c){try{this._FS.symlink(a,b)}catch(a){throw d(a)}},c.prototype.readlinkSync=function(a){try{return this._FS.readlink(a)}catch(b){throw d(b,a)}},c.prototype.utimesSync=function(a,b,c){try{this._FS.utime(a,b.getTime(),c.getTime())}catch(b){throw d(b,a)}},c}(f.SynchronousFileSystem);c.__esModule=!0,c.default=l}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/file":55,"../core/file_system":57,"../core/node_fs_stats":60,"../core/util":61,"bfs-buffer":2}],40:[function(a,b,c){"use strict";function d(a,b){if(null!==b&&"object"==typeof b){var c=b,d=c.path;d&&(d="/"+i.relative(a,d),c.message=c.message.replace(c.path,d),c.path=d)}return b}function e(a,b){return"function"==typeof b?function(c){arguments.length>0&&(arguments[0]=d(a,c)),b.apply(null,arguments)}:b}function f(a,b,c){return"Sync"!==a.slice(a.length-4)?function(){return arguments.length>0&&(b&&(arguments[0]=i.join(this._folder,arguments[0])),c&&(arguments[1]=i.join(this._folder,arguments[1])),arguments[arguments.length-1]=e(this._folder,arguments[arguments.length-1])),this._wrapped[a].apply(this._wrapped,arguments)}:function(){try{return b&&(arguments[0]=i.join(this._folder,arguments[0])),c&&(arguments[1]=i.join(this._folder,arguments[1])),this._wrapped[a].apply(this._wrapped,arguments)}catch(a){throw d(this._folder,a)}}}var g=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},h=a("../core/file_system"),i=a("path"),j=a("../core/api_error"),k=function(a){function b(b,c){a.call(this),this._folder=b,this._wrapped=c}return g(b,a),b.prototype.initialize=function(a){var b=this;this._wrapped.exists(this._folder,function(c){c?a():b._wrapped.isReadOnly()?a(j.ApiError.ENOENT(b._folder)):b._wrapped.mkdir(b._folder,511,a)})},b.prototype.getName=function(){return this._wrapped.getName()},b.prototype.isReadOnly=function(){return this._wrapped.isReadOnly()},b.prototype.supportsProps=function(){return this._wrapped.supportsProps()},b.prototype.supportsSynch=function(){return this._wrapped.supportsSynch()},b.prototype.supportsLinks=function(){return!1},b.isAvailable=function(){return!0},b}(h.BaseFileSystem);c.__esModule=!0,c.default=k,["diskSpace","stat","statSync","open","openSync","unlink","unlinkSync","rmdir","rmdirSync","mkdir","mkdirSync","readdir","readdirSync","exists","existsSync","realpath","realpathSync","truncate","truncateSync","readFile","readFileSync","writeFile","writeFileSync","appendFile","appendFileSync","chmod","chmodSync","chown","chownSync","utimes","utimesSync","readlink","readlinkSync"].forEach(function(a){k.prototype[a]=f(a,!0,!1)}),["rename","renameSync","link","linkSync","symlink","symlinkSync"].forEach(function(a){k.prototype[a]=f(a,!0,!0)})},{"../core/api_error":52,"../core/file_system":57,path:10}],41:[function(a,b,c){"use strict";function d(a){return a.isDirectory}function e(a,b,c,d){if("undefined"!=typeof navigator.webkitPersistentStorage)switch(a){case n.PERSISTENT:navigator.webkitPersistentStorage.requestQuota(b,c,d);break;case n.TEMPORARY:navigator.webkitTemporaryStorage.requestQuota(b,c,d);break;default:d(new TypeError("Invalid storage type: "+a))}else n.webkitStorageInfo.requestQuota(a,b,c,d)}function f(a){return Array.prototype.slice.call(a||[],0)}var g=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},h=a("../generic/preload_file"),i=a("../core/file_system"),j=a("../core/api_error"),k=a("../core/file_flag"),l=a("../core/node_fs_stats"),m=a("path"),n=a("../core/global"),o=a("async"),p=a("../core/util"),q=n.webkitRequestFileSystem||n.requestFileSystem||null,r=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return g(b,a),b.prototype.sync=function(a){var b=this;if(this.isDirty()){var c={create:!1},d=this._fs,e=function(c){c.createWriter(function(c){var e=b.getBuffer(),f=new Blob([p.buffer2ArrayBuffer(e)]),g=f.size;c.onwriteend=function(){c.onwriteend=null,c.truncate(g),b.resetDirty(),a()},c.onerror=function(c){a(d.convert(c,b.getPath(),!1))},c.write(f)})},f=function(c){a(d.convert(c,b.getPath(),!1))};d.fs.root.getFile(this.getPath(),c,e,f)}else a()},b.prototype.close=function(a){this.sync(a)},b}(h.PreloadFile);c.HTML5FSFile=r;var s=function(a){function b(b,c){void 0===b&&(b=5),void 0===c&&(c=n.PERSISTENT),a.call(this),this.size=1048576*b,this.type=c}return g(b,a),b.prototype.getName=function(){return"HTML5 FileSystem"},b.isAvailable=function(){return null!=q},b.prototype.isReadOnly=function(){return!1},b.prototype.supportsSymlinks=function(){return!1},b.prototype.supportsProps=function(){return!1},b.prototype.supportsSynch=function(){return!1},b.prototype.convert=function(a,b,c){switch(a.name){case"PathExistsError":return j.ApiError.EEXIST(b);case"QuotaExceededError":return j.ApiError.FileError(j.ErrorCode.ENOSPC,b);case"NotFoundError":return j.ApiError.ENOENT(b);case"SecurityError":return j.ApiError.FileError(j.ErrorCode.EACCES,b);case"InvalidModificationError":return j.ApiError.FileError(j.ErrorCode.EPERM,b);case"TypeMismatchError":return j.ApiError.FileError(c?j.ErrorCode.ENOTDIR:j.ErrorCode.EISDIR,b);case"EncodingError":case"InvalidStateError":case"NoModificationAllowedError":default:return j.ApiError.FileError(j.ErrorCode.EINVAL,b)}},b.prototype.allocate=function(a){var b=this;void 0===a&&(a=function(){});var c=function(c){b.fs=c,a()},d=function(c){a(b.convert(c,"/",!0))};this.type===n.PERSISTENT?e(this.type,this.size,function(a){q(b.type,a,c,d)},d):q(this.type,this.size,c,d)},b.prototype.empty=function(a){var b=this;this._readdir("/",function(c,e){if(c)console.error("Failed to empty FS"),a(c);else{var f=function(b){c?(console.error("Failed to empty FS"),a(c)):a()},g=function(a,c){var e=function(){c()},f=function(d){c(b.convert(d,a.fullPath,!a.isDirectory))};d(a)?a.removeRecursively(e,f):a.remove(e,f)};o.each(e,g,f)}})},b.prototype.rename=function(a,b,c){var d=this,e=2,f=0,g=this.fs.root,h=a,i=function(a){--e<=0&&c(d.convert(a,h,!1))},k=function(e){return 2===++f?c(new j.ApiError(j.ErrorCode.EINVAL,"Something was identified as both a file and a directory. This should never happen.")):a===b?c():(h=m.dirname(b),void g.getDirectory(h,{},function(f){h=m.basename(b),e.moveTo(f,h,function(a){c()},function(f){e.isDirectory?(h=b,d.unlink(b,function(e){e?i(f):d.rename(a,b,c)})):i(f)})},i))};g.getFile(a,{},k,i),g.getDirectory(a,{},k,i)},b.prototype.stat=function(a,b,c){var d=this,e={create:!1},f=function(a){var b=function(a){var b=new l.default(l.FileType.FILE,a.size);c(null,b)};a.file(b,h)},g=function(a){var b=4096,d=new l.default(l.FileType.DIRECTORY,b);c(null,d)},h=function(b){c(d.convert(b,a,!1))},i=function(){d.fs.root.getDirectory(a,e,g,h)};this.fs.root.getFile(a,e,f,i)},b.prototype.open=function(a,b,c,d){var e=this,f=function(c){d("InvalidModificationError"===c.name&&b.isExclusive()?j.ApiError.EEXIST(a):e.convert(c,a,!1))};this.fs.root.getFile(a,{create:b.pathNotExistsAction()===k.ActionType.CREATE_FILE,exclusive:b.isExclusive()},function(c){c.file(function(c){var g=new FileReader;g.onloadend=function(f){var h=e._makeFile(a,b,c,g.result);d(null,h)},g.onerror=function(a){f(g.error)},g.readAsArrayBuffer(c)},f)},f)},b.prototype._statType=function(a){return a.isFile?l.FileType.FILE:l.FileType.DIRECTORY},b.prototype._makeFile=function(a,b,c,d){void 0===d&&(d=new ArrayBuffer(0));var e=new l.default(l.FileType.FILE,c.size),f=p.arrayBuffer2Buffer(d);return new r(this,a,b,e,f)},b.prototype._remove=function(a,b,c){var d=this,e=function(e){var f=function(){b()},g=function(e){b(d.convert(e,a,!c))};e.remove(f,g)},f=function(e){b(d.convert(e,a,!c))},g={create:!1};c?this.fs.root.getFile(a,g,e,f):this.fs.root.getDirectory(a,g,e,f)},b.prototype.unlink=function(a,b){this._remove(a,b,!0)},b.prototype.rmdir=function(a,b){var c=this;this.readdir(a,function(d,e){d?b(d):e.length>0?b(j.ApiError.ENOTEMPTY(a)):c._remove(a,b,!1)})},b.prototype.mkdir=function(a,b,c){var d=this,e={create:!0,exclusive:!0},f=function(a){c()},g=function(b){c(d.convert(b,a,!0))};this.fs.root.getDirectory(a,e,f,g)},b.prototype._readdir=function(a,b){var c=this,d=function(d){b(c.convert(d,a,!0))};this.fs.root.getDirectory(a,{create:!1},function(a){var c=a.createReader(),e=[],g=function(){c.readEntries(function(a){a.length?(e=e.concat(f(a)),g()):b(null,e)},d)};g()},d)},b.prototype.readdir=function(a,b){this._readdir(a,function(a,c){if(a)return b(a);for(var d=[],e=0;e<c.length;e++)d.push(c[e].name);b(null,d)})},b}(i.BaseFileSystem);c.__esModule=!0,c.default=s},{"../core/api_error":52,"../core/file_flag":56,"../core/file_system":57,"../core/global":58,"../core/node_fs_stats":60,"../core/util":61,"../generic/preload_file":68,async:1,path:10}],42:[function(a,b,c){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("../generic/key_value_filesystem"),f=function(){function a(){this.store={}}return a.prototype.name=function(){return"In-memory"},a.prototype.clear=function(){this.store={}},a.prototype.beginTransaction=function(a){return new e.SimpleSyncRWTransaction(this)},a.prototype.get=function(a){return this.store[a]},a.prototype.put=function(a,b,c){return!(!c&&this.store.hasOwnProperty(a))&&(this.store[a]=b,!0)},a.prototype.del=function(a){delete this.store[a]},a}();c.InMemoryStore=f;var g=function(a){function b(){a.call(this,{store:new f})}return d(b,a),b}(e.SyncKeyValueFileSystem);c.__esModule=!0,c.default=g},{"../generic/key_value_filesystem":65}],43:[function(a,b,c){"use strict";function d(a,b){switch(void 0===b&&(b=a.toString()),a.name){case"NotFoundError":return new h.ApiError(h.ErrorCode.ENOENT,b);case"QuotaExceededError":return new h.ApiError(h.ErrorCode.ENOSPC,b);default:return new h.ApiError(h.ErrorCode.EIO,b)}}function e(a,b,c){return void 0===b&&(b=h.ErrorCode.EIO),void 0===c&&(c=null),function(d){d.preventDefault(),a(new h.ApiError(b,c))}}var f=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},g=a("../generic/key_value_filesystem"),h=a("../core/api_error"),i=a("../core/global"),j=a("../core/util"),k=i.indexedDB||i.mozIndexedDB||i.webkitIndexedDB||i.msIndexedDB,l=function(){function a(a,b){this.tx=a,this.store=b}return a.prototype.get=function(a,b){try{var c=this.store.get(a);c.onerror=e(b),c.onsuccess=function(a){var c=a.target.result;void 0===c?b(null,c):b(null,j.arrayBuffer2Buffer(c))}}catch(a){b(d(a))}},a}();c.IndexedDBROTransaction=l;var m=function(a){function b(b,c){a.call(this,b,c)}return f(b,a),b.prototype.put=function(a,b,c,f){try{var g,h=j.buffer2ArrayBuffer(b);g=c?this.store.put(h,a):this.store.add(h,a),g.onerror=e(f),g.onsuccess=function(a){f(null,!0)}}catch(a){f(d(a))}},b.prototype.del=function(a,b){try{var c=this.store.delete(a);c.onerror=e(b),c.onsuccess=function(a){b()}}catch(a){b(d(a))}},b.prototype.commit=function(a){setTimeout(a,0)},b.prototype.abort=function(a){var b;try{this.tx.abort()}catch(a){b=d(a)}finally{a(b)}},b}(l);c.IndexedDBRWTransaction=m;var n=function(){function a(a,b){var c=this;void 0===b&&(b="browserfs"),this.storeName=b;var d=k.open(this.storeName,1);d.onupgradeneeded=function(a){var b=a.target.result;b.objectStoreNames.contains(c.storeName)&&b.deleteObjectStore(c.storeName),b.createObjectStore(c.storeName)},d.onsuccess=function(b){c.db=b.target.result,a(null,c)},d.onerror=e(a,h.ErrorCode.EACCES)}return a.prototype.name=function(){return"IndexedDB - "+this.storeName},a.prototype.clear=function(a){try{var b=this.db.transaction(this.storeName,"readwrite"),c=b.objectStore(this.storeName),f=c.clear();f.onsuccess=function(b){setTimeout(a,0)},f.onerror=e(a)}catch(b){a(d(b))}},a.prototype.beginTransaction=function(a){void 0===a&&(a="readonly");var b=this.db.transaction(this.storeName,a),c=b.objectStore(this.storeName);if("readwrite"===a)return new m(b,c);if("readonly"===a)return new l(b,c);throw new h.ApiError(h.ErrorCode.EINVAL,"Invalid transaction type.")},a}();c.IndexedDBStore=n;var o=function(a){function b(b,c){var d=this;a.call(this),new n(function(a,c){a?b(a):d.init(c,function(a){b(a,d)})},c)}return f(b,a),b.isAvailable=function(){try{return"undefined"!=typeof k&&null!==k.open("__browserfs_test__")}catch(a){return!1}},b}(g.AsyncKeyValueFileSystem);c.__esModule=!0,c.default=o},{"../core/api_error":52,"../core/global":58,"../core/util":61,"../generic/key_value_filesystem":65}],44:[function(a,b,c){(function(b){"use strict";var d,e=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},f=a("../generic/key_value_filesystem"),g=a("../core/api_error"),h=a("../core/global"),i=!1;try{h.localStorage.setItem("__test__",String.fromCharCode(55296)),i=h.localStorage.getItem("__test__")===String.fromCharCode(55296)}catch(a){i=!1}d=i?"binary_string":"binary_string_ie",b.isEncoding(d)||(d="base64");var j=function(){function a(){}return a.prototype.name=function(){return"LocalStorage"},a.prototype.clear=function(){h.localStorage.clear()},a.prototype.beginTransaction=function(a){return new f.SimpleSyncRWTransaction(this)},a.prototype.get=function(a){try{var c=h.localStorage.getItem(a);if(null!==c)return new b(c,d)}catch(a){}},a.prototype.put=function(a,b,c){try{return!(!c&&null!==h.localStorage.getItem(a))&&(h.localStorage.setItem(a,b.toString(d)),!0)}catch(a){throw new g.ApiError(g.ErrorCode.ENOSPC,"LocalStorage is full.")}},a.prototype.del=function(a){try{h.localStorage.removeItem(a)}catch(b){throw new g.ApiError(g.ErrorCode.EIO,"Unable to delete key "+a+": "+b)}},a}();c.LocalStorageStore=j;var k=function(a){function b(){a.call(this,{store:new j})}return e(b,a),b.isAvailable=function(){return"undefined"!=typeof h.localStorage},b}(f.SyncKeyValueFileSystem);c.__esModule=!0,c.default=k}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/global":58,"../generic/key_value_filesystem":65,"bfs-buffer":2}],45:[function(a,b,c){"use strict";function d(a,b,c){return b?function(){for(var b=[],c=0;c<arguments.length;c++)b[c-0]=arguments[c];var d=this,e=b[0],f=d._getFs(e);b[0]=f.path;try{return f.fs[a].apply(f.fs,b)}catch(a){throw d.standardizeError(a,f.path,e),a}}:function(){for(var b=[],c=0;c<arguments.length;c++)b[c-0]=arguments[c];var d=this,e=b[0],f=d._getFs(e);if(b[0]=f.path,"function"==typeof b[b.length-1]){var g=b[b.length-1];b[b.length-1]=function(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];a.length>0&&a[0]instanceof h.ApiError&&d.standardizeError(a[0],f.path,e),g.apply(null,a)}}return f.fs[a].apply(f.fs,b)}}var e=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},f=a("../core/file_system"),g=a("./InMemory"),h=a("../core/api_error"),i=a("../core/node_fs"),j=a("path"),k=a("../core/util"),l=function(a){function b(){a.call(this),this.mountList=[],this.mntMap={},this.rootFs=new g.default}return e(b,a),b.prototype.mount=function(a,b){if("/"!==a[0]&&(a="/"+a),a=j.resolve(a),this.mntMap[a])throw new h.ApiError(h.ErrorCode.EINVAL,"Mount point "+a+" is already taken.");k.mkdirpSync(a,511,this.rootFs),this.mntMap[a]=b,this.mountList.push(a),this.mountList=this.mountList.sort(function(a,b){return b.length-a.length})},b.prototype.umount=function(a){if("/"!==a[0]&&(a="/"+a),a=j.resolve(a),!this.mntMap[a])throw new h.ApiError(h.ErrorCode.EINVAL,"Mount point "+a+" is already unmounted.");for(delete this.mntMap[a],this.mountList.splice(this.mountList.indexOf(a),1);"/"!==a&&0===this.rootFs.readdirSync(a).length;)this.rootFs.rmdirSync(a),a=j.dirname(a)},b.prototype._getFs=function(a){for(var b=this.mountList,c=b.length,d=0;d<c;d++){var e=b[d];if(e.length<=a.length&&0===a.indexOf(e))return a=a.substr(e.length>1?e.length:0),""===a&&(a="/"),{fs:this.mntMap[e],path:a}}return{fs:this.rootFs,path:a}},b.prototype.getName=function(){return"MountableFileSystem"},b.isAvailable=function(){return!0},b.prototype.diskSpace=function(a,b){b(0,0)},b.prototype.isReadOnly=function(){return!1},b.prototype.supportsLinks=function(){return!1},b.prototype.supportsProps=function(){return!1},b.prototype.supportsSynch=function(){return!0},b.prototype.standardizeError=function(a,b,c){var d;return-1!==(d=a.message.indexOf(b))&&(a.message=a.message.substr(0,d)+c+a.message.substr(d+b.length),a.path=c),a},b.prototype.rename=function(a,b,c){var d=this._getFs(a),e=this._getFs(b);if(d.fs===e.fs){var f=this;return d.fs.rename(d.path,e.path,function(g){g&&f.standardizeError(f.standardizeError(g,d.path,a),e.path,b),c(g)})}return i.readFile(a,function(d,e){return d?c(d):void i.writeFile(b,e,function(b){return b?c(b):void i.unlink(a,c)})})},b.prototype.renameSync=function(a,b){var c=this._getFs(a),d=this._getFs(b);if(c.fs===d.fs)try{return c.fs.renameSync(c.path,d.path)}catch(e){throw this.standardizeError(this.standardizeError(e,c.path,a),d.path,b),e}var e=i.readFileSync(a);return i.writeFileSync(b,e),i.unlinkSync(a)},b.prototype.readdirSync=function(a){var b=this._getFs(a),c=null;if(b.fs!==this.rootFs)try{c=this.rootFs.readdirSync(a)}catch(a){}try{var d=b.fs.readdirSync(b.path);return null===c?d:d.concat(c.filter(function(a){return d.indexOf(a)===-1}))}catch(d){if(null===c)throw this.standardizeError(d,b.path,a);return c}},b.prototype.readdir=function(a,b){var c=this,d=this._getFs(a);d.fs.readdir(d.path,function(e,f){if(d.fs!==c.rootFs)try{var g=c.rootFs.readdirSync(a);f=f?f.concat(g.filter(function(a){return f.indexOf(a)===-1})):g}catch(f){if(e)return b(c.standardizeError(e,d.path,a))}else if(e)return b(c.standardizeError(e,d.path,a));b(null,f)})},b.prototype.rmdirSync=function(a){var b=this._getFs(a);if(this._containsMountPt(a))throw h.ApiError.ENOTEMPTY(a);try{b.fs.rmdirSync(b.path)}catch(c){throw this.standardizeError(c,b.path,a)}},b.prototype._containsMountPt=function(a){for(var b=this.mountList,c=b.length,d=0;d<c;d++){var e=b[d];if(e.length>=a.length&&e.slice(0,a.length)===a)return!0}return!1},b.prototype.rmdir=function(a,b){var c=this,d=this._getFs(a);this._containsMountPt(a)?b(h.ApiError.ENOTEMPTY(a)):d.fs.rmdir(d.path,function(e){b(e?c.standardizeError(e,d.path,a):null)})},b}(f.BaseFileSystem);c.__esModule=!0,c.default=l;for(var m=[["exists","unlink","readlink"],["stat","mkdir","realpath","truncate"],["open","readFile","chmod","utimes"],["chown"],["writeFile","appendFile"]],n=0;n<m.length;n++)for(var o=m[n],p=0;p<o.length;p++){var q=o[p];l.prototype[q]=d(q,!1,n+1),l.prototype[q+"Sync"]=d(q+"Sync",!0,n+1)}},{"../core/api_error":52,"../core/file_system":57,"../core/node_fs":59,"../core/util":61,"./InMemory":42,path:10}],46:[function(a,b,c){"use strict";function d(a){return 146|a}function e(a){return i.FileFlag.getFileFlag(a)}var f=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},g=a("../core/file_system"),h=a("../core/api_error"),i=a("../core/file_flag"),j=a("../generic/preload_file"),k=a("../generic/locked_fs"),l=a("path"),m="/.deletedFiles.log",n=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return f(b,a),b.prototype.sync=function(a){var b=this;return this.isDirty()?void this._fs._syncAsync(this,function(c){b.resetDirty(),a(c)}):void a(null)},b.prototype.syncSync=function(){this.isDirty()&&(this._fs._syncSync(this),this.resetDirty())},b.prototype.close=function(a){this.sync(a)},b.prototype.closeSync=function(){this.syncSync()},b}(j.PreloadFile),o=function(a){function b(b,c){if(a.call(this),this._isInitialized=!1,this._initializeCallbacks=[],this._deletedFiles={},this._deleteLog="",this._deleteLogUpdatePending=!1,this._deleteLogUpdateNeeded=!1,this._deleteLogError=null,this._writable=b,this._readable=c,this._writable.isReadOnly())throw new h.ApiError(h.ErrorCode.EINVAL,"Writable file system must be writable.")}return f(b,a),b.prototype.checkInitialized=function(){if(!this._isInitialized)throw new h.ApiError(h.ErrorCode.EPERM,"OverlayFS is not initialized. Please initialize OverlayFS using its initialize() method before using it.");if(null!==this._deleteLogError){var a=this._deleteLogError;throw this._deleteLogError=null,a}},b.prototype.checkInitAsync=function(a){if(!this._isInitialized)return a(new h.ApiError(h.ErrorCode.EPERM,"OverlayFS is not initialized. Please initialize OverlayFS using its initialize() method before using it.")),!1;if(null!==this._deleteLogError){var b=this._deleteLogError;return this._deleteLogError=null,a(b),!1}return!0},b.prototype.checkPath=function(a){if(a===m)throw h.ApiError.EPERM(a)},b.prototype.checkPathAsync=function(a,b){return a===m&&(b(h.ApiError.EPERM(a)),!0)},b.prototype.getOverlayedFileSystems=function(){return{readable:this._readable,writable:this._writable}},b.prototype.createParentDirectoriesAsync=function(a,b){function c(a,b){a?(f.push(e),e=l.dirname(e),g._writable.stat(e,!1,c)):d()}function d(){if(!f.length)return b();var a=f.pop();g._readable.stat(a,!1,function(c,e){return e?void g._writable.mkdir(a,e.mode,function(a){return a?b(a):void d()}):b()})}var e=l.dirname(a),f=[],g=this;this._writable.stat(e,!1,c)},b.prototype.createParentDirectories=function(a){for(var b=this,c=l.dirname(a),d=[];!this._writable.existsSync(c);)d.push(c),
c=l.dirname(c);d=d.reverse(),d.forEach(function(a){b._writable.mkdirSync(a,b.statSync(a,!1).mode)})},b.isAvailable=function(){return!0},b.prototype._syncAsync=function(a,b){var c=this;this.createParentDirectoriesAsync(a.getPath(),function(d){return d?b(d):void c._writable.writeFile(a.getPath(),a.getBuffer(),null,e("w"),a.getStats().mode,b)})},b.prototype._syncSync=function(a){this.createParentDirectories(a.getPath()),this._writable.writeFileSync(a.getPath(),a.getBuffer(),null,e("w"),a.getStats().mode)},b.prototype.getName=function(){return"OverlayFS"},b.prototype.initialize=function(a){var b=this,c=this._initializeCallbacks,d=function(a){b._isInitialized=!a,b._initializeCallbacks=[],c.forEach(function(b){return b(a)})};return this._isInitialized?a():(c.push(a),void(1===c.length&&this._writable.readFile(m,"utf8",e("r"),function(a,c){if(a){if(a.errno!==h.ErrorCode.ENOENT)return d(a)}else b._deleteLog=c;b._reparseDeletionLog(),d(null)})))},b.prototype.isReadOnly=function(){return!1},b.prototype.supportsSynch=function(){return this._readable.supportsSynch()&&this._writable.supportsSynch()},b.prototype.supportsLinks=function(){return!1},b.prototype.supportsProps=function(){return this._readable.supportsProps()&&this._writable.supportsProps()},b.prototype.deletePath=function(a){this._deletedFiles[a]=!0,this.updateLog("d"+a+"\n")},b.prototype.updateLog=function(a){var b=this;this._deleteLog+=a,this._deleteLogUpdatePending?this._deleteLogUpdateNeeded=!0:(this._deleteLogUpdatePending=!0,this._writable.writeFile(m,this._deleteLog,"utf8",i.FileFlag.getFileFlag("w"),420,function(a){b._deleteLogUpdatePending=!1,a?b._deleteLogError=a:b._deleteLogUpdateNeeded&&(b._deleteLogUpdateNeeded=!1,b.updateLog(""))}))},b.prototype.getDeletionLog=function(){return this._deleteLog},b.prototype._reparseDeletionLog=function(){var a=this;this._deletedFiles={},this._deleteLog.split("\n").forEach(function(b){a._deletedFiles[b.slice(1)]="d"===b.slice(0,1)})},b.prototype.restoreDeletionLog=function(a){this._deleteLog=a,this._reparseDeletionLog(),this.updateLog("")},b.prototype.rename=function(a,b,c){var d=this;if(this.checkInitAsync(c)&&!this.checkPathAsync(a,c)&&!this.checkPathAsync(b,c))return a===m||b===m?c(h.ApiError.EPERM("Cannot rename deletion log.")):a===b?c():void this.stat(a,!1,function(f,g){return f?c(f):d.stat(b,!1,function(f,i){function j(d){var e=d.shift();if(!e)return c();var f=l.resolve(a,e),g=l.resolve(b,e);this.rename(f,g,function(a){return a?c(a):void j(d)})}var k=511;if(g.isDirectory()){if(f)return f.errno!==h.ErrorCode.ENOENT?c(f):d._writable.exists(a,function(e){return e?d._writable.rename(a,b,c):void d._writable.mkdir(b,k,function(b){return b?c(b):void d._readable.readdir(a,function(a,b){return a?c():void j(b)})})});if(k=i.mode,!i.isDirectory())return c(h.ApiError.ENOTDIR(b));d.readdir(b,function(e,f){return f&&f.length?c(h.ApiError.ENOTEMPTY(b)):void d._readable.readdir(a,function(a,b){return a?c():void j(b)})})}return i&&i.isDirectory()?c(h.ApiError.EISDIR(b)):void d.readFile(a,null,e("r"),function(f,h){return f?c(f):d.writeFile(b,h,null,e("w"),g.mode,function(b){return b?c(b):d.unlink(a,c)})})})})},b.prototype.renameSync=function(a,b){var c=this;if(this.checkInitialized(),this.checkPath(a),this.checkPath(b),a===m||b===m)throw h.ApiError.EPERM("Cannot rename deletion log.");var d=this.statSync(a,!1);if(d.isDirectory()){if(a===b)return;var f=511;if(this.existsSync(b)){var g=this.statSync(b,!1),f=g.mode;if(!g.isDirectory())throw h.ApiError.ENOTDIR(b);if(this.readdirSync(b).length>0)throw h.ApiError.ENOTEMPTY(b)}this._writable.existsSync(a)?this._writable.renameSync(a,b):this._writable.existsSync(b)||this._writable.mkdirSync(b,f),this._readable.existsSync(a)&&this._readable.readdirSync(a).forEach(function(d){c.renameSync(l.resolve(a,d),l.resolve(b,d))})}else{if(this.existsSync(b)&&this.statSync(b,!1).isDirectory())throw h.ApiError.EISDIR(b);this.writeFileSync(b,this.readFileSync(a,null,e("r")),null,e("w"),d.mode)}a!==b&&this.existsSync(a)&&this.unlinkSync(a)},b.prototype.stat=function(a,b,c){var e=this;this.checkInitAsync(c)&&this._writable.stat(a,b,function(f,g){f&&f.errno===h.ErrorCode.ENOENT?(e._deletedFiles[a]&&c(h.ApiError.ENOENT(a)),e._readable.stat(a,b,function(a,b){b&&(b=b.clone(),b.mode=d(b.mode)),c(a,b)})):c(f,g)})},b.prototype.statSync=function(a,b){this.checkInitialized();try{return this._writable.statSync(a,b)}catch(e){if(this._deletedFiles[a])throw h.ApiError.ENOENT(a);var c=this._readable.statSync(a,b).clone();return c.mode=d(c.mode),c}},b.prototype.open=function(a,b,c,d){var f=this;this.checkInitAsync(d)&&!this.checkPathAsync(a,d)&&this.stat(a,!1,function(g,j){if(j)switch(b.pathExistsAction()){case i.ActionType.TRUNCATE_FILE:return f.createParentDirectoriesAsync(a,function(e){return e?d(e):void f._writable.open(a,b,c,d)});case i.ActionType.NOP:return f._writable.exists(a,function(g){g?f._writable.open(a,b,c,d):(j=j.clone(),j.mode=c,f._readable.readFile(a,null,e("r"),function(c,e){if(c)return d(c);j.size===-1&&(j.size=e.length);var g=new n(f,a,b,j,e);d(null,g)}))});default:return d(h.ApiError.EEXIST(a))}else switch(b.pathNotExistsAction()){case i.ActionType.CREATE_FILE:return f.createParentDirectoriesAsync(a,function(e){return e?d(e):f._writable.open(a,b,c,d)});default:return d(h.ApiError.ENOENT(a))}})},b.prototype.openSync=function(a,b,c){if(this.checkInitialized(),this.checkPath(a),a===m)throw h.ApiError.EPERM("Cannot open deletion log.");if(this.existsSync(a))switch(b.pathExistsAction()){case i.ActionType.TRUNCATE_FILE:return this.createParentDirectories(a),this._writable.openSync(a,b,c);case i.ActionType.NOP:if(this._writable.existsSync(a))return this._writable.openSync(a,b,c);var d=this._readable.readFileSync(a,null,e("r")),f=this._readable.statSync(a,!1).clone();return f.mode=c,new n(this,a,b,f,d);default:throw h.ApiError.EEXIST(a)}else switch(b.pathNotExistsAction()){case i.ActionType.CREATE_FILE:return this.createParentDirectories(a),this._writable.openSync(a,b,c);default:throw h.ApiError.ENOENT(a)}},b.prototype.unlink=function(a,b){var c=this;this.checkInitAsync(b)&&!this.checkPathAsync(a,b)&&this.exists(a,function(d){return d?void c._writable.exists(a,function(d){return d?c._writable.unlink(a,function(d){return d?b(d):void c.exists(a,function(d){d&&c.deletePath(a),b(null)})}):(c.deletePath(a),void b(null))}):b(h.ApiError.ENOENT(a))})},b.prototype.unlinkSync=function(a){if(this.checkInitialized(),this.checkPath(a),!this.existsSync(a))throw h.ApiError.ENOENT(a);this._writable.existsSync(a)&&this._writable.unlinkSync(a),this.existsSync(a)&&this.deletePath(a)},b.prototype.rmdir=function(a,b){var c=this;if(this.checkInitAsync(b)){var d=function(){c.readdir(a,function(d,e){return d?b(d):e.length?b(h.ApiError.ENOTEMPTY(a)):(c.deletePath(a),void b(null))})};this.exists(a,function(e){return e?void c._writable.exists(a,function(e){e?c._writable.rmdir(a,function(e){return e?b(e):void c._readable.exists(a,function(a){a?d():b()})}):d()}):b(h.ApiError.ENOENT(a))})}},b.prototype.rmdirSync=function(a){if(this.checkInitialized(),!this.existsSync(a))throw h.ApiError.ENOENT(a);if(this._writable.existsSync(a)&&this._writable.rmdirSync(a),this.existsSync(a)){if(this.readdirSync(a).length>0)throw h.ApiError.ENOTEMPTY(a);this.deletePath(a)}},b.prototype.mkdir=function(a,b,c){var d=this;this.checkInitAsync(c)&&this.exists(a,function(e){return e?c(h.ApiError.EEXIST(a)):void d.createParentDirectoriesAsync(a,function(e){return e?c(e):void d._writable.mkdir(a,b,c)})})},b.prototype.mkdirSync=function(a,b){if(this.checkInitialized(),this.existsSync(a))throw h.ApiError.EEXIST(a);this.createParentDirectories(a),this._writable.mkdirSync(a,b)},b.prototype.readdir=function(a,b){var c=this;this.checkInitAsync(b)&&this.stat(a,!1,function(d,e){return d?b(d):e.isDirectory()?void c._writable.readdir(a,function(d,e){return d&&"ENOENT"!==d.code?b(d):(!d&&e||(e=[]),void c._readable.readdir(a,function(d,f){!d&&f||(f=[]);var g={},h=e.concat(f.filter(function(b){return!c._deletedFiles[a+"/"+b]})).filter(function(a){var b=!g[a];return g[a]=!0,b});b(null,h)}))}):b(h.ApiError.ENOTDIR(a))})},b.prototype.readdirSync=function(a){var b=this;this.checkInitialized();var c=this.statSync(a,!1);if(!c.isDirectory())throw h.ApiError.ENOTDIR(a);var d=[];try{d=d.concat(this._writable.readdirSync(a))}catch(a){}try{d=d.concat(this._readable.readdirSync(a).filter(function(c){return!b._deletedFiles[a+"/"+c]}))}catch(a){}var e={};return d.filter(function(a){var b=!e[a];return e[a]=!0,b})},b.prototype.exists=function(a,b){var c=this;this.checkInitialized(),this._writable.exists(a,function(d){return d?b(!0):void c._readable.exists(a,function(d){b(d&&c._deletedFiles[a]!==!0)})})},b.prototype.existsSync=function(a){return this.checkInitialized(),this._writable.existsSync(a)||this._readable.existsSync(a)&&this._deletedFiles[a]!==!0},b.prototype.chmod=function(a,b,c,d){var e=this;this.checkInitAsync(d)&&this.operateOnWritableAsync(a,function(f){return f?d(f):void e._writable.chmod(a,b,c,d)})},b.prototype.chmodSync=function(a,b,c){var d=this;this.checkInitialized(),this.operateOnWritable(a,function(){d._writable.chmodSync(a,b,c)})},b.prototype.chown=function(a,b,c,d,e){var f=this;this.checkInitAsync(e)&&this.operateOnWritableAsync(a,function(g){return g?e(g):void f._writable.chown(a,b,c,d,e)})},b.prototype.chownSync=function(a,b,c,d){var e=this;this.checkInitialized(),this.operateOnWritable(a,function(){e._writable.chownSync(a,b,c,d)})},b.prototype.utimes=function(a,b,c,d){var e=this;this.checkInitAsync(d)&&this.operateOnWritableAsync(a,function(f){return f?d(f):void e._writable.utimes(a,b,c,d)})},b.prototype.utimesSync=function(a,b,c){var d=this;this.checkInitialized(),this.operateOnWritable(a,function(){d._writable.utimesSync(a,b,c)})},b.prototype.operateOnWritable=function(a,b){if(!this.existsSync(a))throw h.ApiError.ENOENT(a);this._writable.existsSync(a)||this.copyToWritable(a),b()},b.prototype.operateOnWritableAsync=function(a,b){var c=this;this.exists(a,function(d){return d?void c._writable.exists(a,function(d){return d?void b():c.copyToWritableAsync(a,b)}):b(h.ApiError.ENOENT(a))})},b.prototype.copyToWritable=function(a){var b=this.statSync(a,!1);b.isDirectory()?this._writable.mkdirSync(a,b.mode):this.writeFileSync(a,this._readable.readFileSync(a,null,e("r")),null,e("w"),this.statSync(a,!1).mode)},b.prototype.copyToWritableAsync=function(a,b){var c=this;this.stat(a,!1,function(d,f){return d?b(d):f.isDirectory()?c._writable.mkdir(a,f.mode,b):void c._readable.readFile(a,null,e("r"),function(d,g){return d?b(d):void c.writeFile(a,g,null,e("w"),f.mode,b)})})},b}(g.BaseFileSystem);c.UnlockedOverlayFS=o;var p=function(a){function b(b,c){a.call(this,new o(b,c))}return f(b,a),b.prototype.initialize=function(b){a.prototype.initialize.call(this,b)},b.isAvailable=function(){return o.isAvailable()},b.prototype.getOverlayedFileSystems=function(){return a.prototype.getFSUnlocked.call(this).getOverlayedFileSystems()},b.prototype.unwrap=function(){return a.prototype.getFSUnlocked.call(this)},b}(k.default);c.__esModule=!0,c.default=p},{"../core/api_error":52,"../core/file_flag":56,"../core/file_system":57,"../generic/locked_fs":66,"../generic/preload_file":68,path:10}],47:[function(a,b,c){(function(b){"use strict";function d(a){return{type:r.API_ERROR,errorData:l(a.writeToBuffer())}}function e(a){return u.ApiError.fromBuffer(m(a.errorData))}function f(a){return{type:r.ERROR,name:a.name,message:a.message,stack:a.stack}}function g(a){var b=A[a.name];"function"!=typeof b&&(b=Error);var c=new b(a.message);return c.stack=a.stack,c}function h(a){return{type:r.STATS,statsData:l(a.toBuffer())}}function i(a){return y.default.fromBuffer(m(a.statsData))}function j(a){return{type:r.FILEFLAG,flagStr:a.getFlagString()}}function k(a){return v.FileFlag.getFileFlag(a.flagStr)}function l(a){return w.buffer2ArrayBuffer(a)}function m(a){return w.arrayBuffer2Buffer(a)}function n(a){return{type:r.BUFFER,data:l(a)}}function o(a){return m(a.data)}function p(a){return null!=a&&"object"==typeof a&&a.hasOwnProperty("browserfsMessage")&&a.browserfsMessage}function q(a){return null!=a&&"object"==typeof a&&a.hasOwnProperty("browserfsMessage")&&a.browserfsMessage}var r,s=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},t=a("../core/file_system"),u=a("../core/api_error"),v=a("../core/file_flag"),w=a("../core/util"),x=a("../core/file"),y=a("../core/node_fs_stats"),z=a("../generic/preload_file"),A=a("../core/global"),B=a("../core/node_fs");!function(a){a[a.CB=0]="CB",a[a.FD=1]="FD",a[a.API_ERROR=2]="API_ERROR",a[a.STATS=3]="STATS",a[a.PROBE=4]="PROBE",a[a.FILEFLAG=5]="FILEFLAG",a[a.BUFFER=6]="BUFFER",a[a.ERROR=7]="ERROR"}(r||(r={}));var C=function(){function a(){this._callbacks={},this._nextId=0}return a.prototype.toRemoteArg=function(a){var b=this._nextId++;return this._callbacks[b]=a,{type:r.CB,id:b}},a.prototype.toLocalArg=function(a){var b=this._callbacks[a];return delete this._callbacks[a],b},a}(),D=function(){function a(){this._fileDescriptors={},this._nextId=0}return a.prototype.toRemoteArg=function(a,c,d,e){var f,g,h=this._nextId++;this._fileDescriptors[h]=a,a.stat(function(i,j){i?e(i):(g=l(j.toBuffer()),d.isReadable()?a.read(new b(j.size),0,j.size,0,function(a,b,i){a?e(a):(f=l(i),e(null,{type:r.FD,id:h,data:f,stat:g,path:c,flag:d.getFlagString()}))}):e(null,{type:r.FD,id:h,data:new ArrayBuffer(0),stat:g,path:c,flag:d.getFlagString()}))})},a.prototype._applyFdChanges=function(a,b){var c=this._fileDescriptors[a.id],d=m(a.data),e=y.default.fromBuffer(m(a.stat)),f=v.FileFlag.getFileFlag(a.flag);f.isWriteable()?c.write(d,0,d.length,f.isAppendable()?c.getPos():0,function(a){function g(){c.stat(function(a,d){a?b(a):d.mode!==e.mode?c.chmod(e.mode,function(a){b(a,c)}):b(a,c)})}a?b(a):f.isAppendable()?g():c.truncate(d.length,function(){g()})}):b(null,c)},a.prototype.applyFdAPIRequest=function(a,b){var c=this,d=a.args[0];this._applyFdChanges(d,function(e,f){e?b(e):f[a.method](function(e){"close"===a.method&&delete c._fileDescriptors[d.id],b(e)})})},a}(),E=function(a){function b(b,c,d,e,f,g){a.call(this,b,c,d,e,g),this._remoteFdId=f}return s(b,a),b.prototype.getRemoteFdId=function(){return this._remoteFdId},b.prototype.toRemoteArg=function(){return{type:r.FD,id:this._remoteFdId,data:l(this.getBuffer()),stat:l(this.getStats().toBuffer()),path:this.getPath(),flag:this.getFlag().getFlagString()}},b.prototype._syncClose=function(a,b){var c=this;this.isDirty()?this._fs.syncClose(a,this,function(a){a||c.resetDirty(),b(a)}):b()},b.prototype.sync=function(a){this._syncClose("sync",a)},b.prototype.close=function(a){this._syncClose("close",a)},b}(z.PreloadFile),F=function(a){function c(b){var c=this;a.call(this),this._callbackConverter=new C,this._isInitialized=!1,this._isReadOnly=!1,this._supportLinks=!1,this._supportProps=!1,this._outstandingRequests={},this._worker=b,this._worker.addEventListener("message",function(a){var b=a.data;if(q(b)){var d,e=b.args,f=new Array(e.length);for(d=0;d<f.length;d++)f[d]=c._argRemote2Local(e[d]);c._callbackConverter.toLocalArg(b.cbId).apply(null,f)}})}return s(c,a),c.isAvailable=function(){return"undefined"!=typeof importScripts||"undefined"!=typeof Worker},c.prototype.getName=function(){return"WorkerFS"},c.prototype._argRemote2Local=function(a){if(null==a)return a;switch(typeof a){case"object":if(null==a.type||"number"!=typeof a.type)return a;var b=a;switch(b.type){case r.API_ERROR:return e(b);case r.FD:var c=b;return new E(this,c.path,v.FileFlag.getFileFlag(c.flag),y.default.fromBuffer(m(c.stat)),c.id,m(c.data));case r.STATS:return i(b);case r.FILEFLAG:return k(b);case r.BUFFER:return o(b);case r.ERROR:return g(b);default:return a}default:return a}},c.prototype._argLocal2Remote=function(a){if(null==a)return a;switch(typeof a){case"object":return a instanceof y.default?h(a):a instanceof u.ApiError?d(a):a instanceof E?a.toRemoteArg():a instanceof v.FileFlag?j(a):a instanceof b?n(a):a instanceof Error?f(a):"Unknown argument";case"function":return this._callbackConverter.toRemoteArg(a);default:return a}},c.prototype.initialize=function(a){var c=this;if(this._isInitialized)a();else{var d={browserfsMessage:!0,method:"probe",args:[this._argLocal2Remote(new b(0)),this._callbackConverter.toRemoteArg(function(b){c._isInitialized=!0,c._isReadOnly=b.isReadOnly,c._supportLinks=b.supportsLinks,c._supportProps=b.supportsProps,a()})]};this._worker.postMessage(d)}},c.prototype.isReadOnly=function(){return this._isReadOnly},c.prototype.supportsSynch=function(){return!1},c.prototype.supportsLinks=function(){return this._supportLinks},c.prototype.supportsProps=function(){return this._supportProps},c.prototype._rpc=function(a,b){var c,d={browserfsMessage:!0,method:a,args:null},e=new Array(b.length);for(c=0;c<b.length;c++)e[c]=this._argLocal2Remote(b[c]);d.args=e,this._worker.postMessage(d)},c.prototype.rename=function(a,b,c){this._rpc("rename",arguments)},c.prototype.stat=function(a,b,c){this._rpc("stat",arguments)},c.prototype.open=function(a,b,c,d){this._rpc("open",arguments)},c.prototype.unlink=function(a,b){this._rpc("unlink",arguments)},c.prototype.rmdir=function(a,b){this._rpc("rmdir",arguments)},c.prototype.mkdir=function(a,b,c){this._rpc("mkdir",arguments)},c.prototype.readdir=function(a,b){this._rpc("readdir",arguments)},c.prototype.exists=function(a,b){this._rpc("exists",arguments)},c.prototype.realpath=function(a,b,c){this._rpc("realpath",arguments)},c.prototype.truncate=function(a,b,c){this._rpc("truncate",arguments)},c.prototype.readFile=function(a,b,c,d){this._rpc("readFile",arguments)},c.prototype.writeFile=function(a,b,c,d,e,f){this._rpc("writeFile",arguments)},c.prototype.appendFile=function(a,b,c,d,e,f){this._rpc("appendFile",arguments)},c.prototype.chmod=function(a,b,c,d){this._rpc("chmod",arguments)},c.prototype.chown=function(a,b,c,d,e){this._rpc("chown",arguments)},c.prototype.utimes=function(a,b,c,d){this._rpc("utimes",arguments)},c.prototype.link=function(a,b,c){this._rpc("link",arguments)},c.prototype.symlink=function(a,b,c,d){this._rpc("symlink",arguments)},c.prototype.readlink=function(a,b){this._rpc("readlink",arguments)},c.prototype.syncClose=function(a,b,c){this._worker.postMessage({browserfsMessage:!0,method:a,args:[b.toRemoteArg(),this._callbackConverter.toRemoteArg(c)]})},c.attachRemoteListener=function(a){function c(a,c,e){switch(typeof a){case"object":a instanceof y.default?e(null,h(a)):a instanceof u.ApiError?e(null,d(a)):a instanceof x.BaseFile?e(null,m.toRemoteArg(a,c[0],c[1],e)):a instanceof v.FileFlag?e(null,j(a)):a instanceof b?e(null,n(a)):a instanceof Error?e(null,f(a)):e(null,a);break;default:e(null,a)}}function l(b,f){if(null==b)return b;switch(typeof b){case"object":if("number"!=typeof b.type)return b;var h=b;switch(h.type){case r.CB:var j=b.id;return function(){function b(b){i>0&&(i=-1,g={browserfsMessage:!0,cbId:j,args:[d(b)]},a.postMessage(g))}var e,g,h=new Array(arguments.length),i=arguments.length;for(e=0;e<arguments.length;e++)!function(d,e){c(e,f,function(c,e){h[d]=e,c?b(c):0===--i&&(g={browserfsMessage:!0,cbId:j,args:h},a.postMessage(g))})}(e,arguments[e]);0===arguments.length&&(g={browserfsMessage:!0,cbId:j,args:h},a.postMessage(g))};case r.API_ERROR:return e(h);case r.STATS:return i(h);case r.FILEFLAG:return k(h);case r.BUFFER:return o(h);case r.ERROR:return g(h);default:return b}default:return b}}var m=new D;a.addEventListener("message",function(b){var c=b.data;if(p(c)){var e,f=c.args,g=new Array(f.length);switch(c.method){case"close":case"sync":!function(){var b=f[1];m.applyFdAPIRequest(c,function(c){var e={browserfsMessage:!0,cbId:b.id,args:c?[d(c)]:[]};a.postMessage(e)})}();break;case"probe":!function(){var b=B.getRootFS(),c=f[1],d={type:r.PROBE,isReadOnly:b.isReadOnly(),supportsLinks:b.supportsLinks(),supportsProps:b.supportsProps()},e={browserfsMessage:!0,cbId:c.id,args:[d]};a.postMessage(e)}();break;default:for(e=0;e<f.length;e++)g[e]=l(f[e],g);var h=B.getRootFS();h[c.method].apply(h,g)}}})},c}(t.BaseFileSystem);c.__esModule=!0,c.default=F}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/file":55,"../core/file_flag":56,"../core/file_system":57,"../core/global":58,"../core/node_fs":59,"../core/node_fs_stats":60,"../core/util":61,"../generic/preload_file":68,"bfs-buffer":2}],48:[function(a,b,c){"use strict";function d(a,b,c){try{c(null,a.toString(b))}catch(a){c(a)}}var e=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},f=a("../core/file_system"),g=a("../core/api_error"),h=a("../core/file_flag"),i=a("../core/util"),j=a("../generic/preload_file"),k=a("../generic/xhr"),l=a("../generic/file_index"),m=function(a){function b(b,c){void 0===c&&(c=""),a.call(this),b||(b="index.json"),c.length>0&&"/"!==c.charAt(c.length-1)&&(c+="/"),this.prefixUrl=c;var d=null;if("string"==typeof b){if(d=this._requestFileSync(b,"json"),!d)throw new Error("Unable to find listing at URL: ${listingUrlOrObj}")}else d=b;this._index=l.FileIndex.fromListing(d)}return e(b,a),b.prototype.empty=function(){this._index.fileIterator(function(a){a.file_data=null})},b.prototype.getXhrPath=function(a){return"/"===a.charAt(0)&&(a=a.slice(1)),this.prefixUrl+a},b.prototype._requestFileSizeAsync=function(a,b){k.getFileSizeAsync(this.getXhrPath(a),b)},b.prototype._requestFileSizeSync=function(a){return k.getFileSizeSync(this.getXhrPath(a))},b.prototype._requestFileAsync=function(a,b,c){k.asyncDownloadFile(this.getXhrPath(a),b,c)},b.prototype._requestFileSync=function(a,b){return k.syncDownloadFile(this.getXhrPath(a),b)},b.prototype.getName=function(){return"XmlHttpRequest"},b.isAvailable=function(){return"undefined"!=typeof XMLHttpRequest&&null!==XMLHttpRequest},b.prototype.diskSpace=function(a,b){b(0,0)},b.prototype.isReadOnly=function(){return!0},b.prototype.supportsLinks=function(){return!1},b.prototype.supportsProps=function(){return!1},b.prototype.supportsSynch=function(){return!0},b.prototype.preloadFile=function(a,b){var c=this._index.getInode(a);if(!l.isFileInode(c))throw g.ApiError.EISDIR(a);if(null===c)throw g.ApiError.ENOENT(a);var d=c.getData();d.size=b.length,d.file_data=b},b.prototype.stat=function(a,b,c){var d=this._index.getInode(a);if(null===d)return c(g.ApiError.ENOENT(a));var e;l.isFileInode(d)?(e=d.getData(),e.size<0?this._requestFileSizeAsync(a,function(a,b){return a?c(a):(e.size=b,void c(null,e.clone()))}):c(null,e.clone())):l.isDirInode(d)?(e=d.getStats(),c(null,e)):c(g.ApiError.FileError(g.ErrorCode.EINVAL,a))},b.prototype.statSync=function(a,b){var c=this._index.getInode(a);if(null===c)throw g.ApiError.ENOENT(a);var d;if(l.isFileInode(c))d=c.getData(),d.size<0&&(d.size=this._requestFileSizeSync(a));else{if(!l.isDirInode(c))throw g.ApiError.FileError(g.ErrorCode.EINVAL,a);d=c.getStats()}return d},b.prototype.open=function(a,b,c,d){if(b.isWriteable())return d(new g.ApiError(g.ErrorCode.EPERM,a));var e=this,f=this._index.getInode(a);if(null===f)return d(g.ApiError.ENOENT(a));if(!l.isFileInode(f))return d(g.ApiError.EISDIR(a));var i=f.getData();switch(b.pathExistsAction()){case h.ActionType.THROW_EXCEPTION:case h.ActionType.TRUNCATE_FILE:return d(g.ApiError.EEXIST(a));case h.ActionType.NOP:if(null!=i.file_data)return d(null,new j.NoSyncFile(e,a,b,i.clone(),i.file_data));this._requestFileAsync(a,"buffer",function(c,f){return c?d(c):(i.size=f.length,i.file_data=f,d(null,new j.NoSyncFile(e,a,b,i.clone(),f)))});break;default:return d(new g.ApiError(g.ErrorCode.EINVAL,"Invalid FileMode object."))}},b.prototype.openSync=function(a,b,c){if(b.isWriteable())throw new g.ApiError(g.ErrorCode.EPERM,a);var d=this._index.getInode(a);if(null===d)throw g.ApiError.ENOENT(a);if(!l.isFileInode(d))throw g.ApiError.EISDIR(a);var e=d.getData();switch(b.pathExistsAction()){case h.ActionType.THROW_EXCEPTION:case h.ActionType.TRUNCATE_FILE:throw g.ApiError.EEXIST(a);case h.ActionType.NOP:if(null!=e.file_data)return new j.NoSyncFile(this,a,b,e.clone(),e.file_data);var f=this._requestFileSync(a,"buffer");return e.size=f.length,e.file_data=f,new j.NoSyncFile(this,a,b,e.clone(),f);default:throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid FileMode object.")}},b.prototype.readdir=function(a,b){try{b(null,this.readdirSync(a))}catch(a){b(a)}},b.prototype.readdirSync=function(a){var b=this._index.getInode(a);if(null===b)throw g.ApiError.ENOENT(a);if(l.isDirInode(b))return b.getListing();throw g.ApiError.ENOTDIR(a)},b.prototype.readFile=function(a,b,c,e){var f=e;this.open(a,c,420,function(a,c){if(a)return e(a);e=function(a,b){c.close(function(c){return null==a&&(a=c),f(a,b)})};var g=c,h=g.getBuffer();null===b?e(a,i.copyingSlice(h)):d(h,b,e)})},b.prototype.readFileSync=function(a,b,c){var d=this.openSync(a,c,420);try{var e=d,f=e.getBuffer();return null===b?i.copyingSlice(f):f.toString(b)}finally{d.closeSync()}},b}(f.BaseFileSystem);c.__esModule=!0,c.default=m},{"../core/api_error":52,"../core/file_flag":56,"../core/file_system":57,"../core/util":61,"../generic/file_index":63,"../generic/preload_file":68,"../generic/xhr":69}],49:[function(a,b,c){"use strict";function d(a,b){var c=31&b,d=(b>>5&15)-1,e=(b>>9)+1980,f=31&a,g=a>>5&63,h=a>>11;return new Date(e,d,c,h,g,f)}function e(a,b,c,d){return 0===d?"":b?a.toString("utf8",c,c+d):m.default.byte2str(a.slice(c,c+d))}var f=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},g=a("../core/api_error"),h=a("../core/node_fs_stats"),i=a("../core/file_system"),j=a("../core/file_flag"),k=a("../generic/preload_file"),l=a("../core/util"),m=a("bfs-buffer/js/extended_ascii"),n=a("pako/dist/pako_inflate.min").inflateRaw,o=a("../generic/file_index");!function(a){a[a.MSDOS=0]="MSDOS",a[a.AMIGA=1]="AMIGA",a[a.OPENVMS=2]="OPENVMS",a[a.UNIX=3]="UNIX",a[a.VM_CMS=4]="VM_CMS",a[a.ATARI_ST=5]="ATARI_ST",a[a.OS2_HPFS=6]="OS2_HPFS",a[a.MAC=7]="MAC",a[a.Z_SYSTEM=8]="Z_SYSTEM",a[a.CP_M=9]="CP_M",a[a.NTFS=10]="NTFS",a[a.MVS=11]="MVS",a[a.VSE=12]="VSE",a[a.ACORN_RISC=13]="ACORN_RISC",a[a.VFAT=14]="VFAT",a[a.ALT_MVS=15]="ALT_MVS",a[a.BEOS=16]="BEOS",a[a.TANDEM=17]="TANDEM",a[a.OS_400=18]="OS_400",a[a.OSX=19]="OSX"}(c.ExternalFileAttributeType||(c.ExternalFileAttributeType={}));c.ExternalFileAttributeType;!function(a){a[a.STORED=0]="STORED",a[a.SHRUNK=1]="SHRUNK",a[a.REDUCED_1=2]="REDUCED_1",a[a.REDUCED_2=3]="REDUCED_2",a[a.REDUCED_3=4]="REDUCED_3",a[a.REDUCED_4=5]="REDUCED_4",a[a.IMPLODE=6]="IMPLODE",a[a.DEFLATE=8]="DEFLATE",a[a.DEFLATE64=9]="DEFLATE64",a[a.TERSE_OLD=10]="TERSE_OLD",a[a.BZIP2=12]="BZIP2",a[a.LZMA=14]="LZMA",a[a.TERSE_NEW=18]="TERSE_NEW",a[a.LZ77=19]="LZ77",a[a.WAVPACK=97]="WAVPACK",a[a.PPMD=98]="PPMD"}(c.CompressionMethod||(c.CompressionMethod={}));var p=c.CompressionMethod,q=function(){function a(a){if(this.data=a,67324752!==a.readUInt32LE(0))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid Zip file: Local file header has invalid signature: "+this.data.readUInt32LE(0))}return a.prototype.versionNeeded=function(){return this.data.readUInt16LE(4)},a.prototype.flags=function(){return this.data.readUInt16LE(6)},a.prototype.compressionMethod=function(){return this.data.readUInt16LE(8)},a.prototype.lastModFileTime=function(){return d(this.data.readUInt16LE(10),this.data.readUInt16LE(12))},a.prototype.rawLastModFileTime=function(){return this.data.readUInt32LE(10)},a.prototype.crc32=function(){return this.data.readUInt32LE(14)},a.prototype.fileNameLength=function(){return this.data.readUInt16LE(26)},a.prototype.extraFieldLength=function(){return this.data.readUInt16LE(28)},a.prototype.fileName=function(){return e(this.data,this.useUTF8(),30,this.fileNameLength())},a.prototype.extraField=function(){var a=30+this.fileNameLength();return this.data.slice(a,a+this.extraFieldLength())},a.prototype.totalSize=function(){return 30+this.fileNameLength()+this.extraFieldLength()},a.prototype.useUTF8=function(){return 2048===(2048&this.flags())},a}();c.FileHeader=q;var r=function(){function a(a,b,c){this.header=a,this.record=b,this.data=c}return a.prototype.decompress=function(){var a=this.header.compressionMethod();switch(a){case p.DEFLATE:var b=n(l.buffer2Arrayish(this.data.slice(0,this.record.compressedSize())),{chunkSize:this.record.uncompressedSize()});return l.arrayish2Buffer(b);case p.STORED:return l.copyingSlice(this.data,0,this.record.uncompressedSize());default:var c=p[a];throw c=c?c:"Unknown: "+a,new g.ApiError(g.ErrorCode.EINVAL,"Invalid compression method on file '"+this.header.fileName()+"': "+c)}},a.prototype.getHeader=function(){return this.header},a.prototype.getRecord=function(){return this.record},a.prototype.getRawData=function(){return this.data},a}();c.FileData=r;var s=function(){function a(a){this.data=a}return a.prototype.crc32=function(){return this.data.readUInt32LE(0)},a.prototype.compressedSize=function(){return this.data.readUInt32LE(4)},a.prototype.uncompressedSize=function(){return this.data.readUInt32LE(8)},a}();c.DataDescriptor=s;var t=function(){function a(a){if(this.data=a,134630224!==this.data.readUInt32LE(0))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid archive extra data record signature: "+this.data.readUInt32LE(0))}return a.prototype.length=function(){return this.data.readUInt32LE(4)},a.prototype.extraFieldData=function(){return this.data.slice(8,8+this.length())},a}();c.ArchiveExtraDataRecord=t;var u=function(){function a(a){if(this.data=a,84233040!==this.data.readUInt32LE(0))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid digital signature signature: "+this.data.readUInt32LE(0))}return a.prototype.size=function(){return this.data.readUInt16LE(4)},a.prototype.signatureData=function(){return this.data.slice(6,6+this.size())},a}();c.DigitalSignature=u;var v=function(){function a(a,b){if(this.zipData=a,this.data=b,33639248!==this.data.readUInt32LE(0))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid Zip file: Central directory record has invalid signature: "+this.data.readUInt32LE(0));this._filename=this.produceFilename()}return a.prototype.versionMadeBy=function(){return this.data.readUInt16LE(4)},a.prototype.versionNeeded=function(){return this.data.readUInt16LE(6)},a.prototype.flag=function(){return this.data.readUInt16LE(8)},a.prototype.compressionMethod=function(){return this.data.readUInt16LE(10)},a.prototype.lastModFileTime=function(){return d(this.data.readUInt16LE(12),this.data.readUInt16LE(14))},a.prototype.rawLastModFileTime=function(){return this.data.readUInt32LE(12)},a.prototype.crc32=function(){return this.data.readUInt32LE(16)},a.prototype.compressedSize=function(){return this.data.readUInt32LE(20)},a.prototype.uncompressedSize=function(){return this.data.readUInt32LE(24)},a.prototype.fileNameLength=function(){return this.data.readUInt16LE(28)},a.prototype.extraFieldLength=function(){return this.data.readUInt16LE(30)},a.prototype.fileCommentLength=function(){return this.data.readUInt16LE(32)},a.prototype.diskNumberStart=function(){return this.data.readUInt16LE(34)},a.prototype.internalAttributes=function(){return this.data.readUInt16LE(36)},a.prototype.externalAttributes=function(){return this.data.readUInt32LE(38)},a.prototype.headerRelativeOffset=function(){return this.data.readUInt32LE(42)},a.prototype.produceFilename=function(){var a=e(this.data,this.useUTF8(),46,this.fileNameLength());return a.replace(/\\/g,"/")},a.prototype.fileName=function(){return this._filename},a.prototype.rawFileName=function(){return this.data.slice(46,46+this.fileNameLength())},a.prototype.extraField=function(){var a=44+this.fileNameLength();return this.data.slice(a,a+this.extraFieldLength())},a.prototype.fileComment=function(){var a=46+this.fileNameLength()+this.extraFieldLength();return e(this.data,this.useUTF8(),a,this.fileCommentLength())},a.prototype.rawFileComment=function(){var a=46+this.fileNameLength()+this.extraFieldLength();
return this.data.slice(a,a+this.fileCommentLength())},a.prototype.totalSize=function(){return 46+this.fileNameLength()+this.extraFieldLength()+this.fileCommentLength()},a.prototype.isDirectory=function(){var a=this.fileName();return!!(16&this.externalAttributes())||"/"===a.charAt(a.length-1)},a.prototype.isFile=function(){return!this.isDirectory()},a.prototype.useUTF8=function(){return 2048===(2048&this.flag())},a.prototype.isEncrypted=function(){return 1===(1&this.flag())},a.prototype.getFileData=function(){var a=this.headerRelativeOffset(),b=new q(this.zipData.slice(a));return new r(b,this,this.zipData.slice(a+b.totalSize()))},a.prototype.getData=function(){return this.getFileData().decompress()},a.prototype.getRawData=function(){return this.getFileData().getRawData()},a.prototype.getStats=function(){return new h.default(h.FileType.FILE,this.uncompressedSize(),365,new Date,this.lastModFileTime())},a}();c.CentralDirectory=v;var w=function(){function a(a){if(this.data=a,101010256!==this.data.readUInt32LE(0))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid Zip file: End of central directory record has invalid signature: "+this.data.readUInt32LE(0))}return a.prototype.diskNumber=function(){return this.data.readUInt16LE(4)},a.prototype.cdDiskNumber=function(){return this.data.readUInt16LE(6)},a.prototype.cdDiskEntryCount=function(){return this.data.readUInt16LE(8)},a.prototype.cdTotalEntryCount=function(){return this.data.readUInt16LE(10)},a.prototype.cdSize=function(){return this.data.readUInt32LE(12)},a.prototype.cdOffset=function(){return this.data.readUInt32LE(16)},a.prototype.cdZipCommentLength=function(){return this.data.readUInt16LE(20)},a.prototype.cdZipComment=function(){return e(this.data,!0,22,this.cdZipCommentLength())},a.prototype.rawCdZipComment=function(){return this.data.slice(22,22+this.cdZipCommentLength())},a}();c.EndOfCentralDirectory=w;var x=function(){function a(a,b,c,d){this.index=a,this.directoryEntries=b,this.eocd=c,this.data=d}return a}();c.ZipTOC=x;var y=function(a){function b(b,c){void 0===c&&(c=""),a.call(this),this.input=b,this.name=c,this._index=new o.FileIndex,this._directoryEntries=[],this._eocd=null,b instanceof x?(this._index=b.index,this._directoryEntries=b.directoryEntries,this._eocd=b.eocd,this.data=b.data):(this.data=b,this.populateIndex())}return f(b,a),b.prototype.getName=function(){return"ZipFS"+(""!==this.name?" "+this.name:"")},b.prototype.getCentralDirectoryEntry=function(a){var b=this._index.getInode(a);if(null===b)throw g.ApiError.ENOENT(a);return o.isFileInode(b)?b.getData():o.isDirInode(b)?b.getData():void 0},b.prototype.getCentralDirectoryEntryAt=function(a){var b=this._directoryEntries[a];if(!b)throw new RangeError("Invalid directory index: "+a+".");return b},b.prototype.getNumberOfCentralDirectoryEntries=function(){return this._directoryEntries.length},b.prototype.getEndOfCentralDirectory=function(){return this._eocd},b.isAvailable=function(){return!0},b.prototype.diskSpace=function(a,b){b(this.data.length,0)},b.prototype.isReadOnly=function(){return!0},b.prototype.supportsLinks=function(){return!1},b.prototype.supportsProps=function(){return!1},b.prototype.supportsSynch=function(){return!0},b.prototype.statSync=function(a,b){var c=this._index.getInode(a);if(null===c)throw g.ApiError.ENOENT(a);var d;if(o.isFileInode(c))d=c.getData().getStats();else{if(!o.isDirInode(c))throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid inode.");d=c.getStats()}return d},b.prototype.openSync=function(a,b,c){if(b.isWriteable())throw new g.ApiError(g.ErrorCode.EPERM,a);var d=this._index.getInode(a);if(!d)throw g.ApiError.ENOENT(a);if(!o.isFileInode(d))throw g.ApiError.EISDIR(a);var e=d.getData(),f=e.getStats();switch(b.pathExistsAction()){case j.ActionType.THROW_EXCEPTION:case j.ActionType.TRUNCATE_FILE:throw g.ApiError.EEXIST(a);case j.ActionType.NOP:return new k.NoSyncFile(this,a,b,f,e.getData());default:throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid FileMode object.")}},b.prototype.readdirSync=function(a){var b=this._index.getInode(a);if(b){if(o.isDirInode(b))return b.getListing();throw g.ApiError.ENOTDIR(a)}throw g.ApiError.ENOENT(a)},b.prototype.readFileSync=function(a,b,c){var d=this.openSync(a,c,420);try{var e=d,f=e.getBuffer();return null===b?l.copyingSlice(f):f.toString(b)}finally{d.closeSync()}},b.getEOCD=function(a){for(var b=22,c=Math.min(b+65535,a.length-1),d=b;d<c;d++)if(101010256===a.readUInt32LE(a.length-d))return new w(a.slice(a.length-d));throw new g.ApiError(g.ErrorCode.EINVAL,"Invalid ZIP file: Could not locate End of Central Directory signature.")},b.addToIndex=function(a,b){var c=a.fileName();if("/"===c.charAt(0))throw new Error("WHY IS THIS ABSOLUTE");"/"===c.charAt(c.length-1)&&(c=c.substr(0,c.length-1)),a.isDirectory()?b.addPathFast("/"+c,new o.DirInode(a)):b.addPathFast("/"+c,new o.FileInode(a))},b.computeIndexResponsive=function(a,c,d,e,f,g,h){if(d<e){for(var i=0;i++<200&&d<e;){var j=new v(a,a.slice(d));b.addToIndex(j,c),d+=j.totalSize(),g.push(j)}setImmediate(function(){b.computeIndexResponsive(a,c,d,e,f,g,h)})}else f(new x(c,g,h,a))},b.computeIndex=function(a,c){var d=new o.FileIndex,e=b.getEOCD(a);if(e.diskNumber()!==e.cdDiskNumber())throw new g.ApiError(g.ErrorCode.EINVAL,"ZipFS does not support spanned zip files.");var f=e.cdOffset();if(4294967295===f)throw new g.ApiError(g.ErrorCode.EINVAL,"ZipFS does not support Zip64.");var h=f+e.cdSize();b.computeIndexResponsive(a,d,f,h,c,[],e)},b.prototype.populateIndex=function(){var a=this._eocd=b.getEOCD(this.data);if(a.diskNumber()!==a.cdDiskNumber())throw new g.ApiError(g.ErrorCode.EINVAL,"ZipFS does not support spanned zip files.");var c=a.cdOffset();if(4294967295===c)throw new g.ApiError(g.ErrorCode.EINVAL,"ZipFS does not support Zip64.");for(var d=c+a.cdSize();c<d;){var e=new v(this.data,this.data.slice(c));c+=e.totalSize(),b.addToIndex(e,this._index),this._directoryEntries.push(e)}},b}(i.SynchronousFileSystem);c.__esModule=!0,c.default=y},{"../core/api_error":52,"../core/file_flag":56,"../core/file_system":57,"../core/node_fs_stats":60,"../core/util":61,"../generic/file_index":63,"../generic/preload_file":68,"bfs-buffer/js/extended_ascii":7,"pako/dist/pako_inflate.min":20}],50:[function(a,b,c){"use strict";b.exports=a("./main")},{"./main":70}],51:[function(a,b,c){(function(b,d){"use strict";function e(a,b){if(d)return a;if("function"!=typeof a)throw new k.ApiError(k.ErrorCode.EINVAL,"Callback must be a function.");switch("undefined"==typeof __numWaiting&&(o.__numWaiting=0),__numWaiting++,b){case 1:return function(b){setImmediate(function(){return __numWaiting--,a(b)})};case 2:return function(b,c){setImmediate(function(){return __numWaiting--,a(b,c)})};case 3:return function(b,c,d){setImmediate(function(){return __numWaiting--,a(b,c,d)})};default:throw new Error("Invalid invocation of wrapCb.")}}function f(a,b){switch(typeof a){case"number":return a;case"string":var c=parseInt(a,8);if(NaN!==c)return c;default:return b}}function g(a){if(a instanceof Date)return a;if("number"==typeof a)return new Date(1e3*a);throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid time.")}function h(a){if(a.indexOf("\0")>=0)throw new k.ApiError(k.ErrorCode.EINVAL,"Path must be a string without null bytes.");if(""===a)throw new k.ApiError(k.ErrorCode.EINVAL,"Path must not be empty.");return m.resolve(a)}function i(a,b,c,d){switch(typeof a){case"object":return{encoding:"undefined"!=typeof a.encoding?a.encoding:b,flag:"undefined"!=typeof a.flag?a.flag:c,mode:f(a.mode,d)};case"string":return{encoding:a,flag:c,mode:d};default:return{encoding:b,flag:c,mode:d}}}function j(){}var k=a("./api_error"),l=a("./file_flag"),m=a("path"),n=a("./node_fs_stats"),o=a("./global"),p=function(){function a(){this.root=null,this.fdMap={},this.nextFd=100,this.F_OK=0,this.R_OK=4,this.W_OK=2,this.X_OK=1,this._wrapCb=e}return a.prototype.getFdForFile=function(a){var b=this.nextFd++;return this.fdMap[b]=a,b},a.prototype.fd2file=function(a){var b=this.fdMap[a];if(b)return b;throw new k.ApiError(k.ErrorCode.EBADF,"Invalid file descriptor.")},a.prototype.closeFd=function(a){delete this.fdMap[a]},a.prototype.initialize=function(a){if(!a.constructor.isAvailable())throw new k.ApiError(k.ErrorCode.EINVAL,"Tried to instantiate BrowserFS with an unavailable file system.");return this.root=a},a.prototype._toUnixTimestamp=function(a){if("number"==typeof a)return a;if(a instanceof Date)return a.getTime()/1e3;throw new Error("Cannot parse time: "+a)},a.prototype.getRootFS=function(){return this.root?this.root:null},a.prototype.rename=function(a,b,c){void 0===c&&(c=j);var d=e(c,1);try{this.root.rename(h(a),h(b),d)}catch(a){d(a)}},a.prototype.renameSync=function(a,b){this.root.renameSync(h(a),h(b))},a.prototype.exists=function(a,b){void 0===b&&(b=j);var c=e(b,1);try{return this.root.exists(h(a),c)}catch(a){return c(!1)}},a.prototype.existsSync=function(a){try{return this.root.existsSync(h(a))}catch(a){return!1}},a.prototype.stat=function(a,b){void 0===b&&(b=j);var c=e(b,2);try{return this.root.stat(h(a),!1,c)}catch(a){return c(a,null)}},a.prototype.statSync=function(a){return this.root.statSync(h(a),!1)},a.prototype.lstat=function(a,b){void 0===b&&(b=j);var c=e(b,2);try{return this.root.stat(h(a),!0,c)}catch(a){return c(a,null)}},a.prototype.lstatSync=function(a){return this.root.statSync(h(a),!0)},a.prototype.truncate=function(a,b,c){void 0===b&&(b=0),void 0===c&&(c=j);var d=0;"function"==typeof b?c=b:"number"==typeof b&&(d=b);var f=e(c,1);try{if(d<0)throw new k.ApiError(k.ErrorCode.EINVAL);return this.root.truncate(h(a),d,f)}catch(a){return f(a)}},a.prototype.truncateSync=function(a,b){if(void 0===b&&(b=0),b<0)throw new k.ApiError(k.ErrorCode.EINVAL);return this.root.truncateSync(h(a),b)},a.prototype.unlink=function(a,b){void 0===b&&(b=j);var c=e(b,1);try{return this.root.unlink(h(a),c)}catch(a){return c(a)}},a.prototype.unlinkSync=function(a){return this.root.unlinkSync(h(a))},a.prototype.open=function(a,b,c,d){var g=this;void 0===d&&(d=j);var i=f(c,420);d="function"==typeof c?c:d;var k=e(d,2);try{this.root.open(h(a),l.FileFlag.getFileFlag(b),i,function(a,b){b?k(a,g.getFdForFile(b)):k(a)})}catch(a){k(a,null)}},a.prototype.openSync=function(a,b,c){return void 0===c&&(c=420),this.getFdForFile(this.root.openSync(h(a),l.FileFlag.getFileFlag(b),f(c,420)))},a.prototype.readFile=function(a,b,c){void 0===b&&(b={}),void 0===c&&(c=j);var d=i(b,null,"r",null);c="function"==typeof b?b:c;var f=e(c,2);try{var g=l.FileFlag.getFileFlag(d.flag);return g.isReadable()?this.root.readFile(h(a),d.encoding,g,f):f(new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to readFile must allow for reading."))}catch(a){return f(a,null)}},a.prototype.readFileSync=function(a,b){void 0===b&&(b={});var c=i(b,null,"r",null),d=l.FileFlag.getFileFlag(c.flag);if(!d.isReadable())throw new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to readFile must allow for reading.");return this.root.readFileSync(h(a),c.encoding,d)},a.prototype.writeFile=function(a,b,c,d){void 0===c&&(c={}),void 0===d&&(d=j);var f=i(c,"utf8","w",420);d="function"==typeof c?c:d;var g=e(d,1);try{var m=l.FileFlag.getFileFlag(f.flag);return m.isWriteable()?this.root.writeFile(h(a),b,f.encoding,m,f.mode,g):g(new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to writeFile must allow for writing."))}catch(a){return g(a)}},a.prototype.writeFileSync=function(a,b,c){var d=i(c,"utf8","w",420),e=l.FileFlag.getFileFlag(d.flag);if(!e.isWriteable())throw new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to writeFile must allow for writing.");return this.root.writeFileSync(h(a),b,d.encoding,e,d.mode)},a.prototype.appendFile=function(a,b,c,d){void 0===d&&(d=j);var f=i(c,"utf8","a",420);d="function"==typeof c?c:d;var g=e(d,1);try{var m=l.FileFlag.getFileFlag(f.flag);if(!m.isAppendable())return g(new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to appendFile must allow for appending."));this.root.appendFile(h(a),b,f.encoding,m,f.mode,g)}catch(a){g(a)}},a.prototype.appendFileSync=function(a,b,c){var d=i(c,"utf8","a",420),e=l.FileFlag.getFileFlag(d.flag);if(!e.isAppendable())throw new k.ApiError(k.ErrorCode.EINVAL,"Flag passed to appendFile must allow for appending.");return this.root.appendFileSync(h(a),b,d.encoding,e,d.mode)},a.prototype.fstat=function(a,b){void 0===b&&(b=j);var c=e(b,2);try{var d=this.fd2file(a);d.stat(c)}catch(a){c(a)}},a.prototype.fstatSync=function(a){return this.fd2file(a).statSync()},a.prototype.close=function(a,b){var c=this;void 0===b&&(b=j);var d=e(b,1);try{this.fd2file(a).close(function(b){b||c.closeFd(a),d(b)})}catch(a){d(a)}},a.prototype.closeSync=function(a){this.fd2file(a).closeSync(),this.closeFd(a)},a.prototype.ftruncate=function(a,b,c){void 0===c&&(c=j);var d="number"==typeof b?b:0;c="function"==typeof b?b:c;var f=e(c,1);try{var g=this.fd2file(a);if(d<0)throw new k.ApiError(k.ErrorCode.EINVAL);g.truncate(d,f)}catch(a){f(a)}},a.prototype.ftruncateSync=function(a,b){void 0===b&&(b=0);var c=this.fd2file(a);if(b<0)throw new k.ApiError(k.ErrorCode.EINVAL);c.truncateSync(b)},a.prototype.fsync=function(a,b){void 0===b&&(b=j);var c=e(b,1);try{this.fd2file(a).sync(c)}catch(a){c(a)}},a.prototype.fsyncSync=function(a){this.fd2file(a).syncSync()},a.prototype.fdatasync=function(a,b){void 0===b&&(b=j);var c=e(b,1);try{this.fd2file(a).datasync(c)}catch(a){c(a)}},a.prototype.fdatasyncSync=function(a){this.fd2file(a).datasyncSync()},a.prototype.write=function(a,c,d,f,g,h){void 0===h&&(h=j);var i,l,m,n=null;if("string"==typeof c){var o="utf8";switch(typeof d){case"function":h=d;break;case"number":n=d,o="string"==typeof f?f:"utf8",h="function"==typeof g?g:h;break;default:return(h="function"==typeof f?f:"function"==typeof g?g:h)(new k.ApiError(k.ErrorCode.EINVAL,"Invalid arguments."))}i=new b(c,o),l=0,m=i.length}else i=c,l=d,m=f,n="number"==typeof g?g:null,h="function"==typeof g?g:h;var p=e(h,3);try{var q=this.fd2file(a);null==n&&(n=q.getPos()),q.write(i,l,m,n,p)}catch(a){p(a)}},a.prototype.writeSync=function(a,c,d,e,f){var g,h,i,j=0;if("string"==typeof c){i="number"==typeof d?d:null;var k="string"==typeof e?e:"utf8";j=0,g=new b(c,k),h=g.length}else g=c,j=d,h=e,i="number"==typeof f?f:null;var l=this.fd2file(a);return null==i&&(i=l.getPos()),l.writeSync(g,j,h,i)},a.prototype.read=function(a,c,d,f,g,h){void 0===h&&(h=j);var i,k,l,m,n;if("number"==typeof c){l=c,i=d;var o=f;h="function"==typeof g?g:h,k=0,m=new b(l),n=e(function(a,b,c){return a?h(a):void h(a,c.toString(o),b)},3)}else m=c,k=d,l=f,i=g,n=e(h,3);try{var p=this.fd2file(a);null==i&&(i=p.getPos()),p.read(m,k,l,i,n)}catch(a){n(a)}},a.prototype.readSync=function(a,c,d,e,f){var g,h,i,j,k=!1;if("number"==typeof c){i=c,j=d;var l=e;h=0,g=new b(i),k=!0}else g=c,h=d,i=e,j=f;var m=this.fd2file(a);null==j&&(j=m.getPos());var n=m.readSync(g,h,i,j);return k?[g.toString(l),n]:n},a.prototype.fchown=function(a,b,c,d){void 0===d&&(d=j);var f=e(d,1);try{this.fd2file(a).chown(b,c,f)}catch(a){f(a)}},a.prototype.fchownSync=function(a,b,c){this.fd2file(a).chownSync(b,c)},a.prototype.fchmod=function(a,b,c){var d=e(c,1);try{var f="string"==typeof b?parseInt(b,8):b;this.fd2file(a).chmod(f,d)}catch(a){d(a)}},a.prototype.fchmodSync=function(a,b){var c="string"==typeof b?parseInt(b,8):b;this.fd2file(a).chmodSync(c)},a.prototype.futimes=function(a,b,c,d){void 0===d&&(d=j);var f=e(d,1);try{var g=this.fd2file(a);"number"==typeof b&&(b=new Date(1e3*b)),"number"==typeof c&&(c=new Date(1e3*c)),g.utimes(b,c,f)}catch(a){f(a)}},a.prototype.futimesSync=function(a,b,c){this.fd2file(a).utimesSync(g(b),g(c))},a.prototype.rmdir=function(a,b){void 0===b&&(b=j);var c=e(b,1);try{a=h(a),this.root.rmdir(a,c)}catch(a){c(a)}},a.prototype.rmdirSync=function(a){return a=h(a),this.root.rmdirSync(a)},a.prototype.mkdir=function(a,b,c){void 0===c&&(c=j),"function"==typeof b&&(c=b,b=511);var d=e(c,1);try{a=h(a),this.root.mkdir(a,b,d)}catch(a){d(a)}},a.prototype.mkdirSync=function(a,b){this.root.mkdirSync(h(a),f(b,511))},a.prototype.readdir=function(a,b){void 0===b&&(b=j);var c=e(b,2);try{a=h(a),this.root.readdir(a,c)}catch(a){c(a)}},a.prototype.readdirSync=function(a){return a=h(a),this.root.readdirSync(a)},a.prototype.link=function(a,b,c){void 0===c&&(c=j);var d=e(c,1);try{a=h(a),b=h(b),this.root.link(a,b,d)}catch(a){d(a)}},a.prototype.linkSync=function(a,b){return a=h(a),b=h(b),this.root.linkSync(a,b)},a.prototype.symlink=function(a,b,c,d){void 0===d&&(d=j);var f="string"==typeof c?c:"file";d="function"==typeof c?c:d;var g=e(d,1);try{if("file"!==f&&"dir"!==f)return g(new k.ApiError(k.ErrorCode.EINVAL,"Invalid type: "+f));a=h(a),b=h(b),this.root.symlink(a,b,f,g)}catch(a){g(a)}},a.prototype.symlinkSync=function(a,b,c){if(null==c)c="file";else if("file"!==c&&"dir"!==c)throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid type: "+c);return a=h(a),b=h(b),this.root.symlinkSync(a,b,c)},a.prototype.readlink=function(a,b){void 0===b&&(b=j);var c=e(b,2);try{a=h(a),this.root.readlink(a,c)}catch(a){c(a)}},a.prototype.readlinkSync=function(a){return a=h(a),this.root.readlinkSync(a)},a.prototype.chown=function(a,b,c,d){void 0===d&&(d=j);var f=e(d,1);try{a=h(a),this.root.chown(a,!1,b,c,f)}catch(a){f(a)}},a.prototype.chownSync=function(a,b,c){a=h(a),this.root.chownSync(a,!1,b,c)},a.prototype.lchown=function(a,b,c,d){void 0===d&&(d=j);var f=e(d,1);try{a=h(a),this.root.chown(a,!0,b,c,f)}catch(a){f(a)}},a.prototype.lchownSync=function(a,b,c){a=h(a),this.root.chownSync(a,!0,b,c)},a.prototype.chmod=function(a,b,c){void 0===c&&(c=j);var d=e(c,1);try{var g=f(b,-1);if(g<0)throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid mode.");this.root.chmod(h(a),!1,g,d)}catch(a){d(a)}},a.prototype.chmodSync=function(a,b){var c=f(b,-1);if(c<0)throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid mode.");a=h(a),this.root.chmodSync(a,!1,c)},a.prototype.lchmod=function(a,b,c){void 0===c&&(c=j);var d=e(c,1);try{var g=f(b,-1);if(g<0)throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid mode.");this.root.chmod(h(a),!0,g,d)}catch(a){d(a)}},a.prototype.lchmodSync=function(a,b){var c=f(b,-1);if(c<1)throw new k.ApiError(k.ErrorCode.EINVAL,"Invalid mode.");this.root.chmodSync(h(a),!0,c)},a.prototype.utimes=function(a,b,c,d){void 0===d&&(d=j);var f=e(d,1);try{this.root.utimes(h(a),g(b),g(c),f)}catch(a){f(a)}},a.prototype.utimesSync=function(a,b,c){this.root.utimesSync(h(a),g(b),g(c))},a.prototype.realpath=function(a,b,c){void 0===c&&(c=j);var d="object"==typeof b?b:{};c="function"==typeof b?b:j;var f=e(c,2);try{a=h(a),this.root.realpath(a,d,f)}catch(a){f(a)}},a.prototype.realpathSync=function(a,b){return void 0===b&&(b={}),a=h(a),this.root.realpathSync(a,b)},a.prototype.watchFile=function(a,b,c){throw void 0===c&&(c=j),new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.unwatchFile=function(a,b){throw void 0===b&&(b=j),new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.watch=function(a,b,c){throw void 0===c&&(c=j),new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.access=function(a,b,c){throw void 0===c&&(c=j),new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.accessSync=function(a,b){throw new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.createReadStream=function(a,b){throw new k.ApiError(k.ErrorCode.ENOTSUP)},a.prototype.createWriteStream=function(a,b){throw new k.ApiError(k.ErrorCode.ENOTSUP)},a.Stats=n.default,a}();c.__esModule=!0,c.default=p;new p}).call(this,a("bfs-buffer").Buffer,!0)},{"./api_error":52,"./file_flag":56,"./global":58,"./node_fs_stats":60,"bfs-buffer":2,path:10}],52:[function(a,b,c){(function(a){"use strict";var b=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)};!function(a){a[a.EPERM=1]="EPERM",a[a.ENOENT=2]="ENOENT",a[a.EIO=5]="EIO",a[a.EBADF=9]="EBADF",a[a.EACCES=13]="EACCES",a[a.EBUSY=16]="EBUSY",a[a.EEXIST=17]="EEXIST",a[a.ENOTDIR=20]="ENOTDIR",a[a.EISDIR=21]="EISDIR",a[a.EINVAL=22]="EINVAL",a[a.EFBIG=27]="EFBIG",a[a.ENOSPC=28]="ENOSPC",a[a.EROFS=30]="EROFS",a[a.ENOTEMPTY=39]="ENOTEMPTY",a[a.ENOTSUP=95]="ENOTSUP"}(c.ErrorCode||(c.ErrorCode={}));var d=c.ErrorCode;c.ErrorStrings={},c.ErrorStrings[d.EPERM]="Operation not permitted.",c.ErrorStrings[d.ENOENT]="No such file or directory.",c.ErrorStrings[d.EIO]="Input/output error.",c.ErrorStrings[d.EBADF]="Bad file descriptor.",c.ErrorStrings[d.EACCES]="Permission denied.",c.ErrorStrings[d.EBUSY]="Resource busy or locked.",c.ErrorStrings[d.EEXIST]="File exists.",c.ErrorStrings[d.ENOTDIR]="File is not a directory.",c.ErrorStrings[d.EISDIR]="File is a directory.",c.ErrorStrings[d.EINVAL]="Invalid argument.",c.ErrorStrings[d.EFBIG]="File is too big.",c.ErrorStrings[d.ENOSPC]="No space left on disk.",c.ErrorStrings[d.EROFS]="Cannot modify a read-only file system.",c.ErrorStrings[d.ENOTEMPTY]="Directory is not empty.",c.ErrorStrings[d.ENOTSUP]="Operation is not supported.";var e=function(e){function f(a,b,f){void 0===b&&(b=c.ErrorStrings[a]),void 0===f&&(f=null),e.call(this,b),this.syscall="",this.errno=a,this.code=d[a],this.path=f,this.stack=(new Error).stack,this.message="Error: "+this.code+": "+b+(this.path?", '"+this.path+"'":"")}return b(f,e),f.prototype.toString=function(){return this.message},f.prototype.toJSON=function(){return{errno:this.errno,code:this.code,path:this.path,stack:this.stack,message:this.message}},f.fromJSON=function(a){var b=new f(0);return b.errno=a.errno,b.code=a.code,b.path=a.path,b.stack=a.stack,b.message=a.message,b},f.prototype.writeToBuffer=function(b,c){void 0===b&&(b=new a(this.bufferSize())),void 0===c&&(c=0);var d=b.write(JSON.stringify(this.toJSON()),c+4);return b.writeUInt32LE(d,c),b},f.fromBuffer=function(a,b){return void 0===b&&(b=0),f.fromJSON(JSON.parse(a.toString("utf8",b+4,b+4+a.readUInt32LE(b))))},f.prototype.bufferSize=function(){return 4+a.byteLength(JSON.stringify(this.toJSON()))},f.FileError=function(a,b){return new f(a,c.ErrorStrings[a],b)},f.ENOENT=function(a){return this.FileError(d.ENOENT,a)},f.EEXIST=function(a){return this.FileError(d.EEXIST,a)},f.EISDIR=function(a){return this.FileError(d.EISDIR,a)},f.ENOTDIR=function(a){return this.FileError(d.ENOTDIR,a)},f.EPERM=function(a){return this.FileError(d.EPERM,a)},f.ENOTEMPTY=function(a){return this.FileError(d.ENOTEMPTY,a)},f}(Error);c.ApiError=e}).call(this,a("bfs-buffer").Buffer)},{"bfs-buffer":2}],53:[function(a,b,c){"use strict";var d=a("../backend/AsyncMirror");c.AsyncMirror=d.default;var e=a("../backend/Dropbox");c.Dropbox=e.default;var f=a("../backend/Emscripten");c.Emscripten=f.default;var g=a("../backend/FolderAdapter");c.FolderAdapter=g.default;var h=a("../backend/HTML5FS");c.HTML5FS=h.default;var i=a("../backend/InMemory");c.InMemory=i.default;var j=a("../backend/IndexedDB");c.IndexedDB=j.default;var k=a("../backend/LocalStorage");c.LocalStorage=k.default;var l=a("../backend/MountableFileSystem");c.MountableFileSystem=l.default;var m=a("../backend/OverlayFS");c.OverlayFS=m.default;var n=a("../backend/WorkerFS");c.WorkerFS=n.default;var o=a("../backend/XmlHttpRequest");c.XmlHttpRequest=o.default;var p=a("../backend/ZipFS");c.ZipFS=p.default},{"../backend/AsyncMirror":37,"../backend/Dropbox":38,"../backend/Emscripten":39,"../backend/FolderAdapter":40,"../backend/HTML5FS":41,"../backend/InMemory":42,"../backend/IndexedDB":43,"../backend/LocalStorage":44,"../backend/MountableFileSystem":45,"../backend/OverlayFS":46,"../backend/WorkerFS":47,"../backend/XmlHttpRequest":48,"../backend/ZipFS":49}],54:[function(a,b,c){(function(b,d){"use strict";function e(a){a.Buffer=d,a.process=b;var c=null!=a.require?a.require:null;a.require=function(a){var b=g(a);return null==b?c.apply(null,Array.prototype.slice.call(arguments,0)):b}}function f(a,b){m[a]=b}function g(a){switch(a){case"fs":return j;case"path":return k;case"buffer":return i;case"process":return b;case"bfs_utils":return n;default:return m[a]}}function h(a){return j.initialize(a)}var i=a("buffer"),j=a("./node_fs"),k=a("path"),l=a("../generic/emscripten_fs");c.EmscriptenFS=l.default;var m=a("./backends");c.FileSystem=m;var n=a("./util");b.initializeTTYs&&b.initializeTTYs(),c.install=e,c.registerFileSystem=f,c.BFSRequire=g,c.initialize=h}).call(this,a("bfs-process"),a("bfs-buffer").Buffer)},{"../generic/emscripten_fs":62,"./backends":53,"./node_fs":59,"./util":61,"bfs-buffer":2,"bfs-process":11,buffer:2,path:10}],55:[function(a,b,c){"use strict";var d=a("./api_error"),e=function(){function a(){}return a.prototype.sync=function(a){a(new d.ApiError(d.ErrorCode.ENOTSUP))},a.prototype.syncSync=function(){throw new d.ApiError(d.ErrorCode.ENOTSUP)},a.prototype.datasync=function(a){this.sync(a)},a.prototype.datasyncSync=function(){return this.syncSync()},a.prototype.chown=function(a,b,c){c(new d.ApiError(d.ErrorCode.ENOTSUP))},a.prototype.chownSync=function(a,b){throw new d.ApiError(d.ErrorCode.ENOTSUP)},a.prototype.chmod=function(a,b){b(new d.ApiError(d.ErrorCode.ENOTSUP))},a.prototype.chmodSync=function(a){throw new d.ApiError(d.ErrorCode.ENOTSUP)},a.prototype.utimes=function(a,b,c){c(new d.ApiError(d.ErrorCode.ENOTSUP))},a.prototype.utimesSync=function(a,b){throw new d.ApiError(d.ErrorCode.ENOTSUP)},a}();c.BaseFile=e},{"./api_error":52}],56:[function(a,b,c){"use strict";var d=a("./api_error");!function(a){a[a.NOP=0]="NOP",a[a.THROW_EXCEPTION=1]="THROW_EXCEPTION",a[a.TRUNCATE_FILE=2]="TRUNCATE_FILE",a[a.CREATE_FILE=3]="CREATE_FILE"}(c.ActionType||(c.ActionType={}));var e=c.ActionType,f=function(){function a(b){if(this.flagStr=b,a.validFlagStrs.indexOf(b)<0)throw new d.ApiError(d.ErrorCode.EINVAL,"Invalid flag: "+b)}return a.getFileFlag=function(b){return a.flagCache.hasOwnProperty(b)?a.flagCache[b]:a.flagCache[b]=new a(b)},a.prototype.getFlagString=function(){return this.flagStr},a.prototype.isReadable=function(){return this.flagStr.indexOf("r")!==-1||this.flagStr.indexOf("+")!==-1},a.prototype.isWriteable=function(){return this.flagStr.indexOf("w")!==-1||this.flagStr.indexOf("a")!==-1||this.flagStr.indexOf("+")!==-1},a.prototype.isTruncating=function(){return this.flagStr.indexOf("w")!==-1},a.prototype.isAppendable=function(){return this.flagStr.indexOf("a")!==-1},a.prototype.isSynchronous=function(){return this.flagStr.indexOf("s")!==-1},a.prototype.isExclusive=function(){return this.flagStr.indexOf("x")!==-1},a.prototype.pathExistsAction=function(){return this.isExclusive()?e.THROW_EXCEPTION:this.isTruncating()?e.TRUNCATE_FILE:e.NOP},a.prototype.pathNotExistsAction=function(){return(this.isWriteable()||this.isAppendable())&&"r+"!==this.flagStr?e.CREATE_FILE:e.THROW_EXCEPTION},a.flagCache={},a.validFlagStrs=["r","r+","rs","rs+","w","wx","w+","wx+","a","ax","a+","ax+"],a}();c.FileFlag=f},{"./api_error":52}],57:[function(a,b,c){(function(b){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("./api_error"),f=a("./file_flag"),g=a("path"),h=function(){function a(){}return a.prototype.supportsLinks=function(){return!1},a.prototype.diskSpace=function(a,b){b(0,0)},a.prototype.openFile=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.createFile=function(a,b,c,d){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.open=function(a,b,c,d){var h=this,i=function(i,j){if(i)switch(b.pathNotExistsAction()){case f.ActionType.CREATE_FILE:return h.stat(g.dirname(a),!1,function(f,i){f?d(f):i.isDirectory()?h.createFile(a,b,c,d):d(e.ApiError.ENOTDIR(g.dirname(a)))});case f.ActionType.THROW_EXCEPTION:return d(e.ApiError.ENOENT(a));default:return d(new e.ApiError(e.ErrorCode.EINVAL,"Invalid FileFlag object."))}else{if(j.isDirectory())return d(e.ApiError.EISDIR(a));switch(b.pathExistsAction()){case f.ActionType.THROW_EXCEPTION:return d(e.ApiError.EEXIST(a));case f.ActionType.TRUNCATE_FILE:return h.openFile(a,b,function(a,b){a?d(a):b.truncate(0,function(){b.sync(function(){d(null,b)})})});case f.ActionType.NOP:return h.openFile(a,b,d);default:return d(new e.ApiError(e.ErrorCode.EINVAL,"Invalid FileFlag object."))}}};this.stat(a,!1,i)},a.prototype.rename=function(a,b,c){c(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.renameSync=function(a,b){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.stat=function(a,b,c){c(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.statSync=function(a,b){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.openFileSync=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.createFileSync=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.openSync=function(a,b,c){var d;try{d=this.statSync(a,!1)}catch(d){switch(b.pathNotExistsAction()){case f.ActionType.CREATE_FILE:var h=this.statSync(g.dirname(a),!1);if(!h.isDirectory())throw e.ApiError.ENOTDIR(g.dirname(a));return this.createFileSync(a,b,c);case f.ActionType.THROW_EXCEPTION:throw e.ApiError.ENOENT(a);default:throw new e.ApiError(e.ErrorCode.EINVAL,"Invalid FileFlag object.")}}if(d.isDirectory())throw e.ApiError.EISDIR(a);switch(b.pathExistsAction()){case f.ActionType.THROW_EXCEPTION:throw e.ApiError.EEXIST(a);case f.ActionType.TRUNCATE_FILE:return this.unlinkSync(a),this.createFileSync(a,b,d.mode);case f.ActionType.NOP:return this.openFileSync(a,b,c);default:throw new e.ApiError(e.ErrorCode.EINVAL,"Invalid FileFlag object.")}},a.prototype.unlink=function(a,b){b(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.unlinkSync=function(a){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.rmdir=function(a,b){b(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.rmdirSync=function(a){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.mkdir=function(a,b,c){c(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.mkdirSync=function(a,b){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.readdir=function(a,b){b(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.readdirSync=function(a){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.exists=function(a,b){this.stat(a,null,function(a){b(null==a)})},a.prototype.existsSync=function(a){try{return this.statSync(a,!0),!0}catch(a){return!1}},a.prototype.realpath=function(a,b,c){if(this.supportsLinks())for(var d=a.split(g.sep),f=0;f<d.length;f++){var h=d.slice(0,f+1);d[f]=g.join.apply(null,h)}else this.exists(a,function(b){b?c(null,a):c(e.ApiError.ENOENT(a))})},a.prototype.realpathSync=function(a,b){if(!this.supportsLinks()){if(this.existsSync(a))return a;throw e.ApiError.ENOENT(a)}for(var c=a.split(g.sep),d=0;d<c.length;d++){var f=c.slice(0,d+1);c[d]=g.join.apply(null,f)}},a.prototype.truncate=function(a,b,c){this.open(a,f.FileFlag.getFileFlag("r+"),420,function(a,d){return a?c(a):void d.truncate(b,function(a){d.close(function(b){c(a||b)})})})},a.prototype.truncateSync=function(a,b){var c=this.openSync(a,f.FileFlag.getFileFlag("r+"),420);try{c.truncateSync(b)}catch(a){throw a}finally{c.closeSync()}},a.prototype.readFile=function(a,c,d,e){var f=e;this.open(a,d,420,function(a,d){return a?e(a):(e=function(a,b){d.close(function(c){return null==a&&(a=c),f(a,b)})},void d.stat(function(a,f){if(null!=a)return e(a);var g=new b(f.size);d.read(g,0,f.size,0,function(a){if(null!=a)return e(a);if(null===c)return e(a,g);try{e(null,g.toString(c))}catch(a){e(a)}})}))})},a.prototype.readFileSync=function(a,c,d){var e=this.openSync(a,d,420);try{var f=e.statSync(),g=new b(f.size);return e.readSync(g,0,f.size,0),e.closeSync(),null===c?g:g.toString(c)}finally{e.closeSync()}},a.prototype.writeFile=function(a,c,d,e,f,g){var h=g;this.open(a,e,420,function(a,e){if(null!=a)return g(a);g=function(a){e.close(function(b){h(null!=a?a:b)})};try{"string"==typeof c&&(c=new b(c,d))}catch(a){return g(a)}e.write(c,0,c.length,0,g)})},a.prototype.writeFileSync=function(a,c,d,e,f){var g=this.openSync(a,e,f);try{"string"==typeof c&&(c=new b(c,d)),g.writeSync(c,0,c.length,0)}finally{g.closeSync()}},a.prototype.appendFile=function(a,c,d,e,f,g){var h=g;this.open(a,e,f,function(a,e){return null!=a?g(a):(g=function(a){e.close(function(b){h(null!=a?a:b)})},"string"==typeof c&&(c=new b(c,d)),void e.write(c,0,c.length,null,g))})},a.prototype.appendFileSync=function(a,c,d,e,f){var g=this.openSync(a,e,f);
try{"string"==typeof c&&(c=new b(c,d)),g.writeSync(c,0,c.length,null)}finally{g.closeSync()}},a.prototype.chmod=function(a,b,c,d){d(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.chmodSync=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.chown=function(a,b,c,d,f){f(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.chownSync=function(a,b,c,d){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.utimes=function(a,b,c,d){d(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.utimesSync=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.link=function(a,b,c){c(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.linkSync=function(a,b){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.symlink=function(a,b,c,d){d(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.symlinkSync=function(a,b,c){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a.prototype.readlink=function(a,b){b(new e.ApiError(e.ErrorCode.ENOTSUP))},a.prototype.readlinkSync=function(a){throw new e.ApiError(e.ErrorCode.ENOTSUP)},a}();c.BaseFileSystem=h;var i=function(a){function b(){a.apply(this,arguments)}return d(b,a),b.prototype.supportsSynch=function(){return!0},b.prototype.rename=function(a,b,c){try{this.renameSync(a,b),c()}catch(a){c(a)}},b.prototype.stat=function(a,b,c){try{c(null,this.statSync(a,b))}catch(a){c(a)}},b.prototype.open=function(a,b,c,d){try{d(null,this.openSync(a,b,c))}catch(a){d(a)}},b.prototype.unlink=function(a,b){try{this.unlinkSync(a),b()}catch(a){b(a)}},b.prototype.rmdir=function(a,b){try{this.rmdirSync(a),b()}catch(a){b(a)}},b.prototype.mkdir=function(a,b,c){try{this.mkdirSync(a,b),c()}catch(a){c(a)}},b.prototype.readdir=function(a,b){try{b(null,this.readdirSync(a))}catch(a){b(a)}},b.prototype.chmod=function(a,b,c,d){try{this.chmodSync(a,b,c),d()}catch(a){d(a)}},b.prototype.chown=function(a,b,c,d,e){try{this.chownSync(a,b,c,d),e()}catch(a){e(a)}},b.prototype.utimes=function(a,b,c,d){try{this.utimesSync(a,b,c),d()}catch(a){d(a)}},b.prototype.link=function(a,b,c){try{this.linkSync(a,b),c()}catch(a){c(a)}},b.prototype.symlink=function(a,b,c,d){try{this.symlinkSync(a,b,c),d()}catch(a){d(a)}},b.prototype.readlink=function(a,b){try{b(null,this.readlinkSync(a))}catch(a){b(a)}},b}(h);c.SynchronousFileSystem=i}).call(this,a("bfs-buffer").Buffer)},{"./api_error":52,"./file_flag":56,"bfs-buffer":2,path:10}],58:[function(a,b,c){(function(a){"use strict";var c;c="undefined"!=typeof window?window:"undefined"!=typeof self?self:a,b.exports=c}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],59:[function(a,b,c){"use strict";var d=a("./FS"),e=new d.default,f={},g=d.default.prototype;Object.keys(g).forEach(function(a){"function"==typeof e[a]?f[a]=function(){return e[a].apply(e,arguments)}:f[a]=e[a]}),f.changeFSModule=function(a){e=a},f.getFSModule=function(){return e},f._wrapCb=function(a,b){return e._wrapCb(a,b)},f.FS=d.default,b.exports=f},{"./FS":51}],60:[function(a,b,c){(function(a){"use strict";!function(a){a[a.FILE=32768]="FILE",a[a.DIRECTORY=16384]="DIRECTORY",a[a.SYMLINK=40960]="SYMLINK"}(c.FileType||(c.FileType={}));var b=c.FileType,d=function(){function c(a,c,d,e,f,g){if(void 0===e&&(e=new Date),void 0===f&&(f=new Date),void 0===g&&(g=new Date),this.size=c,this.mode=d,this.atime=e,this.mtime=f,this.ctime=g,this.dev=0,this.ino=0,this.rdev=0,this.nlink=1,this.blksize=4096,this.uid=0,this.gid=0,this.birthtime=new Date(0),this.file_data=null,null==this.mode)switch(a){case b.FILE:this.mode=420;break;case b.DIRECTORY:default:this.mode=511}this.blocks=Math.ceil(c/512),this.mode<4096&&(this.mode|=a)}return c.prototype.toBuffer=function(){var b=new a(32);return b.writeUInt32LE(this.size,0),b.writeUInt32LE(this.mode,4),b.writeDoubleLE(this.atime.getTime(),8),b.writeDoubleLE(this.mtime.getTime(),16),b.writeDoubleLE(this.ctime.getTime(),24),b},c.fromBuffer=function(a){var b=a.readUInt32LE(0),d=a.readUInt32LE(4),e=a.readDoubleLE(8),f=a.readDoubleLE(16),g=a.readDoubleLE(24);return new c(61440&d,b,4095&d,new Date(e),new Date(f),new Date(g))},c.prototype.clone=function(){return new c(61440&this.mode,this.size,4095&this.mode,this.atime,this.mtime,this.ctime)},c.prototype.isFile=function(){return(61440&this.mode)===b.FILE},c.prototype.isDirectory=function(){return(61440&this.mode)===b.DIRECTORY},c.prototype.isSymbolicLink=function(){return(61440&this.mode)===b.SYMLINK},c.prototype.chmod=function(a){this.mode=61440&this.mode|a},c.prototype.isSocket=function(){return!1},c.prototype.isBlockDevice=function(){return!1},c.prototype.isCharacterDevice=function(){return!1},c.prototype.isFIFO=function(){return!1},c}();c.__esModule=!0,c.default=d}).call(this,a("bfs-buffer").Buffer)},{"bfs-buffer":2}],61:[function(a,b,c){(function(b){"use strict";function d(a,b,c){c.existsSync(a)||(d(l.dirname(a),b,c),c.mkdirSync(a,b))}function e(a){var b=f(a),c=b.byteOffset,d=b.byteLength;return 0===c&&d===b.buffer.byteLength?b.buffer:b.buffer.slice(c,c+d)}function f(a){return a.toUint8Array?a.toUint8Array():a instanceof Uint8Array?a:new Uint8Array(a)}function g(a){return"number"==typeof a[0]?a:m?f(a):a.toJSON().data}function h(a){return m&&a instanceof Uint8Array?i(a):a instanceof b?a:new b(a)}function i(a){return 0===a.byteOffset&&a.byteLength===a.buffer.byteLength?j(a):new b(a)}function j(a){try{return new b(a)}catch(c){return new b(new Uint8Array(a))}}function k(a,c,d){if(void 0===c&&(c=0),void 0===d&&(d=a.length),c<0||d<0||d>a.length||c>d)throw new TypeError("Invalid slice bounds on buffer of length "+a.length+": ["+c+", "+d+"]");if(0===a.length)return new b(0);if(m){var e=f(a),g=a.readUInt8(0),h=(g+1)%255;return a.writeUInt8(h,0),e[0]===h?(e[0]=g,i(e.slice(c,d))):(a.writeUInt8(g,0),i(e.subarray(c,d)))}var j=new b(d-c);return a.copy(j,0,c,d),j}var l=a("path"),m="undefined"!=typeof ArrayBuffer;c.isIE="undefined"!=typeof navigator&&(null!=/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||navigator.userAgent.indexOf("Trident")!==-1),c.isWebWorker="undefined"==typeof window,c.mkdirpSync=d,c.buffer2ArrayBuffer=e,c.buffer2Uint8array=f,c.buffer2Arrayish=g,c.arrayish2Buffer=h,c.uint8Array2Buffer=i,c.arrayBuffer2Buffer=j,"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&(Uint8Array.prototype.slice||(Uint8Array.prototype.slice=function(a,b){void 0===a&&(a=0),void 0===b&&(b=this.length);var c=this;return a<0&&(a=this.length+a,a<0&&(a=0)),b<0&&(b=this.length+b,b<0&&(b=0)),b<a&&(b=a),new Uint8Array(c.buffer,c.byteOffset+a,b-a)})),c.copyingSlice=k}).call(this,a("bfs-buffer").Buffer)},{"bfs-buffer":2,path:10}],62:[function(a,b,c){"use strict";var d=a("../core/browserfs"),e=a("../core/node_fs"),f=a("../core/util"),g=function(){function a(a){this.fs=a,this.nodefs=a.getNodeFS(),this.FS=a.getFS(),this.PATH=a.getPATH(),this.ERRNO_CODES=a.getERRNO_CODES()}return a.prototype.open=function(a){var b=this.fs.realPath(a.node),c=this.FS;try{c.isFile(a.node.mode)&&(a.nfd=this.nodefs.openSync(b,this.fs.flagsToPermissionString(a.flags)))}catch(a){if(!a.code)throw a;throw new c.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.close=function(a){var b=this.FS;try{b.isFile(a.node.mode)&&a.nfd&&this.nodefs.closeSync(a.nfd)}catch(a){if(!a.code)throw a;throw new b.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.read=function(a,b,c,d,e){try{return this.nodefs.readSync(a.nfd,f.uint8Array2Buffer(b),c,d,e)}catch(a){throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.write=function(a,b,c,d,e){try{return this.nodefs.writeSync(a.nfd,f.uint8Array2Buffer(b),c,d,e)}catch(a){throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.llseek=function(a,b,c){var d=b;if(1===c)d+=a.position;else if(2===c&&this.FS.isFile(a.node.mode))try{var e=this.nodefs.fstatSync(a.nfd);d+=e.size}catch(a){throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}if(d<0)throw new this.FS.ErrnoError(this.ERRNO_CODES.EINVAL);return a.position=d,d},a}(),h=function(){function a(a){this.fs=a,this.nodefs=a.getNodeFS(),this.FS=a.getFS(),this.PATH=a.getPATH(),this.ERRNO_CODES=a.getERRNO_CODES()}return a.prototype.getattr=function(a){var b,c=this.fs.realPath(a);try{b=this.nodefs.lstatSync(c)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}return{dev:b.dev,ino:b.ino,mode:b.mode,nlink:b.nlink,uid:b.uid,gid:b.gid,rdev:b.rdev,size:b.size,atime:b.atime,mtime:b.mtime,ctime:b.ctime,blksize:b.blksize,blocks:b.blocks}},a.prototype.setattr=function(a,b){var c=this.fs.realPath(a);try{if(void 0!==b.mode&&(this.nodefs.chmodSync(c,b.mode),a.mode=b.mode),void 0!==b.timestamp){var d=new Date(b.timestamp);this.nodefs.utimesSync(c,d,d)}}catch(a){if(!a.code)throw a;if("ENOTSUP"!==a.code)throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}if(void 0!==b.size)try{this.nodefs.truncateSync(c,b.size)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.lookup=function(a,b){var c=this.PATH.join2(this.fs.realPath(a),b),d=this.fs.getMode(c);return this.fs.createNode(a,b,d)},a.prototype.mknod=function(a,b,c,d){var e=this.fs.createNode(a,b,c,d),f=this.fs.realPath(e);try{this.FS.isDir(e.mode)?this.nodefs.mkdirSync(f,e.mode):this.nodefs.writeFileSync(f,"",{mode:e.mode})}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}return e},a.prototype.rename=function(a,b,c){var d=this.fs.realPath(a),e=this.PATH.join2(this.fs.realPath(b),c);try{this.nodefs.renameSync(d,e)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.unlink=function(a,b){var c=this.PATH.join2(this.fs.realPath(a),b);try{this.nodefs.unlinkSync(c)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.rmdir=function(a,b){var c=this.PATH.join2(this.fs.realPath(a),b);try{this.nodefs.rmdirSync(c)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.readdir=function(a){var b=this.fs.realPath(a);try{return this.nodefs.readdirSync(b)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.symlink=function(a,b,c){var d=this.PATH.join2(this.fs.realPath(a),b);try{this.nodefs.symlinkSync(c,d)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a.prototype.readlink=function(a){var b=this.fs.realPath(a);try{return this.nodefs.readlinkSync(b)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}},a}(),i=function(){function a(a,b,c,f){if(void 0===a&&(a=self.FS),void 0===b&&(b=self.PATH),void 0===c&&(c=self.ERRNO_CODES),void 0===f&&(f=e),this.flagsToPermissionStringMap={0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},"undefined"==typeof d)throw new Error("BrowserFS is not loaded. Please load it before this library.");this.nodefs=f,this.FS=a,this.PATH=b,this.ERRNO_CODES=c,this.node_ops=new h(this),this.stream_ops=new g(this)}return a.prototype.mount=function(a){return this.createNode(null,"/",this.getMode(a.opts.root),0)},a.prototype.createNode=function(a,b,c,d){var e=this.FS;if(!e.isDir(c)&&!e.isFile(c)&&!e.isLink(c))throw new e.ErrnoError(this.ERRNO_CODES.EINVAL);var f=e.createNode(a,b,c);return f.node_ops=this.node_ops,f.stream_ops=this.stream_ops,f},a.prototype.getMode=function(a){var b;try{b=this.nodefs.lstatSync(a)}catch(a){if(!a.code)throw a;throw new this.FS.ErrnoError(this.ERRNO_CODES[a.code])}return b.mode},a.prototype.realPath=function(a){for(var b=[];a.parent!==a;)b.push(a.name),a=a.parent;return b.push(a.mount.opts.root),b.reverse(),this.PATH.join.apply(null,b)},a.prototype.flagsToPermissionString=function(a){var b="string"==typeof a?parseInt(a,10):a;return b&=8191,b in this.flagsToPermissionStringMap?this.flagsToPermissionStringMap[b]:a},a.prototype.getNodeFS=function(){return this.nodefs},a.prototype.getFS=function(){return this.FS},a.prototype.getPATH=function(){return this.PATH},a.prototype.getERRNO_CODES=function(){return this.ERRNO_CODES},a}();c.__esModule=!0,c.default=i},{"../core/browserfs":54,"../core/node_fs":59,"../core/util":61}],63:[function(a,b,c){"use strict";function d(a){return a&&a.isFile()}function e(a){return a&&a.isDir()}var f=a("../core/node_fs_stats"),g=a("path"),h=function(){function a(){this._index={},this.addPath("/",new j)}return a.prototype._split_path=function(a){var b=g.dirname(a),c=a.substr(b.length+("/"===b?0:1));return[b,c]},a.prototype.fileIterator=function(a){for(var b in this._index)for(var c=this._index[b],e=c.getListing(),f=0;f<e.length;f++){var g=c.getItem(e[f]);d(g)&&a(g.getData())}},a.prototype.addPath=function(a,b){if(null==b)throw new Error("Inode must be specified");if("/"!==a[0])throw new Error("Path must be absolute, got: "+a);if(this._index.hasOwnProperty(a))return this._index[a]===b;var c=this._split_path(a),d=c[0],f=c[1],g=this._index[d];return!(void 0===g&&"/"!==a&&(g=new j,!this.addPath(d,g)))&&(!("/"!==a&&!g.addItem(f,b))&&(e(b)&&(this._index[a]=b),!0))},a.prototype.addPathFast=function(a,b){var c=a.lastIndexOf("/"),d=0==c?"/":a.substring(0,c),e=a.substring(c+1),f=this._index[d];return void 0===f&&(f=new j,this.addPathFast(d,f)),!!f.addItem(e,b)&&(b.isDir()&&(this._index[a]=b),!0)},a.prototype.removePath=function(a){var b=this._split_path(a),c=b[0],d=b[1],f=this._index[c];if(void 0===f)return null;var g=f.remItem(d);if(null===g)return null;if(e(g)){for(var h=g.getListing(),i=0;i<h.length;i++)this.removePath(a+"/"+h[i]);"/"!==a&&delete this._index[a]}return g},a.prototype.ls=function(a){var b=this._index[a];return void 0===b?null:b.getListing()},a.prototype.getInode=function(a){var b=this._split_path(a),c=b[0],d=b[1],e=this._index[c];return void 0===e?null:c===a?e:e.getItem(d)},a.fromListing=function(b){var c=new a,d=new j;c._index["/"]=d;for(var e=[["",b,d]];e.length>0;){var g,h=e.pop(),k=h[0],l=h[1],m=h[2];for(var n in l){var o=l[n],p=""+k+"/"+n;null!=o?(c._index[p]=g=new j,e.push([p,o,g])):g=new i(new f.default(f.FileType.FILE,-1,365)),null!=m&&(m._ls[n]=g)}}return c},a}();c.FileIndex=h;var i=function(){function a(a){this.data=a}return a.prototype.isFile=function(){return!0},a.prototype.isDir=function(){return!1},a.prototype.getData=function(){return this.data},a.prototype.setData=function(a){this.data=a},a}();c.FileInode=i;var j=function(){function a(a){void 0===a&&(a=null),this.data=a,this._ls={}}return a.prototype.isFile=function(){return!1},a.prototype.isDir=function(){return!0},a.prototype.getData=function(){return this.data},a.prototype.getStats=function(){return new f.default(f.FileType.DIRECTORY,4096,365)},a.prototype.getListing=function(){return Object.keys(this._ls)},a.prototype.getItem=function(a){var b;return null!=(b=this._ls[a])?b:null},a.prototype.addItem=function(a,b){return!(a in this._ls)&&(this._ls[a]=b,!0)},a.prototype.remItem=function(a){var b=this._ls[a];return void 0===b?null:(delete this._ls[a],b)},a}();c.DirInode=j,c.isFileInode=d,c.isDirInode=e},{"../core/node_fs_stats":60,path:10}],64:[function(a,b,c){(function(c){"use strict";var d=a("../core/node_fs_stats"),e=function(){function a(a,b,c,d,e,f){this.id=a,this.size=b,this.mode=c,this.atime=d,this.mtime=e,this.ctime=f}return a.prototype.toStats=function(){return new d.default((61440&this.mode)===d.FileType.DIRECTORY?d.FileType.DIRECTORY:d.FileType.FILE,this.size,this.mode,new Date(this.atime),new Date(this.mtime),new Date(this.ctime))},a.prototype.getSize=function(){return 30+this.id.length},a.prototype.toBuffer=function(a){return void 0===a&&(a=new c(this.getSize())),a.writeUInt32LE(this.size,0),a.writeUInt16LE(this.mode,4),a.writeDoubleLE(this.atime,6),a.writeDoubleLE(this.mtime,14),a.writeDoubleLE(this.ctime,22),a.write(this.id,30,this.id.length,"ascii"),a},a.prototype.update=function(a){var b=!1;this.size!==a.size&&(this.size=a.size,b=!0),this.mode!==a.mode&&(this.mode=a.mode,b=!0);var c=a.atime.getTime();this.atime!==c&&(this.atime=c,b=!0);var d=a.mtime.getTime();this.mtime!==d&&(this.mtime=d,b=!0);var e=a.ctime.getTime();return this.ctime!==e&&(this.ctime=e,b=!0),b},a.fromBuffer=function(b){if(void 0===b)throw new Error("NO");return new a(b.toString("ascii",30),b.readUInt32LE(0),b.readUInt16LE(4),b.readDoubleLE(6),b.readDoubleLE(14),b.readDoubleLE(22))},a.prototype.isFile=function(){return(61440&this.mode)===d.FileType.FILE},a.prototype.isDirectory=function(){return(61440&this.mode)===d.FileType.DIRECTORY},a}();b.exports=e}).call(this,a("bfs-buffer").Buffer)},{"../core/node_fs_stats":60,"bfs-buffer":2}],65:[function(a,b,c){(function(b){"use strict";function d(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function e(a,b){return!a||(b(a),!1)}function f(a,b,c){return!a||(b.abort(function(){c(a)}),!1)}var g=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},h=a("../core/file_system"),i=a("../core/api_error"),j=a("../core/node_fs_stats"),k=a("path"),l=a("../generic/inode"),m=a("../generic/preload_file"),n="/",o=function(){function a(a){this.store=a,this.originalData={},this.modifiedKeys=[]}return a.prototype.stashOldValue=function(a,b){this.originalData.hasOwnProperty(a)||(this.originalData[a]=b)},a.prototype.markModified=function(a){this.modifiedKeys.indexOf(a)===-1&&(this.modifiedKeys.push(a),this.originalData.hasOwnProperty(a)||(this.originalData[a]=this.store.get(a)))},a.prototype.get=function(a){var b=this.store.get(a);return this.stashOldValue(a,b),b},a.prototype.put=function(a,b,c){return this.markModified(a),this.store.put(a,b,c)},a.prototype.del=function(a){this.markModified(a),this.store.del(a)},a.prototype.commit=function(){},a.prototype.abort=function(){var a,b,c;for(a=0;a<this.modifiedKeys.length;a++)b=this.modifiedKeys[a],c=this.originalData[b],null===c?this.store.del(b):this.store.put(b,c,!0)},a}();c.SimpleSyncRWTransaction=o;var p=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return g(b,a),b.prototype.syncSync=function(){this.isDirty()&&(this._fs._syncSync(this.getPath(),this.getBuffer(),this.getStats()),this.resetDirty())},b.prototype.closeSync=function(){this.syncSync()},b}(m.PreloadFile);c.SyncKeyValueFile=p;var q=function(a){function c(b){a.call(this),this.store=b.store,this.makeRootDirectory()}return g(c,a),c.isAvailable=function(){return!0},c.prototype.getName=function(){return this.store.name()},c.prototype.isReadOnly=function(){return!1},c.prototype.supportsSymlinks=function(){return!1},c.prototype.supportsProps=function(){return!1},c.prototype.supportsSynch=function(){return!0},c.prototype.makeRootDirectory=function(){var a=this.store.beginTransaction("readwrite");if(void 0===a.get(n)){var c=(new Date).getTime(),e=new l(d(),4096,511|j.FileType.DIRECTORY,c,c,c);a.put(e.id,new b("{}"),!1),a.put(n,e.toBuffer(),!1),a.commit()}},c.prototype._findINode=function(a,b,c){var d=this,e=function(e){var f=d.getDirListing(a,b,e);if(f[c])return f[c];throw i.ApiError.ENOENT(k.resolve(b,c))};return"/"===b?""===c?n:e(this.getINode(a,b,n)):e(this.getINode(a,b+k.sep+c,this._findINode(a,k.dirname(b),k.basename(b))))},c.prototype.findINode=function(a,b){return this.getINode(a,b,this._findINode(a,k.dirname(b),k.basename(b)))},c.prototype.getINode=function(a,b,c){var d=a.get(c);if(void 0===d)throw i.ApiError.ENOENT(b);return l.fromBuffer(d)},c.prototype.getDirListing=function(a,b,c){if(!c.isDirectory())throw i.ApiError.ENOTDIR(b);var d=a.get(c.id);if(void 0===d)throw i.ApiError.ENOENT(b);return JSON.parse(d.toString())},c.prototype.addNewNode=function(a,b){for(var c,e=0;e<5;)try{return c=d(),a.put(c,b,!1),c}catch(a){}throw new i.ApiError(i.ErrorCode.EIO,"Unable to commit data to key-value store.")},c.prototype.commitNewFile=function(a,c,d,e,f){var g=k.dirname(c),h=k.basename(c),j=this.findINode(a,g),m=this.getDirListing(a,g,j),n=(new Date).getTime();if("/"===c)throw i.ApiError.EEXIST(c);if(m[h])throw i.ApiError.EEXIST(c);try{var o=this.addNewNode(a,f),p=new l(o,f.length,e|d,n,n,n),q=this.addNewNode(a,p.toBuffer());m[h]=q,a.put(j.id,new b(JSON.stringify(m)),!0)}catch(b){throw a.abort(),b}return a.commit(),p},c.prototype.empty=function(){this.store.clear(),this.makeRootDirectory()},c.prototype.renameSync=function(a,c){var d=this.store.beginTransaction("readwrite"),e=k.dirname(a),f=k.basename(a),g=k.dirname(c),h=k.basename(c),j=this.findINode(d,e),l=this.getDirListing(d,e,j);if(!l[f])throw i.ApiError.ENOENT(a);var m=l[f];if(delete l[f],0===(g+"/").indexOf(a+"/"))throw new i.ApiError(i.ErrorCode.EBUSY,e);var n,o;if(g===e?(n=j,o=l):(n=this.findINode(d,g),o=this.getDirListing(d,g,n)),o[h]){var p=this.getINode(d,c,o[h]);if(!p.isFile())throw i.ApiError.EPERM(c);try{d.del(p.id),d.del(o[h])}catch(a){throw d.abort(),a}}o[h]=m;try{d.put(j.id,new b(JSON.stringify(l)),!0),d.put(n.id,new b(JSON.stringify(o)),!0)}catch(a){throw d.abort(),a}d.commit()},c.prototype.statSync=function(a,b){return this.findINode(this.store.beginTransaction("readonly"),a).toStats()},c.prototype.createFileSync=function(a,c,d){var e=this.store.beginTransaction("readwrite"),f=new b(0),g=this.commitNewFile(e,a,j.FileType.FILE,d,f);return new p(this,a,c,g.toStats(),f)},c.prototype.openFileSync=function(a,b){var c=this.store.beginTransaction("readonly"),d=this.findINode(c,a),e=c.get(d.id);if(void 0===e)throw i.ApiError.ENOENT(a);return new p(this,a,b,d.toStats(),e)},c.prototype.removeEntry=function(a,c){var d=this.store.beginTransaction("readwrite"),e=k.dirname(a),f=this.findINode(d,e),g=this.getDirListing(d,e,f),h=k.basename(a);if(!g[h])throw i.ApiError.ENOENT(a);var j=g[h];delete g[h];var l=this.getINode(d,a,j);if(!c&&l.isDirectory())throw i.ApiError.EISDIR(a);if(c&&!l.isDirectory())throw i.ApiError.ENOTDIR(a);try{d.del(l.id),d.del(j),d.put(f.id,new b(JSON.stringify(g)),!0)}catch(a){throw d.abort(),a}d.commit()},c.prototype.unlinkSync=function(a){this.removeEntry(a,!1)},c.prototype.rmdirSync=function(a){if(this.readdirSync(a).length>0)throw i.ApiError.ENOTEMPTY(a);this.removeEntry(a,!0)},c.prototype.mkdirSync=function(a,c){var d=this.store.beginTransaction("readwrite"),e=new b("{}");this.commitNewFile(d,a,j.FileType.DIRECTORY,c,e)},c.prototype.readdirSync=function(a){var b=this.store.beginTransaction("readonly");return Object.keys(this.getDirListing(b,a,this.findINode(b,a)))},c.prototype._syncSync=function(a,b,c){var d=this.store.beginTransaction("readwrite"),e=this._findINode(d,k.dirname(a),k.basename(a)),f=this.getINode(d,a,e),g=f.update(c);try{d.put(f.id,b,!0),g&&d.put(e,f.toBuffer(),!0)}catch(a){throw d.abort(),a}d.commit()},c}(h.SynchronousFileSystem);c.SyncKeyValueFileSystem=q;var r=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return g(b,a),b.prototype.sync=function(a){var b=this;this.isDirty()?this._fs._sync(this.getPath(),this.getBuffer(),this.getStats(),function(c){c||b.resetDirty(),a(c)}):a()},b.prototype.close=function(a){this.sync(a)},b}(m.PreloadFile);c.AsyncKeyValueFile=r;var s=function(a){function c(){a.apply(this,arguments)}return g(c,a),c.prototype.init=function(a,b){this.store=a,this.makeRootDirectory(b)},c.isAvailable=function(){return!0},c.prototype.getName=function(){return this.store.name()},c.prototype.isReadOnly=function(){return!1},c.prototype.supportsSymlinks=function(){return!1},c.prototype.supportsProps=function(){return!1},c.prototype.supportsSynch=function(){return!1},c.prototype.makeRootDirectory=function(a){var c=this.store.beginTransaction("readwrite");c.get(n,function(e,g){if(e||void 0===g){var h=(new Date).getTime(),i=new l(d(),4096,511|j.FileType.DIRECTORY,h,h,h);c.put(i.id,new b("{}"),!1,function(b){f(b,c,a)&&c.put(n,i.toBuffer(),!1,function(b){b?c.abort(function(){a(b)}):c.commit(a)})})}else c.commit(a)})},c.prototype._findINode=function(a,b,c,d){var f=this,g=function(a,e,f){a?d(a):f[c]?d(null,f[c]):d(i.ApiError.ENOENT(k.resolve(b,c)))};"/"===b?""===c?d(null,n):this.getINode(a,b,n,function(c,h){e(c,d)&&f.getDirListing(a,b,h,function(a,b){g(a,h,b)})}):this.findINodeAndDirListing(a,b,g)},c.prototype.findINode=function(a,b,c){var d=this;this._findINode(a,k.dirname(b),k.basename(b),function(f,g){e(f,c)&&d.getINode(a,b,g,c)})},c.prototype.getINode=function(a,b,c,d){a.get(c,function(a,c){e(a,d)&&(void 0===c?d(i.ApiError.ENOENT(b)):d(null,l.fromBuffer(c)))})},c.prototype.getDirListing=function(a,b,c,d){c.isDirectory()?a.get(c.id,function(a,c){if(e(a,d))try{d(null,JSON.parse(c.toString()))}catch(a){d(i.ApiError.ENOENT(b))}}):d(i.ApiError.ENOTDIR(b))},c.prototype.findINodeAndDirListing=function(a,b,c){var d=this;this.findINode(a,b,function(f,g){e(f,c)&&d.getDirListing(a,b,g,function(a,b){e(a,c)&&c(null,g,b)})})},c.prototype.addNewNode=function(a,b,c){var e,f=0,g=function(){5===++f?c(new i.ApiError(i.ErrorCode.EIO,"Unable to commit data to key-value store.")):(e=d(),a.put(e,b,!1,function(a,b){a||!b?g():c(null,e)}))};g()},c.prototype.commitNewFile=function(a,c,d,e,g,h){var j=this,m=k.dirname(c),n=k.basename(c),o=(new Date).getTime();return"/"===c?h(i.ApiError.EEXIST(c)):void this.findINodeAndDirListing(a,m,function(k,m,p){f(k,a,h)&&(p[n]?a.abort(function(){h(i.ApiError.EEXIST(c))}):j.addNewNode(a,g,function(c,i){if(f(c,a,h)){var k=new l(i,g.length,e|d,o,o,o);j.addNewNode(a,k.toBuffer(),function(c,d){f(c,a,h)&&(p[n]=d,a.put(m.id,new b(JSON.stringify(p)),!0,function(b){f(b,a,h)&&a.commit(function(b){f(b,a,h)&&h(null,k)})}))})}}))})},c.prototype.empty=function(a){var b=this;this.store.clear(function(c){e(c,a)&&b.makeRootDirectory(a)})},c.prototype.rename=function(a,c,d){var e=this,g=this.store.beginTransaction("readwrite"),h=k.dirname(a),j=k.basename(a),l=k.dirname(c),m=k.basename(c),n={},o={},p=!1;if(0===(l+"/").indexOf(a+"/"))return d(new i.ApiError(i.ErrorCode.EBUSY,h));var q=function(){if(!p&&o.hasOwnProperty(h)&&o.hasOwnProperty(l)){var k=o[h],q=n[h],r=o[l],s=n[l];if(k[j]){var t=k[j];delete k[j];var u=function(){r[m]=t,g.put(q.id,new b(JSON.stringify(k)),!0,function(a){f(a,g,d)&&(h===l?g.commit(d):g.put(s.id,new b(JSON.stringify(r)),!0,function(a){f(a,g,d)&&g.commit(d)}))})};r[m]?e.getINode(g,c,r[m],function(a,b){f(a,g,d)&&(b.isFile()?g.del(b.id,function(a){f(a,g,d)&&g.del(r[m],function(a){f(a,g,d)&&u()})}):g.abort(function(a){d(i.ApiError.EPERM(c))}))}):u()}else d(i.ApiError.ENOENT(a))}},r=function(a){e.findINodeAndDirListing(g,a,function(b,c,e){b?p||(p=!0,g.abort(function(){d(b)})):(n[a]=c,o[a]=e,q())})};r(h),h!==l&&r(l)},c.prototype.stat=function(a,b,c){var d=this.store.beginTransaction("readonly");this.findINode(d,a,function(a,b){e(a,c)&&c(null,b.toStats())})},c.prototype.createFile=function(a,c,d,f){var g=this,h=this.store.beginTransaction("readwrite"),i=new b(0);this.commitNewFile(h,a,j.FileType.FILE,d,i,function(b,d){e(b,f)&&f(null,new r(g,a,c,d.toStats(),i))})},c.prototype.openFile=function(a,b,c){var d=this,f=this.store.beginTransaction("readonly");this.findINode(f,a,function(g,h){e(g,c)&&f.get(h.id,function(f,g){e(f,c)&&(void 0===g?c(i.ApiError.ENOENT(a)):c(null,new r(d,a,b,h.toStats(),g)))})})},c.prototype.removeEntry=function(a,c,d){var e=this,g=this.store.beginTransaction("readwrite"),h=k.dirname(a),j=k.basename(a);this.findINodeAndDirListing(g,h,function(h,k,l){if(f(h,g,d))if(l[j]){var m=l[j];delete l[j],e.getINode(g,a,m,function(e,h){f(e,g,d)&&(!c&&h.isDirectory()?g.abort(function(){d(i.ApiError.EISDIR(a))}):c&&!h.isDirectory()?g.abort(function(){d(i.ApiError.ENOTDIR(a))}):g.del(h.id,function(a){f(a,g,d)&&g.del(m,function(a){f(a,g,d)&&g.put(k.id,new b(JSON.stringify(l)),!0,function(a){f(a,g,d)&&g.commit(d)})})}))})}else g.abort(function(){d(i.ApiError.ENOENT(a))})})},c.prototype.unlink=function(a,b){this.removeEntry(a,!1,b)},c.prototype.rmdir=function(a,b){var c=this;this.readdir(a,function(d,e){d?b(d):e.length>0?b(i.ApiError.ENOTEMPTY(a)):c.removeEntry(a,!0,b)})},c.prototype.mkdir=function(a,c,d){var e=this.store.beginTransaction("readwrite"),f=new b("{}");this.commitNewFile(e,a,j.FileType.DIRECTORY,c,f,d)},c.prototype.readdir=function(a,b){var c=this,d=this.store.beginTransaction("readonly");this.findINode(d,a,function(f,g){e(f,b)&&c.getDirListing(d,a,g,function(a,c){e(a,b)&&b(null,Object.keys(c))})})},c.prototype._sync=function(a,b,c,d){var e=this,g=this.store.beginTransaction("readwrite");this._findINode(g,k.dirname(a),k.basename(a),function(h,i){f(h,g,d)&&e.getINode(g,a,i,function(a,e){if(f(a,g,d)){var h=e.update(c);g.put(e.id,b,!0,function(a){f(a,g,d)&&(h?g.put(i,e.toBuffer(),!0,function(a){f(a,g,d)&&g.commit(d)}):g.commit(d))})}})})},c}(h.BaseFileSystem);c.AsyncKeyValueFileSystem=s}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/file_system":57,"../core/node_fs_stats":60,"../generic/inode":64,"../generic/preload_file":68,"bfs-buffer":2,path:10}],66:[function(a,b,c){"use strict";var d=a("./mutex"),e=function(){function a(a){this._fs=a,this._mu=new d.default}return a.prototype.getName=function(){return"LockedFS<"+this._fs.getName()+">"},a.prototype.getFSUnlocked=function(){return this._fs},a.prototype.initialize=function(a){this._fs.initialize(a)},a.prototype.diskSpace=function(a,b){this._fs.diskSpace(a,b)},a.prototype.isReadOnly=function(){return this._fs.isReadOnly()},a.prototype.supportsLinks=function(){return this._fs.supportsLinks()},a.prototype.supportsProps=function(){return this._fs.supportsProps()},a.prototype.supportsSynch=function(){return this._fs.supportsSynch()},a.prototype.rename=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.rename(a,b,function(a){d._mu.unlock(),c(a)})})},a.prototype.renameSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.renameSync(a,b)},a.prototype.stat=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.stat(a,b,function(a,b){d._mu.unlock(),c(a,b)})})},a.prototype.statSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.statSync(a,b)},a.prototype.open=function(a,b,c,d){var e=this;this._mu.lock(function(){e._fs.open(a,b,c,function(a,b){e._mu.unlock(),d(a,b)})})},a.prototype.openSync=function(a,b,c){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.openSync(a,b,c)},a.prototype.unlink=function(a,b){var c=this;this._mu.lock(function(){c._fs.unlink(a,function(a){c._mu.unlock(),b(a)})})},a.prototype.unlinkSync=function(a){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.unlinkSync(a)},a.prototype.rmdir=function(a,b){var c=this;this._mu.lock(function(){c._fs.rmdir(a,function(a){c._mu.unlock(),b(a)})})},a.prototype.rmdirSync=function(a){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.rmdirSync(a)},a.prototype.mkdir=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.mkdir(a,b,function(a){d._mu.unlock(),c(a)})})},a.prototype.mkdirSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.mkdirSync(a,b)},a.prototype.readdir=function(a,b){var c=this;this._mu.lock(function(){c._fs.readdir(a,function(a,d){c._mu.unlock(),b(a,d)})})},a.prototype.readdirSync=function(a){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.readdirSync(a)},a.prototype.exists=function(a,b){var c=this;this._mu.lock(function(){c._fs.exists(a,function(a){c._mu.unlock(),b(a)})})},a.prototype.existsSync=function(a){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.existsSync(a)},a.prototype.realpath=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.realpath(a,b,function(a,b){d._mu.unlock(),c(a,b)})})},a.prototype.realpathSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.realpathSync(a,b)},a.prototype.truncate=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.truncate(a,b,function(a){d._mu.unlock(),c(a)})})},a.prototype.truncateSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");
return this._fs.truncateSync(a,b)},a.prototype.readFile=function(a,b,c,d){var e=this;this._mu.lock(function(){e._fs.readFile(a,b,c,function(a,b){e._mu.unlock(),d(a,b)})})},a.prototype.readFileSync=function(a,b,c){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.readFileSync(a,b,c)},a.prototype.writeFile=function(a,b,c,d,e,f){var g=this;this._mu.lock(function(){g._fs.writeFile(a,b,c,d,e,function(a){g._mu.unlock(),f(a)})})},a.prototype.writeFileSync=function(a,b,c,d,e){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.writeFileSync(a,b,c,d,e)},a.prototype.appendFile=function(a,b,c,d,e,f){var g=this;this._mu.lock(function(){g._fs.appendFile(a,b,c,d,e,function(a){g._mu.unlock(),f(a)})})},a.prototype.appendFileSync=function(a,b,c,d,e){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.appendFileSync(a,b,c,d,e)},a.prototype.chmod=function(a,b,c,d){var e=this;this._mu.lock(function(){e._fs.chmod(a,b,c,function(a){e._mu.unlock(),d(a)})})},a.prototype.chmodSync=function(a,b,c){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.chmodSync(a,b,c)},a.prototype.chown=function(a,b,c,d,e){var f=this;this._mu.lock(function(){f._fs.chown(a,b,c,d,function(a){f._mu.unlock(),e(a)})})},a.prototype.chownSync=function(a,b,c,d){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.chownSync(a,b,c,d)},a.prototype.utimes=function(a,b,c,d){var e=this;this._mu.lock(function(){e._fs.utimes(a,b,c,function(a){e._mu.unlock(),d(a)})})},a.prototype.utimesSync=function(a,b,c){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.utimesSync(a,b,c)},a.prototype.link=function(a,b,c){var d=this;this._mu.lock(function(){d._fs.link(a,b,function(a){d._mu.unlock(),c(a)})})},a.prototype.linkSync=function(a,b){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.linkSync(a,b)},a.prototype.symlink=function(a,b,c,d){var e=this;this._mu.lock(function(){e._fs.symlink(a,b,c,function(a){e._mu.unlock(),d(a)})})},a.prototype.symlinkSync=function(a,b,c){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.symlinkSync(a,b,c)},a.prototype.readlink=function(a,b){var c=this;this._mu.lock(function(){c._fs.readlink(a,function(a,d){c._mu.unlock(),b(a,d)})})},a.prototype.readlinkSync=function(a){if(this._mu.isLocked())throw new Error("invalid sync call");return this._fs.readlinkSync(a)},a}();c.__esModule=!0,c.default=e},{"./mutex":67}],67:[function(a,b,c){"use strict";var d=function(){function a(){this._locked=!1,this._waiters=[]}return a.prototype.lock=function(a){return this._locked?void this._waiters.push(a):(this._locked=!0,void a())},a.prototype.unlock=function(){if(!this._locked)throw new Error("unlock of a non-locked mutex");var a=this._waiters.shift();return a?void setImmediate(a):void(this._locked=!1)},a.prototype.tryLock=function(){return!this._locked&&(this._locked=!0,!0)},a.prototype.isLocked=function(){return this._locked},a}();c.__esModule=!0,c.default=d},{}],68:[function(a,b,c){(function(b){"use strict";var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},e=a("../core/file"),f=a("../core/api_error"),g=a("../core/node_fs"),h=function(a){function c(c,d,e,f,g){if(a.call(this),this._pos=0,this._dirty=!1,this._fs=c,this._path=d,this._flag=e,this._stat=f,null!=g?this._buffer=g:this._buffer=new b(0),this._stat.size!==this._buffer.length&&this._flag.isReadable())throw new Error("Invalid buffer: Buffer is "+this._buffer.length+" long, yet Stats object specifies that file is "+this._stat.size+" long.")}return d(c,a),c.prototype.isDirty=function(){return this._dirty},c.prototype.resetDirty=function(){this._dirty=!1},c.prototype.getBuffer=function(){return this._buffer},c.prototype.getStats=function(){return this._stat},c.prototype.getFlag=function(){return this._flag},c.prototype.getPath=function(){return this._path},c.prototype.getPos=function(){return this._flag.isAppendable()?this._stat.size:this._pos},c.prototype.advancePos=function(a){return this._pos+=a},c.prototype.setPos=function(a){return this._pos=a},c.prototype.sync=function(a){try{this.syncSync(),a()}catch(b){a(b)}},c.prototype.syncSync=function(){throw new f.ApiError(f.ErrorCode.ENOTSUP)},c.prototype.close=function(a){try{this.closeSync(),a()}catch(b){a(b)}},c.prototype.closeSync=function(){throw new f.ApiError(f.ErrorCode.ENOTSUP)},c.prototype.stat=function(a){try{a(null,this._stat.clone())}catch(b){a(b)}},c.prototype.statSync=function(){return this._stat.clone()},c.prototype.truncate=function(a,b){try{this.truncateSync(a),this._flag.isSynchronous()&&!g.getRootFS().supportsSynch()&&this.sync(b),b()}catch(a){return b(a)}},c.prototype.truncateSync=function(a){if(this._dirty=!0,!this._flag.isWriteable())throw new f.ApiError(f.ErrorCode.EPERM,"File not opened with a writeable mode.");if(this._stat.mtime=new Date,a>this._buffer.length){var c=new b(a-this._buffer.length);return c.fill(0),this.writeSync(c,0,c.length,this._buffer.length),void(this._flag.isSynchronous()&&g.getRootFS().supportsSynch()&&this.syncSync())}this._stat.size=a;var d=new b(a);this._buffer.copy(d,0,0,a),this._buffer=d,this._flag.isSynchronous()&&g.getRootFS().supportsSynch()&&this.syncSync()},c.prototype.write=function(a,b,c,d,e){try{e(null,this.writeSync(a,b,c,d),a)}catch(a){e(a)}},c.prototype.writeSync=function(a,c,d,e){if(this._dirty=!0,null==e&&(e=this.getPos()),!this._flag.isWriteable())throw new f.ApiError(f.ErrorCode.EPERM,"File not opened with a writeable mode.");var g=e+d;if(g>this._stat.size&&(this._stat.size=g,g>this._buffer.length)){var h=new b(g);this._buffer.copy(h),this._buffer=h}var i=a.copy(this._buffer,e,c,c+d);return this._stat.mtime=new Date,this._flag.isSynchronous()?(this.syncSync(),i):(this.setPos(e+i),i)},c.prototype.read=function(a,b,c,d,e){try{e(null,this.readSync(a,b,c,d),a)}catch(a){e(a)}},c.prototype.readSync=function(a,b,c,d){if(!this._flag.isReadable())throw new f.ApiError(f.ErrorCode.EPERM,"File not opened with a readable mode.");null==d&&(d=this.getPos());var e=d+c;e>this._stat.size&&(c=this._stat.size-d);var g=this._buffer.copy(a,b,d,d+c);return this._stat.atime=new Date,this._pos=d+c,g},c.prototype.chmod=function(a,b){try{this.chmodSync(a),b()}catch(a){b(a)}},c.prototype.chmodSync=function(a){if(!this._fs.supportsProps())throw new f.ApiError(f.ErrorCode.ENOTSUP);this._dirty=!0,this._stat.chmod(a),this.syncSync()},c}(e.BaseFile);c.PreloadFile=h;var i=function(a){function b(b,c,d,e,f){a.call(this,b,c,d,e,f)}return d(b,a),b.prototype.sync=function(a){a()},b.prototype.syncSync=function(){},b.prototype.close=function(a){a()},b.prototype.closeSync=function(){},b}(h);c.NoSyncFile=i}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/file":55,"../core/node_fs":59,"bfs-buffer":2}],69:[function(a,b,c){(function(b){"use strict";function d(a){for(var b=IEBinaryToArray_ByteStr(a),c=IEBinaryToArray_ByteStr_Last(a),d=b.replace(/[\s\S]/g,function(a){var b=a.charCodeAt(0);return String.fromCharCode(255&b,b>>8)})+c,e=new Array(d.length),f=0;f<d.length;f++)e[f]=d.charCodeAt(f);return e}function e(a,c,e,f){switch(e){case"buffer":case"json":break;default:return f(new o.ApiError(o.ErrorCode.EINVAL,"Invalid download type: "+e))}var g=new XMLHttpRequest;g.open("GET",c,a),g.setRequestHeader("Accept-Charset","x-user-defined"),g.onreadystatechange=function(a){var c;if(4===g.readyState){if(200!==g.status)return f(new o.ApiError(g.status,"XHR error."));switch(e){case"buffer":return c=d(g.responseBody),f(null,new b(c));case"json":return f(null,JSON.parse(g.responseText))}}},g.send()}function f(a,b,c){e(!0,a,b,c)}function g(a,b){var c;return e(!1,a,b,function(a,b){if(a)throw a;c=b}),c}function h(a,c,d){var e=new XMLHttpRequest;e.open("GET",a,!0);var f=!0;switch(c){case"buffer":e.responseType="arraybuffer";break;case"json":try{e.responseType="json",f="json"===e.responseType}catch(a){f=!1}break;default:return d(new o.ApiError(o.ErrorCode.EINVAL,"Invalid download type: "+c))}e.onreadystatechange=function(a){if(4===e.readyState){if(200!==e.status)return d(new o.ApiError(e.status,"XHR error."));switch(c){case"buffer":return d(null,new b(e.response?e.response:0));case"json":return f?d(null,e.response):d(null,JSON.parse(e.responseText))}}},e.send()}function i(a,c){var d=new XMLHttpRequest;d.open("GET",a,!1);var e=null,f=null;if(d.overrideMimeType("text/plain; charset=x-user-defined"),d.onreadystatechange=function(a){if(4===d.readyState){if(200!==d.status)return void(f=new o.ApiError(d.status,"XHR error."));switch(c){case"buffer":var g=d.responseText;e=new b(g.length);for(var h=0;h<g.length;h++)e.writeUInt8(g.charCodeAt(h),h,!0);return;case"json":return void(e=JSON.parse(d.responseText))}}},d.send(),f)throw f;return e}function j(a,c){var d=new XMLHttpRequest;switch(d.open("GET",a,!1),c){case"buffer":d.responseType="arraybuffer";break;case"json":break;default:throw new o.ApiError(o.ErrorCode.EINVAL,"Invalid download type: "+c)}var e,f;if(d.onreadystatechange=function(a){if(4===d.readyState)if(200===d.status)switch(c){case"buffer":e=new b(d.response);break;case"json":e=JSON.parse(d.response)}else f=new o.ApiError(d.status,"XHR error.")},d.send(),f)throw f;return e}function k(a,b,c){var d=new XMLHttpRequest;d.open("HEAD",b,a),d.onreadystatechange=function(a){if(4===d.readyState){if(200!=d.status)return c(new o.ApiError(d.status,"XHR HEAD error."));try{return c(null,parseInt(d.getResponseHeader("Content-Length")||"-1",10))}catch(a){return c(new o.ApiError(o.ErrorCode.EIO,"XHR HEAD error: Could not read content-length."))}}},d.send()}function l(a){var b;return k(!1,a,function(a,c){if(a)throw a;b=c}),b}function m(a,b){k(!0,a,b)}var n=a("../core/util"),o=a("../core/api_error");c.asyncDownloadFile=n.isIE&&"undefined"==typeof Blob?f:h,c.syncDownloadFile=n.isIE&&"undefined"==typeof Blob?g:n.isIE&&"undefined"!=typeof Blob?j:i,c.getFileSizeSync=l,c.getFileSizeAsync=m}).call(this,a("bfs-buffer").Buffer)},{"../core/api_error":52,"../core/util":61,"bfs-buffer":2}],70:[function(a,b,c){"use strict";var d=a("./core/global");if(Date.now||(Date.now=function(){return(new Date).getTime()}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),Object.keys||(Object.keys=function(){var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;g<d;g++)a.call(e,c[g])&&h.push(c[g]);return h}}()),"b"!=="ab".substr(-1)&&(String.prototype.substr=function(a){return function(b,c){return b<0&&(b=this.length+b),a.call(this,b,c)}}(String.prototype.substr)),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){for(var c=0;c<this.length;++c)c in this&&a.call(b,this[c],c,this)}),Array.prototype.filter||(Array.prototype.filter=function(a){if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments.length>=2?arguments[1]:void 0,f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),"undefined"==typeof setImmediate){var e=d,f=[],g="zero-timeout-message",h=function(){if("undefined"!=typeof e.importScripts||!e.postMessage)return!1;var a=!0,b=e.onmessage;return e.onmessage=function(){a=!1},e.postMessage("","*"),e.onmessage=b,a};if(h()){e.setImmediate=function(a){f.push(a),e.postMessage(g,"*")};var i=function(a){if(a.source===self&&a.data===g&&(a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,f.length>0)){var b=f.shift();return b()}};e.addEventListener?e.addEventListener("message",i,!0):e.attachEvent("onmessage",i)}else if(e.MessageChannel){var j=new e.MessageChannel;j.port1.onmessage=function(a){if(f.length>0)return f.shift()()},e.setImmediate=function(a){f.push(a),j.port2.postMessage("")}}else e.setImmediate=function(a){return setTimeout(a,0)}}if(Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===b&&(b=0),!this)throw new TypeError;var c=this.length;if(0===c||d>=c)return-1;var d=b;d<0&&(d=c+d);for(var e=d;e<c;e++)if(this[e]===a)return e;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;for(c=0,d=this.length;c<d;++c)c in this&&a.call(b,this[c],c,this)}),Array.prototype.map||(Array.prototype.map=function(a,b){var c,d,e;if(null==this)throw new TypeError(" this is null or not defined");var f=Object(this),g=f.length>>>0;if("function"!=typeof a)throw new TypeError(a+" is not a function");for(b&&(c=b),d=new Array(g),e=0;e<g;){var h,i;e in f&&(h=f[e],i=a.call(c,h,e,f),d[e]=i),e++}return d}),"undefined"!=typeof document&&"undefined"!=typeof window&&void 0===window.chrome){var k='Function IEBinaryToArray_ByteStr(Binary)\r\n IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n Dim lastIndex\r\n lastIndex = LenB(Binary)\r\n if lastIndex mod 2 Then\r\n IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n Else\r\n IEBinaryToArray_ByteStr_Last = ""\r\n End If\r\nEnd Function\r\n';if("loading"===document.readyState)document.write("<script type='text/vbscript'>\r\n"+k+"</script>\r\n");else{var l=document.createElement("script");l.type="text/vbscript",l.innerHTML=k,document.head.appendChild(l)}}var m=a("./core/browserfs");b.exports=m},{"./core/browserfs":54,"./core/global":58}]},{},[50])(50)});