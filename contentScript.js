
function isNasty(user, blacklist) {
    let num_regex = new RegExp("[0-9]{3,}");
    //1. user name too short or too long
    if (user.length < 4 || user >= 10) {
        return true;
    }
    //2. contain too many numbers
    if (num_regex.test(user) || user.search("_")>0 || user.search("-")>0) {
        return true;
    }
    //3. exists in synced blacklist
    if (blacklist.includes(user)) {
        return true;
    }
    return false;
  }

function applyFilter(blacklist) {
    let nastyname = "&nbsp;";
    let thread_list = document.getElementById('threadlist'); //threadlist check
    let posts = document.getElementById('postlist'); //posts check

    if (thread_list != null) {
        thread_list = thread_list.getElementsByClassName('bm_c')[0].getElementsByTagName('table')[0].children;
        Array.prototype.forEach.call(thread_list, thread => {
            let author, reply;

            try {
                author = thread.getElementsByClassName('author')[0].children[0].children[0].innerText;
                reply = thread.getElementsByClassName('last-reply')[0].children[1].children[0].children[0];
            } catch (e) {}

            if (isNasty(author, blacklist)) { //remove nasty thread
                console.log(author, 'removed in thread');
                thread.style.display = 'none';
            }
            else if (isNasty(reply.innerText.trim(), blacklist)){ //hide last repler'name if nasty
                reply.outerHTML = nastyname;
            }
        });
    }

    if (posts != null) {
        posts = posts.children;
        posts.pop(); //remove the last meaningless one
        
        Array.prototype.forEach.call(posts, post => {
            let author;
            try {
                author = post.getElementsByClassName('author')[0].children[0].innerText;
            } catch (e) {}

            if (isNasty(author, blacklist)) {
                post.style.display = 'none';
            }
        });
    }
}

chrome.storage.sync.get(['deepin_blacklist'], result => {
    let blacklist = [];
    if (result['deepin_blacklist']) {
        blacklist = result['deepin_blacklist'];
    }
    applyFilter(blacklist);
});