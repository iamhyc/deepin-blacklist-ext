
function render(blacklist)
{
    blacklist.forEach(user => {
        $("#blist").append(`<li class="list-group-item d-flex justify-content-between align-items-center">${user}<a class="badge btn-danger badge-pill del-button" href="#">X</a></li>`)
    });
}

$(document).ready(function() {
    //NOTE: render the blacklist
    chrome.storage.sync.get(["deepin_blacklist"], result => {
        if (Array.isArray(result["deepin_blacklist"])) {
            render(result["deepin_blacklist"]);
        }
    });
});

$("#add-button").click(function() {
    //NOTE: append to chrome.storage.sync.get(["deepin_blacklist"])
    chrome.storage.sync.get(["deepin_blacklist"], result => {
        let add_user = $("#add-user").val().trim();

        if (Array.isArray(result["deepin_blacklist"])) {
            result = result["deepin_blacklist"].concat(add_user).sort();
        }
        else {
            result = [add_user];
        }
        
        chrome.storage.sync.set({deepin_blacklist:result}, ()=>{
            render(result);
        });
    });
});

$(".del-button").click(function() {
    //TODO: remove from chrome.storage.sync.get(["deepin_blacklist"])
});