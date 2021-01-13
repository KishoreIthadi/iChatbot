$(function () {

    String.prototype.format = function () {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };

    $("#chat-floating-Icon").click(function (e) {
        $('#chat-box').addClass('chat-box-show');
    });

    $("#chat-box-close").click(function () {
        $('#chat-box').removeClass('chat-box-show');
    });

    LoadQuery(1);
});

function LoadQuery(id) {

    document.getElementById("chat-box-message-loading").style.visibility = "visible";
    
    var query = queries.find(x => x.ID == id);
    var queryText = query.Query;

    if (query.Enabletext == "TRUE") {
        document.getElementById("chat-box-message").disabled = false;
    }
    else {
        document.getElementById("chat-box-message").disabled = true;
    }

    var optionTemplate = "<span id='{0}' onclick='LoadQuery({1})' class='badge rounded-pill bg-info text-dark' type='button'>{2}</span>";
    var linkTemplate = "<a href='{0}' target='_blank'>link to click</a>";

    var templateGenerated = '';

    if (query.Response != null) {

        var responseIDS = query.Response.split(',');

        responseIDS.forEach(element => {
            var response = responses.find(x => x.ID == element);
            if (response.Type == "Option") {
                templateGenerated += optionTemplate.format(element, response.Query, response.Response);
            }
            else if (response.Type == "Link") {
                templateGenerated += linkTemplate.format(element, response.Response);
            }

        });
    }

    var chatTemplate = "<div class='chat-box-message-template'>" +
        "<i class='fa fa-user-circle fa-2x float-start' aria-hidden='true'></i>" +
        "<span id='" + query.ID + "' class='chat-box-message-text'>" + queryText + "</span>" +
        "<br>" +
        "<div id='chat-box-options' class='chat-box-options'>" +
        templateGenerated +
        "</div>" +
        "</div>" +
        "</div>";

    setTimeout(() => {
        document.getElementById("chat-box-message-loading").style.visibility = "hidden";
        document.getElementById("chat-box-messages").getElementsByTagName("div")[0].innerHTML += chatTemplate;
        document.getElementById("chat-box-message-loading").scrollIntoView();
    }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
    var inputField = document.getElementById("chat-box-message");
    inputField.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            var input = inputField.value;
            inputField.value = "";
            var selectedID = document.getElementById("chat-box-message");
            console.log("The input is " + input);
        }
    });
});

function ChatMessage(id) {

}
