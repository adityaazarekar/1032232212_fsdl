/* ==========================================
   PART 1: PROFILE GENERATOR (DOM & jQuery)
   ========================================== */

// 1. Image Operation: Toggle between Avatars
function changeAvatar() {
    var img = document.getElementById('avatar-img');
    // Check current src and switch
    if (img.src.includes('4140048')) {
        img.src = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"; // Female/Alt Avatar
    } else {
        img.src = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"; // Male/Main Avatar
    }
}

// 2. CSS Operation: Toggle "Gamer Mode" Theme
function toggleTheme() {
    var card = document.getElementById('card-container');
    var role = document.getElementById('card-role');
    
    // Toggle class for drastic style change
    if (card.classList.contains('theme-pro')) {
        card.classList.remove('theme-pro');
        card.classList.add('theme-gamer');
        role.style.color = "#00f260"; // Manual style change
        role.innerText = "Level 99 Coder"; // Content change
    } else {
        card.classList.remove('theme-gamer');
        card.classList.add('theme-pro');
        role.style.color = "#6c757d"; // Reset color
        role.innerText = "Full Stack Developer"; // Reset content
    }
}

// 3. Node Operations: Add/Remove Skills
function addSkill() {
    var input = document.getElementById('skill-input');
    var skillText = input.value.trim();
    
    if(skillText !== "") {
        var container = document.getElementById('skills-list');
        
        // Create new Span Node
        var newBadge = document.createElement("span");
        newBadge.className = "badge bg-primary skill-badge";
        newBadge.innerText = skillText;
        
        // Append to parent
        container.appendChild(newBadge);
        
        // Clear input
        input.value = "";
    } else {
        alert("Please type a skill name!");
    }
}

function removeSkill() {
    var container = document.getElementById('skills-list');
    // Remove the last child node if it exists
    if (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
}

// 4. jQuery Operations: "Hire Me" Button
$(document).ready(function(){
    $("#jq-btn").click(function(){
        var btn = $(this);
        
        // Change Text and Style using jQuery
        btn.html('<i class="fas fa-check"></i> Request Sent');
        btn.removeClass("btn-warning").addClass("btn-success");
        
        // Show status message with animation
        $("#status-msg")
            .text("Thanks! We will contact you shortly.")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
            
        // Reset button after 3 seconds
        setTimeout(function(){
            btn.html("Hire Me");
            btn.removeClass("btn-success").addClass("btn-warning");
        }, 3000);
    });
});

/* ==========================================
   PART 2: FORM VALIDATION
   ========================================== */
function validateForm() {
    let isValid = true;
    
    // Reset all errors
    document.querySelectorAll('.error-msg').forEach(e => e.style.display = 'none');

    // Username
    if(document.getElementById('username').value.trim() === "") {
        document.getElementById('user-err').style.display = 'block';
        isValid = false;
    }

    // Phone (10 digits)
    if(!/^\d{10}$/.test(document.getElementById('phone').value)) {
        document.getElementById('phone-err').style.display = 'block';
        isValid = false;
    }

    // Email (Complex Regex: @, ., length constraints)
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3}\.[a-zA-Z]{2,3}$/;
    if(!emailRegex.test(document.getElementById('email').value)) {
        document.getElementById('email-err').style.display = 'block';
        isValid = false;
    }

    // Password (Upper, Digit, Special)
    let pass = document.getElementById('password').value;
    let passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
    if(!passRegex.test(pass)) {
        document.getElementById('pass-err').style.display = 'block';
        isValid = false;
    }

    // Confirm Password
    if(pass !== document.getElementById('cpassword').value) {
        document.getElementById('cpass-err').style.display = 'block';
        isValid = false;
    }

    if(isValid) {
        alert("Form Validated Successfully!");
        console.log("jQuery Serialized Data: " + $('#regForm').serialize());
    }
    
    return false; // Prevent submission for demo
}