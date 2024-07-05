import init, { md_preview , md_dl } from './rust_markdown.js';

const textArea = document.getElementById('input_markdown');
async function run() {
    await init();
    textArea.value = "---\ntitle:\n---\n\n# はじめに\n";
    document.getElementById("preview").innerHTML = md_preview(textArea.value);
    textArea.addEventListener("input", (event) => {
        document.getElementById("preview").innerHTML = md_preview(event.target.value);
    });
    document.getElementById("mi1_btn").addEventListener("click",(event) => {
        Insert("# ");
    });
    document.getElementById("mi2_btn").addEventListener("click",(event) => {
        Insert("## ");
    });
    document.getElementById("mi3_btn").addEventListener("click",(event) => {
        Insert("### ");
    });
    document.getElementById("mi4_btn").addEventListener("click",(event) => {
        Insert("#### ");
    });
    document.getElementById("italic_btn").addEventListener("click",(event) => {
        Insert("*italic*");
    });
    document.getElementById("futoji_btn").addEventListener("click",(event) => {
        Insert("**太字**");
    });
    document.getElementById("uti_btn").addEventListener("click",(event) => {
        Insert("~~打消~~");
    });
    document.getElementById("link_btn").addEventListener("click",(event) => {
        Insert("[google](https://www.google.co.jp)");
    });
    document.getElementById("list_btn").addEventListener("click",(event) => {
        Insert("\n- Animal\n  - Dog\n  - Cat\n- Fruit\n  - Banana\n  - Apple\n");
    });
    document.getElementById("gazo_btn").addEventListener("click",(event) => {
        Insert("\n![Alt text](https://www.google.co.jp/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)\n");
    });
    document.getElementById("dl_btn").addEventListener("click",(event) => {
        md_dl(textArea.value);
    });
}
run();

function Insert(insertText) {
    let posi = 0;
    if (textArea.selectionStart || textArea.selectionStart === 0) {
        posi= textArea.selectionStart;
    }
    textArea.value = textArea.value.substring(0,posi)+ insertText + textArea.value.substring(posi);
    textArea.setSelectionRange(posi, posi + insertText.length);
    textArea.focus();
    document.getElementById("preview").innerHTML = md_preview(textArea.value);
  }