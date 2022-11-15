
this.totalDocumentCount = 0
function tokenize(input) {
    input = input.toLowerCase()
    input = input.trim()
    // Remove non alphanumeric characters
    input = input.replace(/\W/g, ' ')
    // Replace extra whitespace 
    input = input.replace(/\s+/g, ' ')
    input = split(' ')
    // TODO: remove stop words
    return input 
}

function addDocument(doc_text) {
    tokenized_text = tokenize(doc_text);
    var new_doc = {num: this.totalDocumentCount, tokens: tokenized_text, text: doc_text, termCount: tokenized_text.length};
    this.totalDocumentCount++;
    this.totalTermCount += new_doc.termCount;
    var uniqueTerms = {};
    for (let i = 0; i < tokenized_text.length; i++) {
        let term = tokenized_text[i]
        if (uniqueTerms[term]) {
            uniqueTerms[term].count++
        } else {
            uniqueTerms[term] = {
                count: 1,
                frequency: 0
            };
        }
    }

    for (const term of Object.keys(uniqueTerms)) {
        uniqueTerms[term].frequency = uniqueTerms[term].count / new_doc.term;
        if (this.terms[term]) {
            this.terms[term].doc_count++;
        } else {
            this.terms[term] = {
                doc_count: 1,
                idf: 0
            };
        }
    }

    // TODO: calculate IDF (optionally)

    new_doc.terms = uniqueTerms;
    this.documents[new_doc.num] = new_doc;
}

function addDocuments(doc_text_list) {
    for (const doc_text of doc_text_list) {
        addDocument(doc_text);
    }
    // TODO: Calculate IDF
}

function search(query) {
    // let input = document.getElementById('searchbar').value
    
    queryTokens = tokenize(query);

    // TODO: Finish Search function

}