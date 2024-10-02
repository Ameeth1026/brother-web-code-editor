const textarea_1 = CodeMirror.fromTextArea(document.querySelector('.box_1 textarea'),{
    mode:"htmlmixed",
    lineNumbers:true,
    theme:"dracula",
    autoCloseTags:true,
    lineWrapping:true,
    autoCloseBrackets:true,
    indentUnit: 6,
});
const textarea_2 = CodeMirror.fromTextArea(document.querySelector('.box_2 textarea'),{
    mode:"css",
    lineNumbers:true,
    theme:"dracula",
    autoCloseBrackets:true,
    lineWrapping:true,
    indentUnit: 6,

});
const textarea_3 = CodeMirror.fromTextArea(document.querySelector('.box_3 textarea'),{
    mode:"javascript",
    lineNumbers:true,
    theme:"dracula",
    autoCloseBrackets:true,
    lineWrapping:true,
    indentUnit: 6,
});

// ===========download the text and filename and choose of file type============

// for box 1

const filename_1 = document.querySelector('.box_1 .file-name input'),
select_1 = document.querySelector('.box_1 select'),
download_1 = document.querySelector('.download_1');

download_1.addEventListener('click',()=>{
const content_of_html = textarea_1.getValue();

const blob_1 = new Blob([content_of_html],{type: select_1.value});

const fileurl_1 = URL.createObjectURL(blob_1)
const link_1 = document.createElement('a');
link_1.download = filename_1.value;
link_1.href = fileurl_1;
link_1.click();
});
// for box 2

const filename_2 = document.querySelector('.box_2 .file-name input'),
select_2 = document.querySelector('.box_2 select'),
download_2 = document.querySelector('.download_2');

download_2.addEventListener('click',()=>{
const content_of_css = textarea_2.getValue();

const blob_2 = new Blob([content_of_css],{type: select_2.value});

const fileurl_2 = URL.createObjectURL(blob_2)
const link_2 = document.createElement('a');
link_2.download = filename_2.value;
link_2.href = fileurl_2;
link_2.click();
});

// for box 3=====

const filename_3 = document.querySelector('.box_3 .file-name input'),
select_3 = document.querySelector('.box_3 select'),
download_3 = document.querySelector('.download_3');

download_3.addEventListener('click',()=>{
const content_of_css = textarea_3.getValue();

const blob_3 = new Blob([content_of_css],{type: select_3.value});

const fileurl_3 = URL.createObjectURL(blob_3)
const link_3 = document.createElement('a');
link_3.download = filename_3.value;
link_3.href = fileurl_3;
link_3.click();
});



/// ================for the refresh of web pages=============

// Check if code exists in local storage and load it
const loadCodeFromLocalStorage = (editor, localStorageKey) => {
    const savedCode = localStorage.getItem(localStorageKey);
    if (savedCode) {
        editor.setValue(savedCode);
    }
};

// Save code to local storage
const saveCodeToLocalStorage = (editor, localStorageKey) => {
    const code = editor.getValue();
    localStorage.setItem(localStorageKey, code);
};

// Load code from local storage on page load
window.addEventListener('load', () => {
    loadCodeFromLocalStorage(textarea_1, 'code_1');
    loadCodeFromLocalStorage(textarea_2, 'code_2');
    loadCodeFromLocalStorage(textarea_3, 'code_3');
});

// Update local storage on code change
textarea_1.on('change', () => {
    saveCodeToLocalStorage(textarea_1, 'code_1');
    updateiframeContent();
});

textarea_2.on('change', () => {
    saveCodeToLocalStorage(textarea_2, 'code_2');
    updateiframeContent();
});

textarea_3.on('change', () => {
    saveCodeToLocalStorage(textarea_3, 'code_3');
    updateiframeContent();
});

// ============type of code working in output==========


var output = document.querySelector('#output');

const updateiframeContent = () =>{
    const htmlcode = textarea_1.getValue();
    const csscode = textarea_2.getValue();
    const jscode = textarea_3.getValue();

    const iframedocument  = output.contentDocument || output.contentWindow.document;

    iframedocument.open();
    iframedocument.write(htmlcode);
    iframedocument.write('<style>' + csscode + '</style>');
    iframedocument.write('<script>' + jscode + '</script>');
    iframedocument.close();

};
textarea_1.on('change',()=>{
    updateiframeContent();
});
textarea_2.on('change',()=>{
    updateiframeContent();
});
textarea_3.on('change',()=>{
    updateiframeContent();
});



// clearing of code in single button

const clearalltext = ()=>{
    textarea_1.setValue('');
    textarea_2.setValue('');
    textarea_3.setValue('');
    updateiframeContent();

    saveCodeToLocalStorage(textarea_1,'code_1');
    saveCodeToLocalStorage(textarea_2,'code_2');
    saveCodeToLocalStorage(textarea_3,'code_3');
};

const clearbtn = document.querySelector('#top_nav .btn button');
clearbtn.addEventListener('click',()=>{
    clearalltext();
});

