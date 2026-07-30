//! Rust slice of awkward-lib, published from deeply/nested/rust-core.

pub const LANGUAGE: &str = "rust";

pub fn greet(who: &str) -> String {
    format!("hello {who} from awkward-lib/rust")
}
