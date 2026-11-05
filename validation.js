/* Validate the registration form using jQuery */
function validate() {
    var sid = $("#sid").val();
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    var uname = $("#uname").val();
    var genm = $("#genm").prop("checked");
    var genf = $("#genf").prop("checked");

    var errMsg = "";
    var result = true;
    var pattern = /^[a-zA-Z ]+$/;

    /* Rule 1: all fields must be completed */
    if (sid == "") {
        errMsg += "<li>User ID cannot be empty.</li>";
    }
    if (pwd1 == "") {
        errMsg += "<li>Password cannot be empty.</li>";
    }
    if (pwd2 == "") {
        errMsg += "<li>Retype password cannot be empty.</li>";
    }
    if (uname == "") {
        errMsg += "<li>User name cannot be empty.</li>";
    }
    if ((!genm) && (!genf)) {
        errMsg += "<li>A gender must be selected.</li>";
    }

    /* Rule 2: user ID must contain @, but not at the beginning */
    if (sid.indexOf('@') == 0) {
        errMsg += "<li>User ID cannot start with an @ symbol.</li>";
    }
    if (sid.indexOf('@') < 0) {
        errMsg += "<li>User ID must contain an @ symbol.</li>";
    }

    /* Rule 3: both passwords must match */
    if (pwd1 != pwd2) {
        errMsg += "<li>Passwords do not match.</li>";
    }

    /* Rule 4: name can contain letters and spaces only */
    if (!uname.match(pattern)) {
        errMsg += "<li>User name contains symbols.</li>";
    }

    /* Show errors in a popup window instead of an alert */
    if (errMsg != "") {
        $("#scrnOverlay, #errWin").remove();

        var numOfItems = (errMsg.match(/<li>/g).length) + 6;
        errMsg = "<div id='scrnOverlay'></div>"
            + "<section id='errWin' class='window'><ul>"
            + errMsg
            + "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";

        $("body").append(errMsg);
        $("#scrnOverlay").css("visibility", "visible");
        $("#errWin").css("height", numOfItems.toString() + "em");
        $("#errWin").css("margin-top", (numOfItems / -2).toString() + "em");
        $("#errWin").show();

        $("#errBtn").click(function (event) {
            event.preventDefault();
            $("#scrnOverlay").remove();
            $("#errWin").remove();
        });
        result = false;
    }
    return result;
}

/* Collapse or expand the section using jQuery. */
function toggle(event) {
    event.preventDefault();
    var link = $(this);
    var content = link.parent().next(".section-content");
    var isExpanded = link.attr("aria-expanded") == "true";

    /* The wrapper ensures fieldset legends also hide correctly in Safari. */
    content.stop(true, true).slideToggle();
    link.html(isExpanded ? "[+]" : "[-]");
    link.attr("aria-expanded", isExpanded ? "false" : "true");
}

/* Connect the form and collapse links to their event functions */
function init() {
    $(".collapse").click(toggle);
    $("#regform").submit(validate);
}

$(document).ready(init);
