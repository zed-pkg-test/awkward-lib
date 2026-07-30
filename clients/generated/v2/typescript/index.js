// Buried at clients/generated/v2/typescript/. A consumer that installed the
// nodejs package gets THIS directory as its package root -- none of the path
// above it survives, which is the property worth proving for a deep target.
module.exports.greet = (who) => `hello ${who} from awkward-lib/nodejs`;
module.exports.LANGUAGE = "nodejs";
module.exports.DEPTH = 4;
