
// List of stop words from: https://countwordsfree.com/stopwords
const STOP_WORDS = new Set(["able","about","above","abroad","according","accordingly","across","actually","adj","after","afterwards","again","against","ago","ahead","ain't","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","a's","aside","ask","asking","associated","at","available","away","awfully","back","backward","backwards","be","became","because","become","becomes","becoming","been","before","beforehand","begin","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","came","can","cannot","cant","can't","caption","cause","causes","certain","certainly","changes","clearly","c'mon","co","co.","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","c's","currently","dare","daren't","definitely","described","despite","did","didn't","different","directly","do","does","doesn't","doing","done","don't","down","downwards","during","each","edu","eg","eight","eighty","either","else","elsewhere","end","ending","enough","entirely","especially","et","etc","even","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","fairly","far","farther","few","fewer","fifth","first","five","followed","following","follows","for","forever","former","formerly","forth","forward","found","four","from","further","furthermore","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","had","hadn't","half","happens","hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello","help","hence","her","here","hereafter","hereby","herein","here's","hereupon","hers","herself","he's","hi","him","himself","his","hither","hopefully","how","howbeit","however","hundred","i'd","ie","if","ignored","i'll","i'm","immediate","in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner","inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll","its","it's","itself","i've","just","k","keep","keeps","kept","know","known","knows","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","likewise","little","look","looking","looks","low","lower","ltd","made","mainly","make","makes","many","may","maybe","mayn't","me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus","miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my","myself","name","namely","nd","near","nearly","necessary","need","needn't","needs","neither","never","neverf","neverless","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","no-one","nor","normally","not","nothing","notwithstanding","novel","now","nowhere","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","one's","only","onto","opposite","or","other","others","otherwise","ought","oughtn't","our","ours","ourselves","out","outside","over","overall","own","particular","particularly","past","per","perhaps","placed","please","plus","possible","presumably","probably","provided","provides","que","quite","qv","rather","rd","re","really","reasonably","recent","recently","regarding","regardless","regards","relatively","respectively","right","round","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","since","six","so","some","somebody","someday","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that's","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","there'd","therefore","therein","there'll","there're","theres","there's","thereupon","there've","these","they","they'd","they'll","they're","they've","thing","things","think","third","thirty","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","till","to","together","too","took","toward","towards","tried","tries","truly","try","trying","t's","twice","two","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","upwards","us","use","used","useful","uses","using","usually","v","value","various","versus","very","via","viz","vs","want","wants","was","wasn't","way","we","we'd","welcome","well","we'll","went","were","we're","weren't","we've","what","whatever","what'll","what's","what've","when","whence","whenever","where","whereafter","whereas","whereby","wherein","where's","whereupon","wherever","whether","which","whichever","while","whilst","whither","who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why","will","willing","wish","with","within","without","wonder","won't","would","wouldn't","yes","yet","you","you'd","you'll","your","you're","yours","yourself","yourselves","you've","zero","a","how's","i","when's","why's","b","c","d","e","f","g","h","j","l","m","n","o","p","q","r","s","t","u","uucp","w","x","y","z","I","www","amount","bill","bottom","call","computer","con","couldnt","cry","de","describe","detail","due","eleven","empty","fifteen","fifty","fill","find","fire","forty","front","full","give","hasnt","herse","himse","interest","itse”","mill","move","myse”","part","put","show","side","sincere","sixty","system","ten","thick","thin","top","twelve","twenty","abst","accordance","act","added","adopted","affected","affecting","affects","ah","announce","anymore","apparently","approximately","aren","arent","arise","auth","beginning","beginnings","begins","biol","briefly","ca","date","ed","effect","et-al","ff","fix","gave","giving","heres","hes","hid","home","id","im","immediately","importance","important","index","information","invention","itd","keys","kg","km","largely","lets","line","'ll","means","mg","million","ml","mug","na","nay","necessarily","nos","noted","obtain","obtained","omitted","ord","owing","page","pages","poorly","possibly","potentially","pp","predominantly","present","previously","primarily","promptly","proud","quickly","ran","readily","ref","refs","related","research","resulted","resulting","results","run","sec","section","shed","shes","showed","shown","showns","shows","significant","significantly","similar","similarly","slightly","somethan","specifically","state","states","stop","strongly","substantially","successfully","sufficiently","suggest","thered","thereof","therere","thereto","theyd","theyre","thou","thoughh","thousand","throug","til","tip","ts","ups","usefully","usefulness","'ve","vol","vols","wed","whats","wheres","whim","whod","whos","widely","words","world","youd","youre"])

class BM25 {
    constructor() {
        this.totalDocumentCount = 0;
        this.totalDocumentLength = 0;
        this.documents = {};
        this.terms = {};    
    }

    tokenize(input) {
        input = input.toLowerCase();
        input = input.trim();
        // Remove non alphanumeric characters
        input = input.replace(/\W/g, ' ');
        // Replace extra whitespace 
        input = input.replace(/\s+/g, ' ');
        // Split into a list of terms
        input = input.split(' ')
        let tokens = []
        // Remove stop words
        for (const term of input) {
            if (!(STOP_WORDS.has(term))) {
                tokens.push(term);
            }
        }
        // Next Steps?: Stemming
        return tokens;
    }
    
    addDocument(doc_text) {
        const tokens = this.tokenize(doc_text);
        let documentLength = tokens.length;
    
        // Update total document count and length
        this.totalDocumentCount++;
        this.totalDocumentLength += documentLength;

        var docTerms = {};
        var uniqueTerms = new Set();
        // Set term frequencies for each unique term, create term set
        for (let i = 0; i < tokens.length; i++) {
            let term = tokens[i]
            if (docTerms[term]) {
                docTerms[term].count++;
            } else {
                uniqueTerms.add(term);
                docTerms[term] = {
                    count: 1
                };
            }
        }
        for (const term of Object.keys(docTerms)) {
            if (term in this.terms) {
                this.terms[term].doc_count++;
            } else {
                this.terms[term] = {
                    doc_count: 1
                };
            }
        }
        let doc = {docID: this.totalDocumentCount, dl: documentLength, terms: docTerms, termsSet: uniqueTerms, fullText: doc_text};
        this.documents[this.totalDocumentCount] = doc;  
    }
    
    addDocumentList(doc_text_list) {
        for (const doc_text of doc_text_list) {
            this.addDocument(doc_text);
        }
    }
    
    search(query, num_results = 10) {
        // let input = document.getElementById('searchbar').value
        
        var queryTokens = this.tokenize(query);
            
        var results = [];
        for (const doc_id of Object.keys(this.documents)) {
            let doc = this.documents[doc_id];
            var doc_score = 0;
            var memoize_term_score = {};
            for (const queryToken of queryTokens) {
                if (!(doc.termsSet.has(queryToken))) {
                    continue;
                } else if (!(queryToken in memoize_term_score)) {
                    // score(w, d) = log(M+1/df(w)) * ((k+1)c(w, d)/(c(w, d) + k(1-b+b(dl/avdl)))) 
                    let M = this.totalDocumentCount;
                    let idf = Math.log((M + 1/this.terms[queryToken].doc_count));
                    let word_count_in_doc = doc.terms[queryToken].count;
                    let k = .5;
                    let b = 1;
                    let numerator = (k+1)*word_count_in_doc;
                    let averageDocumentLength = this.totalDocumentLength/M;
                    let denominator = word_count_in_doc + k*(1-b+b*(doc.dl/averageDocumentLength));
                    memoize_term_score[queryToken] = idf*(numerator/denominator);
                }
                doc_score += memoize_term_score[queryToken]
            }
            console.log(doc.fullText, doc_score)
            if (doc_score > 0) {
                results.push({doc_score: doc_score, doc: doc});
            }
        }
        results.sort(function(a) { return a.doc_score; });
        let top_ten = results.slice(0, Math.min(num_results, results.length));
        let top_ten_docs = [];
        for (let i = 0; i < top_ten.length; i++) {
            top_ten_docs.push(top_ten[i].doc);
        }
        return top_ten_docs;
    }
}

// // Example of usage:
// const bm25 = new BM25()
// bm25.addDocumentList(["Hello there", "Small Cat", "The Tall Dog", "The Tallest Smallest Cat", "The Tallest Smallest DOG"]);
// console.log(bm25.search("tall small cat dog"));