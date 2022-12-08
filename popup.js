let bm = new BM25();
let html_title_map = {};

async function loadBookMarks() {
    chrome.bookmarks.getTree(async (bookmarks) => {
        let urlList = bookMarkBFS(bookmarks[0], search);
        let status = document.getElementById('status');
        status.textContent = "Fetching " + urlList.length + " pages...";
        // Go through each URL and fetch the webpage
        for (let i = 0; i < urlList.length; i++) {
            console.log("Fetching: " + urlList[i][0]);
            status.textContent = "Fetching " + (i + 1) + " of " + urlList.length + " pages...";
            try {
                let response = await fetch(urlList[i][1]);
                console.log("Got response: " + urlList[i][0]);
                console.log(response.headers.get('content-type'));
                if (response.headers.get('content-type').indexOf('text/html') !== -1) {
                    let data = await response.text();
                    console.log("Got data: " + urlList[i]);
                    let id = bm.addDocument(data);
                    html_title_map[id] = urlList[i];
                } else {
                    console.log("Skipping: " + urlList[i]);
                }
            } catch (e) {
                console.log("Error fetching: " + urlList[i]);
            }
        }
        status.textContent = "Done!";
    });
}

async function bookMarkSearch() {
    let search = document.getElementById('query').value;    
    console.log("Searching for: " + search);
    let results = bm.search(search);
    // Clear the existing results
    document.getElementById('results').innerHTML = '';
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let [title, url] = html_title_map[result.docID];
        // Add a link to the bookmark in the results div
        let link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.setAttribute('class', 'result');
        link.textContent = title;
        document.getElementById('results').appendChild(link);
    }
}

function bookMarkBFS(bookmarkNode) {
    let results = [];
    let queue = [];
    queue.push(bookmarkNode);
    while (queue.length > 0) {
        let node = queue.shift();
        console.log(node.title)
        // If the node is not a folder, add it to a list of results
        if (node.url) {
            results.push([node.title, node.url]);
        }
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);
            }
        }
    }
    return results;
}

document.getElementById('search').addEventListener('click', bookMarkSearch);
document.getElementById('update').addEventListener('click', loadBookMarks);