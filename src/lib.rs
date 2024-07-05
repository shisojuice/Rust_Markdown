use wasm_bindgen::prelude::*;
use pulldown_cmark::{Parser, html, Options};
use web_sys;
use web_sys::{Blob,BlobPropertyBag, Url};
use web_sys::js_sys::{Array, Uint8Array};

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn md_preview(input: String) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_SMART_PUNCTUATION);
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
    options.insert(Options::ENABLE_YAML_STYLE_METADATA_BLOCKS);
    options.insert(Options::ENABLE_PLUSES_DELIMITED_METADATA_BLOCKS);
    options.insert(Options::ENABLE_OLD_FOOTNOTES);
    options.insert(Options::ENABLE_MATH);
    options.insert(Options::ENABLE_GFM);
    let parser = Parser::new_ext(&*input,options);
    let mut result = String::new();
    html::push_html(&mut result, parser);
    result
}

#[wasm_bindgen]
pub fn md_dl(input: String) {
    //DL
    let window = web_sys::window().unwrap();
    let uint8_array = Uint8Array::from(input.as_bytes());
    let parts = Array::new();
    parts.push(&uint8_array);
    // Blobを作成
    let blob = Blob::new_with_u8_array_sequence_and_options(&parts,BlobPropertyBag::new().type_("text/markdown")).unwrap();
    // BlobのURLを取得
    let url = Url::create_object_url_with_blob(&blob).unwrap();
    // a要素を作成
    let link = window.document().unwrap().create_element("a").unwrap().dyn_into::<web_sys::HtmlAnchorElement>().unwrap();
    link.set_href(&url);
    link.set_download("download.md");
    link.click();
    // URLを解放
    Url::revoke_object_url(&url).unwrap();
}